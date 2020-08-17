import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import {
    registerMicroApps, start,
} from 'qiankun';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

const isDev = process.env.NODE_ENV === 'development';

console.log(process.env.NODE_ENV);

registerMicroApps([
    {
        name: 'app1',
        entry: isDev ? '//localhost:7000' : '/micro-frontends-demo/app1/index.html',
        container: '#main',
        activeRule (location) {
            return location.hash.slice(1).startsWith('/app1');
        },
    },
    {
        name: 'app2',
        entry: isDev ? '//localhost:7001' : '/micro-frontends-demo/app2/index.html',
        container: '#main',
        activeRule (location) {
            return location.hash.slice(1).startsWith('/app2');
        },
    },
]);

start();
