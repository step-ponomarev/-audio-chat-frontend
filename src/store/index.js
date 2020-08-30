import Vue from 'vue'
import Vuex from 'vuex'
import room from "@/store/modules/room";

Vue.use(Vuex);

const modules = {
  room
};

const store = new Vuex.Store({
  modules
});

export default store;
