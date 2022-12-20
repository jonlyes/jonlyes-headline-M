import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'// 移动端适配
import { automaticFocusing } from '@/plug-in/v-focus'// 全局插件
// import './styles/cover.less'// 加载全局样式
import { NavBar, Field, Form, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, Image as VanImage, List, PullRefresh, ActionSheet, Popup, Grid, GridItem, Badge, Search, Divider, CellGroup, Tag, Dialog, DatetimePicker } from 'vant'// 按需引入

Vue.use(NavBar)// 按需使用——NavBar
Vue.use(Field)// 按需引入——Field
Vue.use(Form)// 按需引入——Form
Vue.use(Button)// 按需引入——Button
Vue.use(Tabbar)// 按需引入——Tabbar
Vue.use(TabbarItem)// 按需引入——TabbarItem
Vue.use(Icon)// 按需引入——Icon
Vue.use(Tab)// 按需引入——Tab
Vue.use(Tabs)// 按需引入——Tabs
Vue.use(Cell)// 按需引入——cell
Vue.use(VanImage)// 按需引入——VanImage
Vue.use(List)// 按需引入——List
Vue.use(PullRefresh)// 按需引入——PullRefresh
Vue.use(ActionSheet)// 按需引入——ActionSheet
Vue.use(Popup)// 按需引入——Popup
Vue.use(Grid)// 按需引入——Grid
Vue.use(GridItem)// 按需引入——GridItem
Vue.use(Badge)// 按需引入——Badge
Vue.use(Search)// 按需引入——Search
Vue.use(Divider)// 按需引入——Divider
Vue.use(CellGroup)// 按需引入——CellGroup
Vue.use(Tag)// 按需引入——Tag
Vue.use(Dialog)// 按需引入——Dialog
Vue.use(automaticFocusing)// 按需引入——automaticFocusing
Vue.use(DatetimePicker)// 按需引入——DatetimePicker

Vue.config.productionTip = false // 关闭生产提示

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
