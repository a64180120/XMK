<template>
  <div v-if="visible" class="auditfollow msFixed">
    <p class="title">
      <span>{{title}}</span>
      <i @click="close"></i>
    </p>
    <div class="content">
      <ul>
        <li></li>
        <li class="msg" v-for="(item,index) of auditMsg" :key="index">
          <div class="auditMsg">
            <ul>
              <li>
                <i class="depart-logo"></i>
                <span>审批岗位：</span>
                <el-radio-group v-model="radio" style="float: right;line-height: 30px;margin-right: -5px">
                  <el-radio :label="item" class="radio">&nbsp</el-radio>
                </el-radio-group>
                <p>{{item.FName}}</p>
                <em>{{index+1}}</em>
              </li>
              <li v-if="item.Operators.length == 1">
                <template v-for="childrenItem in item.Operators">
                  <i class="logo"></i>
                  <span>审批人：</span>
                  <p>{{childrenItem.OperatorName}}</p>
                </template>
              </li>
              <li v-else>
                <i class="logo"></i>
                <span>审批人：</span>
                <br />
                <ul>
                  <li>
                    <span v-for="(childrenItem,idx) in item.Operators">
                      <span>
                        {{childrenItem.OperatorName}}
                      </span>
                      <span v-if="idx !== item.Operators.length-1">
                        、
                      </span>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li></li>
      </ul>
    </div>
    <div class="footer">
      <el-button size="medium" class="btn" @click="close()">取消</el-button>
      <el-button size="medium" class="btn" @click="confirm()">确认</el-button>
    </div>
  </div>
</template>

<script>
  import AuditMsg from "../auditFollow/auditMsg";
  import BackMsg from "./backMsg";
  export default {
    name:"backApproval",
    props:{
      title:{
        type:String,
        default:'选择回退接收人'
      },
      visible:{  //控制显示隐藏
        type:Boolean,
        default:false
      },
      auditMsg:{
        type:Array,
        default(){
          return [{
            name:'王刚',
            depart:'财务与资源管理部'
          },{
            name:'金晶',
            depart:'资源管理部'
          },{
            name:['李明','金晶','王刚'],
            depart:'人力资源部'
          }]
        }
      }
    },
    data(){
      return {
        radio:""
      }
    },
    mounted(){
      this.radio = this.auditMsg[0];
      console.log(this.radio)
    },
    watch:{
      radio(val){
        console.log(val)
      }
    },
    methods:{
      close(){
        this.$emit('update:visible',false);
        this.$emit('closeBack',false)
      },
      confirm(){
        this.$emit('getBackPeople',this.radio)
        this.close()
      }
    },
    components:{
      BackMsg,
      AuditMsg
    }
  }
</script>

<style lang="scss" scoped>
  .auditfollow{
    right:0;
    top:0;
    bottom:0;
    width:240px;
    z-index: 3000;
    background: #fff;
    box-shadow: 0px 1px 9px #1b4a7394;;
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
    .content{
      padding:50px 10px 10px 30px;
      >ul{
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
          text-align: right;
        }
      }
    }
  }
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
  .depart-logo{
    background:url(../../assets/images/1_03.png) no-repeat;
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
<style scoped>
  .radio >>> .el-radio__input .el-radio__inner{
    border-color:  #409EFF;
  }
</style>
