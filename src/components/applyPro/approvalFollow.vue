<template>
  <div
    :class="{approvalfollow:true,show:showAuditfollow}"
    :style="showAuditfollow?'height:'+(auditMsg.length*40+15)+'px':''"
    v-if="showAuditfollow"
  >
    <template v-for="(item,index) in auditMsg">
      <auditmsg :info="item" :index="index+1" :isApproval="true"></auditmsg>
    </template>
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
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.approvalfollow {
  border-top: 1px solid $borderColor_ccc;
  margin-top: 20px;
  padding-left: 20px;
  height: 0;
  transition: height 0.3s ease;
  overflow: hidden;
  position: relative;
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
  &.show {
    // height: 150px;
  }
}
</style>
