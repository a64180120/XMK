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
                <el-form-item label="年度:">
                  <el-input size="mini"></el-input>
                </el-form-item>
                <el-form-item label="an钮">
                  <el-button size="mini" @click="fn()">按钮</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" @click="fn1()">按钮</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!--表格区域-->
<!--            <div>-->
<!--              <data-table-->
<!--                :data="table.tableData"-->
<!--                :column="table.colum"-->
<!--                :selection="table.selection"></data-table>-->
<!--            </div>-->
            <div>
              <item-table
                :data="table1.tableData"></item-table>
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
    export default {
        name: "preBuildProject",
      components: {ItemTable, DataTable, TopHandle},
      data(){
          return{
            table:{
              tableData:[
                {
                  id:'001',
                  name:'alice',
                  age:'20',
                  job:'web',
                  end:"lhasflasdaafasfasfasfsfasfasfasfasfasfasfasfasfasvasasfgasgasgasfasgasfasfkj"
                },{
                  id:'001',
                  name:'alice',
                  age:'20',
                  job:'web',
                  end:"lhasflkj"
                },{
                  id:'001',
                  name:'alice',
                  age:'20',
                  job:'web',
                  end:"lhasflkj"
                },{
                  id:'001',
                  name:'alice',
                  age:'20',
                  job:'web',
                  end:"lhasflkj"
                },{
                  id:'001',
                  name:'alice',
                  age:'20',
                  job:'web',
                  end:"lhasflkj"
                },{
                  id:'001',
                  name:'alice',
                  age:'20',
                  job:'web',
                  end:"lhasflkj"
                }],
              colum:[
                {
                prop:'id',
                label:'申报部门',
                align:'left'
              },{
                prop:'name',
                label:'预算部门',
              },{
                prop:'age',
                label:'项目编码',
                align:'center'
              },{
                prop:'job',
                label:'项目名称',
                align:'center'
              },{
                  prop:'job',
                  label:'项目金额',
                  align:'center'
                },{
                  prop:'job',
                  label:'支持类别',
                  align:'center'
                },{
                  prop:'job',
                  label:'起止日期',
                  align:'center'
                },{
                  prop:'job',
                  label:'申报日期',
                  align:'center'
                },{
                  prop:'job',
                  label:'审批状态',
                  align:'center'
                }],
              selection:true
            },
            table1:{
              tableData:[]
            }
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
        for (let i =0;i<6;i++){
          this.table1.tableData.push(a)
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

        }
      }
    }
</script>

<style scoped>
  .row-class-name{
    margin-top: 10px;
    padding:0 20px;
  }
</style>
<style>

</style>
