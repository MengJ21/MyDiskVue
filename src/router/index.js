import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Layout from '../views/Layout/index.vue'
// 异步
const Mydisk = ()=>import('../views/Mydisk/Mydisk.vue')
const Myshare = ()=>import('../views/Share/Myshare.vue')
const Receiveshare = ()=>import('../views/Receiveshare/Receiveshare.vue')
const Bin = ()=>import('../views/RecycleBin/Bin.vue')

// 子级路由
const Persondata = ()=>import('../views/PersonalInfo/Persondata.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path:'/Layout',
    component:Layout,
    children:[
      {
        path:'/Mydisk',
        name:'Mydisk',
        component:Mydisk,
        // meta:{title:'我的网盘'},
      },{
        path:'/Share',
        name:'Share',
        component:Myshare
      },{
        path:'/Receiveshare',
        name:'Receiveshare',
        component:Receiveshare
      },{
        path:'/RecycleBin',
        name:'RecycleBin',
        component:Bin
      },{
        path:'/PersonalInfo',
        name:'PersonalInfo',
        component:Persondata
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
