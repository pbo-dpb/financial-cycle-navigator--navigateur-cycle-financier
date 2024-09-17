import { defineCustomElement, h, createApp, getCurrentInstance } from 'vue'
import stl from './index.css?inline'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const pinia = createPinia()

import App from "./App.ce.vue"

const plugins = [];

customElements.define('pbotool-financialcyclenavigator', defineCustomElement({
    render: () => h(App),
    styles: [stl],
    props: {
        debug: { type: [Boolean, String], default: false },
    },
    setup() {
        const app = createApp()
        app.use(pinia)
        app.use(FloatingVue)

        plugins.forEach(app.use)
        const inst = getCurrentInstance()
        Object.assign(inst.appContext, app._context)
        Object.assign(inst.provides, app._context.provides)
    }
}))