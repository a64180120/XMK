<template>
    <div class="auditMsg">
        <ul>
            <li>
                <i class="logo"></i>
                <span>审批人:</span>
                <em>{{index}}</em>
            </li>
            <li>{{info.OperaName}}</li>
            <li>{{info.FDate}}</li>

            <li>意见: {{info.FOpinion}}</li>
            <li >附件: <span @click.stop="showAttech" class="attenchment">{{info.RefbillPhid}}</span></li>
        </ul>

      <el-dialog class="dialog img-dialog" :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false" width="40%">
        <div slot="title" class="dialog-title">
          <span style="float: left">查看附件</span>
        </div>
        <div class="btn-load">
          <el-button class="btn">下载</el-button>
        </div>
        <img-view v-if="dialogVisible"></img-view>
      </el-dialog>
    </div>
</template>

<script>
import fDialog from "../attechment/dialog"
import attechment from "../attechment/attechment"
import ImgView from "../imgView/imgView";
export default {
    name:'auditMsg',
    props:{
        info:{
            type:Object,
            default:{
                time:''
            }
        },
        index:{
            type:Number,
            default:1
        }
    },
    data(){
       return {
           dialogVisible:false,
       }
    },
    methods:{
        showAttech(){
            this.dialogVisible=true;
        },
    },
    components:{
      ImgView,
        fDialog,
        attechment
    }
}
</script>

<style lang="scss" scoped>
.auditMsg{
    text-align: left;
    padding-left:20px;
    font-size:0.16rem;
    color:$btnColor;
    >ul{
        >li{
            margin-bottom:5px;
            &:last-of-type{
                margin:0;
            }
            &:first-of-type{
                position:relative;
                >em{
                    position:absolute;
                    width:30px;
                    height:30px;
                    top:0;
                    left:-38px;
                    border:2px solid $btnColor;
                    border-radius: 50%;
                    background: #fff;
                    text-align: center;
                    line-height: 30px;
                    font-size:0.18rem;
                }
            }
        }
        .attenchment{
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
.logo{
    background:url(../../assets/images/1.png) no-repeat;
    display: inline-block;
    width:25px;
    height:20px;
    background-size: 100% 100%;
}
.attenchBtn{
    text-align: right;
    padding:5px 20px ;
    >span{
        width:70px;
    }
}
.dialog-title span{
  width: 100%;
  text-align: left;
  font-size: 0.16rem;
  border-bottom: 1px solid #eaeaea;
}
</style>
