import {Home,Content} from 'layout/';

import keyPoint from './keyPoint.js';
import myCustomer from './myCustomer.js';

export default {
	path: '/sell',
	name: 'sell',
	meta:{
		name: '产业知识产权数字化服务',
		permission: 'iprp_mp_steward'
	},
	icon: 'inbox',
	sort: 4,
	component: Home,
	redirect: '/sell/keyPoint',
	children:[keyPoint]
};
		


