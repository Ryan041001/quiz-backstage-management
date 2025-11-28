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
      // 业务错误 - 使用更友好的中文提示
      const errorMsg = response.data.message || "操作失败，请稍后重试";
      ElementUI.Message.error(errorMsg);
      return Promise.reject(new Error(errorMsg));
    }
  },
  (error) => {
    let errorMsg = "操作失败，请稍后重试";

    if (error.response) {
      const status = error.response.status;
      const serverMsg = error.response.data?.message;

      switch (status) {
        case 400:
          errorMsg = serverMsg || "请求参数错误，请检查输入内容";
          break;
        case 401:
          errorMsg = "登录已过期或未授权，请重新登录";
          localStorage.removeItem("token");
          router.push("/login");
          break;
        case 403:
          errorMsg = "没有权限执行此操作";
          break;
        case 404:
          errorMsg = "请求的资源不存在";
          break;
        case 500:
          errorMsg = serverMsg || "服务器内部错误，请联系管理员";
          break;
        case 502:
          errorMsg = "网关错误，后端服务可能未启动";
          break;
        case 503:
          errorMsg = "服务暂时不可用，请稍后重试";
          break;
        default:
          errorMsg = serverMsg || `请求失败 (错误码: ${status})`;
      }
    } else if (error.request) {
      errorMsg = "网络连接失败，请检查网络或后端服务是否正常运行";
    } else {
      errorMsg = error.message || "请求发送失败";
    }

    ElementUI.Message.error(errorMsg);
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
