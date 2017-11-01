export const map = function (ak) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init&s=1'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
export const getCurrentPosition = function (BMap) {
  const geolocation = new BMap.Geolocation()
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition(function (position) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        resolve(position)
      }
      else {
        reject()
      }
    })
  })
}
