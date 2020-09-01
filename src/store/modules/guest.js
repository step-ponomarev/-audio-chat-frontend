import { getGuests } from "@/service/ajax/guestService";
import { guestArrayToObj } from "@/helpers/serviceHelpers";
import mutations from "@/store/mutations";
import Vue from "vue";

const { SET_GUESTS, REMOVE_GUEST, ADD_GUEST, SET_USER } = mutations

const guest = {
  namespaced: true,
  state: {
    guests: {},
    user: {}
  },
  getters: {
    guestList: ({ guests }) => Object.values(guests),
    guestListForRender: ({ guests, user }) => Object.values(guests).filter(guest => guest.id !== user.id),
    guestById: ({ guests }) => id => guests[id],
    user: ({ user }) => user
  },
  actions: {
    async fetchGuests({ commit }, roomId) {
      try {
        const guestsObj = guestArrayToObj(await getGuests(roomId));

        commit(SET_GUESTS, guestsObj);
      } catch (e) {
        return Promise.reject("Something wrong");
      }
    },
    setGuestList({ commit }, guestList) {
      commit(SET_GUESTS, guestArrayToObj(guestList));
    },
    addGuest({ commit }, guest) {
      commit(ADD_GUEST, guest);
    },
    removeGuest({ commit }, guestId) {
      commit(REMOVE_GUEST, guestId);
    },
    setUser({ commit }, user) {
      commit(SET_USER, user);
    }
  },
  mutations: {
    [SET_GUESTS](state, guestsObj) {
      state.guests = guestsObj;
    },
    [ADD_GUEST](state, guest) {
      Vue.set(state.guests, guest.id, guest);
    },
    [REMOVE_GUEST](state, guestId) {
      Vue.delete(state.guests, guestId);
    },
    [SET_USER](state, user) {
      state.user = user;
    }
  },
}

export default guest;
