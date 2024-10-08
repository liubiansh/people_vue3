// 常量路由
export const constantRoutes = [
  // 登录页面
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'login',
      hidden: true
    },
  },
  // 登录成功展示的页面 layout
  {
    name: "layout",
    path: "/",
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
      hidden: false,
    },
    redirect: '/home',
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        }
      }
    ]
  },
  // 个人模块
  {
    name: "Common",
    path: "/common",
    // 用的是一级路由 layout的页面
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '个人管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect:'/common/perskilist',
    children: [
      {
        path: '/common/perskilist',
        component: () => import('@/views/common/perskilist/index.vue'),
        name: 'Perskilist',
        meta: {
          title: '技能总览',
          hidden: false,
          icon: 'Histogram',
        },
      },
      {
        path: '/common/perskidetail',
        component: () => import('@/views/common/perskidetail/index.vue'),
        name: 'Perskidetail',
        meta: {
          title: '个人技能明细',
          hidden: false,
          icon: 'Tickets',
        },
      },
      {
        path: '/common/peraddskill',
        component: () => import('@/views/common/peraddskill/index.vue'),
        name: 'Peraddskill',
        meta: {
          title: '新增技能',
          hidden: false,
          icon: 'Plus',
        },
      },
    ]
  },
  // 主管模块
  {
    name: "Leader",
    path: "/leader",
    // 用的是一级路由 layout的页面
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '人员管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect:'/leader/search/seaperdetails',
    children: [
      {
        path: '/leader/search',
        name: 'Search',
        meta: {
          title: '个人信息查询',
          hidden: false,
          icon: 'Histogram',
        },
        redirect:'/leader/search/seaperdetails',
        children: [
          {
            path: '/leader/search/seaperdetails',
            component: () => import('@/views/leader/search/seaperdetails/index.vue'),
            name: 'Seaperdetails',
            meta: {
              title: '人员明细',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/search/seaperhome',
            component: () => import('@/views/leader/search/seaperhome/index.vue'),
            name: 'Seaperhome',
            meta: {
              title: '个人_人事信息',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/search/seaperskidetail',
            component: () => import('@/views/leader/search/seaperskidetail/index.vue'),
            name: 'Seaperskidetail',
            meta: {
              title: '个人_技能总览',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/search/seaperskilist',
            component: () => import('@/views/leader/search/seaperskilist/index.vue'),
            name: 'Peaperskilist',
            meta: {
              title: '个人_技能明细',
              hidden: false,
              icon: 'Histogram',
            },
          },
        ]
      },
      {
        path: '/leader/perskistate',
        name: 'Perskistate',
        meta: {
          title: '人员技能状况',
          hidden: false,
          icon: 'Tickets',
        },
        redirect:'/leader/perskistate/skinumber',
        children: [
          {
            path: '/leader/perskistate/skinumber',
            component: () => import('@/views/leader/perskistate/skinumber/index.vue'),
            name: 'Skinumber',
            meta: {
              title: '技能_数量',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/perskistate/skidetail',
            component: () => import('@/views/leader/perskistate/skidetail/index.vue'),
            name: 'Skidetail',
            meta: {
              title: '技能_明细',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/perskistate/perskirearatio',
            component: () => import('@/views/leader/perskistate/perskirearatio/index.vue'),
            name: 'Perskiratio',
            meta: {
              title: '人技_达成比例',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/perskistate/perskireanumber',
            component: () => import('@/views/leader/perskistate/perskireanumber/index.vue'),
            name: 'Perskinumber',
            meta: {
              title: '人技_达成数量',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/perskistate/perskireadetail',
            component: () => import('@/views/leader/perskistate/perskireadetail/index.vue'),
            name: 'erskidetail',
            meta: {
              title: '人技_人员明细',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/perskistate/figranlist',
            component: () => import('@/views/leader/perskistate/figranlist/index.vue'),
            name: 'Figranlist',
            meta: {
              title: '战力值排行榜',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/perskistate/figupplist',
            component: () => import('@/views/leader/perskistate/figupplist/index.vue'),
            name: 'Figupplist',
            meta: {
              title: '战力值提升榜',
              hidden: false,
              icon: 'Histogram',
            },
          },
        ]
      },
      {
        path: '/leader/teastate',
        name: 'Teastate',
        meta: {
          title: '教材准备状况',
          hidden: false,
          icon: 'Plus',
        },
        redirect:'/leader/teastate/tearatio',
        children: [
          {
            path: '/leader/teastate/tearatio',
            component: () => import('@/views/leader/teastate/tearatio/index.vue'),
            name: 'Tearatio',
            meta: {
              title: '教材_完成比例',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/teastate/teanumber',
            component: () => import('@/views/leader/teastate/teanumber/index.vue'),
            name: 'Teanumber',
            meta: {
              title: '教材_完成数量',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/leader/teastate/teadetail',
            component: () => import('@/views/leader/teastate/teadetail/index.vue'),
            name: 'Teadetail',
            meta: {
              title: '教材_明细',
              hidden: false,
              icon: 'Histogram',
            },
          },
        ]
      },
    ]
  },
  // 维护模块
  {
    name: "Admin",
    path: "/admin",
    // 用的是一级路由 layout的页面
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '系统维护',
      hidden: false,
      icon: 'Lock',
    },
    redirect:'/admin/acccontrol/addaccount',
    children: [
      {
        path: '/admin/acccontrol',
        name: 'Acccontrol',
        meta: {
          title: '账户管理',
          hidden: false,
          icon: 'Histogram',
        },
        redirect:'/admin/acccontrol/addaccount',
        children:[
          {
            path: '/admin/acccontrol/addaccount',
            component: () => import('@/views/admin/acccontrol/addaccount/index.vue'),
            name: 'Addaccount',
            meta: {
              title: '新增账号',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/admin/acccontrol/accmaintain',
            component: () => import('@/views/admin/acccontrol/accmaintain/index.vue'),
            name: 'Accmaintain',
            meta: {
              title: '账号维护',
              hidden: false,
              icon: 'Histogram',
            },
          },
        ]
      },
      {
        path: '/admin/skicontrol',
        name: 'Skicontrol',
        meta: {
          title: '技能管理',
          hidden: false,
          icon: 'Histogram',
        },
        redirect:'/admin/skicontrol/addskill',
        children:[
          {
            path: '/admin/skicontrol/addskill',
            component: () => import('@/views/admin/skicontrol/addskill/index.vue'),
            name: 'Addskill',
            meta: {
              title: '新增技能',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/admin/skicontrol/skillmaintain',
            component: () => import('@/views/admin/skicontrol/skillmaintain/index.vue'),
            name: 'Skillmaintain',
            meta: {
              title: '技能维护',
              hidden: false,
              icon: 'Histogram',
            },
          },
        ]
      },
      {
        path: '/admin/teacontrol',
        name: 'Teacontrol',
        meta: {
          title: '教材管理',
          hidden: false,
          icon: 'Histogram',
        },
        redirect:'/admin/teacontrol/addteach',
        children:[
          {
            path: '/admin/teacontrol/addteach',
            component: () => import('@/views/admin/teacontrol/addteach/index.vue'),
            name: 'Addteach',
            meta: {
              title: '新增教材',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/admin/teacontrol/teamaintain',
            component: () => import('@/views/admin/teacontrol/teamaintain/index.vue'),
            name: 'Teamaintain',
            meta: {
              title: '教材维护',
              hidden: false,
              icon: 'Histogram',
            },
          },
        ]
      },
      {
        path: '/admin/tescontrol',
        name: 'Tescontrol',
        meta: {
          title: '考核管理',
          hidden: false,
          icon: 'Histogram',
        },
        redirect:'/admin/tescontrol/addtest',
        children:[
          {
            path: '/admin/tescontrol/addtest',
            component: () => import('@/views/admin/tescontrol/addtest/index.vue'),
            name: 'Addtest',
            meta: {
              title: '新增考题',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/admin/tescontrol/tesmaintain',
            component: () => import('@/views/admin/tescontrol/tesmaintain/index.vue'),
            name: 'Tesmaintain',
            meta: {
              title: '题库维护',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/admin/tescontrol/tesreault',
            component: () => import('@/views/admin/tescontrol/tesreault/index.vue'),
            name: 'Tesreault',
            meta: {
              title: '考核结果',
              hidden: false,
              icon: 'Histogram',
            },
          },
          {
            path: '/admin/tescontrol/tesdocument',
            component: () => import('@/views/admin/tescontrol/tesdocument/index.vue'),
            name: 'Tesdocument',
            meta: {
              title: '考试记录',
              hidden: false,
              icon: 'Histogram',
            },
          },
        ]
      },
    ]
  },
  // 404页面
  {
    name: "404",
    path: "/404",
    component: () => import('@/views/404/index.vue'),
    meta:{
      title: '404',
      hidden: true,
    }
  },
  // 任意页面
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  //   name: 'Any',
  //   meta: {
  //     title: '任意路由',
  //     hidden: true
  //   },
  // },
]