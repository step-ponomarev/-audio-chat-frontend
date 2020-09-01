import mutations from "@/store/mutations";
import { getMessages } from "@/service/ajax/messageService";

const { SET_MESSAGES, PUSH_MESSAGE } = mutations;

const message = {
  namespaced: true,
  state: {
    messages: []
  },
  getters: {
    messageList: ({ messages }) => messages,
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async fetchMessages({ commit }, roomId) {
      try {
        const messages = await getMessages(roomId);

        commit(SET_MESSAGES, messages);
      } catch (e) {
        return Promise.reject("Something wrong");
      }
    },
    addMessage({ commit }, message) {
      commit(PUSH_MESSAGE, message);
    }
  },
  mutations: {
    [SET_MESSAGES](state, messages) {
      state.messages = messages;
    },
    [PUSH_MESSAGE](state, message) {
      state.messages.push(message);
    }
  },
}

export default message;
