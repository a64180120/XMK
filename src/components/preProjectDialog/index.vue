<template>
  <!-- <el-dialog
      append-to-body :visible="true" width="90%" :close-on-click-modal="false"
  ></el-dialog>-->
  <section class="prerojectnewproject">
    <el-row>
      <el-col :span="24"
              style="margin-top:10px;margin-bottom: 10px">
        <div class="btn-left">
          <div class="bottom-info">
            <ul>
              <li>
                <span>当前阶段：年初申报</span>
              </li>
              <li>
                <span>申报日期：{{(new Date()).getFullYear()+'-'+((new Date()).getMonth()<10?'0'+((new Date()).getMonth()+1):(new Date()).getMonth())+'-'+((new Date()).getDate()<10?'0'+((new Date()).getDate()):(new Date()).getDate())}}</span>
              </li>
              <li>
                <span>申报人：{{UserName}}</span>
              </li>
            </ul>
          </div>
        </div>
        <slot name="btn">
          <div class="top-btn">
            <el-button class="btn"
                       size="mini"
                       style="margin-left: 0"
                       @click="submit('bc')">保存</el-button>
            <el-button class="btn"
                       style="margin-left: 0"
                       size="mini"
                       v-if="workFlow ===1"
                       @click="submit('bcss')">保存并送审</el-button>
            <el-button class="btn"
                       size="mini"
                       style="margin-left: 0"
                       @click="submit('zc')">暂存</el-button>
            <el-popover  trigger="hover">
              <div>
                <span style="font-size: 0.16rem">附单据<span style="text-decoration: underline">{{choosedIndexAndPro.index}}</span>张</span>
              </div>
              <el-button class="btn"
                         size="mini"
                         @click="uploadFile()"
                          slot="reference">上传附件</el-button>
            </el-popover>
            <el-button class="btn"
                       size="mini"
                       @click="preview()">填报预览</el-button>
          </div>
        </slot>
      </el-col>
      <div class="left-box">
        <div class="tb">项目概况</div>
        <ul>
          <li :class="[projSurvey.FProjName === '' && projSurveyNull.FProjName?'null-projS':'']">
            <span>项目名称：</span>
            <div @click="openTextarea(projSurvey,'FProjName')"
                 class="opentextarea"
                 style="width:100%;text-align:left;line-height:32px;padding-left:15px;">
              <el-tooltip v-if="projSurvey.FProjName"
                          :content="projSurvey.FProjName">
                <span style="font-size:0.14rem;">{{projSurvey.FProjName}}</span>
              </el-tooltip>
              <span v-else
                    style="font-size:0.14rem;color:#c0c4cc;">请填写项目名称（必填）</span>
            </div>
            <!-- <el-input size="small" v-model="projSurvey.FProjName" placeholder="请填写项目名称（必填）"></el-input> -->
          </li>
          <li :class="[projSurvey.FLevel === '' && projSurveyNull.FLevel?'null-projS':'']">
            <span>项目级别：</span>
            <el-select v-model="projSurvey.FLevel"
                       size="small"
                       @change="projSurveyNull.FLevel = true"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.FLevelGroup"
                         :key="idx"
                         :label="item.TypeName"
                         :value="item.TypeCode"></el-option>
            </el-select>
          </li>
          <li :class="[projSurvey.FDeclarationDept === '' && projSurveyNull.FDeclarationDept?'null-projS':'']">
            <span>申报部门：</span>
            <el-select v-model="projSurvey.FDeclarationDept"
                       size="small"
                       @change="projSurveyNull.FDeclarationDept = true"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.FDeclarationDeptGroup"
                         :key="idx"
                         :label="item.deptName"
                         :value="item.deptCode"></el-option>
            </el-select>
          </li>
          <li :class="[projSurvey.FBudgetDept === '' && projSurveyNull.FBudgetDept?'null-projS':'']">
            <span>预算部门：</span>
            <el-select v-model="projSurvey.FBudgetDept"
                       size="small"
                       @change="projSurveyNull.FBudgetDept = true"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.FBudgetDeptGroup"
                         :key="idx"
                         :label="item.OName"
                         :value="item.OCode"></el-option>
            </el-select>
          </li>
          <li :class="[projSurvey.ProjectPropers === '' && projSurveyNull.ProjectPropers?'null-projS':'']">
            <span>项目属性：</span>
            <el-select v-model="projSurvey.ProjectPropers"
                       size="small"
                       @change="projSurveyNull.ProjectPropers = true"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.ProjectPropersGroup"
                         :key="idx"
                         :label="item.TypeName"
                         :value="item.TypeCode"></el-option>
            </el-select>
          </li>
          <li :class="[projSurvey.TimeLimits === '' && projSurveyNull.TimeLimits?'null-projS':'']">
            <span>存续期限：</span>
            <el-select v-model="projSurvey.TimeLimits"
                       size="small"
                       @change="projSurveyNull.TimeLimits = true"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.TimeLimitsGroup"
                         :key="idx"
                         :label="item.TypeName"
                         :value="item.TypeCode"></el-option>
            </el-select>
          </li>
          <li :class="[projSurvey.ExpenseCategories === '' && projSurveyNull.ExpenseCategories?'null-projS':'']">
            <span>支出类别：</span>
            <el-select v-model="projSurvey.ExpenseCategories"
                       size="small"
                       @change="projSurveyNull.ExpenseCategories = true"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.ExpenseCategoriesGroup"
                         :key="idx"
                         :label="item.Mc"
                         :value="item.Dm"></el-option>
            </el-select>
          </li>
          <li>
            <span>项目年度：</span>
            <el-select v-model="yearSelect"
                       size="small"
                       placeholder="必选">
              <el-option :label="parseInt(year) + 1"
                         :value="parseInt(year)+1"></el-option>
              <el-option :label="year"
                         :value="year"></el-option>
              <el-option :label="year-1"
                         :value="year-1"></el-option>
            </el-select>
          </li>
          <li :class="[projSurvey.sedTime === '' && projSurveyNull.sedTime?'null-projS':'']">
            <span>起止日期：</span>
            <el-date-picker size="small"
                            v-model="projSurvey.sedTime"
                            type="daterange"
                            @blur="projSurveyNull.sedTime = true"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
          </li>
          <li>
            <span>绩效评价：</span>
            <el-select v-model="projSurvey.FIfPerformanceAppraisal"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.FIfPerformanceAppraisalGroup"
                         :key="idx"
                         :label="item.name"
                         :value="item.code"></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div class="right-box">
        <!-- tabs -->
        <ul>
          <li v-for="(i,index) in tabsList"
              :key="index"
              :class="{tab:true,active:tabindex==index}"
              v-html="i"
              @click="swatchTabs(index)"></li>
        </ul>
        <!-- 选项卡内容 -->
        <div class="right-box-container">
          <!-- 项目科研 -->
          <ul v-show="tabindex == 0"
              class="textareas">
            <li>
              <span>部门职能概述：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="500"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="限500字以内（必填）"
                        v-model="projScience.FFunctionalOverview"
                        @blur="projScienceNull.FFunctionalOverview=true"
                        :class="[projScience.FFunctionalOverview === '' && projScienceNull.FFunctionalOverview?'null-projSc':'']"></el-input>
            </li>
            <li>
              <span>申报依据：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="250"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="限250字以内（必填）"
                        v-model="projScience.FProjBasis"
                        @blur="projScienceNull.FProjBasis=true"
                        :class="[projScience.FProjBasis === '' && projScienceNull.FProjBasis?'null-projSc':'']"></el-input>
            </li>
            <li>
              <span>可行性：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="250"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="限250字以内（必填）"
                        v-model="projScience.FFeasibility"
                        @blur="projScienceNull.FFeasibility=true"
                        :class="[projScience.FFeasibility === '' && projScienceNull.FFeasibility?'null-projSc':'']"></el-input>
            </li>
            <li>
              <span>必要性：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="250"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="限250字以内（必填）"
                        v-model="projScience.FNecessity"
                        @blur="projScienceNull.FNecessity=true"
                        :class="[projScience.FNecessity === '' && projScienceNull.FNecessity?'null-projSc':'']"></el-input>
            </li>
          </ul>
          <!-- 预算明细 -->
          <div v-show="tabindex == 1"
               class="budgetdetail">
            <div style="text-align:left;">
              <el-checkbox v-model="budgetDetail.copyLine">复制行</el-checkbox>
            </div>
            <div class="list">
              <div class="listHead">
                <ul>
                  <li>序号</li>
                  <li>明细项目名称</li>
                  <li>金额（元）</li>
                  <li>资金来源</li>
                  <li>支付方式</li>
                  <li style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                    <el-tooltip content="支出功能分类科目">
                         <span>
                               支出功能分类科目
                         </span>
                    </el-tooltip>
                  </li>
                  <li v-if="false">集中采购</li>
                  <li style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                    <el-tooltip content="测算过程及其他说明事项">
                         <span>
                               测算过程及其他说明事项
                         </span>
                    </el-tooltip>
                  </li>
                </ul>
              </div>
            </div>
            <div class="list listBodyCon">
              <div class="listBody">
                <div style="cursor:pointer"
                     v-if="!budgetdetailData.length">请添加明细</div>
                <ul v-else
                    v-for="(item,index) in budgetdetailData"
                    :key="index">
                  <li>{{index+1}}</li>
                  <li>
                    <el-input v-model="item.FName"
                              @change="valueChange(item)"
                              placeholder="必填" />
                  </li>
                  <li>
                    <el-input @focus="clearNum(item,$event,1)"
                              @keyup.native="clearNum(item,$event)"
                              @blur="filterMoney(item,index)"
                              class="money"
                              v-model="item.FAmount"
                              placeholder="必填" />
                  </li>
                  <li>
                    <el-select v-model="item.FSourceOfFunds"
                               size="small"
                               placeholder="必选">
                      <el-option v-for="(item,idx) in budgetDetail.FSourceOfFundsGroup"
                                 :key="idx"
                                 :label="item.MC"
                                 :value="item.DM"></el-option>
                    </el-select>
                  </li>
                  <li>
                    <el-select v-model="item.FPaymentMethod"
                               size="small"
                               placeholder="必选">
                      <el-option v-for="(item,idx) in budgetDetail.fundPayGroup"
                                 :key="idx"
                                 :label="item.TypeName"
                                 :value="item.TypeCode"></el-option>
                    </el-select>
                  </li>
                  <li>
                    <el-select v-model="item.FQtZcgnfl"
                               size="small"
                               placeholder="必选">
                      <el-option v-for="(item,idx) in projGroup.FQtZcgnflGroup"
                                 :key="idx"
                                 :label="item.KMMC"
                                 :value="item.KMDM"></el-option>
                    </el-select>
                  </li>
                  <li v-if="false">
                    <el-radio v-model="item.FIfPurchase"
                              :label="1">是</el-radio>
                    <el-radio v-model="item.FIfPurchase"
                              :label="2">否</el-radio>
                    <i @click="item.FIfPurchase =='1'?setBuy(item):''"
                       :class="{'el-icon-setting':true,'canSetting':item.FIfPurchase=='1'?true:false}"></i>
                  </li>
                  <li class="enable"
                      @click="openTextarea(item,'FOtherInstructions')">
                    <el-input v-model="item.FOtherInstructions"
                              placeholder="必填" />

                    <el-tooltip v-if="item.FOtherInstructions"
                                :content="item.FOtherInstructions">
                      <span style="display: inline-block;max-width: 100%;">{{item.FOtherInstructions}}</span>
                    </el-tooltip>
                    <div class="icon active">
                      <div>
                        <img @click.stop="addBudgetdetail(item)"
                             src="@/assets/images/jia.png"
                             alt />
                      </div>
                      <div>
                        <img @click.stop="delBudgetdetail(item,index)"
                             src="@/assets/images/jian.png"
                             alt />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="listBottom">
              <!--总计项目金额-->
              <div class="listBottom-left">
                <span>总计项目金额:</span><span class="money">{{TotalAmount | NumFormat}}</span>
              </div>
              <!--细项目金额统计-->
              <div class="listBottom-right">
                <span>其中:</span>
                <ul>
                  <li v-if=" budgetDetail.FSourceOfFundsGroup.length !==0" v-for="(item,idx) in budgetDetail.FSourceOfFundsGroup">
                    <span style="width: 100%;overflow: hidden">
                      <span class="title">{{item.MC}}</span>
                       <span class="money">{{budgetdetailData.filter(i=>i.FSourceOfFunds===item.DM).reduce((prev,cur)=>prev+parseFloat((Number((cur.FAmount).replace(/[,]/g, ''))).toFixed(2)),0) | NumFormat}}</span>
                    </span>

                  </li>
                  <li v-else style="text-align: center;color: #cccbcb"> 暂无数据 </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 实施计划 -->
          <div v-show="tabindex == 2"
               class="budgetdetail">
            <div style="text-align:left;">
              <el-checkbox v-model="copyLine">复制行</el-checkbox>
            </div>
            <div class="list plan">
              <div class="listHead">
                <ul>
                  <li>序号</li>
                  <li>实施内容（必填）</li>
                  <li>起止日期（必填）</li>
                </ul>
              </div>
            </div>
            <div class="list plan listBodyCon">
              <div class="listBody">
                <div style="cursor:pointer"
                     v-if="!ImplPlanPanelData.length">请添加明细</div>
                <ul v-else
                    v-for="(item,index) in ImplPlanPanelData"
                    :key="index"
                    :class="[delRow == index?'select-row':'']">
                  <li>{{index+1}}</li>
                  <li>
                    <el-input v-model="item.FName"
                              placeholder="必填" />
                  </li>
                  <li class="enable">
                    <el-date-picker size="small"
                                    v-model="item.sedTime"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"></el-date-picker>
                    <div class="icon active">
                      <div>
                        <img @click="add(item)"
                             src="@/assets/images/jia.png"
                             alt />
                      </div>
                      <div>
                        <img @click="del(index)"
                             src="@/assets/images/jian.png"
                             alt />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--  绩效目标 -->
          <div v-show="tabindex == 3"
               class="jxtarget">
            <div class="line1">
              <div>
                <span>年度绩效目标：</span>
                <el-input type="textarea"
                          show-word-limit
                          maxlength="500"
                          :rows="6"
                          placeholder="限500字以内（必填）"
                          v-model="target.ndTagetL"
                          @blur="targetNull.ndTagetL=true"
                          :class="[target.ndTagetL === '' && targetNull.ndTagetL?'null-projSc':'']"></el-input>
              </div>
              <div>
                <span>长期绩效目标：</span>
                <el-input type="textarea"
                          show-word-limit
                          maxlength="500"
                          :rows="6"
                          placeholder="限600字以内（必填）"
                          v-model="target.cqTarget"
                          @blur="targetNull.cqTarget=true"
                          :class="[target.cqTarget === '' && targetNull.cqTarget?'null-projSc':'']"></el-input>
              </div>
            </div>
            <div class="line2" v-show="projSurvey.FIfPerformanceAppraisal =='1'">
              <span>绩效指标类别：</span>
              <el-popover placement="bottom" trigger="click" popper-class="popover" v-model="target.popover" class="popover">
                <div style="max-height: 300px;overflow-y: auto;">
                    <el-tree
                      :data="targetTreeData"
                      :props="targetTreeProps"
                      :default-expand-all="true" @node-click="nodeClick">

                    </el-tree>
                </div>
                <div  slot="reference" style="width: 300px;border-bottom: 1px solid #e3e3e3" :style="{borderBottomColor:target.targetType.FName ==='' &&targetNull.targetType ?'red':'#e3e3e3'}">
                  <span v-if="target.targetType.FName ===''" style="color: #e3e3e3">请选择</span>
                  <span v-if="target.targetType.FName !==''">{{target.targetType.FName}}</span>
                </div>
              </el-popover>
            </div>
            <div class="line3"
                 v-show="projSurvey.FIfPerformanceAppraisal =='1'">
              <div class="tableHead">
                <table>
                  <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="7%" />
                    <col width="23%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>行号</th>
                      <th colspan="2">指标类别</th>
                      <th>指标名称</th>
                      <th>指标值</th>
                      <th>指标权重</th>
                      <th>指标描述</th>
                      <th style="width: 25px;background-color: #ffffff"></th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="tableBody">
                <table style="border-right: none;border-top: none;border-bottom: none" @mouseleave="mouseLeave()">
                  <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="7%" />
                    <col width="23%" />
                  </colgroup>
                  <tbody>
                    <tr v-if="target.targetTableData.length !==0" v-for="(item,idx) in target.targetTableData">
                      <td>{{idx}}</td>
                      <td
                          v-if="idx==0"
                          :rowspan="target.targetTableData.length">
                        <add-br :value="target.targetType.FName"></add-br>
                      </td>
                      <td v-for="(itemType) in tarType" :rowspan="itemType.sum" v-if="idx==itemType.beginIdx">{{item.FTargetClassCode_EXName}}</td>
                      <td>
                        <el-input class="td-ipt" v-model="item.FTargetName"></el-input>
                      </td>
                      <td>
                        <el-input class="td-ipt" v-model="item.FTargetValue"></el-input>
                      </td>
                      <td>
                        <el-input class="td-ipt" @change="targetWeight()" v-model="item.FTargetWeight"></el-input>
                      </td>
                      <td @mouseenter="mouseEnter(idx)">
                          <el-input class="td-ipt" v-model="item.FTargetDescribe"></el-input>
                      </td>
                      <td class="enable" >
                        <div v-show="nowIndex == idx" class="icon active">
                          <div>
                            <img @click="addTargetItem(item,idx)"
                                 src="@/assets/images/jia.png"
                                 alt />
                          </div>
                          <div>
                            <img @click="delTargetItem(idx)"
                                 src="@/assets/images/jian.png"
                                 alt />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="target.targetTableData.length ==0">
                      <td colspan="7" style="border-bottom: 1px solid #ccc">暂无数据</td>
                      <td style="width: 27px;border-bottom: none" ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!--底部信息-->
      </div>
    </el-row>
    <el-dialog modal-append-to-body
               append-to-body
               :visible.sync="setBuyDialog.openDialog"
               width="750px"
               :close-on-click-modal="false"
               class="setBuyDialog">
      <set-buy v-if="setBuyDialog.openDialog" :data="setBuyDialog.data" :fund="budgetDetail.FSourceOfFundsGroup"></set-buy>
    </el-dialog>
    <el-dialog modal-append-to-body
               append-to-body
               :visible.sync="textareaDialogData.openDialog"
               width="750px"
               :close-on-click-modal="false"
               class="setBuyDialog">
      <textarea-dialog v-if="textareaDialogData.openDialog"
                       :maxWord="maxWord"
                       :data="textareaDialogData"
                       :title="textTitle" ></textarea-dialog>
    </el-dialog>
    <go-approval v-if="approvalDataS.openDialog"
                 :data="approvalDataS"
                 @delete="handleDelete"></go-approval>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="detailDialog"
               width="50%"
               :close-on-click-modal="false"
               class="applyDetailDialog">
      <div slot="title"
           class="applyDetailTitle">
        <span>填报预览</span>
      </div>
      <item-print :data="itemDetail"></item-print>
    </el-dialog>
    <el-dialog :visible.sync="uploadVis"
               modal-append-to-body
               :append-to-body="true"
               width="auto"
               title="附件上传"
               :close-on-click-modal="false">
      <file-up
               @submit="submitFn"></file-up>
    </el-dialog>
  </section>
</template>

<script>
import addBr from './addBr'
import setBuy from './setBuy'
import textareaDialog from './textareaDialog'
import { mapState } from 'vuex'
import GoApproval from "../../pages/preproject/component/goApproval";
import ItemPrint from "./itemPrint";
import FileUp from "./fileUp";

export default {
  name: 'prerojectnewproject',
  props: {
    workFlow:{
      type:Number,
      default:0
    }
  },
  components: {FileUp, ItemPrint, GoApproval, addBr, setBuy, textareaDialog },
  data () {
    return {
      timeClearable: false,
      //文本域最大字数
      maxWord: "600",
      textTitle:"",
      //项目概况
      projSurvey: {
        FProjName: '', //项目名称
        FLevel: '', //项目级别
        FDeclarationDept: '', //申报部门
        FBudgetDept: '', //预算部门
        ProjectPropers: '', //项目属性
        TimeLimits: '', //存续期限
        ExpenseCategories: '', //支出类别
        sedTime: '', //起止日期
        FIfPerformanceAppraisal: 2//是否绩效评价	(Yes = 1,No = 2)（绩效目标里的绩效指标是否显示）（默认否）
      },
      //进入新增页面时 不让项目概况输入框因为无值变为为输入项
      projSurveyNull:{
        FProjName:false,
        FLevel:false,
        FDeclarationDept:false,
        FBudgetDept:false,
        ProjectPropers:false,
        TimeLimits:false,
        ExpenseCategories:false,
        sedTime:false
      },
      //项目概况下拉框项内容
      projGroup: {
        FDeclarationDeptGroup: [],//申报部门
        FLevelGroup: [],//项目级别
        FBudgetDeptGroup: [],
        ProjectPropersGroup: [],//项目属性
        TimeLimitsGroup: [],//存续期限
        ExpenseCategoriesGroup: [],//支出类别
        FIfPerformanceAppraisalGroup: [
          {
            name: '是',
            code: 1
          },
          {
            name: '否',
            code: 2
          }
        ],
        FQtZcgnflGroup:[]
      },
      //项目科研四大文本框内容
      projScience: {
        FFunctionalOverview: '', //部门职能概述
        FProjBasis: '', //申报依据
        FFeasibility: '', //可行性
        FNecessity: '' //必要性
      },
      //进入新增页面时 不让项目科研输入框因为无值变为未输入项
      projScienceNull:{
        FFunctionalOverview:false,
        FProjBasis:false,
        FFeasibility:false,
        FNecessity:false
      },
      //预算明细表数据
      budgetDetail: {
        copyLine: false, //复制行
        FSourceOfFundsGroup: [
          {
            label: '全总预算拨款-工会经费',
            value: 0,
            FAmount: 0
          },
          {
            label: '全总预算拨款-中央财政拨款',
            value: 1,
            FAmount: 0
          },
          {
            label: '省总预算拨款-工会经费',
            value: 2,
            FAmount: 0
          },
          {
            label: '省总预算拨款-省财政拨款',
            value: 3,
            FAmount: 0
          }
        ], //资金源组
        fundPayGroup: [], //支付方式下拉项组
      },
      //预算明细表
      budgetdetailData: [
        {
          FName: '',//明细项目名称
          FQty:'',//天数	（根据项目概况的支出类别 控制是 天人单价还是 单价 数量 还是只有金额 必填）
          FQty2:'',//人数

          FPrice:'',//单价
          FNum:"",//数量
          FAmount: '',//金额	必填
          FBudgetAmount:"",//FAmount一样	必填
          FSourceOfFunds: '',//资金来源	FSourceOfFunds_EXName资金来源名称	必填
          FBudgetAccounts:'',//预算科目	FBudgetAccounts_EXName	预算科目名称	立项时出现且必填
          FOtherInstructions:"",//测算过程及其他说明事项	必填
          FPaymentMethod: '',//支付方式	FPaymentMethod_EXName支付方式名称	必填
          FExpensesChannel:'',//支出渠道	FExpensesChannel_EXName支出渠道名称	立项时出现且必填
          FIfPurchase: 2,//是否集中采购	(Yes = 1,No = 2);
          FQtZcgnfl:"",//支出功能分类科目	FQtZcgnfl_EXName	支出功能分类科目名称
          FAmountEdit:"",//调整金额
          FAmountAfterEdit:'',//调整后金额
          id: (new Date()).getTime(), //使用时间搓作唯一标识，
          sedTime:"",
//采购明细类容
          FDtlCode:"",//明细项目代码	必填（明细项目带入）新增不用
          FContent:'',//采购内容	必填
          FCatalogCode:'',//采购目录代码	FCatalogCode_EXName	采购目录代码名称	必填
          FTypeCode:'',//采购类型代码	FTypeCode_EXName	采购类型代码名称	必填
          FProcedureCode:"",//采购程序代码	FProcedureCode_EXName	采购程序代码名称	必填
          FMeasUnit:"",//计量单位	必填
          FSpecification:"",//技术参数及配置标准	必填
          FRemark:"",//备注
          FEstimatedPurTime:'',//预计采购时间	必填
          FIfPerformanceAppraisal:"",//(Yes = 1,No = 2)	必填
          FQty:''
        }
      ], //预算明细数据
      //缓存新增加的数据
      cacheAddData: [],
      //实施计划表
      ImplPlanPanelData: [{
        FImplContent:'',
        sedTime:'',
        FName: '',
        FAmount: '',
        FSourceOfFunds: '',
        FPaymentMethod: '',
        FOtherInstructions: '',
        FIfPurchase: "2",
        id: (new Date()).getTime() //使用时间搓作唯一标识
      }],
      //绩效目标输入框
      ProjectDtlPerformTargets:{
        FLTPerformGoal:"",//长期绩效目标	必填
        FAnnualPerformGoal:''//	年度绩效目标	必填
      },
      //绩效目标tree数据
      targetTreeData:[],
      //绩效目标tree的props
      targetTreeProps:{
        children:'Children',
        label:'FName'
      },
      //绩效目标
      target:{
        popover:false,//选中节点后关闭popover
        //绩效指标类别节点选择后的值
        targetType:{
          FCode:'',
          FName:''
        },
        //绩效目标节点选择后请求的表格值
        targetTableData:[],
        ndTagetL:"",
        cqTarget:""
      },
      //进入新增页面时 不让绩效目标输入框输入框因为无值变为未输入项
      targetNull:{
        ndTagetL:false,
        cqTarget:false,
        targetType:false
      },

      inp: '',
      yearSelect: '',
      value1: '',
      textarea: '',
      type: '',
      tabindex: 0,//当前的tab页
      tabOldIndex: 0,//前一个Tab页码
      copyLine: false,
      tabsList: ['项目可研', '预算明细', '实施计划', '绩效目标'],
      // budgetdetail: [
      //   {
      //     FName: '',
      //     FAmount: '',
      //     get: '',
      //     FPaymentMethod: '',
      //     FOtherInstructions: '',
      //     FIfPurchase: 1
      //   }
      // ],
      //设置集中采购数据
      setBuyDialog: {
        openDialog: false,
        data: null
      },
      FDeclarationDeptGrop: [],
      textareaDialogData: {
        openDialog: false,
        data: null,
        property: ''
      },
      //一些列操作tab切换的状态
      tabStatus: {
        fristSwatchTab: false
      },
      delRow: '-1',
      nowIndex:-1,//绩效目标表格鼠标移动上去的当前值

      addNull:true,//判断是否由于没有空值而决定能否提交 false不能提交  true 可以提交
      approvalDataS:{
        openDialog:false,
        data:{},
        subData:[]//获取审批流
      },
      //报表预览
      detailDialog:false,
      itemDetail:{},
      uploadVis:false ,//上传附件dialog
      choosedIndexAndPro:{
        index: 0,
        pro: {
          QtAttachments:[]
        }
      },
      //预算总金额
      FProjAmount:0,
      FBudgetAmount:0,
    }
  },
  computed: {
    ...mapState({
      year: state => state.user.year,
      Orgid: state => state.user.orgid,
      UserCode: state => state.user.usercode,
      UserId: state => state.user.userid,
      OrgCode: state => state.user.orgcode,
      OrgName: state => state.user.orgname,
      UserName: state => state.user.username
    }),
    TotalAmount () {
      // let arr = this.budgetdetailData
      // 直接赋值会把defineproperty带入！
      let arr = JSON.parse(JSON.stringify(this.budgetdetailData))
      let sum = 0
      for (let key in arr) {
        let FAmount = arr[key].FAmount.replace(/[,]/g, '')
        sum += parseFloat(FAmount) || 0
      }
      this.FProjAmount = sum;
      this.FBudgetAmount = sum;
      return sum
    },
    //指标类别中每一类占多少
    tarType(){
      let arr = this.target.targetTableData
      //获取ABC
      let FTargetClassCode = ''
      let nameArr = []
      for (let key in arr){
        if (FTargetClassCode !==arr[key].FTargetClassCode){
          FTargetClassCode = arr[key].FTargetClassCode
          let obj = {
            FTargetClassCode:FTargetClassCode,
            beginIdx:key,
            sum:0
          }
          nameArr.push(obj)
        }
      }
      for (let key in nameArr) {
        let sum = 0
        for (let i in arr){
          if (nameArr[key].FTargetClassCode === arr[i].FTargetClassCode){
            sum=sum+1
          }
        }
        nameArr[key].sum = sum
      }
      console.log(nameArr)
      return nameArr
    }
  },
  watch: {
    tabindex (val, oldVal) {
      this.tabOldIndex = val
    },
    projSurvey:{
      handler(val){
        if (this.budgetdetailData[0].sedTime ===''){
          this.budgetdetailData[0].sedTime = val.sedTime
        }
      },
      deep:true
    }
  },
  mounted () {
    this.yearSelect = this.year;
    this.getDeclareList();
    this.getAllBasicData();
    this.getTargetTypeTree();
    this.getBudegDepart();
    //

  },
  methods: {
    //获取预算部门
    getBudegDepart(){
      let data  = {
        orgid:this.Orgid,
        uid:this.UserId
      }
      this.getAxios('/GQT/CorrespondenceSettingsApi/GetDeptByUnit',data).then(res=>{
        this.projGroup.FBudgetDeptGroup = res.Record
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
            this.$set(this.projGroup.FDeclarationDeptGroup,0,arr)
          }else {
            this.$msgBox.error(res.Msg)
          }
        })
        .catch(err => { })
    },
    //获取所有下拉选项接口
    getAllBasicData () {
      let data = {
        uCode: this.UserCode ? this.UserCode : '9999',
        orgCode: this.OrgCode,
        orgid: this.Orgid
      }
      this.getAxios('/GQT/QTSysSetApi/GetAllBasicData', data)
        .then(res => {
          this.budgetDetail.fundPayGroup = res.PayMethodTwos
          this.budgetDetail.FSourceOfFundsGroup = res.SourceOfFunds
          this.projGroup.FLevelGroup = res.ProjectLevels
          this.projGroup.ProjectPropersGroup = res.ProjectPropers
          this.projGroup.TimeLimitsGroup = res.TimeLimits
          this.projGroup.ExpenseCategoriesGroup = res.ExpenseCategories
          this.projGroup.FQtZcgnflGroup = res.Zcgnfls
          console.log(res)
        })
        .catch(err => { })
    },
    //获取绩效指标下拉项
    getTargetTypeTree(){
      let data = {
        orgid:this.Orgid,
        orgCode:this.OrgCode
      }
      let that= this
      this.getAxios('/GQT/QTSysSetApi/GetTargetTypeTree',data).then(res=>{
        this.$set(this.targetTreeData,0,res)
      }).catch(err=>{
        console.log(err)
      })
    },
    addBudgetdetail (item) {
      let data = (new Date()).getTime()
      console.log(data)
      let newItem = Object.assign(
        {},
        this.budgetDetail.copyLine
          ? item
          :{
            FName: '',//明细项目名称
            FQty:'',//天数	（根据项目概况的支出类别 控制是 天人单价还是 单价 数量 还是只有金额 必填）
            FQty2:'',//人数
            FPrice:'',//单价
            FNum:"",//数量
            FAmount: '',//金额	必填
            FBudgetAmount:"",//FAmount一样	必填
            FSourceOfFunds: '',//资金来源	FSourceOfFunds_EXName资金来源名称	必填
            FBudgetAccounts:'',//预算科目	FBudgetAccounts_EXName	预算科目名称	立项时出现且必填
            FOtherInstructions:"",//测算过程及其他说明事项	必填
            FPaymentMethod: '',//支付方式	FPaymentMethod_EXName支付方式名称	必填
            FExpensesChannel:'',//支出渠道	FExpensesChannel_EXName支出渠道名称	立项时出现且必填
            FIfPurchase: 2,//是否集中采购	(Yes = 1,No = 2);
            FQtZcgnfl:"",//支出功能分类科目	FQtZcgnfl_EXName	支出功能分类科目名称
            FAmountEdit:"",//调整金额
            FAmountAfterEdit:'',//调整后金额
            id: (new Date()).getTime(), //使用时间搓作唯一标识，
            sedTime:this.projSurvey.sedTime ? this.projSurvey.sedTime : '',

//采购明细类容
            FDtlCode:"",//明细项目代码	必填（明细项目带入）新增不用
            FContent:'',//采购内容	必填
            FCatalogCode:'',//采购目录代码	FCatalogCode_EXName	采购目录代码名称	必填
            FTypeCode:'',//采购类型代码	FTypeCode_EXName	采购类型代码名称	必填
            FProcedureCode:"",//采购程序代码	FProcedureCode_EXName	采购程序代码名称	必填
            FMeasUnit:"",//计量单位	必填
            FSpecification:"",//技术参数及配置标准	必填
            FRemark:"",//备注
            FEstimatedPurTime:'',//预计采购时间	必填
            FIfPerformanceAppraisal:""//(Yes = 1,No = 2)	必填
          }
      )
      newItem.id = data
      this.budgetdetailData.push(newItem)
      this.cacheAddData.push(newItem)
      if (this.budgetDetail.copyLine) {
        this.valueChange()
      }
    },
    delBudgetdetail (val, index) {
      let id = val.id
      let status = false
      //将实施计划删除行标记
      for (let key in this.ImplPlanPanelData) {
        if (id === this.ImplPlanPanelData[key].id) {
          this.delRow = key
          status = true
        }
      }
      if (this.budgetdetailData.length !== 1 && status) {
        this.$confirm('实施计划中存在相同内容是否前往删除？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: "warning",
          center: true,
          closeOnPressEscape: false
        }).then(() => {
          this.budgetdetailData.splice(index, 1)
          this.tabindex = 2
        }).catch(() => {
          this.tabindex = 1
          this.budgetdetailData.splice(index, 1)
          this.delRow = -1

        })
      } else {
        if (this.budgetdetailData.length !== 1 ){
          this.budgetdetailData.splice(index, 1)
        }
      }
    },
    add (item) {
      let newItem = Object.assign(
        {},
        this.copyLine
          ? item
          : {
            FName: '',
            FAmount: '',
            FSourceOfFunds: '',
            FPaymentMethod: '',
            FOtherInstructions: '',
            FIfPurchase: 1,
            sedTime: this.projSurvey.sedTime ? this.projSurvey.sedTime : ''
          }
      )
      this.ImplPlanPanelData.push(newItem)
    },
    del (index) {
      console.log(this.ImplPlanPanelData)
      if (this.ImplPlanPanelData.length === 1) {
        this.ImplPlanPanelData[0] = {}
      } else {
        this.ImplPlanPanelData.splice(index, 1)
      }
    },
    clearNum (item, e, isFocus) {
      let obj = e.target
      obj.value = obj.value.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
      obj.value = obj.value.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
      obj.value = obj.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
      if (obj.value.indexOf('.') < 0 && obj.value != '') {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj.value = parseFloat(obj.value)
      }
      if (parseInt(obj.value) == '' && isFocus) {
        obj.value = ''
      }
      item.FAmount = obj.value
    },
    filterMoney (item) {
      console.log(item)

      function fil (value, decimals = 2, decPoint = '.', thousandsSep = ',') {
        if (!value) return '0.00'
        value = (value + '').replace(/[^0-9+-Ee.]/g, '')
        let n = !isFinite(+value) ? 0 : +value
        let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
        let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
        let dec = typeof decPoint === 'undefined' ? '.' : decPoint
        let s = ''

        let toFixedFix = function (n, prec) {
          return '' + n.toFixed(2)
        }
        s = (prec ? toFixedFix(n, prec) : '' + n).split('.')
        let re = /(-?\d+)(\d{3})/
        while (re.test(s[0])) {
          s[0] = s[0].replace(re, '$1' + sep + '$2')
        }
        if ((s[1] || '').length < prec) {
          s[1] = s[1] || ''
          s[1] += new Array(prec - s[1].length + 1).join('0')
        }
        return s.join(dec)
      }
      var a = fil(item.FAmount)
      item.FAmount = a
    },
    setBuy (item) {
      console.log(item)
      if (item.FSourceOfFunds === '') {
        this.$msgBox.error('请先设置资金来源！')
        return
      }
      this.setBuyDialog.openDialog = true
      this.setBuyDialog.data = item
    },
    openTextarea (item, property) {
      if (property ==='FProjName'){
        this.projSurveyNull.FProjName = true
        this.maxWord = '100'
        this.textTitle = '项目名称'
      }
      if (property === 'FOtherInstructions'){
        this.maxWord = '250'
        this.textTitle = '测算过程及其他说明事项'
      }
      this.textareaDialogData.data = item
      this.textareaDialogData.property = property
      this.$nextTick(() => {

        this.textareaDialogData.openDialog = true
      })
    },
    //tab切换
    swatchTabs (index) {
      // console.log(this.cacheAddData)
      // this.cacheAddData = []//确认后清空缓存新增加的数据
      this.tabindex = index
      //实施计划第一行是否为空，只要有一列有值就不为空
      let ImpStatus = this.ImplPlanPanelData[0].FName !== '' ||
        this.ImplPlanPanelData[0].FAmount !== '' ||
        this.ImplPlanPanelData[0].FPaymentMethod !== '' ||
        this.ImplPlanPanelData[0].FSourceOfFunds !== '' ||
        this.ImplPlanPanelData[0].FOtherInstructions !== '';
      //预算明细第一行是否为空，只要有一列有值就不为空
      let budgetStatus = this.budgetdetailData[0].FName !== '' ||
        this.budgetdetailData[0].FAmount !== '' ||
        this.budgetdetailData[0].FPaymentMethod !== '' ||
        this.budgetdetailData[0].FSourceOfFunds !== '' ||
        this.budgetdetailData[0].FOtherInstructions !== '';
      //第二个tab跳第一个tab才触发
      // if (index === 2 && this.tabOldIndex == 1){
      //   //1、当预算明细不为空，实施明细为空时
      //    if (!ImpStatus && budgetStatus){
      //      if (!this.tabStatus.fristSwatchTab){
      //        this.$confirm('实施计划已存在，是否更新？','提示',{
      //          confirmButtonText:'是',
      //          cancelButtonText:'否',
      //          type: "warning",
      //          center:true,
      //          closeOnPressEscape:false
      //        }).then(()=>{
      //          let [...arr] = this.budgetdetailData
      //          this.ImplPlanPanelData = [...arr]
      //          this.tabStatus.fristSwatchTab = true
      //          this.cacheAddData = []//确认后清空缓存新增加的数据
      //        }).catch(()=>{
      //          this.tabindex = 1
      //        })
      //      }
      //    }else {
      //      if (this.cacheAddData.length !== 0 ){//判断缓存新增的数据是否为空，不为空就讲新加的合计到实施计划上
      //        this.ImplPlanPanelData =  [...this.ImplPlanPanelData,...this.cacheAddData]
      //        this.cacheAddData = []//确认后清空缓存新增加的数据
      //      }
      //    }
      // }

    },
    //保存
    submit (type) {
      //提交前将表单设置为能提交状态
      this.addNull = true
      //赋值实施计划提交的参数
      let implPlans = [];
      let PurchaseDtl = [];
      let PurDtl4SOFs = [];
      let targetDtl= [];
      for (let i in this.budgetdetailData){
        PurchaseDtl[i] = {
          FDtlCode:'',//明细项目代码	必填（明细项目带入）
          FName:this.budgetdetailData[i].FName,//明细项目名称	必填（明细项目带入）
          FContent:this.budgetdetailData[i].FContent,
          FCatalogCode:this.budgetdetailData[i].FCatalogCode,
          FTypeCode:this.budgetdetailData[i].FTypeCode,
          FProcedureCode:this.budgetdetailData[i].FProcedureCode,
          FMeasUnit:this.budgetdetailData[i].FMeasUnit,
          FQty:this.budgetdetailData[i].FQty,
          FPrice:this.budgetdetailData[i].FPrice,
          FAmount:this.budgetdetailData[i].FAmount,
          FSpecification:this.budgetdetailData[i].FSpecification,
          FRemark:this.budgetdetailData[i].FRemark,
          FEstimatedPurTime:this.budgetdetailData[i].FEstimatedPurTime,
        };
        PurDtl4SOFs[i] ={
          FDtlCode:'',//明细项目代码	必填（明细项目带入）
          FName:this.budgetdetailData[i].FName,//明细项目名称	必填（明细项目带入）
          FSourceOfFunds:this.budgetdetailData[i].FSourceOfFunds,
          FAmount:this.budgetdetailData[i].FAmount
        }
      }
      for(let key in this.ImplPlanPanelData){
        implPlans[key] = {
          FImplContent:this.ImplPlanPanelData[key].FName,
          FStartDate:this.ImplPlanPanelData[key].sedTime[0],
          FEndDate:this.ImplPlanPanelData[key].sedTime[1]
        }
      }
      targetDtl =JSON.parse(JSON.stringify(this.target.targetTableData))
      for (let i in targetDtl) {
        targetDtl[i].PhId='0'
      }
      let fas = ''
      if (type ==='bc'|| type ==='bcss'){
        fas = 1
      }else if (type ==='zc'){
        fas = 5
      }
      let formData = new FormData
      let fileList = this.choosedIndexAndPro.pro.QtAttachments
      if (fileList.length !==0){
        for (let file of fileList){
          formData.append('files',file)
        }
      }
      let data = {
        //预算主表对象
        ProjectMst: {
          FYear:this.yearSelect,//年度（当前年度）必填
          FProjName: this.projSurvey.FProjName,//项目名称
          FLevel: this.projSurvey.FLevel,//项目级别  无
          FDeclarationDept: this.projSurvey.FDeclarationDept,//申报部门,
          FBudgetDept: this.projSurvey.FBudgetDept,//预算部门
          FProjAttr: this.projSurvey.ProjectPropers,//项目属性
          FDuration: this.projSurvey.TimeLimits,//存续期限
          FExpenseCategory: this.projSurvey.ExpenseCategories,//支出类别
          FStartDate: this.projSurvey.sedTime[0],//开始日期
          FEndDate: this.projSurvey.sedTime[1],//结束日期
          FIfPerformanceAppraisal: this.projSurvey.FIfPerformanceAppraisal,//是否绩效评价	(Yes = 1,No = 2)（绩效目标里的绩效指标是否显示）（默认否）
          FDeclarationUnit:this.OrgCode,//申报单位（组织树选择的组织code）
          FDeclarationUnit_EXName:this.OrgName,//申报单位名称	必填
          FProjStatus:'1',// 1、预立项，2项目立项、3项目执行、4项目调整、5项目暂停、6项目终止、7项目关闭
          FDateofDeclaration:new Date(), //申报日期（新建单据的时间）	必填
          FDeclarer:this.UserName,//申报人（直接传当前操作员名称）	必填
          FProjAmount:this.TotalAmount,//项目金额（明细相加的总金额）	必填
          FType:'c',//单据类型（c,z）	必填
          FVerNo:'0001',//调整版本号(0001,0002)	必填
          FVerNoFVerNo:'c0001',//(c0001:年初新增;c0002:年中调整;z0001:年中新增)
          FApproveStatus:fas,//1必填（新增单据默认1）、2审批中、3审批通过、4已退回、5暂存
          FApprover:'',
          FApproveDate:'',
          FBudgetAmount:this.TotalAmount,
          // FIfPurchase:'1',//是否集中采购	(Yes = 1,No = 2)	必填
          FPerformType:this.target.targetType.FCode,//绩效评价类型代码
          FPerformEvalType_EXName:this.target.targetType.FName//绩效评价类型代码名称
        },
        //预算明细
        ProjectDtlBudgetDtls: this.budgetdetailData,
        //实施计划
        ProjectDtlImplPlans: implPlans,
        //绩效指标
        ProjectDtlPerformTargets:targetDtl,
        //预算明细的采购
        ProjectDtlPurchaseDtls:PurchaseDtl,
        ProjectDtlPurDtl4SOFs:PurDtl4SOFs,
        //用户ID
        UserId:this.UserId,
        ProjectDtlTextContents:{
          FFunctionalOverview: this.projScience.FFunctionalOverview,//部门职能概述
          FProjBasis: this.projScience.FProjBasis,//申报依据
          FFeasibility: this.projScience.FFeasibility,//可行性
          FNecessity: this.projScience.FNecessity,//必要性
          FLTPerformGoal:this.target.cqTarget,//长期目标
          FAnnualPerformGoal:this.target.ndTagetL//年度目标
        },
      }
      formData.append('UserId',JSON.stringify(data.UserId))
      for(let i in data.ProjectMst){
          formData.append(i,data.ProjectMst[i])
      }
      formData.append('ProjectDtlBudgetDtls',JSON.stringify(data.ProjectDtlBudgetDtls))
      formData.append('ProjectDtlImplPlans',JSON.stringify(data.ProjectDtlImplPlans))
      formData.append('ProjectDtlPerformTargets',JSON.stringify(data.ProjectDtlPerformTargets))
      formData.append('ProjectMst',JSON.stringify(data.ProjectMst))
      formData.append('ProjectDtlPurchaseDtls',JSON.stringify(data.ProjectDtlPurchaseDtls))
      formData.append('ProjectDtlPurDtl4SOFs',JSON.stringify(data.ProjectDtlPurDtl4SOFs))
      formData.append('ProjectDtlTextContents',JSON.stringify(data.ProjectDtlTextContents))
      debugger
      let itemName = ''
      //提交时判断项目概况是否已经填写完
      for(let i in this.projSurvey){
        if (this.projSurvey[i] === ''){
          this.projSurveyNull[i] = true
          this.addNull = false //不能提交表单
          //提示哪一项未录入
          if (!itemName){
            if( i ==='FProjName'){
              itemName = '项目名称'
            }else if (i ==='FLevel'){
              itemName = '项目级别'
            }else if (i ==='FDeclarationDept'){
              itemName = '申报部门'
            }else if (i ==='FBudgetDept'){
              itemName = '预算部门'
            }else if (i ==='ProjectPropers'){
              itemName = '项目属性'
            }else if (i ==='TimeLimits'){
              itemName = '存续期限'
            }else if (i ==='ExpenseCategories'){
              itemName = '支出类别'
            }else if (i ==='sedTime'){
              itemName = '起止日期'
            }
          }
        }
      }
      //提交时判断项目科研是否已经填写完成
      for(let i in this.projScience){
        if (this.projScience[i] == '') {
          this.projScienceNull[i] = true
          this.addNull = false //不能提交表单
          //提示哪一项未录入
          if (!itemName){
            if( i ==='FProjName'){
              itemName = '项目名称'
            }else if (i ==='FLevel'){
              itemName = '项目级别'
            }else if (i ==='FDeclarationDept'){
              itemName = '申报部门'
            }else if (i ==='FBudgetDept'){
              itemName = '预算部门'
            }else if (i ==='ProjectPropers'){
              itemName = '项目属性'
            }else if (i ==='TimeLimits'){
              itemName = '存储期限'
            }else if (i ==='ExpenseCategories'){
              itemName = '支出类别'
            }else if (i ==='sedTime'){
              itemName = '起止日期'
            }
          }
        }
      }
      //提交时判断判断效绩目标表格是否拉取到
      for(let i in this.target){
        if (this.target[i] === '' && this.target[i] !=='targetType'){
          this.targetNull[i] = true
          this.addNull = false //不能提交表单
          //提示哪一项未录入
          if (!itemName){
            if( i ==='FProjName'){
              itemName = '项目名称'
            }else if (i ==='FLevel'){
              itemName = '项目级别'
            }else if (i ==='FDeclarationDept'){
              itemName = '申报部门'
            }else if (i ==='FBudgetDept'){
              itemName = '预算部门'
            }else if (i ==='ProjectPropers'){
              itemName = '项目属性'
            }else if (i ==='TimeLimits'){
              itemName = '存储期限'
            }else if (i ==='ExpenseCategories'){
              itemName = '支出类别'
            }else if (i ==='sedTime'){
              itemName = '起止日期'
            }
          }
        }
        if (!itemName){
          itemName = i;
        }
      }

      // //提交时判断判断效绩目标表格是否拉取到
      // if (this.projSurvey.FIfPerformanceAppraisal == 1 ){
      //   if (this.target.targetType ===''){
      //     this.targetNull.targetType = true
      //     this.addNull = false //不能提交表单
      //   }
      // }
      if (this.addNull) {

        this.postAxios('/GXM/ProjectMstApi/PostSaveProject', data).then((res) => {
          if (res.Status ==='success'){
            this.upFile(res.KeyCodes[0])
            if(type === 'bc'){
              this.$msgBox.show('新增成功')
              this.$emit("refresh",res,'add')
            } else if (type ==='bcss') {
              let arr = [];
              arr.push({
                PhId:res.KeyCodes[0]
              })
              this.approvalDataS.openDialog = true
              this.approvalDataS.data = arr
            } else if (type ==='zc') {
              this.$msgBox.show('暂存成功')
              this.$emit("refresh",res,'add')
            }
            console.log(res)


          }else {
            this.$msgBox.error('新增失败'+res.Msg)
          }
        }).catch(err => {

        })
      }else {
        this.$msgBox.error(itemName+'未录入')
      }
      console.log(data)

    },
    //输入框值改变
    valueChange (item) {
      let ImpStatus = this.ImplPlanPanelData[0].FName !== '' ||
        this.ImplPlanPanelData[0].FAmount !== '' ||
        this.ImplPlanPanelData[0].FPaymentMethod !== '' ||
        this.ImplPlanPanelData[0].FSourceOfFunds !== '' ||
        this.ImplPlanPanelData[0].FOtherInstructions !== '';
      //预算明细第一行是否为空，只要有一列有值就不为空
      let budgetStatus = this.budgetdetailData[0].FName !== '' ||
        this.budgetdetailData[0].FAmount !== '' ||
        this.budgetdetailData[0].FPaymentMethod !== '' ||
        this.budgetdetailData[0].FSourceOfFunds !== '' ||
        this.budgetdetailData[0].FOtherInstructions !== '';
      //1、当预算明细不为空，实施明细为空时
      if (!ImpStatus && budgetStatus) {
        if (!this.tabStatus.fristSwatchTab) {
          this.$confirm('明细项目发生变化，是否完善实施计划？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: "warning",
            center: true,
            closeOnPressEscape: false
          }).then(() => {
            let [...arr] = this.budgetdetailData
            this.ImplPlanPanelData = JSON.parse(JSON.stringify([...arr]))
            this.tabStatus.fristSwatchTab = true
            this.tabindex = 2
            this.cacheAddData = []//确认后清空缓存新增加的数据
          }).catch(() => {
            this.tabindex = 1
          })
        }
      } else {
        if (this.cacheAddData.length !== 0) {//判断缓存新增的数据是否为空，不为空就讲新加的合计到实施计划上
          let arr = JSON.parse(JSON.stringify([...this.cacheAddData]))
          this.ImplPlanPanelData = [...this.ImplPlanPanelData, ...arr]
          this.cacheAddData = []//确认后清空缓存新增加的数据
          this.$confirm('明细项目发生变化，是否完善实施计划？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: "warning",
            center: true,
            closeOnPressEscape: false
          }).then(() => {
            this.tabindex = 2
            this.cacheAddData = []//确认后清空缓存新增加的数据
          }).catch(() => {
            this.tabindex = 1
            this.cacheAddData = []//确认后清空缓存新增加的数据
          })
        } else {
          this.$confirm('明细项目发生变化，是否完善实施计划？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: "warning",
            center: true,
            closeOnPressEscape: false
          }).then(() => {
            for (let key in this.ImplPlanPanelData){
              if ( item.id ===this.ImplPlanPanelData[key].id){
                this.ImplPlanPanelData[key].FName = item.FName
              }
            }
            this.tabindex = 2
            this.cacheAddData = []//确认后清空缓存新增加的数据
          }).catch(() => {

            this.tabindex = 1
            this.cacheAddData = []//确认后清空缓存新增加的数据
          })
        }
      }
    },
    //绩效指标类别节点选择
    nodeClick(nodeItem,node,nodeSelf){
      this.target.targetType = nodeItem
      this.target.popover = false;
      this.getPerformEvalTargets(nodeItem)
    },
    //根据指标类型获取指标明细
    getPerformEvalTargets(nodeItem){
      let data = {
        orgid:this.Orgid,
        orgCode:this.OrgCode,
        TargetTypeCode:nodeItem.FCode
      };
      this.getAxios('/GQT/QTSysSetApi/GetPerformEvalTargets',data).then(res=>{
        if (res){
          this.target.targetTableData = res.Data
          console.log(this.target.targetTableData)
        }else {
          this.$msgBox.error('请求出错')
        }
      }).catch(err=>{

      })
    },
    //指标表格鼠标移入事件
    mouseEnter(idx){
      this.nowIndex = idx
    },
    //指标表格鼠标移出事件
    mouseLeave(){
      this.nowIndex = -1
    },
    //添加效绩目标表格项
    addTargetItem(item,idx){
      let data = JSON.parse(JSON.stringify(item));
      data.FTargetName='';
      data.FTargetValue='';
      data.FTargetWeight='';
      data.FTargetDescribe='';

      this.target.targetTableData.splice(idx+1,0,data)
      this.$msgBox.show('已添加新数据，请调整权值，所有权重值相加必须等于100')
    },
    //删除效绩目标表格项
    delTargetItem(idx){
      this.target.targetTableData.splice(idx,1)
      let sum = 0
      for (let i in this.target.targetTableData) {
        if (this.target.targetTableData[i].FTargetWeight) {
          sum = sum + parseInt(this.target.targetTableData[i].FTargetWeight)
        }
      }
      this.$msgBox.show('已删除数据，请调整权值，所有权重值相加必须等于100，当前值为:'+sum)
    },
    //权重值改变时提示
    targetWeight(){
      let sum = 0
      for (let i in this.target.targetTableData) {
        if (this.target.targetTableData[i].FTargetWeight) {
          sum = sum + parseInt(this.target.targetTableData[i].FTargetWeight)
        }
      }
      if (sum !== 100){
        this.$msgBox.show('权重值已改变，所有权重值相加必须等于100，当前值为:'+sum)
      }
    },
    //审批弹框关闭时的回调
    handleDelete(data){
      this.approvalDataS.openDialog = false
      this.$emit("refresh",'','add')
    },
    //填报预览
    preview(){
      let ProjectDtlBudget = []
      let ProjectDtlImpl = []
      for (let i in this.budgetdetailData){
        ProjectDtlBudget.push({
          FName:this.budgetdetailData[i].FName,
          FAmount:this.budgetdetailData[i].FAmount.replace(',',''),
          FPaymentMethod_EXName:this.budgetdetailData[i].FPaymentMethod?this.budgetDetail.fundPayGroup.filter(item => item.TypeCode ===this.budgetdetailData[i].FPaymentMethod )[0].TypeName:'',
          FOtherInstructions:this.budgetdetailData[i].FOtherInstructions,
        })
      }
      for (let i in this.ImplPlanPanelData) {
        ProjectDtlImpl.push({
          FImplContent:this.ImplPlanPanelData[i].FName,
          FStartDate:this.ImplPlanPanelData[i].sedTime[0],
          FEndDate:this.ImplPlanPanelData[i].sedTime[1]
        })
      }
      let data = {
        ProjectDtlBudgetDtls:ProjectDtlBudget,
        ProjectDtlFundAppls:[],
        ProjectDtlImplPlans:ProjectDtlImpl,
        ProjectDtlPerformTargets:{},
        ProjectDtlPurDtl4SOFs:{},
        ProjectDtlPurchaseDtls:{},
        ProjectDtlTextContents:{
          FLTPerformGoal:this.target.cqTarget,
          FAnnualPerformGoal:this.target.ndTagetL
        },
        ProjectMst:{
          FProjName:this.projSurvey.FProjName,
          PhId:'无',
          FDeclarationDept_EXName:this.projSurvey.FDeclarationDept?this.projGroup.FDeclarationDeptGroup.filter(item => item.deptCode ===this.projSurvey.FDeclarationDept )[0].deptName:'',
          FDateofDeclaration:(new Date()).getDate(),
          FDeclarer:this.UserName,
          FProjCode:'无',
          FProjAttr_EXName:this.projSurvey.ProjectPropers?this.projGroup.ProjectPropersGroup.filter(item => item.TypeCode ===this.projSurvey.ProjectPropers )[0].TypeName:'',
          FMeetingTime:'无',
          FMeetiingSummaryNo:'无'
        }
      }
      this.itemDetail = data
        this.detailDialog = true
    },
    //上传附件
    uploadFile(){
      this.uploadVis = true
    },
    submitFn(val){
       console.log('++',val);
       this.choosedIndexAndPro.index = val.length
        this.choosedIndexAndPro.pro.QtAttachments = val
      this.uploadVis = false;
    },
    upFile(code){
      debugger
      let formData = new FormData
      formData.append('PhId',code)
      let fileList = this.choosedIndexAndPro.pro.QtAttachments;
      for (let file of fileList){
        formData.append('files',file.raw)
      }
        this.formAxios('/GXM/ProjectMstApi/PostSaveProject2',formData).then(res=>{
          console.log(res)
        }).catch()
    },

  }
}
</script>
<style lang="scss" scoped>
.prerojectnewproject {
  .dialog-title {
    overflow: hidden;

    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }

  .btn-left {
    float: left;
    font-size: 0.16rem;
    line-height: 28px;
    color: $yellowColor;
    .bottom-info{
      height: 20px;
      ul{
        list-style: none;
        margin-left: 10px;
        li{
          display: inline-block;
          float: left;
          margin-left: 20px;
          span{
            color: #ff9800
          }
        }
      }
    }
  }

  .top-btn {
    text-align: right;

    > .btn {
      width: 80px;

      &:not(:last-of-type) {
        /*margin-right: 15px;*/
      }
    }
  }

  .left-box {
    width: 20%;
    border-radius: 0.05rem;
    background: #fff;
    float: left;
    box-shadow: 0px 2px 6px #26659b80;
    overflow: hidden;

    .tb {
      width: 100%;
      height: 0.35rem;
      background: #3294e8;
      text-align: center;
      line-height: 0.35rem;
      font-size: 0.2rem;
      color: #fff;
    }

    ul {
      width: 100%;
      overflow: hidden;

      li {
        margin: 10px;
        padding-left: 85px;
        overflow: hidden;
        font-size: $mainfontsize;
        border-bottom: 1px solid $borderColor_ccc;

        > span {
          position: relative;
          float: left;
          left: -85px;
          line-height: 32px;
          width: 85px;
        }

        > div {
          float: left;
          position: relative;
          margin-left: -85px;

          &.el-select {
            width: 100%;
          }

          &.el-date-editor {
            .el-input__icon.el-range__icon.el-icon-date {
              display: none;
              background-color: #000;
            }
          }
        }
      }
    }
  }

  .right-box {
    width: 80%;
    float: right;
    height: 100%;
    min-height: 700px;
    position: relative;
    padding-left: 0.4rem;

    > ul {
      position: absolute;
      width: 0.3rem;
      font-size: 0.14rem;
      left: 0.12rem;
      text-align: justify;
      margin-top: 10px;

      > li.tab {
        width: 93%;
        height: 0.8rem;
        padding: 5px 0;
        box-sizing: content-box;
        float: left;
        color: #fff;
        background: #cacaca;
        color: #676767;
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
        text-align: center;
        margin-bottom: 5px;
        cursor: pointer;

        &.active {
          color: rgb(255, 255, 255);
          background: rgb(50, 148, 232);
        }
      }
    }

    .right-box-container {
      border-radius: 0.05rem;
      background: #fff;
      height: 90%;
      float: right;
      padding: 10px;
      position: absolute;
      top: 0;
      left: 0.4rem;
      right: 0;
      bottom: 0;
      box-shadow: 0px 2px 6px #26659b80;
      overflow: auto;

      > ul.textareas {
        height: 100%;

        li {
          position: relative;
          min-height: 10%;
          margin-bottom: 10px;

          > span {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 0.14rem;
            z-index: 1;
            padding-left: 15px;
          }

          .el-textarea {
            font-size: 0.14rem;

            .el-textarea__inner {
              padding-top: 0.2rem;
            }
          }
        }
      }

      > div.budgetdetail {
        position: absolute;
        top: 5px;
        bottom: 10px;
        left: 10px;
        right: 0px;

        .list {
          position: relative;
          width: 100%;

          &:after {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 17px;
            content: "";
            background: #fff;
          }

          ul {
            width: 100%;

            > li {
              float: left;
              border: 1px solid $borderColor_ccc;
              border-width: 0 1px 1px 0;
              height: 40px;
              line-height: 40px;
              font-size: 0.16rem;

              &:first-of-type {
                width: 6%;
                border-left: 1px solid $borderColor_ccc;
              }

              &:nth-of-type(2) {
                width: 16%;
              }

              &:nth-of-type(3) {
                width: 12%;
              }

              &:nth-of-type(4) {
                width: 13%;
              }

              &:nth-of-type(5) {
                width: 11%;
              }

              &:nth-of-type(6) {
                width: 15%;
              }

              &:nth-of-type(7) {
                 width: 27%;
               }
              /*&:nth-of-type(8) {*/
              /*  width: 18%;*/
              /*}*/
              > label {
                line-height: 40px;
                margin-right: 10px;
              }

              > .el-icon-setting {
                line-height: 40px;
                font-size: 0.17rem;
                color: $orgdisabled;
                cursor: not-allowed;

                &.canSetting {
                  color: $btnColor;
                  cursor: pointer;
                }
              }
            }
          }

          .listHead {
            overflow-y: scroll;
            padding-right: 25px;
            font-size: 0.18rem;
            color: #fff;

            > ul {
              height: 100%;

              > li {
                float: left;
                background: $btnColor;
                border-top: 1px solid $borderColor_ccc;
              }
            }
          }

          &.plan ul li {
            &:nth-of-type(2) {
              width: 60%;
            }

            &:nth-of-type(3) {
              width: 34%;
            }
          }
        }

        .listBodyCon {
          height: 70%;
          padding-bottom: 40px;

          &:after {
            bottom: 38px;
          }
        }

        .listBody {
          overflow-y: scroll;
          padding-right: 25px;
          height: 100%;
          border-bottom: 1px solid #e3e3e3;
          ul li:not(:first-of-type) {
            font-size: 0;
          }
          li .opentextarea {
            position: absolute;
            top: 0;
            left: 15px;
            bottom: 0;
            right: 15px;
            font-size: $mainfontsize;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .enable {
            position: relative;

            > div > img {
              height: 20px;
              vertical-align: middle;
            }

            > .icon {
              display: none;
              position: absolute;
              right: -20px;
              top: 0;
              z-index: 999;
              width: 20px;
              padding-left: 5px;
              height: 100%;

              > div {
                width: 100%;
                height: 50%;
                cursor: pointer;

                > img {
                  width: 100%;
                  height: 16px;
                }
              }
            }
          }

          ul:hover {
            .enable > .active {
              display: block;
            }
          }
        }

        .listBottom {
          height: 150px;
          margin-top: -20px;

          .listBottom-left {
            font-size: 0.30rem;
            width: 50%;
            height: 150px;
            display: inline-block;
            float: left;

            > span {
              line-height: 150px;
            }

            .money {
              color: #f44336;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
            }
          }

          .listBottom-right {
            width: 40%;
            display: inline-block;
            float: left;
            text-align: left;

            .title {
              margin-left: 20px;
            }

            .money {
              float: right;
            }
          }
        }
      }

      > div.jxtarget {
        > .line1 {
          text-align: left;

          &::after {
            content: "";
            display: block;
            clear: both;
          }

          > div:first-of-type {
            width: 48%;
            float: left;
          }

          > div:nth-of-type(2) {
            width: 48%;
            float: right;
          }
        }

        > .line2 {
          text-align: left;
          padding-left: 120px;
          border-bottom: 1px solid $borderColor_ccc;
          margin-top: 10px;
          padding-bottom: 3px;

          > span {
            position: relative;
            left: -120px;
            float: left;
            line-height: 32px;
          }

          > div {
            margin-left: -120px;
            width: 100%;
          }
        }

        > .line3 {
          position: absolute;
          bottom: 0;
          top: 230px;
          left: 10px;
          right: 60px;
          overflow: hidden;

          .tableHead {
            table {
              padding: 0;
            }
            th {
              color: #fff;
              height: 48px;
              border-right: 1px solid #fff;
              background: $btnColor;
            }
          }

          .tableBody {
            top: 58px;
            bottom: 10px;

            table {
              border: 1px solid $borderColor_ccc;
              padding: 0;
              border-spacing: 0;
              tr:hover {
                box-shadow: none;

              }
              tr{
                box-shadow: none;
              }
              .enable {
                position: relative;
                width: 25px;
                border-bottom: none;
                border-top:none ;
                > div > img {
                  height: 18px;
                  vertical-align: middle;
                }

                > .icon {
                  display: block;
                  /*position: absolute;*/
                  width: 18px;
                  /*padding: 5px 0 0 5px;*/
                  /*height: 100%;*/

                  > div {
                    width: 100%;
                    cursor: pointer;
                    height: 18px;
                    > img {
                      width: 100%;
                      /*height: 16px;*/
                    }
                  }
                }
              }
            }

            td {
              border-radius: 0;
              border-bottom: 1px solid $borderColor_ccc;
              border-left-color: $borderColor_ccc;

            }
          }
        }
      }
    }
  }
  .select-row {
    > li {
      background-color: #eaeaea;
    }
  }
}
</style>
<style scoped>
  .td-ipt>>> .el-input__inner{
      border: none;
  }
  /*设置未填项样式*/
  .null-projS{
    border-bottom: 1px #ef5b47 solid !important;
  }
  .null-projSc >>> .el-textarea__inner{
    border:1px #ef5b47 solid !important;
  }
  .applyDetailDialog >>> .el-dialog__header {
    padding: 10px 0 0 0;
  }
  .applyDetailDialog >>> .el-dialog__body {
    padding: 0 20px;
  }
  .applyDetailTitle {
    text-align: left;
    border-bottom: 1px solid #eaeaea;
    height: 30px;
  }
</style>
<style lang="stylus">
.prerojectnewproject
  .left-box
    .el-input__inner
      border 0
    .el-date-editor.el-range-editor.el-input__inner
      width 100%
      padding 0
      .el-range-separator
        padding 0
      .el-range-input
        margin-left 5px
      input, i, span
        font-size 0.14rem
        line-height 32px
        height 32px
      .el-input__icon.el-range__icon.el-icon-date
        display none
        background-color #000
  .right-box
    ul.textareas li
      .el-textarea .el-textarea__inner
        padding-top 0.2rem
    div.budgetdetail
      .list
        &.plan .listBody li .el-date-editor
          width 100%
          > input
            text-align center
          .el-input__prefix
            display none
      .listBody
        .el-input__inner
          border 0
          background-color transparent
        .money .el-input__inner
          text-align right
        .el-radio__label
          font-size 0.17rem
    div.jxtarget
      .line2
        .el-input__inner
          border 0
.setBuyDialog
  .el-dialog__body
    padding-top 0
</style>


