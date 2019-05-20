/**
 * 在打包的时候，chunk包名字都是乱的，如果我们指定命名，该怎么办呢？webpack3提供了Magic Comments（魔法注释）
 */

const Layout = () => import(/* webpackChunkName: 'layout' */ '../pages/layout')

const staticRoute = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    component: Layout,
    meta: { keep: true },
    children: [
      {
        path: '',
        redirect: '/fund',
        component: () =>
          import(/* webpackChunkName:'home'*/ '../pages/home/index'),
        meta: { requireAuth: true, type: 'page', name: '首页' }
      },
      {
        path: '/fund',
        component: () =>
          import(/* webpackChunkName:'home'*/ '../pages/payfund/index'),
        meta: { requireAuth: true, type: 'page', name: '资金拨付' }
      },
      {
        path: '/paycenter',
        component: () =>
          import(/* webpackChunkName:'home'*/ '../pages/paycenter/index'),
        meta: { requireAuth: true, type: 'page', name: '支付中心' }
      }
    ]
  }
]

export default staticRoute
