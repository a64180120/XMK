<template>
     <!-- 设置支付口令 -->
      <div class="dialogContainer passwordsetting" v-show="showSetting">
        <div class="title">
            <span>支付口令设置</span> 
            <div v-if="menuButton.paypsd_edit=='True'" @click="updatePsd" v-show="disabled">
                <img src="@/assets/images/bj.png" alt="">
                <i>修改口令</i>
            </div> 
        </div>
        <div class="payCenterDialog">
          <div class="content password setting">
            <span v-show="!disabled">原始口令</span>
            <div v-show="!disabled" class="passwordContent">
              <el-input
                maxlength="6"
                @keyup.native="clearNoNum('oldPassword',oldPassword)"
                :disabled="disabled"
                :type="oldPasswordCanSee?'text':'password'"
                v-model="oldPassword"
                placeholder="请输入原数字口令"
              ></el-input>
              <img
                v-show="oldPasswordCanSee&&!disabled"
                class="eye"
                src="@/assets/images/zy.png"
                @click="oldPasswordCanSee= !oldPasswordCanSee"
              >
              <img
                v-show="!oldPasswordCanSee&&!disabled"
                class="eye"
                src="@/assets/images/by.png"
                @click="oldPasswordCanSee= !oldPasswordCanSee"
              >
            </div>
            <span>支付口令</span>
            <div class="passwordContent">
              <el-input
                maxlength="6"
                @keyup.native="clearNoNum('newPassword',newPassword)"
                :disabled="disabled"
                :type="newPasswordCanSee?'text':'password'"
                v-model="newPassword"
                placeholder="请输入6位新数字口令"
              ></el-input>
              <img
                v-show="newPasswordCanSee&&!disabled"
                class="eye"
                src="@/assets/images/zy.png"
                @click="newPasswordCanSee= !newPasswordCanSee"
              >
              <img
                v-show="!newPasswordCanSee&&!disabled"
                class="eye"
                src="@/assets/images/by.png"
                @click="newPasswordCanSee= !newPasswordCanSee"
              >
            </div>
            <span v-show="!disabled">口令确认</span>
            <div v-show="!disabled" class="passwordContent">
              <el-input
                maxlength="6"
                @keyup.native="clearNoNum('confirmPassword',confirmPassword)"
                :type="confirmPasswordCanSee?'text':'password'"
                v-model="confirmPassword"
                placeholder="请再次输入6位数字口令"
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
            <el-radio-group style="width:60%"  v-model="radio">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
            <div v-if="menuButton.paypsd_isactive=='True'" v-show="disabled" @click="updateEnable" class="fr btn" style="margin-top:10px">保存</div>
          </div>
          <div v-show="!disabled" class="btns">
            <span class="btn btn-cancel" @click="beforeClose()">取消</span>
            <span class="btn" @click="setPassword">保存</span>
          </div>
        </div>
      </div>
</template>

<script>
import md5 from 'js-md5'
import {mapState} from 'vuex'
import {PostSavePayPsd,PostPayPsdIsactive,GetPayPsd} from '@/api/systemSetting/dataSafe'
export default {
    name:'passwordsetting',
    data(){
        return {
          oldPasswordCanSee:false,
          oldPassword:'',
            showSetting:true,
            newPasswordCanSee:false,
            newPassword:'',
            confirmPasswordCanSee:false,
            confirmPassword:'',
            radio:0,
            disabled:true, //不可编辑
        }
    },
    computed:{
        ...mapState({
            menuButton: state => state.user.menubutton
        })
    },
    mounted(){
      this.getData();
    },
    methods:{
      //设置支付口令
        setPassword(){
          let reg=/([0-9])\1{5}/;
          if(!this.newPassword){
            this.$msgBox.show('请输入口令!')
               return;
          }
          if(this.newPassword!==this.confirmPassword){
            this.$msgBox.show('两次输入的口令不一致,请重新输入!')
               return;
          }
          if(this.confirmPassword.length!=6){
            this.$msgBox.show('输入的口令应为6位数字,请重新输入!')
            return;
          }
          if(reg.test(this.confirmPassword)){
            this.$msgBox.show('输入的口令不能为6位相同数字,请重新输入!')
            return;
          }
          if(this.checkNum(this.confirmPassword)){
            this.$msgBox.show('输入的口令不能为6位连续数字,请重新输入!')
            return;
          }
          let  data={
            // DicType:'PayPsd',
            // DicName:'支付口令',
            TypeCode:this.$store.state.user.usercode,
            TypeName:this.$store.state.user.username,
            Value:md5(this.confirmPassword),
            Isactive:this.radio,
            Orgid:this.$store.state.user.orgid,
            Orgcode:this.$store.state.user.orgcode,
            DEFSTR1:md5(this.oldPassword)
          }
            PostSavePayPsd(data).then(res => {
              this.$msgBox.show(res.Msg);
              if(res.Status=='success'){
                this.disabled=true;
                 this.getData();
              }
            }).catch(err => {
              this.$msgBox.show('保存支付口令失败!');
            })
        },
        //编辑口令
        updatePsd(){
          this.disabled=false;
          this.newPassword='';
          this.oldPassword='';
          this.confirmPassword='';
        },
        //启用/停用
        updateEnable(){
          let data={
            TypeCode:this.$store.state.user.usercode,
            TypeName:this.$store.state.user.username,
            Isactive:this.radio,
            Orgid:this.$store.state.user.orgid,
            Orgcode:1
          }
          PostPayPsdIsactive(data).then(res => {
            if(res.Status=='success'){
               this.$msgBox.show(res.Msg)
            }else{
              this.$msgBox.error(res.Msg)
            }
           
          }).catch(err => {
            this.$msgBox.error('修改失败!')
          })  
        },
        //输入框限定***
        clearNoNum(val,val2){
            this[val]=val2.replace(/[^0-9]/g,"");
              //清除“数字”和“.”以外的字符  
        },
        //检查口令
        checkNum(val){
          let arr=val.split('');
          let bool = true;
          for(let a=0;a<5;a++){
            if(arr[a]-arr[a+1]!=1){
              bool=false;
              break;
            }
          }
          if(bool){
            return bool;
          }else{
            bool=true;
          }
          for(let b=0;b<5;b++){
            if(arr[b+1]-arr[b]!=1){
              bool=false;
              break;
            }
          }
          return bool;
        },
        getData(){
          let data={
            TypeCode:this.$store.state.user.usercode,
          }
          GetPayPsd(data).then(res => {
            if(res.Status=="error"){
              this.$msgBox.show(res.Msg)
            }else{
              this.radio=res.Isactive;
							if(res.Value){
								this.newPassword='123456';
							}
							this.newPasswordCanSee=false;
							this.oldPasswordCanSee=false;
							this.confirmPasswordCanSee=false;
            }
          }).catch(err => {
              this.$msgBox.show('获取支付口令失败!')
          })
        },
        beforeClose(){
            this.disabled=true;
            // this.newPassword='123456';
            
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
                cursor: pointer;
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


