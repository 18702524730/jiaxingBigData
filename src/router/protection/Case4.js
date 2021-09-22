import {Content} from 'layout/';

import {Protections} from 'views/';

export default {
	path: 'Case4',
	name: 'Case4',
	meta:{
		name: '商标侵权风险监测预警',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'activistList4',
			name: 'activistList4',
			meta:{
				name: '商标侵权风险监测预警',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: Protections.allCases.lineActivist.activistList4
		},
	]
};
