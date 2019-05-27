<template>
    <div class="account_bank">
        <div class="searchCon">
            <search @btnClick="search"></search>
        </div>
        <div class="content clear">
            <div class="orgList fl">
                <p>组织列表</p>
                <div>
                    <el-tree
                    node-key="label"
                    :props="defaultProps"
                    :data="orgList"
                    :expand-on-click-node="false"
                    @node-click="orgChange">
                    </el-tree>
                </div>
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
                                    saas
                                    </td>
                                    <td>
                                    adasda 
                                    </td>
                                    <td>
                                    adasda 
                                    </td>
                                    <td>
                                    adasda 
                                    </td>
                                    <td v-if="type=='handle'">
                                    adasda 
                                    </td>
                                    <td v-if="type=='handle'">
                                    adasda 
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
            choosedItem:[],//选中的行
            checked:false,//全选状态
            indeterminate:false,//半选状态
            orgList:[{
                label: '一级 1',
                name:'455',
                children: [{
                    name:'555',
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            accountList:[
                {Phid:11111,OrgPhid:3333,FBankname:'中国银行1',FAccount:'银行账户',},
                {Phid:222,OrgPhid:3333,FBankname:'中国银行2',FAccount:'银行账户',},
                {Phid:3333,OrgPhid:3333,FBankname:'中国银行3',FAccount:'银行账户',}],
            pageSize:30,
            pageIndex:1,
            total:0
        }
    },
    methods:{
        orgChange(val){
            console.log(val);

        },
        search(){

        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
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
            padding-bottom:40px;
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
</style>

