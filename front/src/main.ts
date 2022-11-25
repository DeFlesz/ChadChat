import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Equal from 'equal-vue'
import 'equal-vue/dist/style.css'


createApp(App).use(Equal).mount('#app')
