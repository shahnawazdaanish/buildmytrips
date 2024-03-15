

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Maska from 'maska';
import { createPinia } from "pinia";
import ErrorService from "@/services/ErrorService";

const app = createApp(App);
const pinia = createPinia();

app.config.errorHandler = (error) => ErrorService.onError(error);

app.use(router);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(Maska);
app.use(VueApexCharts);
app.use(pinia)
app.use(vuetify).mount('#app');
