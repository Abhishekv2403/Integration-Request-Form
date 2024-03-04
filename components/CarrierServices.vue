<template>
  <div v-if="selectedService === 'Carrier Services'">
    <v-select v-model="labelAndAWBOrder" :items="carrierServiceOptions.labelAndAWBOrderOptions" label="Generate Label & AWB/Order" outlined></v-select>
    <v-select v-model="trackingEvents" :items="carrierServiceOptions.trackingEventsOptions" label="Tracking Events" outlined></v-select>
  
    <v-radio-group v-model="cancelawb" inline>
      <span class="get-slot-label">Cancel AWB :</span>
      <v-radio class="awb-yes" label="Yes" value="yes"></v-radio>
      <v-radio label="No" value="no"></v-radio>
    </v-radio-group>
  
    <v-radio-group v-model="getquote" inline>
      <span class="get-slot-label">Get quote :</span>
      <v-radio label="Yes" value="yes"></v-radio>
      <v-radio label="No" value="no"></v-radio>
    </v-radio-group>
  
    <v-radio-group v-model="getslot" inline>
      <span class="get-slot-label">Get Slot :</span>
      <v-radio label="Yes" value="yes"></v-radio>
      <v-radio label="No" value="no"></v-radio>
    </v-radio-group>
  
    <v-radio-group v-model="confirmslot" inline > 
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
      trackingEvents: null,
      cancelawb: null,
      getquote: null,
      getslot: null,
      confirmslot: null,
    };
  },

  methods: {
    carrierServiceSubmitted() {
      const carrierServiceData = {
        labelAndAWBOrder: this.labelAndAWBOrder,
        trackingEvents: this.trackingEvents,
        cancelawb: this.cancelawb,
        getquote: this.getquote,
        getslot: this.getslot,
        confirmslot: this.confirmslot,
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
