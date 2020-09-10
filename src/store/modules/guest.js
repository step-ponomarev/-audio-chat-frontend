import { getGuests } from "@/service/ajax/guestService";
import { guestArrayToObj } from "@/helpers/serviceHelpers";
import mutations from "@/store/mutations";
import Vue from "vue";

const { SET_GUESTS, REMOVE_GUEST, ADD_GUEST, SET_GUEST_VOICE_STATE } = mutations

const guest = {
  namespaced: true,
  state: {
    guests: {}
  },
  getters: {
    guestList: ({ guests }) => Object.values(guests),
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
    setVoiceState({ commit }, voiceState) {
      commit(SET_GUEST_VOICE_STATE, voiceState);
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
    [SET_GUEST_VOICE_STATE](state, { id, voiceState }) {
      const guest = { ...state.guests[id] };
      guest.speaking = voiceState;

      Vue.set(state.guests, id, guest);
    }
  },
}

export default guest;
