import { defineStore } from 'pinia';

export const useStore = defineStore('tracking', {
  state: () => ({
    trackingNumber: "",
  }),
  actions: {
    setTrackingNumber(trackingNumber) {
      this.trackingNumber = trackingNumber;
      console.log(this.trackingNumber)
    },
  },
});
