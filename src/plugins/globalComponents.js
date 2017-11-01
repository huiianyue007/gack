import Vue from 'vue'
import page from 'components/page'
import loadding from 'components/loadding'
import layout from 'components/layout'
import card from 'components/card'
import boxImg from 'components/box'
const components = {
  page,
  layout,
  loadding,
  card,
  boxImg
}
for (let name in components) {
  Vue.component(name, components[name])
}
