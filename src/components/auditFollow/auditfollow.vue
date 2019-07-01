<template>
  <div @click.stop="keepInputFocus()" v-show="visible"  style="z-index: 3000;overflow: auto" class="auditfollow msFixed">
    <div class="follow-body">
      <p class="title">
        <span>{{title}}</span>
        <i @click="close"></i>
      </p>
      <!--流程-->
      <div class="follow-main pay-fund">
        <div class="content" @mouseenter="payfundEnter()" @mouseleave="payfundLeave()" :class="[payfundClass?'payfundHover':'']">
          <!--资金拨付-->
          <ul class="pay-fund">
            <li></li>
            <li class="msg" v-for="(item,index) of payfundData" :key="index" >
                <audit-msg class="payfund" :nowNum="inPayfund?nowNum:-1" v-bind="$attrs" v-on="$listeners" :info="item" :index="index+1" :startNum="payfundStartNum" @imgList="getImgList"></audit-msg>
            </li>
          </ul>
        </div>
      </div>
      <div class="follow-main pay-list">
        <div class="content" @mouseenter="paylistEnter()" @mouseleave="paylistLeave()" :class="[paylistClass?'paylistHover':'']">
          <!--支付单-->
          <ul class="pay-list" v-if="paylistData.length !==0">
            <li></li>
            <li class="msg" v-for="(item,index) of paylistData" :key="index" :style="{'marginBottom':index == paylistData.length-1?'50px':'0'}">
              <div style="width: 90%">
                <audit-msg class="paylist" :nowNum="inPaylist?nowNum:-1" v-bind="$attrs" v-on="$listeners" :info="item" :index="index+1" :startNum="paylistStartNum"  @imgList="getImgList"></audit-msg>
              </div>
              <!--标记是否是会签的左边线-->
              <div v-if="item.IsMode =='1'">
                <!--判断第一个会签模式第一个-->
                <div v-if="paylistData[index-1].IsMode != '1' && paylistData[index].IsMode == '1'" class="modeTop">
                  <span class="hqms" :style="{'top':(item.SameNum-1) * 110 + 50+'px'}">会<br/>签</span>
                </div>
                <!--判断会签模式最后一个且非paylistData的最后一个-->
                <div v-if="paylistData[index+1] &&paylistData[index+1].IsMode != '1' && paylistData[index].IsMode == '1'" class="modeBottom"></div>
                <!--会签模式右边的竖线，最后一个加上border-bottom-->
                <div :class="[index ==paylistData.length-1?'lastMode':'IsMode']" ></div>
              </div>
            </li>
            <li></li>
          </ul>
        </div>
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
import { mapState } from "vuex";
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
      imgList:[],//图片列表
      imgDialog:false,//图片预览弹框
      payfundData:[],
      paylistData:[],
      payfundStartNum:0,
      paylistStartNum:0,
      payfundClass:false,//资金拨付移入移出类名
      paylistClass:false,//支付单移入移出类名
      inPayfund:false,//下一审批在资金拨付流程中
      inPaylist:false,//下一审批在支付单流程中
      nowNum:-1//下一审批所在位置
    }
  },
  watch: {
    auditMsg: {
      handler(val) {
        this.nowNum = -1
        this.payfundData = val.filter(item =>item.FBilltype === '001');
        this.paylistData = val.filter(item =>item.FBilltype === '002');
        this.paylistStartNum = this.payfundData.length;
        for (let key in val){
          if (val[key].FApproval ===1){
            if (val[key].FBilltype ==='001') {
              this.inPayfund = true;
              this.inPaylist = false;
              this.nowNum = parseInt(key)+1
              break
            }else if(val[key].FBilltype ==='002'){
              this.inPayfund = false;
              this.inPaylist = true;
              this.nowNum = parseInt(key)+1 - parseInt(this.paylistStartNum)
              break
            }
            console.log(this.nowNum)
          }
        }
        // console.log(this.nowNum)
        for (let key in val){

        }
      },
      deep: true
    },
    auditfollow(val){
      if (val){
        this.$emit('update:visible', false)
        this.$store.commit('setAuditfollow',false)
      }
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      auditfollow: state => state.auditfollow.auditfollow
    })
  },
  mounted(){
    this.$store.commit('setAuditfollow',false)
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$store.commit('setAuditfollow',false)
    },
    //通过审批流获取图片列表
    getImgList(imgList){
      if (this.imgList.length !== 0){
        for (let key in this.imgList){
          this.imgList = []
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
    },
    //资金拨付鼠标移入事件
    payfundEnter(){
      this.payfundClass = true
    },
    //资金拨付鼠标移出事件
    payfundLeave(){
      this.payfundClass = false
    },
    //支付单鼠标移入事件
    paylistEnter(){
      this.paylistClass = true
    },
    //支付单鼠标移出事件
    paylistLeave(){
      this.paylistClass = false
    },
    keepInputFocus(){
      this.$store.commit('setAuditfollow',false)
      console.log(this.auditfollow)
    },
    keepDialog(){

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
  width: 310px;
  background: #fff;
  box-shadow: 0px 1px 9px #1b4a7394;
  >.follow-body{
    position: relative;
    .title {
      text-align: center;
      color: #fff;
      font-size: 0.2rem;
      height: 40px;
      line-height: 40px;
      background: $primaryColor;
      position: fixed;
      z-index: 3500;
      width: 310px;
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
    .pay-fund{
      .content{
        padding: 10px 0px  0px;
      }
    }
    .follow-main {
      height:100%;
      overflow: auto;
      overflow-x: hidden;
      .content {
        /*padding: 10px 0px 10px 0px;*/
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
            width: 220px;
            border-left: 2px solid $btnColor;
            &:first-of-type {
              height: 50px;
            }
            &:last-of-type {
              padding-bottom: 0px;
            }
          }
          .msg {
            padding-bottom: 40px;
            position: relative;
          }
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
<style scoped>
  .img-dialog >>> .el-dialog{
    width: 780px!important;
  }
  .paylist >>> ul li em{
      /*color: red !important;*/
  }
  .payfundHover .pay-fund li{
    border-left: 2px solid #8bc34a !important;
  }
  .IsMode{
    width: 10px;
    height: 100%;
    border-right: 2px solid #ff2929b5;
    /*border-bottom: 2px solid red;*/
    /*background-color: red;*/
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    /*border-bottom: 1px solid #0ee6d4 !important;*/
  }
  .lastMode{
    width: 10px;
    height: 100%;
    border-right: 2px solid #ff2929b5;
    border-bottom: 2px solid #ff2929b5;
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
  }
  .modeTop{
    border-top: 2px solid #ff2929b5;
    width: 10px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
  }
  .hqms{
    background-color: #ffffff;
    position: absolute;
    z-index: 1;
    left: -1px;
    top: 50px;
  }
  .modeBottom{
    border-bottom: 2px solid #ff2929b5;
    width: 10px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
  }
  .payfundHover .pay-fund li .payfund >>> ul li em{
    color:#8bc34a ;
    border: 2px solid #8bc34a;
  }
  .paylistHover .pay-list li{
    border-left: 2px solid #8bc34a !important;
  }
  .paylistHover .pay-list li .paylist >>> ul li em{
    border: 2px solid #8bc34a;
    color: #8bc34a ;
  }
</style>
