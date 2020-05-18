import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import common from './common/js/common'
import VueCropper from 'vue-cropper'

// 图片裁剪
Vue.use(VueCropper)

Vue.config.productionTip = false

// 引用公共方法
Vue.prototype.$common = common


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
