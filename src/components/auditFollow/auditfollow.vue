<template>
  <div v-show="visible" style="z-index: 3000;overflow: auto" class="auditfollow msFixed">
    <p class="title">
      <span>{{title}}</span>
      <i @click="close"></i>
    </p>
    <!--流程-->
    <div class="follow-main">
      <div class="content">
        <ul>
          <li></li>
          <li class="msg" v-for="(item,index) of auditMsg" :key="index">
            <audit-msg v-bind="$attrs" v-on="$listeners" :info="item" :index="index+1" :sign="sign" @imgList="getImgList"></audit-msg>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      class="dialog img-dialog"
      :visible.sync="imgDialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="40%">
      <div slot="title" class="dialog-title">
        <span style="float: left">查看附件</span>
      </div>
      <img-view v-if="imgDialog" :images="imgList"></img-view>
    </el-dialog>
  </div>
</template>

<script>
import auditMsg from './auditMsg'
import ImgView from "../imgView/imgView";
import { baseURL } from "@/utils/config.js";
export default {
  name: 'auditfollow',
  props: {
    title: {
      type: String,
      default: '审批流查看'
    },
    visible: {
      //控制显示隐藏
      type: Boolean,
      default: true
    },
    auditMsg: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeName: '',
      sign: [],
      imgList:[],//图片列表
      imgDialog:false,//图片预览弹框
    }
  },
  watch: {
    auditMsg: {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    //通过审批流获取图片列表
    getImgList(imgList){
      if (this.imgList.length !== 0){
        for (let key in this.imgList){
          this.imgList.splice(key,1)
        }
      }
      this.imgDialog= false
      let arr = []
      if(imgList !== null){
        this.imgDialog= true
        for (let key in imgList){
          let img ={
            name:imgList[key].BUrlpath.replace('/UpLoadFiles/BkPayment/',''),
            path:baseURL.replace('/api','')+imgList[key].BUrlpath
          };
          this.$set(this.imgList,key,img)
        }
      }
      console.log(this.imgList)
    }
  },
  components: {
    ImgView,
    auditMsg
  }
}
</script>

<style lang="scss" scoped>
.auditfollow {
  right: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background: #fff;
  box-shadow: 0px 1px 9px #1b4a7394;
  .title {
    text-align: center;
    color: #fff;
    font-size: 0.2rem;
    height: 40px;
    line-height: 40px;
    background: $primaryColor;
    position: relative;
    > i {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 5px;
      right: 10px;
      cursor: pointer;
      background: url(../../assets/images/delete.svg);
      background-size: 100% 100%;
    }
  }
  .follow-main {
    height: 850px;
    overflow: auto;
    overflow-x: hidden;
    .content {
      padding: 10px 0px 10px 0px;
      > ul {
        /*position: absolute;*/
        bottom: 60px;
        overflow: auto;
        top: 60px;
        right: 12px;
        padding-right: 30px;
        padding-left: 30px;
        margin-right: -27px;
        > li {
          border-left: 1px solid $btnColor;
          &:first-of-type {
            height: 50px;
          }
          &:last-of-type {
            height: 150px;
          }
        }
        .msg {
          padding-bottom: 40px;
        }
      }
    }
  }
}
.dialog-title span {
  width: 100%;
  text-align: left;
  font-size: 0.16rem;
  border-bottom: 1px solid #eaeaea;
}
</style>

