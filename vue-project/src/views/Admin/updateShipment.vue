
<template>
    <div>
        <component :is="Nav"></component>
        <component :is="Sidebar"></component>
        <v-row justify="center" style="z-index: 1;">
    <v-col cols="12" lg="6" md="8" sm="10"  style="z-index: 1;">
      <v-card ref="form"  style="margin-top: 100px; ">
        <div class="error" v-if="success" @click="clearError">{{ success }}</div>
        <v-card-text>
          <v-text-field
            v-model="item_name"
            label="Item Name"
            required
          ></v-text-field>
      <v-select
            v-model="statuses"
            :items="statusOptions"
            label="Status"
            required
          ></v-select>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn variant="text">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
    </div>
</template>
<script>
import axios from 'axios';
import { base_url } from '../../constants';
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
      shipment_id:'',
      item_name:'',
      statuses: '',
      success:'',    
      statusOptions: ['out for delivery', 'delivered'],  
    };
  },
  mounted() {
    this.shipment_id = this.$route.params.id;
    console.log('Shipment_id:', this.shipment_id);
  },
  methods: {
    submit() {
        axios
          .patch(`${base_url}/updateShipment/${ this.shipment_id }`, { item_name:this. item_name,  statuses:this.statuses})
          .then((res) => {
            this.$router.push('/admin-Dashboard');
            if (res.status === 201) { 
              this.registerSucceful = true
              console.log(this.success);
            }
            console.log('Registration Successful');
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
</script>
<style scoped>
.error {
  color: green;
  font-size: 1.5em;
  margin-top: 5px;
}
</style>