import Vue from "vue";
import VueRouter from "vue-router";

// 登录组件
const Login = () => import("../views/Login.vue");
// 主面板组件
const Main = () => import("../views/Main.vue");
// 报告单编辑组件
const InstallationReportEdit = () =>
  import("../views/report/InstallationReportEdit.vue");
// 报告单列表组件
const InstallationReportList = () =>
  import("../views/report/InstallationReportList.vue");
// 仪表编辑组件
const MeterEdit = () => import("../views/meter/MeterEdit.vue");
// 仪表列表组件
const MeterList = () => import("../views/meter/MeterList.vue");
// 介质编辑组件
const MediumEdit = () => import("../views/medium/MediumEdit.vue");
// 介质列表组件
const MediumList = () => import("../views/medium/MediumList.vue");
// 容器编辑组件
const ContainerEdit = () => import("../views/container/ContainerEdit.vue");
// 容器列表组件
const ContainerList = () => import("../views/container/ContainerList.vue");
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

// 公告编辑组件
const NoticeEdit = () => import("../views/notice/NoticeEdit.vue");
// 公告列表组件
const NoticeList = () => import("../views/notice/NoticeList.vue");
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

      {
        path: "/installationReports/create",
        component: InstallationReportEdit,
      },
      {
        path: "/installationReports/edit/:id",
        component: InstallationReportEdit,
        props: true,
      },
      { path: "/installationReports/list", component: InstallationReportList },

      { path: "/meters/create", component: MeterEdit },
      { path: "/meters/edit/:id", component: MeterEdit, props: true },
      { path: "/meters/list", component: MeterList },

      { path: "/mediums/create", component: MediumEdit },
      { path: "/mediums/edit/:id", component: MediumEdit, props: true },
      { path: "/mediums/list", component: MediumList },

      { path: "/containers/create", component: ContainerEdit },
      { path: "/containers/edit/:id", component: ContainerEdit, props: true },
      { path: "/containers/list", component: ContainerList },

      { path: "/accounts/create", component: AccountEdit },
      { path: "/accounts/edit/:id", component: AccountEdit, props: true },
      { path: "/accounts/list", component: AccountList },

      { path: "/audits/list", component: AuditList },
      { path: "/audits/pass", component: AuditPass },
      { path: "/audits/show/:id", component: AuditShow, props: true },

      { path: "/notices/create", component: NoticeEdit },
      { path: "/notices/edit/:id", component: NoticeEdit, props: true },
      { path: "/notices/list", component: NoticeList },
    ],
  },
];

const router = new VueRouter({
  routes,
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
      message: "权限不足，您不是管理员",
    });
  }
  if (
    (to.path == "/installationReports/create" ||
      to.path == "/installationReports/list") &&
    localStorage.authority != 1 &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是安装工程师或管理员",
    });
  }

  if (
    (to.path == "/meters/create" || to.path == "/meters/list") &&
    localStorage.authority != 2 &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是技术主管或管理员",
    });
  }
  if (
    (to.path == "/mediums/create" || to.path == "/mediums/list") &&
    localStorage.authority != 2 &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是技术主管或管理员",
    });
  }
  if (
    (to.path == "/notices/create" || to.path == "/notices/list") &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是管理员",
    });
  }
  if (
    (to.path == "/audits/list" || to.path == "/audits/pass") &&
    localStorage.authority != 2 &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是技术主管或管理员",
    });
  }
  if (
    (to.path == "/containers/create" || to.path == "/containers/list") &&
    localStorage.authority != 2 &&
    localStorage.authority != 3
  ) {
    return Vue.prototype.$message({
      type: "error",
      message: "权限不足，您不是技术主管或管理员",
    });
  }
  next();
});

export default router;
