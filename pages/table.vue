<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="elevation-12">
          <v-card-title class="headline headline mb-0 text-center">Description</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6" class="label-col">Details</v-col>
                <v-col cols="6" class="label-col">Notes</v-col>
              </v-row>
              <v-divider class="my-3"></v-divider>
              <v-row v-for="(value, label, index) in formData" :key="label" :style="{ backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,.03)' : 'white' }">
                <v-col cols="6">{{ label }}</v-col>
                <v-col cols="6">{{ value || 'NA' }}</v-col>
              </v-row>
            </v-container>
            <div class="button-container">
              <v-btn @click="goBack" color="primary" dark>Back</v-btn>
            </div>          
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: ['formData', 'carrierServiceData', 'otherServices', 'omsServices', 'gpsServices'],

  data() {
    return {
      formData: [],
      carrierServiceData: null,
      otherServices: null,
      omsServices: null,
      gpsServices: null,
    };
  },

  created() {
    this.formData = JSON.parse(this.$route.query.formData);
    this.otherServices = this.$route.query.otherServices;
    this.carrierServiceData = this.$route.query.carrierServiceData;
    this.omsServices = this.$route.query.omsServices;
    this.gpsServices = this.$route.query.gpsServices;
  },

  computed: {
    tableData() {
      let data = { ...this.formData };

      // Convert binary data to base64 for requestfile
      if (data.requestfile) {
        for (let i = 0; i < data.requestfile.length; i++) {
          let file = data.requestfile[i];
          let reader = new FileReader();

          reader.onload = (event) => {
            let base64Data = event.target.result;

            // Add base64Data to the tableData object
            data[`Request File ${i + 1}`] = base64Data;
          };

          reader.readAsDataURL(file);
        }
      }

      // Convert binary data to base64 for samplefile
      if (data.samplefile) {
        for (let i = 0; i < data.samplefile.length; i++) {
          let file = data.samplefile[i];
          let reader = new FileReader();

          reader.onload = (event) => {
            let base64Data = event.target.result;

            // Add base64Data to the tableData object
            data[`Sample File ${i + 1}`] = base64Data;
          };

          reader.readAsDataURL(file);
        }
      }

      return data;
    }
  },

  created() {
    const storedFormData = sessionStorage.getItem('formData');
    console.log(storedFormData);
    if (storedFormData) {
      this.formData = JSON.parse(storedFormData);
    }
  },
  
  methods: {
    goBack() {
      this.$router.push({
        name: 'form',
        // query: {
        //     formData: JSON.stringify(this.formData), // Pass form data back to form component
        // }
      }); 
    }
  }
};
</script>


<style scoped>
.label-col {
  font-weight: bold;
}

.v-card-title {
  background-color: #2d4059 ;
  color: white;
  padding: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>