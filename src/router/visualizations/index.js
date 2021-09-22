import {Home} from 'layout/';
import accessProcessing from './accessProcessing';
import visualDesign from './visualDesign'
import dataAnalysis from './dataAnalysis'
import two3 from './two3'
import therr4 from './therr4'
import five5 from './five5'
import six6 from './six6'
export default {
    path: '/visualizations',
    name: 'visualizations',
    meta:{
        name: '数据可视化工具',
        permission: 'stereo_protect'
    },
    component: Home,
    sort: 4,
    icon: 'inbox',
    redirect: '/visualizations/accessProcessings',
    children:[
        accessProcessing,
        visualDesign,
        dataAnalysis,
        two3,
        therr4,
        five5,
        six6,
    ]
}