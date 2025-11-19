import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";

// 配置axios
axios.defaults.baseURL = "/api";

// 请求拦截器：添加token到请求头
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理未登录情况
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，code === 1 表示成功
    if (response.data.code === 1) {
      return response.data;
    } else {
      // 业务错误
      ElementUI.Message.error(response.data.message || "操作失败");
      return Promise.reject(new Error(response.data.message || "Error"));
    }
  },
  (error) => {
    if (error.response) {
      // 401 未授权，跳转到登录页
      if (error.response.status === 401) {
        ElementUI.Message.error("登录已过期，请重新登录");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        ElementUI.Message.error(error.response.data.message || "请求失败");
      }
    } else {
      ElementUI.Message.error("网络错误");
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
