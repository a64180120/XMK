<template>
  <section>
    <handle-btn title="审批中心在线工作平台" @refresh="refresh()" :auditBtn="true">
      <div class="top" >
         <ul v-if="isApproval">
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
             <span>审批并生成支付单</span>
           </li>
         </ul>
        <ul v-else>
          <li @click="creatPayList()">
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
                <el-input size="mini" v-model="searchForm.OrgName" @focus="openOrg()" @change="changeInput()" style="width: 120px" placeholder="全部"></el-input>
              </el-form-item>
              <el-form-item label="停留时长" class="top-form-left">
                <el-input size="mini" v-model="searchForm.StopHour" style="width: 200px" placeholder="请输入停留时长" @change="changeInput()">
                  <el-select v-model="searchForm.Operator" slot="prepend" placeholder="类型" class="select-input" style="width: 75px" @change="changeInput('operator')">
                    <el-option label="等于" value="1"></el-option>
                    <el-option label="大于" value="2"></el-option>
                    <el-option label="小于" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="申报日期" class="top-form-left">
                <el-date-picker v-model="searchForm.BDate" @change="changeInput()" style="width: 240px" size="mini" type="daterange" start-placeholder="开始时间" end-placeholder="开始时间"></el-date-picker>
              </el-form-item>
              <el-form-item label="" class="top-form-right">
                <search-input @btnClick="search()" placeholder="申请单名称/编号" v-model="searchForm.BName"></search-input>
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
            <table v-if="tableData.length !== 0">
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
              <tr :class="{trActive:check[idx]}" v-for="(item,idx) in tableData"  :key="idx">
                <td  @click.self="handleCheckBoxCellClick(item,idx)">
                  <el-checkbox v-model="check[idx]"  >{{idx+1}}</el-checkbox>
                </td>
                <td @click.stop="handleCellClick(item,idx)" class="apply-epart cell-click">
                  {{item.OrgName}}
                </td>
                <td>
                  {{item.BNum}}
                </td>
                <td>
                  {{item.BName}}
                </td>
                <td style="text-align: right">
                  {{item.BAccount | NumFormat}}
                </td>
                <td>
                  {{item.BDate}}
                </td>
                <td>
                  <span class="cell-click" v-if="item.BStatus ==0 " @click.stop="openAuditfollow(item,idx)">未审批</span>
                  <span class="cell-click" v-if="item.BStatus ==1 " @click.stop="openAuditfollow(item,idx)">待审批</span>
                  <span class="cell-click" v-if="item.BStatus ==2 " @click.stop="openAuditfollow(item,idx)">未通过</span>
                  <span class="cell-click" v-if="item.BStatus ==9 " @click.stop="openAuditfollow(item,idx)">审批通过</span>
                </td>
                <td>
                  <div>
                    <el-tooltip v-if="item.BStatus == 0" class="" effect="dark" :content="'已经停留'+item.StopHour +'小时'" placement="bottom-start">
                      <img  src="../../assets/images/sj2.png" class="img-icon">
                    </el-tooltip>
                    <el-tooltip v-else-if="item.BStatus == 1"  class="" effect="dark" :content="'已经停留'+item.StopHour +'小时'" placement="bottom-start">
                      <img  src="../../assets/images/sj2.png" class="img-icon">
                    </el-tooltip>
                    <el-tooltip v-else-if="item.BStatus == 2" class="" effect="dark" :content="'已经停留'+item.StopHour +'小时'" placement="bottom-start">
                      <img  src="../../assets/images/sj1.png" class="img-icon">
                    </el-tooltip>
                    <el-tooltip v-else-if="item.BStatus == 10" class="" effect="dark" :content="'已经停留'+item.StopHour +'小时'" placement="bottom-start">
                      <img  src="../../assets/images/sj1.png" class="img-icon">
                    </el-tooltip>
                  </div>
                </td>
                <td>
                  <p class="BDescribe">
                    {{item.BDescribe}}
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
            <div v-else style="width: 100%;margin-top: 60px;text-align: center">
              <span style="">暂无数据</span>
            </div>
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
                <col width="13%">
                <col width="10%">
                <col width="25%">
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
            <table v-if="tableData.length !== 0">
              <colgroup>
                <col width="5%">
                <col width="10%">
                <col width="10%">
                <col width="17%">
                <col width="10%">
                <col width="13%">
                <col width="10%">
                <col width="25%">
              </colgroup>
              <tbody>
              <tr :class="{trActive:check[idx]}" v-for="(item,idx) in tableData"  :key="idx" >
                <td @click.self="handleCheckBoxCellClick(item,idx)">
                  <el-checkbox v-model="check[idx]"  @click="handleCheckBoxCellClick(item,idx)">{{idx+1}}</el-checkbox>
                </td>
                <td @click="handleCellClick(item,idx)" class="apply-epart cell-click">
                  {{item.OrgName}}
                </td>
                <td>
                  {{item.OrgCode}}
                </td>
                <td>
                  {{item.BName}}
                </td>
                <td style="text-align: right">
                  {{item.BAccount | NumFormat}}
                </td>
                <td>
                  {{item.BDate}}
                </td>
                <td>
                  <span class="cell-click" v-if="item.BStatus ==0 " @click.stop="openAuditfollow(item,idx)">未审批</span>
                  <span class="cell-click" v-if="item.BStatus ==1 " @click.stop="openAuditfollow(item,idx)">审批中</span>
                  <span class="cell-click" v-if="item.BStatus ==2 " @click.stop="openAuditfollow(item,idx)">未通过</span>
                  <span class="cell-click" v-if="item.BStatus ==9 " @click.stop="openAuditfollow(item,idx)">审批通过</span>
                </td>
                <td>
                  <p class="BDescribe">
                    {{item.BDescribe}}
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
            <div v-else style="width: 100%;margin-top: 60px;text-align: center">
              <span style="">暂无数据</span>
            </div>
          </div>
        </div>
        <div class="pageArea">
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="page.pageSizes"
            layout="total,sizes,prev,pager,next,jumper"
            :total="page.total"></el-pagination>
        </div>
      </div>
      <!--详情弹框-->
      <el-dialog class="dialog detail-dialog"  @close="closeDetailDialog" :visible.sync="detailDialog" :close-on-click-modal="false" width="90%">
        <div slot="title" class="dialog-title">
          <span style="float: left">查看申请</span>
        </div>
          <applybill @showImg="showImg" :applyNum="applyNum"
                     @delete="handleDelete">
            <div slot="btn-group" >
              <el-button v-if="isApproval" class="btn" size="mini" @click="aprovalItem">审批</el-button>
              <el-button  v-if="isApproval" class="btn" size="mini" style="width: 90px" @click="creatPayItem">生成支付单</el-button>

              <!--              <el-button class="btn" size="mini">打印</el-button>-->
            </div>
          </applybill>
      </el-dialog>
      <!--图片预览-->
      <el-dialog class="dialog img-dialog" :visible.sync="imgDialog" :close-on-click-modal="false" width="40%">
        <div slot="title" class="dialog-title">
          <span style="float: left">查看附件</span>
        </div>
        <div class="btn-load">
          <el-button class="btn">下载</el-button>
        </div>
        <img-view v-if="imgDialog"></img-view>
      </el-dialog>
      <!--审批弹框-->
      <approval-dialog ref="approvalDialog" :rowData="selection" @refresh="loadData" @dialogFlow="childrenAuditfollow" @subSuc="plSubSuc()"></approval-dialog>
      <!--生成支付单弹框-->
      <paylist-dialog ref="paylistDialog" :rowData="selection" @refresh="loadData" :isApproval="Approval" @dialogFlow="childrenAuditfollow" @subSuc="plSubSuc()"></paylist-dialog>
      <!--查看审批流程-->
      <auditfollow :visible.sync="visible" :auditMsg="auditMsg"></auditfollow>
      <!--组织树-->
      <orgtree :data="orgtreeData" :checkedOrg="checkedOrg" :visible.sync="orgType" @confirm="getOrg"></orgtree>
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
  import {mapState} from 'vuex'

  export default {
    name: "index",
    components: {
      PaylistDialog,
      ImgView, Orgtree, Applybill, Auditfollow, ApprovalDialog, SearchInput, HandleBtn, FundDetail},
    data(){
      return{

        BType:"001", //单据类型 资金拨付 001  申请单 002
        searchForm:{
          BName:'',//申报单名称或编号查询内容
          BDate:[],//申报时间段
          Operator:"",//停留时长的判断条件(1:等于,2:大于,3:小于)
          StopHour:'',//停留时长
          OrgCode:"",//组织编码
          OrgName:'',//组织名称
          OrgPhId:''
        },
        checkedAll:false, //是否全选
        IsIndeterminate:false, //列表中是否有选中的值并且不是全选
        check:[],//列表所有选中状态
        selection:[],//选中后的值
        auditMsg:[],//审批流程 数据

        orgtreeData:[], //工会组织列表
        checkedOrg:[],//设置组织树默认选中项
        orgType:false,//控制组织树的展示与隐藏
        approvalData:{},
        openApprovalDialog:false,
        checked:'',
        tableData:[],//模拟表格数据
        page:{
          currentPage:1,//当前页
          pageSizes:[20,30,50,100], //每页显示多少条
          total:0,//总条数
          pageSize:20,//当前每页显示多少条
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
        isApproval:true,
        applyNum:"",//当前查看申请单的编号
        SplxPhid:"",
        Approval:Boolean
      }
    },

    mounted() {
      this.selection = []
      this.isApproval = eval(this.$route.query.approval)
      this.SplxPhid = this.$route.query.SplxPhid
      // this.testData()
      this.loadData()
      this.getOrgList()
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
    computed:{
      ...mapState({
        OrgCode:state =>state.user.orgcode,
        UserId:state =>state.user.userid,
        Year:state =>state.user.year,
        Orgid:state =>state.user.orgid,
      })
    },
    methods:{
      //拉取列表数据
      loadData(){

        let data = {
          Uid:this.UserId,
          OrgCode:this.searchForm.OrgCode == ''?this.OrgCode:this.searchForm.OrgCode,
          Orgid:this.searchForm.OrgPhId==''?this.Orgid:this.searchForm.OrgPhId,
          Year:this.Year,
          PageIndex:this.page.currentPage,
          PageSize:this.page.pageSize,
          BType:this.BType,
          BName:this.searchForm.BName,
          Operator:this.searchForm.Operator,
          StopHour:this.searchForm.StopHour,
          BStartDate:this.searchForm.BDate === null  ? '':this.searchForm.BDate[0],
          BEndTime:this.searchForm.BDate === null ? '':this.searchForm.BDate[1],
          Splx_Phid:this.SplxPhid,
        }

        let that = this
        if(eval(this.isApproval)){
          this.getAxios('/GAppvalRecord/GetUnDoRecordList',data).then(res=>{
            if (res && res.Status === "success") {
              that.tableData = res.Data
              that.page.total = res.Total
              // this.page.total = 100
              for (let i in res.Data) {
                that.check.push(false)
              }
            }else {
              this.$msgBox.show(res.Msg)
            }
            this.check = this.check.map((item,index,array)=> false)
          }).catch(err=>{
            that.$msgBox.show("数据获取异常")
            this.check = this.check.map((item,index,array)=> false)
          })
        }else {
          this.getAxios('/GAppvalRecord/GetDoneRecordList',data).then(res=>{
            if (res && res.Status === "success") {
              that.tableData = res.Data
              that.page.total = res.Total
              // this.page.total = 100
              for (let i in res.Data) {
                that.check.push(false)
              }
            }else {
              this.$msgBox.show(res.Msg)
            }
            this.check = this.check.map((item,index,array)=> false)
          }).catch(err=>{
            that.$msgBox.show("数据获取异常")
            this.check = this.check.map((item,index,array)=> false)
          })
        }
      },
      //拉取组织树
      getOrgList(){
        this.getAxios('GQT/CorrespondenceSettingsApi/GetALLOrgTree').then(res=>{
          this.orgtreeData=res.Record;
        }).catch(err=>{
        })
      },
      //搜索框事件
      search(){
        this.page.pageSize=20;
        this.page.currentPage = 1;
        this.loadData()
      },
      //当前单元格点击事件
      handleCellClick(row,idx){
        // this.$refs.fundDetail.changeDialog()
        this.applyNum = row.RefbillPhid
        this.detailDialog = true
        this.selection = []
        this.selection[0] = row
      },
      //点击checkBox单元格事件
      handleCheckBoxCellClick(row,idx){
        for (let key in this.check){
          if (idx === parseInt(key)){
            if(this.check[key] === true){
              this.$set(this.check,key,false)
            }else {
              this.$set(this.check,key,true)
            }
          }
        }
      },
      //当前页显示多少条数据
      handleSizeChange(val){
        this.page.pageSize = val
        this.loadData()
      },
      //调到第几页
      handleCurrentChange(val){
        this.page.currentPage = val
        this.loadData()
      },
      //打开审批弹框
      aprovalItem(){
        if (this.selection.length ===0 ){
            this.$msgBox.show('请选择需要审批的单据')
        }else {
          this.appDialog.title = '查看'
          this.appDialog.btnGroup.cancelName = '取消'
          this.appDialog.btnGroup.onfirmName = '确认'
          this.$refs.approvalDialog.changeDialog()
        }
      },
      //生成支付单弹框
      creatPayItem(){
        if (this.selection.length ===0 ){
          this.$msgBox.show('请选择需要生成支付单的单据')
        }else{
          if (this.isApproval) {
            this.$refs.paylistDialog.isApproval = true
          }else {
            this.$refs.paylistDialog.isApproval = false
          }
          this.$refs.paylistDialog.changeDialog()
        }
      },
      //生成审批完成的支付单
      creatPayList(){
        if (this.selection.length ===0 ){
          this.$msgBox.show('请选择需要生成支付单的单据')
        }else {
          let data = {
            RefbillPhidList:[]
          }
          for (let item of this.selection){
            data.RefbillPhidList.push(item.RefbillPhid)
          }
          console.log(data)
          let that= this
          this.postAxios('/GAppvalRecord/PostAddPayMents',data).then(res=>{
            if (res && res.Status =='success') {
              this.$msgBox.show({
                content:'生成支付单成功',
                fn:function () {

                }
              })
            }else {
              this.$msgBox.error({
                content:res.Msg,
                fn:function () {

                }
              })
            }
          }).catch(err=>{
            this.$msgBox.error('请求失败')
          })
        }
      },
      //子组件审批流查看
      childrenAuditfollow(item,idx){
        this.visible = true
        let data = {
          RefbillPhid:this.selection[0].RefbillPhid,
          FBilltype:this.BType
        }
        this.getAuditfollow(data)
      },
      //审批流查看
      openAuditfollow(item,idx){
        this.visible = true
        let data = {
          RefbillPhid:item.RefbillPhid,
          FBilltype:this.BType
        }
        this.getAuditfollow(data)
      },
      //拉去审批流数据查看
      getAuditfollow(data){
        let that= this
        this.getAxios("/GAppvalRecord/GetAppvalRecordList",data).then(res =>{
          console.log(res)
          if (res && res.Status === "success") {
            that.auditMsg = res.Data
            console.log(res.Data)
          }else {
            that.$msgBox.show(res.Msg)
          }
        }).catch(err =>{
          that.$msgBox.show("数据获取异常")
        })
      },
      //确认按钮
      confirmOrg(){
        this.searchForm.OrgLabel = this.orgName.label
        this.orgType = false
      },
      //获取组织树
      getOrg(e){
        this.searchForm.OrgName = e[0].OName
        this.searchForm.OrgCode = e[0].OCode
        console.log(this.searchForm)
        this.searchForm.OrgPhId =e[0].PhId
        this.loadData()
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
        this.detailDialog = false
      },
      //输入框值改变
      changeInput(e){
        this.page.pageSize=20;
        this.page.currentPage = 1;
        if(e ==='operator'){
          if(this.searchForm.StopHour !== ''){
            this.loadData()
            return
          }else {
            return;
          }
        }
       this.loadData()
      },
      // 关闭详情弹框事件
      closeDetailDialog(){

      },
      //删除
      handleDelete(){

      },
      //刷新
      refresh(){
        this.searchForm.BName = '';
        this.searchForm.BDate = [];
        this.searchForm.Operator = [];
        this.searchForm.StopHour = '';
        this.searchForm.OrgName = '';
        this.page.currentPage = 1;
        this.page.pageSize = 20;
        this.loadData()
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
    width: 115px;
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
  .cell-click{
    color: #409EFF;
    cursor: pointer;
    text-decoration: underline;
  }
  .img-icon{
   width: 30px;
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
  /*.dialog>>>.el-dialog{*/
  /*  position: absolute;*/
  /*  top: 50%;*/
  /*  left: 50%;*/
  /*  margin: 0 !important;*/
  /*  transform: translate(-50%,-50%);*/
  /*}*/
  .detail-dialog>>>.el-dialog{
    /*height: 86%;*/
    height: 600px;
  }
  .img-dialog>>>.el-dialog{
    height: 550px;
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

  .select-input >>> .el-input--suffix{
    width: 75px!important;
  }
  .btn-load{
    text-align: right;
  }
  .BDescribe{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
