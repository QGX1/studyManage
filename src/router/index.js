import Vue from "vue";
import Router from "vue-router";

import header from "../components/home/header.vue";
import home from "../components/home/home.vue";
import search from "../components/home/search.vue";
import item from "../components/mine/item.vue";
import login from "../components/mine/login.vue";
import mine from "../components/mine/mine.vue";
import register from "../components/mine/register.vue";
import tab from "../components/tab.vue";
import note from "../components/note/note.vue";
import store from "../store/index";
import error from "../components/error.vue";
import { log } from "core-js/library/web/timers";
import more from "@/components/home/more";
import detail from "@/components/home/detail";
import todo from "@/components/note/todo";
import write from "@/components/note/write";
import notes from "@/components/note/note_detail";
import collect from "@/components/mine/collect";
import about from "@/components/mine/about";
import edit from "@/components/mine/edit";
import admin from "../views/admin.vue";
import adminlogin from "../views/AdminLogin.vue";
import user1 from "../views/user1.vue";
import user2 from "../views/user2.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: login,
      beforeEnter: (to, from, next) => {
        let token = window.sessionStorage.getItem("token");
        

        if (token) {
          next("/home");
        } else {
          next();
        }
      }
    },
    {
      path: "/home",
      name: "主页",
      components: {
        header,
        home,
        tab
      },
      meta: {
        requiresAuth: true
      }
      // 需要登录才能访问
    },
    {
      path: "/note",
      name: "note",
      components: {
        note,
        tab
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/mine",
      name: "mine",
      components: {
        mine,
        tab
      },
      meta: {
        requiresAuth: true
      }
    
    },
    {
      path: "/register",
      name: "register",
      components: {
        register
      },
      beforeEnter: (to, from, next) => {
        let token = window.sessionStorage.getItem("token");
        if (token) {
          next("/home");
        } else {
          next();
        }
      }
    },

    {
      path: "/search",
      name: "search",
      components: {
        search
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/more",
      name: "more",
      components: {
        more
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/detail/:id",
      name: "detail",
      components: {
        detail
      },
      meta: {
        requiresAuth: true
      }
    },
    //6月9日加

    {
      path: "/todo",
      name: "todo",
      components: {
        todo
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/write",
      name: "write",
      components: {
        write
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/notes/:id",
      name: "notes",
      components: {
        notes
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/collect",
      name: "collect",
      components: {
        collect
      },
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/about",
      name: "about",
      components: {
        about
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit",
      name: "edit",
      components: {
        edit
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/adminlogin",
      name: "adminlogin",
      component: adminlogin
    },
    {
      path: "/admin",
      name: "admin",
      components: {
        admin,
        user1,
      },
      redirect: "/user1",
      children: [
        {
          path: "/user1",
          name: "user1",
          component: user1
        },
        {
          path: "/user2",
          name: "user2",
          component: user2
        }
      ],
      meta: {
        requiresAuth: true
      }
    },

    /////////////
    {
      path: "/error",
      name: "error",
      component: error
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/error"
    }
  ]
});

router.beforeEach((to, from, next) => {
  //路由中设置的needLogin字段就在to当中
  //let token = window.localStorage.getItem('token') 获取token localStorage
  //在sessoinStorage中获取token
  let token = window.sessionStorage.getItem("token");
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      //store.dispatch('getUser')
      next();
    } else {
      // 没有登录,重定向到登录页面
      store.dispatch("logOut");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
