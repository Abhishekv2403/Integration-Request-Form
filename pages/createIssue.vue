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

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container>

                                <v-row >
                                    <v-col cols="12" md="6">
                                        <v-select v-model="issuetype" :rules="issuetypeRules" label="Issue Type" :items="issueTypes" required variant="outlined"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="summary" :rules="summaryRules" label="Summary" required variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>


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
                                        <v-text-field v-model="systemname" label="System/ERP Name" :rules="nameRules" requireed variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>

                                <h3>Services:</h3><br />
                                <v-select v-model="selectedService" :items="allservices" :rules = "servicesRules" label="Select Service" required variant="outlined"></v-select>
                                
                                <div v-if="selectedService">

                                    <carrier-services v-if="selectedService === 'Carrier Services'" :selectedService="selectedService" :carrierServiceOptions="serviceOptions.carrierServiceOptions" @carrierServiceSubmitted="handleCarrierServiceSubmitted" />
                                    
                                    <v-select v-if="selectedService === 'GPS/ELD Telematics Services'" v-model="gpsServices" :rules = "gpsRules" :items="gpsServiceOptions.gpsServicesOptions" label="GPS/ELD Telematics Services" outlined></v-select>
                                    
                                    <v-select v-if="selectedService === 'OMS/ERP/WMS Services'" v-model="omsServices" :rules = "omsRules" :items="omsServiceOptions.omsServicesOptions" label="OMS/ERP/WMS Services" multiple outlined ></v-select>
                                    
                                    <v-select v-if="selectedService === 'Other Services'" v-model="otherServices" :rules = "otherRules" :items="otherServiceOptions.otherServicesOptions" label="Other Services" outlined></v-select>
                                </div>

                                <br />
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="dataexchange" :items="dataExchangeOptions" label="Data Exchange Format" variant="outlined"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="doclink" label="Documentation Link" :rules="docRules" variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col v-if="selectedService === 'Carrier Services'">
                                        <v-file-input  v-model="carrierStatusList" variant="underlined" :rules="carrierlistRules" accept=".xls,.xlsx,.ods,.csv" label="Carrier Status List" @change="handleFileSelection($event, uploadedFiles)"></v-file-input>
                                        <small>Kindly provide the carrier status list and also provide the Final or Last status of tracking to stop pulling the tracking updates.</small>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-file-input v-model="requestfile" label="Request Body/Payload" :rules="requestRules" variant="underlined" required multiple @change="handleFileUpload($event, requestfiles)"></v-file-input>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-file-input v-model="samplefile" label="Sample Response Body/Payload" variant="underlined" :rules = "sampleRules" required multiple @change="handleFileUpload($event, samplefiles)"></v-file-input>
                                    </v-col>
                                </v-row>

                                <v-divider></v-divider>

                            <div v-if="selectedService">
                                <br>
                                <h3>Info:</h3><br />



                                <v-row>
                                    <v-col cols="6" md="4">
                                        <v-select v-model="status" :rules="caseRules" :items="statusOptions" label="Select Status" required variant="underlined"></v-select>
                                    </v-col>
                                    <v-col cols="6" md="4">
                                        <v-select v-model="label" :rules="caseRules" :items="labelOptions" label="Label" required variant="underlined"></v-select>
                                    </v-col>
                                    <v-col cols="6" md="4">
                                        <v-select v-model="modality" :rules="caseRules" :items="modalityOptions" label="Modality"  required multiple variant="underlined"></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="6" md="4">
                                        <v-select v-model="feature" :rules="caseRules" required :items="featureOptions" label="Feature" variant="underlined"></v-select>
                                    </v-col>
                                    <v-col cols="6" md="4">

                                        <!-- <v-autocomplete v-model="form.selectedCountry" :return-object="true" item-value="id" v-bind="attrs" item-text="name" :rules="caseRules" required :items="countries" label="Select Country" variant="underlined"> -->
                                        
                                        
                                        <!-- </v-autocomplete> -->

                                        <v-select v-model="selectedCountry" :rules="caseRules" required :items="countries" label="Select Country" variant="underlined"></v-select>
                         
                                        <!-- <v-select v-model="country" :items="countries.map(country => country.name) & countries.map(country => country.id)" label="Select Country" variant="underlined"></v-select> -->
                                    </v-col>
                                    <v-col cols="6" md="4">
                                        <v-text-field v-model="final_status" :rules="caseRules" label="Final Status" required variant="underlined"></v-text-field>
                                    </v-col>
                                </v-row>
                                
                                
                                <v-row>
                                    <v-col cols="6" md="4">
                                        <v-text-field v-model="contact_person" class = " contact" :rules="caseRules" label="Contact Person" required variant="underlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="4">
                                        <v-text-field v-model="courier_email" :rules="caseRules" label="Courier Email" required variant="underlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="4">
                                        <v-file-input  v-model="logo" variant="underlined" :rules = "sampleRules" required accept=".jpg,.png,.img" label="Logo" @change="handleFileUpload($event, logofile)"></v-file-input>
                                    </v-col>
                                </v-row>



                            </div>

                            </v-container>

                            <v-card-actions class="button-container">
                                <v-btn :disabled="!valid" @click="submitForm" color="primary" dark>Next</v-btn>
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
import axios from "axios";


import * as XLSX from 'xlsx';

import CarrierServices from "../components/CarrierServices.vue";

export default {

    props: ['email'],

    components: {
        CarrierServices
    },

    data() {
        return {

            selectedCountry:null,

            email: [],
            countryData: [],
            countries:[],
            countryid:null,

            contact_person:null,

            courier_email:null,
            final_status:null,



            status :"Development",
            label : "Setu",
            modality : [],
            logo: [],
            logofile: [],
            feature : null,


            data: null,
            allservices: [],

            summary: null,
            summaryRules: [
                (v) => !!v || 'Summary is required',
            ],


            issuekey: "INT",


            issuetype : null,
            issueTypes: [],
            issuetypeRules: [
                (v) => !!v || 'Issue Type is required',
            ],



            askusecase: null,
            caseRules: [
                (v) => !!v || 'This field is required',
            ],


            communicationmethod: null,
            communicationMethods: [],
            communicationMethodRules: [
                (v) => !!v || 'Communication Method is required',
            ],


            systemname: null,
            nameRules: [
                (v) => !!v || 'System Name is required',
            ],


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
            gpsRules: [
                (v) => !!v || 'This field is required',
            ],


            omsServiceOptions: [],
            omsServices: null,
            omsRules: [
                (v) => !!v || 'This field is required',
            ],


            otherServiceOptions: [],
            otherServices: null,
            otherRules: [
                (v) => !!v || 'This field is required',
            ],


            dataexchange: null,
            dataExchangeOptions: [],


            doclink: "",
            docRules: [
                (v) => !!v || 'Document Link is required',
            ],

            uploadedFiles: null,
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

        selectedCountry(newCountry) {
            console.log(newCountry);
            this.updateCountryId(newCountry);
        },


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

            this.statusOptions = this.data.statusOptions;
            this.labelOptions = this.data.labelOptions;
            this.modalityOptions = this.data.modalityOptions;
            this.featureOptions = this.data.featureOptions;
            this.allservices = this.data.allservices;
            this.issueTypes = this.data.issueTypes;
            this.communicationMethods = this.data.communicationMethods;
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

        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            const formData = JSON.parse(storedFormData);
            Object.assign(this, formData);
        }   


        const storedemail = localStorage.getItem("email");
        console.log(storedemail);
        
        if (storedemail) {
            this.email = JSON.parse(storedemail);
        }

        this.fetchCountries();

    },

    methods: {

        async fetchCountries() {

            try {
                const response = await axios.post( "https://api-qa.fareyeconnect.com/connector/v1/formtest/get-country", {},  {
                    headers: {
                        'Authorization': 'Bearer 39e89e75-5f22-4f26-abc8-145592eb3577'
                    }
                });

                this.countryData = response.data.countrydata.content;
                console.log(this.countryData)
                this.countries = this.countryData.map(country => country.name);
                // this.country_ids = this.countryData.map(country => country.id);
                // console.log(this.country_ids);
                
                
                // this.countries = response.data.countrydata.content.map(country => ({
                //     id: country.id,
                //     name: country.name
                // }));
                
                console.log(this.countries);


            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        },


        updateCountryId(countryName) {
            console.log("working")
            this.countryid = this.getCountryId(countryName);
            console.log('Selected Country ID:', this.countryid);
        },


        getCountryId(countryName) {
            console.log("running")
            let countryId = null;
            for (const country of this.countryData) {
                if (country.name === countryName) {
                    countryId = country.id;
                    break;
                }
            }
            return countryId;
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

        handleCarrierServiceSubmitted(carrierServiceData) {
            this.carrierservices = carrierServiceData;
        },

        clearForm() {
            this.issuekey = "INT";
            this.issuetype = null;
            this.summary = null;
            this.askusecase = null;
            this.communicationmethod = null;
            this.systemname = null;
            this.selectedService = null;
            this.carrierservices = null;
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


                const domainData = {
                    code : this.systemname,
                    name : this.systemname,
                    contact_person : this.contact_person,
                    courier_email : this.courier_email,
                    final_status : this.final_status,
                    feature : this.feature,
                    // page : this.page,
                    logo : this.logofile,
                    label : this.label,
                    modality : this.modality,
                    status : this.status,
                    domain : (this.selectedService === "Carrier Services")? "CARRIER" : (this.selectedService === "GPS/ELD Telematics Services") ? "GPS" : (this.selectedService === "OMS/ERP/WMS Services") ? "OMS" : "SMS",
                    country_name : this.selectedCountry,
                    country_id : this.countryid
                };

                const formData = {
                    issuekey: this.issuekey,
                    
                    issuetype : this.issuetype,
                    
                    summary : this.summary,
                    
                    askusecase: this.askusecase,
                    communicationmethod: this.communicationmethod,
                    systemname: this.systemname,
                    selectedService:this.selectedService,
                    carrierservices: (this.carrierservices === null || this.carrierservices === undefined) ? "NA" : this.carrierservices,
                    
                    otherServices: (this.otherServices === null || this.otherServices === undefined) ? "NA" : this.otherServices,
                    
                    gpsServices: (this.gpsServices === null || this.gpsServices === undefined) ? "NA" : this.gpsServices,
                    
                    omsServices: (this.omsServices === null || this.omsServices === undefined) ? "NA" : this.omsServices,
                    
                    requestfile: this.requestfiles, 
                    samplefile: this.samplefiles,
                    carrierStatusList: (this.uploadedFiles === null || this.uploadedFiles === undefined) ? "NA" : this.uploadedFiles,
                    
                    dataexchange: this.dataexchange,
                    doclink: this.doclink,
                };
                
                const emailIssues = JSON.parse(localStorage.getItem('emailIssues')) || {};
                if (!emailIssues[this.email]) {
                    emailIssues[this.email] = [];
                }
                console.log(this.issuekey);
                emailIssues[this.email].push(this.issuekey);
                localStorage.setItem('emailIssues', JSON.stringify(emailIssues));




                if (isValid) {
                    localStorage.setItem('formData', JSON.stringify(formData));
                    localStorage.setItem('domainData', JSON.stringify(domainData));

                    console.log(formData);
                    console.log(domainData);
                    // console.log(this.samplefile);
                    // console.log(this.requestfile);

                    this.$router.push({
                        name: 'createTable',
                        params: { issueKey: this.issuekey }
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


/* .contact{
    margin-left: 100px;
} */
</style>