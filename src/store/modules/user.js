import mutations from "@/store/mutations";

const { SET_USER } = mutations

const user = {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    user: ({ user }) => user
  },
  actions: {
    setUser({ commit }, user) {
      commit(SET_USER, user);
    }
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    }
  },
}

export default user;
