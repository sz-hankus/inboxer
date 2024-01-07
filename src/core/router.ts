import { createRouter, createWebHistory } from 'vue-router'
import InboxView from '../views/InboxView.vue'
import MessageView from '../views/MessageView.vue'
import { generateNewAddress, getAddressFromStorage } from '@/common/AddressUtils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect() {
        const addr = getAddressFromStorage() || generateNewAddress();
        return { path: '/inbox', query: {login: addr.login, domain: addr.domain} }
      },
    },
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
