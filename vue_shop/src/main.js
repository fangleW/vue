import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/global.css'
//导入字体图标
import '@/assets/fonts/iconfont.css'

import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use((config) => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    //在最后必须return config
    return config
  }),
  Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')