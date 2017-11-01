import store from 'store'
import Vue from 'vue'
import Router from 'vue-router'
// import gack from 'page/gack.vue'
// import Index from 'page/gack/index'
// import Help from 'page/gack/help'
// import Space from 'page/gack/space.vue'
// import Activity from 'page/gack/activity.vue'
// import Aboutus from 'page/gack/aboutus.vue'
// import paidReading from 'page/paidReading'
// import Negotiated from 'page/gack/negotiated.vue'
// import About from 'page/gack/about.vue'
// import newsDetail from 'page/gack/newsDetails.vue'
// import User from 'page/gack/user.vue'
// import userIndex from 'page/gack/user/index'
// import Message from 'page/gack/user/message'
// import selectMessage from 'page/gack/user/selectMessage'
// import Address from 'page/gack/user/address'
// import EditAddress from 'page/gack/user/editAddress'
// import appointment from 'page/gack/user/appointment'
// import Order from 'page/gack/user/order'
// import OrderList from 'page/gack/orderList'
// import eventDetails from 'page/gack/eventDetails'
// import submitOrder from 'page/gack/submitOrder'
// import spaceList from 'page/gack/spaceList'
// import invoiceOrder from 'page/gack/user/invoice'
// import addInvoice from 'page/gack/user/addInvoice'
// import myInvoice from 'page/gack/user/myInvoice'
// import evaluate from 'page/gack/evaluate'
// import Coupon from 'page/gack/user/coupon'
// import Collection from 'page/gack/user/collection'
// import userFeedback from 'page/gack/user/feedback'
// import Feedback from 'page/gack/user/feedback'
// import Service from 'page/gack/service'
// import Concat from 'page/gack/concat'
// import setPass from 'page/gack/user/setPassWord'
// import appcon from 'page/gack/user/appcon'
// import Serde from 'page/gack/serde'
// import error from 'page/error'
// import register from 'page/register'
// import login from 'page/login'
//
// //后台
// import backHome from 'page/backHome'
// import middle from 'page/backpage/middle'
// import information from 'page/backpage/information'
// //订单列表
// import merchandise from 'page/backpage/merchandise'
// import merchandetails from 'page/backpage/merchandetails'
// //雇主发票管理
// import invoice from 'page/backpage/invoice'
// //收支明细
// import expenditure from 'page/backpage/expenditure'
// // 首页
// import backIndex from 'page/backpage/backIndex'
// //发票信息管理
// import invoiceInformation from 'page/backpage/invoiceInformation'
// //我的发票管理
// import meInvoice from 'page/backpage/meInvoice'
// // 发布商品
// import commodity from 'page/backpage/commodity'
// // 商品管理
// import manage from 'page/backpage/manage'
// // 数据统计
// import dataStatistics from 'page/backpage/dataStatistics'
// // 修改密码
// import changePassword from 'page/backpage/changePassword'
// // 修改服务范围
// import changeServiceArea from 'page/backpage/changeServiceArea'
// // 编辑页面
// import edit from 'page/backpage/edit'
// // 评论展示
// import reviewShow from 'page/backpage/reviewShow'
// //空间预约
// import SpaceBooking from 'page/backpage/SpaceBooking'
// //空间发布
// import spatialPublishing from 'page/backpage/spatialPublishing'
// //空间设置
// import spaceHome from 'page/backpage/spaceHome'
// //报名表单
// import entryForm from 'page/entryForm'
// //活动详情App
// import particulars from 'page/App/particulars'
// // 忘记密码
// import Profile from 'page/profile'
// //H5详情页
// import share from 'page/App/share'
// const gack = () => import('/page/gack')
const gack = () => import('page/gack.vue')
const Index = () => import('page/gack/index')
const Help = () => import('page/gack/help')
const Space = () => import('page/gack/space.vue')
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
const Feedback = () => import('page/gack/user/feedback')
const Service = () => import('page/gack/service')
const Concat = () => import('page/gack/concat')
const setPass = () => import('page/gack/user/setPassWord')
const appcon = () => import('page/gack/user/appcon')
const Serde = () => import('page/gack/serde')
const error = () => import('page/error')
const register = () => import('page/register')
const login = () => import('page/login')

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
        path: '/serde/:id/:type',
        name: 'serde',
        component: Serde,
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
        }]
      }]
    },
    {
      path: '/profile',
      component: Profile,
      name: 'profile'
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
    },{
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
        }
      ]
    }
  ],
  //scrollBehavior (to, from, savedPosition) {
  // return { x: 0, y: 0 }
  // }
})

routes.beforeEach((to, from, next) => {
  if(to.name === 'spaceHome'){
    store.state.compile = ''
    sessionStorage.removeItem('compile')
  }
  // 可以在路由元信息指定哪些页面需要登录权限
  let islogin = false;// 假设没有登录（这里应从接口获取）
  if ((/submit-order/).test(to.path)) {
    let userid = JSON.parse(window.localStorage.getItem('userid'))
    if (userid) {
      store.commit('setUserId', userid)
    }
  }
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

