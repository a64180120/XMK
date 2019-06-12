<template>
    <div class="post">  
        <topHandle :title="'系统管理在线工作平台'"  @refresh="refresh">
            <div class="btnCon">
                <div @click.stop="showPostAdd('add')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/xz.png" alt=""></div>
                    新增
                </div>
                <div @click.stop="showPostAdd('update')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
                    修改
                </div>
                <div @click.stop="deletepost" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj3.png" alt=""></div>
                    删除
                </div>
            </div>
        </topHandle>
        <div class="container">
            <div class="searchCon">
                <div class="leftBtn">
                    <span>组织/部门:</span>
                    <div @click="orgtreeShow" class="searchOrgCon">
                        <span v-show="search.org.length<1">全部</span>
                        <span v-for="org of search.org">{{org.OName}}&nbsp;&nbsp;</span>    
                    </div> 
                    <span>启用/停用:</span>
                    <el-select class="enableCss" v-model="search.enable" @change="getData" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                 <div class="rightBtn">
                    <search placeholder='岗位代码/岗位名称' v-model="search.val" @btnClick="getData"></search>
                </div>
            </div>
            <div class="content">
                    <div class="formArea">
                        <div class="tableHead ">
                            <table>
                            <colgroup>
                                <col width="5%">
                                <col width="10%">
                                <col width="14%">
                                <col width="12%">
                                <col width="15%">
                                <col width="15%">
                                <col width="15%">
                                <col width="14%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <td style="padding: 0 5px;">
                                    <el-checkbox @change="allChecked" :indeterminate="indeterminate" v-model="checked">序号</el-checkbox>
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
                                    <col width="10%">
                                    <col width="14%">
                                    <col width="12%">
                                    <col width="15%">
                                    <col width="15%">
                                    <col width="15%">
                                    <col width="14%">
                                </colgroup>
                                <thead>
                                    <tr v-for="(post,n) in postList" :key="n">
                                        <td style="padding: 0 5px;">
                                        <el-checkbox @change="choose(post)" v-model="post.checked">{{n+1}}</el-checkbox>
                                        </td>
                                        <td>
                                        {{post.GAppvalPost.FCode}}
                                        </td>
                                        <td>
                                        {{post.GAppvalPost.FName}}
                                        </td>
                                        <td class="tdCon">
                                            <div v-for="per of  post.GAppvalPost4Opers">{{per.OperatorName}}</div>
                                        
                                        </td>
                                        <td class="tdCon">
                                            <div v-for="dep of  post.GAppvalPost4Opers">{{dep.DepName}}</div>
                                        </td>
                                        <td class="tdCon">
                                            <div v-for="org of  post.GAppvalPost4Opers">{{org.OrgName}}</div>
                                        
                                        </td>
                                        <td>
                                        {{post.GAppvalPost.FDescribe}}
                                        </td>
                                        <td class="postRadio">
                                             <img v-if="post.GAppvalPost.FEnable==0" src="@/assets/images/gou.svg" alt="">
                                            <img v-else src="@/assets/images/cha.svg" alt="">
                                        
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
        <!--组织树弹窗   visible:显示,,,,@confirm接收选中的值   data组织列表  checked-org当前选中的组织的code列表-->
        <orgtree :visible.sync="orgVisible"  @confirm="getOrg" :data="orglist" :checked-org="orgSelected"></orgtree>
        <el-dialog  :title="(postBtn=='add'?'新增':'修改')+'岗位'" :visible.sync="postAddShow">
            <post-add :postinfo="postinfo" :type="postBtn" @add-cancle="addCancle"></post-add>
        </el-dialog>
    </div>
</template>

<script>
import fDialog from "@/components/attechment/dialog"
import postAdd from '@/components/setting/postAdd'
import search from '@/components/searchInput/searchInput'
import topHandle from '@/components/topNav/topHandle'
import Orgtree from "@/components/orgtree/index"
import {GetAppvalPostOpersList,PostDelete,GetAllChildTree} from '@/api/systemSetting/post'
export default {
    name:'post',
    data(){
        return{
            options:[
                {label:'全部',value:'0'},
                {label:'启用',value:'1'},
                {label:'停用',value:'2'}
            ],
            orglist:[],//组织列表
            search:{org:[],enable:'0',val:''},
            indeterminate:false,
            checked:false,
            postList:[],
            choosedItem:[],
            postAddShow:false,
            postBtn:'',
            pageSize:30,
            pageIndex:1,
            total:0,
            orgSelected:[],
            postinfo:'',//修改时传入的phid
            orgVisible:false,
        }
    },
    mounted(){
        this.getData();
        this.getorglist();
    },
    methods:{
        refresh(){
            this.getData();
        },
        handleCurrentChange(val){
            this.pageIndex=val;
            this.getData();
        },
        handleSizeChange(val){
            this.pageSize=val;
            this.getData();
        },
        showPostAdd(str){  //添加修改
           
            if(str=='update'&&this.choosedItem.length==0){
                this.$msgBox.show('请先选择一行数据!');
                return;
            }
            if(str=='update'&&this.choosedItem.length>1){
                this.$msgBox.show('只能选择一行数据!');
                return;
            }
            if(str=='update'){
                this.postinfo=this.choosedItem[0].GAppvalPost.PhId;
            }else{
                this.postinfo=''
            }
            this.postAddShow=true;
            this.postBtn=str;
        },
        addCancle(bo){
            if(bo){
                this.getData();
            }
            this.postAddShow=false;
        },
        deletepost(){  //岗位删除
            if(this.choosedItem.length==0){
                this.$msgBox.show('请先选择一行数据!');
                return;
            }
            this.$confirm('此操作将永久删除该岗位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(()=>{
                    let arr=[];
                    
                    this.choosedItem.map(ch => {
                        arr.push(ch.GAppvalPost.PhId);
                    })
                    let data = {
                        PostPhidList:arr
                    }
                    PostDelete(data).then(res => {
                        this.$msgBox.show(res.Msg);
                        if(res.Status =="success"){
                            this.getData();
                        }
                    }).catch(err=>{
                        this.$msgBox.error('删除失败!')
                    })
                })
            
        },
        //获取组织筛选列表
        getorglist(){
            let data={
                orgid:this.$store.state.user.orgid
            }
            GetAllChildTree(data).then(res => {
                if(res.Status=='error'){
                    this.$msgBox.error(res.Msg)
                }else{
                    this.orglist=res.Record;
                }
            }).catch(err => {
                this.$msgBox.error('获取组织列表失败!')
            })
        },
        //获取岗位列表
        getData(){
            let orgids=[];
            for(let id of this.search.org){
                orgids.push(id.PhId)
            }
            let data={
                PageIndex:this.pageIndex-1,//  (分页页码)
                PageSize:this.pageSize,//  （分页大小）
                Orgid: this.$store.state.user.orgid, //  （组织id）
                Ucode: 'Admin', //（用户编码）  admin为显示全部
               //Ucode:this.$store.state.user.usercode,
                PostName:this.search.val,//搜索框值
                EnableMark:this.search.enable,//启用停用
                SearchOrgid:orgids
            }
            GetAppvalPostOpersList(data).then(res => {
                if(res.Status=='error'){
                    this.$msgBox.show(res.Msg)
                }else{
                    
                    this.postList=res.Record;
                    this.total=res.totalRows;
                    this.checked=false;
                    this.allChecked(false);
                }
            }).catch(err => {
                this.$msgBox.show('获取岗位列表信息失败!')
            })
        },
        orgtreeShow(){  //显示组织树
            this.orgSelected=[];
            for(let org of this.search.org){
                this.orgSelected.push(org.OCode);    
            }
            this.orgVisible=true;
        },
        getOrg(val){
            console.log(val)
            this.search.org=val;
            this.getData();
        },
         //流程选择
        choose(val,index){
            if(val.checked){
                this.choosedItem.push(val);
            }else{
                this.choosedItem.map((ch,i,arr)=>{
                    if(ch.PhId==val.PhId){
                        this.choosedItem.splice(i,1);
                    }
                });
                
            }
            let allCheck=this.postList.every((acc)=>{
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
        //流程全选
        allChecked(val){
            this.indeterminate=false;
            if(val){
                this.postList.map(arr=>{
                    this.$set(arr,'checked',true); 
                    this.choosedItem=JSON.parse(JSON.stringify(this.postList));
                })
            }else{
                this.postList.map(arr=>{
                     this.$set(arr,'checked',false);
                     this.choosedItem=[];
                })
            }
        },
    },
    components:{
      topHandle,
      search,
      postAdd,
      fDialog,
      Orgtree
    }
}
</script>

<style lang="scss" scoped>
.post{
    height:100%;
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
        top:160px; 
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
.postRadio{
 
    >img{
        height:20px;

    }

}
.searchOrgCon{
    display: inline-block;
    min-width: 70px;
    max-width: 300px;
    border-bottom: 1px solid #ccc;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    margin-right:5px;
    position: relative;
    top: 5px;
    >span{

    }
}
.tdCon{
      padding:0;
    >div{
        height:40px;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-top:1px solid #ccc;
        &:first-of-type{
            border-top:0;
        }
    }
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
.post .enableCss input{
        height: 32px;
}
</style>

