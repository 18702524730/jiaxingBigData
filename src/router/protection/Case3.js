import {Content} from 'layout/';

import {Protections} from 'views/';

export default {
	path: 'Case3',
	name: 'Case3',
	meta:{
		name: '专利侵权行业风险监测预警',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'activistList3',
			name: 'activistList3',
			meta:{
				name: '专利侵权行业风险监测预警',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: Protections.allCases.lineActivist.activistList3
		},
	]
};
