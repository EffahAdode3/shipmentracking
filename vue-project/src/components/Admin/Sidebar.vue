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
            <v-list-item prepend-icon="mdi-folder" to="/" title="Dashboard" value="myfiles"></v-list-item>
            <v-list-item  prepend-icon="mdi-account-multiple"  to="/add-client" title="Add Client" value="shared"></v-list-item>
            <v-list-item  prepend-icon="mdi-account-multiple"  to="/view-all" title="View Client" value="shared"></v-list-item>
            <v-list-item  prepend-icon="mdi-folder" to="/add-Shipment" title="Add Shipment" value="myfiles"></v-list-item>       
            <v-list-item prepend-icon="mdi-star" to="/track-admin-Shipment" title="Track Shipment" value="starred"></v-list-item>
            <v-list-item  prepend-icon="mdi-star" to="/add-admin" title="Add Admin" value="starred"></v-list-item>
            <v-list-item prepend-icon="mdi-star" @click="logout" title="Logout" value="starred"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </template>
  
  
  <script>
  export default {
    // mounted(){
    //   let token = localStorage.getItem("token");
    //   if(token == undefined){
    //     this.$router.push('/');
    //   }
    // },

    methods: {
      logout(){
        localStorage.clear();
        this.$router.push('/login-admin');
      },
    },

  }
  </script>
  
  