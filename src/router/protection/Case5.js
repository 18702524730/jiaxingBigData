import {Content} from 'layout/';

import {Protections} from 'views/';

export default {
	path: 'Case5',
	name: 'Case5',
	meta:{
		name: '企业知识产权监测',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'activistList5',
			name: 'activistList5',
			meta:{
				name: '监测总览',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: Protections.allCases.lineActivist.activistList5
		},
	]
};
