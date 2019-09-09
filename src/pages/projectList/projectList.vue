<template>
  <section>
    <top-handle title="项目管理在线工作平台"
                type="swatchBtn"
                @refresh="refresh()" @swatchList="swatchTable">
      <div class="top">
        <ul>
          <li class="handle"
              @click="sumTablePrint()">
            <div>
              <img src="@/assets/images/dy.png">
            </div>
            <span>汇总表打印</span>
          </li>
        </ul>

      </div>
    </top-handle>

    <div>
      <div class="container content-body" style="overflow: auto" :style="{minHeight:formAreaHeight}">
        <div class="formArea">
          <!--搜索栏-->
          <div class="btnArea"
               style="margin-bottom: 15px">
            <el-form :inline="true">
              <el-form-item label="单位：">
                <el-select v-model="formList.year"
                           @change="swatchUnit()"
                           size="mini">
                  <el-option value="2"
                             label="万元">万元</el-option>
                  <el-option value="1"
                             label="元">元</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支出类别：">
                <el-select v-model="formList.payOutType"
                           size="mini"
                           @change="query()">
                  <el-option value="0"
                             label="全部"></el-option>
                  <el-option v-for="(item,idx) in payOutType"
                             :key="idx"
                             :value="item.Dm"
                             :label="item.Mc"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批状态：">
                <el-select v-model="formList.approvalStatus"
                           size="mini"
                           @change="query()">
                  <el-option value="0"
                             label="全部"></el-option>
                  <el-option value="1"
                             label="待上报">待上报</el-option>
                  <el-option value="2"
                             label="审批中">审批中</el-option>
                  <el-option value="3"
                             label="审批通过">审批通过</el-option>
                  <el-option value="4"
                             label="未通过">未通过</el-option>
                </el-select>

              </el-form-item>
              <el-form-item style="float: right">
                <el-input size="mini" v-model="formList.FProjName" clearable class="searchIpt"></el-input>
                <el-button size="mini" @click="searchInput()" type="primary" class="searchBtn">搜索</el-button>
                <el-popover palcement="bottom" width="500" trigger="click" v-model="popvisiable">
                  <div class="seniorSearch">
                    <div>
                      <span>高级查询</span>
                      <span class="el-icon-close closeSenior" @click="popvisiable=false"></span>
                    </div>
                    <table>
                      <colgroup>
                        <col width="15%">
                        <col width="15%">
                        <col width="5%">
                        <col width="15%">
                        <col width="15%">
                        <col width="35%">
                      </colgroup>
                      <tr>
                        <td>项目名称</td>
                        <td colspan="5"><!--<el-input size="mini"  v-model="seniorSearch.FDeclarationDept"  placeholder="请输入申报部门"></el-input>-->
                          <el-input size="mini" v-model="seniorSearch.FProjName" placeholder="请输入项目名称"></el-input>
                        </td>
                      </tr>
                      <tr>
                        <td>项目编码</td>
                        <td colspan="5"><el-input size="mini"  v-model="seniorSearch.FProjCode" placeholder="请输入项目编码"></el-input></td>
                      </tr>
                      <tr>
                        <td>申报部门</td>
                        <td colspan="3">
                          <el-select size="mini" v-model="seniorSearch.FDeclarationDept" placeholder="请选择申报部门">
                            <el-option v-for="(item,idx) in FDeclarationDeptGroup" :value="item.deptCode" :label="item.deptName"></el-option>
                          </el-select>
                        </td>
                        <td>预算部门</td>
                        <td colspan="3">
                          <el-select size="mini" v-model="seniorSearch.FBudgetDept" placeholder="请选择预算部门">
                            <el-option v-for="(item,idx) in FBudgetDeptGroup" :value="item.OCode" :label="item.OName"></el-option>
                          </el-select>
                        </td>
                      </tr>
                      <tr>
                        <td>项目金额</td>
                        <td><el-input size="mini" v-model="seniorSearch.FProjAmountBegin"></el-input></td>
                        <td>至</td>
                        <td><el-input size="mini"  v-model="seniorSearch.FProjAmountEnd"></el-input></td>
                        <td>绩效评价</td>
                        <td colspan="3">
                          <el-select size="mini" v-model="seniorSearch.FIfPerformanceAppraisal" placeholder="请选择绩效评价">
                            <el-option v-for="(item,idx) in FIfPerformanceAppraisalGroup" :key="idx" :value="item.value" :label="item.label"></el-option>
                          </el-select>
                        </td>
                      </tr>
                      <tr>
                        <!-- <td>项目级别</td>
                         <td colspan="3"><el-input size="mini" v-model="seniorSearch.PLevel" placeholder="请输入项目级别"></el-input></td>-->
                        <td>申报日期</td>
                        <td colspan="5">
                          <el-date-picker size="mini"
                                          style="width: 100%;"
                                          v-model="seniorSearch.FTime"
                                          type="daterange"
                                          range-separator="至"
                                          start-placeholder="开始日期"
                                          end-placeholder="结束日期">
                          </el-date-picker>
                        </td>
                      </tr>
                    </table>
                    <div>
                      <ul>
                        <li>
                          <el-button class="btn" size="mini" @click="seniorReset()">清空</el-button>
                        </li>
                        <li>
                          <el-button class="btn" size="mini" @click="getTableData()">搜索</el-button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <el-button type="success" size="mini" slot="reference" class="searchSer">高级</el-button>
                </el-popover>
              </el-form-item>
            </el-form>
          </div>
          <!--表格区域-->
          <div v-if="watchTable"
               class="dataTable_list">
            <div class="start"></div>
            <div class="end"></div>
            <section>
              <el-table :data="table.tableData"
                        :row-class-name="rowClassName"
                        :cell-class-name="cellClassName"
                        @select="rowSelect"
                        @select-all="rowSelectAll"
                        :header-cell-class-name="handerCellClassName"
                        @current-change=""
                        :highlight-current-row="highlightCurrentRow"
                        style="width: 100%"
                        border
                        :height="tableHeight">
                <el-table-column label="" prop="" type="selection" width="35" align="center"></el-table-column>
                <el-table-column label="" prop="" width="35" type="index" label="序号" :index="function(index) {
                  return index+1
                }" ></el-table-column>
                <el-table-column v-for="(item,idx) in table.column"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :width="item.width"
                                 :key="idx"
                                 align="center">
                  <template slot-scope="scope"
                            style="">

                    <div style="" v-if="item.other === 'function'"
                         class="table-column-height"
                         @click="cellClick(scope)"
                         :style="{textAlign:item.align}">
                      <span :style="{textAlign:item.align}"
                            class="cell-click">{{scope.row[item.prop]}}</span>
                    </div>
                    <div v-else-if="item.other === 'money'"
                         class="table-column-height"
                         :style="{textAlign:item.align}">
                      <span v-if="formList.year =='1'"
                            :style="{textAlign:item.align}">{{scope.row[item.prop] |NumFormat}}</span>
                      <span v-else
                            :style="{textAlign:item.align}">{{scope.row[item.prop] / 10000|NumFormat }}</span>
                    </div>
                    <div v-else-if="item.other ==='start-end'"
                         class="table-column-height"
                         :style="{textAlign:item.align}">
                      <span>{{scope.row[item.prop1].replace('T00:00:00','')}}至</span>
                      <span>{{scope.row[item.prop2].replace('T00:00:00','')}}</span>
                    </div>
                    <div v-else-if="item.other ==='time'">
                      <span>{{scope.row[item.prop].split('T',9)[0]}}</span>
                    </div>
                    <div v-else-if="item.other ==='status-click'">
                      <span v-html="formatter(scope)"
                            @click="cellClick(scope)"
                            class="cell-click"></span>
                    </div>
                    <div v-else-if="item.other ==='status'">
                      <span v-html="formatter(scope)"
                            class=""></span>
                    </div>
                    <div v-else
                         class="table-column-height"
                         :style="{textAlign:item.align}">
                      <span :style="{textAlign:item.align}">{{scope.row[item.prop]}}</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </section>
          </div>
          <div v-else
               class="table-main">
            <section class="itemTable_proBuildProject" :style="{paddingRight:paddRight ,height:tableHeight}">
              <el-table :data="table.tableData"
                        :row-class-name="rowClassName"
                        :cell-class-name="itemCellClassName"
                        @select="rowSelect"
                        @select-all="rowSelectAll"
                        :header-cell-class-name="itemHanderCellClassName"
                        :highlight-current-row="highlightCurrentRow"
                        style="overflow: visible;position: static;padding-top: 50px">
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column label="序号"
                                 type="index"
                                 :index="function(index) {
                                     return index +1
                                 }" width="40"></el-table-column>
                <el-table-column prop="item"
                                 align="center"
                                 label="项目立项项目信息">
                  <template slot-scope="scope">
                    <div>
                      <div class="top-content">
                        <div class="top-left">项目编码：<span class="top-left-code" @click="showDetail(scope)">{{scope.row.FProjCode}}</span></div>
                        <div class="top-center">项目名称：
                          <el-tooltip :content="scope.row.FProjName">
                            <span style="font-family: 宋体">{{scope.row.FProjName}}</span>
                          </el-tooltip>
                        </div>
                        <div class="top-right">
                          <div class="card"
                               v-if="formList.year == '1'">{{scope.row.FProjAmount | NumFormat}}元</div>
                          <div class="card"
                               v-if="formList.year == '2'">{{(scope.row.FProjAmount/10000).toLocaleString()}}万元</div>
                        </div>
                      </div>
                      <div class="context">
                        <ul>
                          <li>
                            <span @click="showDetail(scope.row)">项目属性：<el-tooltip :content="scope.row.FProjAttr_EXName">
                                <span>{{scope.row.FProjAttr_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>存续期限：<el-tooltip :content="scope.row.FDuration_EXName">
                                <span>{{scope.row.FDuration_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>项目级别：<el-tooltip :content="scope.row.FLevel_EXName">
                                <span>{{scope.row.FLevel_EXName}}</span>
                              </el-tooltip>
                            </span>
                          </li>
                          <li>
                            <span>起止日期：<el-tooltip :content="scope.row.FStartDate.replace('T00:00:00','')+'至'+scope.row.FEndDate.replace('T00:00:00','')">
                                  <span>{{scope.row.FStartDate.replace('T00:00:00','')}}至{{scope.row.FEndDate.replace('T00:00:00','')}}</span>
                              </el-tooltip>
                            </span>
                          </li>
                          <li>
                            <span>支出类别：<el-tooltip :content="scope.row.FExpenseCategory_EXName">
                                <span>{{scope.row.FExpenseCategory_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>效绩评价：<el-tooltip :content="scope.row.FIfPerformanceAppraisal ===1?'否':'是'">
                                <span>{{scope.row.FIfPerformanceAppraisal ===1?'否':'是'}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>申报部门：<el-tooltip :content="scope.row.FDeclarationDept_EXName">
                                <span>{{scope.row.FDeclarationDept_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>预算部门：<el-tooltip :content="scope.row.FBudgetDept_EXName">
                                <span>{{scope.row.FBudgetDept_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>申报日期：<el-tooltip :content="scope.row.FDateofDeclaration.split('T',9)[0]">
                                <span>{{scope.row.FDateofDeclaration.split('T',9)[0]}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>申报进度：<span v-if="scope.row.FType+scope.row.FVerNo ==='c0001'">
                              <el-tooltip content="年初新增">
                                <span>年初新增</span>
                              </el-tooltip>
                            </span>
                              <span v-else-if="scope.row.FType+scope.row.FVerNo ==='c0002'">
                                <el-tooltip content="年中调整">
                                    <span>年中调整</span>
                                 </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FType+scope.row.FVerNo ==='z0001'">
                                  <el-tooltip content="年中新增">
                                    <span>年中新增</span>
                                 </el-tooltip>
                              </span>
                              <span v-else>无</span>
                            </span>
                          </li>
                          <li>
                            <span>项目状态：<span v-if="scope.row.FProjStatus ===1">
                              <el-tooltip content="预立项">
                                <span>预立项</span>
                              </el-tooltip>
                            </span>
                              <span v-else-if="scope.row.FProjStatus ===2">
                                <el-tooltip content="项目立项">
                                   <span>项目立项</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===3">
                                <el-tooltip content="项目执行">
                                   <span>项目执行</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===4">
                                <el-tooltip content="项目调整">
                                   <span>项目调整</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===5">
                                <el-tooltip content="项目暂停">
                                   <span>项目暂停</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===6">
                                <el-tooltip content="项目终止">
                                   <span>项目终止</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===7">
                                  <el-tooltip content="项目关闭">
                                   <span>项目关闭</span>
                                </el-tooltip>
                              </span>
                              <span v-else>无</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="status"
                                 width="180"
                                 label="审批状态"
                                 align="center">
                  <template slot-scope="scope">
                    <div class="status-row">
                      <div class="status-titile">
                        <span v-if="scope.row.FApproveStatus ==1">待审批</span>
                        <span v-if="scope.row.FApproveStatus ==2">审批中</span>
                        <span v-if="scope.row.FApproveStatus ==3">审批通过</span>
                        <span v-if="scope.row.FApproveStatus ==4">已退回</span>
                        <span v-if="scope.row.FApproveStatus ==5">暂存</span>
                        <span v-if="scope.row.FProjStatus ===1">(预立项)</span>
                        <span v-if="scope.row.FProjStatus ===2">(项目立项)</span>
                        <span v-if="scope.row.FProjStatus ===3">(项目执行)</span>
                        <span v-if="scope.row.FProjStatus ===4">(项目调整)</span>
                        <span v-if="scope.row.FProjStatus ===5">(项目暂停)</span>
                        <span v-if="scope.row.FProjStatus ===6">(项目终止)</span>
                        <span v-if="scope.row.FProjStatus ===7">(项目关闭)</span>
                      </div>
                      <div class="status-context" @click="getAppvalProcList(scope.row)">
                        <span v-if="scope.row.FApproveStatus ==1">待审批</span>
                        <span v-if="scope.row.FApproveStatus ==2">审批中</span>
                        <span v-if="scope.row.FApproveStatus ==3">审批通过</span>
                        <span v-if="scope.row.FApproveStatus ==4">已退回</span>
                        <span v-if="scope.row.FApproveStatus ==5">暂存</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </section>
          </div>
        </div>
        <div style="position: absolute;bottom: 10px;right: 30px">
          <el-pagination @size-change="handerSizeChange"
                         @current-change="handerCurrentChange"
                         :curent-page="page.currentPage"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         layout="total,sizes,prev,pager,next,jumper"
                         :total="page.total"></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="itemlDialog"
               width="50%"
               :close-on-click-modal="false"
               class="applyDetailDialog">
      <div slot="title"
           class="applyDetailTitle"
           style="text-align: left;border-bottom: 1px solid #eaeaea">
        <span>申报表打印</span>
      </div>
      <item-print :data="itemDetail"></item-print>
    </el-dialog>
    <auditfollow :visible.sync="openfollow"></auditfollow>

    <!--查看审批流程-->
    <auditfollow :visible.sync="auditDialog"
                 auditType="005"
                 :auditMsg="auditMsg"></auditfollow>
    <!--汇总表打印-->
    <sum-tab-print ref="sumTabPrint" :data="sumtabData" :totalAmount="totalFProjAmount"></sum-tab-print>

  </section>
</template>

<script>
  import TopHandle from "../../components/topNav/topHandle";
  import DataTable from "../../components/dataTable/dataTable";
  import ItemTable from "../../components/itemTable/itemTable";
  import SearchInput from "../../components/searchInput/searchInput";
  import Prerojectnewproject from "../../components/preProjectDialog/index";
  import ItemPrint from "../../components/preProjectDialog/itemPrint";
  import Auditfollow from "../../components/auditFollow/auditfollow";
  import { mapState } from 'vuex'

  import SumTabPrint from "../preproject/component/sumTabPrint";
  export default {
    name: "projectBuild",
    components: {SumTabPrint,Auditfollow, ItemPrint, Prerojectnewproject, SearchInput, ItemTable, DataTable, TopHandle },
    data () {
      let that = this
      return {
        WorkFlow:0,//是否启用审批流
        table: {
          tableData: [],
          column: [
            {
              prop: 'FProjCode',
              label: '项目编码',
              align: 'center',
              width:165,
              other: 'function',
              fn: function (scope) {
                that.showDetail(scope)
              }
            }, {
              prop: 'FProjName',
              label: '项目名称',
              align: 'center',
              width:300,

            },
            {
              prop: 'FProjAmount',
              label: '项目金额(元)',
              width: 160,
              other: 'money',
              align: "right"
            },
            {
              prop: 'FDeclarationDept_EXName',
              label: '申报部门',
              width:160
            }, {
              prop: 'FBudgetDept_EXName',
              label: '预算部门',
              width:160
            },
            {
              prop: 'FExpenseCategory_EXName',
              label: '支出类别',
              align: 'center',
              width:180
            }, {
              prop1: 'FStartDate',
              prop2: 'FEndDate',
              label: '起止日期',
              align: 'center',
              width: 300,
              other: "start-end"
            }, {
              prop: 'FDateofDeclaration',
              label: '申报日期',
              align: 'center',
              other: 'time',
              width: 160,
            }, {
              prop: 'FType',
              label: '申报进度',
              align: 'center',
              other: 'status',
              width: 160,
              format:function (scope) {
                if (scope.row.FType+scope.row.FVerNo ==='c0001') {
                  return '年初新增'
                } else if (scope.row.FType+scope.row.FVerNo ==='c0002'){
                  return '年中调整'
                } else if (scope.row.FType+scope.row.FVerNo ==='z0001'){
                  return '年中新增'
                } else {
                  return "无"
                }
              }
            },  {
              prop: 'FProjStatus',
              label: '项目状态',
              align: 'center',
              other: 'status',
              width: 160,
              format:function (scope) {
                let MC = '';
                if (scope.row.FProjStatus ===1) {
                  MC = '预立项'
                } else if (scope.row.FProjStatus ===2) {
                  MC = '项目立项'
                } else if (scope.row.FProjStatus ===3) {
                  MC = '项目执行'
                } else if (scope.row.FProjStatus ===4) {
                  MC = '项目调整'
                } else if (scope.row.FProjStatus ===5) {
                  MC = '项目暂停'
                } else if (scope.row.FProjStatus ===6) {
                  MC = '项目终止'
                } else if (scope.row.FProjStatus ===7) {
                  MC = '项目关闭'
                }
                return MC
              }
            }, {
              prop: 'FApproveStatus',
              label: '审批状态',
              width: 160,
              align: 'center',
              other: 'status-click',
              format: function (scope) {
                if (that.WorkFlow === 1){
                  if (scope.row.FApproveStatus == 1) {
                    return '<span>待送审</span>'
                  } else if (scope.row.FApproveStatus == 2) {
                    return '<span>审批中</span>'
                  } else if (scope.row.FApproveStatus == 3) {
                    return '<span>审批成功</span>'
                  } else if (scope.row.FApproveStatus == 4) {
                    return '<span>退回</span>'
                  }else if (scope.row.FApproveStatus == 5) {
                    return '<span>暂存</span>'
                  }
                }else{
                  if (scope.row.FApproveStatus == 1) {
                    return '<span>部门申报</span>'
                  } else if (scope.row.FApproveStatus == 2) {
                    return '<span>汇总审批</span>'
                  } else if (scope.row.FApproveStatus == 3) {
                    return '<span>已审批</span>'
                  } else if (scope.row.FApproveStatus == 4) {
                    return '<span>待执行</span>'
                  }else if (scope.row.FApproveStatus == 5) {
                    return '<span>暂存</span>'
                  }
                }

              },
              fn: function (scope) {
                console.log(scope)

                that.getAppvalProcList(scope.row)
              }
            }],
          selection: true
        },
        highlightCurrentRow: false,
        rowNumber: 4,
        table1: {
          tableData: []
        },
        watchTable: false,
        formList: {
          year: "1",
          payOutType: '0',
          approvalStatus: '0',
          FProjName: ''
        },

        popvisiable:"",
        seniorSearch:{//高级筛选
          FProjName:'',//项目名称
          FProjCode:'',//项目编码
          FDeclarationDept:'',//申报部门
          FBudgetDept:'',//预算部门
          FProjAmountBegin:'',//金额开始
          FProjAmountEnd:'',//金额结束
          FIfPerformanceAppraisal:'',//是否绩效评价
          FTime:[],//起止日期
        },
        FBudgetDeptGroup:[],//预算部门下拉项
        FDeclarationDeptGroup:[],//申报部门下拉项
        FIfPerformanceAppraisalGroup:[{
          value:1,
          label:"是"
        },{
          value:2,
          label:"否"
        }],

        search: '',
        itemlDialog:false,
        budgetEditDialog: false,
        openfollow: false,
        page: {
          currentPage: 1,
          total: 0,
          pageSize: 20,
          pageSizes: [20, 30, 50, 100]
        },
        itemDetail: {},//详情单据数据
        budgetEditDetail:{},//预算修正数据
        selection: [],//单据选中项
        payOutType: [],

        //送审
        approvalDataS: {
          openDialog: false,
          data: {},
          subData: [] //审批流获取
        },

        auditMsg:[],//审批流数据
        auditDialog:false,

        paddRight:'30px',

        //汇总表打印
        //开关弹框
        sumtabDialog:false,
        //汇总数据
        sumtabData:[],
        totalFProjAmount:0,

        //表格最大高度
        tableHeight:"630px",
        formAreaHeight:'650px'
      }
    },
    computed: {
      ...mapState({
        OrgCode: state => state.user.orgcode,
        UserId: state => state.user.userid,
        Orgid: state => state.user.orgid,
        Year: state => state.user.year,
        MenuButton: state => state.user.menubutton,
        UserCode: state => state.user.usercode
      })
    },
    created () {
    },
    mounted () {
      this.getWorkFlow()
      this.getExpenseCategoryList()
      this.getTableData();

      let clientHeight = document.body.clientHeight
      console.log(clientHeight)
      if (clientHeight>900){
        this.tableHeight = '630px'
        this.formAreaHeight = '750px'
      }else if(clientHeight<900 && clientHeight>600){
        this.tableHeight = '480px'
        this.formAreaHeight = '600px'
      }
    },
    methods: {
      //获取过程是否启用工作流
      getWorkFlow(){
        let data = {
          orgCode:this.OrgCode,
          orgid:this.Orgid,
          workType:'005'
        }
        this.getAxios('/GQT/QTSysSetApi/GetWorkFlow',data).then(res=>{
          console.log(res)
        }).catch(err=>{

        })
      },
      //获取预算部门
      getBudegDepart(){
        let data  = {
          orgid:this.Orgid,
          uid:this.UserId
        }
        this.getAxios('/GQT/CorrespondenceSettingsApi/GetDeptByUnit',data).then(res=>{
          this.FBudgetDeptGroup = res.Record
          console.log( res.Record)
        }).catch(err=>{
          this.$msgBox.error('请求错误')
        })
      },
      //获取申报部门集合
      getDeclareList () {
        let data = {
          orgCode: this.OrgCode,
          usercode: this.UserCode ? this.UserCode : '9999',
          orgid: this.Orgid
        }
        let that= this
        this.getAxios('/GQT/CorrespondenceSettingsApi/GetFDeclarationUnit', data)
          .then(res => {
            console.log(res)
            if (res.Status === 'success') {
              let arr = {
                deptCode:res.deptCode,
                deptName:res.deptName
              }
              this.$set(this.FDeclarationDeptGroup,0,arr)
            }else {
              this.$msgBox.error(res.Msg)
            }
          })
          .catch(err => { })
      },
      //get获取表格数据
      getTableData () {
        let data = {
          OrgCode: this.OrgCode,//组织编码
          Ucode: this.UserCode,//用户账号
          Year: this.Year,//年度
          ProjStatus: '',//（1-预立项 ；2-立项； 其他）
          SearchValue: this.formList.FProjName,//搜索框的值
          FExpenseCategory: this.formList.payOutType,//支出类型（0-全部）
          FApproveStatus: this.formList.approvalStatus,//审批状态 （0-全部， 1-待上报， 2-审批中，3-审批通过， 4-已退回）
          PageIndex: this.page.currentPage - 1,  //页码
          PageSize: this.page.pageSize,//每页条数

          //高级搜索
          FProjName:this.seniorSearch.FProjName,//高级搜索项目名称
          FProjCode:this.seniorSearch.FProjCode,//高级搜索项目编码
          FDeclarationDept:this.seniorSearch.FDeclarationDept,//高级搜索申报部门
          FBudgetDept:this.seniorSearch.FBudgetDept,//高级搜索预算部门
          FProjAmountBegin:this.seniorSearch.FProjAmountBegin,//高级搜索项目开始金额
          FProjAmountEnd:this.seniorSearch.FProjAmountEnd,//高级搜索项目结束金额
          FIfPerformanceAppraisal:this.seniorSearch.FIfPerformanceAppraisal,//高级搜索绩效评价
          FStartDate:this.seniorSearch.FTime?this.seniorSearch.FTime[0]:'',//高级搜开始时间
          FEndDate:this.seniorSearch.FTime?this.seniorSearch.FTime[0]:'',//高级搜索绩结束时间
        };
        this.getAxios('/GXM/ProjectMstApi/GetProjectMstList', data).then(res => {
          if (res.Record) {
            this.table.tableData = res.Record
            this.page.total = res.totalRows
            console.log(res.Record)
            if (this.selection !== 0){
              for(let i in this.selection){
                this.selection.splice(i,1)
              }
            }
          } else {
            this.$msgBox.error(res.Msg)
          }
        }).catch(err => {
          this.$msgBox.error("数据获取失败")
        })
      },
      //获取支出类型集合
      getExpenseCategoryList () {
        this.getAxios('/GQT/SysSettingApi/GetExpenseCategoryList ').then(res => {
          if (res.Status === "success") {
            this.payOutType = res.Data
          }
          console.log(res)
        })
      },
      //表格行样式回调
      rowClassName ({ row, rowIndex }) {
        return 'row-class-name'
      },
      //单元格样式回调
      cellClassName ({ row, column, rowIndex, columnIndex }) {
        let length = this.table.column.length
        if (!this.table.selection) {
          length = this.table.column.length - 2      }
        if (columnIndex === 0) {
          return 'frist-column'
        }else if(columnIndex === 1){
          return 'secend-column'
        }
        else if (columnIndex === length +1) {
          return 'last-column'
        } else {
          return 'middle-column'
        }
      },
      //表头单元格回调
      handerCellClassName ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === this.table.column.length +1) {
          return 'thead-last-cell'
        } else if (columnIndex === 0){
          return 'thead-frist'
        } else if (columnIndex === 1){
          return 'thead-second'
        }else {
          return 'thead-cell'
        }
      },
      //单元格样式回调
      itemCellClassName ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return 'frist-column'
        }else if(columnIndex === 1){
          return 'secend-column'
        }
        else if (columnIndex === 3) {
          return 'last-column'
        } else {
          return 'middle-column'
        }
      },
      //表头单元格回调
      itemHanderCellClassName ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 3) {
          return 'thead-last-cell'
        }else if (columnIndex === 0){
          return 'thead-frist'
        } else if (columnIndex === 1){
          return 'thead-second'
        }else {
          return 'thead-cell'
        }
      },
      //每页条数改变
      handerSizeChange (val) {
        console.log(val)
        this.page.pageSize = val
        this.getTableData()
      },
      //当前页改变
      handerCurrentChange (val) {
        console.log(val)
        this.page.currentPage = val
        this.getTableData()
      },
      //
      rowSelect (selection, row) {
        this.selection = selection
      },
      rowSelectAll (selection) {
        this.selection = selection
      },
      //自定义列数据替换的回调
      //自定义列数据替换的回调
      formatter (scope) {
        let column = scope.column.label;
        let index = -1
        for (let key in this.table.column) {
          if (this.table.column[key].label === column) {
            index = key
          }
        }
        return this.table.column[index].format(scope)
      },
      //自定义单元格的回调
      cellClick (scope) {
        let column = scope.column.label;
        let index = -1
        for (let key in this.table.column) {
          if (this.table.column[key].label === column) {
            index = key
          }
        }
        return this.table.column[index].fn(scope)
      },
      //测试方法
      fn () {
        this.table.colum.push({
          prop: 'end',
          label: '测试',
          align: 'left'
        })
      },
      //切换表格样式
      swatchTable () {
        if (this.watchTable) {
          this.watchTable = false
        } else {
          this.watchTable = true
        }
      },
      edit () {
        this.addDialog = true
      },
      deleteItem () {
        if (this.selection.length === 0) {
          this.$msgBox.error('请选择数据进行删除')
          return
        } else if (this.selection.length !== 1 && this.selection.length !== 0) {
          this.$msgBox.error('只能选择一行数据进行删除')
          return
        } else {
          let data = {
            FProjCode: this.selection[0].FProjCode,
            FProjPhId: this.selection[0].PhId
          };
          this.postAxios('/GXM/ProjectMstApi/PostDeleteProject', data).then(res => {
            if (res.Status === 'success') {
              this.$msgBox.show('删除成功')
              this.getTableData()
            } else {
              this.$msgBox.error(res.Msg)
            }
          }).catch(err => {
            this.$msgBox.error('请求失败')
          })
        }
      },
      showDetail (scope) {
        let data = {
          FProjPhId: scope.row.PhId
        }
        this.getAxios('/GXM/ProjectMstApi/GetProjectMst', data).then(res => {
          this.itemDetail = res
          this.itemlDialog = true
          console.log(res)
        }).catch(err => {
          this.$msgBox.error('请求失败')
        })
      },
      //选择框改变事件
      query () {
        console.log(this.formList.approvalStatus)
        if (this.formList.approvalStatus ==='2'){
          this.paddRight = '25px'
        } else {
          this.paddRight = '25px'
        }
        this.formList.FProjName = ''
        this.getTableData()
      },
      //搜索框查询事件
      searchInput () {
        this.getTableData()
      },
      //高级搜索框清空
      seniorReset(){
        this.seniorSearch = {//高级筛选
          FProjName:'',//项目名称
          FProjCode:'',//项目编码
          FDeclarationDept:'',//申报部门
          FBudgetDept:'',//预算部门
          FProjAmountBegin:'',//金额开始
          FProjAmountEnd:'',//金额结束
          FIfPerformanceAppraisal:'',//是否绩效评价
          FTime:[],//起止日期
        }
        this.getTableData()
      },
      //刷新
      refresh(val,stu){
        if (stu ==='budgetEdit'){
          this.budgetEditDialog = false
        }
        this.getTableData()
      },
      handleDelete(){
        this.approvalDataS.openDialog = false
        this.getTableData()
      },
      //获取审批流程
      getAppvalProcList(row){
        if (this.WorkFlow ===0){
          this.$msgBox.show('无数据可执行确认')
          return;
        }
        if (row.FApproveStatus ==='1'){
          this.$msgBox.error('单据还未送审，未生成审批流，请先送审')
          return
        }
        let arr = []
        arr[0] = row.PhId
        let data = {
          FBilltype:'005',
          RefbillPhid:row.PhId
        }
        this.getAxios('/GAppvalRecord/GetAppvalRecordList',data).then(res=>{

          if (res.Status === 'success'){
            this.auditDialog = true
            this.auditMsg = res.Data
            console.log(res.Data)
          } else {
            this.$msgBox.error(res.Msg)
          }
        }).catch(err=>{

        })
      },

      //汇总表打印
      sumTablePrint(){
        if (this.selection.length ===0){
          this.$msgBox.error('请选择需要打印的单据！！')
        }else {
          this.$refs.sumTabPrint.sumdialog = true
          this.sumtabData = this.selection;
          let sum = 0
          for (let i in this.selection){
            sum += this.selection[i].FProjAmount
          }
          this.totalFProjAmount = sum
          console.log(this.selection)
        }
      },
      //单位切换
      swatchUnit(){
        if (this.formList.year === '1') {
          for (let i in this.table.column){
            if (this.table.column[i].prop === 'FProjAmount') {
              this.$set(this.table.column[i],"label",'项目金额(元)')
            }
          }
        } else {
          for (let i in this.table.column){
            if (this.table.column[i].prop === 'FProjAmount') {
              this.$set(this.table.column[i],"label",'项目金额(万元)')
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .content-body {
  }
  .row-class-name {
    margin-top: 10px;
    padding: 0 20px;
  }
  .table-main {
    width: 97%;
    overflow-x: hidden;
  }
  .top {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -5px 0 0 0 !important;
    transform: translate(-50%, -50%);
  }
  .top ul li {
    float: left;
  }
  .top ul li:hover {
    cursor: pointer;
  }
  .top ul li div img {
    width: 30px;
  }
  .cell-click {
    color: #409eff;
    text-decoration: underline;
  }
  .cell-click:hover {
    cursor: pointer;
  }
  .applyDetailDialog >>> .el-dialog__header {
    padding: 10px 0 0 0;
  }
  .applyDetailDialog >>> .el-dialog__body {
    padding: 0 20px;
  }
  .applyDetailTitle {
    text-align: left;
    border-bottom: 1px solid #eaeaea;
    height: 30px;
  }
  .applyDetailTitle span {
    margin-left: 10px;
    line-height: 30px;
  }

  .searchIpt >>> .el-input__inner{
    border-radius: 20px 0 0 20px;
  }
  .searchBtn{
    margin-left: -5px;
    margin-right: -5px;
    border-radius: 0px;
  }
  .searchSer{
    border-radius: 0px 4px 4px 0px;
  }
</style>
<style lang="scss" scoped>
  .seniorSearch{
    padding: 5px;
    >div{
      &:nth-of-type(1){
        border-bottom: 2px solid #00B8EE;
        color: #00B8EE;
        font-size: .2rem;
      }
      &:nth-of-type(2){
        padding: 10px 0 0 0;
        border-top: 1px solid #ccc;
        >ul{
          display: inline-block;
          float: right;
          >li{
            display: inline-block;
            margin-left: 5px;
            &:nth-of-type(1){
              >.btn{
                background-color: #fff;
                color: #00B8EE;
              }

            }
          }
        }
      }
      >span:nth-of-type(2){
        float: right;
      }
    }

    table{
      width: 100%;
      td{
        padding: 8px 5px;
      }
    }
  }
  .seniorSearch{
    td{
      text-align: center;
    }
  }

  .closeSenior:hover{
    cursor: pointer;
  }
  .top-left-code{
    color: #409eff;
    text-decoration: underline;
  }
  .top-left-code:hover{
    cursor: pointer;
  }
  .top-center{
    /*width: 300px;*/
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
