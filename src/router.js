import Vue from 'vue'
import Router from 'vue-router'
import Player1 from './views/Player1.vue'
import Player2 from './views/Player2.vue'
import Wait1 from './views/Wait1.vue'
import Wait2 from './views/Wait2.vue'
import Start from './views/Start.vue'
import End from './views/End.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/wait1',
      name: 'wait1',
      component: Wait1
    },
    {
      path: '/player1',
      name: 'player1',
      component: Player1
    },
    {
      path: '/wait2',
      name: 'wait2',
      component: Wait2
    },
    {
      path: '/player2',
      name: 'player2',
      component: Player2
    },
    {
      path: '/end',
      name: 'end',
      component: End
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
