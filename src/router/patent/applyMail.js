import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'applyMail',
	name: 'applyMail',
	meta:{
		name: '知识产权监管专题分析',
		permission: 'pas_official_fee_invoice_express_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'unmailed',
		name: 'unmailed',
		meta:{
			name: '知识产权监管专题分析',
			permission: 'pas_official_fee_invoice_express_manage'
		},
		icon: 'edit',
		component: Patent.applyMail.unmailed.unmailedList
	}]
};
