import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Write from "./views/Write.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/Write",
      name: "Write",
      component: Write
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
