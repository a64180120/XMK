<template>
    <section class="itemTable_proBuildProject panelTable">
      <el-table
        :data="table1.tableData"
        :row-class-name="rowClassName"
        :cell-class-name="itemCellClassName"
        :header-cell-class-name="itemHanderCellClassName"
        :highlight-current-row="highlightCurrentRow"
        style="overflow: visible;position: static;padding-top: 50px"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          prop="item"
          align="center"
          label="预立项项目信息">
          <template   slot-scope="scope">
            <div>
              <div class="top-content">
                <div class="top-left">项目编码：{{scope.row.item.projectCode}}</div>
                <div class="top-center">项目名称：{{scope.row.item.projectName}}</div>
                <div class="top-right">
                  <div class="card" v-if="moneyType==0">{{scope.row.item.projectMoney | NumFormat}}元</div>
                  <div class="card" v-if="moneyType==1">{{scope.row.item.projectMoney/10000 |NumFormat}}万元</div>
                </div>
              </div>
              <div class="context">
                <ul>
                  <li>
                    <span>项目属性：{{scope.row.item.name1}}</span><!-- @click="showDetail(scope.row)"-->
                  </li>
                  <li>
                    <span>存续期限：{{scope.row.item.name2}}</span>
                  </li>
                  <li>
                    <span>项目级别：{{scope.row.item.name3}}</span>
                  </li>
                  <li>
                    <span>项目级别：{{scope.row.item.name4}}</span>
                  </li>
                  <li>
                    <span>项目级别：{{scope.row.item.name5}}</span>
                  </li>
                  <li>
                    <span>项目级别：{{scope.row.item.name6}}</span>
                  </li>
                  <li>
                    <span>项目级别：{{scope.row.item.name7}}</span>
                  </li>
                  <li>
                    <span>项目级别：{{scope.row.item.name8}}</span>
                  </li>
                  <li>
                    <span>项目级别：{{scope.row.item.name9}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" width="150" label="审批状态" align="center">
          <template  slot-scope="scope">
            <div class="status-row" >
              <div class="status-titile">{{scope.row.status}}(预立项)</div>
              <div class="status-context">{{scope.row.status}}</div>
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
