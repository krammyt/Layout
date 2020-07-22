import Vue from 'vue'
import App from './App.vue'
import ImpVis from '@impvis/components'
import '@impvis/components/dist/impvis-components.min.css'

//export {default as Sidebar} from "./Siderbar";


Vue.use(ImpVis)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
