<template>
  <!-- <el-dialog
      append-to-body :visible="true" width="90%" :close-on-click-modal="false"
  ></el-dialog>-->
  <section class="prerojectnewproject">
    <el-row>
      <el-col :span="24" style="margin-top:10px;margin-bottom: 10px">
        <div class="btn-left">
          <p style="display:inline-block;margin-right:10px;">
            <span>项目年度：</span>
            <el-select v-model="yearSelect" size="small" placeholder="必选">
              <el-option :label="year" :value="year"></el-option>
              <el-option :label="year-1" :value="year-1"></el-option>
              <el-option :label="year-2" :value="year-2"></el-option>
            </el-select>
          </p>
          <span>当前阶段：年初申报</span>
        </div>
        <slot name="btn">
          <div class="top-btn">
            <el-button class="btn" size="mini">保存</el-button>
            <el-button class="btn" size="mini">保存并送审</el-button>
            <el-button class="btn" size="mini">暂存</el-button>
            <el-button class="btn" size="mini">上传附件</el-button>
            <el-button class="btn" size="mini">填报预览</el-button>
          </div>
        </slot>
      </el-col>
      <div class="left-box">
        <div class="tb">项目概况</div>
        <ul>
          <li>
            <span>项目名称：</span>
            <div
              @click="openTextarea(projSurvey,'projName')"
              class="opentextarea"
              style="width:100%;text-align:left;line-height:32px;padding-left:15px;"
            >
              <el-tooltip v-if="projSurvey.projName" :content="projSurvey.projName">
                <span style="font-size:0.14rem;">{{projSurvey.projName}}</span>
              </el-tooltip>
              <span v-else style="font-size:0.14rem;color:#c0c4cc;">请填写项目名称（必填）</span>
            </div>
            <!-- <el-input size="small" v-model="projSurvey.projName" placeholder="请填写项目名称（必填）"></el-input> -->
          </li>
          <li>
            <span>项目级别：</span>
            <el-select v-model="projSurvey.projLeval" size="small" placeholder="必选">
              <el-option
                v-for="(item,idx) in projGroup.projLevalGroup"
                :key="idx"
                :label="item.DeftName"
                :value="item.DeftCode"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>申报部门：</span>
            <el-select v-model="projSurvey.applyDepart" size="small" placeholder="必选">
              <el-option
                v-for="(item,idx) in projGroup.applyGroup"
                :key="idx"
                :label="item.DeftName"
                :value="item.DeftCode"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>预算部门：</span>
            <el-select v-model="projSurvey.bugedDepart" size="small" placeholder="必选">
              <el-option
                v-for="(item,idx) in projGroup.bugedDepartGroup"
                :key="idx"
                :label="item.DeftName"
                :value="item.DeftCode"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>项目属性：</span>
            <el-select v-model="projSurvey.projAbbtribute" size="small" placeholder="必选">
              <el-option
                v-for="(item,idx) in projGroup.projAbbtributeGroup"
                :key="idx"
                :label="item.TypeName"
                :value="item.TypeCode"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>存续期限：</span>
            <el-select v-model="projSurvey.keepTerm" size="small" placeholder="必选">
              <el-option
                v-for="(item,idx) in projGroup.keepTermGroup"
                :key="idx"
                :label="item.DeftName"
                :value="item.DeftCode"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>支出类别：</span>
            <el-select v-model="projSurvey.payType" size="small" placeholder="必选">
              <el-option
                v-for="(item,idx) in projGroup.payTypeGroup"
                :key="idx"
                :label="item.DeftName"
                :value="item.DeftCode"
              ></el-option>
            </el-select>
          </li>
          <li>
            <span>起止日期：</span>
            <el-date-picker
              size="small"
              v-model="projSurvey.sedTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </li>
          <li>
            <span>绩效评价：</span>
            <el-select v-model="projSurvey.xjEvaluate" size="small" placeholder="必选">
              <el-option
                v-for="(item,idx) in projGroup.xjEvaluateGroup"
                :key="idx"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div class="right-box">
        <!-- tabs -->
        <ul>
          <li
            v-for="(i,index) in tabsList"
            :key="index"
            :class="{tab:true,active:tabindex==index}"
            v-html="i"
            @click="tabindex = index"
          ></li>
        </ul>
        <!-- 选项卡内容 -->
        <div class="right-box-container">
          <!-- 项目科研 -->
          <ul v-show="tabindex == 0" class="textareas">
            <li>
              <span>部门职能概述：</span>
              <el-input
                type="textarea"
                show-word-limit
                maxlength="600"
                :autosize="{minRows:4}"
                :rows="5"
                placeholder="至少20字以上，限600字以内（必填）"
                v-model="projScience.departFunction"
              ></el-input>
            </li>
            <li>
              <span>申报依据：</span>
              <el-input
                type="textarea"
                show-word-limit
                maxlength="600"
                :autosize="{minRows:4}"
                :rows="5"
                placeholder="至少20字以上，限600字以内（必填）"
                v-model="projScience.applyBasis"
              ></el-input>
            </li>
            <li>
              <span>可信性：</span>
              <el-input
                type="textarea"
                show-word-limit
                maxlength="600"
                :autosize="{minRows:4}"
                :rows="5"
                placeholder="至少20字以上，限600字以内（必填）"
                v-model="projScience.credible"
              ></el-input>
            </li>
            <li>
              <span>必要性：</span>
              <el-input
                type="textarea"
                show-word-limit
                maxlength="600"
                :autosize="{minRows:4}"
                :rows="5"
                placeholder="至少20字以上，限600字以内（必填）"
                v-model="projScience.necessity"
              ></el-input>
            </li>
          </ul>
          <!-- 预算明细 -->
          <div v-show="tabindex == 1" class="budgetdetail">
            <div style="text-align:left;">
              <el-checkbox v-model="budgetDetail.copyLine">复制行</el-checkbox>
            </div>
            <div class="list">
              <div class="listHead">
                <ul>
                  <li>序号</li>
                  <li>明细项目名称（必填）</li>
                  <li>金额（必填）</li>
                  <li>资金来源（必选）</li>
                  <li>支付方式（必选）</li>
                  <li>集中采购（必选）</li>
                  <li>测算过程及其他说明事项（必填）</li>
                </ul>
              </div>
            </div>
            <div class="list listBodyCon">
              <div class="listBody">
                <div style="cursor:pointer" v-if="!budgetdetailData.length">请添加明细</div>
                <ul v-else v-for="(item,index) in budgetdetailData" :key="index">
                  <li>{{index+1}}</li>
                  <li>
                    <el-input v-model="item.name" placeholder />
                  </li>
                  <li>
                    <el-input
                      @focus="clearNum(item,$event)"
                      @keyup.native="clearNum(item,$event)"
                      @blur="filterMoney(item,index)"
                      class="money"
                      v-model="item.money"
                      placeholder
                    />
                  </li>
                  <li>
                    <el-select v-model="item.fundSorce" size="small" placeholder="必选">
                      <el-option
                        v-for="(item,idx) in budgetDetail.fundSorceGroup"
                        :key="idx"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </li>
                  <li>
                    <el-select v-model="item.method" size="small" placeholder="必选">
                      <el-option
                        v-for="(item,idx) in budgetDetail.fundPayGroup"
                        :key="idx"
                        :label="item.TypeName"
                        :value="item.TypeCode"
                      ></el-option>
                    </el-select>
                  </li>
                  <li>
                    <el-radio v-model="item.radio" :label="1">是</el-radio>
                    <el-radio v-model="item.radio" :label="0">否</el-radio>
                    <i
                      @click="item.radio?setBuy(item):''"
                      :class="{'el-icon-setting':true,'canSetting':item.radio}"
                    ></i>
                  </li>
                  <li class="enable">
                    <!-- <el-input v-model="item.remark" placeholder /> -->
                    <p
                      class="opentextarea"
                      style
                      @click="openTextarea(item,'remark')"
                    >{{item.remark}}</p>
                    <div class="icon active">
                      <div>
                        <img @click="addBudgetdetail(item)" src="@/assets/images/jia.png" alt />
                      </div>
                      <div>
                        <img @click="delBudgetdetail(index)" src="@/assets/images/jian.png" alt />
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
                  <li v-for="(item,idx) in budgetDetail.fundSorceGroup">
                    <span class="title">{{item.label}}</span>
                    <span
                      class="money"
                    >{{budgetdetailData.filter(i=>i.fundSorce===item.value).reduce((prev,cur)=>prev+parseFloat((Number((cur.money).replace(/[,]/g, ''))).toFixed(2)),0) | NumFormat}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 实施计划 -->
          <div v-show="tabindex == 2" class="budgetdetail">
            <div style="text-align:left;">
              <el-checkbox v-model="copyLine">复制行</el-checkbox>
            </div>
            <div class="list plan">
              <div class="listHead">
                <ul>
                  <li>序号</li>
                  <li>实施内容（必填）</li>
                  <li>开始日期（必填）</li>
                  <li>结束日期（必填）</li>
                </ul>
              </div>
            </div>
            <div class="list plan listBodyCon">
              <div class="listBody">
                <div style="cursor:pointer" v-if="!budgetdetail.length">请添加明细</div>
                <ul v-else v-for="(item,index) in budgetdetail" :key="index">
                  <li>{{index+1}}</li>
                  <li>
                    <el-input v-model="item.name" placeholder />
                  </li>
                  <li>
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                  </li>
                  <li class="enable">
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                    <div class="icon active">
                      <div>
                        <img @click="add(item)" src="@/assets/images/jia.png" alt />
                      </div>
                      <div>
                        <img @click="del(index)" src="@/assets/images/jian.png" alt />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--  绩效目标 -->
          <div v-show="tabindex == 3" class="jxtarget">
            <div class="line1">
              <div>
                <span>年度绩效目标：</span>
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="600"
                  :rows="6"
                  placeholder="至少20字以上，限600字以内（必填）"
                  v-model="textarea"
                ></el-input>
              </div>
              <div>
                <span>长期绩效目标：</span>
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="600"
                  :rows="6"
                  placeholder="至少20字以上，限600字以内（必填）"
                  v-model="textarea"
                ></el-input>
              </div>
            </div>
            <div class="line2">
              <span>绩效指标类别：</span>
              <el-select v-model="type" size="small">
                <el-option label="123" value="123"></el-option>
                <el-option label="456" value="456"></el-option>
                <el-option label="1123" value="1123"></el-option>
              </el-select>
            </div>
            <div class="line3">
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
                      <td style="padding:4px" v-if="i==1" rowspan="10">
                        <add-br :value="'行少竖多咋办行少竖多咋办行少竖多咋办行少竖多咋办1行少竖多咋办'"></add-br>
                      </td>
                      <td style="padding:4px" v-if="i==6||i==1" rowspan="5">
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
    <el-dialog
      append-to-body
      :visible.sync="setBuyDialog.openDialog"
      width="750px"
      :close-on-click-modal="false"
      class="setBuyDialog"
    >
      <set-buy :data="setBuyDialog.data"></set-buy>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="textareaDialogData.openDialog"
      width="750px"
      :close-on-click-modal="false"
      class="setBuyDialog"
    >
      <textarea-dialog v-if="textareaDialogData.openDialog" :data="textareaDialogData"></textarea-dialog>
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
  data() {
    return {
      timeClearable: false,
      //项目概况
      projSurvey: {
        projName: '', //项目名称
        applyDepart: '', //申报部门
        projLeval: '', //项目级别
        bugedDepart: '', //预算部门
        projAbbtribute: '', //项目属性
        keepTerm: '', //存续期限
        payType: '', //支出类别
        sedTime: '', //起止日期
        xjEvaluate: ''
      },
      //项目概况下拉框项内容
      projGroup: {
        applyGroup: [],
        projLevalGroup: [],
        bugedDepartGroup: [],
        projAbbtributeGroup: [
          {
            TypeCode:'001',
            TypeName:'属性1'
          }
        ],
        keepTermGroup: [],
        payTypeGroup: [],
        xjEvaluateGroup: [
          {
            label: '是',
            value: 1
          },
          {
            label: '否',
            value: 0
          }
        ]
      },
      //项目科研四大文本框内容
      projScience: {
        departFunction: '', //部门职能概述
        applyBasis: '', //申报依据
        credible: '', //可信性
        necessity: '' //必要性
      },
      //预算明细表数据
      budgetDetail: {
        copyLine: false, //复制行
        fundSorceGroup: [
          {
            label: '全总预算拨款-工会经费',
            value: 0,
            money: 0
          },
          {
            label: '全总预算拨款-中央财政拨款',
            value: 1,
            money: 0
          },
          {
            label: '省总预算拨款-工会经费',
            value: 2,
            money: 0
          },
          {
            label: '省总预算拨款-省财政拨款',
            value: 3,
            money: 0
          }
        ], //资金源组
        fundPayGroup: [] //支付方式下拉项组
      },
      budgetdetailData: [
        {
          name: '',
          money: '',
          fundSorce: '',
          method: '',
          remark: '',
          radio: 1
        }
      ], //预算明细数据
      inp: '',
      yearSelect: '',
      value1: '',
      textarea: '',
      type: '',
      tabindex: 0,
      copyLine: false,
      tabsList: ['项目科研', '预算明细', '实施计划', '绩效目标'],
      budgetdetail: [
        {
          name: '',
          money: '',
          get: '',
          method: '',
          remark: '',
          radio: 1
        }
      ],
      setBuyDialog: {
        openDialog: false,
        data: null
      },
      applyGrop: [],
      textareaDialogData: {
        openDialog: false,
        data: null,
        property: ''
      }
    }
  },
  computed: {
    ...mapState({
      year: state => state.user.year,
      Orgid: state => state.user.orgid,
      UserCode: state => state.user.usercode,
      OrgCode: state => state.user.orgcode
    }),
    TotalAmount() {
      console.log(this.budgetdetailData)
      // let arr = this.budgetdetailData
      // 直接赋值会把defineproperty带入！
      let arr = JSON.parse(JSON.stringify(this.budgetdetailData))
      let sum = 0
      for (let key in arr) {
        let money = arr[key].money.replace(/[,]/g, '')
        sum += parseFloat(money) || 0
      }
      return sum
    }
  },
  watch: {
    // budgetdetailData:{
    //     handler(val){
    //       console.log('++',arr)
    //       console.log('--', this.budgetDetail.fundSorceGroup)
    //       let arr = val
    //       let itemArr = this.budgetDetail.fundSorceGroup
    //       for (let i in arr){
    //         for (let j in itemArr){
    //           if (arr[i].fundSorce == itemArr[j].value) {
    //             itemArr[j].money = itemArr[j].money + arr[i].money
    //           }
    //         }
    //       }
    //       console.log( this.budgetDetail.fundSorceGroup)
    //     },
    //    deep:true
    // }
  },
  mounted() {
    this.yearSelect = this.year
    this.getDeclareList()
    this.getAllBasicData()
  },
  methods: {
    //获取申报部门集合
    getDeclareList() {
      let data = {
        orgCode: this.OrgCode,
        uCode: this.UserCode,
        orgid: this.Orgid
      }
      this.getAxios('/GQT/QTSysSetApi/GetDeclareList', data)
        .then(res => {
          this.projGroup.applyGroup = res
        })
        .catch(err => {})
    },
    getAllBasicData() {
      let data = {
        uCode: this.UserCode,
        orgCode: this.OrgCode,
        orgid: this.Orgid
      }
      this.getAxios('/GQT/QTSysSetApi/GetAllBasicData', data)
        .then(res => {
          this.budgetDetail.fundPayGroup = res.PayMethods
          console.log(res)
        })
        .catch(err => {})
    },
    addBudgetdetail(item) {
      let newItem = Object.assign(
        {},
        this.budgetDetail.copyLine
          ? item
          : {
              name: '',
              money: '',
              fundSorce: '',
              method: '',
              remark: '',
              radio: 1
            }
      )
      this.budgetdetailData.push(newItem)
    },
    delBudgetdetail(index) {
      console.log(this.budgetdetailData)
      if (this.budgetdetailData.length === 1) {
        this.$set(this.budgetdetailData, 0, {
          name: '',
          money: '',
          fundSorce: '',
          method: '',
          remark: '',
          radio: 1
        })
      } else {
        this.budgetdetailData.splice(index, 1)
      }
    },
    add(item) {
      let newItem = Object.assign(
        {},
        this.copyLine
          ? item
          : {
              name: '',
              money: '',
              fundSorce: '',
              method: '',
              remark: '',
              radio: 1
            }
      )
      this.budgetdetail.push(newItem)
    },
    del(index) {
      console.log(this.budgetdetail)
      if (this.budgetdetail.length === 1) {
        this.budgetdetail[0] = {}
      } else {
        this.budgetdetail.splice(index, 1)
      }
    },
    clearNum(item, e) {
      console.log(item, obj)
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
      if (parseInt(obj.value) == '') {
        obj.value = ''
      }
      item.money = obj.value
    },
    filterMoney(item) {
      console.log(item)

      function fil(value, decimals = 2, decPoint = '.', thousandsSep = ',') {
        if (!value) return '0.00'
        value = (value + '').replace(/[^0-9+-Ee.]/g, '')
        let n = !isFinite(+value) ? 0 : +value
        let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
        let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
        let dec = typeof decPoint === 'undefined' ? '.' : decPoint
        let s = ''

        let toFixedFix = function(n, prec) {
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
      var a = fil(item.money)
      item.money = a
    },
    setBuy(item) {
      console.log(item)
      if (item.fundSorce === '') {
        this.$msgBox.error('请先设置资金来源！')
        return
      }
      this.setBuyDialog.openDialog = true
      this.setBuyDialog.data = item
    },
    openTextarea(item, property) {
      this.textareaDialogData.data = item
      this.textareaDialogData.property = property
      this.$nextTick(() => {
        this.textareaDialogData.openDialog = true
      })
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
      width: 0.2rem;
      font-size: 0.14rem;
      left: 0.2rem;
      text-align: justify;
      margin-top: 10px;

      > li.tab {
        width: 100%;
        height: 0.8rem;
        padding: 2px 0;
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
            content: '';
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
              width: 40%;
            }

            &:nth-of-type(3) {
              width: 25%;
            }

            &:nth-of-type(4) {
              width: 25%;
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
            right: 0;
            font-size: $mainfontsize;
            text-align: left;
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
            content: '';
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


