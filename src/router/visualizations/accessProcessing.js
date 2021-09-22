import {Content} from 'layout/';

import {visualizations} from 'views/';

export default {
	path: 'accessProcessings',
	name: 'accessProcessings',
	meta:{
		name: '数据接入和处理',
		permission: 'stereo_protect_all_case'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'dataSource',
			name: 'dataSource',
			meta:{
				name: '数据源接入',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: visualizations.accessProcessing.lineActivist.dataSource
		},{
			path: 'modeling',
			name: 'modeling',
			meta:{
				name: '自助式数据建模',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: visualizations.accessProcessing.lineActivist.modeling
		},{
			path: 'calculation',
			name: 'calculation',
			meta:{
				name: '聚合和表计算',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: visualizations.accessProcessing.lineActivist.calculation
		},{
			path: 'measure',
			name: 'measure',
			meta:{
				name: '自定义计算度量',
				permission: 'stereo_protect_all_case'
			},
			icon: 'edit',
			component: visualizations.accessProcessing.lineActivist.measure
		},
	]
};
