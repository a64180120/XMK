<template>
    <section class="dataTable_proBuildProject">
      <el-table
        :data="data"
        :row-class-name="rowClassName"
        :cell-class-name="cellClassName"
        :header-cell-class-name="handerCellClassName"
        @current-change=""
        :highlight-current-row="highlightCurrentRow"
        style="overflow: visible;position: static;padding-top: 50px"
      >
        <el-table-column v-if="selection" type="selection"></el-table-column>
        <el-table-column
          v-for="(item,idx) in column"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
            <template  slot-scope="scope" style="">
              <div class="table-column-height" :style="{textAlign:item.align}">
                <span :style="{textAlign:item.align}" @click="cellClick(scope.row,scope.$index,item,idx)" >{{scope.row[item.prop]}}</span>
              </div>
            </template>
        </el-table-column>
      </el-table>
    </section>
</template>

<script>
  import "../../assets/css/common/dataTable.css";
    export default {
        name: "dataTable",
      props:{
        context:{
          type:Object,
          default:function () {
            return this
          }
        },
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
          if (columnIndex === this.column.length){
            return 'thead-last-cell'
          }else {
            return 'thead-cell'
          }
        },
        //单元格点击事件的回调
        cellClick(a,b,c,d){
          debugger
          this.context.add()
          this.column[d].function(a,b,c,d,this.context)
          this.context.add()
        }
      }
    }
</script>
<style scoped lang="scss">
</style>
<style scoped>
  .column{
    width: 100%;
    min-height: 30px;
    line-height: 30px
  }
</style>
