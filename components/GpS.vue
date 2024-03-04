<template>
  <div>
    <v-card v-if="dialog" persistent max-width="600px">
      <v-card-text>
        <v-select v-model="gpsServices" :items="gpsServiceOptions.gpsServicesOptions" label="GPS/ELD Telematics Services"
          outlined></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submitCarrierService">Submit</v-btn>
        <v-btn @click="cleardialog">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
  
<script>
export default {
  props: ['gpsServiceOptions'],

  data() {
    return {
      dialog: true,
      gpsServices: null
    };
  },
  methods: {
    submitCarrierService() {
      this.$emit('gpsServiceSubmitted', this.gpsServices);
      this.dialog = false;
      // alert('service submitted successfully!');

    },
    cleardialog(){
      this.dialog = false;
      this.gpsServices = null;
    }
  }
};
</script>