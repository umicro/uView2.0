import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

// 引入事列样式
import props from 'common/props'

const app = new Vue({
    ...App
})
app.$mount()
