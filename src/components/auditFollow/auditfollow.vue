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
                <audit-msg :info="item" :index="index+1"></audit-msg>
              </li>
            </ul>
          </div>
          <div class="collapse-main">
            <el-collapse v-model="activeName" accordion class="collapse">
              <el-collapse-item>
                <template slot="title">
                  资金拨付流程
                </template>
                <div class="content">
                  <ul>
                    <li></li>
                    <li class="msg" v-for="(item,index) of auditMsg" :key="index">
                      <audit-msg :info="item" :index="index+1"></audit-msg>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  支付单流程
                </template>
                <div class="content">
                  <ul>
                    <li></li>
                    <li class="msg" v-for="(item,index) of auditMsg" :key="index">
                      <audit-msg :info="item" :index="index+1"></audit-msg>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  资金拨付
                </template>
                <div class="content">
                  <ul>
                    <li></li>
                    <li class="msg" v-for="(item,index) of auditMsg" :key="index">
                      <audit-msg :info="item" :index="index+1"></audit-msg>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>

    </div>
</template>

<script>
import auditMsg from './auditMsg'
export default {
    name:"auditfollow",
    props:{
        title:{
            type:String,
            default:'审批流查看'
        },
        visible:{  //控制显示隐藏
            type:Boolean,
            default:true
        },
        auditMsg:{
            type:Array,
            default(){
                return [{
                  OperaName:'王刚',
                  FDate:'2019-04-25T14:00',
                  RefbillPhid:'附件1',
                  FOpinion:'不同意'
                    },{
                  OperaName:'金晶',
                  FDate:'2019-04-25T17:00',
                  RefbillPhid:'附件2',
                  FOpinion:'同意'
                }]
            }
        }
    },
    data(){
        return {
          activeName:""
        }
    },
    methods:{
        close(){
            this.$emit('update:visible',false);
        }
    },
    components:{
        auditMsg
    }
}
</script>

<style lang="scss" scoped>
.auditfollow{
    right:0;
    top:0;
    bottom:0;
    width:240px;
    background: #fff;
    box-shadow: 0px 1px 9px #1b4a7394;
    .title{
        text-align: center;
        color:#fff;
        font-size:0.2rem;
        height:40px;
        line-height: 40px;
        background:$primaryColor;
        position: relative;
        >i{
            position: absolute;
            width:30px;
            height:30px;
            top:5px;
            right:10px;
            cursor:pointer;
            background:url(../../assets/images/delete.svg);
            background-size:100% 100%;
        }
    }
    .follow-main{
      height: 850px;
      overflow: auto;
      overflow-x: hidden;
      .content{
        padding:10px 0px 10px 0px;
        >ul{
          /*position: absolute;*/
          bottom: 60px;
          overflow: auto;
          top: 60px;
          right: 12px;
          padding-right: 30px;
          padding-left: 30px;
          margin-right: -27px;
          >li{
            border-left:1px solid $btnColor;
            &:first-of-type{
              height:50px;
            }
            &:last-of-type{
              height:150px;
            }
          }
          .msg{
            padding-bottom:40px;
          }
        }
      }
    }

}
</style>

