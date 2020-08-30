import Vue from 'vue'
import Vuex from 'vuex'
import room from "@/store/modules/room";
import guest from "@/store/modules/guest";

Vue.use(Vuex);

const modules = {
  room,
  guest
};

const store = new Vuex.Store({
  modules
});

export default store;
