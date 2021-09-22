/**
 * Created by wan on 2018/5/2.
 */


import {Content} from 'layout/';

import {Sell} from 'views/';

export default {
	path: 'keyPoint',
	name: 'keyPoint',
	meta:{
		name: '嘉兴市重点产业',
		permission: 'iprp_mpsteward_key'
	},
	icon: 'inbox',
	component: Content,
	redirect: '/sell/keyPoint/manufacturing',
	children: [   
		{
			path: 'manufacturing',
			name: 'manufacturing',
			meta:{
				name: '智能制造（200家）',
				permission: 'iprp_mpsteward_key_survey'  //销售员
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'newMaterials',
			name: 'newMaterials',
			meta:{
				name: '新材料（500家）',
				permission: 'iprp_mpsteward_key_mainsurvey'   //主管
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'Biomedicine',
			name: 'Biomedicine',
			meta:{
				name: '生物医药（200家）',
				permission: 'iprp_mpsteward_key_news'
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'greatHealth',
			name: 'greatHealth',
			meta:{
				name: '大健康（500家）',
				permission: 'iprp_mpsteward_key_search'
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'greatHealth3',
			name: 'greatHealth3',
			meta:{
				name: '纺织服装（300家）',
				permission: 'iprp_mpsteward_key_search'
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'greatHealth4',
			name: 'greatHealth4',
			meta:{
				name: '造纸包装（800家）',
				permission: 'iprp_mpsteward_key_search'
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'greatHealth5',
			name: 'greatHealth5',
			meta:{
				name: '现代农业（200家）',
				permission: 'iprp_mpsteward_key_search'
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'greatHealth6',
			name: 'greatHealth6',
			meta:{
				name: '现代物流（500家）',
				permission: 'iprp_mpsteward_key_search'
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'greatHealth7',
			name: 'greatHealth7',
			meta:{
				name: '文化旅游（400家）',
				permission: 'iprp_mpsteward_key_search'
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
		{
			path: 'greatHealth8',
			name: 'greatHealth8',
			meta:{
				name: '现代金融（200家）',
				permission: 'iprp_mpsteward_key_search'
			},
			icon: 'reorder',
			component: Sell.keyPoint.manufacturing
		},
	]
};
