import axios from "axios";
import Vue from "vue";
import router from "./router";
const http = axios.create({
  baseURL: "http://localhost:3000/admin/api"
});
// 请求拦截器
http.interceptors.request.use(
  function(config) {
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
  res => {
    return res;
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message
      });
    }
    // console.log(err.response.data);
    if (err.response.status === 401) {
      // console.log("login");
      router.push("/login");
    }

    return Promise.reject(err);
  }
);

export default http;
