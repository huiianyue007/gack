import store from 'store'
import Vue from 'vue'
import Router from 'vue-router'
import Twelve from 'page/twelve'
import gackstatic from 'page/gackstatic'
import interspace from 'page/interspace'
const gack = () => import('page/gack.vue')
const Index = () => import('page/gack/index')
const demand = () => import('page/gack/demand')
const Help = () => import('page/gack/help')
const Trademark = () => import('page/trademark')
const Contract = () => import('page/gack/contract')
const Space = () => import('page/gack/space.vue')
const TradeInfo = () => import('page/gack/tradeInfo.vue')
const shopDetails = () => import('page/gack/shopDetails.vue')
const patentInfo = () => import('page/gack/patentInfo.vue')
const Activity = () => import('page/gack/activity.vue')
const Aboutus = () => import('page/gack/aboutus.vue')
const paidReading = () => import('page/paidReading')
const Negotiated = () => import('page/gack/negotiated.vue')
const About = () => import('page/gack/about.vue')
const newsDetail = () => import('page/gack/newsDetails.vue')
const User = () => import('page/gack/user.vue')
const userIndex = () => import('page/gack/user/index')
const Message = () => import('page/gack/user/message')
const selectMessage = () => import('page/gack/user/selectMessage')
const Address = () => import('page/gack/user/address')
const EditAddress = () => import('page/gack/user/editAddress')
const appointment = () => import('page/gack/user/appointment')
const Order = () => import('page/gack/user/order')
const OrderList = () => import('page/gack/orderList')
const eventDetails = () => import('page/gack/eventDetails')
const submitOrder = () => import('page/gack/submitOrder')
const spaceList = () => import('page/gack/spaceList')
const invoiceOrder = () => import('page/gack/user/invoice')
const addInvoice = () => import('page/gack/user/addInvoice')
const myInvoice = () => import('page/gack/user/myInvoice')
const evaluate = () => import('page/gack/evaluate')
const Coupon = () => import('page/gack/user/coupon')
const Collection = () => import('page/gack/user/collection')
const userFeedback = () => import('page/gack/user/feedback')
const dockingRecord = () => import('page/gack/user/dockingRecord')
const Feedback = () => import('page/gack/user/feedback')
const Service = () => import('page/gack/service')
const Concat = () => import('page/gack/concat')
const setPass = () => import('page/gack/user/setPassWord')
const appcon = () => import('page/gack/user/appcon')
const Serde = () => import('page/gack/serde')
const Rule = () => import('page/gack/rule')
const Finance = () => import('page/gack/finance')
const FinanceDesc = () => import('page/gack/financeDesc')
const error = () => import('page/error')
const register = () => import('page/register')
const login = () => import('page/login')

//金融
const financial = () => import('page/gack/user/financial')
const issueFinancial = () => import('page/gack/user/issueFinancial')
const financing = () => import('page/gack/user/financing')


//后台
const backHome = () => import('page/backHome')
const middle = () => import('page/backpage/middle')
const information = () => import('page/backpage/information')
//订单列表
const merchandise = () => import('page/backpage/merchandise')
const merchandetails = () => import('page/backpage/merchandetails')
//雇主发票管理
const invoice = () => import('page/backpage/invoice')
//收支明细
const expenditure = () => import('page/backpage/expenditure')
// 首页
const backIndex = () => import('page/backpage/backIndex')
//发票信息管理
const invoiceInformation = () => import('page/backpage/invoiceInformation')
//我的发票管理
const meInvoice = () => import('page/backpage/meInvoice')
// 发布商品
const commodity = () => import('page/backpage/commodity')
// 商品管理
const manage = () => import('page/backpage/manage')
// 数据统计
const dataStatistics = () => import('page/backpage/dataStatistics')
// 修改密码
const changePassword = () => import('page/backpage/changePassword')
// 修改服务范围
const changeServiceArea = () => import('page/backpage/changeServiceArea')
// 编辑页面
const edit = () => import('page/backpage/edit')
// 评论展示
const reviewShow = () => import('page/backpage/reviewShow')
//空间预约
const SpaceBooking = () => import('page/backpage/SpaceBooking')
//空间发布
const spatialPublishing = () => import('page/backpage/spatialPublishing')
//空间设置
const spaceHome = () => import('page/backpage/spaceHome')
//报名表单
const entryForm = () => import('page/entryForm')
//活动详情App
const particulars = () => import('page/App/particulars')
// 忘记密码
const Profile = () => import('page/profile')
//H5详情页
const share = () => import('page/App/share')
//店铺
const shopSet = () => import('page/backpage/shopSet')
const shopCase = () => import('page/backpage/shopCase')
//企业创新需求管理
const innovations = () => import('page/backpage/innovations')

Vue.use(Router)
let routes = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'gack',
      component: gack,
      children: [{
        path: '/',
        name: 'index',
        component: Index,
      }, {
        path: '/paidreading/:id',
        name: 'paidreading',
        component: paidReading,
      }, {
        path: '/demand/:id/:type',
        name: 'demand',
        component: demand,
      }, {
        path: '/negotiated',
        name: 'negotiated',
        component: Negotiated,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/newsdetail/:id',
        name: 'newsdetail',
        component: newsDetail,
      }, {
        path: '/spacelist',
        name: 'spacelist',
        component: spaceList,
      }, {
        path: '/eventdetails/:id',
        name: 'eventdetails',
        component: eventDetails,
      }, {
        path: '/help',
        name: 'help',
        component: Help,
      }, {
        path: '/orderlist',
        component: OrderList,
        name: 'order-list',
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/gackstatic',
        component: gackstatic,
        name: 'gackstatic'
      }
        , {
        path: '/interspace',
        component: interspace,
        name: 'interspace'
      }, {
        path: '/twelve',
        component: Twelve,
        name: 'twelve'
      }, {
        path: '/serde/:id/:type',
        name: 'serde',
        component: Serde,
      }, {
          path: '/rule',
          component: Rule,
          name: 'rule',
        }, {
          path: '/finance',
          name: 'finance',
          component: Finance,
        }, {
          path: '/financedesc/:id',
          name: 'finance_desc',
          component: FinanceDesc,
        }, {
        path: '/evaluate/:id',
        component: evaluate,
        name: 'evaluate',
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/submit-order/:id/:type',
        component: submitOrder,
        name: 'submit-order',
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/service',
        name: 'service',
        component: Service
      }, {
        path: '/concat',
        name: 'concat',
        component: Concat,
      }, {
        path: '/space',
        name: 'space',
        component: Space,
      }, {
        path: '/contract',
        name: 'contract',
        component: Contract,
      }, {
        path: '/shopDetails',
        name: 'shopDetails',
        component: shopDetails,
      }, {
        path: '/tradeinfo/:id',
        name: 'tradeinfo',
        component: TradeInfo,
      }, {
        path: '/patentinfo/:id',
        name: 'patentinfo',
        component: patentInfo,
      }, {
        path: '/space',
        name: 'space',
        component: Space,
      }, {
        path: '/activity',
        name: 'activity',
        component: Activity,
      }, {
        path: '/aboutus/:id',
        name: 'aboutus',
        component: Aboutus,
      }, {
        path: '/about',
        name: 'about',
        component: About,
      }, {
        path: 'user',
        name: 'user',
        component: User,
        children: [{
          path: '/',
          component: userIndex,
          name: 'user_index',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'appcon/:id/:type',
          name: 'appcon',
          component: appcon,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'feedback',
          name: 'feedback',
          component: Feedback,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'selectMessage/:id',
          name: 'selectmessage',
          component: selectMessage,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'setpass',
          component: setPass,
          name: 'setpass',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'editaddress',
          component: EditAddress,
          name: 'edit-address',
          meta: {
            requiresAuth: true
          }
        },{
          path: 'financial',
          name: 'financial',
          component: financial,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'issueFinancial',
          name: 'issueFinancial',
          component: issueFinancial,
          meta: {
            requiresAuth: true
          }
        },{
          path: 'financing',
          name: 'financing',
          component: financing,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'order',
          component: Order,
          name: 'order',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'invoice/:id',
          component: invoiceOrder,
          name: 'invoice',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'addinvoice',
          component: addInvoice,
          name: 'addinvoice',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'myinvoice',
          component: myInvoice,
          name: 'myinvoice',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'appointment',
          component: appointment,
          name: 'appointment',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'address',
          component: Address,
          name: 'address',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'message',
          component: Message,
          name: 'message',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'coupon',
          component: Coupon,
          name: 'coupon',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'collection',
          component: Collection,
          name: 'collection',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'feedback',
          component: userFeedback,
          name: 'feedback',
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'dockingrecord',
          component: dockingRecord,
          name: 'docking_record',
          meta: {
            requiresAuth: true
          }
        }]
      }]
    },
    {
      path: '/profile',
      component: Profile,
      name: 'profile'
    }, {
      path: '/trademark/:id',
      name: 'trademark',
      component: Trademark,
    },
    {
      path: '/entryForm',
      component: entryForm,
      name: 'entryForm',
    },
    {
      path: '/particulars',
      component: particulars,
      name: 'particulars',
    }, {
      path: '/share',
      component: share,
      name: 'share'
    }, {
      path: '*',
      name: 'error',
      component: error
    },
    {
      path: '/register/:service',
      name: 'register',
      component: register
    },
    {
      path: '/login/:service',
      name: 'login',
      component: login
    },
    //按照步骤完善信息页面
    {
      path: '/middle',
      name: 'middle',
      component: middle,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/information',
      name: 'information',
      component: information,
      meta: {
        requiresAuth: true
      }
    },
    //后台商家
    {
      path: '/backHome',
      component: backHome,
      children: [
        {
          path: '/',
          component: backIndex,
          name: 'backIndex',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/commodity',
          component: commodity,
          name: 'commodity',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/merchandise',
          component: merchandise,
          name: 'merchandise',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/innovations',
          component: innovations,
          name: 'innovations',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/manage',
          component: manage,
          name: 'manage',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/merchandetails',
          component: merchandetails,
          name: 'merchandetails',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/invoice',
          component: invoice,
          name: 'invoice',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/expenditure',
          component: expenditure,
          name: 'expenditure',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/dataStatistics',
          component: dataStatistics,
          name: 'dataStatistics',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/changePassword',
          component: changePassword,
          name: 'changePassword',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/changeServiceArea',
          component: changeServiceArea,
          name: 'changeServiceArea',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/edit',
          component: edit,
          name: 'edit',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/invoiceInformation',
          component: invoiceInformation,
          name: 'invoiceInformation',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/meInvoice',
          component: meInvoice,
          name: 'meInvoice',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/reviewShow',
          component: reviewShow,
          name: 'reviewShow',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/SpaceBooking',
          component: SpaceBooking,
          name: 'SpaceBooking',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/spatialPublishing',
          component: spatialPublishing,
          name: 'spatialPublishing',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/spaceHome',
          component: spaceHome,
          name: 'spaceHome',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shopSet',
          component: shopSet,
          name: 'shopSet',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shopCase',
          component: shopCase,
          name: 'shopCase',
          meta: {
            requiresAuth: true
          }
        },

      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

routes.beforeEach((to, from, next) => {
  if (to.name === 'spaceHome') {
    store.state.compile = ''
    sessionStorage.removeItem('compile')
  }
  // 可以在路由元信息指定哪些页面需要登录权限
  let islogin = false;// 假设没有登录（这里应从接口获取）
  let userToken = store.state.userid
  if (userToken) {
    islogin = true;
  } else {
    islogin = false;
  }
  if (to.meta.requiresAuth && !islogin) { // 需要登录授权，这里还需要判断是否登录
    next('/login/0') // 跳转到登录
    return
  }
  next()
})

export default routes;

