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
        // component: () =>
        //   import(/* webpackChunkName:'home'*/ '../pages/home/index'),
        // meta: { requireAuth: true, type: 'page', name: '首页' }
      },

      {
        path: '/paycenter',
        component: () =>
          import(/* webpackChunkName:'paycenter'*/ '../pages/paycenter/index'),
        meta: { requireAuth: true, type: 'page', name: '支付中心' }
      },
      {
        path: '/payfundapproval',
        component: () =>
          import(/* webpackChunkName:'payfundapproval'*/ '../pages/payfundapproval/index'),
        meta: { requireAuth: true, type: 'page', name: '资金拨付审批' }
      }, {
        path: '/approvalcenter',
        component: () =>
          import(/* webpackChunkName:'approvalcenter'*/ '../pages/approvalcenter/index'),
        meta: { requireAuth: true, type: 'page', name: '审批中心' }
      }, {
        path: '/paylistapproval',
        component: () =>
          import(/* webpackChunkName:'paylistapproval'*/ '../pages/paylistapproval/index'),
        meta: { requireAuth: true, type: 'page', name: '支付单审批' }
      },
      {
        path: '/bankaccount',
        component: () =>
          import(/* webpackChunkName:'bankaccount'*/ '../pages/bankaccount'),
        meta: { requireAuth: true, type: 'page', name: '银行账户档案' }
      },
      {
        path: '/fund',
        component: () =>
          import(/* webpackChunkName:'payfund'*/ '../pages/payfund/index'),
        meta: { requireAuth: true, type: 'page', name: '资金拨付' }
      },{
        path: '/preBuildProject',
        component: () =>
          import(/* webpackChunkName:'payfund'*/ '../pages/preproject/preBuildProject'),
        meta: { requireAuth: true, type: 'page', name: '预立项' }
      },
    ]
  }, {
    path: '/setting',
    component: () => import(/* webpackChunkName:'systemsetting'*/ '../pages/systemsetting'),
    meta: { keep: true },
    children: [
      {
        path: '',
        redirect: 'audit',
        // component: () =>
        //   import(/* webpackChunkName:'audit'*/ '../pages/systemsetting/auditManage/audit'),
        // meta: { requireAuth: true, type: 'page', name: '审核工作流' }
      },
      {
        path: 'audit',
        component: () =>
          import(/* webpackChunkName:'systemaudit'*/ '../pages/systemsetting/auditManage/audit'),
        meta: { requireAuth: true, type: 'page', name: '审核工作流' }
      },
      {
        path: 'post',
        component: () =>
          import(/* webpackChunkName:'systempost'*/ '../pages/systemsetting/auditManage/post'),
        meta: { requireAuth: true, type: 'page', name: '岗位人员设置' }
      },
      {
        path: 'timesetting',
        component: () =>
          import(/* webpackChunkName:'timesetting'*/ '../pages/systemsetting/auditManage/timeSetting'),
        meta: { requireAuth: true, type: 'page', name: '提醒时间设置' }
      },
      {
        path: 'dictionary',
        component: () =>
          import(/* webpackChunkName:'dictionary'*/ '../pages/systemsetting/dataSafe/dictionary'),
        meta: { requireAuth: true, type: 'page', name: '数据字典' }
      },
      {
        path: 'paypassword',
        component: () =>
          import(/* webpackChunkName:'paypassword'*/ '../pages/systemsetting/dataSafe/paypassword'),
        meta: { requireAuth: true, type: 'page', name: '支付口令设置' }
      },
    ]
  }

]

export default staticRoute
