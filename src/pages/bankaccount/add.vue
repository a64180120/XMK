<template>
    <div class="bankaccountAdd">
        <ul>
            <li>
                <div>所属组织:</div>
                <div class="orgName" @click="orgTree()">
                    <span v-show="!info.OrgName">请选择组织</span>
                    <span>{{info.OrgName}}</span>
                </div>
            </li>
            <li>
                <div>银行账户名称:</div>
                <div>
                    <el-input v-model="info.FBankname" placeholder="请输入银行账户名称(必填)"></el-input>
                </div>
            </li>
            <li>
                <div>银行账号:</div>
                <div>
                    <el-input v-model="info.FAccount" minlength="19" placeholder="请输入银行账号(必填)"></el-input>
                </div>
            </li>
            <li>
                <div>开户行:</div>
                <div>
                    <el-input v-model="info.FOpenAccount" placeholder="请输入开户行(必填)"></el-input>
                </div>
            </li>
            <li>
                <div>银行行号:</div>
                <div>
                    <el-input v-model="info.FBankcode" minlength="3" placeholder="请输入银行行号(必填)"></el-input>
                </div>
            </li>
            <li>
                <div>所在城市名称:</div>
                <div>
                    <el-input v-model="info.FCity" placeholder="请输入所在城市(必填)"></el-input>
                </div>
            </li>
            <li>
                <div>启用/停用:</div>
                <div>
                    <el-radio v-model="info.FLifecycle" label='1'>启用</el-radio>
                    <el-radio v-model="info.FLifecycle" label='0'>停用</el-radio>
                </div>
            </li>
        </ul>
        <p>
            <span @click="$emit('add-cancle')" class="whiteBtn">取消</span>
            <span @click="update" class="btn">保存</span>
        </p>
         <el-dialog :close-on-click-modal="false" class="bankAddOrg" :append-to-body="true" :visible.sync="orgVisible"  width="30%" title="组织选择">
            <p></p>
            <el-tree
                ref="orgtree"
                :props="{ children: 'children',label: 'OName' }"
                node-key="OCode"
                :model="false"
                :data="orgList"
                :expand-on-click-node="false"
                @node-click="orgChange"
                ></el-tree>
        </el-dialog>
        <!--组织树弹窗   visible:显示,,,,@confirm接收选中的值   data组织列表  checked-org当前选中的组织的code列表-->
        <!-- <orgtree :visible.sync="orgVisible"  @confirm="getOrg" :data="orgList" :checked-org="orgSelected"></orgtree> -->
    </div>
</template>

<script>
import Orgtree from "@/components/orgtree/index"
import {BankAccountSave} from '@/api/bankaccount'
import {mapState} from 'Vuex'
export default {
    name:'bankaccountAdd',
    props:{
        type:{
            type:String,
            default:'add'
        },
        info:{
            type:Object,
            default(){
                return {FLifecycle:'1'}
            }
        },
        accounts:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            orgVisible:false,
            orgSelected:[],
        }
    },
    computed:{
        ...mapState({
             orgList : state => state.user.orglist
        })
    },
    methods:{
        orgChange(val){
            this.info.OrgPhid=val.PhId; 
            this.info.OrgCode=val.OCode; 
            this.info.OrgName=val.OName; 
            this.orgVisible=false; 
        },
        orgTree(){
            // if(this.info.org){
            //      this.orgSelected=[this.info.org.OCode];//需要code的列表
            // } 
            this.orgVisible=true;
        },
        update(){
          if(!(this.info.OrgName&&this.info.FBankname&&this.info.FAccount&&this.info.FOpenAccount&&this.info.FBankcode&&this.info.FCity)){
            this.$msgBox.error('请完善必填信息!');
            return;
          }
          if(this.info.FAccount.length<19){
              this.$msgBox.error('银行账号要大于19位!');
            return;
          }
          if(this.info.FBankcode.length<3){
              this.$msgBox.error('银行行号要大于3位!');
            return;
          }
          for(let acc of this.accounts){ //判断重复账号
              if(acc.FAccount===this.info.FAccount&&acc.PhId!==this.info.PhId){
                    this.$confirm('银行账号重复, 是否继续保存?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        let data={
                            infoData:[this.info]       
                        }   
                            
                        BankAccountSave(data).then(res=>{
                            if(res.Status=='success'){
                                this.$msgBox.show(res.Msg)
                                this.$emit('add-cancle',true);
                            }else{
                                this.$msgBox.error(res.Msg)
                            }

                        }).catch(err=>{
                            this.$msgBox.error('保存失败!')
                        })
                    }).catch(err => console.log(err))
                    
                    return;
              }
             
            }
           let data={
                infoData:[this.info]       
            }   
                
            BankAccountSave(data).then(res=>{
                if(res.Status=='success'){
                    this.$msgBox.show(res.Msg)
                    this.$emit('add-cancle',true);
                }else{
                    this.$msgBox.error(res.Msg)
                }

            }).catch(err=>{
                this.$msgBox.error('保存失败!')
            })

            
        }
    },
    mounted(){
        console.log(this.info)
    },
    components:{
        Orgtree
    }
}
</script>

<style lang="scss" scoped>
.bankaccountAdd{
      border-top:1px solid $borderColor_ccc;
    >ul {
        >li{
            overflow: hidden;
            height:50px;
            line-height: 50px;
            >div{
                float:left;
                width:80%;
                &:first-of-type{
                    width:20%;
                    font-size:0.16rem;
                    padding-right:10px;
                    text-align: right;
                }
            }
        }
    }
    >P{
        text-align: center;
        >span{
            margin-right:60px;
            width:90px;
            &.btn{
                 margin-right:30px;
            }
        }
    }
}
.orgName{
    border-bottom:1px solid #C0C4CC;
    height:98%;
}
</style>
<style lang="scss">

.bankAddOrg .el-dialog .el-dialog__body {
    overflow: auto;
    max-height:500px;
    padding-top:0;
}
.bankAddOrg .el-dialog__header{
  padding-bottom:0px;
  text-align:left;
}
.bankAddOrg .el-dialog__body>p{
  width:100%;
  height:1px;
  background:$borderColor_ccc;
  margin:5px 0  10px 0;
}
</style>

