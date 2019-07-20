<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
import { baseURL } from "@/utils/config.js";
import { organizeTree } from '@/api/organize'
import { mapState } from "vuex";
import { GetLogininfo } from '@/api/login'
export default {
  name: "App",
  beforeRouteEnter (to, from, next) {
    console.log(to, from, next);
    next();
  },
  data () {
    return {
      isLoading: ""
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      auditfollow: state => state.auditfollow.auditfollow
    })
  },

  created () {

  },
  // TODO: 全局状态加载及变更。请根据实际情况改写
  beforeMount () {

  },
  // 初次加载时，可通过接口获取用户的主题信息，或者通过按钮触发，或者直接加载默认主题
  mounted () {
    this.getData();
    this.getOrganize();
    this.$nextTick(() => {
      console.log(baseURL);
    });
    let that = this;
    let _body = document.querySelector('body')
    _body.addEventListener("click", this.closeAuditFollow)
    // debugger;
    // //消息推送


  },
  methods: {
    getOrganize () { //获取组织树 
      let data = {
        UserId: this.$store.state.user.userid
      };
      organizeTree(data).then(res => {

        if (res.Status == 'error') {
          this.$msgBox.show(res.Msg);
        } else {
          this.$store.commit('user/setOrglist', JSON.parse(JSON.stringify(res.Record)));

          if (!this.$store.state.user.orgcode) {
            this.$store.commit('user/setOrganize', res.Record[0]);
          }
          if (!this.$store.state.user.year) {
            this.$store.commit('user/setYear', new Date().getFullYear());
          }
        }
      }).catch(err => {
        console.log(err)
        this.$msgBox.show('获取组织列表失败!');
      })
    },


    //完整信息
    getData () {
      let that = this;
      let param = {
        uid: this.$store.state.user.userid,
        orgid: this.$store.state.user.orgid,
      }
      GetLogininfo(param).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)
        } else {
          this.$store.commit('user/setLoginInfo', res);
          $appinfo = res.appinfo;
          //消息推送
          var frame = document.getElementById('desktopMsgClient')
          frame.src = window.global.baseUrl.replace('/custom2/api', '') + "/desktopMsgServer/MsgSubscriber.htm";
          frame.onload = function () {
            frame.contentWindow.postMessage($appinfo, '*');
          }
          window.onmessage = function (e) {
            if (JSON.parse(e.data).ID == 'KillLoginUser') {
              that.$confirm('当前登录被强制注销，点击确定后将取消当前登录！').then(() => {
                window.open(window.global.baseUrl.replace('/custom2/api', '/G6H/web'));
                window.close();
              })
            }
          }
        }

      }).catch(err => {
        this.$msgBox.show('获取用户组织数据失败!');
      })
    },
    //点击其他地方关闭审批流程
    closeAuditFollow () {
      this.$store.commit('setAuditfollow', true)
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: "PingFang", "songti", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
  height: 100%;
}
</style>
