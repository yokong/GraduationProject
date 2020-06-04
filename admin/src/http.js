import axios from "axios";
import Vue from "vue";
import router from "./router";
import NProgress from "nprogress"; // 引入nprogress插件
import "nprogress/nprogress.css"; // 这个nprogress样式必须引入
const http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || "/admin/api",
  baseURL: "http://localhost:3000/admin/api",
});
// 请求拦截器
http.interceptors.request.use(
  function(config) {
    NProgress.start(); // 设置加载进度条(开始..)
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + (localStorage.token || "");
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    NProgress.done(); // 设置加载进度条(结束..)
    return res;
  },
  (err) => {
    console.log(err.response, "12312321");
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });
    }
    if (err.response.status === 401) {
      router.push("/login");
    }

    return Promise.reject(err);
  }
);

export default http;
