<template>
    <div class="auditLiuCheng">
        <topHandle>
            <div class="btnCon">
                <div @click.stop="showAuditAdd('add')" class="handle">新增</div>
                <div @click.stop="showAuditAdd('update')" class="handle">修改</div>
                <div class="handle">删除</div>
            </div>
        </topHandle>
        <div class="container">
            <div class="searchCon">
                <search @btnClick="search"></search>
            </div>
            <div class="content">
                <div class="auditType">
                    4444
                </div>
                <div class="auditcontent">
                    <div class="formArea">
                        <div class="tableHead">
                            <table>
                            <colgroup>
                                <col width="5%">
                                <col width="15%">
                                <col width="20%">
                                <col width="20%">
                                <col width="25%">
                                <col width="15%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <td>
                                    <el-checkbox v-model="checked">序号</el-checkbox>
                                    </td>
                                    <td>
                                    流程代码
                                    </td>
                                    <td>
                                    流程名称
                                    </td>
                                    <td>
                                    启用/停用
                                    </td>
                                    <td>
                                    启用组织
                                    </td>
                                    <td>
                                    备注
                                    </td>
                                </tr>
                            </thead>
                            </table>
                        </div>
                        <div class="tableBody">
                            <table>
                                <colgroup>
                                    <col width="5%">
                                    <col width="15%">
                                    <col width="20%">
                                    <col width="20%">
                                    <col width="25%">
                                    <col width="15%">
                                </colgroup>
                                <thead>
                                    <tr v-for="n in 35">
                                        <td>
                                        <el-checkbox v-model="checked">序号</el-checkbox>
                                        </td>
                                        <td>
                                        流程代码
                                        </td>
                                        <td>
                                        流程名称
                                        </td>
                                        <td class="enable">
                                        <img src="@/assets/images/gou.svg" alt="">
                                        <!-- <img src="@/assets/images/cha.svg" alt=""> -->
                                        </td>
                                        <td>
                                        启用组织
                                        </td>
                                        <td>
                                        备注
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="pageArea">
                    <!-- <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="searchData.pageSearch.pageIndex"
                        :page-sizes="[50,100,150,200]"
                        :page-size="searchData.pageSearch.pageSize"
                        layout="total,sizes,prev,pager,next,jumper"
                        :total="dataList.total"
                    >

                    </el-pagination> -->
                    </div>
                </div>
            </div>
        </div>
        <fDialog width="43.5%" :title="(auditBtn=='add'?'新增':'修改')+'审批流'" :visible.sync="auditAddShow">
            <audit-add :type="auditBtn"></audit-add>
        </fDialog>
    </div>
</template>

<script>
import auditAdd from "@/components/setting/auditAdd"
import fDialog from "@/components/attechment/dialog"
import topHandle from '@/components/topNav/topHandle'
import search from '@/components/searchInput/searchInput'
export default {
    name:'auditLiuCheng',
    data(){
        return{
            checked:false,
            auditAddShow:false,
            auditBtn:'',
        }
    },
    methods:{
        search(val){
            console.log(val)
        },
        showAuditAdd(val){
            this.auditBtn=val;
            this.auditAddShow=true;
        }
    },
    components:{
        topHandle,
        search,
        fDialog,
        auditAdd
    }
}
</script>

<style lang="scss" scoped>
.auditLiuCheng{
    .btnCon{

        .handle{
            display: inline-block;
            width: 60px;
            height: 50px;
            padding: 0px 0;
        }
    }
    .container{
        left:170px;      
        .searchCon{
            padding:10px;
            float:right;
        }  
        .content{
            height:100%;
            padding-top:50px;
            >div{
                display: inline-block;
                 position: relative;
            }
            .auditType{
                width:25%;
            }
            .auditcontent{
                width:74%;
                height:100%;
                .formArea{
                   left: 0;
                    right: 4px;
                    top: 0;
                    bottom: 60px;     
                }
            }
        }
    }

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
    background-color: #8ec2c6;
    padding: 0 15px;
}
.enable{
    >img{
        height:20px;

    }
}

</style>
