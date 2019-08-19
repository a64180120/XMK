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
            <span>预算修正</span>
          </li>
          <li class="handle"
              @click="edit()">
            <div>
              <img src="@/assets/images/zj2.png">
            </div>
            <span>送审</span>
          </li>
          <li class="handle"
              @click.stop="openAuditfollow()">
            <div>
              <img src="@/assets/images/ss_d.png">
            </div>
            <span>取消送审</span>
          </li>
          <li class="handle"
              @click="openAuditfollow()">
            <div>
              <img src="@/assets/images/xz.png">
            </div>
            <span>驳回</span>
          </li>
          <li class="handle"
              @click="openAuditfollow()">
            <div>
              <img src="@/assets/images/xz.png">
            </div>
            <span>项目执行确认</span>
          </li>
          <li class="handle"
              @click="openAuditfollow()">
            <div>
              <img src="@/assets/images/sp.png">
            </div>
            <span>同步到财务</span>
          </li>
          <li class="handle"
              @click="openAuditfollow()">
            <div>
              <img src="@/assets/images/ss_d.png">
            </div>
            <span>申请表打印</span>
          </li>
          <li class="handle"
              @click="openAuditfollow()">
            <div>
              <img src="@/assets/images/dy.png">
            </div>
            <span>汇总表打印</span>
          </li>
        </ul>

      </div>
    </top-handle>

    <div>
      <div class="container content-body">
        <div class="formArea">
          <!--搜索栏-->
          <div class="btnArea"
               style="margin-bottom: 15px">
            <el-form :inline="true">
              <el-form-item label="部门申报/部门审批：">
                <el-select v-model="formList.type"
                           size="mini">
                  <el-option value="1"
                             label="主业类">主业类</el-option>
                  <el-option value="2"
                             label="企事业类">企事业类</el-option>
                  <el-option value="3"
                             label="机关行政类">机关行政类</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单位：">
                <el-select v-model="formList.year"
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
                  <el-option value="3"
                             label="未通过">未通过</el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="mini"
                           @click="swatchTable">切换</el-button>
              </el-form-item>
              <el-form-item style="float: right">
                <search-input v-model="formList.FProjName"
                              @btnClick="searchInput()"></search-input>
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
                      <span v-if="scope.row[item.prop]">{{scope.row[item.prop].replace('T',' ')}}</span>
                      <span v-else="scope.row[item.prop]">{{scope.row[item.prop]}}</span>
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
                        :row-class-name="rowClassName"
                        :cell-class-name="itemCellClassName"
                        @select="rowSelect"
                        @select-all="rowSelectAll"
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
                            <span @click="showDetail(scope.row)">项目属性：{{scope.row.FProjAttr_EXName?scope.row.FProjAttr_EXName:'无'}}</span>
                          </li>
                          <li>
                            <span>存续期限：{{scope.row.FDuration_EXName?scope.row.FDuration_EXName:'无'}}</span>
                          </li>
                          <li>
                            <span>项目级别：{{scope.row.FLevel_EXName?scope.row.FLevel_EXName:'无'}}</span>
                          </li>
                          <li>
                            <span>起止日期：{{scope.row.FStartDate.replace('T00:00:00','')}}至{{scope.row.FEndDate.replace('T00:00:00','')}}</span>
                          </li>
                          <li>
                            <span>支出类别：{{scope.row.FExpenseCategory_EXName?scope.row.FExpenseCategory_EXName:'无'}}</span>
                          </li>
                          <li>
                            <span>效绩评价：{{scope.row.FIfPerformanceAppraisal ===1?'否':'是'}}</span>
                          </li>
                          <li>
                            <span>申报部门：{{scope.row.FDeclarationDept_EXName?scope.row.FDeclarationDept_EXName:'无'}}</span>
                          </li>
                          <li>
                            <span>预算部门：{{scope.row.FBudgetDept_EXName?scope.row.FBudgetDept_EXName:'无'}}</span>
                          </li>
                          <li>
                            <span>申报日期：{{scope.row.FDateofDeclaration?scope.row.FDateofDeclaration:'无'}}</span>
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
                        <span v-if="scope.row.FProjStatus ===1">(预立项)</span>
                        <span v-if="scope.row.FProjStatus ===2">(项目立项)</span>
                        <span v-if="scope.row.FProjStatus ===3">(项目执行)</span>
                        <span v-if="scope.row.FProjStatus ===4">(项目调整)</span>
                        <span v-if="scope.row.FProjStatus ===5">(项目暂停)</span>
                        <span v-if="scope.row.FProjStatus ===6">(项目终止)</span>
                        <span v-if="scope.row.FProjStatus ===7">(项目关闭)</span>
                      </div>
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
               width="80%"
               :close-on-click-modal="false">
      <prerojectnewproject></prerojectnewproject>
    </el-dialog>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="detailDialog"
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
export default {
  name: "projectBuild",
  components: { Auditfollow, ItemPrint, Prerojectnewproject, SearchInput, ItemTable, DataTable, TopHandle },
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
            align: 'center',
            other: 'status',
            format: function (scope) {
              if (scope.row.FApproveStatus == 1) {
                return '<span>' + '待审批(预立项)' + '</span>'
              } else if (scope.row.FApproveStatus == 2) {
                return '<span>' + '审批中(预立项)' + '</span>'
              } else if (scope.row.FApproveStatus == 3) {
                return '<span>' + '审批通过(预立项)' + '</span>'
              } else if (scope.row.FApproveStatus == 4) {
                return '<span>' + '审批退回(预立项)' + '</span>'
              }
            },
            fn: function (scope) {
              console.log(scope)
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
      search: '',
      addDialog: false,
      detailDialog: false,
      openfollow: false,
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 20,
        pageSizes: [20, 30, 50, 100]
      },
      itemDetail: {},
      selection: [],
      payOutType: [],
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
        ProjStatus: 2,//（1-预立项 ；2-立项； 其他）
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
    //新增方法
    add () {
      this.addDialog = true
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
        this.detailDialog = true
        console.log(res)
      }).catch(err => {
        this.$msgBox.error('请求失败')
      })
    },
    openAuditfollow () {
      this.openfollow = true;
    },
    //选择框改变事件
    query () {
      this.formList.FProjName = ''
      this.getTableData()
    },
    //搜索框查询事件
    searchInput () {
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
</style>
<style lang="scss" scoped>
</style>
