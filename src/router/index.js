import Vue from 'vue'
import VueRouter from 'vue-router'
import Room from "@/components/Room";

Vue.use(VueRouter);

const routes = [
  { path: '/room/:id', component: Room },
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
const router = new VueRouter({
  routes
})


export default router;
