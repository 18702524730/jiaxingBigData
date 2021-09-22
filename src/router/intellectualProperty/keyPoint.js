/**
 * Created by wan on 2018/5/2.
 */


import {Content} from 'layout/';

import {intellectualProperty} from 'views/';

export default {
	path: 'keyPoint',
	name: 'keyPoint',
	meta:{
		name: '企业科创服务',
		permission: 'iprp_mpsteward_key'
	},
	icon: 'inbox',
	component: Content,
	redirect: '/intellectualProperty/keyPoint/manufacturing',
	children: [   
		{
			path: 'manufacturing',
			name: 'manufacturing',
			meta:{
				name: '科创服务概览',
				permission: 'iprp_mpsteward_key_survey'  //销售员
			},
			icon: 'reorder',
			component: intellectualProperty.keyPoint.manufacturing
		},
		{
			path: 'manufacturing1',
			name: 'manufacturing1',
			meta:{
				name: '企业需求对接',
				permission: 'iprp_mpsteward_key_survey'  //销售员
			},
			icon: 'reorder',
			component: intellectualProperty.keyPoint.manufacturing1
		},
		{
			path: 'manufacturing2',
			name: 'manufacturing2',
			meta:{
				name: '机构展业对接',
				permission: 'iprp_mpsteward_key_survey'  //销售员
			},
			icon: 'reorder',
			component: intellectualProperty.keyPoint.manufacturing2
		},
		{
			path: 'manufacturing3',
			name: 'manufacturing3',
			meta:{
				name: '企业创新评价',
				permission: 'iprp_mpsteward_key_survey'  //销售员
			},
			icon: 'reorder',
			component: intellectualProperty.keyPoint.manufacturing3
		},
		{
			path: 'manufacturing4',
			name: 'manufacturing4',
			meta:{
				name: '专利价值评估',
				permission: 'iprp_mpsteward_key_survey'  //销售员
			},
			icon: 'reorder',
			component: intellectualProperty.keyPoint.manufacturing4
		},
		{
			path: 'manufacturing5',
			name: 'manufacturing5',
			meta:{
				name: '专利质押融资',
				permission: 'iprp_mpsteward_key_survey'  //销售员
			},
			icon: 'reorder',
			component: intellectualProperty.keyPoint.manufacturing5
		}
	]
};
