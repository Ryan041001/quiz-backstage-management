import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由配置
const routes = [
  {
    path: "/user", // 用户管理页面路由
    name: "user",
    component: () => import("../views/element/UserView.vue"),
  },
  {
    path: "/question", // 题目管理页面路由
    name: "question",
    component: () => import("../views/element/QuestionView.vue"),
  },
  {
    path: "/", // 根路径重定向到用户管理页面
    redirect: "/user",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
