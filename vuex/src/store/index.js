import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    menuList: [],
    list: [],
    //文本框数据
    inputValue: 'aaa',
    //下一个ID
    nextId: 5,
    viewKey: 'all'
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
    },
    //为list赋值
    initList(state, list) {
      state.list = list
    },
    setValue(state, value) {
      state.inputValue = value
    },
    //添加列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId += 1
      state.inputValue = ''
    },
    //根据ID删除对应的任务事项
    removeItem(state, id) {
      //根据ID查找对应项的索引

      const i = state.list.findIndex(x => x.id == id) //findIndex返回第一个满足条件的元素索引
      if (i !== -1) {
        state.list.splice(i, 1)
      }
      //根据索引，删除对应的元素
      //直接删不行，需要找到对应的索引项
      // state.list.splice(id, 1)
    },
    //修改列表项的选中状态
    changeStatus(state, param) {
      state.list.filter(item => {
        if (param.id == item.id) {
          item.done = param.status
        }
      })
    },
    //清除已完成的任务
    cleanDone(state) {
      state.list = state.list.filter(x => x.done == false)
    },
    //修改viewKey
    changeViewKey(state, key) {
      state.viewKey = key
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
    },
    getList(context) {
      axios.get('/list.json').then(({
        data
      }) => {
        console.log(111)
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  //getters只会对state中的数据进行修饰，不会改变state中的数据
  getters: {
    showNum(state) {
      return '当前的最新数量【' + state.count + '】'
    },
    //统计未完成的任务条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if (state.viewKey == 'all') {
        return state.list
      }
      if (state.viewKey == 'unDone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey == 'done') {
        return state.list.filter(x => x.done)
      }
    }
    //未完成

    //已完成
  },
  modules: {}
})