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
    async fetchUser({ commit, dispatch }, roomId) {
      try {
        const savedUserId = localStorage.getItem(`${ roomId }_USER_ID`);

        if (!savedUserId) {
          try {
            await dispatch('createUser', roomId);
          } catch (e) {
            return Promise.reject(e);
          }
        } else {
          const currentUser = await getGuest(savedUserId);

          commit(SET_USER, { ...currentUser, speaking: false });
        }
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async createUser({ commit }, roomId) {
      try {
        const addedGuest = await createGuest(roomId);

        localStorage.setItem(`${ roomId }_USER_ID`, addedGuest.id);

        commit(SET_USER, { ...addedGuest, speaking: false });
      } catch (e) {
        return Promise.reject(e);
      }
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
