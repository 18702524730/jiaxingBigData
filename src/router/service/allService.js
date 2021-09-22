import {Content} from 'layout/';

import {Service} from 'views/';

export default {
	path: 'allService',
	name: 'allService',
	meta:{
		name: '全部服务',
		permission: 'iprp_all_service'
	},
	icon: 'inbox',
	component: Content,
	redirect: '/service/allService/bsOrderList',
	children: [
		{
			path: 'bsOrderList',
			name: 'bsOrderList',
			meta:{
				name: '服务单',
				permission: 'sbfw_gnsb_zs_all_menu'
			},
			icon: 'edit',
			component: Service.allService.bsOrderList
		}
	]
};
