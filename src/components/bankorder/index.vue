<template>
    <div class="account_bank">
        <div class="searchCon">
            <search placeholder="银行账户名称/账号" @btnClick="search"></search>
        </div>
        <div class="content clear">
            <div class="orgList fl">
                <p>组织列表</p>
                <div>
                  <el-tree
                    ref="orgtree"
                    node-key="label"
                    :props="defaultProps"
                    
                    :data="orgList"
                    :expand-on-click-node="false"
                    @node-click="orgChange"
                    ></el-tree>
                </div>
                <!-- <p class="bottomBtn">
                    <span class="btn" @click="getData">确定</span>
                </p> -->
            </div>
            <div class="account fl">
                <div class="formArea">
                    <div class="tableHead " style="border-right:1px solid #fff;" >
                        <table>
                        <colgroup>
                            <col width="5%">
                            <col width="20%">
                            <col width="15%">
                            <col width="15%">
                            <col width="15%">
                            <col v-if="type=='handle'" width="15%">
                            <col v-if="type=='handle'" width="15%">
                        </colgroup>
                        <thead>
                            <tr>
                                <td style="padding: 0 5px;">
                                <el-checkbox v-model="checked" @change="allChecked" :indeterminate="indeterminate">序号</el-checkbox>
                                </td>
                                <td>
                                银行账户名称
                                </td>
                                <td >
                                银行账号
                                </td>
                                <td >
                                开户行
                                </td>
                                <td >
                                银行行号
                                </td>
                                <td v-if="type=='handle'">
                                所在城市名称
                                </td>
                                <td v-if="type=='handle'">
                                停用/启用
                                </td>
                            </tr>
                        </thead>
                        </table>
                    </div>
                    <div class="tableBody">
                        <table>
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="15%">
                                <col width="15%">

                                <col width="15%">
                                <col v-if="type=='handle'" width="15%">
                                <col v-if="type=='handle'" width="15%">
                            
                            </colgroup>
                            <thead>
                                <tr v-for="(item,index) in accountList" :key="index">
                                    <td style="padding: 0 5px;">
                                    <el-checkbox @change="choose(item,index)" v-model="item.checked" >{{index+1}}</el-checkbox>
                                    </td>
                                    <td>
                                    {{item.FAccount}}
                                    </td>
                                    <td>
                                    XXXXXXXXXXXX
                                    </td>
                                    <td>
                                    {{item.FBankname}} 
                                    </td>
                                    <td>
                                    XXXXX
                                    </td>
                                    <td v-if="type=='handle'">
                                    杭州市 
                                    </td>
                                    <td class="enable" v-if="type=='handle'">
                                    <img src="@/assets/images/gou.svg" alt="">
                                        <!-- <img src="@/assets/images/cha.svg" alt=""> --> 
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        
                    </div>
                </div>
                <!-- <div class="pageArea">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageIndex"
                            :page-sizes="[30,50,100,150,200]"
                            :page-size="pageSize"
                            layout="total,sizes,prev,pager,next,jumper"
                            :total="total"
                        >
                        </el-pagination>
                    </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import search from '@/components/searchInput/searchInput'
import {BankAccountList} from '@/api/bankaccount'
import {mapState} from 'Vuex'
export default {
    name:"accountbank",
    props:{
        type:{
            type:String,
            default:''
        }
    },
    data(){
        return{
             defaultProps: {
              children: 'children',
              label: 'OName'
            },
            choosedItem:[],//选中的行
            checked:false,//全选状态
            indeterminate:false,//半选状态
            checkedOrg:[],
            accountList:[
                {Phid:11111,OrgPhid:3333,FBankname:'中国银行',FAccount:'王冠冠',},
                {Phid:222,OrgPhid:3333,FBankname:'农业银行',FAccount:'刘杭',},
                {Phid:3333,OrgPhid:3333,FBankname:'交通银行',FAccount:'夏华军',}],
        }
    },
    computed:{
        ...mapState({
            orgList: state=>state.user.orglist
        })
    },
    methods:{
        //组织选择
         orgChange:function(data){
           this.checkedOrg=data;
           this.getData();
        },
        //搜索
        search(){

        },
        getData(){
            return;
            let data={
                OrgPhid:this.checkedOrg.PhId
        }
            BankAccountList(data).then(res=>{
                 
                 if(res.Status=="error"){
                     this.$msgBox.show(res.Msg)
                 }else{
                     this.accountList=res.Record;
                 }
            }).catch(err=>{
                this.$msgBox.show('获取银行档案列表失败!')
            })
           
        },
        //选择行
        choose(val,index){
            if(val.checked){
                this.choosedItem.push(val);
            }else{
                this.choosedItem.map((ch,i,arr)=>{
                    if(ch.Phid==val.Phid){
                        this.choosedItem.splice(i,1);
                    }
                });
                
            }
            let allCheck=this.accountList.every((acc)=>{
                return acc.checked==true;
            })
            if(allCheck){
                this.checked=true;
                this.indeterminate=false;
            }else{
                this.checked=false;
                this.indeterminate=false;
                if(this.choosedItem.length>0){
                    this.indeterminate=true;
                }
            }
        },
         //全选
        allChecked(val){
            this.indeterminate=false;
            if(val){
                this.accountList.map(arr=>{
                    this.$set(arr,'checked',true); 
                    this.choosedItem=JSON.parse(JSON.stringify(this.accountList));
                })
            }else{
                this.accountList.map(arr=>{
                     this.$set(arr,'checked',false);
                     this.choosedItem=[];
                })
            }
        }
    },
    mounted(){
        this.getData()
    },
    watch:{
        
    },
    components:{
        search
    }
}
</script>

<style lang="scss" scoped>
.account_bank{
    padding:10px 1%;
    height:100%;
    .searchCon{
        float:right;
    }  
    .content{
        height:100%;
        padding-top:40px;
        .orgList{
            height:100%;
            width:20%;
            padding-bottom:50px;
            >p{
                height:48px;
                line-height:48px;
                color:#fff;
                font-size:0.16rem;
                background:$btnColor;
            }
            >div{
                border:1px solid $borderColor_ccc;
                height:100%;
                overflow: auto;
            }
            .bottomBtn{
                background:#fff;
                >span{
                    width:120px;
                    height:35px;
                    line-height: 35px;
                    margin-top:10px;
                }
            }
        }
        .account{
            width:80%;
            height:100%;
            position: relative;
            .formArea{
                top:0;
                right:0;
                bottom:0;
                .tableBody{
                    top:48px;
                }
                .tableBody table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0 10px;
                    padding: 0 15px;
                }
                .tableHead table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    padding: 0 15px;
                }
            }
        }
    }
}
.enable{
    >img{
        height:20px;

    }
}
</style>

