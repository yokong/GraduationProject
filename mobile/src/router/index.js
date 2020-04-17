import Vue from "vue";
import VueRouter from "vue-router";
const Appointment = () => import("../views/Appointment.vue");
Vue.use(VueRouter);

const routes = [{ path: "/appointment", component: Appointment }];

const router = new VueRouter({
  routes,
});

export default router;
