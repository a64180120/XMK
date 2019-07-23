<template>
    <section>
      <top-handle title="项目管理在线工作平台"
                  @refresh="refresh()">
        <div class="top">
          <ul >
            <li @click="add()">
              <div>
                <img src="@/assets/images/xz.png">
              </div>
              <span>新增</span>
            </li>
            <li @click="edit()">
              <div>
                <img src="@/assets/images/zj2.png">
              </div>
              <span>修改</span>
            </li>
            <li @click="aprovalItem()">
              <div>
                <img src="@/assets/images/zj3.png">
              </div>
              <span>删除</span>
            </li>
            <li @click="aprovalItem()">
              <div>
                <img src="@/assets/images/xz.png">
              </div>
              <span>复制</span>
            </li>
            <li @click="aprovalItem()">
              <div>
                <img src="@/assets/images/xz.png">
              </div>
              <span>转立项</span>
            </li>
            <li @click="aprovalItem()">
              <div>
                <img src="@/assets/images/sp.png">
              </div>
              <span>送审</span>
            </li>
            <li @click="aprovalItem()">
              <div>
                <img src="@/assets/images/ss_d.png">
              </div>
              <span>取消送审</span>
            </li>
            <li @click="aprovalItem()">
              <div>
                <img src="@/assets/images/xz.png">
              </div>
              <span>申请表打印</span>
            </li>
            <li @click="aprovalItem()">
              <div>
                <img src="@/assets/images/xz.png">
              </div>
              <span>汇总表打印</span>
            </li>
          </ul>

        </div>
      </top-handle>

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
                <el-form-item>
                  <el-button size="mini" @click="fn1">部门申报</el-button>
                </el-form-item>
                <el-form-item style="float: right">
                    <search-input v-model="search"></search-input>
                </el-form-item>
              </el-form>
            </div>
            <!--表格区域-->
            <div v-if="watchTable" class="table-main">
              <section class="dataTable_proBuildProject">
                <el-table
                  :data="table.tableData"
                  :row-class-name="rowClassName"
                  :cell-class-name="cellClassName"
                  :header-cell-class-name="handerCellClassName"
                  @current-change=""
                  :highlight-current-row="highlightCurrentRow"
                  style="overflow: visible;position: static;padding-top: 50px"
                >
                  <el-table-column v-if="table.selection" type="selection"></el-table-column>
                  <el-table-column
                    v-for="(item,idx) in table.column"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    align="center">
                    <template  slot-scope="scope" style="">
                      <div class="table-column-height" :style="{textAlign:item.align}">
                        <span :style="{textAlign:item.align}" >{{scope.row[item.prop]}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </section>

            </div>
            <div v-else class="table-main">
              <item-table
                :data="table1.tableData"
                :monetaryUnit="formList.year"></item-table>
            </div>
          </div>
        </div>
      </div>
      <el-dialog append-to-body
                 :visible.sync="addDialog"
                 width="80%"
                 :close-on-click-modal="false">
        <prerojectnewproject></prerojectnewproject>
      </el-dialog>
    </section>
</template>

<script>
    import TopHandle from "../../components/topNav/topHandle";
    import DataTable from "../../components/dataTable/dataTable";
    import ItemTable from "../../components/itemTable/itemTable";
    import SearchInput from "../../components/searchInput/searchInput";
    import Prerojectnewproject from "../../components/preProjectDialog/index";
    export default {
        name: "preBuildProject",
      components: {Prerojectnewproject, SearchInput, ItemTable, DataTable, TopHandle},
      data(){
          return{
            table:{
              tableData:[{
                name1:'实业中心',
                name2:'实业中心',
                name3:'20190000001',
                name4:'广东劳模疗养基地5年',
                name5:"27.68",
                name6:"主业类",
                name7:"2019.01.01-2019.12.31",
                name8:"27.68",
                name9:"待送审",
              }],
              column:[
                {
                prop:'name1',
                label:'申报部门',
                align:'left',
                width:270,
                function:function () {

                }
              },{
                prop:'name2',
                label:'预算部门',
              },{
                prop:'name3',
                label:'项目编码',
                align:'center',
              },{
                prop:'name4',
                label:'项目名称',
                align:'center'
              },{
                  prop:'name5',
                  label:'项目金额',
                  align:'center',
                  width:130
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
            highlightCurrentRow:false,
            rowNumber:4,
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
            search:'',
            addDialog:false
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
        for (let i =0;i<3;i++){
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
        //测试方法
        fn(){
          this.table.colum.push({
            prop:'end',
            label:'测试',
            align:'left'
          })
        },
        //切换表格样式
        fn1(){
          if (this.watchTable){
            this.watchTable = false
          } else {
            this.watchTable = true
          }
        },
        //新增方法
        add(){
          this.addDialog = true
        },
        edit(){
          this.addDialog = true
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
  .top {
    position: absolute;
    top: 50%;
    left: 50%;
    margin:-5px 0 0 0!important;
    transform: translate(-50%, -50%);
  }
  .top ul li {
    float: left;
    width: 75px;
  }
  .top ul li:hover {
    cursor: pointer;
  }
  .top ul li div img {
    width: 30px;
  }
</style>
<style>

</style>
