<template>
    <v-container class="py-3">
        <v-row justify="center">
            <v-col cols="12" sm="6" md="6">
                <v-card class="elevation-2" style="border-radius: 10px;">
                    <v-card-title class="primary white--text" style="border-radius: 10px 10px 0px 0px;">
                        <h3 class="headline mb-0">Integration Request Form</h3>
                    </v-card-title>
                    <v-card-title>
                    </v-card-title>
                    <v-card-text>

                        <v-row>
                            <v-col cols="2" class="label-col">Issue Key</v-col>
                            <v-col cols="6" class="label-col">Summary</v-col>
                        </v-row>
                        <v-divider class="my-3"></v-divider>



                        <v-row v-for="(issue, index) in issues" :key="index">
                            <v-col cols="2">{{ issue.key }}</v-col>
                            <v-col cols="6">"{{ issue.fields.summary }}"</v-col>
                            <v-col cols="3"><v-btn class ="custom-btn" variant="tonal" @click="updateIssue(issue.key)">Update Issue</v-btn></v-col>
                        </v-row>

                        <v-btn color="green" @click="createNewIssue">Create New Issue</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    props: ['email'],
    data() {
        return {
            email: "",
            correctedEmail: '',
            issues: []
        };
    },
    async mounted() {
        await this.fetchUserIssues();
    },
    created() {
        const storedemail = localStorage.getItem("email");
        console.log(storedemail);

        if (storedemail) {
            this.correctedEmail = this.correctEmail(storedemail.replace(/"/g, ''));
        }
    },
    methods: {
        correctEmail(email) {
            return email.replace('getfareye', 'fareye');
        },
        async fetchUserIssues() {
            const url = "https://api-qa.fareyeconnect.com/connector/v1/formtest/getissue";
            try {
                const response = await axios.post(url, { email: this.correctedEmail }, {
                    headers: {
                        'Authorization': 'Bearer 39e89e75-5f22-4f26-abc8-145592eb3577'
                    }
                });


                const jsonData = response.data;

                const issueKeys = jsonData['issues-Keysad'];
                const issueSummary = jsonData['issues-Summaryy'];


                this.issues = issueKeys.map((issueKey, index) => ({
                    key: issueKey,
                    fields: {
                        summary: issueSummary[index]
                    }
                }));   
                
                console.log("Response from server:", response);

            } catch (error) {
                console.error('Error fetching user issues:', error);
            }
        },
        createNewIssue() {
            this.$router.push('/createIssue');
        },
        updateIssue(issueKey) {

            const issue = this.issues.find(item => item.key === issueKey);

            if (!issue) {
                console.error("Issue does not exist or you don't have permission.");
                this.$router.push('/');
                return;
            }

            console.log("Update issue with key:", issueKey);

            this.$router.push({ name: 'updateIssue', query: { issueKey } });
        }
    }
};
</script>

<style scoped>
.custom-btn {
  background-color: rgb(28, 151, 192);
  color: rgb(255, 255, 255);

}
</style>