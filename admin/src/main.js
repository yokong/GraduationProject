import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import "./style.css";
import "./icon/iconfont.css";
// 导入日期处理文件
import moment from "moment";
moment.locale("zh-cn");

import "../node_modules/moment/locale/zh-cn";
Vue.prototype.$moment = moment;
// 导入axios配置文件
import http from "./http";
Vue.prototype.$http = http;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
