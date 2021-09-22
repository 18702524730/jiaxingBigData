import {Content} from 'layout/';

import {Protections} from 'views/';

export default {
	path: 'allCase',
	name: 'allCase',
	meta:{
		name: '专利状态变化监测预警',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'activistList',
			name: 'activistList',
			meta:{
				name: '专利状态变化监测预警',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: Protections.allCases.lineActivist.activistList
		},
	]
};
