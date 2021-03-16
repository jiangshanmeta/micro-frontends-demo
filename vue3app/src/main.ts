import './public-path';
import { createApp } from 'vue'

import {
    createRouter, createWebHashHistory, 
} from 'vue-router'
import App from './App.vue'
import {
    MicroAppStateActions
} from 'qiankun'
import routes from './router'

type mainAppProps = {
    container?:HTMLElement
} & Partial<MicroAppStateActions>

let instance:null|ReturnType<typeof createApp> = null;
let router = null;

function render(props:mainAppProps = {}) {
  const { container } = props;
  router = createRouter({
    history: createWebHashHistory(''),
    routes,
  });
  console.log(container,'----')

  instance = createApp(App);
  instance.use(router);
  instance.mount(container ? container.querySelector('#app')! : '#app');
}

export async function bootstrap() {

}

export async function mount(props:mainAppProps) {
    render(props);
    if(instance){
        instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
        instance.config.globalProperties.$setGlobalState = props.setGlobalState;
    }

}
  

export async function unmount() {
    console.log('unmount',instance);
    if(instance){
        instance.unmount();
    }
    
    instance = null;
    router = null;
}


if (!window.__POWERED_BY_QIANKUN__) {
    render();
}
