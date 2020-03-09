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
const Main = () => import("../views/Main.vue");

const CategoryEdit = () => import("../views/CategoryEdit.vue");
const CategoryList = () => import("../views/CategoryList.vue");

const ErectionReportEdit = () => import("../views/ErectionReportEdit.vue");
const ErectionReportList = () => import("../views/ErectionReportList.vue");

const MeterEdit = () => import("../views/MeterEdit.vue");
const MeterList = () => import("../views/MeterList.vue");

const AccountEdit = () => import("../views/AccountEdit.vue");
const AccountList = () => import("../views/AccountList.vue");

const Home = () => import("../views/Home.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Main,
    children: [
      { path: "/", redirect: "/home" },
      { path: "/home", component: Home },

      { path: "/categories/create", component: CategoryEdit },
      { path: "/categories/edit/:id", component: CategoryEdit, props: true },
      { path: "/categories/list", component: CategoryList },

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
      { path: "/accounts/list", component: AccountList }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
