<template>
  <v-container>
    <v-alert v-if="successAlert" v-model="successAlert" icon="$success" :text=IssueKey title="Issue Updated Successfully" type="success" ><v-btn class = "done-btn " @click="updated">OK</v-btn></v-alert>

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
            </v-container>

            <div class="button-container">
              <v-btn @click="updateJiraIssue">Done</v-btn>
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

  data() {
    return {
      snackbar: false,
      successAlert: false,
      keyMap: keyMapData.data.keyMap,
      finalEmail : '',
      finalformData : [],
      IssueKey : null,
    };
  },

  computed: {
    tableData() {
      let data = { ...this.formData };
      return data;
    },
  },

  async mounted(){
    this.email();
    this.formData();
    this.issueKey();
  },

  methods: {

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
      return;
    },
    issueKey(){
      this.IssueKey = this.$root.issueKey;
      console.log(this.IssueKey);
      return this.$root.issueKey;
    },

    updated(){
      this.$router.push({
        name: "action",
      });
    },
    goBack() {
      this.$router.push({
        name: "updateIssue",
      });
    },

    async updateJiraIssue() {
      const url =
        "https://api-qa.fareyeconnect.com/connector/v1/formtest/jiraupdate";

      // const url1 = "https://api-qa.fareyeconnect.com/connector/v1/formtest/create-domain";

      // this.$router.push('/action');
      this.snackbar = true;

      try {
        const response = await axios.post(
          url,
          { formData: this.finalformData },
          {
            headers: {
              Authorization: "Bearer 39e89e75-5f22-4f26-abc8-145592eb3577",
            },
          }
        );

        // const response1 = await axios.post(url1, { domainData: this.domainData }, {
        //   headers: {
        //     'Authorization': 'Bearer 39e89e75-5f22-4f26-abc8-145592eb3577'
        //   }
        // });

        console.log("Response from server:", response);
        this.successAlert = true;

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

/* .done_btn{
  margin-left: 100px;
} */
</style>
