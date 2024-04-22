<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="sandra_a88@gmailcom"
              title="Sandra Adams"
            ></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" nav>
  
            <v-list-item prepend-icon="mdi-folder" to="/Client-Dashboard" title="Dashboard" value="myfiles"></v-list-item>
            <v-list-item v-show="user != null && user.role=='admin' " prepend-icon="mdi-folder" to="/add-shipment" title="Add Shipment" value="myfiles"></v-list-item>
            <!-- <v-list-item v-show="user != null && user.role=='admin' " prepend-icon="mdi-account-multiple" title="View Shipment" value="shared"></v-list-item> -->
            <v-list-item prepend-icon="mdi-star" to="/Client-TrackingShipment" title="Track Shipment" value="starred"></v-list-item>
            <!-- <v-list-item  prepend-icon="mdi-star" to="/Client-ViewProfile" title="View Profile" value="starred"></v-list-item> -->
            <v-list-item prepend-icon="mdi-star" @click="logout" title="Logout" value="starred"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </template>
  
  
  <script>
  export default {
    mounted(){
      var token = localStorage.getItem("token");
      if( token == undefined){
        this.$router.push('/login-client');

      }
      
    },

    methods: {
      logout(){
        // alert("logout");
        localStorage.clear();
        this.$router.push('/login-client');
      }
    }
  }
  </script>
  
  