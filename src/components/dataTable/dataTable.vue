<template>
    <section>
      <el-table
        :data="data"
        :row-class-name="rowClassName"
        :cell-class-name="cellClassName"
        :header-cell-class-name="handerCellClassName"
        @current-change=""
        :highlight-current-row="highlightCurrentRow"
        height="400"
      >
        <el-table-column v-if="selection" type="selection"></el-table-column>
        <el-table-column
          v-for="(item,idx) in column"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
            <template  slot-scope="scope" style="">
              <div style="width: 100%;min-height: 30px;line-height: 30px" :style="{textAlign:item.align}">
                <p style="width: 100%;min-height: 30px;line-height: 30px" :style="{textAlign:item.align}" >{{scope.row[item.prop]}}</p>
              </div>
            </template>
        </el-table-column>
      </el-table>
    </section>
</template>

<script>
    export default {
        name: "dataTable",
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
        selection:{
          type:Boolean,
          default:false
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
          let length = this.column.length
          if (!this.selection){
            length = this.column.length - 1          }
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
          return 'thead-cell'
          if (columnIndex === 0){

          }
        }
      }
    }
</script>
<style scoped>

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
