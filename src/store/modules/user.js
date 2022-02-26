import { getToken, removeToken, setToken } from '@/utils/auth'
import { getUserinfo, login } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserinfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserinfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    console.log(result)
    context.commit('setToken', result)
  },

  async getUserinfo(context) {
    const result = await getUserinfo()
    context.commit('setUserinfo', result)
    console.log(result)
    return result
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
