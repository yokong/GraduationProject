/*
 * @Author: your name
 * @Date: 2020-02-12 16:06:22
 * @LastEditTime: 2020-03-09 11:43:19
 * @LastEditors: 赵昱青
 * @Description: In User Settings Edit
 * @FilePath: \King\admin\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("../views/Login.vue");

const Main = () => import("../views/Main.vue");

const ErectionReportEdit = () =>
  import("../views/report/ErectionReportEdit.vue");
const ErectionReportList = () =>
  import("../views/report/ErectionReportList.vue");

const MeterEdit = () => import("../views/MeterEdit.vue");
const MeterList = () => import("../views/MeterList.vue");

const AccountEdit = () => import("../views/account/AccountEdit.vue");
const AccountList = () => import("../views/account/AccountList.vue");

const Home = () => import("../views/Home.vue");

const AuditList = () => import("../views/AuditList.vue");
const AuditShow = () => import("../views/AuditShow.vue");
Vue.use(VueRouter);

const routes = [
  { path: "/login", name: "login", component: Login, meta: { isLogin: true } },
  {
    path: "/",
    name: "Home",
    component: Main,
    children: [
      { path: "/", redirect: "/home" },
      { path: "/home", component: Home },

      { path: "/erectionReports/create", component: ErectionReportEdit },
      {
        path: "/erectionReports/edit/:id",
        component: ErectionReportEdit,
        props: true
      },
      { path: "/erectionReports/list", component: ErectionReportList },

      { path: "/meters/create", component: MeterEdit },
      { path: "/meters/edit/:id", component: MeterEdit, props: true },
      { path: "/meters/list", component: MeterList },

      { path: "/accounts/create", component: AccountEdit },
      { path: "/accounts/edit/:id", component: AccountEdit, props: true },
      { path: "/accounts/list", component: AccountList },

      // { path: "/accounts/create", component: AccountEdit },
      // { path: "/accounts/edit/:id", component: AccountEdit, props: true },
      { path: "/audits/list", component: AuditList },
      { path: "/audits/show/:id", component: AuditShow, props: true }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isLogin && !localStorage.account) {
    return next("/login");
  }
  if (
    (to.path == "/accounts/list" || to.path == "/accounts/create") &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是管理员"
    });
  }
  if (
    (to.path == "/erectionReports/create" ||
      to.path == "/erectionReports/list") &&
    localStorage.authority != 1 &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是安装工程师或管理员"
    });
  }

  if (
    (to.path == "/meters/create" || to.path == "/meters/list") &&
    localStorage.authority != 2 &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是技术主管或管理员"
    });
  }
  next();
});
export default router;
