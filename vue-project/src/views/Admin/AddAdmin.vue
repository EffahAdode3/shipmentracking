
<template>
    <div>
        <component :is="Nav"></component>
        <component :is="Sidebar"></component>
        <v-card
            class="mx-auto"
            max-width="344"
            title="Add Admin"
            style="margin-top: 150px;">
    
        <div class="error" v-if="emailExistError" @click="clearError">{{ emailExistError }}</div>
        <div class="success" v-if="success" @click="clearError">{{ success }}</div>
            <v-container>
            <v-text-field
                v-model="firstName"
                color="primary"
                label="First name"
                variant="underlined"
                :rules="nameRules"
            ></v-text-field>
            <v-text-field
                v-model="lastName"
                color="primary"
                label="Last name"
                variant="underlined"
                :rules="nameRules"
            ></v-text-field>
            <v-text-field
                v-model="email"
                color="primary"
                label="Email"
                variant="underlined"
                :rules="emailRules"
            ></v-text-field>
            <v-text-field
                v-model="phoneNumber"
                color="primary"
                label="Phone number"
                variant="underlined"
                :rules="phoneRules"
            ></v-text-field>
            <v-text-field
                v-model="password"
                color="primary"
                label="Password"
                placeholder="Enter your password"
                variant="underlined"
                :rules="passwordRules"
            ></v-text-field>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="submitForm" :disabled="!formIsValid">
                Complete Registration
                <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios'
import Nav from '../../components/Admin/Nav.vue'
import Sidebar from '../../components/Admin/Sidebar.vue'
import { base_url } from '../../constants'
export default{
    components:{
        Nav,
        Sidebar,
    },
    data() {
    return {
        Nav,
        Sidebar,
        firstName: null,
        lastName: null,
      email: null,
      phoneNumber: null,
      password: null,
      registerSucceful: false,
      emailExistError:'',
      success:'',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phoneRules: [
  v => !!v || 'Phone number is required',
  v => /^[\d+-]+$/.test(v) || 'Phone number must be valid',
],
passwordRules: [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must be at least 8 characters',
  v => /[0-9]/.test(v) || 'Password must contain at least one number',
  v => /[a-zA-Z]/.test(v) || 'Password must contain at least one letter',
],
    }  
  },
  computed: {
    formIsValid() {
      return this.nameRules.every(rule => rule(this.firstName) === true) &&
             this.nameRules.every(rule => rule(this.lastName) === true) &&
             this.emailRules.every(rule => rule(this.email) === true) &&
             this.phoneRules.every(rule => rule(this.phoneNumber) === true) &&
             this.passwordRules.every(rule => rule(this.password) === true)
    }
  },
  methods: {
    submitForm() {
      if (this.formIsValid) {
        axios
          .post(`${base_url}/signup`, { firstName: this.firstName, lastName: this.lastName, email: this.email, phoneNumber: this.phoneNumber, password: this.password })
          .then((res) => {
            this.$router.push('/Dashboard');
            if (res.status === 201) {
              this.registerSucceful = true
            }
            console.log('Registration Successful');
          })
          .catch((error) => {
            if (error.response.status === 409) {
              this.emailExistError = error.response.data.message;
          }
            console.log(error);
          })
      }
    },
    clearError() {
    this.emailExistError = '';
    this.success ='';
  },
  }
}
</script>
<style scoped>
.success {
  color: green;
  font-size: 1.5em;
  margin-top: 5px;
}
.error {
  color: red;
  font-size: 1.5em;
  margin-top: 5px;
}
</style>