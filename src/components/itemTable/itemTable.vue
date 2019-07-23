<template>
  <section class="itemTable">
    <el-table
      :data="data"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :header-cell-class-name="handerCellClassName"
      @current-change=""
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
                <div class="card" v-if="monetaryUnit == '1'">{{scope.row.item.projectMoney | NumFormat}}元</div>
                <div class="card" v-if="monetaryUnit == '2'">{{scope.row.item.projectMoney/10000}}万元</div>
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
        monetaryUnit:{
          type:String,
          default:'1'
        }
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
          if (columnIndex === 2){
            return 'thead-last-cell'
          }else {
            return 'thead-cell'
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
      border: 2px solid #3495E8;
      border-radius: 25px;
      line-height: 50px;
      color:#3495E8 ;
    }
  }
  .itemTable{
    padding: 0 30px 0 50px;
    overflow-y: auto;
    height: 630px;
    position: static;
    /*overflow-x: hidden;*/
    top: 10px;
    margin-right: -18px;
  }
</style>
<style>
  /*表格每一行样式*/
  .itemTable .row-class-name{
    box-shadow: 0 0px 8px #cbcbcb;
    border-radius: 8px;
  }
  .itemTable .row-class-name:hover{
    box-shadow: 0 0px 9px #409eff;
  }
  .itemTable .el-table__row:hover>td{
    border-top: 1px solid  #00b7ee !important;
    border-bottom: 1px solid  #00b7ee !important;
  }
  .itemTable .el-table__row:hover>.frist-column{
    border-left: 1px solid #00b7ee !important;
  }
  .itemTable .el-table__row:hover>.last-column{
    border-right: 1px solid #00b7ee !important;
  }
  .itemTable .row-class-name td{
    border-bottom: none!important;
    border-top: 1px solid #e3e3e3 !important;
    border-bottom: 1px solid #e3e3e3 !important;
    border-right: 1px solid #e3e3e3 !important;
    padding: 5px 0;
  }
  .itemTable .row-class-name td .cell{
    width: 100%;;overflow: hidden;word-wrap: break-word;word-break: break-all
  }
  /*调整表格每一行间距*/
  .itemTable .el-table__body{
    border-collapse: separate;
    border-spacing:0px 10px ;
  }
  /*第一列数据*/
  .itemTable .frist-column{
    width: 150px !important;
    border-left: 1px solid #e3e3e3 !important;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  /*最后一列数据*/
  .itemTable .last-column{
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  /*表头单元格*/
  .itemTable .thead-cell{
    border-bottom: none !important;
    background-color: #CACACA !important;
    border-right: 1px solid #ffffff !important;
  }
  /*表头单元格*/
  .itemTable .thead-last-cell{
    border-bottom: none !important;
    background-color: #CACACA !important;
    border-right: 1px solid #CACACA !important;
  }
  .itemTable .current-row td{
    /*background-color: #409eff !important;*/
  }
  .itemTable .gutter{
    background-color: #CACACA !important;
  }
  .itemTable .el-table__body-wrapper{
    overflow: visible;
  }
  .itemTable .el-table__header-wrapper{
    /*position:relative;*/
    overflow:visible;
    position: absolute;
    z-index: 2;
    width: 90%;
    top: 54px;

  }
  .itemTable .el-table__header-wrapper:before{

    width: calc(5% + 20px);
    background-color: #CACACA;
    height: 47px;
    content:"";
    position:absolute;
    left:95%;
    top:0;
  }
  .itemTable .el-table__header-wrapper:after{
    width: 50px;
    background-color: #CACACA;
    height: 47px;
    content:"";
    position:absolute;
    left:-30px;
    top:0;
  }
  .itemTable .el-table__header-wrapper:before{
    left:100%;
  }
  .itemTable .el-table::before {
    background-color: #ffffff;
    height: 4px;
  }
</style>
