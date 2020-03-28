import Vue from "vue";
import VueRouter from "vue-router";

// 登录组件
const Login = () => import("../views/Login.vue");
// 主面板组件
const Main = () => import("../views/Main.vue");
// 报告单编辑组件
const ErectionReportEdit = () =>
  import("../views/report/ErectionReportEdit.vue");
// 报告单列表组件
const ErectionReportList = () =>
  import("../views/report/ErectionReportList.vue");
// 仪表编辑组件
const MeterEdit = () => import("../views/meter/MeterEdit.vue");
// 仪表列表组件
const MeterList = () => import("../views/meter/MeterList.vue");
// 账号编辑组件
const AccountEdit = () => import("../views/account/AccountEdit.vue");
// 账号列表组件
const AccountList = () => import("../views/account/AccountList.vue");
//
const Home = () => import("../views/Home.vue");
// 审核列表组件
const AuditList = () => import("../views/audit/AuditList.vue");
// 审核展示组件
const AuditShow = () => import("../views/audit/AuditShow.vue");
const AuditPass = () => import("../views/audit/AuditPass.vue");

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

      { path: "/audits/list", component: AuditList },
      { path: "/audits/pass", component: AuditPass },
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
