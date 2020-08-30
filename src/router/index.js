import Vue from 'vue'
import VueRouter from 'vue-router'
import Room from "@/components/Room";
import MainPage from "@/components/MainPage";

Vue.use(VueRouter);

const routes = [
  { path: '/room/:id', name: 'room', component: Room },
  { path: '/', name: 'main', component: MainPage }
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
const router = new VueRouter({
  mode: 'history',
  routes
})


export default router;
