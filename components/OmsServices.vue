<template>
  <div>
    <v-card v-if="dialog" persistent max-width="600px">
      <v-card-text>
        <v-select v-model="omsServices" :items="omsServiceOptions.omsServicesOptions" label="OMS/ERP/WMS Services"
          multiple outlined ></v-select>
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
  props: ['omsServiceOptions'],
  data() {
    return {
      dialog: true,
      omsServices: null,
    };
  },
  methods: {
    submitCarrierService() {
      this.$emit('omsServiceSubmitted', this.omsServices);
      this.dialog = false;
      // alert('service submitted successfully!');
    },
    cleardialog(){
      this.dialog = false;
      this.omsServices = null;
    }
  }
};
</script>