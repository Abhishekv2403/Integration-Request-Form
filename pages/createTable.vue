<template>
  <v-container>

    <v-alert v-if="successAlert" v-model="successAlert" icon="$success" :text=issueKey title="Issue Created Successfully" type="success"></v-alert>
    <v-alert v-if="successdomainAlert" v-model="successdomainAlert" icon="$success" :text=domainName title="Domain Object Created Successfully" type="success"><v-btn class = "done-btn " @click="updated">OK</v-btn></v-alert>

    <v-alert v-model="failedAlert" text="Failed" density="compact" title="Error" type="warning"></v-alert>
    <v-alert v-model="faileddomainAlert" text="Failed" density="compact" title="Error" type="warning"></v-alert>


    <v-row justify="center">
      <v-col cols="8">
        <v-card class="elevation-12">
          <v-card-title class="headline headline mb-0 text-center">Create Issue</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6" class="label-col">Details</v-col>
                <v-col cols="6" class="label-col">Notes</v-col>
              </v-row>
              <v-divider class="my-3"></v-divider>
              <v-row v-for="(value, label, index) in finalformData" :key="label" :style="{ backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,.03)' : 'white',}">
                <v-col cols="6">{{ keyMap[label] || label }}</v-col>

                <v-col cols="6">
                  <span v-if="label === 'carrierservices'">
                    Label and AWB Order: {{ this.finalformData.carrierservices.labelAndAWBOrder || 'NA' }}<br>
                    Tracking Events: {{ this.finalformData.carrierservices.trackingEvents || 'NA' }}<br>
                    Cancel AWB: {{ this.finalformData.carrierservices.cancelawb || 'NA' }}<br>
                    Get Quote: {{this.finalformData.carrierservices.getquote || 'NA' }}<br>
                    Get Slot: {{ this.finalformData.carrierservices.getslot || 'NA' }}<br>
                    Confirms Slot: {{ this.finalformData.carrierservices.confirmslot || 'NA' }}<br>
                  </span>
                  <span v-else>{{ value || 'NA' }}</span>
                </v-col>

              </v-row>
              <v-divider class="my-3"></v-divider>

              <h2>Domain Data</h2><br/>
              <v-row v-for="(value, label, index) in finaldomainData" :key="label" :style="{ backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,.03)' : 'white',}">
                <v-col cols="6">{{ keyMap[label] || label }}</v-col>
                <v-col cols="6">{{ value || "NA" }}</v-col>
              </v-row>

            </v-container>

            <div class="button-container">
              <v-btn @click="updateJiraIssue">Done</v-btn>
              <v-btn @click="goBack" color="primary" dark>Back</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import keyMapData from "../assets/data.json";
import axios from "axios";

export default {

  data() {
    return {
      domainName : '',

      keyMap: keyMapData.data.keyMap,
      successAlert : false,
      failedAlert : false,
      successdomainAlert : false,
      faileddomainAlert : false,

      finalEmail : '',
      finalformData : [],
      finaldomainData : [],
      issueKey : null,
    };
  },

  async mounted(){
    this.email();
    this.formData();
    this.domainData();
  },

  methods: {

    updated(){
      this.$router.push({
        name: "action",
      });
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

    formData(){
      this.finalformData = this.$root.formData;
      console.log(this.finalformData);
      // console.log(this.finalformData.carrierservices.labelAndAWBOrder);

      return;
    },

    domainData(){
      this.finaldomainData = this.$root.domainData;
      console.log(this.finaldomainData);
      return;
    },

    goBack() {
      this.$router.push({
        name: "createIssue",
      });
    },

    async updateJiraIssue() {
      // const url1 = "https://api-qa.fareyeconnect.com/connector/v1/formtest/create-domain";

      // const url = "https://api-qa.fareyeconnect.com/connector/v1/formtest/test";

        
        // const response = await axios.post( url, { formData: this.finalformData }, {
        //   headers: {
        //     Authorization: "Bearer 39e89e75-5f22-4f26-abc8-145592eb3577",
        //   },
        // });

        // if (response.status === 200) {
        //   console.log("Jira issue created successfully!");
        //   this.successAlert=true;
        // } else {
        //   console.error("Error:", response.data.error);
        //   this.failedAlert = true;
        // }
        
        // console.log("Response from server:", response);
              
        // const response1 = await axios.post( url1, { domainData: this.finaldomainData }, {
        //   headers: {
        //     Authorization: "Bearer 39e89e75-5f22-4f26-abc8-145592eb3577",
        //   },
        // });
        
        // console.log("Response from server:", response1);
                                
        // this.issueKey = response.data.key;
        // console.log(this.issueKey);


        // if (response1.status === 200) {
        //   console.log("Domain Object created successfully!");
        //   this.domainName = response1.data.name;
        //   console.log(this.domainName);
        //   this.successdomainAlert=true;
        // } else {
        //   console.error("Error:", response1.data.error);
        //   this.faileddomainAlert = true;
        // }

        // this.$router.push("/action");
    },
  },
};
</script>

<style scoped>
.label-col {
  font-weight: bold;
}

.v-card-title {
  background-color: #2d4059;
  color: white;
  padding: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
