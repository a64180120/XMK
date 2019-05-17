<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
  methods: {}
}
</script>

<style scoped>
</style>
