<template>
  <div>
    <auditfollow></auditfollow>
    
    <router-view></router-view>

  </div>
</template>

<script>
import auditfollow from "@/components/auditFollow/auditfollow"
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  watch: {
    isLogin: function(newvalue, oldvalue) {}
  },
  created() {},
  mounted() {},
  methods: {
    msg(){
      this.auditfollowShow=true;
      this.$message({message:'6666',duration:0})
    }
  },
  components:{
    auditfollow
  }
};
</script>

<style scoped>
</style>
