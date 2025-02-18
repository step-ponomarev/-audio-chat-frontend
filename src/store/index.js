import Vue from 'vue'
import Vuex from 'vuex'
import room from "@/store/modules/room";
import guest from "@/store/modules/guest";
import notifications from "@/store/modules/notifications";
import message from "@/store/modules/message";
import user from "@/store/modules/user";

Vue.use(Vuex);

const modules = {
  user,
  room,
  guest,
  message,
  notifications
};

const store = new Vuex.Store({
  modules
});

export default store;
