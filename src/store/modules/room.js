import { getRoom } from "@/service/ajax/roomService";
import mutations from "@/store/mutations";

const { SET_ROOM } = mutations

const room = {
  namespaced: true,
  state: {
    room: null
  },
  getters: {
    room: ({ room }) => room
  },
  actions: {
    async fetchRoom({ commit }, id) {
      try {
        const room = await getRoom(id);
        commit(SET_ROOM, room);
      } catch (e) {
        return Promise.reject("No room");
      }
    },
  },
  mutations: {
    [SET_ROOM](state, room) {
      state.room = room;
    }
  },
}

export default room;
