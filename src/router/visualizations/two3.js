import {Content} from 'layout/';

import {spatialData} from 'views/';
export default {
	path: 'spatialData',
	name: 'spatialData',
	meta:{
		name: '空间数据可视化设计',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'visualLayout',
			name: 'visualLayout',
			meta:{
				name: '矢量地图功能',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: spatialData.accessProcessing.lineActivist.visualLayout
		},{
			path: 'theme',
			name: 'theme',
			meta:{
				name: 'GIS地图功能',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: spatialData.accessProcessing.lineActivist.theme
		},{
			path: 'chartComponents',
			name: 'chartComponents',
			meta:{
				name: '3D数据可视化功能',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: spatialData.accessProcessing.lineActivist.chartComponents
		}
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
