<template>
  <div v-if="selectedService === 'Carrier Services'">
    <v-select v-model="labelAndAWBOrder" :rules="labelRules" :items="carrierServiceOptions.labelAndAWBOrderOptions" label="Generate Label & AWB/Order" outlined></v-select>
    <v-select v-model="trackingEvents" :rules="trackRules" :items="carrierServiceOptions.trackingEventsOptions" label="Tracking Events" outlined></v-select>
  
    <v-radio-group v-model="cancelawb" :rules="cancelRules" inline>
      <span class="get-slot-label">Cancel AWB :</span>
      <v-radio class="awb-yes" label="Yes" value="yes"></v-radio>
      <v-radio label="No" value="no"></v-radio>
    </v-radio-group>
  
    <v-radio-group v-model="getquote" :rules="quoteRules" inline>
      <span class="get-slot-label">Get quote :</span>
      <v-radio label="Yes" value="yes"></v-radio>
      <v-radio label="No" value="no"></v-radio>
    </v-radio-group>
  
    <v-radio-group v-model="getslot" :rules="slotRules" inline>
      <span class="get-slot-label">Get Slot :</span>
      <v-radio label="Yes" value="yes"></v-radio>
      <v-radio label="No" value="no"></v-radio>
    </v-radio-group>
  
    <v-radio-group v-model="confirmslot" :rules="confirmslotRules" inline > 
      <span class="get-slot-label">Confirm Slot :</span>
      <v-radio label="Yes" value="yes"></v-radio>
      <v-radio label="No" value="no"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {

  props: ['selectedService', 'carrierServiceOptions'],

  data() {
    return {
      labelAndAWBOrder: null,
      labelRules: [
        (v) => !!v || 'This field is required',
      ],

      trackingEvents: null,
      trackRules: [
        (v) => !!v || 'This field is required',
      ],

      cancelawb: null,
      cancelRules: [
        (v) => !!v || 'This field is required',
      ],

      getquote: null,
      quoteRules: [
        (v) => !!v || 'This field is required',
      ],

      getslot: null,
      slotRules: [
        (v) => !!v || 'This field is required',
      ],

      confirmslot: null,
      confirmslotRules: [
        (v) => !!v || 'This field is required',
      ],
    };
  },

  methods: {
    carrierServiceSubmitted() {
      const carrierServiceData = {


        labelAndAWBOrder: (this.labelAndAWBOrder === null || this.labelAndAWBOrder === undefined) ? "NA" : this.labelAndAWBOrder,

        // labelAndAWBOrder: this.labelAndAWBOrder,

        trackingEvents: (this.trackingEvents === null || this.trackingEvents === undefined) ? "NA" : this.trackingEvents,

        // trackingEvents: this.trackingEvents,

        cancelawb: (this.cancelawb === null || this.cancelawb === undefined) ? "NA" : this.cancelawb,

        // cancelawb: this.cancelawb,

        getquote: (this.getquote === null || this.getquote === undefined) ? "NA" : this.getquote,

        // getquote: this.getquote,

        getslot: (this.getslot === null || this.getslot === undefined) ? "NA" : this.getslot,

        // getslot: this.getslot,


        confirmslot: (this.confirmslot === null || this.confirmslot === undefined) ? "NA" : this.confirmslot,

        // confirmslot: this.confirmslot,
      };
      this.$emit('carrierServiceSubmitted', carrierServiceData);
      this.dialog = false;
    },
  },

  watch: {

    selectedService: {
      handler: 'carrierServiceSubmitted',
      immediate: true
    },

    labelAndAWBOrder: {
      handler: 'carrierServiceSubmitted',
      immediate: true
    },
    trackingEvents: {
      handler: 'carrierServiceSubmitted',
      immediate: true
    },
    cancelawb: {
      handler: 'carrierServiceSubmitted',
      immediate: true
    },
    getquote: {
      handler: 'carrierServiceSubmitted',
      immediate: true
    },
    getslot: {
      handler: 'carrierServiceSubmitted',
      immediate: true
    },
    confirmslot: {
      handler: 'carrierServiceSubmitted',
      immediate: true
    }
  }
};
</script>

<style scoped>
.get-slot-label {
  margin-top: 10px;
}

.awb-yes {
  margin-right: 30px;
}
</style>
