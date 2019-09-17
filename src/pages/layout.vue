<template>
  <div class="layout">
    <router-view></router-view>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data () {
    return {
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  watch: {
    isLogin: function (newvalue, oldvalue) { },

    $route: {
      handler () {
        console.log(this.$route)
      },
      deep: true
    }

  },
  created () { },
  mounted () {
  },
  methods: {
  },
  components: {
  }
};
</script>

<style scoped>
.layout {
  position: relative;
  height: 100%;
}
</style>
