import { createRouter, createWebHistory } from 'vue-router'
import AddClient from '../views/Admin/AddClient.vue'
import AddAdmin from '../views/Admin/AddAdmin.vue'
import AddShipment from '../views/Admin/AddShipment.vue'
import AdminLogin from '../views/Admin/Login.vue'
import ClientLogin from '../views/Client/Login.vue'
import ClientDashboard from '../views/Client/Dashboard.vue'
import TrackingShipment from '../views/Client/TrackingShipment.vue'
import AdminDashboard from '../views/Admin/Dashboard.vue'
import TrackingAdminShipment from '../views/Admin/TrackingShipment.vue'
import viewAll from '../views/Admin/viewClient.vue'
import CheckClient from '../views/Admin/CheckClient.vue'
import updateShipment from '../views/Admin/updateShipment.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AdminDashboard',
      component: AdminDashboard
    },
    {
      path: '/update-shipment/:id',
      name: 'updateShipment',
      component: updateShipment
    },
    {
      path: '/check-client/:Client_id',
      name: 'CheckClient',
      component: CheckClient
    },
    {
      path: '/add-Shipment',
      name: 'AddShipment',
      component: AddShipment
    },
    {
      path: '/track-admin-Shipment',
      name: 'TrackingAdminShipment',
      component: TrackingAdminShipment
    },
    {
      path: '/view-all',
      name: 'viewAll',
      component: viewAll
    },
    {
      path: '/add-admin',
      name: 'AddAdmin',
      component: AddAdmin
    },
   
    {
      path: '/add-client',
      name: 'AddClient',
      component: AddClient
    },
    {
      path: '/login-admin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/login-client',
      name: 'ClientLogin',
      component: ClientLogin
    },
    {
      path: '/add-shipment',
      name: 'AddShipment',
      component: AddShipment
    },
    {
      path: '/Client-Dashboard',
      name: 'ClientDashboard',
      component: ClientDashboard
    },
    {
      path: '/Client-TrackingShipment',
      name: 'TrackingShipment',
      component:TrackingShipment
    },

  ]
})

export default router
