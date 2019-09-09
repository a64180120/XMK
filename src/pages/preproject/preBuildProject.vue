<template>
  <section>
    <top-handle title="项目管理在线工作平台"
                type="swatchBtn"
                @refresh="refresh()" @swatchList="swatchTable">
      <div class="top">
        <ul>
          <!--&& MenuButton.ProjectMstList_Vue_add ==='True'-->
          <li v-if="formList.swatchBtn !== '3'&& MenuButton.ProjectMstList_Vue_add ==='True' " class="handle"
              @click="add()"
              >
            <div>
              <img src="@/assets/images/xz.png">
            </div>
            <span>新增</span>
          </li>
          <!--&&MenuButton.ProjectMstList_Vue_edit ==='True'-->
          <li v-if="formList.swatchBtn !== '3'&&MenuButton.ProjectMstList_Vue_edit ==='True'" class="handle"
              @click="edit()">
            <div>
              <img src="@/assets/images/zj2.png">
            </div>
            <span>修改</span>
          </li>
          <li class="handle"
              v-if="MenuButton.ProjectMstList_Vue_delete ==='True'"
              @click="deleteItem()">
            <div>
              <img src="@/assets/images/zj3.png">
            </div>
            <span>删除</span>
          </li>
          <li v-if="formList.swatchBtn !== '3' && MenuButton.ProjectMstList_Vue_copy ==='True'" class="handle"
              @click="copyList()">
            <div>
              <img style="height: 33px" src="@/assets/images/fz-1_15.png">
            </div>
            <span>复制</span>
          </li>
          <li v-if="formList.swatchBtn ==='3'&& MenuButton.ProjectMstList_Vue_transfer ==='True'"
              class="handle"
              @click="transferItem()">
            <div>
              <img style="height: 33px" src="@/assets/images/zlx-1_07.png">
            </div>
            <span>转立项</span>
          </li>
          <li v-if="formList.swatchBtn ==='3'&& MenuButton.ProjectMstList_Vue_reject ==='True' "
              class="handle"
              @click="rejectItem()">
            <div>
              <img style="height: 33px" src="@/assets/images/bh-1_20.png">
            </div>
            <span>驳回</span>
          </li>
          <li v-if="formList.swatchBtn ==='1'&& MenuButton.ProjectMstList_Vue_check ==='True'  "
              class="handle"
              @click="subApproval()">
            <div>
              <img style="height: 33px" src="@/assets/images/sp.png">
            </div>
            <span>送审</span>
          </li>

          <li v-if="formList.swatchBtn ==='1'&& MenuButton.ProjectMstList_Vue_uncheck ==='True' "
              class="handle"
              @click="unSubApproval()">
            <div>
              <img style="height: 33px" src="@/assets/images/ss_d.png">
            </div>
            <span>取消送审</span>
          </li>
          <li v-if="(formList.swatchBtn ==='2'||formList.swatchBtn ==='2')&& MenuButton.ProjectMstList_Vue_report ==='True'"
              class="handle"
              @click="report()">
            <div>
              <img style="height: 33px" src="@/assets/images/sb-1_05.png">
            </div>
            <span>上报</span>
          </li>
          <li v-if="(formList.swatchBtn ==='1'||formList.swatchBtn ==='2')&& MenuButton.ProjectMstList_Vue_invalid ==='True'"
              class="handle"
              @click="abolish()">
            <div>
              <img style="height: 33px" src="@/assets/images/zf.png">
            </div>
            <span>作废</span>
          </li>
          <li v-if="formList.swatchBtn ==='1'||formList.swatchBtn ==='2'"
              class="handle"
              @click="moreTip()">
            <el-popover placement="bottom-end" width="500">
              <div class="inner-top">
                <ul>
                  <li class="handle"
                      v-if="MenuButton.ProjectMstList_Vue_printfSB ==='True'"
                      @click="applyTablePrint()">
                    <div>
                      <img style="height: 33px" src="@/assets/images/sqbdyb-1_07.png">
                    </div>
                    <span>申请表打印</span>
                  </li>
                  <li class="handle"
                      v-if="MenuButton.ProjectMstList_Vue_printfHZ ==='True'"
                      @click="sumTablePrint()">
                    <div>
                      <img style="height: 33px" src="@/assets/images/sqbdyb-1_07.png">
                    </div>
                    <span>汇总表打印</span>
                  </li>
                </ul>
              </div>

              <div slot="reference">
                <div>
                  <img style="height: 33px" src="@/assets/images/nav.svg">
                </div>
                <span>更多</span>
              </div>
            </el-popover>
          </li>
        </ul>

      </div>
    </top-handle>

    <div>
      <div class="container content-body"
           style="overflow: auto" :style="{minHeight:formAreaHeight}">
        <div class="formArea">
          <!--搜索栏-->
          <div class="btnArea"
               style="margin-bottom: 15px">
            <el-form :inline="true">
              <el-form-item label="" v-if="WorkFlow ===0">
                <el-select  v-model="formList.swatchBtn"
                           @change="swatchPage()"
                           size="mini">
                  <el-option value="2"
                             label="部门申报"></el-option>
                  <el-option value="3"
                             label="汇总审批"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单位：">
                <el-select v-model="formList.year"
                           size="mini"
                           @change="swatchUnit()"
                           class="money-dw">
                  <el-option value="2"
                             label="万元">万元</el-option>
                  <el-option value="1"
                             label="元">元</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支出类别：">
                <el-select v-model="formList.payOutType"
                           size="mini"
                           @change="query()">
                  <el-option value="0"
                             label="全部"></el-option>
                  <el-option v-for="(item,idx) in payOutType"
                             :key="idx"
                             :value="item.Dm"
                             :label="item.Mc"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批状态：" v-show="formList.swatchBtn === '1'">
                <el-select v-model="formList.approvalStatus"
                           size="mini"
                           @change="query()">
                  <el-option v-for="(item,idx) in aplStaGrop" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: right">
<!--                <search-input v-model="formList.FProjName"-->
<!--                              @btnClick="searchInput()"></search-input>-->
                <el-input size="mini" v-model="formList.FProjName" clearable class="searchIpt"></el-input>
                  <el-button size="mini" @click="searchInput()" type="primary" class="searchBtn">搜索</el-button>
                <el-popover palcement="bottom" width="500" trigger="click" v-model="popvisiable">
                  <div class="seniorSearch">
                    <div>
                      <span>高级查询</span>
                      <span class="el-icon-close closeSenior" @click="popvisiable=false"></span>
                    </div>
                    <table>
                      <colgroup>
                        <col width="15%">
                        <col width="15%">
                        <col width="5%">
                        <col width="15%">
                        <col width="15%">
                        <col width="35%">
                      </colgroup>
                      <tr>
                        <td>项目名称</td>
                        <td colspan="5"><!--<el-input size="mini"  v-model="seniorSearch.FDeclarationDept"  placeholder="请输入申报部门"></el-input>-->
                          <el-input size="mini" v-model="seniorSearch.FProjName" placeholder="请输入项目名称"></el-input>
                        </td>
                      </tr>
                      <tr>
                        <td>项目编码</td>
                        <td colspan="5"><el-input size="mini"  v-model="seniorSearch.FProjCode" placeholder="请输入项目编码"></el-input></td>
                      </tr>
                      <tr>
                        <td>申报部门</td>
                        <td colspan="3">
                          <el-select size="mini" v-model="seniorSearch.FDeclarationDept" placeholder="请选择申报部门">
                            <el-option v-for="(item,idx) in FDeclarationDeptGroup" :value="item.deptCode" :label="item.deptName"></el-option>
                          </el-select>
                        </td>
                        <td>预算部门</td>
                        <td colspan="3">
                          <el-select size="mini" v-model="seniorSearch.FBudgetDept" placeholder="请选择预算部门">
                            <el-option v-for="(item,idx) in FBudgetDeptGroup" :value="item.OCode" :label="item.OName"></el-option>
                          </el-select>
                        </td>
                      </tr>
                      <tr>
                        <td>项目金额</td>
                        <td><el-input size="mini" v-model="seniorSearch.FProjAmountBegin"></el-input></td>
                        <td>至</td>
                        <td><el-input size="mini"  v-model="seniorSearch.FProjAmountEnd"></el-input></td>
                        <td>绩效评价</td>
                        <td colspan="3">
                          <el-select size="mini" v-model="seniorSearch.FIfPerformanceAppraisal" placeholder="请选择绩效评价">
                            <el-option v-for="(item,idx) in FIfPerformanceAppraisalGroup" :key="idx" :value="item.value" :label="item.label"></el-option>
                          </el-select>
                        </td>
                      </tr>
                      <tr>
                        <!-- <td>项目级别</td>
                         <td colspan="3"><el-input size="mini" v-model="seniorSearch.PLevel" placeholder="请输入项目级别"></el-input></td>-->
                        <td>申报日期</td>
                        <td colspan="5">
                          <el-date-picker size="mini"
                                          style="width: 100%;"
                                          v-model="seniorSearch.FTime"
                                          type="daterange"
                                          range-separator="至"
                                          start-placeholder="开始日期"
                                          end-placeholder="结束日期">
                          </el-date-picker>
                        </td>
                      </tr>
                    </table>
                    <div>
                      <ul>
                        <li>
                          <el-button class="btn" size="mini" @click="seniorReset()">清空</el-button>
                        </li>
                        <li>
                          <el-button class="btn" size="mini" @click="getTableData()">搜索</el-button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <el-button type="success" size="mini" slot="reference" class="searchSer">高级</el-button>
                </el-popover>
              </el-form-item>
            </el-form>
          </div>
          <!--表格区域-->
          <div></div>
          <div v-if="watchTable"
               class="dataTable_list">
            <div class="start"></div>
            <div class="end"></div>
            <section>
              <el-table :data="table.tableData"
                        :row-class-name="rowClassName"
                        :cell-class-name="cellClassName"
                        @select="rowSelect"
                        @select-all="rowSelectAll"
                        :header-cell-class-name="handerCellClassName"
                        @current-change=""
                        :highlight-current-row="highlightCurrentRow"
                        style="width: 100%"
                        border
                        :height="tableHeight">
                <el-table-column label="" prop="" type="selection" width="35" align="center"></el-table-column>
                <el-table-column label="" prop="" width="35" type="index" label="序号" :index="function(index) {
                  return index+1
                }" ></el-table-column>
                <el-table-column v-for="(item,idx) in table.column"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :width="item.width"
                                 :key="idx"
                                 align="center">
                  <template slot-scope="scope"
                            style="">

                    <div style="" v-if="item.other === 'function'"
                         class="table-column-height"
                         @click="cellClick(scope)"
                         :style="{textAlign:item.align}">
                      <span :style="{textAlign:item.align}"
                            class="cell-click">{{scope.row[item.prop]}}</span>
                    </div>
                    <div v-else-if="item.other === 'money'"
                         class="table-column-height"
                         :style="{textAlign:item.align}">
                      <span v-if="formList.year =='1'"
                            :style="{textAlign:item.align}">{{scope.row[item.prop] |NumFormat}}</span>
                      <span v-else
                            :style="{textAlign:item.align}">{{scope.row[item.prop] / 10000|NumFormat }}</span>
                    </div>
                    <div v-else-if="item.other ==='start-end'"
                         class="table-column-height"
                         :style="{textAlign:item.align}">
                      <span>{{scope.row[item.prop1].replace('T00:00:00','')}}至</span>
                      <span>{{scope.row[item.prop2].replace('T00:00:00','')}}</span>
                    </div>
                    <div v-else-if="item.other ==='time'">
                      <span>{{scope.row[item.prop].split('T',9)[0]}}</span>
                    </div>
                    <div v-else-if="item.other ==='status-click'">
                      <span v-html="formatter(scope)"
                            @click="cellClick(scope)"
                            class="cell-click"></span>
                    </div>
                    <div v-else-if="item.other ==='status'">
                      <span v-html="formatter(scope)"
                            class=""></span>
                    </div>
                    <div v-else
                         class="table-column-height"
                         :style="{textAlign:item.align}">
                      <span :style="{textAlign:item.align}">{{scope.row[item.prop]}}</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </section>
          </div>
          <div v-else
               class="table-main">
            <section class="itemTable_proBuildProject" :style="{paddingRight:paddRight,height:tableHeight}">
              <el-table :data="table.tableData"
                        @select="rowSelect"
                        @select-all="rowSelectAll"
                        :row-class-name="rowClassName"
                        :cell-class-name="itemCellClassName"
                        :header-cell-class-name="itemHanderCellClassName"
                        :highlight-current-row="highlightCurrentRow"
                        style="overflow: visible;position: static;padding-top: 50px">
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column
                  label="序号"
                  type="index" :index="function(index) {
                                   return index +1
                                 }" width="40"></el-table-column>
                <el-table-column prop="item"
                                 align="center"
                                 label="预立项项目信息">
                  <template slot-scope="scope">
                    <div>
                      <div class="top-content">
                        <div class="top-left">项目编码：<span class="top-left-code" @click="showDetail(scope)">{{scope.row.FProjCode}}</span></div>
                        <div class="top-center" style="text-align: left">项目名称：
                          <el-tooltip :content="scope.row.FProjName">
                            <span style="font-family: 宋体">{{scope.row.FProjName}}</span>
                          </el-tooltip>
                        </div>
                        <div class="top-right">
                          <div class="card"
                               v-if="formList.year == '1'">￥{{scope.row.FProjAmount | NumFormat}}元</div>
                          <div class="card"
                               v-if="formList.year == '2'">￥{{(scope.row.FProjAmount/10000) | NumFormat}}万元</div>
                        </div>
                      </div>
                      <div class="context">
                        <ul>
                          <li>
                            <span @click="showDetail(scope.row)">项目属性：<el-tooltip :content="scope.row.FProjAttr_EXName">
                                <span>{{scope.row.FProjAttr_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>存续期限：<el-tooltip :content="scope.row.FDuration_EXName">
                                <span>{{scope.row.FDuration_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>项目级别：<el-tooltip :content="scope.row.FLevel_EXName">
                                <span>{{scope.row.FLevel_EXName}}</span>
                              </el-tooltip>
                            </span>
                          </li>
                          <li>
                            <span>起止日期：<el-tooltip :content="scope.row.FStartDate.replace('T00:00:00','')+'至'+scope.row.FEndDate.replace('T00:00:00','')">
                                  <span>{{scope.row.FStartDate.replace('T00:00:00','')}}至{{scope.row.FEndDate.replace('T00:00:00','')}}</span>
                              </el-tooltip>
                            </span>
                          </li>
                          <li>
                            <span>支出类别：<el-tooltip :content="scope.row.FExpenseCategory_EXName">
                                <span>{{scope.row.FExpenseCategory_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>效绩评价：<el-tooltip :content="scope.row.FIfPerformanceAppraisal ===1?'否':'是'">
                                <span>{{scope.row.FIfPerformanceAppraisal ===1?'否':'是'}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>申报部门：<el-tooltip :content="scope.row.FDeclarationDept_EXName">
                                <span>{{scope.row.FDeclarationDept_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>预算部门：<el-tooltip :content="scope.row.FBudgetDept_EXName">
                                <span>{{scope.row.FBudgetDept_EXName}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>申报日期：<el-tooltip :content="scope.row.FDateofDeclaration.split('T',9)[0]">
                                <span>{{scope.row.FDateofDeclaration.split('T',9)[0]}}</span>
                              </el-tooltip></span>
                          </li>
                          <li>
                            <span>申报进度：<span v-if="scope.row.FType+scope.row.FVerNo ==='c0001'">
                              <el-tooltip content="年初新增">
                                <span>年初新增</span>
                              </el-tooltip>
                            </span>
                              <span v-else-if="scope.row.FType+scope.row.FVerNo ==='c0002'">
                                <el-tooltip content="年中调整">
                                    <span>年中调整</span>
                                 </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FType+scope.row.FVerNo ==='z0001'">
                                  <el-tooltip content="年中新增">
                                    <span>年中新增</span>
                                 </el-tooltip>
                              </span>
                              <span v-else>无</span>
                            </span>
                          </li>
                          <li>
                            <span>项目状态：<span v-if="scope.row.FProjStatus ===1">
                              <el-tooltip content="预立项">
                                <span>预立项</span>
                              </el-tooltip>
                            </span>
                              <span v-else-if="scope.row.FProjStatus ===2">
                                <el-tooltip content="项目立项">
                                   <span>项目立项</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===3">
                                <el-tooltip content="项目执行">
                                   <span>项目执行</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===4">
                                <el-tooltip content="项目调整">
                                   <span>项目调整</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===5">
                                <el-tooltip content="项目暂停">
                                   <span>项目暂停</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===6">
                                <el-tooltip content="项目终止">
                                   <span>项目终止</span>
                                </el-tooltip>
                              </span>
                              <span v-else-if="scope.row.FProjStatus ===7">
                                  <el-tooltip content="项目关闭">
                                   <span>项目关闭</span>
                                </el-tooltip>
                              </span>
                              <span v-else>无</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="status"
                                 width="180"
                                 label="审批状态"
                                 align="center">
                  <template slot-scope="scope">
                    <div class="status-row">
                      <div class="status-titile">
                        <span v-if="WorkFlow === 1">
                          <span v-if="scope.row.FApproveStatus ==1">待送审</span>
                          <span v-if="scope.row.FApproveStatus ==2">审批中</span>
                          <span v-if="scope.row.FApproveStatus ==3">审批成功</span>
                          <span v-if="scope.row.FApproveStatus ==4">退回</span>
                          <span v-if="scope.row.FApproveStatus ==5">暂存</span>
                        </span>
                        <span v-else>
                           <span v-if="scope.row.FApproveStatus ==1">部门申报</span>
                           <span v-if="scope.row.FApproveStatus ==2">汇总审批</span>
                           <span v-if="scope.row.FApproveStatus ==3">审批通过</span>
                           <span v-if="scope.row.FApproveStatus ==4">已退回</span>
                           <span v-if="scope.row.FApproveStatus ==5">暂存</span>
                        </span>
                        (<span v-if="scope.row.FProjStatus ===1">预立项</span>
                        <span v-if="scope.row.FProjStatus ===2">项目立项</span>
                        <span v-if="scope.row.FProjStatus ===3">项目执行</span>
                        <span v-if="scope.row.FProjStatus ===4">项目调整</span>
                        <span v-if="scope.row.FProjStatus ===5">项目暂停</span>
                        <span v-if="scope.row.FProjStatus ===6">项目终止</span>
                        <span v-if="scope.row.FProjStatus ===7">项目关闭</span>)</div>
                      <div class="status-context" @click="getAppvalProcList(scope.row)">
                        <span v-if="WorkFlow === 1">
                          <span v-if="scope.row.FApproveStatus ==1">待送审</span>
                          <span v-if="scope.row.FApproveStatus ==2">审批中</span>
                          <span v-if="scope.row.FApproveStatus ==3">审批成功</span>
                          <span v-if="scope.row.FApproveStatus ==4">退回</span>
                          <span v-if="scope.row.FApproveStatus ==5">暂存</span>
                        </span>
                        <span v-else>
                          <span v-if="scope.row.FApproveStatus ==1">部门申报 </span>
                           <span v-if="scope.row.FApproveStatus ==2">汇总审批</span>
                           <span v-if="scope.row.FApproveStatus ==3">审批通过</span>
                           <span v-if="scope.row.FApproveStatus ==4">待执行</span>
                           <span v-if="scope.row.FApproveStatus ==5">暂存</span>
                        </span>

                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </section>
          </div>
        </div>
        <div style="position: absolute;bottom: 10px;right: 30px">
          <el-pagination @size-change="handerSizeChange"
                         @current-change="handerCurrentChange"
                         :curent-page="page.currentPage"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         layout="total,sizes,prev,pager,next,jumper"
                         :total="page.total"></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="addDialog"
               width="90%"
               @close="addDialog =false"
               :close-on-click-modal="false"
               v-if="addDialog"
               class="applyDetailDialog">
      <div slot="title"
           class="applyDetailTitle">
        <span>新增项目</span>
      </div>
      <prerojectnewproject  @refresh='refresh' :workFlow="WorkFlow"></prerojectnewproject>
    </el-dialog>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="editDialog"
               v-if="editDialog"
                @close="editDialog = false"
               width="90%"
               :close-on-click-modal="false"
               class="applyDetailDialog">
      <div slot="title"
           class="applyDetailTitle">
        <span>修改项目</span>
      </div>
      <edit  :data="editDetail" :workFlow="WorkFlow" @refresh="refresh"></edit>
    </el-dialog>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="copyDialog"
               v-if="copyDialog"
               @close="copyDialog = false"
               width="90%"
               :close-on-click-modal="false"
               class="applyDetailDialog">
      <div slot="title"
           class="applyDetailTitle">
        <span>复制项目</span>
      </div>
      <copy :data="copyDetail" :workFlow="WorkFlow" @refresh="refresh"></copy>
    </el-dialog>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="detailDialog"
               width="50%"
               :close-on-click-modal="false"
               class="detailDialog">
      <div slot="title"
           class="applyDetailTitle">
        <span>申报表打印</span>
      </div>
      <item-print :data="itemDetail" @closeDetail="detailDialog = false"></item-print>

    </el-dialog>
    <!--送审-->
    <go-approval v-if="approvalDataS.openDialog"
                 :data="approvalDataS"
                 @delete="handleDelete"></go-approval>
    <auditfollow :visible.sync="openfollow"></auditfollow>
    <!--查看审批流程-->
    <auditfollow :visible.sync="auditDialog"
                 auditType="004"
                 :auditMsg="auditMsg"></auditfollow>
    <!--汇总表打印-->
    <sum-tab-print ref="sumTabPrint" :data="sumtabData" :totalAmount="totalFProjAmount"></sum-tab-print>
    <!--申请表打印-->
    <apply-tab-print ref="applyTabPrint" :data="applytabData"></apply-tab-print>
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
import { mapState } from 'vuex'
import Edit from "../../components/preProjectDialog/edit";
import GoApproval from "./component/goApproval";
import Copy from "./component/copy";
import SumTabPrint from "./component/sumTabPrint";
import ApplyTabPrint from "./component/applyTabPrint";
export default {
  name: "preBuildProject",
  components: {
    ApplyTabPrint,
    SumTabPrint,
    Copy,
    GoApproval,
    Edit, Auditfollow, ItemPrint, Prerojectnewproject, SearchInput, ItemTable, DataTable, TopHandle },
  data () {
    let that = this
    return {
      WorkFlow:0,//是否启用审批流
      table: {
        tableData: [],
        column: [
          {
            prop: 'FProjCode',
            label: '项目编码',
            align: 'center',
            width:165,
            other: 'function',
            fn: function (scope) {
              that.showDetail(scope)
            }
          }, {
            prop: 'FProjName',
            label: '项目名称',
            align: 'center',
            width:300,

          },
          {
            prop: 'FProjAmount',
            label: '项目金额(元)',
            width: 160,
            other: 'money',
            align: "right"
          },
          {
            prop: 'FDeclarationDept_EXName',
            label: '申报部门',
            width:160
          }, {
            prop: 'FBudgetDept_EXName',
            label: '预算部门',
            width:160
          },
          {
            prop: 'FExpenseCategory_EXName',
            label: '支出类别',
            align: 'center',
            width:180
          }, {
            prop1: 'FStartDate',
            prop2: 'FEndDate',
            label: '起止日期',
            align: 'center',
            width: 300,
            other: "start-end"
          }, {
            prop: 'FDateofDeclaration',
            label: '申报日期',
            align: 'center',
            other: 'time',
            width: 160,
          }, {
            prop: 'FType',
            label: '申报进度',
            align: 'center',
            other: 'status',
            width: 160,
            format:function (scope) {
              if (scope.row.FType+scope.row.FVerNo ==='c0001') {
                return '年初新增'
              } else if (scope.row.FType+scope.row.FVerNo ==='c0002'){
                return '年中调整'
              } else if (scope.row.FType+scope.row.FVerNo ==='z0001'){
                return '年中新增'
              } else {
                return "无"
              }
            }
          },  {
            prop: 'FProjStatus',
            label: '项目状态',
            align: 'center',
            other: 'status',
            width: 160,
            format:function (scope) {
              let MC = '';
              if (scope.row.FProjStatus ===1) {
                MC = '预立项'
              } else if (scope.row.FProjStatus ===2) {
                MC = '项目立项'
              } else if (scope.row.FProjStatus ===3) {
                MC = '项目执行'
              } else if (scope.row.FProjStatus ===4) {
                MC = '项目调整'
              } else if (scope.row.FProjStatus ===5) {
                MC = '项目暂停'
              } else if (scope.row.FProjStatus ===6) {
                MC = '项目终止'
              } else if (scope.row.FProjStatus ===7) {
                MC = '项目关闭'
              }
              return MC
            }
          }, {
            prop: 'FApproveStatus',
            label: '审批状态',
            width: 160,
            align: 'center',
            other: 'status-click',
            format: function (scope) {
              if (that.WorkFlow === 1){
                if (scope.row.FApproveStatus == 1) {
                  return '<span>待送审</span>'
                } else if (scope.row.FApproveStatus == 2) {
                  return '<span>审批中</span>'
                } else if (scope.row.FApproveStatus == 3) {
                  return '<span>审批成功</span>'
                } else if (scope.row.FApproveStatus == 4) {
                  return '<span>退回</span>'
                }else if (scope.row.FApproveStatus == 5) {
                  return '<span>暂存</span>'
                }
              }else{
                if (scope.row.FApproveStatus == 1) {
                  return '<span>部门申报</span>'
                } else if (scope.row.FApproveStatus == 2) {
                  return '<span>汇总审批</span>'
                } else if (scope.row.FApproveStatus == 3) {
                  return '<span>已审批</span>'
                } else if (scope.row.FApproveStatus == 4) {
                  return '<span>待执行</span>'
                }else if (scope.row.FApproveStatus == 5) {
                  return '<span>暂存</span>'
                }
              }

            },
            fn: function (scope) {
              console.log(scope)

              that.getAppvalProcList(scope.row)
            }
          }],
        selection: true,
        index:true
      },
      highlightCurrentRow: false,
      rowNumber: 4,
      table1: {
        tableData: []
      },
      watchTable: false,
      payOutType: [],
      formList: {
        swatchBtn: '2',
        year: "1",
        payOutType: '0',
        approvalStatus: '0',
        FProjName: ''
      },
      popvisiable:"",
      seniorSearch:{//高级筛选
        FProjName:'',//项目名称
        FProjCode:'',//项目编码
        FDeclarationDept:'',//申报部门
        FBudgetDept:'',//预算部门
        FProjAmountBegin:'',//金额开始
        FProjAmountEnd:'',//金额结束
        FIfPerformanceAppraisal:'',//是否绩效评价
        FTime:[],//起止日期
      },
      FBudgetDeptGroup:[],//预算部门下拉项
      FDeclarationDeptGroup:[],//申报部门下拉项
      FIfPerformanceAppraisalGroup:[{
        value:1,
        label:"是"
      },{
        value:2,
        label:"否"
      }],

      search: '',
      addDialog: false,
      editDialog:false,
      copyDialog:false,
      detailDialog: false,
      openfollow: false,
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 20,
        pageSizes: [20, 30, 50, 100]
      },
      itemDetail: {},//缓存详情行的值
      selection: [],//选中表格行的值
      editDetail:{},//缓存修改行的值
      copyDetail:{},//缓存复制行的值
      //送审
      approvalDataS: {
        openDialog: false,
        data: {},
        subData: [] //审批流获取
      },
      auditMsg:[],//审批流数据
      auditDialog:false,

      paddRight:'30px',
      //汇总表打印
      //开关弹框
      sumtabDialog:false,
      //汇总数据
      sumtabData:[],
      //汇总金额
      totalFProjAmount:0,

    //  申请表数据
      applytabData:[],

      aplStaGrop:[],
      //表格最大高度
      tableHeight:"630px",
      formAreaHeight:'650px',

    }
  },
  computed: {
    ...mapState({
      OrgCode: state => state.user.orgcode,
      UserId: state => state.user.userid,
      Orgid: state => state.user.orgid,
      Year: state => state.user.year,
      MenuButton: state => state.user.menubutton,
      UserCode: state => state.user.usercode
    })
  },
  created () {
    this.getTableData();

  },
  mounted () {
    this.updateTitle();
    this.getWorkFlow()
    this.getExpenseCategoryList()
    this.getBudegDepart();
    this.getDeclareList();
    console.log(this.MenuButton);
    let clientHeight = document.body.clientHeight
    console.log(clientHeight)
    if (clientHeight>900){
      this.tableHeight = '630px'
      this.formAreaHeight = '750px'
    }else if(clientHeight<900 && clientHeight>600){
      this.tableHeight = '480px'
      this.formAreaHeight = '600px'
    }


  },
  methods: {
    //修改title
    updateTitle (){
      let title = document.getElementsByTagName('title')[0];
      title.innerText = "预立项";
    },
    //获取过程是否启用工作流
    getWorkFlow(){
      let data = {
        orgCode:this.OrgCode,
        orgid:this.Orgid,
        workType:'004'
      }
      this.getAxios('/GQT/QTSysSetApi/GetWorkFlow',data).then(res=>{

        if (res.Status ==='success') {
          this.WorkFlow =res.Data;
          console.log('---', this.WorkFlow)
          if (res.Data === 0) {
            this.formList.swatchBtn = "2";
            this.formList.approvalStatus = 1
            this.getTableData()
          }else {
            this.formList.swatchBtn = "1"
          }
          if (res.Data === 0){
            this.aplStaGrop = [{
              value:'0',
              label:'全部'
            },{
              value:'1',
              label:'待执行'
            },{
              value:'3',
              label:'项目执行'
            }]
          }else if (res.Data === 1){
            this.aplStaGrop = [
              {
                value:'0',
                label:'全部'
              },{
                value:'1',
                label:'待上报'
              },{
                value:'2',
                label:'审批中'
              },{
                value:'3',
                label:'审批通过'
              },{
                value:'4',
                label:'已退回'
              },{
                value:'5',
                label:'暂存'
              }]
          }
        }
      }).catch(err=>{

      })
    },
    //获取预算部门
    getBudegDepart(){
      let data  = {
        orgid:this.Orgid,
        uid:this.UserId
      }
      this.getAxios('/GQT/CorrespondenceSettingsApi/GetDeptByUnit',data).then(res=>{
        this.FBudgetDeptGroup = res.Record
        console.log( res.Record)
      }).catch(err=>{
        this.$msgBox.error('请求错误')
      })
    },
    //获取申报部门集合
    getDeclareList () {
      let data = {
        orgCode: this.OrgCode,
        usercode: this.UserCode ? this.UserCode : '9999',
        orgid: this.Orgid
      }
      let that= this
      this.getAxios('/GQT/CorrespondenceSettingsApi/GetFDeclarationUnit', data)
        .then(res => {
          console.log(res)
          if (res.Status === 'success') {
            let arr = {
              deptCode:res.deptCode,
              deptName:res.deptName
            }
            this.$set(this.FDeclarationDeptGroup,0,arr)
          }else {
            this.$msgBox.error(res.Msg)
          }
        })
        .catch(err => { })
    },
    //get获取表格数据
    getTableData () {
      let data = {
        OrgCode: this.OrgCode,//组织编码
        Ucode: this.UserCode,//用户账号
        Year: this.Year,//年度
        ProjStatus: 1,//（1-预立项 ；2-立项； 其他）
        SearchValue: this.formList.FProjName,//搜索框的值
        FExpenseCategory: this.formList.payOutType,//支出类型（0-全部）
        FApproveStatus: this.formList.approvalStatus,//审批状态 （0-全部， 1-待上报， 2-审批中，3-审批通过， 4-已退回）
        PageIndex: this.page.currentPage - 1,  //页码
        PageSize: this.page.pageSize,//每页条数

        //高级搜索
        FProjName:this.seniorSearch.FProjName,//高级搜索项目名称
        FProjCode:this.seniorSearch.FProjCode,//高级搜索项目编码
        FDeclarationDept:this.seniorSearch.FDeclarationDept,//高级搜索申报部门
        FBudgetDept:this.seniorSearch.FBudgetDept,//高级搜索预算部门
        FProjAmountBegin:this.seniorSearch.FProjAmountBegin,//高级搜索项目开始金额
        FProjAmountEnd:this.seniorSearch.FProjAmountEnd,//高级搜索项目结束金额
        FIfPerformanceAppraisal:this.seniorSearch.FIfPerformanceAppraisal,//高级搜索绩效评价
        FStartDate:this.seniorSearch.FTime?this.seniorSearch.FTime[0]:'',//高级搜开始时间
        FEndDate:this.seniorSearch.FTime?this.seniorSearch.FTime[0]:'',//高级搜索绩结束时间

      };
      this.getAxios('/GXM/ProjectMstApi/GetProjectMstList', data).then(res => {
        if (res.Record) {
          this.table.tableData = res.Record
          this.page.total = res.totalRows
          console.log(res.Record)
          if (this.selection.length !==0){
            for (let i in this.selection){
              this.selection.splice(i,1)
            }
          }
        } else {
          this.$msgBox.error(res.Msg)
        }
      }).catch(err => {
        this.$msgBox.error("数据获取失败")
      })
    },
    //获取支出类型集合
    getExpenseCategoryList () {
      this.getAxios('/GQT/SysSettingApi/GetExpenseCategoryList ').then(res => {
        if (res.Status === "success") {
          this.payOutType = res.Data
        }
        console.log(res)
      })
    },
    //表格行样式回调
    rowClassName ({ row, rowIndex }) {
      return 'row-class-name'
    },
    //单元格样式回调
    cellClassName ({ row, column, rowIndex, columnIndex }) {
      let length = this.table.column.length
      if (!this.table.selection) {
        length = this.table.column.length - 2      }
      if (columnIndex === 0) {
        return 'frist-column'
      }else if(columnIndex === 1){
        return 'secend-column'
      }
      else if (columnIndex === length +1) {
        return 'last-column'
      } else {
        return 'middle-column'
      }
    },
    //表头单元格回调
    handerCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === this.table.column.length +1) {
        return 'thead-last-cell'
      } else if (columnIndex === 0){
        return 'thead-frist'
      } else if (columnIndex === 1){
        return 'thead-second'
      }else {
        return 'thead-cell'
      }
    },
    //单元格样式回调
    itemCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'frist-column'
      }else if(columnIndex === 1){
        return 'secend-column'
      }
      else if (columnIndex === 3) {
        return 'last-column'
      } else {
        return 'middle-column'
      }
    },
    //表头单元格回调
    itemHanderCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3) {
        return 'thead-last-cell'
      }else if (columnIndex === 0){
        return 'thead-frist'
      }else if (columnIndex === 1){
        return 'thead-second'
      } else {
        return 'thead-cell'
      }
    },
    //每页条数改变
    handerSizeChange (val) {
      console.log(val)
      this.page.pageSize = val
      this.getTableData()
    },
    //当前页改变
    handerCurrentChange (val) {
      console.log(val)
      this.page.currentPage = val
      this.getTableData()
    },
    //
    rowSelect (selection, row) {
      this.selection = selection
      console.log(selection)
    },
    rowSelectAll (selection) {
      this.selection = selection
    },
    //自定义列数据替换的回调
    formatter (scope) {
      let column = scope.column.label;
      let index = -1
      for (let key in this.table.column) {
        if (this.table.column[key].label === column) {
          index = key
        }
      }
      return this.table.column[index].format(scope)
    },
    //自定义单元格的回调
    cellClick (scope) {
      let column = scope.column.label;
      let index = -1
      for (let key in this.table.column) {
        if (this.table.column[key].label === column) {
          index = key
        }
      }
      return this.table.column[index].fn(scope)
    },
    //切换表格样式
    swatchTable () {
      if (this.watchTable) {
        this.watchTable = false
        this.formAreaHeight = '750px'
      } else {
        this.watchTable = true
      }
    },
    //新增方法
    add () {
      this.addDialog = true
    },
    edit () {
      if (this.selection.length === 0){
        this.$msgBox.error('请选择需要修改的单据')
      } else if (this.selection.length === 1){
        if (this.selection[0].FApproveStatus ==='1' ||this.selection[0].FApproveStatus ==='5') {
          this.editDetail = this.selection[0]
          this.editDialog = true
        } else {
          this.$msgBox.error('只能修改状态为待审批or暂存单据')
        }
      } else {
        this.$msgBox.error('只能选择一条单据进行修改')
      }
    },
    deleteItem () {
      if (this.selection.length === 0) {
        this.$msgBox.error('请选择数据进行删除')
        return
      } else if (this.selection.length !== 1 && this.selection.length !== 0) {
        this.$msgBox.error('只能选择一行数据进行删除')
        return
      } else {
        this.$confirm('确定删除该记录？','提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消'
        }).then(()=>{
          let data = {
            FProjCode: this.selection[0].FProjCode,
            FProjPhId: this.selection[0].PhId,
            PersistentState:'3'
          };
          this.postAxios('/GXM/ProjectMstApi/PostDeleteProject', data).then(res => {
            if (res.Status === 'success') {
              this.$msgBox.show('删除成功')
              this.getTableData()
              this.selection =[]
            } else {
              this.$msgBox.error(res.Msg)
              this.selection =[]
            }
          }).catch(err => {
            this.$msgBox.error('请求失败')
          })
        }).catch(()=>{

        })
      }
    },
    //显示详情
    showDetail (scope) {
      let data = {
        FProjPhId: scope.row.PhId
      }
      this.getAxios('/GXM/ProjectMstApi/GetProjectMst', data).then(res => {
        this.itemDetail = res
        this.detailDialog = true
        console.log(res)
      }).catch(err => {
        this.$msgBox.error('请求失败')
      })
    },
    openAuditfollow () {
      this.detailDialog = true
    },
    //选择框改变事件
    query () {
      if (this.formList.approvalStatus ==='2'){
        this.paddRight = '22px'
      } else {
        this.paddRight = '30px'
      }
      this.formList.FProjName = ''
      this.getTableData()
    },
    //搜索框查询事件
    searchInput () {
      this.getTableData()
    },
    //高级搜索框清空
    seniorReset(){
      this.seniorSearch = {//高级筛选
        FProjName:'',//项目名称
        FProjCode:'',//项目编码
        FDeclarationDept:'',//申报部门
        FBudgetDept:'',//预算部门
        FProjAmountBegin:'',//金额开始
        FProjAmountEnd:'',//金额结束
        FIfPerformanceAppraisal:'',//是否绩效评价
        FTime:[],//起止日期
      }
      this.getTableData()
    },
    //刷新
    refresh(val,stu){
      if (stu ==='add'){
        this.addDialog = false
      }else if (stu ==='edit') {
        this.editDialog = false
        this.selection.splice(0,1)
      }else if (stu === 'copy'){
        this.copyDialog = false
        this.selection.splice(0,1)
      }

      this.getTableData()
    },
    //送审
    subApproval(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择数据进行送审')
      }else if (this.selection.length ===1) {
        if (this.selection[0].FApproveStatus === '1'){
          this.approvalDataS.openDialog = true
          this.approvalDataS.data = this.selection
        }else if (this.selection[0].FApproveStatus === '5') {
          this.$msgBox.error('暂存单据不支持送审！')
        }else if (this.selection[0].FApproveStatus === '2') {
          this.$msgBox.error('不符合条件不能送审')
        }else if (this.selection[0].FApproveStatus === '3') {
          this.$msgBox.error('不符合条件不能送审')
        }

      }else {
        this.$msgBox.error('不支持多行送审，请单行选择')
      }
    },
    //取消送审
    unSubApproval(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择数据进行取消送审')
      }else if (this.selection.length ===1) {
        let arr = [];
        for (let i in this.selection){
          arr[i] =  this.selection[i].PhId
        }
        let data = {
          FBilltype:'004',
          RefbillPhidList:arr,
          OperaPhid:this.UserId
        }
        this.postAxios('/GAppvalRecord/PostCancelAppvalRecord',data).then(res=>{
          if (res.Status ==='success'){
            this.$msgBox.show('取消成功')
            this.getTableData()
          } else {
            this.$msgBox.error(res.Msg)
          }
        }).catch(err=>{

        })
      }else {
        this.$msgBox.error('不支持多行送审，请单行选择')
      }
    },
    //作废
    abolish(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择数据进行作废')
      }else if (this.selection.length ===1) {
        this.$confirm('确定作废该数据？','提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消'
        }).then(()=>{
          let arr = [];
          for (let i in this.selection){
            arr[i] =  this.selection[i].PhId
          }
          let data = {
            fPhIdList:arr,
          }
          console.log(data)
          this.postAxios('/GXM/ProjectMstApi/PostCancetProjectList',data).then(res=>{
            if (res.Status ==='success'){
              this.$msgBox.show('作废成功')
              this.getTableData()
            } else {
              this.$msgBox.error(res.Msg)
            }
          }).catch(err=>{

          })
        }).catch(()=>{

        })
      }else {
        this.$msgBox.error('不支持多行作废，请单行选择')
      }
    },
    //获取审批流程
    getAppvalProcList(row){
      if (this.WorkFlow ===0){
        this.$msgBox.show('无数据可执行确认')
        return;
      }
      if (row.FApproveStatus ==='1'){
        this.$msgBox.error('单据还未送审，未生成审批流，请先送审')
        return
      }
      let arr = []
      arr[0] = row.PhId
      let data = {
        FBilltype:'004',
        RefbillPhid:row.PhId
      }
        this.getAxios('/GAppvalRecord/GetAppvalRecordList',data).then(res=>{

            if (res.Status === 'success'){
              this.auditDialog = true
              this.auditMsg = res.Data
              console.log(res.Data)
            } else {
              this.$msgBox.error(res.Msg)
            }
        }).catch(err=>{

        })
    },

    handleDelete(data){
      console.log(data)
      if (data.type === 'quxiao'){
        this.approvalDataS.openDialog = false
      }else {
        this.approvalDataS.openDialog = false
        this.getTableData()
      }

    },
    //切换页面显示方式，启用，部门申报，汇总审批
    swatchPage(){
      if (this.formList.swatchBtn === '2'){
        this.formList.approvalStatus = '1';
        this.paddRight = '25px'
      }else if(this.formList.swatchBtn === '3'){
        this.formList.approvalStatus = '2';
        this.paddRight = '25px'
      }else {
        this.formList.approvalStatus = '0';
        this.paddRight = '25px';
      }
      this.getTableData()
    },
    //复制单据
    copyList(){
      if (this.selection.length === 0){
        this.$msgBox.error('必须选择一行数据才能进行复制')
      }else if (this.selection.length ===1) {
        this.copyDialog = true
        this.copyDetail = this.selection[0]
      }else {
        this.$msgBox.error('不支持多行复制，请单行选择')
      }
    },
    //转立项
    transferItem(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择所需要转立项的单据')
      } else {
        this.$confirm('确定转立项该数据？','提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消'
        }).then(()=>{
          let arr = []
          for (let i in this.selection){
            arr[i] = this.selection[i].PhId
          }
          let data = {
            fPhIdList:arr,
          }
          console.log(data)
          this.postAxios('GXM/ProjectMstApi/PostVerify',data).then(res=>{
            this.$msgBox.show('转立项成功'+res.SuccessNum+'条数据，转立项失败'+res.FailNum+'条数据')
            this.getTableData()
          }).catch(err =>{
            console.log(err)
          })
        }).catch(()=>{

        })
      }
    },
    //上报
    report(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择所需要上报的单据')
      } else {
        this.$confirm('确定上报该数据？','提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消'
        }).then(()=>{
          let arr = []
          for (let i in this.selection){
            arr[i] = this.selection[i].PhId
          }
          let data = {
            fPhIdList:arr,
          }
          console.log(data)
          this.postAxios('GXM/ProjectMstApi/PostValid',data).then(res=>{
            this.$msgBox.show('上报成功'+res.SuccessNum+'条数据，上报失败'+res.FailNum+'条数据')
            this.getTableData()
          }).catch(err =>{
            console.log(err)
          })
        }).catch(()=>{

        })
      }
    },
    //驳回
    rejectItem(){
      if (this.selection.length === 0){
        this.$msgBox.error('请选择所需要驳回的单据')
      } else {
        this.$confirm('确定驳回该数据？','提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消'
        }).then(()=>{
          let arr = []
          for (let i in this.selection){
            arr[i] = this.selection[i].PhId
          }
          let data = {
            fPhIdList:arr,
          }
          this.postAxios('GXM/ProjectMstApi/PostUnValid',data).then(res=>{
            this.$msgBox.show('驳回成功'+res.SuccessNum+'条数据，驳回失败'+res.FailNum+'条数据')
            this.getTableData()
          }).catch(err =>{
            console.log(err)
          })
        }).catch(()=>{

        })

      }
    },
    moreTip(){

    },
    //汇总表打印
    sumTablePrint(){
      if (this.selection.length ===0){
        this.$msgBox.error('请选择需要打印的单据！！')
      }else {
        this.$refs.sumTabPrint.sumdialog = true
        this.sumtabData = this.selection;
        let sum = 0
        for (let i in this.selection){
            sum += this.selection[i].FProjAmount
        }
        this.totalFProjAmount = sum
        console.log(this.selection)
      }
    },
    //申请表打印
    applyTablePrint(){
      if (this.selection.length ===0){
        this.$msgBox.error('请选择需要打印的单据！！')
      }else {
        let data ={
          fPhIdList:[]
        }
        for (let i in this.selection){
          data.fPhIdList[i] = this.selection[i].PhId
        }
        this.postAxios('/GXM/ProjectMstApi/PostPrintData',data).then(res=>{
          console.log(res)
          this.$refs.applyTabPrint.applydialog = true
          this.applytabData = res;
        }).catch(err=>{

        })
      }
    },
    //单位切换
    swatchUnit(){
      if (this.formList.year === '1') {
        for (let i in this.table.column){
          if (this.table.column[i].prop === 'FProjAmount') {
            this.$set(this.table.column[i],"label",'项目金额(元)')
          }
        }
      } else {
        for (let i in this.table.column){
          if (this.table.column[i].prop === 'FProjAmount') {
            this.$set(this.table.column[i],"label",'项目金额(万元)')
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.content-body {
}
.row-class-name {
  margin-top: 10px;
  padding: 0 20px;
}
.table-main {
  width: 97%;
  overflow-x: hidden;
}
.top {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -5px 0 0 0 !important;
  transform: translate(-50%, -50%);
}
.top ul li {
  float: left;
  margin-left: 48px;
}
.inner-top ul li{
  float: left;
  margin-right: 48px;
}
.inner-top ul li:hover {
  cursor: pointer;
}
.inner-top ul li div {
  text-align: center;
}
.top ul li:hover {
  cursor: pointer;
}
.top ul li div img {
  width: 30px;
}
.cell-click {
  color: #409eff;
  text-decoration: underline;
}
.cell-click:hover {
  cursor: pointer;
}
.applyDetailDialog >>> .el-dialog__header {
  padding: 10px 0 0 0;
}
.applyDetailDialog >>> .el-dialog__body {
  padding: 0 20px;
}
.detailDialog >>> .el-dialog__header {
  padding: 10px 0 0 0;
}
.detailDialog >>> .el-dialog__body {
  padding: 0 20px;
}
.applyDetailDialog >>>.el-dialog{
  min-width: 1500px;
}
.applyDetailTitle {
  text-align: left;
  border-bottom: 1px solid #eaeaea;
  height: 30px;
}
.applyDetailTitle span {
  margin-left: 10px;
  line-height: 30px;
}

.money-dw >>> .el-input {
  width: 80px;
}
.searchIpt >>> .el-input__inner{
  border-radius: 20px 0 0 20px;
}
  .searchBtn{
    margin-left: -5px;
    margin-right: -5px;
    border-radius: 0px;
  }
  .searchSer{
    border-radius: 0px 4px 4px 0px;
  }
.applyDetailDialog >>> .el-dialog__header .el-dialog__headerbtn{
   top: 10px !important;
 }
.detailDialog >>> .el-dialog__header .el-dialog__headerbtn{
  top: 10px !important;
}
</style>
<style lang="scss" scoped>
  .seniorSearch{
    padding: 5px;
    >div{
      &:nth-of-type(1){
        border-bottom: 2px solid #00B8EE;
        color: #00B8EE;
        font-size: .2rem;
      }
      &:nth-of-type(2){
        padding: 10px 0 0 0;
        border-top: 1px solid #ccc;
        >ul{
          display: inline-block;
          float: right;
          >li{
            display: inline-block;
            margin-left: 5px;
            &:nth-of-type(1){
              >.btn{
                background-color: #fff;
                color: #00B8EE;
              }

            }
          }
        }
      }
      >span:nth-of-type(2){
        float: right;
      }
    }

    table{
      width: 100%;
      td{
        padding: 8px 5px;
      }
    }
  }
  .seniorSearch{
    td{
      text-align: center;
    }
  }
  .closeSenior:hover{
     cursor: pointer;
   }
  .top-left-code{
    color: #409eff;
    text-decoration: underline;
  }
  .top-left-code:hover{
    cursor: pointer;
  }
  .top-center{
    /*width: 300px;*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
