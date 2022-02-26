import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken()
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    console.log(result)
    if (result.data.success) {
      context.commit('setToken', result.data.data)
    } else {
      console.error('登录失败')
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
