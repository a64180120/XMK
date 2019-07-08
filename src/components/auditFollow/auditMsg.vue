<template>
  <div class="auditMsg">
    <ul
      :class="[info.FApproval=='9'?'oxford-gray':(info.FApproval=='0'?'light-gray':(info.FApproval=='1'?'blue':'red'))]"
    >
      <template v-if="!isApproval">
        <li>
          <i v-if="index !=nowNum"
            :class="[info.FApproval=='9'?'logo-sptg':(info.FApproval=='0'?'logo-wsp':(info.FApproval=='1'?'logo-now':'logo-wtg'))]"
          ></i>
          <i v-else class="logo-spz "></i>
          <span v-if="info.JudgeRefer === 1">发起人:</span>
          <span v-else-if="info.JudgeRefer === 0 && info.OperaName != null">审批人:</span>
          <span v-else-if="info.JudgeRefer === 2 && info.OperaName != null">支付人:</span>
          <span v-else :class="[index==nowNum?'nowClass':'']">
            审批岗位
            <span v-if="index==nowNum">(当前)</span>:
          </span>
          <em>{{startNum +index}}</em>
        </li>
        <li :class="[index==nowNum?'nowClass':'']">{{info.OperaName?info.OperaName:info.PostName}}</li>
        <li :class="[index==nowNum?'nowClass':'']">{{info.JudgeRefer === 1?info.FSendDate:info.FDate}}</li>
        <li :class="[index==nowNum?'nowClass':'']" v-if="info.JudgeRefer !== 1 && (info.FApproval ===9 ||info.FApproval ===2) ">
          意见：
          <span>{{info.FApproval ===2?'不同意':'同意'}}</span>
        </li>
        <li :class="[index==nowNum?'nowClass':'']" v-if="info.JudgeRefer !== 2">备注：{{info.FOpinion}}</li>
        <li :class="[index==nowNum?'nowClass':'']" v-if="info.JudgeRefer !== 2">
          附件:
          <span @click.stop="showAttech" v-if="info.QtAttachments ===null" class="attenchment">无</span>
          <span v-else v-for="(item,idx) in info.QtAttachments">
            <span
              @click.stop="showAttech(info.QtAttachments)"
              class="attenchment"
              style="word-break: break-word"
            >{{item.BName}}</span>
            <span v-if="idx !==info.QtAttachments.length-1">、</span>
          </span>
        </li>
        <li v-if="info.JudgeRefer === 2">
          <span>支付状态：{{info.isPay===0?'待支付':(info.isPay===1?'支付完成':info.isPay ===2?'支付异常':'支付中')}}</span>
        </li>
      </template>
      <template v-else>
        <li>
          <i class="logo"></i>
          <span>审批岗位:{{info.PostName}}（{{info.IsMode?'会签':'非会签'}}）</span>
          <em>{{index}}</em>
        </li>
        <!-- <li>
          <span>审批人:{{info.OperaName}}</span>
        </li>-->
      </template>
    </ul>
    <el-dialog
      class="dialog img-dialog"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="800px"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">查看附件</span>
      </div>
      <img-view v-if="dialogVisible"></img-view>
    </el-dialog>
  </div>
</template>

<script>
import fDialog from '../attechment/dialog'
import attechment from '../attechment/attechment'
import ImgView from '../imgView/imgView'
export default {
  name: 'auditMsg',
  props: {
    info: {
      type: Object,
      default: {
        time: ''
      }
    },
    index: {
      type: Number,
      default: 1
    },
    startNum: {
      type: Number,
      default: 0
    },
    isApproval: {
      default: false,
      type: Boolean
    },
    nowNum: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    showAttech(val) {
      // this.dialogVisible = true
      this.$emit('imgList', this.info.QtAttachments)
    }
  },
  components: {
    ImgView,
    fDialog,
    attechment
  },
  mounted() {
    // console.info('msg', this.$attrs, this.$listeners)
  }
}
</script>

<style lang="scss" scoped>
.auditMsg {
  text-align: left;
  padding-left: 20px;
  font-size: 0.16rem;
  color: $btnColor;
  > .title {
    margin-bottom: 10px;
  }
  > ul {
    > li {
      max-width: 240px;
      margin-bottom: 5px;
      word-break: break-word;
      &:last-of-type {
        margin: 0;
      }
      &:first-of-type {
        position: relative;
        > em {
          position: absolute;
          width: 30px;
          height: 30px;
          top: 0;
          left: -36px;
          border: 2px solid $btnColor;
          border-radius: 50%;
          background: #fff;
          text-align: center;
          line-height: 28px;
          font-size: 0.18rem;
          color: $btnColor;
        }
        >.nowBorderClass{
          border-color:#a87ef3;
          color: #a87ef3;
        }
      }
    }
    .attenchment {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  > .blue {
    > li {
      /*color: #3294e8;*/
      color: #a87ef3;
    }
  }
  > .light-gray {
    > li {
      color: #adadad;
    }
  }
  > .oxford-gray {
    > li {
      color: #6f6c6c;
    }
  }
  > .red {
    > li {
      color: #ec0c0c;
    }
  }
}
.logo-sptg {
  background: url(../../assets/images/spr3.png) no-repeat;
  display: inline-block;
  width: 25px;
  height: 20px;
  background-size: 100% 100%;
}
.logo-wsp {
  background: url(../../assets/images/spr2.png) no-repeat;
  display: inline-block;
  width: 25px;
  height: 20px;
  background-size: 100% 100%;
}
.logo-spz {
  background: url(../../assets/images/spr4.png) no-repeat;
  display: inline-block;
  width: 25px;
  height: 20px;
  background-size: 100% 100%;
}
.logo-wtg {
  background: url(../../assets/images/spr1.png) no-repeat;
  display: inline-block;
  width: 25px;
  height: 20px;
  background-size: 100% 100%;
}
.logo-now{
  background: url(../../assets/images/spr5.png) no-repeat;
  display: inline-block;
  width: 25px;
  height: 20px;
  background-size: 100% 100%;
}
.attenchBtn {
  text-align: right;
  padding: 5px 20px;
  > span {
    width: 70px;
  }
}
.dialog-title span {
  width: 100%;
  text-align: left;
  font-size: 0.16rem;
  border-bottom: 1px solid #eaeaea;
}
  .nowClass{
    /*color: #a87ef3 !important;*/
    color: #3294e8 !important;
  }
</style>
<style scoped>
</style>
