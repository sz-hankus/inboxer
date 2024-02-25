import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './core/router'
import { getAddressFromStorage, generateNewAddress, saveAddressToStorage } from './common/AddressUtils'

const app = createApp(App);

app.use(router);

getAddressFromStorage().then(address => {
  if (address === undefined) {
    address = generateNewAddress();
    saveAddressToStorage(address);
  }
  router.push({ path: '/inbox', query: {login: address.login, domain: address.domain} })

  console.log("Staring app...")
  app.mount('#app');
})

