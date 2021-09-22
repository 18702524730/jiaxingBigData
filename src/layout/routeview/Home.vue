<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
  <div class="home" v-if="isDone">
    <head-nav @complete="complete"></head-nav>
    <div class="left-fixed-right-auto">
      <left-menu v-if="menuIsDone"></left-menu>
      <div  :class="menuIsDone?'right-content':'hohei'">
        <div :class="menuIsDone?'content':'hohei'" :style="{marginLeft:menuIsDone?$store.state.leftmenu.width:''}">
          <bread v-if="menuIsDone"></bread>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadNav from '../head-nav/HeadNav.vue';
import LeftMenu from '../left-menu/LeftMenu.vue';
import Bread from '../bread/Bread.vue';
import {store} from 'utils/';
const adminUrl = CONFIG.adminUrl;
export default {
  name: 'home',
  data(){
  	return {
  		menuIsDone:false,
  		isDone: true,
  	}
  },
  components:{
    HeadNav,LeftMenu,Bread
  },
  methods: {
  	complete(ok){
  		this.menuIsDone = ok;
  	},
    access() {
      store.set('permission', '');
      store.set('userinfo', '');
      this.$http.get(adminUrl+'/api/privilege', {})
      .then((resp) => {
        this.isDone = true;
        var data = resp.data;
        store.set('userinfo', data);
        store.set('permission', data.purviews);
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  mounted() {
    // this.access();
  }
}
</script>
<style scoped lang='less'>
.home{
  height: 100%;
  .left-fixed-right-auto,.hohei,.hohei>div{height: 100%;}
}
.content{
  margin-top: 60px;
  /*background: #f1f2f7;*/
  background: #252233;
  padding: 16px;
}
.right-content{
  // margin-bottom: 60px;
}
</style>
