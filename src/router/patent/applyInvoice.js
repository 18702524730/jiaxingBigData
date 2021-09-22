import {Content} from 'layout/';

import {Patent} from 'views/';

export default {
	path: 'applyInvoice',
	name: 'applyInvoice',
	meta:{
		name: '知识产权监管专题分析',
		permission: 'pas_official_fee_invoice_manage'
	},
	icon: 'inbox',
	component: Content,
	children: [{
		path: 'unmailed',
		name: 'unmailedInvoice',
		meta:{
			name: '知识产权监管专题分析',
			permission: 'pas_official_fee_invoice_manage'
		},
		icon: 'edit',
		component: Patent.applyInvoice.unmailed.unmailedList
	}]
};
