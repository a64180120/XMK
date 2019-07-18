<template>
    <section>
      <top-handle title="项目管理在线工作平台"
                  @refresh="refresh()"></top-handle>
      <div>
        <div class="container content-body">
          <div class="formArea">
            <!--搜索栏-->
            <div class="btnArea">
              <el-form>
                <el-form-item></el-form-item>
              </el-form>
            </div>
            <!--表格区域-->
            <el-table
              :data="tableData"
              row-class-name="row-class-name"
              :cell-class-name="cellClassName"
              :header-cell-class-name="handerCellClassName"
              >
              <el-table-column
                prop="id"
                label="编号"
                align="center">

              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"></el-table-column>
              <el-table-column
                prop="age"  label="年龄"></el-table-column>
              <el-table-column
                prop="job" label="工作"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    import TopHandle from "../../components/topNav/topHandle";
    export default {
        name: "preBuildProject",
      components: {TopHandle},
      data(){
          return{
            tableData:[{
              id:'001',
              name:'alice',
              age:'20',
              job:'web'
            },{
              id:'001',
              name:'alice',
              age:'20',
              job:'web'
            },{
              id:'001',
              name:'alice',
              age:'20',
              job:'web'
            },{
              id:'001',
              name:'alice',
              age:'20',
              job:'web'
            },{
              id:'001',
              name:'alice',
              age:'20',
              job:'web'
            },{
              id:'001',
              name:'alice',
              age:'20',
              job:'web'
            }]
          }
      },
      methods:{
        //单元格样式回调
        cellClassName({row,column,rowIndex,columnIndex}){
          if (columnIndex === 0){
            return 'frist-column'
          }else if(columnIndex === Object.getOwnPropertyNames(row).length -2){
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
  /*表格每一行样式*/
  .row-class-name{
    box-shadow: 0 0px 8px #cbcbcb;
    border-radius: 8px;
  }
  .row-class-name:hover{
    background-color: #00b7ee !important;
  }
  .row-class-name:active{
    background-color: #00b7ee !important;
  }
  .el-table__row:hover{
    background-color: #00b7ee !important;
  }
  .row-class-name td{
    border-bottom: none!important;
    border-top: 1px solid #e3e3e3 !important;
    border-bottom: 1px solid #e3e3e3 !important;
    border-right: 1px solid #e3e3e3 !important;
    padding: 5px 0;
  }
  .row-class-name td .cell{
    height: 30px;
    line-height: 30px;
  }
  /*调整表格每一行间距*/
  .el-table__body{
    border-collapse: separate;
    border-spacing:0px 10px ;
  }
  /*第一列数据*/
  .frist-column{
    width: 150px !important;
    border-left: 1px solid #e3e3e3 !important;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  /*最后一列数据*/
  .last-column{
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  /*表头单元格*/
  .thead-cell{
      border-bottom: none !important;
    background-color: #CACACA !important;
    border-right: 1px solid #ffffff !important;
  }
</style>
