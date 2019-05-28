<template>
  <section>
    <handle-btn title="审批中心在线工作平台" :auditBtn="true">
      <div class="top" v-if="isApproval">
         <ul>
           <li @click="aprovalItem()">
             <div>
               <img src="../../assets/images/sp.png">
             </div>
             <span>审批</span>
           </li>
           <li @click="creatPayItem()">
             <div>
               <img src="../../assets/images/sc.png">
             </div>
             <span>生成支付单</span>
           </li>
         </ul>
      </div>
    </handle-btn>
    <div>
      <div class="container content-body">
        <div class="formArea">
          <!--搜索栏-->
          <div class="btnArea">
            <el-form :inline="true">
              <el-form-item label="申报部门" class="top-form-left">
                <el-input size="mini" v-model="form.depart" @focus="openOrg()" style="width: 120px"></el-input>
              </el-form-item>
              <el-form-item label="提留时长" class="top-form-left">
                <el-input size="mini" v-model="form.long" style="width: 200px">
                  <el-select v-model="select" slot="prepend" placeholder="类型" class="select-input" style="width: 75px">
                    <el-option label="大于" value="1"></el-option>
                    <el-option label="等于" value="2"></el-option>
                    <el-option label="小于" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="申报日期" class="top-form-left">
                <el-date-picker v-model="form.date" style="width: 240px" size="mini" type="daterange" start-placeholder="开始时间" end-placeholder="开始时间"></el-date-picker>
              </el-form-item>
              <el-form-item label="" class="top-form-right">
                <search-input @btnClick="search()" v-model="searchValue"></search-input>
              </el-form-item>
            </el-form>
          </div>
          <!--未审批表格-->
          <div v-if="isApproval" class="tableHead">
            <table>
              <colgroup>
                <col width="5%">
                <col width="10%">
                <col width="10%">
                <col width="17%">
                <col width="10%">
                <col width="8%">
                <col width="10%">
                <col width="5%">
                <col width="25%">
              </colgroup>
              <thead>
              <tr>
                <td>
                  <el-checkbox v-model="checkedAll" :indeterminate="IsIndeterminate">序号</el-checkbox>
                </td>
                <td>
                  申报部门
                </td>
                <td>
                  申请单编号
                </td>
                <td>
                  申请单名称
                </td>
                <td>
                  申请金额
                </td>
                <td>
                  申请日期
                </td>
                <td>
                  审批状态
                </td>
                <td>
                  停留时长
                </td>
                <td>
                  申报说明
                </td>
              </tr>
              </thead>
            </table>
          </div>
          <div v-if="isApproval" class="tableBody">
            <table>
              <colgroup>
                <col width="5%">
                <col width="10%">
                <col width="10%">
                <col width="17%">
                <col width="10%">
                <col width="8%">
                <col width="10%">
                <col width="5%">
                <col width="25%">
              </colgroup>
              <tbody>
              <tr v-for="(item,idx) in tableData"  :key="idx">
                <td>
                  <el-checkbox v-model="check[idx]"  >{{idx}}</el-checkbox>
                </td>
                <td @click="handleRowClick(item,idx)" class="apply-epart">
                  {{item.applyDepart}}
                </td>
                <td>
                  {{item.applyCode}}
                </td>
                <td>
                  {{item.applyName}}
                </td>
                <td>
                  {{item.applyAmount}}
                </td>
                <td>
                  {{item.applyDate}}
                </td>
                <td>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==1 " @click.stop="openApproval(item,idx)">待审核</span>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==2 " @click.stop="openApproval(item,idx)">审批中</span>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==3 " @click.stop="openApproval(item,idx)">审批通过</span>
                </td>
                <td>
                  <div @click="openAuditfollow()">
                    <img  v-if="item.approvalStutas == 1" src="../../assets/images/sj2.png" class="img-icon">
                    <img v-else src="../../assets/images/sj1.png" class="img-icon">
                  </div>
                </td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--已审批表格-->
          <div v-if="!isApproval" class="tableHead">
            <table>
              <colgroup>
                <col width="5%">
                <col width="10%">
                <col width="10%">
                <col width="17%">
                <col width="10%">
                <col width="8%">
                <col width="10%">
                <col width="30%">
              </colgroup>
              <thead>
              <tr>
                <td>
                  <el-checkbox v-model="checkedAll" :indeterminate="IsIndeterminate">序号</el-checkbox>
                </td>
                <td>
                  申报部门/单位
                </td>
                <td>
                  申请单编号
                </td>
                <td>
                  申请单名称
                </td>
                <td>
                  申请金额
                </td>
                <td>
                  申请日期
                </td>
                <td>
                  审批状态
                </td>
                <td>
                  申报说明
                </td>
              </tr>
              </thead>
            </table>
          </div>
          <div v-if="!isApproval" class="tableBody">
            <table>
              <colgroup>
                <col width="5%">
                <col width="10%">
                <col width="10%">
                <col width="17%">
                <col width="10%">
                <col width="8%">
                <col width="10%">
                <col width="30%">
              </colgroup>
              <tbody>
              <tr v-for="(item,idx) in tableData"  :key="idx">
                <td>
                  <el-checkbox v-model="check[idx]"  >{{idx}}</el-checkbox>
                </td>
                <td @click="handleRowClick(item,idx)" class="apply-epart">
                  {{item.applyDepart}}
                </td>
                <td>
                  {{item.applyCode}}
                </td>
                <td>
                  {{item.applyName}}
                </td>
                <td>
                  {{item.applyAmount}}
                </td>
                <td>
                  {{item.applyDate}}
                </td>
                <td>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==1 " @click.stop="openApproval(item,idx)">待审核</span>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==2 " @click.stop="openApproval(item,idx)">审批中</span>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==3 " @click.stop="openApproval(item,idx)">审批通过</span>
                </td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="pageArea">
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="page.pageSize"
            layout="total,sizes,prev,pager,next,jumper"
            :total="page.total"></el-pagination>
        </div>
      </div>
      <!--详情弹框-->
      <el-dialog class="dialog detail-dialog" :visible.sync="detailDialog" :close-on-click-modal="false" width="90%">
        <div slot="title" class="dialog-title">
          <span style="float: left">查看申请</span>
        </div>
          <applybill @showImg="showImg">
            <div slot="btn-group" >
              <el-button class="btn" size="mini" @click="aprovalItem">审批</el-button>
              <el-button class="btn" size="mini" style="width: 90px" @click="creatPayItem">生成支付单</el-button>
              <el-button class="btn" size="mini">打印</el-button>
            </div>
          </applybill>
      </el-dialog>
      <!--图片预览-->
      <el-dialog class="dialog img-dialog" :visible.sync="imgDialog" :close-on-click-modal="false" width="60%">
        <div slot="title" class="dialog-title">
          <span style="float: left">查看附件</span>
        </div>
        <div class="btn-load">
          <el-button class="btn">下载</el-button>
        </div>
        <img-view v-if="imgDialog" class="img-view"></img-view>
      </el-dialog>
      <!--审批弹框-->
      <approval-dialog ref="approvalDialog" :title="appDialog.title" :btn-group="appDialog.btnGroup" :data="approvalData" ></approval-dialog>
      <!--生成支付单弹框-->
      <paylist-dialog ref="paylistDialog" :data="approvalData"  @subSuc="plSubSuc()"></paylist-dialog>
      <!--查看审批流程-->
      <auditfollow :visible="visible" @update:visible="closeAuditFollow()"></auditfollow>
      <!--组织树-->
      <el-dialog id="orgdialog" :currentOrg="searchorg" width="350px" title="组织树"
                 :visible.sync="orgType" :close-on-click-modal="false">
        <orgtree :currentOrg="searchorg"  @choose="getOrg"></orgtree>
        <span slot="footer"   style="text-align: center">
          <button class="cancelBtn"  @click="orgType=false">取消</button>
          <button class="confirmBtn" style="margin-left: 30px" @click="confirmOrg()">确定</button>
        </span>
      </el-dialog>
    </div>


  </section>
</template>

<script>
  import FundDetail from "./fundDetail";
  import HandleBtn from "../../components/topNav/topHandle";
  import SearchInput from "../../components/searchInput/searchInput";
  import ApprovalDialog from "./approvalDialog";
  import Auditfollow from "../../components/auditFollow/auditfollow";
  import Applybill from "../../components/applyBill/applybill";
  import Orgtree from "../../components/orgtree/index";
  import { selection} from "./selection";
  import ImgView from "../../components/imgView/imgView";
  import PaylistDialog from "./paylistDialog";

  export default {
    name: "index",
    components: {
      PaylistDialog,
      ImgView, Orgtree, Applybill, Auditfollow, ApprovalDialog, SearchInput, HandleBtn, FundDetail},
    data(){
      return{
        searchValue:'',
        checkedAll:false, //是否全选
        IsIndeterminate:false, //列表中是否有选中的值并且不是全选
        check:[],//列表所有选中状态
        selection:[],//选中后的值
        select:"", //选择停留时间类型
        searchorg:{}, //工会组织需要传递的对象
        orgType:false,//控制组织树的展示与隐藏
        orgName:'',//组织名称
        detailData:{},
        approvalData:{},
        openApprovalDialog:false,
        checked:'',
        form:{
          depart:'',
          long:'',
          date:[]
        },
        tableData:[{}],//模拟表格数据
        page:{
          currentPage:1,//当前页
          pageSize:[20,50,100], //每页显示多少条
          total:3//总条数
        },//分页
        visible:false,
        appDialog:{
          title:'',
          btnGroup: {
            cancelName:"",
            onfirmName:""
          }
        },
        detailDialog:false,//打开详情弹框
        imgDialog:false,//图片预览弹框
        openInnerDialog:false,//打开详情内层弹框

        //判断显示为已审批页面还是未审批页面
        isApproval:""
      }
    },

    mounted() {
      this.isApproval = this.$route.query.approval
      console.log(this.isApproval)
      let data1 = {
        applyDepart:'实业中心',
        applyCode:'201904180001',
        applyName:'专家授课课酬支付申请',
        itemCode:'20190000007',
        itemName:'与行业协会合作共同展开...',
        applyAmount:'4,567.90',
        applyDate:'2019-04-17',
        approvalStutas:'1'
      };
      let data2 = {
        applyDepart:'广东省工人医院',
        applyCode:'201904180001',
        applyName:'专家授课课酬支付申请',
        itemCode:'20190000007',
        itemName:'与行业协会合作共同展开...',
        applyAmount:'4,567.90',
        applyDate:'2019-04-17',
        approvalStutas:'2'
      };
      let data3 = {
        applyDepart:'财务与资产管理部',
        applyCode:'201904180001',
        applyName:'专家授课课酬支付申请',
        itemCode:'20190000007',
        itemName:'与行业协会合作共同展开...',
        applyAmount:'4,567.90',
        applyDate:'2019-04-17',
        approvalStutas:'3'
      };
      for (let i = 0;i<3;i++){
        if(i%4 == 1){
          this.tableData[i] = data1
        }else if (i%4 == 2) {
          this.tableData[i] = data2
        } else {
          this.tableData[i] = data3
        }
        this.check.push(false)
      }
    },
    watch:{
      check(val,oldval){
        this.selection = selection(this.check,this.tableData)
        if (this.selection.length !==0 && this.selection.length !== this.tableData.length){
          this.IsIndeterminate = true
        }else if (this.selection.length === this.tableData.length) {
          this.IsIndeterminate = false
          this.checkedAll = true
        }else if(this.selection.length ===0){
          this.IsIndeterminate = false
          this.checkedAll = false
        }
      },
      checkedAll(val,ovlval){
        this.IsIndeterminate = false
        if(val){
          this.check = this.check.map((item,index,array)=> true)
        }else {
          this.check = this.check.map((item,index,array)=> false)
        }
      },
    },
    methods:{
      //搜索框事件
      search(){
        console.log(1)
      },
      //单行选中事件
      handleSelect(selection,row){
        console.log(selection,row)
      },
      //全部选中事件
      handleSelectAll(selection){
        console.log(selection)
      },
      //单行点击事件
      handleRowClick(row,idx){
        // this.$refs.fundDetail.changeDialog()
        this.detailDialog = true
        this.detailData = row
      },
      //当前页显示多少条数据
      handleSizeChange(val){
        console.log(val)
      },
      //调到第几页
      handleCurrentChange(val){
        console.log(val)
      },
      //打开查看审批流
      openApproval(row,idx){
        console.log(row,idx)
      },
      //打开审批弹框
      aprovalItem(){
        this.appDialog.title = '查看'
        this.appDialog.btnGroup.cancelName = '取消'
        this.appDialog.btnGroup.onfirmName = '确认'
        this.$refs.approvalDialog.changeDialog()
      },
      //生成支付单弹框
      creatPayItem(){
        this.$refs.paylistDialog.changeDialog()
      },
      closeAuditFollow(){
        this.visible = false
      },
      openAuditfollow(){
        this.visible = true
      },
      //确认按钮
      confirmOrg(){
        this.form.depart = this.orgName.label
        this.orgType = false
      },
      //获取组织树
      getOrg(e){
        this.orgName = e
      },
      //打开组织树
      openOrg(){
        this.orgType =true
      },
      //打开图片预览
      showImg(file){
        console.log(file)
        this.imgDialog= true
      },
      //生成支付单成功
      plSubSuc(){
        this.$refs.paylistDialog.changeDialog()
        this.detailDialog = false
      }
    }
  }
</script>
<style scoped>
  .content-body{
    min-width: 1200px;
    min-height: 500px;
  }
  .top{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%,-50%);
  }
  .top ul li{
    float: left;
    width: 80px;
  }
  .top ul li:hover{
    cursor: pointer;
  }
  .top ul li div img {
    width: 30px;
  }
  .divider .el-divider--horizontal{
    margin: 0;
  }
  .top-form-left{
    float: left;
    margin-bottom: 0px;
  }
  .top-form-right{
    float: right;
    margin-bottom: 0px;
  }
  .img-icon{
   width: 30px;
    cursor: pointer;
  }
  .blue{
    color: #00B8EE;
  }
  .red{
    color: crimson;
  }
  .top-btn{
    float: right;
    margin: 10px 0;
  }
  .top-btn .top-ul .top-li{
    list-style: none;
    float: left;
    margin-right: 15px;
  }
  .top-btn .top-ul .top-li span:hover{
    color: #39b49b;
    cursor: pointer;
  }
  .apply-epart:hover{
      cursor: pointer;
  }
  .dialog-title span{
    width: 100%;
    text-align: left;
    font-size: 0.16rem;
    border-bottom: 1px solid #eaeaea;
  }
  .dialog>>>.el-dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%,-50%);
  }
  .detail-dialog>>>.el-dialog{
    height: 600px;
  }
  .img-dialog>>>.el-dialog{
    height: 650px;
  }
  .hidden{
    display: none;
  }
  .dialog-title span {
    width: 100%;
    text-align: left;
    font-size: 0.16rem;
    border-bottom: 1px solid #eaeaea;
  }
  /*修改图片预览内部样式*/
  .img-view >>> .viewer-backdrop{
    background-color: #ffffff;
  }
  .img-view >>> .viewer-backdrop .viewer-footer .viewer-navbar{
    background-color: #ffffff;
  }
  .img-view >>> .viewer-backdrop .viewer-footer .viewer-navbar ul{
    width: 180px;
  }
  .img-view >>> .viewer-backdrop .viewer-footer .viewer-navbar ul li{
    width: 50px;
  }
  .select-input >>> .el-input--suffix{
    width: 75px!important;
  }
  .btn-load{
    text-align: right;
  }
</style>
