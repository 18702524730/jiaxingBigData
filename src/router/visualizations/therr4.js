import {Content} from 'layout/';

import {dataInteraction} from 'views/';
export default {
	path: 'dataInteraction',
	name: 'dataInteraction',
	meta:{
		name: '数据交互功能',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'visualLayout',
			name: 'visualLayout',
			meta:{
				name: '交互式Web表单功能',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: dataInteraction.accessProcessing.lineActivist.visualLayout
		},{
			path: 'theme',
			name: 'theme',
			meta:{
				name: '事件响应功能',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: dataInteraction.accessProcessing.lineActivist.theme
		}
		// ,{
		// 	path: 'chartComponents',
		// 	name: 'chartComponents',
		// 	meta:{
		// 		name: '3D数据可视化功能',
		// 		permission: 'stereo_protect_all_case'
		// 	},
		// 	icon: 'edit',
		// 	component: spatialData.accessProcessing.lineActivist.chartComponents
		// }
		// ,{
		// 	path: 'dataTable',
		// 	name: 'dataTable',
		// 	meta:{
		// 		name: '数据表格',
		// 		permission: 'stereo_protect_all_case'
		// 	},
		// 	icon: 'edit',
		// 	component: spatialData.accessProcessing.lineActivist.dataTable
		// },{
		// 	path: 'dynamicVision',
		// 	name: 'dynamicVision',
		// 	meta:{
		// 		name: '动态视觉',
		// 		permission: 'stereo_protect_all_case'
		// 	},
		// 	icon: 'edit',
		// 	component: spatialData.accessProcessing.lineActivist.dynamicVision
		// },
	]
};
