import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    menuList: []
  },
  mutations: {
    //mutations中不能写异步的代码
    add(state) {
      state.count++
    },
    addN(state, step) {
      state.count += step
    },
    sub(state) {
      state.count--
    },
    subN(state, step) {
      state.count -= step
    },
    addMenu(state, step) {
      state.menuList.unshift(step)
    }
  },
  actions: {
    //异步加1
    addAsync(context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    //异步加N
    addNasync(context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    //异步减1
    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    //异步减N
    subNasync(context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    },
    //异步更新数组里面的值
    addMenuAsync(context, step) {
      setTimeout(() => {
        context.commit('addMenu', step)
      }, 1000)
    }
  },
  //getters只会对state中的数据进行修饰，不会改变state中的数据
  getters: {
    showNum(state) {
      return '当前的最新数量【' + state.count + '】'
    }
  },
  modules: {}
})