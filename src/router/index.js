import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由配置
const routes = [
  {
    path: "/login", // 登录页面路由
    name: "login",
    component: () => import("../views/element/LoginView.vue"),
    meta: { requiresAuth: false }, // 不需要登录认证
  },
  {
    path: "/user", // 用户管理页面路由
    name: "user",
    component: () => import("../views/element/UserView.vue"),
    meta: { requiresAuth: true }, // 需要登录认证
  },
  {
    path: "/question", // 题目管理页面路由
    name: "question",
    component: () => import("../views/element/QuestionView.vue"),
    meta: { requiresAuth: true }, // 需要登录认证
  },
  {
    path: "/", // 根路径重定向到用户管理页面
    redirect: "/user",
  },
];

const router = new VueRouter({
  routes,
});

// 导航守卫：检查是否需要登录
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // 如果目标路由需要认证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      // 没有token，跳转到登录页
      next({
        path: "/login",
        query: { redirect: to.fullPath }, // 记录原本要访问的路径
      });
    } else {
      // 有token，放行
      next();
    }
  } else {
    // 不需要认证的路由直接放行
    if (to.path === "/login" && token) {
      // 已登录用户访问登录页，跳转到首页
      next("/user");
    } else {
      next();
    }
  }
});

export default router;
