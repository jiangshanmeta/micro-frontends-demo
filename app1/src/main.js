import './public-path';
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import store from './store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

Vue.config.productionTip = false

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app1' : '/',
    mode: 'hash',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {

}

export async function mount(props) {

  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}

