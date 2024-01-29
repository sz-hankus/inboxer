import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './core/router'

const app = createApp(App);

app.use(router);
if (window.location.pathname == '/index.html')
    router.push({name: "home"})

console.log("Staring app...")
app.mount('#app');
