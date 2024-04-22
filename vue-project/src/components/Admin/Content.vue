
<template>
    <div>
        <v-container style="margin-top: 100px">
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
                      <td>{{ shipment.statuses }}</td>
                      <td>{{ shipment.createdAt }}</td>
                      <td>{{ shipment.updatedAt }}</td>
                    </tr>

      </tbody>
    </v-table>
</div>
</div>
  </template>
  
  <script>
  import * as XLSX from 'xlsx';                                   
  import axios from "axios";
  import {base_url} from '../../constants'
   export default {
     data() {
       return {
         shipments: [],                           
       };
     },

     methods:{
        dataExport(){
            const worksheet = XLSX.utils.json_to_sheet(this.shipments);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Exports");
            XLSX.writeFile(workbook, "Exports.xlsx", { compression: true })
        }
     },
     created(){
         axios.get(`${base_url}/shipment`, {
            headers: {
                token: localStorage.getItem("token")
            }
         })
           .then((response) => {
             this.shipments = response.data.allShipment;
             console.log(this.shipments);
           })
           .catch((error) => {
             console.error("Error fetching products:", error);
           });
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