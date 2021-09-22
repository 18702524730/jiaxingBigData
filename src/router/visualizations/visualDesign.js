import {Content} from 'layout/';

import {visualDesign} from 'views/';
import {Service} from 'views/';
export default {
	path: 'visualDesign',
	name: 'visualDesign',
	meta:{
		name: '可视化设计',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'visualLayout',
			name: 'visualLayout',
			meta:{
				name: '可视化编排',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: visualDesign.accessProcessing.lineActivist.visualLayout
		},{
			path: 'theme',
			name: 'theme',
			meta:{
				name: '主题一键切换',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: visualDesign.accessProcessing.lineActivist.theme
		},{
			path: 'chartComponents',
			name: 'chartComponents',
			meta:{
				name: '图表组件',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: visualDesign.accessProcessing.lineActivist.chartComponents
		},{
			path: 'dataTable',
			name: 'dataTable',
			meta:{
				name: '数据表格',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: visualDesign.accessProcessing.lineActivist.dataTable
		},{
			path: 'dynamicVision',
			name: 'dynamicVision',
			meta:{
				name: '动态视觉',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			// component: visualDesign.accessProcessing.lineActivist.dynamicVision
			component: Service.allService.bsOrderList
		},
	]
};
