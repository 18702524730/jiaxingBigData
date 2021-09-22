import {Content} from 'layout/';

import {dataAnalysis} from 'views/';

export default {
	path: 'dataAnalysis',
	name: 'dataAnalysis',
	meta:{
		name: '数据分析',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'visualLayout',
			name: 'visualLayout',
			meta:{
				name: '拖拽式自由分析',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: dataAnalysis.accessProcessing.lineActivist.visualLayout
		},{
			path: 'theme',
			name: 'theme',
			meta:{
				name: '多层钻取',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: dataAnalysis.accessProcessing.lineActivist.theme
		},{
			path: 'chartComponents',
			name: 'chartComponents',
			meta:{
				name: '组合过滤',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: dataAnalysis.accessProcessing.lineActivist.chartComponents
		},{
			path: 'dataTable',
			name: 'dataTable',
			meta:{
				name: '智能算法',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: dataAnalysis.accessProcessing.lineActivist.dataTable
		}
	]
};
