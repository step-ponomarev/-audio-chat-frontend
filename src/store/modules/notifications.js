import mutations from "@/store/mutations";

const { PUSH_NOTIFICATION, DELETE_NOTIFICATION } = mutations;

const notifications = {
  namespaced: true,
  state: {
    notifications: []
  },
  getters: {
    notifications: ({ notifications }) => notifications
  },
  actions: {
    addNotification({ commit }, notification) {
      commit(PUSH_NOTIFICATION, notification);
    },
    removeNotification({ commit }, notification) {
      commit(DELETE_NOTIFICATION, notification);
    }
  },
  mutations: {
    [PUSH_NOTIFICATION](state, notification) {
      state.notifications.push(notification)
    },
    [DELETE_NOTIFICATION](state, notification) {
      const index = state.notifications.indexOf(notification);

      state.notifications.splice(index, 1);
    }
  },
}

export default notifications;
