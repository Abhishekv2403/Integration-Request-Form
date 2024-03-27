<template>
    <v-container class="py-6">
        <v-alert v-if="successAlert" v-model="successAlert" icon="$success" :text=issueKey title="Issue Created Successfully" type="success"></v-alert>
        <v-alert v-if="failedAlert" v-model="failedAlert" text="Failed" density="compact" title="Error" type="warning"></v-alert>

        <v-alert v-if="successdomainAlert" v-model="successdomainAlert" icon="$success" :text=domainName title="Domain Object Created Successfully" type="success"><v-btn class = "done-btn " @click="goBack">OK</v-btn></v-alert>
        <v-alert v-if="faileddomainAlert" v-model="faileddomainAlert" text="Failed" density="compact" title="Error" type="warning"><v-btn class = "done-btn " @click="goBack">OK</v-btn></v-alert>


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
                                    <!-- <v-col cols="12" md="6">
                                        <v-select v-model="issuetype" :rules="caseRules" label="Issue Type *" :items="issueTypes" required variant="outlined"></v-select>
                                    </v-col> -->
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="summary" :rules="caseRules" label="Summary *" required variant="outlined"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="askusecase" :rules="caseRules" label="Ask/Use Case *" required variant="outlined"></v-text-field>
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
                                    
                                    <v-select v-if="selectedService === 'GPS/ELD Telematics Services'" v-model="gpsServices" required :rules = "caseRules" :items="gpsServiceOptions.gpsServicesOptions" label="GPS/ELD Telematics Services * " outlined></v-select>
                                    
                                    <v-select v-if="selectedService === 'OMS/ERP/WMS Services'" v-model="omsServices" required :rules = "caseRules" :items="omsServiceOptions.omsServicesOptions" label="OMS/ERP/WMS Services * " multiple outlined ></v-select>
                                    
                                    <v-select v-if="selectedService === 'Other Services'" v-model="otherServices" required :rules = "caseRules" :items="otherServiceOptions.otherServicesOptions" label="Other Services *" outlined></v-select>
                                
                                    <v-row v-if="selectedService" >
                                        <v-col cols="6" md="4">
                                            <v-text-field v-model="contact_person" class = " contact" :rules="caseRules" label="Contact Person *" required variant="underlined"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" md="4">
                                            <v-text-field v-model="courier_email" :rules="caseRules" label="Courier Email *" required variant="underlined"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" md="4">
                                            <v-file-input  v-model="logo" variant="underlined" :rules = "requestRules" required accept=".jpg,.png,.img" label="Logo *" @change="handleFileUpload($event, logofile)"></v-file-input>
                                        </v-col>
                                    </v-row>


                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-select v-model="communicationmethod" :items="communicationMethods" :rules="caseRules" label="Select Communication Methods *" required variant="outlined"></v-select>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="systemname" label="System/ERP Name *" :rules="systemRules" requireed variant="outlined"></v-text-field>
                                        </v-col>
                                    </v-row>
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
                                        <v-file-input v-model="requestfile" label="Request Body/Payload *" :rules="requestRules" variant="underlined" required multiple @change="handleFileUpload($event, requestfiles)"></v-file-input>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-file-input v-model="samplefile" label="Sample Response Body/Payload *" variant="underlined" :rules = "requestRules" required multiple @change="handleFileUpload($event, samplefiles)"></v-file-input>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>

                            <div v-if="selectedService"><br>
                                <h3>Info:</h3><br />
                                <v-row>
                                    <v-col cols="6" md="6">
                                        <v-select v-model="modality" :rules="caseRules" :items="modalityOptions" label="Modality *"  required multiple variant="underlined"></v-select>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-select v-model="feature" :rules="caseRules" required :items="featureOptions" label="Feature *" variant="underlined"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    
                                    <v-col cols="6" md="6">
                                        <v-select v-model="selectedCountry" :rules="caseRules" required :items="countries" label="Select Country *" variant="underlined"></v-select>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-text-field v-model="final_status" :rules="caseRules" label="Final Status *" required variant="underlined"></v-text-field>
                                    </v-col>
                                </v-row>
                                
                            </div>
                            </v-container>
                            
                            <v-card-actions class="button-container">
                                <v-btn class = "back_btn" @click="goBack" color="black" dark>Back</v-btn>
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
import axios from "axios";
import * as XLSX from 'xlsx';

export default {
    data() {
        return {
            issuekey: "INT",                   //issue key fixed "INT"
            issueKey : null,
        
            issuetype : "Story",                  //issue type
            // issueTypes: [],                    //options
            caseRules: [                       //rules for validation
                (v) => !!v || 'This field is required',
            ],

            summary: null,                     //summary of ISSUE

            askusecase: null,                 //AskUse Case of ISSUE

            communicationmethod: null,       
            communicationMethods: [],

            systemname: null,
            systemRules : [
                value => !!value || 'This field is required',
                value => /^[a-zA-Z0-9]+$/.test(value) || 'Only alphanumeric characters are allowed ie. (a-z, A-Z & 0-9)'
            ],

            selectedService: null,          //Select which type of service

            carrierServiceData: null,              //first service (CARRIER SERVICES)
            carrierServiceOptions: {
                labelAndAWBOrderOptions: [],
                trackingEventsOptions: [],
            },
            carrierservices: null,

            labelAndAWBOrder : null,          //sub parts of CARRIER SERVICES
            trackingEvents : null,
            cancelawb : null,
            getquote : null,
            getslot : null,
            confirmslot : null,


            gpsServices: null,               //second service (GPS SERVICES)
            gpsServiceOptions: [], 

            omsServices: null,                //third service (OMS SERVICES)
            omsServiceOptions: [],

            otherServices: null,             //fourth service (OTHER SERVICES)
            otherServiceOptions: [],

            dataexchange: null,
            dataExchangeOptions: [],

            doclink: null,

            carrierStatusList:[], 
            uploadedFiles: [],
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

            status :"Pending",   //domain data starts

            label : "Setu",

            modality : [],

            feature : null,

            selectedCountry:null,   //countries
            countries:[],
            countryData: [],
            countryid:null,

            final_status:null,

            contact_person:null,

            courier_email:null,

            logo: [],
            logofile: [],


            finalEmail : '',    //email from root

            data: null,         //for data from data.json
            allservices: [],


            valid: false,        //for validation and submittion of form
            submitted: false,

            successAlert : false,
            failedAlert : false,
            successdomainAlert : false,
            faileddomainAlert : false,
        };
    },

    watch: {
        selectedCountry(newCountry) {
            // console.log(newCountry);
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
        this.email();    //method for setting the mail from roots
        this.fetchCountries();

        try {
            this.data = data.data;                                        //fetching data from data.json
            this.issueTypes = this.data.issueTypes;
            this.communicationMethods = this.data.communicationMethods;
            this.allservices = this.data.allservices;
            this.serviceOptions = this.data.serviceOptions;
            this.carrierServiceOptions = this.data.serviceOptions.carrierServiceOptions;
            this.gpsServiceOptions = this.data.serviceOptions.gpsServiceOptions;
            this.omsServiceOptions = this.data.serviceOptions.omsServiceOptions;
            this.otherServiceOptions = this.data.serviceOptions.otherServiceOptions;

            this.statusOptions = this.data.statusOptions;
            this.labelOptions = this.data.labelOptions;
            this.modalityOptions = this.data.modalityOptions;
            this.featureOptions = this.data.featureOptions;
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

        const storedcompleteData = localStorage.getItem('completeData')
        // console.log(storedcompleteData)

        if(storedcompleteData){
            const completeData = JSON.parse(storedcompleteData);
            Object.assign(this, completeData);
        }
    },

    methods: {
        //for email 
        email() {
            const mail = this.$root.email;
            if (!mail) {
                alert("Invalid email. Please try again.");
                this.$router.push('/');
                return;
            }

            this.finalEmail = mail;
            // console.log(this.finalEmail);
            return this.$root.email;
        },


        //for countrues
        async fetchCountries() {
            try {
                const response = await axios.post( "https://api-qa.fareyeconnect.com/connector/v1/formtest/get-country", {},  {
                    headers: {
                        'Authorization': 'Bearer 39e89e75-5f22-4f26-abc8-145592eb3577'
                    }
                });

                this.countryData = response.data.countrydata.content;
                this.countries = this.countryData.map(country => country.name);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        },
        updateCountryId(countryName) {
           this.countryid = this.getCountryId(countryName);
        },
        getCountryId(countryName) {
            // console.log("running")
            let countryId = null;
            for (const country of this.countryData) {
                if (country.name === countryName) {
                    countryId = country.id;
                    break;
                }
            }
            return countryId;
        },

        goBack(){
            localStorage.removeItem('completeData');
            this.$router.push('action')
        },

        //file uploding
        handleFileUpload(event, fileNamesArray) {
            const files = event.target.files;
            fileNamesArray.length = 0;

            for (let i = 0; i < files.length; i++) {
                fileNamesArray.push(files[i].name);
            }
            // console.log(fileNamesArray);
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



        logout() {
            localStorage.removeItem('completeData');
            this.$router.push('/')
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
            this.labelAndAWBOrder = null;
            this.trackingEvents = null;
            this.confirmslot = null;
            this.getquote = null;
            this.getslot = null;
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


            this.status = "Development";
            this.label = "Setu";
            this.modality = null;
            this.feature = null;
            this.selectedCountry = null;
            this.countryid = null;
            this.final_status = null;
            this.contact_person = null;
            this.courier_email = null;
            this.logo = [];
            this.logofile = [];
            localStorage.removeItem('completeData')
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
                // console.log(this.carrierServiceData);
                if (isValid) {
                    console.log("Form submitted");
                    this.submitted = true;
                }

                const completeData = {
                    //DomainData  
                    code : this.systemname,
                    name : this.systemname,
                    status : this.status,
                    label : this.label,
                    modality : this.modality,
                    domain : (this.selectedService === "Carrier Services")? "CARRIER" : (this.selectedService === "GPS/ELD Telematics Services") ? "GPS" : (this.selectedService === "OMS/ERP/WMS Services") ? "OMS" : "SMS",
                    final_status : this.final_status,
                    country_name : this.selectedCountry,
                    country_id : this.countryid,
                    feature : this.feature,
                    contact_person : this.contact_person,
                    courier_email : this.courier_email,
                    logo : this.logofile,

                    //formData
                    issuekey: this.issuekey,
                    issuetype : this.issuetype,
                    askusecase: this.askusecase, 
                    summary : this.summary,
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
                    doclink: this.doclink
                }


                const domainData = {
                    code : this.systemname,
                    name : this.systemname,
                    status : this.status,
                    label : this.label,
                    modality : this.modality,
                    domain : (this.selectedService === "Carrier Services")? "CARRIER" : (this.selectedService === "GPS/ELD Telematics Services") ? "GPS" : (this.selectedService === "OMS/ERP/WMS Services") ? "OMS" : "SMS",
                    final_status : this.final_status,
                    country_name : this.selectedCountry,
                    country_id : this.countryid,
                    feature : this.feature,
                    contact_person : this.contact_person,
                    courier_email : this.courier_email,
                    logo : this.logofile
                };

                const formData = {
                    issuekey: this.issuekey,
                    issuetype : this.issuetype,
                    askusecase: this.askusecase,
                    summary : this.summary,
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
                    this.$root.domainData = domainData;
                    this.$root.email = this.finalEmail;



                    const url = "https://api-qa.fareyeconnect.com/connector/v1/formtest/test";
                    const response = await axios.post( url, { formData: formData }, {
                        headers: {
                            Authorization: "Bearer 39e89e75-5f22-4f26-abc8-145592eb3577",
                        },
                    });

                    if(response.status === 200) {
                        console.log("Jira issue created successfully!");
                        this.successAlert=true;
                    } else {
                        console.error("Error:", response.data.error);
                        this.failedAlert = true;
                    }


                    console.log("Response from server:", response);

                    this.issueKey = response.data.key;
                    console.log(this.issueKey);




                    const url1 = "https://api-qa.fareyeconnect.com/connector/v1/formtest/create-domain";

                    const response1 = await axios.post( url1, { domainData: domainData }, {
                        headers: {
                            Authorization: "Bearer 39e89e75-5f22-4f26-abc8-145592eb3577",
                        },
                    });

                    console.log("Response from server:", response1);

                    if (response1.status === 200) {
                        console.log("Domain Object created successfully!");
                        this.domainName = response1.data.name;
                        console.log(this.domainName);
                        this.successdomainAlert=true;
                    } else {
                        console.error("Error:", response1.data.error);
                        this.faileddomainAlert = true;
                    }


                    // this.$router.push({ name: 'createTable' });
                    // localStorage.setItem('completeData', JSON.stringify(completeData));

                    // console.log(formData);
                    // console.log(domainData);
                    // console.log(completeData);
                    // console.log(this.finalEmail);
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

.back_btn{
    right: 70%;
}

.smalltext{
    margin-left: 310px;
}

.get-slot-label {
  margin-top: 10px;
}

</style>