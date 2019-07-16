<template>
  <div class="approvalfollowContainer">
    <div>
      <div @click="changeShow"
           :title="!showAuditfollow?'显示送审流程详情':'隐藏送审流程详情'"
           style="width: 37px;height: 19px;border: 1px solid #ccc;border-bottom: 0;padding: 3px 6px 2px 6px;margin: auto;position: relative;background: #fff;z-index: 1;border-top-left-radius: 5px;border-top-right-radius: 5px;cursor:pointer;">
        <img :class="{'rotate180':showAuditfollow}"
             style="width:100%;height:100%;"
             src="@/assets/images/ad.png" />
      </div>
    </div>
    <div :class="{approvalfollow:true,show:!showAuditfollow}"
         :style="showAuditfollow?(auditMsg.length?'height:'+(auditMsg.length*40+15)+'px':'height:30px'):''">
      <template v-if="auditMsg.length">
        <auditmsg v-for="(item,index) in auditMsg"
                  :info="item"
                  :index="index+1"
                  :isApproval="true"></auditmsg>
      </template>
      <div v-else
           style="padding-right:20px;line-height:30px;">暂无数据</div>
    </div>
  </div>
</template>

<script>
import auditmsg from '@/components/auditFollow/auditMsg.vue'
export default {
  name: 'approvalFollow',
  components: { auditmsg },
  props: {
    showAuditfollow: {
      type: Boolean,
      default: false
    },
    auditMsg: {
      type: Array,
      default: []
    }
  },
  data () {
    return {}
  },
  methods: {
    changeShow () {
      this.$emit('update:showAuditfollow', !this.showAuditfollow)
    }
  },
  mounted () {
    this.$emit('update:showAuditfollow', true)
  }
}
</script>

<style lang="scss" scoped>
.rotate180 {
  transform: rotateX(180deg);
}
.approvalfollow {
  border-top: 1px solid $borderColor_ccc;
  padding-left: 20px;
  height: 0;
  overflow: hidden;
  position: relative;
  top: -1px;
  transition: all 0.3s linear;
}
@keyframes rotate0180 {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(180deg);
  }
}
</style>

<style lang="scss">
.approvalfollow {
  .auditMsg {
    padding-bottom: 10px;
    border-left: 2px solid $btnColor;
    height: 40px;
    &:first-of-type {
      margin-top: 15px;
    }
    &:last-of-type {
      border-left: 2px solid transparent;
    }
    > ul > li {
      line-height: 30px;
      max-width: 550px;
      &:first-of-type > em {
        left: -36px;
        line-height: 28px;
      }
      span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
