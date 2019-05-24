<template>
    <div class="auditLiuCheng">
        <topHandle :title="'系统管理在线工作平台'" @refresh="refresh">
            <div class="btnCon">
                <div @click.stop="showAuditAdd('add')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/xz.png" alt=""></div>
                    新增
                </div>
                <div @click.stop="showAuditAdd('update')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
                    修改
                </div>
                <div class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj3.png" alt=""></div>
                    删除
                </div>
            </div>
        </topHandle>
        <div class="container">
            <div class="searchCon">
                <search @btnClick="search"></search>
            </div>
            <div class="content">
                <div class="auditType">
                    <div class="formArea">
                        <div class="tableHead " style="border-right:1px solid #fff;" >
                            <table>
                            <colgroup>
                                <col width="30%">
                                <col width="40%">
                                <col width="30%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <td style="padding: 0 5px;">
                                    <el-checkbox v-model="checked">序号</el-checkbox>
                                    </td>
                                    <td>
                                    审批类型
                                    </td>
                                    <td >
                                    单据类型
                                    </td>
                                    
                                </tr>
                            </thead>
                            </table>
                        </div>
                        <div class="tableBody">
                            <table>
                                <colgroup>
                                    <col width="30%">
                                    <col width="40%">
                                    <col width="30%">
                                
                                </colgroup>
                                <thead>
                                    <tr v-for="n in 20">
                                        <td style="padding: 0 5px;">
                                        <el-checkbox v-model="checked">序号</el-checkbox>
                                        </td>
                                        <td>
                                        流程代码
                                        </td>
                                        <td>
                                        流程名称
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                           
                        </div>
                    </div>
                     <div class="typeHandle">
                       <div>
                            <div @click.stop="showAuditTypeAdd('add')" class="typeAdd">
                                <img src="@/assets/images/add.png" alt="">   <span>新增</span> 
                            </div>
                            <div @click.stop="showAuditTypeAdd('update')" class="typeUpdate">
                                <img src="@/assets/images/update.png" alt="">   <span>修改</span> 
                            </div>
                            <div @click.stop="AuditTypeDelete" class="typeDelete">
                                <img src="@/assets/images/del.png" alt="">   <span>删除</span> 
                            </div>
                       </div>
                    </div>
                </div>
                <div class="auditcontent">
                    <div class="formArea">
                        <div class="tableHead ">
                            <table>
                            <colgroup>
                                <col width="10%">
                                <col width="15%">
                                <col width="20%">
                                <col width="15%">
                                <col width="25%">
                                <col width="15%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <td style="padding: 0 5px;">
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
                                    <col width="10%">
                                    <col width="15%">
                                    <col width="20%">
                                    <col width="15%">
                                    <col width="25%">
                                    <col width="15%">
                                </colgroup>
                                <thead>
                                    <tr v-for="n in 35">
                                        <td style="padding: 0 5px;">
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
                                        <td class="orgInfo">
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
                    </div>
                </div>
            </div>
        </div>
        <fDialog :title="(auditBtn=='add'?'新增':'修改')+'审批流'" :visible.sync="auditAddShow">
            <audit-add :type="auditBtn" @add-cancle="addCancle"></audit-add>
        </fDialog>
         <fDialog  :title="'审批类型'+(typeBtn=='add'?'新增':'修改')" :visible.sync="auditTypeAddShow">
            <audittype-add :type="typeBtn" @add-cancle="typeCancle"></audittype-add>
        </fDialog>
    </div>
</template>

<script>
import auditAdd from "@/components/setting/auditAdd"
import audittypeAdd from "@/components/setting/auditTypeAdd"

import fDialog from "@/components/attechment/dialog"
import topHandle from '@/components/topNav/topHandle'
import search from '@/components/searchInput/searchInput'
export default {
    name:'auditLiuCheng',
    data(){
        return{
            checked:false,
            auditAddShow:false,//工作流编辑
            auditTypeAddShow:false,//类型编辑
            auditBtn:'',
            typeBtn:'',
            pageSize:30,
            pageIndex:1,
            total:0,
        }
    },
    methods:{
        search(val){
            console.log(val)
        },
        showAuditAdd(val){  //流程编辑
            this.auditBtn=val;
            this.auditAddShow=true;
        },
        showAuditTypeAdd(val){ //类型编辑
            this.typeBtn=val;
            this.auditTypeAddShow=true;
        },
        addCancle(){ //流程弹窗关闭
            this.auditAddShow=false;
        },
        typeCancle(){//类型弹窗关闭
            this.auditTypeAddShow=false;
        },
        handleCurrentChange(val){
            console.log(1111,val)
        },
        handleSizeChange(val){
             console.log(1111,val)
        },
        refresh(){
            console.log(22222);
        }
    },
    components:{
        topHandle,
        search,
        fDialog,
        auditAdd,
        audittypeAdd
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
            cursor: pointer;
            &:active{
                background: #ccc;
            }
        }
    }
    .container{
        left:200px;
        top:150px;      
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
                height:100%;
                float:left; 
                .formArea{
                   left: 10px;
                    right: 0px;
                    top: 0;
                    bottom: 50px;     
                }
                .typeHandle{
                    position:absolute;
                    left: 10px;
                    right: 0px;
                    bottom: 10px;  
                    height:30px;
                    line-height: 30px;
                    >div{
                        width:100%;
                        margin:0 auto;
                        text-align: center;
                        >div{
                            display: inline-block;
                            cursor: pointer;
                            margin-left:15px;
                            font-size:0.16rem;
                            >span{
                                position: relative;
                                top:2px;
                            }
                            >img{
                                    width:20px;
                                    vertical-align: middle;
                                }
                            &.typeAdd{
                                color:$btnColor;
                                
                            }
                            &.typeUpdate{
                                color:#ff9900;
                            }
                            &.typeDelete{
                                color:#8e8e8e;
                                >img{
                                    width:25px;
                                }
                            }
                        }
                    }
                }
            }
            .auditcontent{
                float:left;
                width:75%;
                height:100%;
                .formArea{
                   left: 0;
                    right: 4px;
                    top: 0;
                    bottom: 50px;     
                }
            }
        }
    }

}
.tableBody{
        top: 50px;
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
.enable{
    >img{
        height:20px;

    }
}
.pageArea{
    bottom:10px;
}
.orgInfo{
    text-decoration: underline;
    cursor: pointer;
}
.topIcon{
    height:60%;
    >img{
        height:100%;
    }
}
</style>
