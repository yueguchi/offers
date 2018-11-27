import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/pages/auth/Signin'
import UserList from '@/pages/UserList'
import Signup from '@/pages/auth/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserList
    }
  ]
})
