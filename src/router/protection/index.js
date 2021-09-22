import {Home} from 'layout/';
import allCase from './allCase.js';
import Case2 from './Case2.js';
import Case3 from './Case3.js';
import Case4 from './Case4.js';
import Case5 from './Case5.js';

export default {
    path: '/threeDimensionalProtection',
    name: 'threeDimensionalProtection',
    meta:{
        name: '知识产权风险智能监测',
        permission: 'stereo_protect'
    },
    component: Home,
    sort: 3,
    icon: 'inbox',
    redirect: '/threeDimensionalProtection/Case5',
    children:[
        Case5,
        allCase,
        Case2,
        Case3,
        Case4,
    ]
}