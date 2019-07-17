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

              >
              <el-table-column
                prop="id"
                label="编号">

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
  .row-class-name{
    box-shadow: 0 0px 8px #cbcbcb;
    border-radius: 8px;
  }
  .row-class-name td{
    border-top: 1px solid #e3e3e3 !important;
    border-bottom: 1px solid #e3e3e3 !important;
    border-right: 1px solid #e3e3e3 !important;
    padding: 5px 0;
  }
  .row-class-name td .cell{
    height: 30px;
    line-height: 30px;
  }
  .el-table__body{
    border-collapse: separate;
    border-spacing:0px 10px ;
  }
  .frist-column{
    width: 150px !important;
    border-left: 1px solid #e3e3e3 !important;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .last-column{
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
</style>
