const orderType = [{
  title: '全部订单',
  type: 'all'
},{
  title: '待沟通',
  type: '14'
}, {
  title: '待支付',
  type: '1'
}, {
  title: '待接单',
  type: '2'
}, {
  title: '服务中',
  type: '3'
}, {
  title: '待确认',
  type: '4'
}, {
  title: '待评价',
  type: '6'
}, {
  title: '退款处理中',
  type: '5'
}, {
  title: '退款成功',
  type: '8'
}, {
  title: '交易关闭',
  type: '7'
}, {
  title: '退款处理中',
  type: '9'
}, {
  title: '退款处理中',
  type: '10'
}, {
  title: '退款处理中',
  type: '11'
}, {
  title: '已完成',
  type: '13'
}, {
  title: '交易已关闭',
  type: '15'
}]
export const time = function (opt, format) {
  let date = new Date(opt)
  if (format) {
    let daySplit = format.split(' ')
    let splitArr = daySplit[0].split('-')
    if (daySplit[1]) {
      return date.getFullYear()+ splitArr[0] + (date.getMonth() + 1) + splitArr[1] + date.getDate() + splitArr[2] + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + daySplit[1] + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + daySplit[1] + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    }
    return date.getFullYear()+ splitArr[0] + (date.getMonth() + 1) + splitArr[1] + date.getDate() + splitArr[2]
  } else {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-'  + date.getDate()
  }
}
export const countDown = function (opt) {
  let now = new Date().getTime() - 2 * 24 * 60 * 60 * 1000
  let time = (opt - now) /1000
  return `${Math.floor(time/ (24 * 60 * 60))}天${Math.floor((time / 3600) % 24)}小时${Math.floor((time/ 60) % 60)}分${Math.floor(time % 60 )}秒`
}
export const status = function (opt) {
  let title = ''
  orderType.forEach(item => {
    if (opt == item.type) {
      title = item.title
    }
  })
  return title
}

