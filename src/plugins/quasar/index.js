import Vue from 'vue';
import '@/styles/quasar.sass'
import eng from 'quasar/lang/en-us';
import ru from 'quasar/lang/ru.js';
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {},
  lang: { ru, eng }
})
