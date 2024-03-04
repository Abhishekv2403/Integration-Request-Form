<template>
    <v-container class="py-6">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="70">
                <v-card class="elevation-4" style="border-radius: 20px;">
                    <v-card-title class="primary white--text" >
                        <v-toolbar class="primary" dark>
                            <h2 class="display-1 font-weight-light white--text">Integration Request Form</h2>

                            <div class="login-wrapper">
                                <div class="user-info">
                                    <span>{{ userEmail }}</span>
                                    <span>{{ userInitial }}</span>
                                </div>
                            </div>

                            <small class="smalltext white--text">Logout</small>
                            <v-icon @click="logout" class="ml-auto white--text">mdi-logout</v-icon>
                        </v-toolbar>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="askusecase" :rules="caseRules" label="Ask/Use Case" required variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="communicationmethod" :items="communicationMethods" :rules="communicationMethodRules" label="Select Communication Methods" required variant="outlined"></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="systemname" label="System/ERP Name" variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>

                                <h3>Services:</h3><br />
                                <!-- <small>Select only one Service*</small> -->
                                <v-select v-model="selectedService" :items="allservices" :rules = "servicesRules" label="Select Service" required variant="outlined"></v-select>
                                
                                <div v-if="selectedService">

                                    <carrier-services v-if="selectedService === 'Carrier Services'" :selectedService="selectedService" :carrierServiceOptions="serviceOptions.carrierServiceOptions" @carrierServiceSubmitted="handleCarrierServiceSubmitted" />
                                    
                                    <v-select v-if="selectedService === 'GPS/ELD Telematics Services'" v-model="gpsServices" :items="gpsServiceOptions.gpsServicesOptions" label="GPS/ELD Telematics Services" outlined></v-select>
                                    
                                    <v-select v-if="selectedService === 'OMS/ERP/WMS Services'" v-model="omsServices" :items="omsServiceOptions.omsServicesOptions" label="OMS/ERP/WMS Services" multiple outlined ></v-select>
                                    
                                    <v-select v-if="selectedService === 'Other Services'" v-model="otherServices" :items="otherServiceOptions.otherServicesOptions" label="Other Services" outlined></v-select>
                                </div>

                                <br />
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="dataexchange" :items="dataExchangeOptions" label="Data Exchange Format" variant="outlined"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="doclink" label="Documentation Link" variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col v-if="selectedService === 'Carrier Services'">
                                        <v-file-input  v-model="carrierStatusList" variant="underlined" accept=".xls,.xlsx,.ods,.csv" label="Carrier Status List" @change="handleFileSelection($event, uploadedFiles)"></v-file-input>
                                        <small>Kindly provide the carrier status list and also provide the Final or Last status of tracking to stop pulling the tracking updates.</small>
                                        <ul v-if="uploadedFiles.length">
                                            <li v-for="fileName in uploadedFiles" :key="fileName">{{ fileName }}</li>
                                        </ul>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-file-input v-model="requestfile" label="Request Body/Payload" :rules = "requestRules" variant="underlined" required multiple @change="handleFilereqSelection($event, requestfileNames)"></v-file-input>
                                        <ul v-if="requestfileNames.length">
                                            <li v-for="fileName in requestfileNames" :key="fileName">{{ fileName }}</li>
                                        </ul>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-file-input v-model="samplefile" label="Sample Response Body/Payload" variant="underlined" :rules = "sampleRules" required multiple @change="handleFilereqSelection($event, samplefileNames)"></v-file-input>
                                        <ul v-if="samplefileNames.length">
                                            <li v-for="fileName in samplefileNames" :key="fileName">{{ fileName }}</li>
                                        </ul>
                                    </v-col>
                                </v-row>

                            </v-container>
                            <v-card-actions class="button-container">
                                <v-btn :disabled="!valid" @click="submitForm" color="primary" dark>Submit</v-btn>
                                <v-btn @click="clearForm" color="red" dark>Clear</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import data from '../assets/data.json';

import * as XLSX from 'xlsx';

import CarrierServices from "../components/CarrierServices.vue";

export default {

    components: {
        CarrierServices
    },

    data() {
        return {
            data: null,
            allservices: [],

            askusecase: null,
            caseRules: [
                (v) => !!v || 'Ask/Use Case is required',
            ],


            communicationmethod: null,
            communicationMethods: [],
            communicationMethodRules: [
                (v) => !!v || 'Communication Method is required',
            ],


            systemname: null,


            selectedService: null,
            servicesRules: [
                (v) => !!v || 'Service is required',
            ],


            carrierServiceData: null,
            carrierServiceOptions: {
                labelAndAWBOrderOptions: [],
                trackingEventsOptions: [],
            },
            carrierservices: null,


            gpsServiceOptions: [],
            gpsServices: null,


            omsServiceOptions: [],
            omsServices: null,


            otherServiceOptions: [],
            otherServices: null,


            dataexchange: null,
            dataExchangeOptions: [],


            doclink: "",

            uploadedFiles: [],
            carrierStatusList:null,

            requestfileNames: [],
            requestRules:[
                (value) => {
                    if (!value || !value.length) {
                        return 'This field is required';
                    } else {
                        return true;
                    }
                },
            ],


            samplefileNames: [],
            sampleRules:[
            (value) => {
                if (!value || !value.length) {
                    return 'This field is required';
                } else {
                    return true;
                }
            },
            ],


            valid: false,


            submitted: false,

            file: null,
            errorSnackbar: false,
            errorMessage: "",

        };
    },

    watch: {
        communicationmethod(newVal) {
            if (newVal === 'API') {
                this.dataExchangeOptions = ['JSON', 'XML'];
            } else if (newVal === 'EDI') {
                this.dataExchangeOptions = ['X12', 'XML'];
            } else {
                this.dataExchangeOptions = ['CSV', 'XML', 'JSON', 'XLS', 'XLSX'];
            }
        }
    },

    async mounted() {
        try {
            this.data = data.data;
            this.allservices = this.data.allservices;
            this.communicationMethods = this.data.communicationMethods;
            this.serviceOptions = this.data.serviceOptions;
            this.carrierServiceOptions = this.data.serviceOptions.carrierServiceOptions;
            this.gpsServiceOptions = this.data.serviceOptions.gpsServiceOptions;
            this.omsServiceOptions = this.data.serviceOptions.omsServiceOptions;
            this.otherServiceOptions = this.data.serviceOptions.otherServiceOptions;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.allservices = null;
            this.communicationMethods = null;
            this.carrierServiceOptions = null;
            this.gpsServiceOptions = null;
            this.omsServiceOptions = null;
            this.otherServiceOptions = null;
        }

        const storedFormData = sessionStorage.getItem('formData');
        if (storedFormData) {
            const formData = JSON.parse(storedFormData);
            Object.assign(this, formData);
        }   
    },

    methods: {
        logout() {
            sessionStorage.removeItem('formData');
            this.$router.push('/')
        },
        handleFilereqSelection(event, fileNamesArray) {
            const files = event.target.files;

            for (let i = 0; i < files.length; i++) {
                fileNamesArray.push(files[i].name);
            }
            event.target.value = null;
        },

        handleFileSelection(event,fileNamesArray) {
            const files = event.target.files;
            fileNamesArray.length = 0;
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = () => {
                    const binaryStr = reader.result;
                    const workbook = XLSX.read(binaryStr, { type: 'binary' });
                    // const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const headers = Object.keys(worksheet).filter(key => key.match(/[A-Z]+\d+/)).map(key => worksheet[key].v.trim());                    
                    console.log('Headers:', headers);
                    const expectedHeaders = [
                        "carrierCode",
                        "milestoneCode",
                        "milestoneName",
                        "milestoneDescription",
                        "eventCode",
                        "eventName",
                        "eventDescription",
                        "statusIdentifier",
                        "global",
                    ];
                    const hasAllHeaders = expectedHeaders.every(header => headers.includes(header));


                    if (!hasAllHeaders) {
                        alert('Missing expected headers in the Excel file.');
                        fileNamesArray.length = 0;
                        this.carrierStatusList = null;
                        return;
                    }

                    fileNamesArray.push(files[i].name);
                };
                reader.readAsArrayBuffer(files[i]);
            }
        },

        handleCarrierServiceSubmitted(carrierServiceData) {
            this.carrierservices = carrierServiceData;
        },

        clearForm() {
            this.askusecase = null;
            this.communicationmethod = null;
            this.systemname = null;
            this.selectedService = null;
            this.carrierservices = null;
            this.otherServices = null;
            this.gpsServices = null;
            this.omsServices = null;
            this.dataexchange = null;
            this.doclink = "";
            this.uploadedFiles = [];
            this.requestfileNames = [];
            this.samplefileNames = [];
            this.samplefile = null;
            this.requestfile = null;
            this.carrierStatusList = null;
            localStorage.removeItem('formData');
        },

        async submitForm() {
            try {
                const isValid = await this.$refs.form.validate();
                if (isValid) {
                    console.log("Form submitted");
                    this.submitted = true;
                }

                const formData = {
                    askusecase: this.askusecase,
                    communicationmethod: this.communicationmethod,
                    systemname: this.systemname,
                    selectedService:this.selectedService,
                    carrierservices: this.carrierservices,
                    otherServices: this.otherServices,
                    gpsServices: this.gpsServices,
                    omsServices: this.omsServices,
                    carrierStatusList: this.uploadedFiles,
                    dataexchange: this.dataexchange,
                    doclink: this.doclink,
                    // requestfileNames: this.requestfileNames,
                    // samplefileNames: this.samplefileNames,
                    samplefile:  this.samplefileNames,
                    requestfile : this.requestfileNames,
                };

                if (isValid) {
                    sessionStorage.setItem('formData', JSON.stringify(formData));
                    this.$router.push({
                        name: 'table',
                    });
                }else {
                    console.log("Validation failed");
                    alert('Please fill all required fields');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while submitting the form');
            }
        }
    },
};
</script>
  
<style>
.primary {
    background-color: #2d4059 !important;
}

.white--text {
    color: #ffffff !important;
}

.elevation-4 {
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2) !important;
}

.v-toolbar--absolute .v-icon {
  cursor: pointer;
  margin-left: auto;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.smalltext{
    margin-left: 310px;
}

.get-slot-label {
  margin-top: 10px;
}

.awb-yes {
  margin-right: 30px;
}
</style>