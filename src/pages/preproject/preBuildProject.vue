<template>
  <section>
    <top-handle title="项目管理在线工作平台"
                @refresh="refresh()">
      <div class="top">
        <ul>
          <li class="handle"
              @click="add()">
            <div>
              <img src="@/assets/images/xz.png">
            </div>
            <span>新增</span>
          </li>
          <li class="handle"
              @click="edit()">
            <div>
              <img src="@/assets/images/zj2.png">
            </div>
            <span>修改</span>
          </li>
          <li class="handle"
              @click="deleteItem()">
            <div>
              <img src="@/assets/images/zj3.png">
            </div>
            <span>删除</span>
          </li>
          <li class="handle"
              @click="">
            <div>
              <img src="@/assets/images/xz.png">
            </div>
            <span>复制</span>
          </li>
          <li v-if="formList.swatchBtn ==='3'"
              class="handle"
              @click="">
            <div>
              <img src="@/assets/images/xz.png">
            </div>
            <span>转立项</span>
          </li>
          <li v-if="formList.swatchBtn ==='3'"
              class="handle"
              @click="">
            <div>
              <img src="@/assets/images/xz.png">
            </div>
            <span>驳回</span>
          </li>
          <li v-if="formList.swatchBtn ==='1'"
              class="handle"
              @click="subApproval()">
            <div>
              <img src="@/assets/images/sp.png">
            </div>
            <span>送审</span>
          </li>

          <li v-if="formList.swatchBtn ==='1'"
              class="handle"
              @click="unSubApproval()">
            <div>
              <img src="@/assets/images/ss_d.png">
            </div>
            <span>取消送审</span>
          </li>
          <li v-if="formList.swatchBtn ==='2'||formList.swatchBtn ==='2'"
              class="handle"
              @click="">
            <div>
              <img src="@/assets/images/ss_d.png">
            </div>
            <span>上报</span>
          </li>
          <li v-if="formList.swatchBtn ==='1'||formList.swatchBtn ==='2'"
              class="handle"
              @click="abolish()">
            <div>
              <img src="@/assets/images/zf.png">
            </div>
            <span>作废</span>
          </li>
          <li class="handle"
              @click="">
            <div>
              <img src="@/assets/images/dy.png">
            </div>
            <span>申请表打印</span>
          </li>
          <li class="handle"
              @click="">
            <div>
              <img src="@/assets/images/dy.png">
            </div>
            <span>汇总表打印</span>
          </li>
        </ul>

      </div>
    </top-handle>

    <div>
      <div class="container content-body"
           style="min-width: 1300px;overflow: auto;min-height:750px">
        <div class="formArea">
          <!--搜索栏-->
          <div class="btnArea"
               style="margin-bottom: 15px">
            <el-form :inline="true">
              <el-form-item label="">
                <el-select v-model="formList.swatchBtn"
                           size="mini">
                  <el-option value="1"
                             label="不启用"></el-option>
                  <el-option value="2"
                             label="部门申报"></el-option>
                  <el-option value="3"
                             label="汇总审批"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单位：">
                <el-select v-model="formList.year"
                           size="mini"
                           class="money-dw">
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
                             label="全部">全部</el-option>
                  <el-option value="1"
                             label="待上报">待上报</el-option>
                  <el-option value="2"
                             label="审批中">审批中</el-option>
                  <el-option value="3"
                             label="审批通过">审批通过</el-option>
                  <el-option value="4"
                             label="未通过">已退回</el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="mini"
                           @click="swatchTable">切换</el-button>
              </el-form-item>
              <el-form-item style="float: right">
<!--                <search-input v-model="formList.FProjName"-->
<!--                              @btnClick="searchInput()"></search-input>-->
                <el-input size="mini" v-model="formList.FProjName" clearable ></el-input>
                <el-button size="mini" @click="searchInput()" type="primary">搜索</el-button>
                <el-button size="mini" type="success">高级</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--表格区域-->
          <div v-if="watchTable"
               class="table-main">
            <section class="dataTable_proBuildProject">
              <el-table :data="table.tableData"
                        :row-class-name="rowClassName"
                        :cell-class-name="cellClassName"
                        @select="rowSelect"
                        @select-all="rowSelectAll"
                        :header-cell-class-name="handerCellClassName"
                        @current-change=""
                        :highlight-current-row="highlightCurrentRow"
                        style="overflow: visible;position: static;padding-top: 50px">
                <el-table-column v-if="table.selection"
                                 type="selection"></el-table-column>
                <el-table-column v-for="(item,idx) in table.column"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :width="item.width"
                                 :key="idx"
                                 align="center">
                  <template slot-scope="scope"
                            style="">
                    <div v-if="item.other === 'function'"
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
                            :style="{textAlign:item.align}">{{scope.row[item.prop] |NumFormat}}元</span>
                      <span v-else
                            :style="{textAlign:item.align}">{{scope.row[item.prop] / 10000}}万元</span>
                    </div>
                    <div v-else-if="item.other ==='start-end'"
                         class="table-column-height"
                         :style="{textAlign:item.align}">
                      <span>{{scope.row[item.prop1].replace('T00:00:00','')}}——</span>
                      <span>{{scope.row[item.prop2].replace('T00:00:00','')}}</span>
                    </div>
                    <div v-else-if="item.other ==='time'">
                      <span>{{scope.row[item.prop].replace('T',' ')}}</span>
                    </div>
                    <div v-else-if="item.other ==='status-click'">
                      <span v-html="formatter(scope)"
                            @click="cellClick(scope)"
                            class="cell-click"></span>
                    </div>
                    <div v-else-if="item.other ==='status'">
                      <span v-html="formatter(scope)"
                            class="cell-click"></span>
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
            <section class="itemTable_proBuildProject">
              <el-table :data="table.tableData"
                        @select="rowSelect"
                        @select-all="rowSelectAll"
                        :row-class-name="rowClassName"
                        :cell-class-name="itemCellClassName"
                        :header-cell-class-name="itemHanderCellClassName"
                        :highlight-current-row="highlightCurrentRow"
                        style="overflow: visible;position: static;padding-top: 50px">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="item"
                                 align="center"
                                 label="预立项项目信息">
                  <template slot-scope="scope">
                    <div>
                      <div class="top-content">
                        <div class="top-left">项目编码：{{scope.row.FProjCode}}</div>
                        <div class="top-center">项目名称：{{scope.row.FProjName}}</div>
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
                            <span @click="showDetail(scope.row)">项目属性：{{scope.row.FProjAttr_EXName}}</span>
                          </li>
                          <li>
                            <span>存续期限：{{scope.row.FDuration_EXName}}</span>
                          </li>
                          <li>
                            <span>项目级别：{{scope.row.FLevel_EXName}}</span>
                          </li>
                          <li>
                            <span>起止日期：{{scope.row.FStartDate.replace('T00:00:00','')}}至{{scope.row.FEndDate.replace('T00:00:00','')}}</span>
                          </li>
                          <li>
                            <span>支出类别：{{scope.row.FExpenseCategory_EXName}}</span>
                          </li>
                          <li>
                            <span>效绩评价：{{scope.row.FIfPerformanceAppraisal ===1?'否':'是'}}</span>
                          </li>
                          <li>
                            <span>申报部门：{{scope.row.FDeclarationDept_EXName}}</span>
                          </li>
                          <li>
                            <span>预算部门：{{scope.row.FBudgetDept_EXName}}</span>
                          </li>
                          <li>
                            <span>申报日期：{{scope.row.FDateofDeclaration}}</span>
                          </li>
                          <li>
                            <span>申报进度：
                              <span v-if="scope.row.FType+scope.row.FVerNo ==='c0001'">年初新增</span>
                              <span v-else-if="scope.row.FType+scope.row.FVerNo ==='c0002'">年中调整</span>
                              <span v-else-if="scope.row.FType+scope.row.FVerNo ==='z0001'">年中新增</span>
                              <span v-else>无</span>
                            </span>
                          </li>
                          <li>
                            <span>项目状态：
                              <span v-if="scope.row.FProjStatus ===1">预立项</span>
                              <span v-else-if="scope.row.FProjStatus ===2">项目立项</span>
                              <span v-else-if="scope.row.FProjStatus ===3">项目执行</span>
                              <span v-else-if="scope.row.FProjStatus ===4">项目调整</span>
                              <span v-else-if="scope.row.FProjStatus ===5">项目暂停</span>
                              <span v-else-if="scope.row.FProjStatus ===6">项目终止</span>
                              <span v-else-if="scope.row.FProjStatus ===7">项目关闭</span>
                              <span v-else>无</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="status"
                                 width="160"
                                 label="审批状态"
                                 align="center">
                  <template slot-scope="scope">
                    <div class="status-row">
                      <div class="status-titile">
                        <span v-if="scope.row.FApproveStatus ==1">待审批</span>
                        <span v-if="scope.row.FApproveStatus ==2">审批中</span>
                        <span v-if="scope.row.FApproveStatus ==3">审批通过</span>
                        <span v-if="scope.row.FApproveStatus ==4">已退回</span>
                        (<span v-if="scope.row.FProjStatus ===1">预立项</span>
                        <span v-if="scope.row.FProjStatus ===2">项目立项</span>
                        <span v-if="scope.row.FProjStatus ===3">项目执行</span>
                        <span v-if="scope.row.FProjStatus ===4">项目调整</span>
                        <span v-if="scope.row.FProjStatus ===5">项目暂停</span>
                        <span v-if="scope.row.FProjStatus ===6">项目终止</span>
                        <span v-if="scope.row.FProjStatus ===7">项目关闭</span>)</div>
                      <div class="status-context">
                        <span v-if="scope.row.FApproveStatus ==1">待审批</span>
                        <span v-if="scope.row.FApproveStatus ==2">审批中</span>
                        <span v-if="scope.row.FApproveStatus ==3">审批通过</span>
                        <span v-if="scope.row.FApproveStatus ==4">已退回</span>
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
               :visible.sync="addDialog"
               width="90%"
               :close-on-click-modal="false"
               class="applyDetailDialog">
      <div slot="title"
           class="applyDetailTitle">
        <span>新增项目</span>
      </div>
      <prerojectnewproject v-if="addDialog" @refresh='refresh'></prerojectnewproject>
    </el-dialog>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="editDialog" v-if="editDialog"

               width="90%"
               :close-on-click-modal="false"
               class="applyDetailDialog">
      <div slot="title"
           class="applyDetailTitle">
        <span>修改项目</span>
      </div>
      <edit  :data="editDetail" @refresh="refresh"></edit>
    </el-dialog>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="detailDialog"
               width="50%"
               :close-on-click-modal="false"
               class="applyDetailDialog">
      <div slot="title"
           class="applyDetailTitle">
        <span>申报表打印</span>
      </div>
      <item-print :data="itemDetail"></item-print>

    </el-dialog>
    <!--送审-->
    <go-approval v-if="approvalDataS.openDialog"
                 :data="approvalDataS"
                 @delete="handleDelete"></go-approval>
    <auditfollow :visible.sync="openfollow"></auditfollow>
    <!--查看审批流程-->
    <auditfollow :visible.sync="auditDialog"
                 auditType="004"
                 :auditMsg="auditMsg"></auditfollow>
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
import Edit from "../../components/preProjectDialog/edit";
import GoApproval from "./component/goApproval";
export default {
  name: "preBuildProject",
  components: {
    GoApproval,
    Edit, Auditfollow, ItemPrint, Prerojectnewproject, SearchInput, ItemTable, DataTable, TopHandle },
  data () {
    let that = this
    return {
      table: {
        tableData: [],
        column: [
          {
            prop: 'FDeclarationDept_EXName',
            label: '申报部门',
            other: 'function',
            fn: function (scope) {
              that.showDetail(scope)
            }
          }, {
            prop: 'FBudgetDept_EXName',
            label: '预算部门',
          }, {
            prop: 'FProjCode',
            label: '项目编码',
            align: 'center',
          }, {
            prop: 'FProjName',
            label: '项目名称',
            align: 'center'
          }, {
            prop: 'FProjAmount',
            label: '项目金额',
            width: 130,
            other: 'money',
            align: "right"
          }, {
            prop: 'FExpenseCategory_EXName',
            label: '支出类别',
            align: 'center',
          }, {
            prop1: 'FStartDate',
            prop2: 'FEndDate',
            label: '起止日期',
            align: 'center',
            width: 270,
            other: "start-end"
          }, {
            prop: 'FDateofDeclaration',
            label: '申报日期',
            align: 'center',
            other: 'time',
          }, {
            prop: 'FApproveStatus',
            label: '审批状态',
            width: 150,
            align: 'center',
            other: 'status-click',
            format: function (scope) {
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
              if (scope.row.FApproveStatus == 1) {
                return '<span>' + '待审批('+MC+')' + '</span>'
              } else if (scope.row.FApproveStatus == 2) {
                return '<span>' + '审批中('+MC+')' + '</span>'
              } else if (scope.row.FApproveStatus == 3) {
                return '<span>' + '审批通过('+MC+')' + '</span>'
              } else if (scope.row.FApproveStatus == 4) {
                return '<span>' + '审批退回('+MC+')' + '</span>'
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
      payOutType: [],
      formList: {
        swatchBtn: '1',
        year: "1",
        payOutType: '0',
        approvalStatus: '0',
        FProjName: ''
      },
      search: '',
      addDialog: false,
      editDialog:false,
      detailDialog: false,
      openfollow: false,
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 20,
        pageSizes: [20, 30, 50, 100]
      },
      itemDetail: {},//缓存详情行的值
      selection: [],//选中表格行的值
      editDetail:{},//缓存修改行的值
      //送审
      approvalDataS: {
        openDialog: false,
        data: {},
        subData: [] //审批流获取
      },
      auditMsg:[],//审批流数据
      auditDialog:false

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
    this.getExpenseCategoryList()
    this.getTableData()
  },
  methods: {
    //get获取表格数据
    getTableData () {
      let data = {
        OrgCode: this.OrgCode,//组织编码
        Ucode: this.UserCode,//用户账号
        Year: this.Year,//年度
        ProjStatus: 1,//（1-预立项 ；2-立项； 其他）
        FProjName: this.formList.FProjName,//搜索框的值
        FExpenseCategory: this.formList.payOutType,//支出类型（0-全部）
        FApproveStatus: this.formList.approvalStatus,//审批状态 （0-全部， 1-待上报， 2-审批中，3-审批通过， 4-已退回）
        PageIndex: this.page.currentPage - 1,  //页码
        PageSize: this.page.pageSize//每页条数
      };
      this.getAxios('/GXM/ProjectMstApi/GetProjectMstList', data).then(res => {
        if (res.Record) {
          this.table.tableData = res.Record
          this.page.total = res.totalRows
          console.log(res.Record)
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
        length = this.table.column.length - 1      }
      if (columnIndex === 0) {
        return 'frist-column'
      } else if (columnIndex === length) {
        return 'last-column'
      } else {
        return 'middle-column'
      }
    },
    //表头单元格回调
    handerCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === this.table.column.length) {
        return 'thead-last-cell'
      } else {
        return 'thead-cell'
      }
    },
    //单元格样式回调
    itemCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'frist-column'
      } else if (columnIndex === 2) {
        return 'last-column'
      } else {
        return 'middle-column'
      }
    },
    //表头单元格回调
    itemHanderCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return 'thead-last-cell'
      } else {
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
      console.log(selection)
    },
    rowSelectAll (selection) {
      this.selection = selection
    },
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
    //切换表格样式
    swatchTable () {
      if (this.watchTable) {
        this.watchTable = false
      } else {
        this.watchTable = true
      }
    },
    //新增方法
    add () {
      this.addDialog = true
    },
    edit () {
      if (this.selection.length === 0){
        this.$msgBox.error('请选择需要修改的单据')
      } else if (this.selection.length === 1){
        this.editDetail = this.selection[0]
        this.editDialog = true
      } else {
        this.$msgBox.error('只能选择一条单据进行修改')
      }
    },
    deleteItem () {
      if (this.selection.length === 0) {
        this.$msgBox.error('请选择数据进行删除')
        return
      } else if (this.selection.length !== 1 && this.selection.length !== 0) {
        this.$msgBox.error('只能选择一行数据进行删除')
        return
      } else {
        this.$confirm('确定删除该记录？','提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消'
        }).then(()=>{
          let data = {
            FProjCode: this.selection[0].FProjCode,
            FProjPhId: this.selection[0].PhId,
            PersistentState:'3'
          };
          this.postAxios('/GXM/ProjectMstApi/PostDeleteProject', data).then(res => {
            if (res.Status === 'success') {
              this.$msgBox.show('删除成功')
              this.getTableData()
              this.selection =[]
            } else {
              this.$msgBox.error(res.Msg)
              this.selection =[]
            }
          }).catch(err => {
            this.$msgBox.error('请求失败')
          })
        }).catch(()=>{

        })
      }
    },
    //显示详情
    showDetail (scope) {
      let data = {
        FProjPhId: scope.row.PhId
      }
      this.getAxios('/GXM/ProjectMstApi/GetProjectMst', data).then(res => {
        this.itemDetail = res
        this.detailDialog = true
        console.log(res)
      }).catch(err => {
        this.$msgBox.error('请求失败')
      })
    },
    openAuditfollow () {
      this.detailDialog = true
    },
    //选择框改变事件
    query () {
      this.formList.FProjName = ''
      this.getTableData()
    },
    //搜索框查询事件
    searchInput () {
      this.getTableData()
    },
    //刷新
    refresh(val,stu){
      if (stu ==='add'){
        this.addDialog = false
      }else if (stu ==='edit') {
        this.editDialog = false
      }
      this.getTableData()
    },
    //送审
    subApproval(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择数据进行送审')
      }else if (this.selection.length ===1) {
        this.approvalDataS.openDialog = true
        this.approvalDataS.data = this.selection
        console.log(this.selection[0].PhId)
      }else {
        this.$msgBox.error('不支持多行送审，请单行选择')
      }
    },
    //取消送审
    unSubApproval(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择数据进行取消送审')
      }else if (this.selection.length ===1) {
        let arr = [];
        for (let i in this.selection){
          arr[i] =  this.selection[i].PhId
        }
        let data = {
          FBilltype:'004',
          RefbillPhidList:arr,
          OperaPhid:this.UserId
        }
        this.postAxios('/GAppvalRecord/PostCancelAppvalRecord',data).then(res=>{
          if (res.Status ==='success'){
            this.$msgBox.error('取消成功')
            this.getTableData()
          } else {
            this.$msgBox.error(res.Msg)
          }
        }).catch(err=>{

        })
      }else {
        this.$msgBox.error('不支持多行送审，请单行选择')
      }
    },
    //作废
    abolish(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择数据进行作废')
      }else if (this.selection.length ===1) {
        let arr = [];
        for (let i in this.selection){
          arr[i] =  this.selection[i].PhId
        }
        let data = {
          fPhIdList:arr,
        }
        this.postAxios('/GXM/ProjectMstApi/PostCancetProjectList',data).then(res=>{
          if (res.Status ==='success'){
            this.$msgBox.error('作废成功')
            this.getTableData()
          } else {
            this.$msgBox.error(res.Msg)
          }
        }).catch(err=>{

        })
      }else {
        this.$msgBox.error('不支持多行作废，请单行选择')
      }
    },
    //获取审批流程
    getAppvalProcList(row){
      let arr = []
      arr[0] = row.PhId
      let data = {
        FBilltype:'004',
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

    handleDelete(){
      this.approvalDataS.openDialog = false
        this.getTableData()
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

.money-dw >>> .el-input {
  width: 80px;
}
</style>
<style lang="scss" scoped>
</style>
