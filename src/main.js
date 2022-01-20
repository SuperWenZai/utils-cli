// import {
//   registerMicroApps,
//   start,
// } from 'qiankun';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import UrlToolkit from './utils/urlToolkit';

Vue.config.productionTip = false;

Vue.prototype.$urlToolkit = new UrlToolkit({
  projectName: 'coms',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#utils-app');

// registerMicroApps([{
//   name: 'subapp-login',
//   entry: '//localhost:2753',
//   container: '#subapp-viewport',
//   activeRule: '/login',
// }], {
//   beforeLoad: [
//     (app) => {
//       console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
//     },
//   ],
//   beforeMount: [
//     (app) => {
//       console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
//     },
//   ],
//   afterUnmount: [
//     (app) => {
//       console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
//     },
//   ],
// });

// start();
