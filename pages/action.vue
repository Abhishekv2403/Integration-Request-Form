<template>
    <v-container class="py-3">
        <v-row justify="center">
            <v-col cols="12" sm="6" md="6">
                <v-card class="elevation-2" style="border-radius: 10px;">
                    <v-card-title class="primary white--text" style="border-radius: 10px 10px 0px 0px;">
                        <h3 class="headline mb-0">Integration Request Form</h3>
                    </v-card-title>
                    <v-card-title>
                        <span class="headline">All Issues</span>
                    </v-card-title>
                    <v-card-text>
                        <v-list dense>
                            <v-list-item v-for="(issue, index) in issues" :key="index">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ issue.fields.summary }}
                                        <v-btn class="custom-btn" @click="updateIssue(issue.key)">Update</v-btn>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
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
                console.log("Response from server:", response);
                this.issues = response.data['issues-Keysad'].map(issueKey => ({ key: issueKey, fields: { summary: issueKey } }));
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
  margin-left: 340px;
}
</style>
