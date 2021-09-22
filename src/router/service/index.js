import {Home,Content} from 'layout/';

import allService from './allService.js';

export default {
	path: '/service',
	name: 'service',
	meta:{
		name: '首页',
		permission: 'iprp_middleground_service_manage'
	},
	icon: 'inbox',
	sort: 1,
	component: Home,
	redirect: '/service/allService',
	children:[allService]
};
