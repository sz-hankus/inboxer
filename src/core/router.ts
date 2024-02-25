import { createRouter, createWebHistory } from 'vue-router'
import InboxView from '../views/InboxView.vue'
import MessageView from '../views/MessageView.vue'
import { generateNewAddress, getAddressFromStorage, saveAddressToStorage } from '@/common/AddressUtils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/inbox',
      name: 'inbox',
      component: InboxView
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView
    }
  ]
})

export default router
