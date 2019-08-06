<template>
  <!-- <el-dialog
      append-to-body :visible="true" width="90%" :close-on-click-modal="false"
  ></el-dialog>-->
  <section class="prerojectnewproject">
    <el-row>
      <el-col :span="24"
              style="margin-top:10px;margin-bottom: 10px">
        <div class="btn-left">
          <p style="display:inline-block;margin-right:10px;">
            <span>项目年度：</span>
            <el-select v-model="yearSelect"
                       size="small"
                       placeholder="必选">
              <el-option :label="year"
                         :value="year"></el-option>
              <el-option :label="year-1"
                         :value="year-1"></el-option>
              <el-option :label="year-2"
                         :value="year-2"></el-option>
            </el-select>
          </p>
          <span>当前阶段：年初申报</span>
        </div>
        <slot name="btn">
          <div class="top-btn">
            <el-button class="btn"
                       size="mini"
                       @click="submit()">保存</el-button>
            <el-button class="btn"
                       size="mini">保存并送审</el-button>
            <el-button class="btn"
                       size="mini">暂存</el-button>
            <el-button class="btn"
                       size="mini">上传附件</el-button>
            <el-button class="btn"
                       size="mini">填报预览</el-button>
          </div>
        </slot>
      </el-col>
      <div class="left-box">
        <div class="tb">项目概况</div>
        <ul>
          <li>
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
            <el-select v-model="projSurvey.ProjectLevels"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.ProjectLevelsGroup"
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
                         :label="item.DeftName"
                         :value="item.DeftCode"></el-option>
            </el-select>
          </li>
          <li>
            <span>预算部门：</span>
            <el-select v-model="projSurvey.FBudgetDept"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.FBudgetDeptGroup"
                         :key="idx"
                         :label="item.oname"
                         :value="item.ocode"></el-option>
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
                         :label="item.TypeName"
                         :value="item.TypeCode"></el-option>
            </el-select>
          </li>
          <li>
            <span>起止日期：</span>
            <el-date-picker size="small"
                            v-model="projSurvey.sedTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
          </li>
          <li>
            <span>绩效评价：</span>
            <el-select v-model="projSurvey.xjEvaluate"
                       size="small"
                       placeholder="必选">
              <el-option v-for="(item,idx) in projGroup.xjEvaluateGroup"
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
                        maxlength="600"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="至少20字以上，限600字以内（必填）"
                        v-model="projScience.FFunctionalOverview"></el-input>
            </li>
            <li>
              <span>申报依据：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="600"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="至少20字以上，限600字以内（必填）"
                        v-model="projScience.applyBasis"></el-input>
            </li>
            <li>
              <span>可行性：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="600"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="至少20字以上，限600字以内（必填）"
                        v-model="projScience.FFeasibility"></el-input>
            </li>
            <li>
              <span>必要性：</span>
              <el-input type="textarea"
                        show-word-limit
                        maxlength="600"
                        :autosize="{minRows:4}"
                        :rows="5"
                        placeholder="至少20字以上，限600字以内（必填）"
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
                    <el-select v-model="item.SourceOfFunds"
                               size="small"
                               placeholder="必选">
                      <el-option v-for="(item,idx) in budgetDetail.SourceOfFundsGroup"
                                 :key="idx"
                                 :label="item.label"
                                 :value="item.value"></el-option>
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
                    <el-radio v-model="item.FIfPurchase"
                              :label="1">是</el-radio>
                    <el-radio v-model="item.FIfPurchase"
                              :label="0">否</el-radio>
                    <i @click="item.FIfPurchase?setBuy(item):''"
                       :class="{'el-icon-setting':true,'canSetting':item.FIfPurchase}"></i>
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
                  <li v-for="(item,idx) in budgetDetail.SourceOfFundsGroup">
                    <span class="title">{{item.label}}</span>
                    <span class="money">{{budgetdetailData.filter(i=>i.SourceOfFunds===item.value).reduce((prev,cur)=>prev+parseFloat((Number((cur.FAmount).replace(/[,]/g, ''))).toFixed(2)),0) | NumFormat}}</span>
                  </li>
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
                          maxlength="600"
                          :rows="6"
                          placeholder="至少20字以上，限600字以内（必填）"
                          v-model="textarea"></el-input>
              </div>
              <div>
                <span>长期绩效目标：</span>
                <el-input type="textarea"
                          show-word-limit
                          maxlength="600"
                          :rows="6"
                          placeholder="至少20字以上，限600字以内（必填）"
                          v-model="textarea"></el-input>
              </div>
            </div>
            <div class="line2">
              <span>绩效指标类别：</span>
              <el-select v-model="type"
                         size="small">
                <el-option label="123"
                           value="123"></el-option>
                <el-option label="456"
                           value="456"></el-option>
                <el-option label="1123"
                           value="1123"></el-option>
              </el-select>
            </div>
            <div class="line3"
                 v-show="projSurvey.xjEvaluate =='1'">
              <div class="tableHead">
                <table>
                  <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>行号</th>
                      <th colspan="2">指标类别</th>
                      <th>指标名称</th>
                      <th>指标值</th>
                      <th>指标权重</th>
                      <th>指标描述</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="tableBody">
                <table>
                  <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                  </colgroup>
                  <tbody>
                    <tr v-for="i in 3">
                      <td>{{i}}</td>
                      <td style="padding:4px"
                          v-if="i==1"
                          rowspan="10">
                        <add-br :value="'行少竖多咋办行少竖多咋办行少竖多咋办行少竖多咋办1行少竖多咋办'"></add-br>
                      </td>
                      <td style="padding:4px"
                          v-if="i==6||i==1"
                          rowspan="5">
                        <add-br :value="'竖高会把行撑高'"></add-br>
                      </td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
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
      <set-buy :data="setBuyDialog.data"></set-buy>
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
  </section>
</template>

<script>
import addBr from './addBr'
import setBuy from './setBuy'
import textareaDialog from './textareaDialog'
import { mapState } from 'vuex'

export default {
  name: 'prerojectnewproject',
  props: {},
  components: { addBr, setBuy, textareaDialog },
  data () {
    return {
      timeClearable: false,
      //文本域最大字数
      maxWord: "600",
      //项目概况
      projSurvey: {
        FProjName: '', //项目名称
        FDeclarationDept: '', //申报部门
        ProjectLevels: '', //项目级别
        FBudgetDept: '', //预算部门
        ProjectPropers: '', //项目属性
        TimeLimits: '', //存续期限
        ExpenseCategories: '', //支出类别
        sedTime: '', //起止日期
        xjEvaluate: ''
      },
      //项目概况下拉框项内容
      projGroup: {
        FDeclarationDeptGroup: [],
        ProjectLevelsGroup: [{
          TypeCode: '001',
          TypeName: '级别1'
        }],
        FBudgetDeptGroup: [{
          ocode: '001',
          oname: '部门1'
        }],
        ProjectPropersGroup: [
          {
            TypeCode: '1',
            TypeName: '延续项目'
          }, {
            TypeCode: '2',
            TypeName: '新增项目'
          }
        ],
        TimeLimitsGroup: [{
          TypeCode: '1',
          TypeName: '一次性项目'
        }, {
          TypeCode: '2',
          TypeName: '经常性项目'
        }],
        ExpenseCategoriesGroup: [{
          TypeCode: '1',
          TypeName: '支出1'
        }],
        xjEvaluateGroup: [
          {
            name: '是',
            code: 1
          },
          {
            name: '否',
            code: 0
          }
        ]
      },
      //项目科研四大文本框内容
      projScience: {
        FFunctionalOverview: '', //部门职能概述
        applyBasis: '', //申报依据
        FFeasibility: '', //可行性
        FNecessity: '' //必要性
      },
      //预算明细表数据
      budgetDetail: {
        copyLine: false, //复制行
        SourceOfFundsGroup: [
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
        fundPayGroup: [] //支付方式下拉项组
      },
      //预算明细表
      budgetdetailData: [
        {
          FName: '',//明细项目名称
          FAmount: '',//金额
          SourceOfFunds: '',//资金来源
          FPaymentMethod: '',//支付方式
          FOtherInstructions: '',//测算过程及其他说明事项
          FIfPurchase: 1,////集中采购
          id: (new Date()).getTime() //使用时间搓作唯一标识
        }
      ], //预算明细数据
      //缓存新增加的数据
      cacheAddData: [],
      //实施计划表
      ImplPlanPanelData: [{
        FName: '',
        FAmount: '',
        SourceOfFunds: '',
        FPaymentMethod: '',
        FOtherInstructions: '',
        FIfPurchase: 1,
        id: (new Date()).getTime() //使用时间搓作唯一标识
      }],
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
      delRow: '-1'
    }
  },
  computed: {
    ...mapState({
      year: state => state.user.year,
      Orgid: state => state.user.orgid,
      UserCode: state => state.user.usercode,
      OrgCode: state => state.user.orgcode
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
    }
  },
  watch: {
    tabindex (val, oldVal) {
      this.tabOldIndex = val
    },
  },
  mounted () {
    this.yearSelect = this.year
    this.getDeclareList()
    this.getAllBasicData()
  },
  methods: {
    //获取申报部门集合
    getDeclareList () {
      let data = {
        orgCode: this.OrgCode,
        uCode: this.UserCode ? this.UserCode : '9999',
        orgid: this.Orgid
      }
      this.getAxios('/GQT/QTSysSetApi/GetDeclareList', data)
        .then(res => {
          this.projGroup.FDeclarationDeptGroup = res
        })
        .catch(err => { })
    },
    getAllBasicData () {
      let data = {
        uCode: this.UserCode ? this.UserCode : '9999',
        orgCode: this.OrgCode,
        orgid: this.Orgid
      }
      this.getAxios('/GQT/QTSysSetApi/GetAllBasicData', data)
        .then(res => {
          this.budgetDetail.fundPayGroup = res.PayMethods
          console.log(res)
        })
        .catch(err => { })
    },
    addBudgetdetail (item) {
      let data = (new Date()).getTime()
      console.log(data)
      let newItem = Object.assign(
        {},
        this.budgetDetail.copyLine
          ? {
            FName: item.FName,
            FAmount: item.FAmount,
            SourceOfFunds: item.SourceOfFunds,
            FPaymentMethod: item.FPaymentMethod,
            FOtherInstructions: item.FOtherInstructions,
            FIfPurchase: item.FIfPurchase,
            id: data,
            sedTime: this.projSurvey.sedTime ? this.projSurvey.sedTime : ''
          }
          : {
            FName: '',
            FAmount: '',
            SourceOfFunds: '',
            FPaymentMethod: '',
            FOtherInstructions: '',
            FIfPurchase: 1,
            id: data,
            sedTime: this.projSurvey.sedTime ? this.projSurvey.sedTime : ''
          }
      )
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
            SourceOfFunds: '',
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
      if (item.SourceOfFunds === '') {
        this.$msgBox.error('请先设置资金来源！')
        return
      }
      this.setBuyDialog.openDialog = true
      this.setBuyDialog.data = item
    },
    openTextarea (item, property) {
      this.textareaDialogData.data = item
      this.textareaDialogData.property = property
      this.maxWord = '50'
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
        this.ImplPlanPanelData[0].SourceOfFunds !== '' ||
        this.ImplPlanPanelData[0].FOtherInstructions !== '';
      //预算明细第一行是否为空，只要有一列有值就不为空
      let budgetStatus = this.budgetdetailData[0].FName !== '' ||
        this.budgetdetailData[0].FAmount !== '' ||
        this.budgetdetailData[0].FPaymentMethod !== '' ||
        this.budgetdetailData[0].SourceOfFunds !== '' ||
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
    submit () {

      let data = {
        //预算主表对象
        ProjectMst: {
          FProjName: this.projSurvey.FProjName,//项目名称
          ProjectLevels: this.projSurvey.ProjectLevels,//项目级别
          FDeclarationDept: this.projSurvey.FDeclarationDept,//申报部门,
          FBudgetDept: this.projSurvey.FBudgetDept,//预算部门
          ProjectPropers: this.projSurvey.ProjectPropers,//项目属性
          TimeLimits: this.projSurvey.TimeLimits,//存续期限
          ExpenseCategories: this.projSurvey.ExpenseCategories,//支出类别
          FStartDate: this.projSurvey.sedTime[0],//开始日期
          fieldLabel: this.projSurvey.sedTime[1],//结束日期
          xjEvaluate: this.projSurvey.xjEvaluate,//结束日期
        },
        //预算科研
        ProjectDtlTextContents: [{
          FFunctionalOverview: this.projScience.FFunctionalOverview,//部门职能概述
          applyBasis: this.projScience.applyBasis,//申报依据
          FFeasibility: this.projScience.FFeasibility,//可行性
          FNecessity: this.projScience.FNecessity,//必要性
        }],
        //预算明细
        ProjectDtlBudgetDtls: this.budgetdetailData,
        ProjectDtlImplPlans: this.ImplPlanPanelData
      }
      console.log(data)
      this.postAxios('/GXM/ProjectMstApi/PostSaveProject', data).then((res) => {
        console.log(res)
      }).catch(err => {

      })
    },
    //输入框值改变
    valueChange (item) {
      let ImpStatus = this.ImplPlanPanelData[0].FName !== '' ||
        this.ImplPlanPanelData[0].FAmount !== '' ||
        this.ImplPlanPanelData[0].FPaymentMethod !== '' ||
        this.ImplPlanPanelData[0].SourceOfFunds !== '' ||
        this.ImplPlanPanelData[0].FOtherInstructions !== '';
      //预算明细第一行是否为空，只要有一列有值就不为空
      let budgetStatus = this.budgetdetailData[0].FName !== '' ||
        this.budgetdetailData[0].FAmount !== '' ||
        this.budgetdetailData[0].FPaymentMethod !== '' ||
        this.budgetdetailData[0].SourceOfFunds !== '' ||
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
            this.ImplPlanPanelData = [...arr]
            this.tabStatus.fristSwatchTab = true
            this.tabindex = 2
            this.cacheAddData = []//确认后清空缓存新增加的数据
          }).catch(() => {
            this.tabindex = 1
          })
        }
      } else {
        if (this.cacheAddData.length !== 0) {//判断缓存新增的数据是否为空，不为空就讲新加的合计到实施计划上
          this.ImplPlanPanelData = [...this.ImplPlanPanelData, ...this.cacheAddData]
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
            this.tabindex = 2
            this.cacheAddData = []//确认后清空缓存新增加的数据
          }).catch(() => {
            this.tabindex = 1
            this.cacheAddData = []//确认后清空缓存新增加的数据
          })
        }
      }
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
      height: 97%;
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
                width: 20%;
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
                width: 14%;
              }

              &:nth-of-type(7) {
                width: 24%;
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
            font-size: 0.36rem;
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
          right: 10px;
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


