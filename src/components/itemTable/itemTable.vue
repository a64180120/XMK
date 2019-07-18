<template>
  <section>
    <el-table
      :data="data"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :header-cell-class-name="handerCellClassName"
      @current-change=""
      :highlight-current-row="highlightCurrentRow"
      height="600"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        prop="item"
        align="center"
        label="预立项项目信息">
        <template   slot-scope="scope" style="">
          <div>
            <div class="top-content">
              <div class="top-left">项目编码：{{scope.row.item.projectCode}}</div>
              <div class="top-center">项目名称：{{scope.row.item.projectName}}</div>
              <div class="top-right">
                <div class="card">{{scope.row.item.projectMoney | NumFormat}}</div>
              </div>
            </div>
            <div class="context">
              <ul>
                <li>
                  <span>项目属性：{{scope.row.item.name1}}</span>
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
      <el-table-column prop="status" width="250" label="审批状态" align="center">
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
    export default {
        name: "itemTable",
      props:{
        data:{
          type:Array,
          default:function () {
            return []
          }
        },
        column:{
          type:Array,
          default:function () {
            return []
          }
        },
      },
      data(){
        return{
          highlightCurrentRow:false,
          rowNumber:4
        }
      },
      methods:{
        //表格行样式回调
        rowClassName({row,rowIndex}){
          return 'row-class-name'
        },
        //单元格样式回调
        cellClassName({row,column,rowIndex,columnIndex}){
          if (columnIndex === 0){
            return 'frist-column'
          }else if(columnIndex === 2){
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
<style lang="scss" scoped>
  .top-content{
    width: 100%;
    background-color: aliceblue;
    height: 50px;
    >.top-left{
      width: 30%;
      line-height: 50px;
      height: 50px;
      font-size: 0.18rem;
      font-family: 宋体;
      display: inline-block;
      text-align: left;
    }
    >.top-center{
      width: 30%;
      line-height: 50px;
      height: 50px;
      font-size: 0.18rem;
      font-family: 宋体;
      display: inline-block;
    }
    >.top-right{
      width: 30%;
      line-height: 50px;
      height: 50px;
      font-size: 0.18rem;
      font-family: 宋体;
      display: inline-block;
      text-align: right;
      float: right;
      >.card{
        background-color: #39b49b;
        border-radius: 15px;
        width: 180px;
        float: right;
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
  .context{
    >ul{
      >li{
        width: 20%;
        float: left;
        text-align: left;
        >span{
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  .status-row{
    text-align: center;
    .status-titile{
    }
    .status-context{
      width: 50px;
      height: 50px;
      display: inline-block;
      border: 2px solid #39b49b;
      border-radius: 25px;
      line-height: 50px;
    }
  }
</style>
<style>
  /*表格每一行样式*/
  .row-class-name{
    box-shadow: 0 0px 8px #cbcbcb;
    border-radius: 8px;
  }
  .row-class-name:hover{
    box-shadow: 0 0px 9px #409eff;
  }
  .el-table__row:hover>td{
    border-top: 1px solid  #00b7ee !important;
    border-bottom: 1px solid  #00b7ee !important;
  }
  .el-table__row:hover>.frist-column{
    border-left: 1px solid #00b7ee !important;
  }
  .el-table__row:hover>.last-column{
    border-right: 1px solid #00b7ee !important;
  }
  .row-class-name td{
    border-bottom: none!important;
    border-top: 1px solid #e3e3e3 !important;
    border-bottom: 1px solid #e3e3e3 !important;
    border-right: 1px solid #e3e3e3 !important;
    padding: 5px 0;
  }
  .row-class-name td .cell{
    width: 100%;;overflow: hidden;word-wrap: break-word;word-break: break-all
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
  .current-row td{
    /*background-color: #409eff !important;*/
  }
  .gutter{
    background-color: #CACACA !important;
  }
</style>
