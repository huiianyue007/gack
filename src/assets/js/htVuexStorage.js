const htVuexStorage = {
  sessionKeys: [],
  init (sessionKeys) {
    this.sessionKeys = sessionKeys
    let sessionStorage = JSON.parse(window.sessionStorage.getItem('storeAsync'))
    if (!sessionStorage) return false
    for (let name in sessionStorage) {
      if (this.sessionKeys.indexOf(name) === -1) {
        delete sessionKeys[name]
      }
    }
    return sessionStorage
  },
  reStorage (store) {
    store.subscribe((mutations, state) => {
      this.reSessionStorage(mutations, state)
    })
  },
  reSessionStorage (mutations, state) {
    if (!this.sessionKeys || !this.sessionKeys.length) return false
    let storage = {}
    this.sessionKeys.forEach(item => {
      storage[item] = state[item]
    })
    window.sessionStorage.setItem('storeAsync', JSON.stringify(storage))
  }
}
export default htVuexStorage
