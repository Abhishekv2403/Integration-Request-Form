<template>
    <v-container class="py-3">
        <v-row justify="center">
            <v-col cols="12" sm="6" md="8">
                <v-card class="elevation-2" style="border-radius: 10px;">
                    <v-card-title class="primary white--text" style="border-radius: 10px 10px 0px 0px;">
                        <v-toolbar class="primary" dark>
                            <h2 class="display-1 font-weight-light white--text">Integration Request Form</h2>
                            <v-text-field v-model="searchText" class = "searchField" density="compact" variant="solo" label="Search Issue" append-inner-icon="mdi-magnify" single-line hide-details @input="showSearch"></v-text-field>
                            <small class="smalltext white--text">Logout</small>
                            <v-icon @click="logout" class="ml-auto white--text">mdi-logout</v-icon>
                        </v-toolbar>
                    </v-card-title>
                    <v-card-text>
                            
                        <div v-if="!noDataAvailable">
                            <v-row v-for="(issue, index) in filteredIssues" :key="index">
                                <v-col cols="3"><b>{{ issue.key }}</b></v-col>
                                <v-col cols="5"><b>{{ issue.fields.summary.toUpperCase() }}</b></v-col>
                                
                                <v-card-actions class="button-container">
                                    <v-col cols="3"><v-btn class ="custom-btn" color="blue" @click="updateIssue(issue.key)">Update Issue</v-btn></v-col>
                                </v-card-actions>                            
                            </v-row>
                        </div>
                        <v-row v-else>
                            <v-col>
                                <p>No data available</p>
                            </v-col>
                        </v-row>
                        <br><br>
                        <div class="subtitleh3">
                            <h3 >Click to create a new Issue</h3>
                            <v-btn  class = "newIssue"  @click="createNewIssue" color="green">Create New Issue</v-btn>
                        </div>
                        <v-divider class="my-3"></v-divider>
                        <v-row>
                            <v-col cols="3" class="label-col"><b>ISSUE KEY</b></v-col>
                            <v-col cols="6" class="label-col"><b>SUMMARY</b></v-col>
                        </v-row>
                        <v-divider class="my-3"></v-divider>
                        <div v-if="loading">
                            <p>Loading issues...</p>
                        </div>

                        <v-row v-if="!loading && issues.length === 0">
                            <v-col>
                                <p>No issue has been created using this form. Please create a new one.</p>
                            </v-col>
                        </v-row>

                        <v-row v-for="(issue, index) in paginatedIssues" :key="index">
                            <v-col cols="3"><b>{{ issue.key }}</b></v-col>
                            <v-col cols="5"><b>{{ issue.fields.summary.toUpperCase() }}</b></v-col>

                            <v-card-actions class="button-container">
                                <v-col cols="3"><v-btn class ="custom-btn" color="blue" @click="updateIssue(issue.key)">Update Issue</v-btn></v-col>
                            </v-card-actions>
                        </v-row>
                        
                        <v-pagination v-model="page" :length="paginationLength" class="my-4" ></v-pagination>

                        <v-card-actions class="button-container">
                            <v-btn  class = "back_btn"  @click="goBack" color="red">Back</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            finalEmail : '',
            correctedEmail: '',
            issues: [],
            page: 1,
            itemsPerPage: 10,
            loaded: false,
            loading: false,
            searchText: null,

            filteredIssues: [],
            noDataAvailable: false 
        };
    },
    computed: {
        paginationLength() {
            return Math.ceil(this.issues.length / this.itemsPerPage);
        },
        paginatedIssues() {
            const startIndex = (this.page - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.issues.slice(startIndex, endIndex);
        },
    },
    async mounted() {
        this.email();
        await this.fetchUserIssues();
    },

    methods: {
        showSearch(){
            const searchText = this.searchText.toLowerCase().trim();
            if (searchText === '') {
                this.filteredIssues = false;
            } else {
                this.filteredIssues = this.issues.filter(issue => {
                    // return issue.fields.summary.toLowerCase().includes(searchText);

                    const summary = issue.fields.summary.toLowerCase();
                    const key = issue.key.toLowerCase();
                    return summary.includes(searchText) || key.includes(searchText);
                });
            }

            if (this.filteredIssues.length === 0) {
                this.noDataAvailable = true;
            } else {
                this.noDataAvailable = false;
            }
        },

        email() {
            const mail = this.$root.email;
            if (!mail) {
                alert("Invalid email. Please try again.");
                this.$router.push('/');
            }
            this.correctedEmail = mail.replace(/"/g, '');

            this.finalEmail = this.correctedEmail;
            // console.log(this.finalEmail);
            return this.$root.email;
        },

        correctEmail(email) {
            this.correctedEmail = email.replace('getfareye', 'fareye');
            this.fetchUserIssues();
        },

        goBack(){
            this.$router.push('/');
        },

        async fetchUserIssues() {
            this.loading = true; // Set loading to true before fetching

            console.log(this.correctedEmail);
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

                this.loading = false; 

                console.log("Response from server:", response);

                if (this.issues.length === 0) {
                    this.correctEmail(this.finalEmail);
                }
                
            } catch (error) {
                console.error('Error fetching user issues:', error);
                this.loading = false; 
            }
        },
        logout() {
            // localStorage.removeItem('formData');
            this.$router.push('/')
        },
        createNewIssue() {
            this.$root.email = this.correctedEmail;
            localStorage.removeItem('completeData');

            this.$router.push({ name: 'createIssue' });
            // this.$router.push('/createIssue');
        },
        updateIssue(issueKey) {
            const issue = this.issues.find(item => item.key === issueKey);
            if (!issue) {
                alert("Issue does not exist or you don't have permission.");
                this.$router.push('/');
                return;
            }
            console.log("Update issue with key:", issueKey);

            this.$root.issueKey = issueKey;
            this.$root.email = this.correctedEmail;
            this.$router.push({ name: 'updateIssue'});
        }
    }
};
</script>

<style scoped>
.subtitleh3 {
    display: flex;
}

.searchField{
    margin-left: 60px;
    width: 60%;
}

.newIssue{
    left: 10%;
    bottom: 8px;;
}
.smalltext{
    margin-left: 50px;
}

.back_btn{
    /* right: 650px; */
}
</style>