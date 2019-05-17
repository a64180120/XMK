<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import topHandle from '@/components/topNav/topHandle'
export default {
  components: {},
  data() {
    return {}
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
  methods: {},
  components: {
    topHandle
  }
}
</script>

<style scoped>
</style>
