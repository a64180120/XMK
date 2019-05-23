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
        redirect: '/fund',//测试
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
      },{
        path: '/payfundapproval',
        component: () =>
          import(/* webpackChunkName:'payfundapproval'*/ '../pages/payfundapproval/index'),
        meta: { requireAuth: true, type: 'page', name: '资金拨付审批' }
      },{
        path: '/approvalcenter',
        component: () =>
          import(/* webpackChunkName:'approvalcenter'*/ '../pages/approvalcenter/index'),
        meta: { requireAuth: true, type: 'page', name: '审批中心' }
      },{
        path: '/paylistapproval',
        component: () =>
          import(/* webpackChunkName:'approvalcenter'*/ '../pages/paylistapproval/index'),
        meta: { requireAuth: true, type: 'page', name: '支付单审批' }
      }
    ]
  },{
    path: '/setting',
    component: ()=> import(/* webpackChunkName:'systemsetting'*/ '../pages/systemsetting'),
    meta: { keep: true },
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName:'audit'*/ '../pages/systemsetting/audit'),
        meta: { requireAuth: true, type: 'page', name: '审核工作流' }
      },
    ]
  }

]

export default staticRoute
