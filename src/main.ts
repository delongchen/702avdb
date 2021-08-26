import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import antdUse from "@/core/antdUse";

const app = createApp(App)
antdUse(app)

app.use(router)
app.mount("#app")
