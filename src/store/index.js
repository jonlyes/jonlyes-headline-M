import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户头像
    userPhoto: 'https://img.yzcdn.cn/vant/cat.jpeg'// 默认头像
  },
  getters: {
  },
  mutations: {
    // 修改用户头像
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: []
})
