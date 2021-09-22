import {Content} from 'layout/';

import {configurationDelivery} from 'views/';
export default {
	path: 'configurationDelivery1',
	name: 'configurationDelivery1',
	meta:{
		name: 'test',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'visualLayout',
			name: 'visualLayout',
			meta:{
				name: 'test1',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: configurationDelivery.accessProcessing.lineActivist.test
		},
		// {
		// 	path: 'theme',
		// 	name: 'theme',
		// 	meta:{
		// 		name: '事件响应功能',
		// 		permission: 'stereo_protect_all_case'
		// 	},
		// 	icon: 'edit',
		// 	component: dataInteraction.accessProcessing.lineActivist.theme
		// }
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
