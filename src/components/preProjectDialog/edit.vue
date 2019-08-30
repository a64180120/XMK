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
                       @click="submit('bc')">保存</el-button>
            <el-button class="btn"
                       size="mini"
                       @click="submit('bcss')">保存并送审</el-button>
            <el-button class="btn"
                       size="mini"
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
                       @click="preview()"
                       size="mini">填报预览</el-button>
          </div>
        </slot>
      </el-col>
      <div class="left-box">
        <div class="tb">项目概况</div>
        <ul>
          <li :class="[projSurvey.FProjName === ''?'null-projS':'']">
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
          <li>
            <span>项目级别：</span>
            <el-select v-model="projSurvey.FLevel"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.FLevelGroup"
                         :key="idx"
                         :label="item.TypeName"
                         :value="item.TypeCode"></el-option>
            </el-select>
          </li>
          <li>
            <span>申报部门：</span>
            <el-select v-model="projSurvey.FDeclarationDept"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.FDeclarationDeptGroup"
                         :key="idx"
                         :label="item.deptName"
                         :value="item.deptCode"></el-option>
            </el-select>
          </li>
          <li>
            <span>预算部门：</span>
            <el-select v-model="projSurvey.FBudgetDept"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.FBudgetDeptGroup"
                         :key="idx"
                         :label="item.OName"
                         :value="item.OCode"></el-option>
            </el-select>
          </li>
          <li>
            <span>项目属性：</span>
            <el-select v-model="projSurvey.ProjectPropers"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.ProjectPropersGroup"
                         :key="idx"
                         :label="item.TypeName"
                         :value="item.TypeCode"></el-option>
            </el-select>
          </li>
          <li>
            <span>存续期限：</span>
            <el-select v-model="projSurvey.TimeLimits"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.TimeLimitsGroup"
                         :key="idx"
                         :label="item.TypeName"
                         :value="item.TypeCode"></el-option>
            </el-select>
          </li>
          <li>
            <span>支出类别：</span>
            <el-select v-model="projSurvey.ExpenseCategories"
                       size="small"
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
          <li >
            <span>起止日期：</span>
            <el-date-picker size="small"
                            v-model="projSurvey.sedTime"
                            type="daterange"
                            range-separator="至"
                            :clearable="false"
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
                        v-model="projScience.FFunctionalOverview"></el-input>
            </li>
            <li>
              <span>申报依据：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="250"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="限250字以内（必填）"
                        v-model="projScience.FProjBasis"></el-input>
            </li>
            <li>
              <span>可行性：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="250"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="限250字以内（必填）"
                        v-model="projScience.FFeasibility"></el-input>
            </li>
            <li>
              <span>必要性：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="250"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="限250字以内（必填）"
                        v-model="projScience.FNecessity"></el-input>
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
                  <li>支出功能分类科目</li>
                  <li>集中采购</li>
                  <li>测算过程及其他说明事项</li>
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
                  <li>
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
                <span>总计项目金额：</span>
                <span class="money">{{TotalAmount | NumFormat}}</span>
              </div>
              <!--细项目金额统计-->
              <div class="listBottom-right">
                <span>其中:</span>
                <ul>
                  <li  v-if=" budgetDetail.FSourceOfFundsGroup.length !==0" v-for="(item,idx) in budgetDetail.FSourceOfFundsGroup">
                    <span class="title">{{item.MC}}</span>
                    <span class="money">{{budgetdetailData.filter(i=>i.FSourceOfFunds===item.DM).reduce((prev,cur)=>prev+parseFloat((Number((cur.FAmount).replace(/[,]/g, ''))).toFixed(2)),0) | NumFormat}}</span>
                  </li>
                  <li v-else style="text-align: center;color: #eaeaea"> 暂无数据 </li>
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
                    <el-input v-model="item.FImplContent"
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
                        <img @click="del(item,index)"
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
                          maxlength="250"
                          :rows="6"
                          placeholder="限250字以内（必填）"
                          v-model="target.ndTagetL"></el-input>
              </div>
              <div>
                <span>长期绩效目标：</span>
                <el-input type="textarea"
                          show-word-limit
                          maxlength="250"
                          :rows="6"
                          placeholder="限250字以内（必填）"
                          v-model="target.cqTarget"></el-input>
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
                <div  slot="reference" style="width: 300px;border-bottom: 1px solid #e3e3e3">
                  <span>{{target.targetType.FName}}</span>
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
                       :data="textareaDialogData"></textarea-dialog>
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
        @submit="submitFn"  v-if="uploadVis" :fileItem="choosedIndexAndPro.pro.QtAttachments"></file-up>
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
    name: 'edit',
    props: {
      data:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    components: {FileUp,ItemPrint,GoApproval, addBr, setBuy, textareaDialog },
    data () {
      return {
        timeClearable: false,
        //文本域最大字数
        maxWord: "600",
        //项目概况
        projSurvey: {
          FProjName: '', //项目名称
          FDeclarationDept: '', //申报部门
          FLevel: '', //项目级别
          FBudgetDept: '', //预算部门
          ProjectPropers: '', //项目属性
          TimeLimits: '', //存续期限
          ExpenseCategories: '', //支出类别
          sedTime: '', //起止日期
          FIfPerformanceAppraisal: 2//是否绩效评价	(Yes = 1,No = 2)（绩效目标里的绩效指标是否显示）（默认否）
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
          ]
        },
        //项目科研四大文本框内容
        projScience: {
          FFunctionalOverview: '', //部门职能概述
          FProjBasis: '', //申报依据
          FFeasibility: '', //可行性
          FNecessity: '' //必要性
        },
        //预算明细表数据
        budgetDetail: {
          copyLine: false, //复制行
          FSourceOfFundsGroup: [], //资金源组
          fundPayGroup: [] //支付方式下拉项组
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
            FName:'请选择'
          },
          //绩效目标节点选择后请求的表格值
          targetTableData:[],
          ndTagetL:"",
          cqTarget:""
        },
        inp: '',
        yearSelect: '',
        value1: '',
        textarea: '',
        type: '',
        tabindex: 0,//当前的tab页
        tabOldIndex: 0,//前一个Tab页码
        copyLine: false,
        tabsList: ['项目科研', '预算明细', '实施计划', '绩效目标'],
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


        PurchaseDtls:[],//集中采购
        PurDtl4SOFs:{},//资金来源


        dataDtl:{},

        //主表
        projectMst:{},
        //缓存预算明细的删除项
        delBdData:[],
        //缓存实施计划的删除项
        delIppData:[],

        //判断是否是原始指标明细数据
        isOldTTData:true,
        //缓存被替换的原始指标明细
        oldTTData:[],
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
        money:0
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
      this.getProjectMst();
      this.getDeclareList();
      this.getAllBasicData();
      this.getTargetTypeTree();
      this.getBudegDepart();
      //
    },
    methods: {
      //请求当前行详细
      getProjectMst(){
        let data = {
          FProjPhId: this.data.PhId
        }
        this.getAxios('/GXM/ProjectMstApi/GetProjectMst', data).then(res => {
          //获取附件
          this.choosedIndexAndPro.index = res.ProjectAttachments.length
          this.choosedIndexAndPro.pro.QtAttachments= res.ProjectAttachments
          this.dataDtl  = res;
          //项目概况赋值
          this.projectMst = res.ProjectMst;
          this.yearSelect = res.ProjectMst.FYear;
          this.projSurvey.FProjName = res.ProjectMst.FProjName;
          this.projSurvey.FDeclarationDept = res.ProjectMst.FDeclarationDept;
          this.projSurvey.FLevel = res.ProjectMst.FLevel;
          this.projSurvey.FBudgetDept = res.ProjectMst.FBudgetDept;
          this.projSurvey.ProjectPropers = res.ProjectMst.FProjAttr;
          this.projSurvey.TimeLimits = res.ProjectMst.FDuration;
          this.projSurvey.ExpenseCategories = res.ProjectMst.FExpenseCategory;
          this.projSurvey.sedTime = [res.ProjectMst.FStartDate,res.ProjectMst.FEndDate];
          this.projSurvey.FIfPerformanceAppraisal = res.ProjectMst.FIfPerformanceAppraisal;
          //项目科研四大文本框内容
          this.projScience = {
              FFunctionalOverview: res.ProjectDtlTextContents.FFunctionalOverview, //部门职能概述
              FProjBasis: res.ProjectDtlTextContents.FProjBasis, //申报依据
              FFeasibility:  res.ProjectDtlTextContents.FFeasibility, //可行性
              FNecessity:  res.ProjectDtlTextContents.FNecessity //必要性
          };
          //预算明细表数据

          console.log('拉取1到的：',res)
          for (let i in res.ProjectDtlBudgetDtls) {
            res.ProjectDtlBudgetDtls[i].FAmount = res.ProjectDtlBudgetDtls[i].FAmount.toString()
            let decimals = 2;
            let decPoint='.';
            let thousandsSep = ','
            if (!res.ProjectDtlBudgetDtls[i].FAmount) return '0.00'
            res.ProjectDtlBudgetDtls[i].FAmount = (res.ProjectDtlBudgetDtls[i].FAmount + '').replace(/[^0-9+-Ee.]/g, '')
            let n = !isFinite(+res.ProjectDtlBudgetDtls[i].FAmount) ? 0 : +res.ProjectDtlBudgetDtls[i].FAmount
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
            res.ProjectDtlBudgetDtls[i].FAmount =  s.join(dec)
          }
          this.budgetdetailData =res.ProjectDtlBudgetDtls

          //实施计划
          this.ImplPlanPanelData = res.ProjectDtlImplPlans
          for (let i in res.ProjectDtlImplPlans){
            this.ImplPlanPanelData[i].FImplContent = res.ProjectDtlImplPlans[i].FImplContent;
            this.ImplPlanPanelData[i].sedTime = [res.ProjectDtlImplPlans[i].FStartDate,res.ProjectDtlImplPlans[i].FEndDate];
            this.ImplPlanPanelData[i].FName = res.ProjectDtlImplPlans[i].FName;
          }
          //集中采购数据
          this.PurchaseDtls = res.ProjectDtlPurchaseDtls;
          //集中采购 资金来源
          this.PurDtl4SOFs = res.ProjectDtlPurDtl4SOFs;
          //绩效目标

          if (res.ProjectDtlTextContents!==null){
            this.target.ndTagetL = res.ProjectDtlTextContents.FAnnualPerformGoal
            this.target.cqTarget = res.ProjectDtlTextContents.FLTPerformGoal
          }

          //效绩目标表格
          this.target.targetTableData = res.ProjectDtlPerformTargets
          //绩效指标类别
          if (res.ProjectDtlPerformTargets.length !==0){
            this.target.targetType.FName = res.ProjectDtlPerformTargets[0].FTargetTypeCode_EXName
            this.target.targetType.FCode = res.ProjectDtlPerformTargets[0].FTargetTypeCode
          }
          console.log('拉取到的：',res)
        }).catch(err => {
          this.$emit('refresh')
          this.$msgBox.error('请求失败')
        })
      },
      //获取预算部门
      getBudegDepart(){
        let data  = {
          orgid:this.Orgid,
          uid:this.UserId
        }
        this.getAxios('/GQT/CorrespondenceSettingsApi/GetDeptByUnit',data).then(res=>{
          console.log(res)
          this.projGroup.FBudgetDeptGroup = res.Record

        }).catch(err=>{
          console.log(err)
        })
      },
      //获取申报部门集合
      getDeclareList () {
        let data = {
          orgCode: this.OrgCode,
          usercode: this.UserCode ? this.UserCode : '9999',
          orgid: this.Orgid
        }
        this.getAxios('/GQT/CorrespondenceSettingsApi/GetFDeclarationUnit', data)
          .then(res => {
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
            this.projGroup.ExpenseCategoriesGroup = res.ExpenseCategories;
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
      addBudgetdetail (val) {
        let data = (new Date()).getTime();
        let item = JSON.parse(JSON.stringify(val));
        item.FImplContent = item.FName;
        item.PhId = '';
        if ( this.budgetDetail.copyLine) {
          for (let i in this.PurchaseDtls) {
            if (this.PurchaseDtls[i].FDtlCode === item.FDtlCode){
              item.FContent = this.PurchaseDtls[i].FContent
              item.FName = this.PurchaseDtls[i].FName
              item.FPrice = this.PurchaseDtls[i].FPrice
              item.FProcedureCode = this.PurchaseDtls[i].FProcedureCode
              item.FQty = this.PurchaseDtls[i].FQty
              item.FRemark = this.PurchaseDtls[i].FRemark
              item.FSpecification = this.PurchaseDtls[i].FSpecification
              item.FTypeCode = this.PurchaseDtls[i].FTypeCode
              item.FCatalogCode = this.PurchaseDtls[i].FCatalogCode
              item.FDtlCode = ''
            }
          }
        }
        if (this.projSurvey.sedTime){
          item.sedTime = this.projSurvey.sedTime
        }
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
              FAmount: "0.00",//金额	必填
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
              FImplContent:"",//实施内容	必填

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
        if (this.budgetdetailData.length>0)
        if (this.budgetDetail.copyLine) {
          this.valueChange()
        }
      },
      delBudgetdetail (val, index) {
        let id = val.id
        let status = false
        if (val.PhId){
          for (let i in this.budgetdetailData) {
            if(val.PhId === this.budgetdetailData[i].PhId){
              this.budgetdetailData[i].PersistentState = 3;
              let arr  = JSON.parse(JSON.stringify(this.budgetdetailData[i]));
              this.delBdData.push(arr);
              this.budgetdetailData.splice(i,1)
            }
          }
          for (let i in this.PurchaseDtls) {
            if (val.FDtlCode === this.PurchaseDtls[i].FDtlCode){
              this.PurchaseDtls.splice(i,1)
            }
          }
          for (let i in this.PurDtl4SOFs) {
            if (val.FDtlCode === this.PurDtl4SOFs[i].FDtlCode){
              this.PurDtl4SOFs.splice(i,1)
            }
          }
        }
        //将实施计划删除行标记
        if (val.id){
          for (let key in this.ImplPlanPanelData) {
            if (id === this.ImplPlanPanelData[key].id) {
              this.delRow = key
              status = true
            }
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
        }
      },
      add (val) {
        let item = JSON.parse(JSON.stringify(val));
        item.PhId = '';
        console.log(item)
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
      del (item,index) {
        if (this.ImplPlanPanelData.length === 1) {
          this.ImplPlanPanelData[0] = {}
        } else {
          this.delRow = -1
          if (item.PhId){
            this.ImplPlanPanelData.splice(index, 1);
            item.PersistentState=3;
            this.delIppData.push(item)
          }else {
            this.ImplPlanPanelData.splice(index, 1)
          }

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
        if (item.FSourceOfFunds === '') {
          this.$msgBox.error('请先设置资金来源！')
          return
        }
        this.setBuyDialog.openDialog = true;
        let arr = []
        if(item.FDtlCode){
          for (let i  in this.PurchaseDtls){
            if (item.FDtlCode === this.PurchaseDtls[i].FDtlCode){
              arr[0] = this.PurchaseDtls[i];
              arr[0].FSourceOfFunds = item.FSourceOfFunds;
              arr[0].FAmount = item.FAmount;
            }
          };
        }else {
          arr[0] = item
        }
        arr[0] =  JSON.parse(JSON.stringify(arr[0]));
        console.log(arr[0])
        this.setBuyDialog.data = arr[0]
      },
      openTextarea (item, property) {
        if (property ==='FProjName'){
          this.maxWord = '100'
        }
        if (property === 'FOtherInstructions'){
          this.maxWord = '250'
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

      },
      //保存
      submit (type) {
        console.log(this.target.targetTableData)
        //预算主表对象

        let projectMst = this.dataDtl.ProjectMst;
        projectMst.FProjName = this.projSurvey.FProjName;
        projectMst.FDeclarationDept = this.projSurvey.FDeclarationDept;
        projectMst.FLevel = this.projSurvey.FLevel;
        projectMst.FBudgetDept = this.projSurvey.FBudgetDept;
        projectMst.FProjAttr = this.projSurvey.ProjectPropers;
        projectMst.FDuration = this.projSurvey.TimeLimits;
        projectMst.FExpenseCategory = this.projSurvey.ExpenseCategories;
        projectMst.FStartDate = this.projSurvey.sedTime[0];
        projectMst.FEndDate = this.projSurvey.sedTime[1];
        projectMst.FIfPerformanceAppraisal = this.projSurvey.FIfPerformanceAppraisal;
        projectMst.BusinessPrimaryKeys = ''
        projectMst.Creator = ''
        projectMst.CurOrgId = ''
        projectMst.Editor = ''
        projectMst.ExtendObjects = ''
        projectMst.ForeignKeys = ''
        projectMst.NgInsertDt = ''
        projectMst.NgUpdateDt = ''
        projectMst.PropertyBytes = ''
        projectMst._OldIdValue_ = ''
        projectMst.FBudgetAmount = this.TotalAmount
        projectMst.FProjAmount = this.TotalAmount
        //
        let projectDtlTextContents = this.dataDtl.ProjectDtlTextContents;
        projectDtlTextContents.FAnnualPerformGoal = this.target.ndTagetL;
        projectDtlTextContents.FLTPerformGoal = this.target.cqTarget;
        projectDtlTextContents.FFunctionalOverview = this.projScience.FFunctionalOverview;
        projectDtlTextContents.FProjBasis = this.projScience.FProjBasis;
        projectDtlTextContents.FFeasibility = this.projScience.FFeasibility;
        projectDtlTextContents.FNecessity = this.projScience.FNecessity;
        projectDtlTextContents.BusinessPrimaryKeys = ''
        projectDtlTextContents.Creator = ''
        projectDtlTextContents.CurOrgId = ''
        projectDtlTextContents.Editor = ''
        projectDtlTextContents.ExtendObjects = ''
        projectDtlTextContents.ForeignKeys = ''
        projectDtlTextContents.NgInsertDt = ''
        projectDtlTextContents.NgUpdateDt = ''
        projectDtlTextContents.PropertyBytes = ''
        projectDtlTextContents._OldIdValue_ = ''
        //预算明细的采购
        let addPurchaseDtls = []
        let addPurDtl4SOFs = []
        for (let i in this.budgetdetailData){
          if (this.budgetdetailData[i].id){
            addPurchaseDtls.push({
              FDtlCode:'',//明细项目代码	必填（明细项目带入）
              FName:this.budgetdetailData[i].FName,//明细项目名称	必填（明细项目带入）
              FContent:this.budgetdetailData[i].FContent,
              FCatalogCode:this.budgetdetailData[i].FCatalogCode,
              FTypeCode:this.budgetdetailData[i].FTypeCode,
              FProcedureCode:this.budgetdetailData[i].FProcedureCode,
              FMeasUnit:this.budgetdetailData[i].FMeasUnit,
              FQty:this.budgetdetailData[i].FQty,
              FPrice:this.budgetdetailData[i].FPrice,
              FAmount:this.budgetdetailData[i].FAmount?this.budgetdetailData[i].FAmount.replace(',',''):'0.00',
              FSpecification:this.budgetdetailData[i].FSpecification,
              FRemark:this.budgetdetailData[i].FRemark,
              FEstimatedPurTime:this.budgetdetailData[i].FEstimatedPurTime,
            });
            addPurDtl4SOFs.push({
              FDtlCode:'',//明细项目代码	必填（明细项目带入）
              FName:this.budgetdetailData[i].FName,//明细项目名称	必填（明细项目带入）
              FSourceOfFunds:this.budgetdetailData[i].FSourceOfFunds,
              FAmount:this.budgetdetailData[i].FAmount
            })
          }
        }
        for (let i in this.budgetdetailData) {
          this.budgetdetailData[i].FAmount = this.budgetdetailData[i].FAmount.replace(/,/g,'')
        }
        for (let i in this.PurchaseDtls) {
          this.PurchaseDtls[i].PhId = ''
          this.PurchaseDtls[i].BusinessPrimaryKeys = ''
          this.PurchaseDtls[i].Creator = ''
          this.PurchaseDtls[i].CurOrgId = ''
          this.PurchaseDtls[i].Editor = ''
          this.PurchaseDtls[i].ExtendObjects = ''
          this.PurchaseDtls[i].ForeignKeys = ''
          this.PurchaseDtls[i].NgInsertDt = ''
          this.PurchaseDtls[i].NgUpdateDt = ''
          this.PurchaseDtls[i].PropertyBytes = ''
          this.PurchaseDtls[i]._OldIdValue_ = ''
        }
        for (let i in this.PurDtl4SOFs) {
          this.PurDtl4SOFs[i].PhId = ''
          this.PurDtl4SOFs[i].BusinessPrimaryKeys = ''
          this.PurDtl4SOFs[i].Creator = ''
          this.PurDtl4SOFs[i].CurOrgId = ''
          this.PurDtl4SOFs[i].Editor = ''
          this.PurDtl4SOFs[i].ExtendObjects = ''
          this.PurDtl4SOFs[i].ForeignKeys = ''
          this.PurDtl4SOFs[i].NgInsertDt = ''
          this.PurDtl4SOFs[i].NgUpdateDt = ''
          this.PurDtl4SOFs[i].PropertyBytes = ''
          this.PurDtl4SOFs[i]._OldIdValue_ = ''
        }
        //更改对应事件
        for(let i in this.ImplPlanPanelData){
            if (this.ImplPlanPanelData[i].sedTime){
              this.ImplPlanPanelData[i].FEndDate = this.ImplPlanPanelData[i].sedTime[1]
              this.ImplPlanPanelData[i].FStartDate = this.ImplPlanPanelData[i].sedTime[1]
            }
        }
        let fas = '';
        if (type ==='bc' || type ==='bcss'){
          projectMst.FApproveStatus = '1'
        } else if (type ==='zc'){
          projectMst.FApproveStatus = '5'
        }
        let data = {
          //预算主表对象
          ProjectMst:projectMst,


          //预算明细
          // ProjectDtlBudgetDtls:this.dataDtl.ProjectDtlBudgetDtls,
          ProjectDtlBudgetDtls:[...this.budgetdetailData,...this.delBdData],
          //实施计划
          ProjectDtlImplPlans: [...this.ImplPlanPanelData,...this.delIppData],
          //绩效指标
          ProjectDtlPerformTargets:[...this.oldTTData,...this.target.targetTableData],
          //预算明细的采购
          ProjectDtlPurchaseDtls:[...this.PurchaseDtls,...addPurchaseDtls],
          ProjectDtlPurDtl4SOFs:[...this.PurDtl4SOFs,...addPurDtl4SOFs],
          //用户ID
          UserId:this.UserId,
          ProjectDtlTextContents:projectDtlTextContents,
        }
        console.log(data)
        this.postAxios('/GXM/ProjectMstApi/PostSaveProject', data).then((res) => {
          if (res.Status ==='success'){
            this.upFile(res.KeyCodes[0])
            if(type === 'bc'){
              let that =this
              this.$msgBox.show({
                content:'修改成功',
                fn:function () {
                  that.$emit("refresh",res,'edit')
                }
              })
            } else if (type === 'bcss'){
              let arr = [];
              arr.push({
                PhId:res.KeyCodes[0]
              })
              this.approvalDataS.openDialog = true
              this.approvalDataS.data = arr
            } else if(type === 'zc'){
              let that =this
              this.$msgBox.show({
                content:'暂存成功',
                fn:function () {
                  that.$emit("refresh",res,'edit')
                }
              })
            }
          }else {
            this.$msgBox.error('修改失败'+res.Msg)
          }
        }).catch(err => {
          this.$msgBox.error('请求错误'+res.Msg)
        })
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
            this.$confirm('实施计划已存在，是否更新？', '提示', {
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
            arr[0].FImplContent = arr[0].FName
            this.ImplPlanPanelData = [...this.ImplPlanPanelData, ...arr]
            this.cacheAddData = []//确认后清空缓存新增加的数据
            this.$confirm('明细项目发生变化2，是否完善实施计划？', '提示', {
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
            let that= this
            this.$confirm('明细项目发生变化1，是否完善实施计划？', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: "warning",
              center: true,
              closeOnPressEscape: false
            }).then(() => {
              if (!item.id){

                for (let key in that.ImplPlanPanelData){
                  if ( item.PhId ===that.ImplPlanPanelData[key].PhId){
                    console.log(that.ImplPlanPanelData[key].PhId)
                    that.ImplPlanPanelData[key].FImplContent = item.FName
                    that.ImplPlanPanelData[key].FName = item.FName
                  }
                }
              } else {
                for (let key in this.ImplPlanPanelData){
                  if ( item.id ===this.ImplPlanPanelData[key].id){
                    this.ImplPlanPanelData[key].FName = item.FName
                    that.ImplPlanPanelData[key].FImplContent = item.FName
                  }
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
            if (this.isOldTTData){
               let arr = JSON.parse(JSON.stringify(this.target.targetTableData))
              for (let i in arr){
                arr[i].PersistentState=3
              }
              this.oldTTData = arr
              this.isOldTTData = false
            }
            this.target.targetTableData = res.Data
            for (let i in this.target.targetTableData) {
              this.target.targetTableData[i].PhId = ''
            }
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
        this.$emit("refresh",'','edit')
      },

      //填报预览
      preview(){
        let ProjectDtlBudget = []
        let ProjectDtlImpl = []
        for (let i in this.budgetdetailData){
          ProjectDtlBudget.push({
            FName:this.budgetdetailData[i].FName,
            FAmount:this.budgetdetailData[i].FAmount,
            FPaymentMethod_EXName:this.budgetdetailData[i].FPaymentMethod?this.budgetDetail.fundPayGroup.filter(item => item.TypeCode ===this.budgetdetailData[i].FPaymentMethod )[0].TypeName:'',
            FOtherInstructions:this.budgetdetailData[i].FOtherInstructions,
          })
        }
        for (let i in this.ImplPlanPanelData) {
          ProjectDtlImpl.push({
            FImplContent:this.ImplPlanPanelData[i].FImplContent,
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
        let formData = new FormData
        formData.append('PhId',code)
        let fileList = this.choosedIndexAndPro.pro.QtAttachments;
        for (let file of fileList){
          formData.append('files',file.raw)
        }
        this.formAxios('/GXM/ProjectMstApi/PostSaveProject2',formData).then(res=>{
          console.log(res)
        }).catch()
      }
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
          margin-right: 15px;
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
                  width: 12%;
                }

                &:nth-of-type(7) {
                  width: 12%;
                }
                &:nth-of-type(8) {
                  width: 18%;
                }

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
      .bottom-info{
        position: absolute;
        height: 20px;
        right: 30px;
        bottom: 30px;
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
  /*设置必填项*/
  .null-projS{
    border-bottom: 1px #ef5b47 solid !important;
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


