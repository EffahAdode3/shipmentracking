
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
            v-model="fullName"
            :rules="nameRules"
            label="Full Name"
            placeholder="Doe"
            required
          ></v-text-field>
          <v-text-field
            v-model="company"
            :rules="nameRules"
            label="Company"
            placeholder="Movis Logistic"
            required
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="email"
            :rules="emailRules"
            label="Email"
            placeholder="example@example.com"
            required
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
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
import {base_url} from '../../constants'
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
      fullName: '',
      company: '',
      email: '',
      password: '',
      nameRules: [
        v => !!v || 'Field is required',
      ],
      emailRules: [
        v => !!v || 'Field is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Field is required',
        v => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(v) || 'Password must contain at least one letter and one number, and be at least 8 characters',
      ],
    };
  },
  methods: {
    submit() {
        axios
          .post(`${base_url}/client/signupClient`, { fullName: this.fullName,
            company: this.company, email: this.email, 
          password: this.password,      
          })
          .then((res) => {
            this.$router.push('/');
            // this.success = res.data.message;
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