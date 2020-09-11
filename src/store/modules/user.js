import { createGuest, getGuest } from "@/service/ajax/guestService";
import mutations from "@/store/mutations";
import Vue from 'vue';


const { SET_USER, SET_USER_MIC_STATE } = mutations

const user = {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    user: ({ user }) => user
  },
  actions: {
    async createUser({ dispatch }, roomId) {
      try {
        const addedGuest = await createGuest(roomId);

        localStorage.setItem(`${ roomId }_USER_ID`, addedGuest.id);

        dispatch('setUser', { ...addedGuest, speaking: false });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async fetchUser({ dispatch }, userId) {
      try {
        const currentUser = await getGuest(userId);

        dispatch('setUser', { ...currentUser, speaking: false });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    setUser({ commit }, user) {
      commit(SET_USER, user);
    },
    setMicState({ commit }, micState) {
      commit(SET_USER_MIC_STATE, micState);
    }
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_USER_MIC_STATE](state, micState) {
      Vue.set(state.user, 'speaking', micState);
    }
  },
}

export default user;
