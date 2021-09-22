import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'utilityProgress',
	name: 'utilityProgress',
	meta:{
		name: '知识产权产业发展专题分析',
		permission: 'pas_utility_flow_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'uploadApplys',
		name: 'uploadApplys',
		meta:{
			name: '知识产权产业发展专题分析',
			permission: 'pas_utility_flow_manage'
		},
		icon: 'edit',
		component: Patent.syProgress.uploadApply.uploadApplyList
	}]
};
