import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './core/router'

const app = createApp(App);

app.use(router);
router.push({name: "home"})

console.log("Staring app...")
app.mount('#app');
