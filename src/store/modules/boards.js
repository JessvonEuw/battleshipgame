const state = {
  board: ""
}
const getters = {
  getBoard: (state) => state.board,
}
const mutations = {
  setBoard: (state, payload) => { state.board = payload; },
}
const actions = {
  setBoard: ({commit}, payload) => {
    commit('setBoard', payload);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}