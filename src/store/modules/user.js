import roomSocketService from "@/service/ws/roomSocketService";
import { createGuest } from "@/service/ajax/guestService";
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

        dispatch('setUser', addedGuest);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    setUser({ commit }, user) {
      commit(SET_USER, user);
    },
    async setMicState({ commit, state }, micState) {
      try {
        await roomSocketService.setUserMicState(state.user.id, micState);
        commit(SET_USER_MIC_STATE, micState);
      } catch (e) {
        return Promise.reject(e);
      }
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
