import {Content} from 'layout/';

import {Protections} from 'views/';

export default {
	path: 'Case2',
	name: 'Case2',
	meta:{
		name: '年费缴纳异常监测预警',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'activistList2',
			name: 'activistList2',
			meta:{
				name: '年费缴纳异常监测预警',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: Protections.allCases.lineActivist.activistList2
		},
	]
};
