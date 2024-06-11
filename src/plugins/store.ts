import { createPinia } from 'pinia'
import type { App } from 'vue'

const load = (app: App) => {
  app.use(createPinia())
}

export default load
