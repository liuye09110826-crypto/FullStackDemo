import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Games from "../views/Games.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Games
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/games",
      component: Games
    }
  ]
})

export default router;