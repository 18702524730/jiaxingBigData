import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'allCase',
	name: 'allCase',
	meta:{
		name: '专利指标数据可视化分析',
		permission: 'pas_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'appearancePatent',
			name: 'appearancePatent',
			meta:{
				name: '万人发明专利拥有量',
				permission: 'pas_all_case'
			},
			icon: 'edit',
			component: Patent.allCase.wgPatent.wgPatentList
		},{
			path: 'syPatent',
			name: 'syPatent',
			meta:{
				name: 'PCT国际专利申请',
				permission: 'pas_all_case'
			},
			icon: 'reorder',
			component: Patent.allCase.syPatent.syPatentList
		},{
			path: 'inventPatent',
			name: 'inventPatent',
			meta:{
				name: '规上工业企业发明专利覆盖率',
				permission: 'pas_all_case'
			},
			icon: 'reorder',
			component: Patent.allCase.fmPatent.fmPatentList
		}, {
			path: 'fmPatentDetail',
			name: 'fmPatentDetail',
			meta:{
				name: '知识产权贯标企业',
				permission: 'pas_all_case'
			},
			icon: 'reorder',
			component: Patent.allCase.fmPatent.fmPatentDetail
		},{
			path: 'fmreviseBasic2',
			name: 'fmreviseBasic2',
			meta:{
				name: '植物新品种',
				permission: 'pas_all_case'
			},
			icon: 'reorder',
			component: Patent.allCase.wgPatent.reviseBasic2
		},{
			path: 'syreviseBasic3',
			name: 'syreviseBasic3',
			meta:{
				name: '建立企业联盟',
				permission: 'pas_all_case'
			},
			icon: 'reorder',
			component: Patent.allCase.wgPatent.reviseBasic3
		},{
			path: 'reviseBasic',
			name: 'reviseBasic',
			meta:{
				name: '专利权质押融资登记额',
				permission: 'pas_all_case'
			},
			icon: 'reorder',
			component: Patent.allCase.wgPatent.reviseBasic
		},
		
	]
};
