<template>
    <div class="post">  
        <topHandle :title="'系统管理在线工作平台'">
            <div class="btnCon">
                <div @click.stop="showPostAdd('add')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/xz.png" alt=""></div>
                    新增
                </div>
                <div @click.stop="showPostAdd('update')" class="handle">
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
                <div class="leftBtn">
                    <span>组织/部门</span> 
                    <span>启用/停用</span>
                    <el-select v-model="search.enable" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                 <div class="rightBtn">
                    <search @btnClick="search"></search>
                </div>
                
            </div>
            <div class="content">
                    <div class="formArea">
                        <div class="tableHead ">
                            <table>
                            <colgroup>
                                <col width="5%">
                                <col width="12%">
                                <col width="14%">
                                <col width="12%">
                                <col width="15%">
                                <col width="15%">
                                <col width="15%">
                                <col width="12%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <td style="padding: 0 5px;">
                                    <el-checkbox v-model="checked">序号</el-checkbox>
                                    </td>
                                    <td>
                                    岗位代码
                                    </td>
                                    <td>
                                    岗位名称
                                    </td>
                                    <td>
                                    审批人
                                    </td>
                                    <td>
                                    部门
                                    </td>
                                    <td>
                                    组织
                                    </td>
                                    <td>
                                    备注
                                    </td>
                                    <td>
                                    启用/停用
                                    </td>
                                </tr>
                            </thead>
                            </table>
                        </div>
                        <div class="tableBody">
                            <table>
                                <colgroup>
                                    <col width="5%">
                                    <col width="12%">
                                    <col width="14%">
                                    <col width="12%">
                                    <col width="15%">
                                    <col width="15%">
                                    <col width="15%">
                                    <col width="12%">
                                </colgroup>
                                <thead>
                                    <tr v-for="n in 35">
                                        <td style="padding: 0 5px;">
                                        <el-checkbox v-model="checked">序号</el-checkbox>
                                        </td>
                                        <td>
                                        岗位代码
                                        </td>
                                        <td>
                                        岗位名称
                                        </td>
                                        <td>
                                        审批人
                                        </td>
                                        <td>
                                        部门
                                        </td>
                                        <td>
                                        组织
                                        </td>
                                        <td>
                                        备注
                                        </td>
                                        <td>
                                        <el-radio v-model="checked" value='0'>启用</el-radio>
                                        <el-radio v-model="checked" value='1'>停用</el-radio>
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
        <el-dialog  :title="(postBtn=='add'?'新增':'修改')+'岗位'" :visible.sync="postAddShow">
            <post-add :type="postBtn" @add-cancle="addCancle"></post-add>
        </el-dialog>
    </div>
</template>

<script>
import fDialog from "@/components/attechment/dialog"
import postAdd from '@/components/setting/postAdd'
import search from '@/components/searchInput/searchInput'
import topHandle from '@/components/topNav/topHandle'
export default {
    name:'post',
    data(){
        return{
            options:[],
            checked:false,
            postAddShow:false,
            postBtn:'',
            pageSize:30,
            pageIndex:1,
            total:0,
        }
    },
    methods:{
        search(val){
            console.log(val)
        },

        handleCurrentChange(val){
            console.log(1111,val)
        },
        handleSizeChange(val){
             console.log(1111,val)
        },
        showPostAdd(str){  //添加修改
            this.postAddShow=true;
            this.postBtn=str;
        },
        addCancle(){
            this.postAddShow=false;
        }
    },
    components:{
      topHandle,
      search,
      postAdd,
      fDialog
    }
}
</script>

<style lang="scss" scoped>
.post{
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
    .topIcon{
        height:60%;
        >img{
            height:100%;
        }
    }
     .container{
        left:200px;
        top:150px; 
        font-size:0.16rem;     
        >.searchCon{
            position:absolute;
            left:1%;
            right:1%;
            top:0;
            height:50px;
           
            .rightBtn{
                float:right;
                 padding-top:10px;
            }
            .leftBtn{
                padding-top:5px;
                float:left;
            }
        }  
        .content{
            height:100%;
            padding-top:50px;
            .formArea{
                top:50px;
            }
        }
    }
}
.tableBody{
    top:50px;
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

</style>
<style>
.post  .el-dialog__header {
    text-align: left;
}
.post .el-dialog{
    min-width:720px;
}
    
.post .el-dialog__body{
    padding-top:0;
    
}
.post .el-dialog__body>div{
    border-top:1px solid #ccc;
}
</style>

