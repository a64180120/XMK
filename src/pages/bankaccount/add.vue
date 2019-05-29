<template>
    <div class="bankaccountAdd">
        <ul>
            <li>
                <div>所属组织:</div>
                <div class="orgName" @click="orgTree()">
                    <span v-show="!info.org">请选择组织</span>
                    <span v-for="org of info.org">{{org.OName}}</span>
                </div>
            </li>
            <li>
                <div>银行账号名称:</div>
                <div>
                    <el-input v-model="info.name" placeholder="请输入银行账户名称"></el-input>
                </div>
            </li>
            <li>
                <div>银行账号:</div>
                <div>
                    <el-input v-model="info.name" placeholder="请输入银行账号"></el-input>
                </div>
            </li>
            <li>
                <div>开户行:</div>
                <div>
                    <el-input v-model="info.name" placeholder="请输入开户行"></el-input>
                </div>
            </li>
            <li>
                <div>银行行号:</div>
                <div>
                    <el-input v-model="info.name" placeholder="请输入银行行号"></el-input>
                </div>
            </li>
            <li>
                <div>所在城市名称:</div>
                <div></div>
            </li>
            <li>
                <div>启用/通用:</div>
                <div>
                    <el-radio v-model="info.enable" value='0'>启用</el-radio>
                    <el-radio v-model="info.enable" value='1'>停用</el-radio>
                </div>
            </li>
        </ul>
        <p>
            <span class="whiteBtn">取消</span>
            <span class="btn">保存</span>
        </p>
        <!--组织树弹窗   visible:显示,,,,@confirm接收选中的值   data组织列表  checked-org当前选中的组织的code列表-->
        <orgtree :visible.sync="orgVisible"  @confirm="getOrg" :data="orgList" :checked-org="orgSelected"></orgtree>
    </div>
</template>

<script>
import Orgtree from "@/components/orgtree/index"
import {mapState} from 'Vuex'
export default {
    name:'bankaccountAdd',
    props:{
        type:{
            type:String,
            default:'add'
        }
    },
    data(){
        return{
            info:{},
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
        getOrg(val){
            this.info.org=val;  
        },
        orgTree(){
            if(this.info.org){
                 this.orgSelected=[this.info.org.OCode];//需要code的列表
            } 
            this.orgVisible=true;
        }
    },
    mounted(){
        
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
