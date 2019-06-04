<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
import { baseURL } from "@/utils/config.js";
import  {organizeTree} from '@/api/organize'
import { mapState } from "vuex";
export default {
  name: "App",
  beforeRouteEnter(to, from, next) {
    console.log(to, from, next);
    next();
  },
  data() {
    return {
      isLoading: ""
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  created() {

  },
  // TODO: 全局状态加载及变更。请根据实际情况改写
  beforeMount() {

  },
  // 初次加载时，可通过接口获取用户的主题信息，或者通过按钮触发，或者直接加载默认主题
  mounted() {
    this.getOrganize();
    this.$nextTick(() => {
      console.log(baseURL);
    });
  },
  methods: {
     getOrganize(){  
              let data = {
                UserId:488181024000001
              };     
              organizeTree(data).then(res=>{
                  if(res.Status=='error'){
                      this.$msgBox.show(res.Msg);
                  }else{
                      this.$store.commit('user/setOrglist',res.Record);
                      if(!this.$store.user.orgcode){
                        this.$store.commit('user/setOrganize',res.Record[0]);
                      }
                      if(!this.$store.user.year){
                        this.$store.commit('user/setYear',new Date().getFullYear());
                      }  
                  }
              }).catch(err=>{
                   this.$msgBox.show('获取组织列表失败!');
              })
          },
  }
};
</script>

<style lang="scss">


#app {
  font-family:"PingFang", "songti", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
  height:100%;
}
</style>
