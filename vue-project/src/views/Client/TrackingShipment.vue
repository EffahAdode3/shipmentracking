
<template>
    <div>
        <component :is="Nav"></component>
        <component :is="Sidebar"></component>      
        <v-responsive
      class="mx-auto"
      max-width="344"
      style="margin-top: 150px;"
    >
    <v-text-field
  v-model="tracking_Number "
  :rules="trackingNoRules"
  hide-details="auto"
  label="Tracking Number"
  clearable
></v-text-field>
      <br>
      <v-btn @click="submit">Check Shipment</v-btn>
      <div class="error" v-if="tracking_not_find" @click="clearError">{{ tracking_not_find }}</div>
    </v-responsive>
    <div class="table-container" v-if="showTable">
    <v-table density="compact" style="margin-top: 30px;">
      <thead>
        <tr>
          <th class="text-left">
            TRACKING NUMBER
          </th>
     
          <th class="text-left">
            ITEM NAME
          </th>
          <th class="text-left">
            STATUSES
          </th>
          <th class="text-left">
            CREATED AT
          </th>
          <th class="text-left">
            UPDATED AT
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shipment, index) in shipments" :key="index">
                      <th>{{ shipment.tracking_Number }}</th>
                      <td>{{ shipment.item_name }}</td>                    
                      <td>{{ shipment.createdAt }}</td>
                      <td>{{ shipment.updatedAt }}</td>
                    </tr>
      </tbody>
    </v-table>
   </div>
    </div>   
</template>
<script>
import axios from 'axios';
import {base_url} from '../../constants'
import Sidebar from '../../components/Client/Sidebar.vue'
import Nav from '../../components/Client/Nav.vue'

export default {
    components:{
        Nav,
        Sidebar,
    },
  data() {
    return {
      Nav,
      Sidebar,
      shipments: [],   
      showTable: false,
      tracking_Number: [],
      tracking_not_find:'',
      trackingNoRules: [
      v => !!v || 'Tracking number is required',
      v => /^\d+$/.test(v) || 'Tracking number must contain only digits'
    ]
    }
},
methods: {
    submit() {
         axios.put(`${base_url}/tracking`, { tracking_Number:this.tracking_Number})
           .then((response) => {
             this.shipments = response.data.find_tracking_Number;
             this.showTable = true;
             console.log(this.shipments);
           })
           .catch((error) => {
            this.handleLoginError(error)
             console.error("Error fetching products:", error);
             console.log(error);
           });
       },
       handleLoginError(error) {
    if (error.response.status === 409) {
      this.tracking_not_find = error.response.data.message;     
    } 
  },
  clearError() {
    this.tracking_not_find = '';
  },
},
    }
</script>
<style scoped>
.error {
  color: red;
  font-size: 1.5em;
  margin-top: 5px;
}
</style>