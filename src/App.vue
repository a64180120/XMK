<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
import { baseURL } from "@/utils/config.js";
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
    this.$nextTick(() => {
      console.log(baseURL);
    });
  },
  methods: {

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
