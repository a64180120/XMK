<template>
    <div class="auditLiuCheng">
        <topHandle :title="'系统管理在线工作平台'" @refresh="refresh">
            <div class="btnCon">
                <div v-if="menuButton.approvalflow_add=='True'" @click.stop="showAuditAdd('add')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/xz.png" alt=""></div>
                    新增
                </div>
                <div v-if="menuButton.approvalflow_edit=='True'" @click.stop="showAuditAdd('update')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
                    修改
                </div>
                <div v-if="menuButton.approvalflow_delete=='True'" @click.stop="deleteAudit" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj3.png" alt=""></div>
                    删除
                </div>
            </div>
        </topHandle>
        <div class="container">
            <div class="searchCon">
                <search placeholder="流程编码/流程名称" v-model="serachVal" @btnClick="search"></search>
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
                                        <div>序号</div>
                                    <!-- <el-checkbox v-model="typechecked" @change="typeallChecked" :indeterminate="typeindeterminate">序号</el-checkbox> -->
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
                                    <tr :class="{trActive:type.checked}" v-for="(type,n) in typeList" :key="n">
                                        <td @click.stop="typechoose(type)" style="padding: 0 5px;cursor:pointer;">
                                        <el-checkbox v-model="type.checked" @click.stop.native="1" @change="typechoose(type,'change')">{{n+1}}</el-checkbox>
                                        </td>
                                        <td>
                                        {{type.TypeName}}
                                        </td>
                                        <td>
                                        {{orders[type.Value]}}
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                           
                        </div>
                    </div>
                     <div class="typeHandle">
                       <div>
                            <div v-if="menuButton.approvalflow_typeadd=='True'" @click.stop="showAuditTypeAdd('add')" class="typeAdd">
                                <img src="@/assets/images/add.png" alt="">   <span>新增</span> 
                            </div>
                            <div v-if="menuButton.approvalflow_typeedit=='True'" @click.stop="showAuditTypeAdd('update')" class="typeUpdate">
                                <img src="@/assets/images/update.png" alt="">   <span>修改</span> 
                            </div>
                            <div v-if="menuButton.approvalflow_typedelete=='True'" @click.stop="deletetype" class="typeDelete">
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
                                    <td @click.stop="allChecked('change')"  style="cursor:pointer;padding: 0 5px;">
                                    <el-checkbox v-model="checked" @click.stop.native="1" @change="allChecked" :indeterminate="indeterminate">序号</el-checkbox>
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
                                    <tr :class="{trActive:audit.checked}" v-for="(audit,m) in auditList" :key="m">
                                        <td @click.stop="choose(audit)"  style="cursor:pointer;padding: 0 5px;">
                                        <el-checkbox @click.stop.native="1" @change="choose(audit,'change')" v-model="audit.checked">{{m+1}}</el-checkbox>
                                        </td>
                                        <td>
                                            {{audit.FCode}}
                                        </td>
                                        <td>
                                        {{audit.FName}}
                                        </td>
                                        <td class="enable">
                                        <img v-if="audit.FEnable==0" src="@/assets/images/gou.svg" alt="">
                                        <img v-else src="@/assets/images/cha.svg" alt="">
                                        </td>
                                        <td class="atype" @click="orgTree(audit)">
                                            <span  v-for="org of audit.Organizes">{{org.OrgName}}&nbsp;</span>
                                        </td>
                                        <td>
                                        {{audit.FDescribe}}
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
        <!--组织树弹窗   visible:显示,,,,@confirm接收选中的值   data组织列表  checked-org当前选中的组织的code列表-->
        <orgtree :visible.sync="orgVisible"  @confirm="getOrg" :data="orglist" :checked-org="orgSelected"></orgtree>
 
        <fDialog :title="(auditBtn=='add'?'新增':'修改')+'审批流'"  :visible.sync="auditAddShow">
            <audit-add 
                v-if="auditAddShow"
                :orglist="orglist"
                :splx="splx" 
                :auditinfo="auditinfo" 
                :type="auditBtn" 
                :options="typeList"
                :codeList="codeList"
                 @add-cancle="addCancle"></audit-add>
        </fDialog>
         <fDialog  :title="'审批类型'+(typeBtn=='add'?'新增':'修改')" :visible.sync="auditTypeAddShow">
            <audittype-add v-if="auditTypeAddShow" :type="typeBtn" :typeinfo="typeinfo" @add-cancle="typeCancle"></audittype-add>
        </fDialog>
    </div>
</template>

<script>
import auditAdd from "@/components/setting/auditAdd"
import audittypeAdd from "@/components/setting/auditTypeAdd"
import Orgtree from "@/components/orgtree/index"
import fDialog from "@/components/attechment/dialog"
import topHandle from '@/components/topNav/topHandle'
import search from '@/components/searchInput/searchInput'
import {mapState} from 'vuex'
import {GetAllChildTree} from '@/api/systemSetting/post'
import {PostAddProcType,GetProcTypes,PostUpdateProcType,PostDeleteProcType,GetProcList,GetAppvalPostList,PostDeleteProcs,PostUpdateProcOrganize} from '@/api/systemSetting/audit'
export default {
    name:'auditLiuCheng',
    data(){
        return{
            orders:{
                '001':'资金拨付单',
                '002':'支付单',
                '003':'项目用款单',
                '004':'预算审核单',
                '005':'项目申报单'
            },
            orgInfo:{},//修改的启用组织信息
            codeList:[],//岗位列表
            typechecked:false,//类型全选状态
            typechoosedItem:[],//类型选中的行
            splx:'',//流程新增时传入的审批类型
            typeinfo:{},//类型修改
            typeindeterminate:false,//类型半选状态
            typeList:[],//类型列表
            choosedItem:[],//选中的流程行
            auditinfo:{},//修改流程时传入的流程信息
            checked:false,//全选状态
            indeterminate:false,//半选状态
            auditList:[],//流程列表
            auditAddShow:false,//工作流编辑
            auditTypeAddShow:false,//类型编辑
            auditBtn:'',
            typeBtn:'',
            pageSize:30,
            pageIndex:1,
            total:2,
            orgVisible:false,
            orgSelected:[],
            defaultProps: {
              children: 'children',
              label: 'OName'
            },
            serachVal:'',//搜索值
            orglist:[],//组织下部门列表
        }
    },
    computed:{
        ...mapState({
            menuButton: state => state.user.menubutton
        })
    },
    mounted(){
        this.getTypeData();
        this.getPosts();
        this.getorglist();
    },
    methods:{
        search(){
            this.getData(this.typechoosedItem[0]);
        },
        getOrg(val){
            let arr=[];

            val.map(v => {
                arr.push({
                    OrgId:v.PhId,
                    OrgCode:v.OCode,
                    OrgName:v.OName
                    })
            })
            this.orgInfo.NewOrganizes=arr;
            this.updateOrg(this.orgInfo);
        },
        getData(val){
            let data={
                orgid:this.$store.state.user.orgid,
                ApprovalTypeId:val.PhId,
                BillType:val.Value,
                PageIndex:this.pageIndex,
                PageSize:this.pageSize,
                QueryFilter:this.serachVal
                // Orgid：组织id
                // ApprovalTypeId：审批类型id
                // BillType：单据类型
                // PageIndex：页码（从1开始）
                // PageSize：每页显示条数
                // ------可选参数--------
                // QueryFilter：搜索条件
            }
            GetProcList(data).then(res=>{
                if(res.Status=='error'){
                    this.$msgBox.show(res.Msg)
                }else{
                    this.auditList=res.Data;
                    this.total=res.Total;
                    this.checked=false;  
                    this.allChecked(false);  
                }
            })
        },
        deleteAudit(){  //流程删除
            this.$confirm('此操作将永久删除该流程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(()=>{
                    
                    // this.choosedItem.map(ch => {
                        
                    // })
                    // let delArr=[];
                    // this.choosedItem.map(choose => {
                    //     let arr=[];
                    //     choose.Organizes.map(org => {
                    //         arr.push(org.OrgId)
                    //     })
                    //     let dat = {
                    //         ApprovalTypeId:choose.SPLXPhid,
                    //         BillType:choose.FBilltype,
                    //         OrgIds:arr,
                    //         ProcCode:choose.FCode
                    //     }
                    //     delArr.push(dat);
                    // })
                    // let data ={
                    //     infoData:delArr
                    // }
                    let data={
                        ProcModels:this.choosedItem
                    }
                    PostDeleteProcs(data).then(res => {
                        this.$msgBox.show(res.Msg);
                        if(res.Status =="success"){
                            this.getData(this.typechoosedItem[0]);
                        }
                    }).catch(err=>{
                        console.log(err)
                        this.$msgBox.error('删除失败!')
                    })
                })
        },
        //修改启用组织
        updateOrg(data){
            PostUpdateProcOrganize(data).then(res => {
                if(res.Status=='error'){
                    this.$msgBox.error(res.Msg);
                }else{

                    this.$msgBox.show(res.Msg);
                    this.getData(this.typechoosedItem[0]);
                }
               
            }).catch(err => {
                console.log(err)
                this.$msgBox.show('修改组织失败!');
            })
        },
        showAuditAdd(val){  //流程编辑
            // if(this.typechoosedItem.length==0){
            //     this.$msgBox.show('请先选择一个审批类型!');
            //     return;
            // }
            if(this.typechoosedItem.length>1){
                this.$msgBox.show('只能选择一个审批类型!');
                return;
            }
            if(val=='update'&&this.choosedItem.length>1){
                this.$msgBox.show('只能选择一行流程信息!');
                return;
            }
            if(val=='update'&&this.choosedItem.length==0){
                this.$msgBox.show('请选择一行流程信息!');
                return;
            }
            this.auditBtn=val;
            if(val=='add'){
                this.splx=this.typechoosedItem[0].PhId;
                this.auditinfo=null;
            }else{
                this.splx='';
                this.auditinfo=this.choosedItem[0];
            }
            this.auditAddShow=true;
            
        },
        //获取岗位列表
        getPosts(){
            let data={
                Orgid:this.$store.state.user.orgid,
            }
            GetAppvalPostList(data).then(res => {
                if(res.Status=='error'){
                    this.$msgBox.show(res.Msg)
                }else{
                    this.codeList=res;
                }
            }).catch(
                err => {
                    this.$msgBox.show('获取岗位列表失败!')
                }
            )
        },
  
        //获取类型列表
        getTypeData(){
            let data={
                orgid:this.$store.state.user.orgid,
            }
            GetProcTypes(data).then(res=>{
                if(res.Status=='error'){
                    this.$msgBox.show(res.Msg)
                }else{
                    this.typeList=res.Data;
                    this.typechecked=false;  
                    this.typeallChecked(false);  
                     this.$set(this.typeList[0],'checked',true); 
                     this.typechoosedItem[0]=this.typeList[0];
                     this.getData(this.typeList[0])
                }
            }).catch(err=>{
                this.$msgBox.show('获取类型列表失败!')
            })
        },
        //删除类型
        deletetype(){
            if(this.typechoosedItem.length==0){
                this.$msgBox.show('请选择一行审批类型!');
                return;
            }
            for(let ty of this.typechoosedItem){
                if(ty.Issystem==1){
                    this.$msgBox.show('不允许删除内置类型,请查看!');
                     return;
                }
               
            }
            this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(()=>{
                    let newArr=[];
                    this.typechoosedItem.map(ty => {
                        newArr.push(ty.PhId);
                    })
                    let data={
                        ApprovalTypeIds:newArr
                    }
                    PostDeleteProcType(data).then(res=>{
                         this.$msgBox.show(res.Msg);
                         if(res.Status=='success'){
                             this.getTypeData();
                         }
                    }).catch(err=>{
                        this.$msgBox.show('删除类型失败!');
                    })
                   
                }).catch(()=>{

                })
        },
        showAuditTypeAdd(val){ //类型编辑
            this.typeBtn=val;
            if(val=='update'){
                if(this.typechoosedItem.length==0){
                    this.$msgBox.show('请选择一行数据!');
                    return;
                }
                if(this.typechoosedItem.length>1){
                    this.$msgBox.show('请只选择一行数据!');
                    return;
                }
                this.typeinfo=this.typechoosedItem[0];
            }else{
                this.typeinfo={Value:'001',TypeName:''}
            }
            this.auditTypeAddShow=true;
        },
        addCancle(bool){ //流程弹窗关闭
            this.auditinfo=null;
            this.auditAddShow=false;
            if(bool){
                this.getData(this.typechoosedItem[0]);
            }

        },
        typeCancle(data){//类型弹窗关闭
            this.auditTypeAddShow=false;
            if(data){
                this.getTypeData();
            }
        },
        handleCurrentChange(val){
            this.pageIndex=val;
            this.getData();
        },
        handleSizeChange(val){
            this.pageSize=val;
            this.getData();
        },
        refresh(){
           this.getTypeData();
           this.getPosts();
        },
        orgTree(val){
            if(val){
                let arr=[];
                val.Organizes.map(v =>{
                    arr.push(v.OrgCode)
                })
                 this.orgSelected=arr;//需要code的列表
            }
            this.checked=false;
            this.allChecked()
            this.choose(val)
            this.orgInfo=val;
            this.orgVisible=true;
        },
        //获取组织下部门
        getorglist(){
            let data = {
                orgid:this.$store.state.user.orgid
            }
            GetAllChildTree(data).then(res => {
                if(res.Status=='error'){
                    this.$msgBox.error(res.Msg)
                }else{
                    this.orglist=res.Record;
                }
            }).catch(err => {
                this.$msgBox.error('获取组织下部门信息失败!')
            })
            
        },
        //流程选择
        choose(val,str){
            if(str!='change'){
                val.checked=!val.checked;
            }
            if(val.checked){
                this.choosedItem.push(val);
            }else{
                this.choosedItem.map((ch,i,arr)=>{
                    if(ch.PhId==val.PhId){
                        this.choosedItem.splice(i,1);
                    }
                });
                
            }
            let allCheck=this.auditList.every((acc)=>{
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
        allChecked(str){
            this.indeterminate=false;
            if(str=="change"){
                this.checked=!this.checked;
            }
            if(this.checked){
                this.auditList.map(arr=>{
                    this.$set(arr,'checked',true); 
                    this.choosedItem=JSON.parse(JSON.stringify(this.auditList));
                })
            }else{
                this.auditList.map(arr=>{
                     this.$set(arr,'checked',false);
                     this.choosedItem=[];
                })
            }
        },
        //类型单选
        typechoose(val){    
            this.typeList.map(ty => {
                ty.checked=false;
            })
            this.$set(val,'checked',true);
            this.typechoosedItem[0]=val;
            this.getData(val);
            
        },
        //类型选择(多选)
        // typechoose(val,index){
        //     if(val.checked){
        //         this.typechoosedItem.push(val);
        //     }else{
        //         this.typechoosedItem.map((ch,i,arr)=>{
        //             if(ch.Phid==val.Phid){
        //                 this.typechoosedItem.splice(i,1);
        //             }
        //         });
                
        //     }
        //     let allCheck=this.typeList.every((acc)=>{
        //         return acc.checked==true;
        //     })
        //     if(allCheck){
        //         this.typechecked=true;
        //         this.typeindeterminate=false;
        //     }else{
        //         this.typechecked=false;
        //         this.typeindeterminate=false;
        //         if(this.typechoosedItem.length>0){
        //             this.typeindeterminate=true;
        //         }
        //     }
        //     console.log(this.typechoosedItem)
        // },
        //类型全选
        typeallChecked(val){
            this.typeindeterminate=false;
            if(val){
                this.typeList.map(arr=>{
                    this.$set(arr,'checked',true); 
                    this.typechoosedItem=JSON.parse(JSON.stringify(this.typeList));
                })
            }else{
                this.typeList.map(arr=>{
                     this.$set(arr,'checked',false);
                     this.typechoosedItem=[];
                })
            }
        }
    },
    components:{
        topHandle,
        search,
        fDialog,
        auditAdd,
        audittypeAdd,
        Orgtree
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
        top:160px;      
        .searchCon{
            padding:10px;
            float:right;
        }  
        .content{
            height:100%;
            padding-top:50px;
            padding-right:10px;
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
                    right: 0px;
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
    padding-right: 10px;
}
.topIcon{
    height:60%;
    >img{
        height:100%;
    }
}
</style>
