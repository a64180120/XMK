<template>
  <div class="buggetReport">
    <topHandle :title="'预算报表在线工作平台'"
               @refresh="refresh">
      <div class="btnCon">

      </div>
    </topHandle>
    <div class="container">
      <iframe :src="URL.replace(/\/custom2/ig,'').replace(/\/api/ig,'')+'/G6H//RW/DesignFrame/DesignFrame?rep_genre=1&is_template=2'"
              width="100%"
              height="100%"
              frameborder="0"></iframe>
    </div>

  </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
import { mapState } from 'vuex'
import { baseURL } from '@/utils/config'
export default {
  name: 'progresscontrol',
  data () {
    return {
      URL: ''
    }
  },
  computed: {
    ...mapState({
      orgList: state => state.user.orglist
    })
  },
  mounted () {
    this.URL = baseURL.replace(/\/custom2/ig, '').replace(/\/api/ig, '')
  },
  beforeDestroy () {

  },
  methods: {
    refresh () {

    }
  },
  components: {
    topHandle
  }
}
</script>

<style lang="scss" scoped>
.buggetReport {
  .container {
    padding: 1%;
    bottom: 20px;
  }
  .btnCon {
    .handle {
      display: inline-block;
      width: 60px;
      height: 50px;
      padding: 0px 0;
      cursor: pointer;
      &:active {
        background: #ccc;
      }
    }
    .topIcon {
      height: 60%;
      > img {
        height: 100%;
      }
    }
  }
  .orgListCon {
    float: left;
    width: 20%;
    height: 100%;
    border: 1px solid #ddd;
    .orgsearch {
      padding: 10px;
      background: $btnColor;
    }
    .orgtreeCon {
      height: 100%;
      padding-bottom: 60px;
      > div {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>


