<template>
  <div>
    <!-- <v-btn @click="dialog = true">Other Services</v-btn> -->
    <v-card v-if="dialog" persistent max-width="600px">
      <v-card-text>
        <v-select v-model="otherServices" :items="otherServiceOptions.otherServicesOptions" label="Other Services"
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
  props: ['otherServiceOptions'],

  data() {
    return {
      dialog: true,
      otherServices: null
    };
  },

  methods: {
    submitCarrierService() {
      this.$emit('otherServiceSubmitted', this.otherServices);
      this.dialog = false;
      // alert('service submitted successfully!');
    },

    cleardialog(){
      this.dialog = false;
      this.otherServices = null;
    }

  }
};
</script>  