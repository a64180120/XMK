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
        redirect: '/fund' //测试
        // component: () =>
        //   import(/* webpackChunkName:'home'*/ '../pages/home/index'),
        // meta: { requireAuth: true, type: 'page', name: '首页' }
      },

      {
        name: 'paycenter',
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
      },
      {
        path: '/approvalcenter',
        component: () =>
          import(/* webpackChunkName:'approvalcenter'*/ '../pages/approvalcenter/index'),
        meta: { requireAuth: true, type: 'page', name: '审批中心' }
      },
      {
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
      },
      {
        path: '/projectManage',
        component: () =>
          import(/* webpackChunkName:'projectManage'*/ '../pages/projectManage'),
        meta: { requireAuth: true, type: 'page', name: '预算项目管理' }
      },
      {
        path: '/preBuildProject',
        component: () =>
          import(/* webpackChunkName:'preBuildProject'*/ '../pages/preproject/preBuildProject'),
        meta: { requireAuth: true, type: 'page', name: '预立项',title:'预立项' }
      },
      {
        path: '/preprojectApproval',
        component: () =>
          import(/* webpackChunkName:'preBuildProject'*/ '../pages/bgnyearApproval/preprojectApproval'),
        meta: { requireAuth: true, type: 'page', name: '预立项审批' }
      },
      {
        path: '/projectBuild',
        component: () =>
          import(/* webpackChunkName:'preBuildProject'*/ '../pages/projectBuild/projectBuild'),
        meta: { requireAuth: true, type: 'page', name: '项目立项' }
      },
      {
        path: '/buildprojectApproval',
        component: () =>
          import(/* webpackChunkName:'preBuildProject'*/ '../pages/bgnyearApproval/buildprojectApproval'),
        meta: { requireAuth: true, type: 'page', name: '项目立项审批' }
      },
      {
        path: '/projectList',
        component: () =>
          import(/* webpackChunkName:'preBuildProject'*/ '../pages/projectList/projectList'),
        meta: { requireAuth: true, type: 'page', name: '项目查询' }
      },
      {
        path: '/midyearDeclare',
        component: () =>
          import(/* webpackChunkName:'preBuildProject'*/ '../pages/midyearDeclare/midyearDeclare'),
        meta: { requireAuth: true, type: 'page', name: '年中调整' }
      },
      {
        path: '/yearreport',
        component: () =>
          import(/* webpackChunkName:'yearreport'*/ '../pages/budget/report'),
        meta: { requireAuth: true, type: 'page', name: '年初申报' }
      },
      {
        path: '/progresscontrol',
        component: () =>
          import(/* webpackChunkName:'progresscontrol'*/ '../pages/budget/progresscontrol'),
        meta: { requireAuth: true, type: 'page', name: '进度控制' }
      },

      {
        path: '/buggetreport',
        component: () =>
          import(/* webpackChunkName:'buggetReport'*/ '../pages/budget/buggetReport'),
        meta: { requireAuth: true, type: 'page', name: '预算报表' }
      },
      {
        path: '/projectspent',
        component: () =>
          import(/* webpackChunkName:'progresscontrol'*/ '../pages/projectSpent/index'),
        meta: { requireAuth: true, type: 'page', name: '项目用款' }
      }
    ]
  },
  {
    path: '/setting',
    component: () =>
      import(/* webpackChunkName:'systemsetting'*/ '../pages/systemsetting'),
    meta: { keep: true, type: 'page', name: '系统设置' },
    children: [
      {
        path: '',
        redirect: 'audit'
        // component: () =>
        //   import(/* webpackChunkName:'audit'*/ '../pages/systemsetting/auditManage/audit'),
        // meta: { requireAuth: true, type: 'page', name: '审核工作流' }
      },
      {
        path: 'audit',
        component: () =>
          import(/* webpackChunkName:'systemaudit'*/ '../pages/systemsetting/auditManage/audit'),
        meta: { requireAuth: true, type: 'page', name: '审批流管理' }
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
      {
        path: 'pageandcontrol',
        component: () =>
          import(/* webpackChunkName:'pageandcontrol'*/ '../pages/systemsetting/pageandcontrol'),
        meta: { requireAuth: true, type: 'page', name: '页面与控制项维护' }
      },

      {
        path: 'coderules',
        component: () =>
          import(/* webpackChunkName:'coderules'*/ '../pages/systemsetting/dataSafe/coderules'),
        meta: { requireAuth: true, type: 'page', name: '业务单据编码规则' }
      }
    ]
  }
]

export default staticRoute
