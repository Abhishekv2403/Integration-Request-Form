<template>
  <div>
    <v-card v-if="dialog" persistent max-width="600px">
      <v-card-text>
        <v-select v-model="labelAndAWBOrder" :items="carrierServiceOptions.labelAndAWBOrderOptions"
          label="Generate Label & AWB/Order" outlined></v-select>
        <v-select v-model="trackingEvents" :items="carrierServiceOptions.trackingEventsOptions" label="Tracking Events"
          outlined></v-select>
  
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
  
        <v-radio-group v-model="confirmslot" inline>
          <span class="get-slot-label">Confirm Slot :</span>
          <v-radio label="Yes" value="yes"></v-radio>
          <v-radio label="No" value="no"></v-radio>
        </v-radio-group>
  
      </v-card-text>
      <v-card-actions>
        <v-btn @click="carrierServiceSubmitted">Submit</v-btn>
        <v-btn @click="cleardialog">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['carrierServiceOptions'],
  data() {
    return {
      dialog: true,
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
      // alert('service submitted successfully!');

    },

    cleardialog(){
      this.dialog = false;
      this.labelAndAWBOrder = null;
      this.trackingEvents = null;
      this.cancelawb = null;
      this.getquote = null;
      this.getslot = null;
      this.confirmslot = null;
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
