
<template>
    <div>
        <component :is="Nav"></component>
        <component :is="Sidebar"></component>
      <div class="d-flex justify-center" style="margin-top: 100px">
    <v-card width="500px" v-card v-for="(view, index) in ViewProfile" :key="index">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4"> {{view.fullName }} </v-card-title>
      <v-card-text>
        <div> {{ view.company }}</div>
          <div> {{ view.email }}</div>
      </v-card-text>
    </v-card>
  </div>
        <v-container style="margin-top: 50px">

        <v-row>
            <v-col>
                <v-card
                    subtitle="Total shipment orders"
                    :text="totalShipments"
                    title="TOTAL SHIPTMENTS"
                ></v-card>
            </v-col>
            <v-col>
                <v-card 
                    subtitle="Total items delivered"
                    :text="totalDeliveries"
                    title="DELIVERIES"
                ></v-card>
            </v-col>
            <v-col>
                <v-card
                    subtitle="Total shipment sent out for delivery"
                    :text="totalOutForDelivery"
                    title="OUT FOR DELIVERY"
                ></v-card>
            </v-col>
        </v-row>
       </v-container>
     <div class="table-container">
        <v-btn @click="dataExport" v-bind="props" text="Export Excel"></v-btn>
        <!-- <button @click="dataExport">Export</button> -->
        <v-table density="compact" style="margin-top: 100px;">
    <thead>
      <tr>
        <th class="text-left">TRACKING NUMBER</th>
        <th class="text-left">ITEM NAME</th>
        <th class="text-left">STATUSES</th>
        <th class="text-left">CREATED AT</th>
        <th class="text-left">UPDATED AT</th>
        <th class="text-left">ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(shipment, index) in shipments" :key="index">
        <th v-if="!shipment.editing">{{ shipment.tracking_Number }}</th>
        <td v-if="!shipment.editing">
          
          {{ shipment.item_name }}
        </td>
        <td v-if="!shipment.editing">{{ shipment.statuses }}</td>
        <td v-if="!shipment.editing">{{ shipment.createdAt }}</td>
        <td v-if="!shipment.editing">{{ shipment.updatedAt }}</td>
        <td v-if="!shipment.editing">
          <button @click="editShipment(shipment.id)">Edit</button> 
        </td>
      </tr>
    </tbody>
  </v-table>
</div>
</div>
  </template>
  
  <script>
  import * as XLSX from 'xlsx';                                   
  import axios from "axios";
  import {base_url} from "../../constants"
  import Sidebar from '../../components/Admin/Sidebar.vue';
import Nav from '../../components/Admin/Nav.vue';
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
         ViewProfile: [],      
         Client_id:'',                
       };
     },

methods: {
    dataExport() {
      const worksheet = XLSX.utils.json_to_sheet(this.shipments);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Exports');
      XLSX.writeFile(workbook, 'Exports.xlsx', { compression: true });
    },
    fetchClientShipments(Client_id) {
      axios.get(`${base_url}/getEach/${Client_id}`)
        .then((response) => {
          this.shipments = response.data.allShipment;
          console.log(this.shipments);
        })
        .catch((error) => {
          console.error('Error fetching shipments:', error);
        });              
    },
        fetchClients(Client_id) {
         // Example API call using axios
         axios.get(`${base_url}/clientProfile/${Client_id}`)    
           .then((response) => {
             this.ViewProfile = response.data.profile;
           })
           .catch(error => {
             console.error('Error fetching clients: ', error);
           });
       },
  editShipment(id) {
    this.$router.push(`/update-shipment/${id}`);
  }
  },
  mounted() {
    this.Client_id = this.$route.params.Client_id;
    console.log('Client ID:', this.Client_id);
    this.fetchClientShipments(this.Client_id);
    this.fetchClients(this.Client_id)
    console.log('Client :', this.Client_id);
  },
       computed: {
    totalShipments() {
      return this.shipments.length;
    },
    totalDeliveries() {
      return this.shipments.filter(shipment => shipment.statuses === 'delivered').length;
    },
    totalOutForDelivery() {
      return this.shipments.filter(shipment => shipment.statuses === 'out for delivery').length;
    },
  },
     }
  </script>

<style>
.table-container {
  margin: 0 auto; 
  max-width: 70%; 
  padding-top: 50px;
}


</style>