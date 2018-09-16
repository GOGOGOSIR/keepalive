import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import page from '@/components/page'
import home from '@/components/index'
import jobInfo from '@/components/jobInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/jobInfo',
      name: 'jobInfo',
      component: jobInfo,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/page',
      name: 'page',
      component: page,
      meta: {
        keepAlive: false
      }
    }
  ]
})
