<template>
    <v-container class="py-6">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="70">
                <v-card class="elevation-4" style="border-radius: 20px;">
                    <v-card-title class="primary white--text" >
                        <v-toolbar class="primary" dark>
                            <h2 class="display-1 font-weight-light white--text">Integration Request Form</h2>
                            <small class="smalltext white--text">Logout</small>
                            <v-icon @click="logout" class="ml-auto white--text">mdi-logout</v-icon>
                        </v-toolbar>
                    </v-card-title>

                    <v-card-text >
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <br>
                            <h2 >{{ IssueKey ? `${IssueKey}` : '' }}</h2>
                            <v-container>

                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="askusecase" :rules="caseRules" label="Ask/Use Case *" required variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="communicationmethod" :items="communicationMethods" :rules="caseRules" label="Select Communication Methods *" required variant="outlined"></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="systemname" label="System/ERP Name *" :rules="systemRules" requireed variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>

                                <h3>Services:</h3><br />
                                <v-select v-model="selectedService" :items="allservices" :rules = "caseRules" label="Select Service *" required variant="outlined"></v-select>
                                
                                <div v-if="selectedService">

                                    <div v-if="selectedService === 'Carrier Services'">
                                        <v-select v-model="labelAndAWBOrder" :rules="caseRules" required :items="carrierServiceOptions.labelAndAWBOrderOptions" label="Generate Label & AWB/Order *" outlined></v-select>
                                        <v-select v-model="trackingEvents" :rules="caseRules" required :items="carrierServiceOptions.trackingEventsOptions" label="Tracking Events *" outlined></v-select>
                                    
                                        <v-radio-group v-model="cancelawb" :rules="caseRules" required inline>
                                            <span class="get-slot-label">Cancel AWB * :</span>
                                            <div class="radio_class"><v-radio label="Yes" value="yes"></v-radio>
                                                                     <v-radio label="No" value="no"></v-radio></div>
                                        </v-radio-group>
                                    
                                        <v-radio-group v-model="getquote" :rules="caseRules" required inline>
                                            <span class="get-slot-label">Get quote * :</span>
                                            <div class="radio_class"><v-radio label="Yes" value="yes"></v-radio>
                                                                    <v-radio label="No" value="no"></v-radio></div>
                                        </v-radio-group>
                                    
                                        <v-radio-group v-model="getslot" :rules="caseRules" required inline>
                                        <span class="get-slot-label">Get Slot * :</span>
                                        <div class="radio_class"><v-radio label="Yes" value="yes"></v-radio>
                                                                <v-radio label="No" value="no"></v-radio></div>
                                        </v-radio-group>
                                    
                                        <v-radio-group v-model="confirmslot" :rules="caseRules" required inline > 
                                        <span class="get-slot-label">Confirm Slot * :</span>
                                        <div class="radio_class"><v-radio label="Yes" value="yes"></v-radio>
                                                                <v-radio label="No" value="no"></v-radio></div>
                                        </v-radio-group>
                                    </div>


                                    <v-select v-if="selectedService === 'GPS/ELD Telematics Services'" v-model="gpsServices" :rules = "caseRules" :items="gpsServiceOptions.gpsServicesOptions" label="GPS/ELD Telematics Services *" outlined></v-select>
                                    
                                    <v-select v-if="selectedService === 'OMS/ERP/WMS Services'" v-model="omsServices" :rules = "caseRules" :items="omsServiceOptions.omsServicesOptions" label="OMS/ERP/WMS Services *" multiple outlined ></v-select>
                                    
                                    <v-select v-if="selectedService === 'Other Services'" v-model="otherServices" :rules = "caseRules" :items="otherServiceOptions.otherServicesOptions" label="Other Services *" outlined></v-select>
                                </div>

                                <br />
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="dataexchange" :items="dataExchangeOptions" label="Data Exchange Format *" required :rules = "caseRules" variant="outlined"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="doclink" label="Documentation Link * " required :rules="caseRules" variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col v-if="selectedService === 'Carrier Services'">
                                        <v-file-input  v-model="carrierStatusList" variant="underlined" :rules="carrierlistRules" required accept=".xls,.xlsx,.ods,.csv" label="Carrier Status List *" @change="handleFileSelection($event, uploadedFiles)"></v-file-input>
                                        <small>Kindly provide the carrier status list and also provide the Final or Last status of tracking to stop pulling the tracking updates.</small>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-file-input v-model="requestfile" label="Request Body/Payload *" :rules="requestRules" variant="underlined" required multiple @change="handleFileUpload($event, 'requestfiles')"></v-file-input>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-file-input v-model="samplefile" label="Sample Response Body/Payload *" variant="underlined" :rules = "requestRules" required multiple @change="handleFileUpload($event, 'samplefiles')"></v-file-input>
                                    </v-col>
                                </v-row>

                            </v-container>
                            <v-card-actions class="button-container">
                                <v-btn :disabled="!valid" @click="submitForm()" color="primary" dark>Next</v-btn>
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

import axios from 'axios';


export default {

    data() {
        return {
            IssueKey: null,

            askusecase: null,
            caseRules: [
                (v) => !!v || 'This Field is required',
            ],

            communicationmethod: null,
            communicationMethods: [],

            summary: null,

            systemname: null,

            selectedService: null,

            carrierServiceData: null,
            carrierservices: null,
            carrierServiceOptions: {
                labelAndAWBOrderOptions: [],
                trackingEventsOptions: [],
            },

            labelAndAWBOrder : null,          //sub parts of CARRIER SERVICES
            trackingEvents : null,
            cancelawb : null,
            getquote : null,
            getslot : null,
            confirmslot : null,

            gpsServices: null,
            gpsServiceOptions: [],

            omsServices: null,
            omsServiceOptions: [],

            otherServices: null,
            otherServiceOptions: [],

            dataexchange: null,
            dataExchangeOptions: [],

            doclink: null,

            uploadedFiles: [],
            carrierStatusList:[],
            carrierlistRules: [
                (v) => !!v || 'This field is required',
            ],

            requestfile: [],
            requestfiles:[],
            requestRules:[
                (value) => {
                    if (!value || !value.length) {
                        return 'This field is required';
                    } else {
                        return true;
                    }
                },
            ],

            samplefile: [],
            samplefiles: [],

            finalEmail : '',

            data: null,
            allservices: [],

            valid: false,

            submitted: false,
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
        this.email();
        this.issueKey();
        await this.fetchIssuesDetails();
        
        try {
            this.data = data.data;
            this.issueTypes = this.data.issueTypes;
            this.communicationMethods = this.data.communicationMethods;
            this.allservices = this.data.allservices;
            this.serviceOptions = this.data.serviceOptions;
            this.carrierServiceOptions = this.data.serviceOptions.carrierServiceOptions;
            this.gpsServiceOptions = this.data.serviceOptions.gpsServiceOptions;
            this.omsServiceOptions = this.data.serviceOptions.omsServiceOptions;
            this.otherServiceOptions = this.data.serviceOptions.otherServiceOptions;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.summary = null;
            this.allservices = null;
            this.issueTypes = null;
            this.communicationMethods = null;
            this.carrierServiceOptions = null;
            this.gpsServiceOptions = null;
            this.omsServiceOptions = null;
            this.otherServiceOptions = null;
        }
        
        
        // this.issueKey = this.$route.query.issueKey;
        // console.log(this.issueKey); 
        
        const storedcompleteData = localStorage.getItem('completeData')
        console.log(storedcompleteData)

        if(storedcompleteData){
            const completeData = JSON.parse(storedcompleteData);
            Object.assign(this, completeData);
        }
    },

    methods: {
        issueKey(){
            this.IssueKey = this.$root.issueKey;
            console.log(this.IssueKey);
            return this.$root.issueKey;
        },
        email() {
            const mail = this.$root.email;
            if (!mail) {
                alert("Invalid email. Please try again.");
                this.$router.push('/');
                return;
            }

            this.finalEmail = mail;
            console.log(this.finalEmail);
            return this.$root.email;
        },

        async fetchIssuesDetails() {
            const url = "https://api-qa.fareyeconnect.com/connector/v1/formtest/get-issue-details";
            try {
                const response = await axios.post(url,  {IssueKey : this.IssueKey}, {
                    headers: {
                        'Authorization': 'Bearer 39e89e75-5f22-4f26-abc8-145592eb3577'
                    }
                }); 

                const jsonData = response.data;
                this.askusecase = jsonData.askusecase;
                this.communicationmethod = jsonData.communicationmethod;
                this.systemname = jsonData.systemname;
                this.selectedService = jsonData.selectedService;
                this.carrierservices = jsonData.carrierservices;
                this.labelAndAWBOrder = jsonData.carrierservices.labelAndAWBOrder;
                this.trackingEvents = jsonData.carrierservices.trackingEvents;
                this.cancelawb = jsonData.carrierservices.cancelawb;
                this.getquote = jsonData.carrierservices.getquote;
                this.getslot = jsonData.carrierservices.getslot;
                this.confirmslot = jsonData.carrierservices.confirmslot;
                this.gpsServices = jsonData.gpsservices;
                this.omsServices = jsonData.omsservices;
                this.otherServices = jsonData.otherServices,
                this.dataexchange = jsonData.dataexchange;
                this.doclink = jsonData.doclink;
                this.uploadedFiles = jsonData.carrierStatusList;
                this.requestfiles = jsonData.requestfile;
                this.samplefiles = jsonData.samplefile;
                
                console.log("Response from server:", response);

            } catch (error) {
                console.error('Error fetching user issues:', error);
            }
        },

        logout() {
            localStorage.removeItem('formData');
            this.$router.push('/')
        },
        handleFileUpload(event, fileNamesArray) {
            const files = event.target.files;
            fileNamesArray.length = 0;
            for (let i = 0; i < files.length; i++) {
                fileNamesArray.push(files[i].name);
            }
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

        clearForm() {
            this.askusecase = null;
            this.communicationmethod = null;
            this.systemname = null;
            this.selectedService = null;
            this.carrierservices = null;
            this.labelAndAWBOrder = null;
            this.trackingEvents = null;
            this.getslot = null;
            this.getquote = null;
            this.confirmslot = null;
            this.cancelawb = null;
            this.otherServices = null;
            this.gpsServices = null;
            this.omsServices = null;
            this.dataexchange = null;
            this.doclink = null;
            this.uploadedFiles = [];
            this.samplefile = [];
            this.samplefiles = [];
            this.requestfiles= [];
            this.requestfile = [];
            this.carrierStatusList = [];
            localStorage.removeItem('completeData');
        },

        async submitForm() {
            try {
                const isValid = await this.$refs.form.validate();

                this.carrierServiceData = {
                    labelAndAWBOrder: (this.labelAndAWBOrder === null || this.labelAndAWBOrder === undefined) ? "NA" : this.labelAndAWBOrder,
                    trackingEvents: (this.trackingEvents === null || this.trackingEvents === undefined) ? "NA" : this.trackingEvents,
                    cancelawb: (this.cancelawb === null || this.cancelawb === undefined) ? "NA" : this.cancelawb,
                    getquote: (this.getquote === null || this.getquote === undefined) ? "NA" : this.getquote,
                    getslot: (this.getslot === null || this.getslot === undefined) ? "NA" : this.getslot,
                    confirmslot: (this.confirmslot === null || this.confirmslot === undefined) ? "NA" : this.confirmslot,
                }

                if (isValid) {
                    console.log("Form submitted");
                    this.submitted = true;
                }

                const completeData = {
                    issuekey : this.IssueKey,
                    askusecase: this.askusecase,
                    communicationmethod: this.communicationmethod,
                    systemname: this.systemname,
                    selectedService:this.selectedService,
                    carrierservices: (this.carrierServiceData === null || this.carrierServiceData === undefined) ? "NA" : this.carrierServiceData,
                    labelAndAWBOrder: (this.labelAndAWBOrder === null || this.labelAndAWBOrder === undefined) ? "NA" : this.labelAndAWBOrder,
                    trackingEvents: (this.trackingEvents === null || this.trackingEvents === undefined) ? "NA" : this.trackingEvents,
                    cancelawb: (this.cancelawb === null || this.cancelawb === undefined) ? "NA" : this.cancelawb,
                    getquote: (this.getquote === null || this.getquote === undefined) ? "NA" : this.getquote,
                    getslot: (this.getslot === null || this.getslot === undefined) ? "NA" : this.getslot,
                    confirmslot: (this.confirmslot === null || this.confirmslot === undefined) ? "NA" : this.confirmslot,
                    otherServices: (this.otherServices === null || this.otherServices === undefined) ? "NA" : this.otherServices,
                    gpsServices: (this.gpsServices === null || this.gpsServices === undefined) ? "NA" : this.gpsServices,
                    omsServices: (this.omsServices === null || this.omsServices === undefined) ? "NA" : this.omsServices,
                    requestfile: this.requestfiles, 
                    samplefile: this.samplefiles,
                    carrierStatusList: (this.uploadedFiles === null || this.uploadedFiles === undefined) ? "NA" : this.uploadedFiles,
                    dataexchange: this.dataexchange,
                    doclink: this.doclink,
                };

                const formData = {

                    issuekey : this.IssueKey,
                    askusecase: this.askusecase,
                    communicationmethod: this.communicationmethod,
                    systemname: this.systemname,
                    selectedService:this.selectedService,
                    carrierservices: (this.carrierServiceData === null || this.carrierServiceData === undefined) ? "NA" : this.carrierServiceData,
                    otherServices: (this.otherServices === null || this.otherServices === undefined) ? "NA" : this.otherServices,
                    gpsServices: (this.gpsServices === null || this.gpsServices === undefined) ? "NA" : this.gpsServices,
                    omsServices: (this.omsServices === null || this.omsServices === undefined) ? "NA" : this.omsServices,
                    requestfile: this.requestfiles, 
                    samplefile: this.samplefiles,
                    carrierStatusList: (this.uploadedFiles === null || this.uploadedFiles === undefined) ? "NA" : this.uploadedFiles,
                    dataexchange: this.dataexchange,
                    doclink: this.doclink,
                };

                if (isValid) {
                    this.$root.formData = formData;
                    this.$root.issueKey = this.IssueKey;
                    this.$root.email = this.finalEmail;

                    this.$router.push({ name: 'updateTable' });
                    console.log(completeData);
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