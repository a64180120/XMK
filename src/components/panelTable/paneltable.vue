<template>
  <section class="itemTable_proBuildProject panelTable">
    <el-table :data="dataList"
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
                     v-if="moneyType == '0'">{{scope.row.FProjAmount | NumFormat}}元</div>
                <div class="card"
                     v-else>{{(scope.row.FProjAmount/10000).toLocaleString()}}万元</div>
              </div>
            </div>
            <div class="context">
              <ul>
                <li>
                  <span @click="showDetail(scope.row)">项目属性：{{scope.row.FProjAttr}}</span>
                </li>
                <li>
                  <span>存续期限：{{scope.row.FDuration}}</span>
                </li>
                <li>
                  <span>项目级别：{{scope.row.name3}}</span>
                </li>
                <li>
                  <span>起止日期：{{scope.row.FStartDate.replace('T00:00:00','')}}至{{scope.row.FEndDate.replace('T00:00:00','')}}</span>
                </li>
                <li>
                  <span>支出类别：{{scope.row.FExpenseCategory_EXName}}</span>
                </li>
                <li>
                  <span>效绩评价：{{scope.row.FIfPerformanceAppraisal}}</span>
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
                              <span v-if="scope.row.FType+scope.row.FVerNo ==='c0002'">年中调整</span>
                              <span v-if="scope.row.FType+scope.row.FVerNo ==='z0001'">年中新增</span>
                            </span>
                </li>
                <li>
                            <span>项目状态：
                              <span v-if="scope.row.FProjStatus ===1">预立项</span>
                              <span v-if="scope.row.FProjStatus ===2">项目立项</span>
                              <span v-if="scope.row.FProjStatus ===3">项目执行</span>
                              <span v-if="scope.row.FProjStatus ===4">项目调整</span>
                              <span v-if="scope.row.FProjStatus ===5">项目暂停</span>
                              <span v-if="scope.row.FProjStatus ===6">项目终止</span>
                              <span v-if="scope.row.FProjStatus ===7">项目关闭</span>
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
</template>

<script>
  import "../../assets/css/common/dataTable.css";
    export default {
        name: "paneltable",
      props:{
        moneyType:{
          type:Number,
          default(){
            return 0
          }
        },
        dataList: {
          type: Array,
          default() {
            return []
          }
        }
      },
      data(){
          return {
            highlightCurrentRow:false,
            rowNumber:4,
            table1:{
              tableData:[]
            },
          }
      },
      mounted(){
          console.log('=========表格数据==========')
          console.log(this.dataList)
      },
      created(){

        let a = {
          item:{
            projectCode:"1313",
            projectName:"文书、人事档案整理装订",
            projectMoney:'500',
            name1:'新增项目',
            name2:'经常性项目',
            name3:"一级",
            name4:'2019-01-01至2019-12-30',
            name5:'机关行政类',
            name6:'否',
            name7:"组织部",
            name8:'部门A',
            name9:'2018-12-18'
          },
          status:'审批中'
        }
        let b ={
          name1:'实业中心',
          name2:'实业中心',
          name3:'20190000001',
          name4:'广东劳模疗养基地5年',
          name5:3000,
          name6:"主业类",
          name7:"2019.01.01-2019.12.31",
          name8:"27.68",
          name9:"待送审",
        }
        for (let i =0;i<1;i++){
          this.table1.tableData.push(a)
        }

      },
      methods:{
        //表格行样式回调
        rowClassName({row,rowIndex}){
          return 'row-class-name'
        },
        //单元格样式回调
        cellClassName({row,column,rowIndex,columnIndex}){
          let length = this.table.column.length
          if (!this.table.selection){
            length = this.table.column.length - 1          }
          if (columnIndex === 0){
            return 'frist-column'
          }else if(columnIndex === length){
            return 'last-column'
          }else {
            return 'middle-column'
          }
        },
        //表头单元格回调
        handerCellClassName({row,column,rowIndex,columnIndex}){
          if (columnIndex === this.table.column.length){
            return 'thead-last-cell'
          }else {
            return 'thead-cell'
          }
        },
        //单元格样式回调
        itemCellClassName({row,column,rowIndex,columnIndex}){
          if (columnIndex === 0){
            return 'frist-column'
          }else if(columnIndex === 2){
            return 'last-column'
          }else {
            return 'middle-column'
          }
        },
        //表头单元格回调
        itemHanderCellClassName({row,column,rowIndex,columnIndex}){
          if (columnIndex === 2){
            return 'thead-last-cell'
          }else {
            return 'thead-cell'
          }
        },
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
      }
    }
</script>

<style>
  .panelTable{
    padding: 0 25px 0 0;
  }
  .panelTable .el-table__header-wrapper{
    top: 50px;
  }
  .panelTable .el-table__header-wrapper:after {
    width: 15px;
    background-color: #CACACA;
    height: 0.45rem;
    content: "";
    position: absolute;
    left: -15px;
    top: 0;
  }
</style>
