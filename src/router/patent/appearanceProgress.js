import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'appearanceProgress',
	name: 'appearanceProgress',
	meta:{
		name: '商标指标数据可视化分析',
		permission: 'pas_appearance_flow_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [
		{
			path: 'uploadApply',
			name: 'uploadApply',
			meta:{
				name: '累计商标注册量同比环比分析',
				permission: 'pas_appearance_flow_manage'
			},
			icon: 'edit',
			component: Patent.wgProgress.uploadApply.uploadApplyList
		},{
			path: 'uploadApply2',
			name: 'uploadApply2',
			meta:{
				name: '驰名商标培育同比环比分析',
				permission: 'pas_appearance_flow_manage'
			},
			icon: 'edit',
			component: Patent.wgProgress.uploadApply.uploadApplyList2
		},{
			path: 'uploadNotice',
			name: 'uploadNotice',
			meta:{
				name: '地理标志商标培育同比环比分析',
				permission: 'pas_appearance_flow_manage'
			},
			icon: 'reorder',
			component: Patent.wgProgress.uploadNotice.uploadNoticeList
		},{
			path: 'applyFee',
			name: 'applyFee',
			meta:{
				name: '证明商标、集体商标',
				permission: 'pas_appearance_flow_manage'
			},
			icon: 'reorder',
			component: Patent.wgProgress.applyFee.applyFeeList
		},{
			path: 'firstAudit',
			name: 'firstAudit',
			meta:{
				name: '粮油及其他农产品商标注册',
				permission: 'pas_appearance_flow_manage'
			},
			icon: 'reorder',
			component: Patent.wgProgress.firstAudit.firstAuditList
		},{
			path: 'toBeFilled',
			name: 'toBeFilled',
			meta:{
				name: '累计农产品区域公用品牌',
				permission: 'pas_appearance_flow_manage'
			},
			icon: 'reorder',
			component: Patent.wgProgress.toBeFilled.toBeFilledList
		},{
			path: 'rejected',
			name: 'rejected',
			meta:{
				name: '商标权质押融资登记',
				permission: 'pas_appearance_flow_manage'
			},
			icon: 'reorder',
			component: Patent.wgProgress.rejected.rejectedList
		},
	]
};
