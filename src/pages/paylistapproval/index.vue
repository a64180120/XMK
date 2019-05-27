<template>
  <section>
    <handle-btn title="审批中心在线工作平台">
      <div class="top" v-if="isApproval">
        <ul>
          <li @click="aprovalItem()">
            <div>
              <img src="../../assets/images/sp.png">
            </div>
            <span>审批</span>
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
                <el-select size="mini" v-model="form.depart" style="width: 120px"></el-select>
              </el-form-item>
              <el-form-item label="提留时长" class="top-form-left">
                <el-input size="mini" v-model="form.long" style="width: 150px"></el-input>
              </el-form-item>
              <el-form-item label="申报日期" class="top-form-left">
                <el-date-picker v-model="form.date" style="width: 240px" size="mini" type="daterange" start-placeholder="开始时间" end-placeholder="开始时间"></el-date-picker>
              </el-form-item>
              <el-form-item label="" class="top-form-right">
                <search-input @btnClick="search()"></search-input>
              </el-form-item>
            </el-form>
          </div>
          <!--未审批表格-->
          <div v-if="isApproval" class="tableHead">
            <table>
              <colgroup>
                <col width="5%">
                <col width="15%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="12%">
                <col width="8%">
                <col v-if="isApproval" width="5%">
                <col width="23%">
              </colgroup>
              <thead>
              <tr>
                <td>
                  <el-checkbox v-model="checked">序号</el-checkbox>
                </td>
                <td>
                  申报部门/单位
                </td>
                <td>
                  支付单编号
                </td>
                <td>
                  支付金额
                </td>
                <td>
                  单据类型
                </td>
                <td>
                  申请单编号
                </td>
                <td>
                  申请日期
                </td>
                <td>
                  申请状态
                </td>
                <td v-if="isApproval">停留时长</td>
                <td>申报说明</td>
              </tr>
              </thead>
            </table>
          </div>
          <div v-if="isApproval" class="tableBody">
            <table>
              <colgroup>
                <col width="5%">
                <col width="15%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="12%">
                <col width="8%">
                <col width="5%">
                <col width="23%">
              </colgroup>
              <tbody>
              <tr v-for="(item,idx) in tableData"  :key="idx">
                <td>
                  <el-checkbox v-model="checked" >{{idx}}</el-checkbox>
                </td>
                <td @click="handleRowClick(item,idx)" class="apply-epart">
                  {{item.applyDepart}}
                </td>
                <td>
                  {{item.payListCode}}
                </td>
                <td>
                  {{item.applyAmount}}
                </td>
                <td>
                  <span v-if="item.payListType == 1">资金拨付单</span>
                </td>
                <td>
                  {{item.applyCode}}
                </td>
                <td>
                  {{item.applyDate}}
                </td>
                <td>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==1 " @click.stop="openApproval(item,idx)">申请中</span>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==2 " @click.stop="openApproval(item,idx)">申请完成</span>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==3 " @click.stop="openApproval(item,idx)">申请完成</span>
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
                <col width="15%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="12%">
                <col width="8%">
                <col width="28%">
              </colgroup>
              <thead>
              <tr>
                <td>
                  <el-checkbox v-model="checked">序号</el-checkbox>
                </td>
                <td>
                  申报部门/单位
                </td>
                <td>
                  支付单编号
                </td>
                <td>
                  支付金额
                </td>
                <td>
                  单据类型
                </td>
                <td>
                  申请单编号
                </td>
                <td>
                  申请日期
                </td>
                <td>
                  申请状态
                </td>
                <td>申报说明</td>
              </tr>
              </thead>
            </table>
          </div>
          <div v-if="!isApproval" class="tableBody">
            <table>
              <colgroup>
                <col width="5%">
                <col width="15%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="12%">
                <col width="8%">
                <col width="28%">
              </colgroup>
              <tbody>
              <tr v-for="(item,idx) in tableData"  :key="idx">
                <td>
                  <el-checkbox v-model="checked" >{{idx}}</el-checkbox>
                </td>
                <td @click="handleRowClick(item,idx)" class="apply-epart">
                  {{item.applyDepart}}
                </td>
                <td>
                  {{item.payListCode}}
                </td>
                <td>
                  {{item.applyAmount}}
                </td>
                <td>
                  <span v-if="item.payListType == 1">资金拨付单</span>
                </td>
                <td>
                  {{item.applyCode}}
                </td>
                <td>
                  {{item.applyDate}}
                </td>
                <td>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==1 " @click.stop="openApproval(item,idx)">申请中</span>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==2 " @click.stop="openApproval(item,idx)">申请完成</span>
                  <span style="cursor: pointer" v-if="item.approvalStutas ==3 " @click.stop="openApproval(item,idx)">申请完成</span>
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

    </div>
    <!--审批-->
    <approval-dialog title="审批" ref="approval"></approval-dialog>
    <!--查看审批流程-->
    <auditfollow :visible="visible" @update:visible="closeAuditFollow()"></auditfollow>
  </section>
</template>

<script>
  import HandleBtn from "../../components/topNav/topHandle";
  import SearchInput from "../../components/searchInput/searchInput";
  import Auditfollow from "../../components/auditFollow/auditfollow";
  import Applybill from "../../components/applyBill/applybill";
  import ApprovalDialog from "../payfundapproval/approvalDialog";
  export default {
    name: "index",
    components: {ApprovalDialog, Applybill, Auditfollow, SearchInput, HandleBtn},
    data(){
      return{
        openDetailDialog:false,
        detailData:{
        },
        approvalData:{
        },
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
          total:200//总条数
        },//分页
        visible:false,
        appDialog:{
          title:'',
          btnGroup: {
            cancelName:"",
            onfirmName:""
          }
        },//审核弹框
        openDialog:false,//打开详情弹框
        openInnerDialog:false,//打开详情内层弹框

        //判断显示为已审批页面还是未审批页面
        isApproval:""
      }
    },
    mounted() {
      this.isApproval = this.$route.query.approval
      console.log(this.isApproval)
      let data1 = {
        applyDepart:'财务与资产部',
        applyCode:'201904180004',
        payListCode:'201904180001',
        applyAmount:'4,567.90',
        payListType:"1",
        applyDate:'2019-04-17',
        approvalStutas:'1'
      };
      let data2 = {
        applyDepart:'杭州总工会财务与资产部',
        applyCode:'201904180004',
        payListCode:'201904180001',
        applyAmount:'4,567.90',
        payListType:"1",
        applyDate:'2019-04-17',
        approvalStutas:'2'
      };
      let data3 = {
        applyDepart:'财务与资产管理部',
        applyCode:'201904180004',
        payListCode:'201904180001',
        applyAmount:'4,567.90',
        payListType:"1",
        applyDate:'2019-04-17',
        approvalStutas:'3'
      };
      for (let i = 0;i<20;i++){
        if(i%4 == 1){
          this.tableData[i] = data1
        }else if (i%4 == 2) {
          this.tableData[i] = data2
        } else {
          this.tableData[i] = data3
        }
      }
    },
    watch:{
      checked(val,oldval){
        console.log(val)
      }
    },
    methods:{
      //搜索框事件
      search(val){

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
        this.$refs.approval.changeDialog()
        this.appDialog.title = '查看'
        this.appDialog.btnGroup.cancelName = '取消'
        this.appDialog.btnGroup.onfirmName = '确认'
      },
      //生成支付单弹框
      creatPayItem(){
        this.appDialog.title = '审批并生成支付单'
        this.appDialog.btnGroup.cancelName = '取消'
        this.appDialog.btnGroup.onfirmName = '生成支付单'
      },
      closeAuditFollow(){
        this.visible = false
      },
      openAuditfollow(){
        this.visible = true
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
  .detail-dialog>>>.el-dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%,-50%);
    height: 600px;
  }
  .hidden{
    display: none;
  }
</style>
