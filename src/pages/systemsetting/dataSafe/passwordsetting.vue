<template>
     <!-- 设置支付口令 -->
      <div class="dialogContainer passwordsetting" v-show="showSetting">
        <div class="title">
            <span>支付口令设置</span> 
            <div @click="disabled=false" v-show="disabled">
                <img src="@/assets/images/bj.png" alt="">
                <i>编辑</i>
            </div> 
        </div>
        <div class="payCenterDialog">
          <div class="content password setting">
            <span>支付口令</span>
            <div class="passwordContent">
              <el-input
              :disabled="disabled"
                :type="newPasswordCanSee?'text':'password'"
                v-model="newPassword"
                placeholder="请输入支付口令"
              ></el-input>
              <img
                v-show="newPasswordCanSee"
                class="eye"
                src="@/assets/images/zy.png"
                @click="newPasswordCanSee= !newPasswordCanSee"
              >
              <img
                v-show="!newPasswordCanSee"
                class="eye"
                src="@/assets/images/by.png"
                @click="newPasswordCanSee= !newPasswordCanSee"
              >
            </div>
            <span v-show="!disabled">确认口令</span>
            <div v-show="!disabled" class="passwordContent">
              <el-input
              
                :type="confirmPasswordCanSee?'text':'password'"
                v-model="confirmPassword"
                placeholder="请输入支付口令"
              ></el-input>
              <img
                v-show="confirmPasswordCanSee"
                class="eye"
                src="@/assets/images/zy.png"
                @click="confirmPasswordCanSee= !confirmPasswordCanSee"
              >
              <img
                v-show="!confirmPasswordCanSee"
                class="eye"
                src="@/assets/images/by.png"
                @click="confirmPasswordCanSee= !confirmPasswordCanSee"
              >
            </div>
            <span>启用/停用</span>
            <el-radio-group :disabled="disabled" v-model="radio">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </div>
          <div v-show="!disabled" class="btns">
            <span class="btn btn-cancel" @click="beforeClose()">取消</span>
            <span class="btn" @click="setPassword">保存</span>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    name:'passwordsetting',
    data(){
        return {
            showSetting:true,
            newPasswordCanSee:'text',
            newPassword:1115,
            confirmPasswordCanSee:'text',
            confirmPassword:'',
            radio:1,
            disabled:true, //不可编辑
        }
    },
    methods:{
        setPassword(){

        },
        getData(){

        },
        beforeClose(){
            this.disabled=true;
            this.getData();
        }
    }
}
</script>

<style lang="scss" scoped>
.title{
    background: $btnColor;
    color:#fff;
    height:40px;
    line-height: 40px;
    font-size:0.16rem;
    position: relative;
    >div{
        position:absolute;
        right:20px;
        top:0;
        cursor: pointer;
        img{
            height:25px;
            margin-top:5px;
        }
    }
}
.dialogContainer{
  
}
    .payCenterDialog {
    background-color: #fff;
     padding:10px;
    .content {
      text-align: left;
      font-size: 0.16rem;
      padding: 0 25px;
      &.password {
        margin-left: 90px;
        &.setting {
          > span {
            float: left;
            position: relative;
            left: -90px;
            clear: both;
            line-height: 55px;
            ~ .passwordContent,
            ~ .el-radio-group {
              width: 100%;
              float: left;
              margin-left: -150px;
              line-height: 55px;
              position: relative;
              left: 80px;
            }
            ~ .passwordContent {
              .eye {
                top: 8px;
              }
            }
          }
        }
        > img {
          float: left;
          position: relative;
          left: -90px;
        }
        > .passwordContent {
          font-size: 14px;
          width: 100%;
          float: left;
          margin-left: -90px;
          line-height: 70px;
          position: relative;
          .eye {
            position: absolute;
            width: 56px;
            height: 40px;
            top: 14px;
            right: 0;
          }
          .notice {
            text-align: center;
            text-decoration: underline;
            color: red;
            line-height: 30px;
            margin-bottom: 10px;
            > span {
              cursor: pointer;
            }
          }
        }
      }
      > span {
        line-height: 70px;
        font-size: 0.2rem;
      }
      > img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
      }
      &.payListContent {
        background-color: #f5f5f5;
        padding: 10px;
        margin-top: 15px;
        .payDetail {
          background-color: #fff;
          border-radius: 5px;
        }
        .getDetail {
          background-color: #fff;
        }
      }
    }
    .btns {
      text-align: center;
      padding-top: 10px;
      clear: both;
      .btn {
        border: 1px solid $btnColor;
        cursor: pointer;
        &:not(:last-of-type) {
          margin-right: 100px;
        }
        &.btn-cancel {
          background: #fff;
          color: $btnColor;
          border: 1px solid $btnColor;
        }
        &.btn-large {
          width: 88px;
        }
        &.btn-disable {
          background-color: $primaryColor;
          border-color: $primaryColor;
          cursor: not-allowed;
          color: #fff;
        }
      }
      .payId {
        float: left;
        line-height: 30px;
      }
    }
    .el-collapse {
      margin-top: 10px;
    }
  }
</style>
<style>
.passwordsetting .el-radio{
    line-height: 4;
}
</style>


