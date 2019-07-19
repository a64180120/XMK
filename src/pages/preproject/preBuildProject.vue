<template>
    <section>
      <top-handle title="项目管理在线工作平台"
                  @refresh="refresh()"></top-handle>
      <div>
        <div class="container content-body">
          <div class="formArea">
            <!--搜索栏-->
            <div class="btnArea" style="margin-bottom: 15px">
              <el-form :inline="true">
                <el-form-item label="部门申报/部门审批：">
                  <el-select v-model="formList.type" size="mini">
                    <el-option value="1" label="主业类">主业类</el-option>
                    <el-option value="2" label="企事业类">企事业类</el-option>
                    <el-option value="3" label="机关行政类">机关行政类</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="单位：">
                  <el-select v-model="formList.year" size="mini">
                    <el-option value="2" label="万元">万元</el-option>
                    <el-option value="1" label="元">元</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="支出类别：">
                  <el-select v-model="formList.type" size="mini">
                    <el-option value="1" label="主业类">主业类</el-option>
                    <el-option value="2" label="企事业类">企事业类</el-option>
                    <el-option value="3" label="机关行政类">机关行政类</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="审批状态：">
                  <el-select v-model="formList.status" size="mini">
                    <el-option value="1" label="待上报">待上报</el-option>
                    <el-option value="2" label="审批中">审批中</el-option>
                    <el-option value="3" label="审批通过">审批通过</el-option>
                    <el-option value="3" label="未通过">未通过</el-option>
                  </el-select>
                </el-form-item> 
                <el-form-item style="float: right">
                    <search-input v-model="search"></search-input>
                </el-form-item>
              </el-form>
            </div>
            <!--表格区域-->
            <div v-if="watchTable" class="table-main">
              <data-table
                :data="table.tableData"
                :column="table.colum"
                :selection="table.selection"></data-table>
            </div>
            <div v-else class="table-main">
              <item-table
                :data="table1.tableData"
                :monetaryUnit="formList.year"></item-table>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    import TopHandle from "../../components/topNav/topHandle";
    import DataTable from "../../components/dataTable/dataTable";
    import ItemTable from "../../components/itemTable/itemTable";
    import SearchInput from "../../components/searchInput/searchInput";
    export default {
        name: "preBuildProject",
      components: {SearchInput, ItemTable, DataTable, TopHandle},
      data(){
          return{
            table:{
              tableData:[],
              colum:[
                {
                prop:'name1',
                label:'申报部门',
                align:'left'
              },{
                prop:'name2',
                label:'预算部门',
              },{
                prop:'name3',
                label:'项目编码',
                align:'center'
              },{
                prop:'name4',
                label:'项目名称',
                align:'center'
              },{
                  prop:'name5',
                  label:'项目金额',
                  align:'center'
                },{
                  prop:'name6',
                  label:'支持类别',
                  align:'center'
                },{
                  prop:'name7',
                  label:'起止日期',
                  align:'center'
                },{
                  prop:'name8',
                  label:'申报日期',
                  align:'center'
                },{
                  prop:'name9',
                  label:'审批状态',
                  align:'center'
                }],
              selection:true
            },
            table1:{
              tableData:[]
            },
            watchTable:false,
            formList:{
              year:"1",
              type:'',
              status:'',
              search:''
            },
            search:''
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
          name5:"27.68",
          name6:"主业类",
          name7:"2019.01.01-2019.12.31",
          name8:"27.68",
          name9:"待送审",
        }
        for (let i =0;i<10;i++){
          this.table1.tableData.push(a)
          this.table.tableData.push(b)
        }

      },
      mounted(){

      },
      methods:{
        //表格行样式回调
        rowClassName({row,rowIndex}){
          return 'row-class-name'
        },
        //单元格样式回调
        cellClassName({row,column,rowIndex,columnIndex}){
          let a =  Object.getOwnPropertyNames(row).length
          console.log(column)
          if (columnIndex === 0){
            return 'frist-column'
          }else if(columnIndex === this.rowNumber-1){
            return 'last-column'
          }else {
            return 'middle-column'
          }
        },
        //表头单元格回调
        handerCellClassName({row,column,rowIndex,columnIndex}){
          return 'thead-cell'
            if (columnIndex === 0){

            }
        },
        fn(){
          this.table.colum.push({
            prop:'end',
            label:'测试',
            align:'left'
          })
        },
        fn1(){
          this.watchTable = false
        }
      }
    }
</script>

<style scoped>
  .row-class-name{
    margin-top: 10px;
    padding:0 20px;
  }
  .table-main{
    width: 97%;
    overflow-x: auto;
  }
</style>
<style>

</style>
