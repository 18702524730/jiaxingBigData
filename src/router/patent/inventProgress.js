import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'inventProgress',
	name: 'inventProgress',
	meta:{
		name: '知识产权服务专题分析',
		permission: 'pas_invent_flow_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'inventuploadApply',
		name: 'inventuploadApply',
		meta:{
			name: '知识产权服务专题分析',
			permission: 'pas_invent_flow_manage'
		},
		icon: 'edit',
		component: Patent.inventProgress.uploadApply.uploadApplyList
	}]
};
