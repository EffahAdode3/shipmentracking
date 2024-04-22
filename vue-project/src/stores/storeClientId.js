import { defineStore } from 'pinia';

export const useStore = defineStore('app', {
  state: () => ({
    clientId: null,
  }),
  actions: {
    setClientId(clientId) {
      this.clientId = clientId;
      console.log(this.clientId)
    },
  },
});
