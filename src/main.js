import { createApp } from 'vue'
import App from './App.vue'

// Plugins
import { registerPlugins } from "@/plugins";
const app = createApp(App);

async function init() {
  await registerPlugins(app);
  app.mount("#app");
}

init()
