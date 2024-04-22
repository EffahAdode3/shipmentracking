
   <template>
    <div>
      <component :is="Nav"></component>
      <component :is="Sidebar"></component>
      
      <v-container style="margin-top: 100px">
        <v-card v-for="(view, index) in Views" :key="index" class="mb-4" @click="navigateToClient(view.id)">
          <v-card-title style="cursor: pointer;">{{ view.fullName }}</v-card-title>
          <v-card-text>
            <div>Company: {{ view.company }}</div>
            <div>Email: {{ view.email }}</div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { base_url } from '../../constants';
  import Nav from '../../components/Admin/Nav.vue'
  import Sidebar from '../../components/Admin/Sidebar.vue'

  export default {
    components: {
      Nav,
      Sidebar,
    },
    data() {
      return {
        Nav,
      Sidebar,
        Views: [],
      };
    },
    mounted() {
      this.fetchClients();
    },
    methods: {
      fetchClients() {
        axios.get(`${base_url}/getClient`)
          .then(response => {
            this.Views = response.data.clients;
          })
          .catch(error => {
            console.error('Error fetching clients: ', error);
          });
      },
      navigateToClient(clientId) {
    this.$router.push(`/check-client/${clientId}`);
  },
    },
  };
  </script>

  