<template>
    <section>
      <top-handle title="项目管理在线工作平台"
                  @refresh="refresh()">
        <div class="top">
          <ul >
            <li class="handle" @click="add()">
              <div>
                <img src="@/assets/images/xz.png">
              </div>
              <span>新增</span>
            </li>
            <li class="handle" @click="edit()">
              <div>
                <img src="@/assets/images/zj2.png">
              </div>
              <span>修改</span>
            </li>
            <li class="handle" @click.stop="openAuditfollow()">
              <div>
                <img src="@/assets/images/zj3.png">
              </div>
              <span>删除</span>
            </li>
            <li class="handle" @click="openAuditfollow()">
              <div>
                <img src="@/assets/images/xz.png">
              </div>
              <span>复制</span>
            </li>
            <li class="handle" @click="openAuditfollow()">
              <div>
                <img src="@/assets/images/xz.png">
              </div>
              <span>转立项</span>
            </li>
            <li class="handle" @click="openAuditfollow()">
              <div>
                <img src="@/assets/images/sp.png">
              </div>
              <span>送审</span>
            </li>
            <li class="handle" @click="openAuditfollow()">
              <div>
                <img src="@/assets/images/ss_d.png">
              </div>
              <span>取消送审</span>
            </li>
            <li class="handle" @click="openAuditfollow()">
              <div>
                <img src="@/assets/images/dy.png">
              </div>
              <span>申请表打印</span>
            </li>
            <li class="handle" @click="openAuditfollow()">
              <div>
                <img src="@/assets/images/dy.png">
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
                    :key="idx"
                    align="center">
                    <template  slot-scope="scope" style="">
                      <div v-if="item.fn" class="table-column-height" @click="showDetail(scope.row)"  :style="{textAlign:item.align}">
                        <span :style="{textAlign:item.align}" >{{scope.row[item.prop]}}</span>
                      </div>
                      <div v-else-if="item.money" class="table-column-height" :style="{textAlign:item.align}">
                        <span v-if="formList.year =='1'" :style="{textAlign:item.align}" >{{scope.row[item.prop] |NumFormat}}元</span>
                        <span v-else :style="{textAlign:item.align}" >{{scope.row[item.prop] / 10000}}万元</span>
                      </div>
                      <div v-else class="table-column-height" :style="{textAlign:item.align}">
                        <span :style="{textAlign:item.align}" >{{scope.row[item.prop]}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </section>
            </div>
            <div v-else class="table-main">
              <section class="itemTable_proBuildProject">
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
                            <div class="card" v-if="formList.year == '1'">{{scope.row.item.projectMoney | NumFormat}}元</div>
                            <div class="card" v-if="formList.year == '2'">{{scope.row.item.projectMoney/10000}}万元</div>
                          </div>
                        </div>
                        <div class="context">
                          <ul>
                            <li>
                              <span @click="showDetail(scope.row)">项目属性：{{scope.row.item.name1}}</span>
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
                  <el-table-column prop="status" width="180" label="审批状态" align="center">
                    <template  slot-scope="scope">
                      <div class="status-row" >
                        <div class="status-titile">{{scope.row.status}}(预立项)</div>
                        <div class="status-context">{{scope.row.status}}</div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </section>
            </div>
          </div>
          <div style="position: absolute;bottom: 10px;right: 30px">
            <el-pagination  @size-change="handerSizeChange"
                            @current-change="handerCurrentChange"
                            :curent-page="currentPage"
                            :page-sizes="[100,200,300,400]"
                            :page-size="100" layout="sizes, prev, pager, next, jumper, ->, total, slot" :total="total"></el-pagination>
          </div>
        </div>
      </div>
      <el-dialog append-to-body
                 :visible.sync="addDialog"
                 width="80%"
                 :close-on-click-modal="false">
        <prerojectnewproject></prerojectnewproject>
      </el-dialog>
      <el-dialog  append-to-body
                  :visible.sync="detailDialog"
                  width="50%"
                  :close-on-click-modal="false">
        <item-print></item-print>

      </el-dialog>
      <auditfollow :visible.sync="openfollow"></auditfollow>
    </section>
</template>

<script>
    import TopHandle from "../../components/topNav/topHandle";
    import DataTable from "../../components/dataTable/dataTable";
    import ItemTable from "../../components/itemTable/itemTable";
    import SearchInput from "../../components/searchInput/searchInput";
    import Prerojectnewproject from "../../components/preProjectDialog/index";
    import ItemPrint from "../../components/preProjectDialog/itemPrint";
    import Auditfollow from "../../components/auditFollow/auditfollow";
    export default {
        name: "preBuildProject",
      components: {Auditfollow, ItemPrint, Prerojectnewproject, SearchInput, ItemTable, DataTable, TopHandle},
      data(){
          return{
            table:{
              tableData:[{
                name1:'实业中心',
                name2:'实业中心',
                name3:'20190000001',
                name4:'广东劳模疗',
                name5:3000,
                name6:"主业类",
                name7:"2019.01.01-2019.12.31",
                name8:"27.68",
                name9:"待送审",
              },{
                name1:'实业中心1',
                name2:'实业中心2',
                name3:'201900000013',
                name4:'广东劳模疗1',
                name5:1400,
                name6:"主业类2",
                name7:"2019.01.01",
                name8:"2768",
                name9:"待送审",
              }],
              column:[
                {
                prop:'name1',
                label:'申报部门',
                align:'left',
                width:270,
                fn:true
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
                  width:130,
                  money:true,
                  align:"right"
                },{
                  prop:'name6',
                  label:'支持类别',
                  align:'center'
                },{
                  prop:'name7',
                  label:'起止日期',
                  align:'center',
                  width:270,
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
              status:'1',
              search:''
            },
            search:'',
            addDialog:false,
            detailDialog:false,
            openfollow:false,
            currentPage:1,
            total:400
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
          name4:'广东劳模',
          name5:3000,
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
        },
        showDetail(row){
          this.detailDialog = true
        },
        openAuditfollow(){
          this.openfollow = true;
        },
        //每页条数改变
        handerSizeChange(){

        },
        //当前页改变
        handerCurrentChange(){

        }
      }
    }
</script>

<style scoped>
  .content-body {

  }
  .row-class-name{
    margin-top: 10px;
    padding:0 20px;
  }
  .table-main{
    width: 97%;
    overflow-x: hidden;
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
  }
  .top ul li:hover {
    cursor: pointer;
  }
  .top ul li div img {
    width: 30px;
  }
</style>
<style lang="scss" scoped>

</style>
