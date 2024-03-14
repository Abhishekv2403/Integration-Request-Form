<template>
    <v-container>
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
                <v-row v-for="(value, label, index) in formData" :key="label" :style="{ backgroundColor:index % 2 === 0 ? 'rgba(0,0,0,.03)' : 'white',}">
                  <v-col cols="6">{{ keyMap[label] || label }}</v-col>
                  <v-col cols="6">{{ value || "NA" }}</v-col>
                </v-row>
  
              </v-container>
  
              <div class="button-container">
                <v-btn @click="updateJiraIssue">Request Approval</v-btn>
                <v-btn @click="goBack" color="primary" dark>Back</v-btn>
  
                <v-snackbar v-model="snackbar" :timeout="1000" color="success">
                  Issue Updated
                </v-snackbar>
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
    props: ['formData'],
  
    data() {
      return {
        snackbar: false,
  
        keyMap: keyMapData.data.keyMap,
  
        formData: [],
  
      };
    },
  
    computed: {
      tableData() {
        let data = { ...this.formData };
        return data;
      },
    },
  
    created() {
      const storedFormData = localStorage.getItem("formData");
      console.log(storedFormData);
      
      if (storedFormData) {
        this.formData = JSON.parse(storedFormData);
      }
    },
  
    methods: {
      goBack() {
        this.$router.push({
          name: "updateIssue",
        });
      },
  
      async updateJiraIssue() {
  
        const url = "https://api-qa.fareyeconnect.com/connector/v1/formtest/jiraupdate";

        const url1 = "https://api-qa.fareyeconnect.com/connector/v1/formtest/create-domain";

  
        this.$router.push('/action');
        this.snackbar = true;
  
  
        try {
          const response = await axios.post(url, { formData: this.formData }, {
            headers: {
              'Authorization': 'Bearer 39e89e75-5f22-4f26-abc8-145592eb3577'
            }
          }); 

          const response1 = await axios.post(url1, { domainData: this.domainData }, {
            headers: {
              'Authorization': 'Bearer 39e89e75-5f22-4f26-abc8-145592eb3577'
            }
          }); 
  
          console.log("Response from server:", response); 
  
          console.log("Ticket updated successfully:", response.data);
        } catch (error) {
          console.error("Error updating ticket:", error); 
  
          if (error.response) {
            console.error("Response data:", error.response.data);
          }
        }
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
  