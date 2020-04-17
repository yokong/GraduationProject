import Vue from "vue";
import App from "./App.vue";
import "./plugins/vant.js";
import router from "./router";

// 导入axios配置文件
import http from "./http";
Vue.prototype.$http = http;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
