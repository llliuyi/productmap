import Vue from 'vue'
import Router from 'vue-router'
import ProductMap from '@/components/ProductMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductMap',
      component: ProductMap
    }
  ]
})
