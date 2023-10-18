import { createApp } from 'vue';

import WeatherForecastsApp from '../vue/WeatherForecastsApp.vue';

const app = createApp(WeatherForecastsApp);

app.mount("#weatherForecastsApp");