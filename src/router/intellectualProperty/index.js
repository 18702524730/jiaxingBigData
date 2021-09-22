import {Home,Content} from 'layout/';

import keyPoint from './keyPoint.js';

export default {
	path: '/intellectualProperty',
	name: 'intellectualProperty',
	meta:{
		name: '企业科创服务',
		permission: 'iprp_mp_steward'
	},
	icon: 'inbox',
	sort: 4,
	component: Home,
	redirect: '/intellectualProperty/keyPoint',
	children:[keyPoint]
};
		


