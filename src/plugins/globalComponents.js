import Vue from 'vue'
import page from 'components/page'
import loadding from 'components/loadding'
import layout from 'components/layout'
import card from 'components/card'
import boxImg from 'components/box'
import cardTitle from 'components/title'
const components = {
  page,
  layout,
  loadding,
  card,
  boxImg,
  cardTitle
}
Object.entries(components).forEach(item => {
  Vue.component(item[0], item[1])
})
