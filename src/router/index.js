import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {Home, Content} from 'layout/';
import {Login} from 'views/';

import Service from './service/';
import Sell from './sell/';  
import Patent from './patent/';
import Protection from './protection/'
import visualizations from './visualizations/'
import intellectualProperty from './intellectualProperty/'
// let arrs = []
// let conts = require.context('./',true,/index\.js$/)
// conts.keys().map(item=>{
// 	if(item=='./index.js') return;
// 	arrs = arrs.concat(conts(item).default)
// })
// arrs.sort((a,b)=>{
// 	return a.sort -b.sort
// })
export default new Router({
	routes: [
		{
			path     : '/',
			name     : 'default',
			meta:{
				name: '登录'
			},
			hidden   : true,
			component: Login
		},
		{
			path     : '/login',
			name     : 'login',
			meta:{
				name: '登录'
			},
			hidden   : true,
			component: Login
		},
		Service,
		Patent,
		Sell,
		intellectualProperty,
		Protection,
		visualizations,
		// ...arrs,
		{
      path: '*',
      hidden: true,
      name: 'other',
      redirect: { path: '/' }
    }
	]
})
