<template>
  <div class="payList">
    <!-- 支付单查看 -->
    <el-dialog
      append-to-body
      :visible.sync="data.openDialog"
      width="80%"
      :close-on-click-modal="false"
      class="payCenter payList"
      :before-close="payListClose"
    >
      <div slot="title" class="dialog-title">
        <span v-if="!reSetting" style="float: left">支付单查看</span>
        <span v-else style="float: left">发起重新支付</span>
      </div>
      <el-row :gutter="10">
        <el-col :span="24">
          <span
            v-if="!reSetting"
            style="float:left;font-size:0.16rem;line-height:28px;"
          >支付单号：{{detail.Mst.FCode}}</span>
          <div class="top-btn">
            <template v-if="data.itemType == 'error'">
              <span class="btn btn-large" @click="save('payErrorHandleData')">异常处理</span>
              <span class="btn btn-large" @click="save('new')">重新支付</span>
            </template>
            <template v-if="data.itemType == 'notApprove'">
              <span class="btn btn-large" @click="save('')">保存</span>
              <span class="btn btn-large" style="padding:0" @click="save('approvalData')">保存并送审</span>
            </template>
            <template v-if="data.itemType =='pay'">
              <span class="btn btn-large" @click="save('mergePayData')">支付</span>
            </template>
            <template v-if="data.itemType =='approval'">
              <span class="btn btn-large" @click="save('approval')">审批</span>
            </template>
            <span class="btn btn-large">打印</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <!--付款方信息-->
        <el-col :span="5" style="min-height:240px">
          <div class="left-card">
            <span>付款方</span>
            <div>
              <ul class="apply-info">
                <li>
                  <span>付款单位：</span>
                  <div>{{orgName}}</div>
                </li>
                <li>
                  <span>付款账户：</span>
                  <div v-if="data.itemType == 'notApprove'">
                    <el-select
                      popper-class="payList-largeSelects"
                      v-model="account"
                      placeholder="请选择"
                      @change="accountChange"
                    >
                      <el-option
                        v-if="accountList.length>0"
                        v-for="item in accountList"
                        :label="item.FBankname"
                        :value="item.PhId.toString()"
                      ></el-option>
                    </el-select>
                  </div>
                  <div
                    v-else
                  >{{(accountList.length && account&&account!='0')?(accountList.find(item=>{return item.PhId == account})).FBankname:''}}</div>
                </li>
                <li>
                  <span>支付方式：</span>
                  <div v-if="data.itemType == 'notApprove'">
                    <el-select
                      popper-class="payList-largeSelects"
                      v-model="detail.Mst.FPaymethod"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item,index) in FPaymethodList"
                        :label="item.TypeName"
                        :value="item.PhId.toString()"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </div>
                  <div
                    v-else
                  >{{detail.Mst.FPaymethod.length==17?(FPaymethodList.find(item=>item.PhId == detail.Mst.FPaymethod)).TypeName:''}}</div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <!--收款方信息-->
        <el-col :span="19">
          <div class="detail-table">
            <div class="title">
              <span>收款方</span>
            </div>
            <div class="top">
              <template v-if="data.itemType == 'notApprove'">
                批量设置转账方式
                <el-select
                  @focus="selectFSamebankFocus"
                  @visible-change="selectFSamebankBlur"
                  v-model="bankType"
                  placeholder="请选择"
                  ref="selectFSamebank"
                >
                  <el-option
                    v-for="(item,index) in FSamebankList"
                    :label="item.label"
                    :value="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </template>
            </div>
            <div class="getDetail">
              <el-table
                max-height="350px"
                ref="payListTable"
                style="margin-top:10px;"
                :data="detail.Dtls"
                border
                :span-method="tabelColspan"
                @row-click="rowClick"
                @header-click="headerClick"
              >
                <!-- 序号列 -->
                <el-table-column type="index" width="80" header-align="center" align="center">
                  <template slot="header" slot-scope="scope">
                    <el-checkbox
                      @click.stop.native="check"
                      @change="selectAll"
                      v-model="allSelected"
                      v-if="data.itemType == 'notApprove'||data.itemType == 'error'"
                    >序号</el-checkbox>
                    <template v-else>序号</template>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox
                      @click.stop.native="check"
                      v-if="data.itemType == 'notApprove'||(data.itemType == 'error'&&scope.row.FState==2)"
                      @change="selectOne(scope)"
                      :label="scope.$index"
                      v-model="scope.row.choosed"
                    >{{scope.$index+1}}</el-checkbox>
                    <template v-else>
                      <span
                        :style="data.itemType == 'error'&&scope.row.FState!=2?'padding-left:25px':''"
                      >{{scope.$index+1}}</span>
                    </template>
                  </template>
                </el-table-column>
                <!-- 公共列 -->
                <el-table-column
                  v-for="(item,index) in payHeaders1"
                  :key="index"
                  :property="item.name"
                  :label="item.label"
                  :width="item.width||''"
                  :header-align="item.headerAlign||'center'"
                  :align="item.bodyAlign||'left'"
                  empty-text="————"
                >
                  <template slot-scope="scope">
                    <!-- 申请金额 -->
                    <div
                      v-if="scope.column.property=='FAmount'"
                      :title="scope.row[scope.column.property] | NumFormat"
                      class="table-item"
                    >{{scope.row[scope.column.property] | NumFormat}}</div>
                    <!-- 备注  -->
                    <div
                      v-else-if="scope.column.property=='FDescribe'&& data.itemType == 'notApprove'"
                      class="table-item nopadding"
                    >
                      <el-input v-model="scope.row[scope.column.property]" placeholder></el-input>
                    </div>
                    <!-- 预算科目  -->
                    <div v-else-if="scope.column.property=='QtKmdm'" class="table-item nopadding">
                      <template
                        v-if="data.itemType == 'notApprove'&&kemuList.length>0&&scope.row.QtKmdm"
                      >
                        <el-select
                          v-model="scope.row.QtKmdm"
                          placeholder="请选择预算科目"
                          @change="kumuChange(scope.row)"
                        >
                          <el-option
                            v-for="(item,index) in kemuList.filter(item=>scope.row.QtKmdm.slice(0,3)==item.KMDM.slice(0,3))"
                            :label="item.KMDM+' '+item.KMMC"
                            :value="item.KMDM"
                            :disabled="item.KMDM.length==3"
                          ></el-option>
                        </el-select>
                      </template>
                      <template v-else>{{scope.row.QtKmdm}} {{scope.row.QtKmmc}}</template>
                    </div>
                    <!-- 支付方式 -->
                    <div
                      v-else-if="scope.column.property=='FSamebank'"
                      class="table-item nopadding"
                    >
                      <template v-if="data.itemType == 'notApprove'">
                        <el-select v-model="scope.row[scope.column.property]" placeholder="请选择支付方式">
                          <el-option
                            v-for="(item,index) in FSamebankList"
                            :label="item.label"
                            :value="item.value"
                            :key="index"
                          ></el-option>
                        </el-select>
                      </template>
                      <template
                        v-else
                      >{{FSamebankList.find(item=>item.value==scope.row[scope.column.property]).label}}</template>
                    </div>
                    <!-- 收款方账户名称 -->
                    <div
                      v-else-if="scope.column.property=='FRecAcntname'&&data.itemType == 'notApprove'"
                      class="table-item atype"
                      @click="selectBank(scope.row)"
                    >{{scope.row[scope.column.property]}}</div>
                    <!-- 其他 -->
                    <div :title="scope.row[scope.column.property]" class="table-item" v-else>
                      <span>{{scope.row[scope.column.property]}}</span>
                    </div>
                  </template>
                </el-table-column>
                <!-- 支付异常列 -->
                <template v-if="data.itemType=='error'">
                  <el-table-column
                    v-for="(item,index) in payHeaders2"
                    :key="index+20"
                    :property="item.name"
                    :label="item.label"
                    :width="item.width||''"
                    :header-align="item.headerAlign||'center'"
                    :align="item.bodyAlign||'left'"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.column.property=='FState'" class="table-item">
                        <template>{{FStateList.find(item=>item.value==scope.row[scope.column.property]).label}}</template>
                      </div>
                      <div :title="scope.row[scope.column.property]" class="table-item" v-else>
                        <span v-if="scope.row.FState == 1">————</span>
                        <span v-else>{{scope.row[scope.column.property]||'————'}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <!-- 支付成功列 -->
                <template v-if="data.itemType=='success'">
                  <el-table-column
                    :property="payHeaders2[0].name"
                    :label="payHeaders2[0].label"
                    :width="payHeaders2[0].width||''"
                    :header-align="payHeaders2[0].headerAlign||'center'"
                    :align="payHeaders2[0].bodyAlign||'left'"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.column.property=='FState'" class="table-item">
                        <!-- <template>{{FStateList.find(item=>item.value==scope.row[scope.column.property]).label}}</template> -->
                        支付成功
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <div class="bottom">
          <span v-if="!reSetting" @click="getAuditfollow">
            <template v-if="data.itemType == 'notApprove'">待送审</template>
            <template v-else-if="data.itemType == ''">审批中</template>
            <template v-else-if="data.itemType == 'approval'">待审批</template>
            <template v-else>审批通过</template>
          </span>
          <span
            v-if="(data.itemType != 'approval')&&!reSetting"
            :class="{success:data.itemType=='success'}"
          >
            <template v-if="data.itemType == 'error'">支付异常</template>
            <template v-else-if="data.itemType=='success'">支付成功</template>
            <template v-else>待支付</template>
          </span>
          <span
            class="dj"
            @click="fundDetailData.openDialog = true"
          >点击查看关联申请单信息（申请编号：{{detail.Mst.RefbillCode}}）</span>
        </div>
      </el-row>
    </el-dialog>
    <!-- 关联申请单信息查看 -->
    <el-dialog
      append-to-body
      v-if="fundDetailData.openDialog"
      :visible.sync="fundDetailData.openDialog"
      width="80%"
      :close-on-click-modal="false"
      class="dialog detail-dialog payCenter"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left;">查看申请</span>
      </div>
      <apply-bill :applyNum="this.data.data[0].Mst.RefbillPhid.toString()" @showImg="showImg">
        <div slot="btn-group">
          <el-button class="btn" size="mini">打印</el-button>
        </div>
      </apply-bill>
    </el-dialog>
    <!--图片预览-->
    <el-dialog
      class="dialog img-dialog payCenter"
      :visible.sync="imgDialog"
      :close-on-click-modal="false"
      width="60%"
      height="600px"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">查看附件</span>
      </div>
      <div class="btn-load" style="text-align:right;">
        <el-button class="btn">下载</el-button>
      </div>
      <img-view v-if="imgDialog"></img-view>
    </el-dialog>
    <!-- 合并支付组件 -->
    <merge-pay v-if="mergePayData.openDialog" :father="data" :data="mergePayData"></merge-pay>
    <!-- 异常处理 -->
    <pay-error-handle
      :father="data"
      v-if="payErrorHandleData.openDialog"
      :data="payErrorHandleData"
    ></pay-error-handle>
    <!-- 送审 -->
    <go-approval
      :bType="'002'"
      v-if="approvalData.openDialog"
      :father="data"
      :reSetting="reSetting"
      :data="approvalData"
    ></go-approval>
    <!-- 银行档案 -->
    <bank-choose v-if="bankChooseData.openDialog" :data="bankChooseData" @getBank="getBank"></bank-choose>
    <auditfollow :auditMsg="auditMsg" :visible="showAuditfollow" @update:visible="closeAuditFollow"></auditfollow>
  </div>
</template>

<script>
import applyBill from '@/components/applyBill/applybill'
import mergePay from './mergePay.vue'
import payErrorHandle from './payErrorHandle.vue'
import goApproval from './goApproval.vue'
import bankChoose from './bankChoose'
import auditfollow from '../../components/auditFollow/auditfollow'
import ImgView from '../../components/imgView/imgView'
import { BankAccountList } from '@/api/bankaccount'
import { GetSysSetList } from '@/api/systemSetting/dataSafe'
import {
  getPayment,
  savePayList,
  getBudgetAccountsList,
  postAddPayList
} from '@/api/paycenter'
import { mapState } from 'vuex'

export default {
  name: 'payList',
  components: {
    applyBill,
    mergePay,
    payErrorHandle,
    goApproval,
    bankChoose,
    auditfollow,
    ImgView
  },
  inject: ['refreshIndexData'],
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: [],
        itemType: '' //'':审批中,error':支付异常,'notApprove':待送审、未通过,'success':支付成功,'approval':审批,
      }
    }
  },
  data() {
    return {
      imgDialog: false, //图片预览弹框
      showAuditfollow: false,
      auditMsg: [], //审批流程 数据
      // 支付单表单
      // 未送审
      payHeaders1: [
        {
          name: 'XmProjcode',
          label: '项目编码',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'XmProjname',
          label: '项目名称',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'FDepartmentname',
          label: '收款单位/部门',
          width: '200'
        },
        {
          name: 'BudgetdtlName',
          label: '明细项目名称',
          width: '200'
        },
        {
          name: 'FAmount',
          label: '申请金额（元）',
          width: '150',
          bodyAlign: 'right'
        },
        {
          name: 'FDescribe',
          label: '备注',
          width: '300'
        },
        {
          name: 'QtKmdm',
          label: '预算科目',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'FSamebank',
          label: '转账方式',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'FRecAcntname',
          label: '收款方账户名称',
          width: '200'
        },
        {
          name: 'FRecAcnt',
          label: '收款账号',
          width: '200'
        },
        {
          name: 'FRecBankname',
          label: '开户行',
          width: '200'
        },
        {
          name: 'FRecBankcode',
          label: '银行行号',
          width: '200'
        }
      ],
      // 支付异常的三列
      payHeaders2: [
        {
          name: 'FState',
          label: '支付状态',
          width: '150',
          bodyAlign: 'center'
        },
        {
          name: 'FResultmsg',
          label: '支付异常原因',
          width: '350',
          bodyAlign: 'center'
        },
        {
          name: 'FNewCode',
          label: '重新支付后关联支付单编号',
          width: '250',
          bodyAlign: 'center'
        }
      ],
      account: '',
      accountList: [],
      FStateList: [
        {
          label: '待支付',
          value: 0
        },
        {
          label: '支付成功',
          value: 1
        },
        {
          label: '支付异常',
          value: 2
        },
        {
          label: '支付中',
          value: 3
        }
      ],
      FPaymethodList: [],
      bankType: '',
      kemuList: [],
      FSamebankList: [
        {
          label: '同行',
          value: 1
        },
        {
          label: '跨行',
          value: 0
        }
      ],
      fundDetailData: {
        openDialog: false,
        data: {}
      },
      mergePayData: {
        openDialog: false,
        data: {}
      },
      payErrorHandleData: {
        openDialog: false,
        data: {}
      },
      approvalData: {
        openDialog: false,
        data: {}
      },
      bankChooseData: {
        openDialog: false,
        data: {}
      },
      appDialog: {
        title: '',
        btnGroup: {
          cancelName: '',
          onfirmName: ''
        }
      },
      reSetting: false,
      allSelected: false,
      detail: {
        Mst: {
          FCode: '',
          FPaymethod: 1,
          PhId: ''
        },
        Dtls: []
      },
      oldDetail: null
    }
  },
  methods: {
    //拉取审批流数据查看
    getAuditfollow() {
      if (this.data.data[0].Mst.FApproval != 0) {
        let that = this
        this.getAxios('GSP/GAppvalRecord/GetAppvalRecordList', {
          RefbillPhid: this.data.data[0].Mst.PhId,
          FBilltype: '002'
        })
          .then(res => {
            if (res && res.Status === 'success') {
              that.auditMsg = res.Data
              that.showAuditfollow = true
            } else {
              that.$msgBox.show(res.Msg)
            }
          })
          .catch(err => {
            that.$msgBox.show('获取审批流程数据异常')
          })
      }
    },
    // 付款账号修改后立即赋值给子表
    accountChange(phid) {
      console.log(phid)
      this.detail.Dtls.forEach(item => {
        item.BankPhid = phid
      })
    },
    // 预算科目选择
    kumuChange(e) {
      console.log(e)
      e.QtKmmc = this.kemuList.find(item => item.KMDM == e.QtKmdm).KMMC
    },
    // 获取支付单详情
    getData(type) {
      getPayment({
        id: type ? this.oldDetail.Mst.PhId : this.detail.Mst.PhId,
        // id: 401190528000001,
        uid: this.userid || 488181024000001, //用户id
        orgid: this.orgid, //组织id
        ryear: '2019' //年度
      })
        .then(res => {
          console.log('payList', res)
          if (res.Status == 'error') {
            return
          }
          if (type) {
            Object.assign(this.oldDetail.Mst, res.Mst)
            res.Dtls.forEach(item => (item.choosed = false))
            this.oldDetail.Dtls = res.Dtls
          } else {
            Object.assign(this.detail.Mst, res.Mst)
            res.Dtls.forEach(item => (item.choosed = false))
            this.detail.Dtls = res.Dtls
            this.account =
              res.Dtls[0].BankPhid == '0' ? '' : res.Dtls[0].BankPhid
          }
          this.allSelected = false
          if (res.Mst.FPaymethod == 0) {
            this.detail.Mst.FPaymethod = ''
          }
        })
        .catch(err => {
          this.$msgBox.error('获取支付单详情失败！')
          console.log('payList', err)
        })
    },
    // 重新生成支付单-提交新增请求，将返回id保存到旧支付单请求（保存完新的旧支付单请求，原因：两行可能分开重新支付！旧支付单需要更新！），获取新增的支付单最新情况（多次保存，如果有新的Mst.PhId，则为保存）
    postAddPayList(postAddAppvalRecord) {
      postAddPayList({
        uid: this.userid, //用户id
        orgid: this.orgid, //组织id
        ryear: '2019', //年度
        infoData: this.detail
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
          } else {
            this.detail.Mst.PhId = res.KeyCodes[0]
            this.oldDetail.Dtls.forEach(item => {
              if (item.choosed) {
                item.FNewCode = res.KeyCodes[0]
              }
            })
            this.detail.Dtls.forEach(item => {
              item.FNewCode = res.KeyCodes[0]
            })
            console.log(this.oldDetail)
            this.savePayList(this.oldDetail, postAddAppvalRecord)
          }
        })
        .catch(err => {
          this.$msgBox.error('保存失败！')
          console.log('save new err', err)
        })
    },
    // 保存支付单接口
    savePayList(data, postAddAppvalRecord) {
      let saveData = JSON.parse(JSON.stringify(data))
      delete saveData.Mst.checked
      saveData.Mst.PersistentState = 2
      if (saveData.Dtls.length > 0) {
        if (this.account) {
          var acc = this.accountList.find(acc => {
            return acc.PhId == this.account
          })
        }
        saveData.Dtls.forEach(item => {
          item.PersistentState = 2
          delete item.choosed
          if (this.account) {
            item.BankPhid = this.account
            item.FPayAcnt = acc.FAccount
            item.FPayAcntname = acc.FBankname
            item.FPayBankcode = acc.FBankcode
            item.FPayBankname = acc.FOpenAccount
            item.FPayCityname = acc.FCity
          }
        })
      }
      savePayList({
        uid: this.userid,
        orgid: this.orgid,
        infoData: saveData
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
          } else {
            this.getData()
            if (this.reSetting) {
              this.getData('old')
            }
            this.refreshIndexData()
            if (postAddAppvalRecord) {
              postAddAppvalRecord()
            } else {
              this.$msgBox.show('保存成功')
            }
          }
        })
        .catch(err => {
          if (typeof fail == 'function') fail()
          this.$msgBox.error('保存失败！')
          console.log('save err', err)
        })
    },
    // 获取预算科目列表
    getBudgetAccountsList() {
      getBudgetAccountsList({})
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          this.kemuList = res.Record
          console.log('account', res)
        })
        .catch(err => {
          this.$msgBox.error('获取预算科目列表失败！')
          console.log('account error', err)
        })
    },
    // 获取付款银行档案
    getAccountList(data) {
      BankAccountList(data)
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
          } else {
            // this.account = this.detail.Mst.OrgPhid
            this.accountList = res.Record
          }
        })
        .catch(err => {
          this.$msgBox.error('获取银行档案列表失败!')
        })
    },
    // 获取到新的银行信息
    getBank(data) {
      console.log(data)
      if (this.bankChooseData.data.choosed) {
        this.detail.Dtls.forEach(item => {
          if (item.choosed) {
            item.FRecAcntname = data.FBankname
            item.FRecAcnt = data.FAccount
            item.FRecBankname = data.FOpenAccount
            item.FRecBankcode = data.FBankcode
            item.FRecCityname = data.FCity
          }
        })
      } else {
        this.bankChooseData.data.FRecAcntname = data.FBankname
        this.bankChooseData.data.FRecAcnt = data.FAccount
        this.bankChooseData.data.FRecBankname = data.FOpenAccount
        this.bankChooseData.data.FRecBankcode = data.FBankcode
        this.bankChooseData.data.FRecCityname = data.FCity
      }
    },
    // 获取支付方式
    GetSysSetList() {
      GetSysSetList({
        DicType: 'PayMethod'
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
          } else {
            if (this.data.itemType == 'notApprove') {
              this.FPaymethodList = res.Record.filter(item => {
                return (
                  item.Isactive == 0 ||
                  item.PhId == this.data.data[0].Mst.FPaymethod
                )
              })
            } else {
              this.FPaymethodList = res.Record.filter(item => {
                return item.PhId == this.data.data[0].Mst.FPaymethod
              })
            }
          }
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.error('获取支付列表信息失败!')
        })
    },
    // 支付单 按钮事件
    save(type) {
      switch (type) {
        case '':
          if (this.reSetting && !this.detail.Mst.PhId) {
            this.postAddPayList()
            return
          }
          this.savePayList(this.detail)
          break
        case 'approvalData':
          if (
            !this.detail.Mst.FPaymethod ||
            this.detail.Dtls.some(item => {
              return item.BankPhid == '0'
            }) ||
            this.detail.Dtls.some(item => {
              return !item.FRecAcnt
            })
          ) {
            this.$msgBox.error('请先完善数据信息')
            return
          }
          this[type].openDialog = true
          this[type].data = this.data.data
          break
        case 'payErrorHandleData':
        case 'mergePayData':
          this[type].openDialog = true
          this[type].data = this.data.data
          break
        case 'new':
          let errorArr = this.detail.Dtls.filter(item => item.choosed)
          console.log(errorArr)
          if (errorArr.length == 0) {
            this.$msgBox.error('请至少选择一条数据！')
            return
          } else if (errorArr.some(item => item.FState != 2)) {
            this.$msgBox.error('只能对支付异常的项目重新支付！')
            this.allSelected = false
            this.detail.Dtls.forEach(item => (item.choosed = false))
            return
          } else if (
            errorArr.some(item => {
              return item.FNewCode
            })
          ) {
            this.$msgBox.error('只能对未生成新的支付单的项目重新支付！')
            return
          }
          // 去除对象中的监听
          errorArr = errorArr.map(item => {
            return Object.assign({}, item)
          })
          var now = new Date().getTime().toString()
          let Mst = Object.assign({}, this.detail.Mst, {
              PhId: 0,
              FCode: 'P' + now,
              FAmountTotal: errorArr.reduce(
                (prev, cur) => prev + cur.FAmount,
                0
              ),
              FApproval: 0,
              FDate: 0,
              PersistentState: 1,
              FState: 0
            }),
            Dtls = errorArr.map(item => {
              return Object.assign(item, {
                choosed: false,
                PersistentState: 1,
                PhId: 0,
                MstPhid: 0,
                FSubmitdate: null,
                FSeqno: null,
                FBkSn: null,
                FResult: null,
                FResultmsg: null,
                FState: 0,
                FNewCode: null,
                ForeignKeys: null,
                BusinessPrimaryKeys: null,
                PersistentState: 1,
                OldMstPhid: this.detail.Mst.PhId,
                OldDtlPhid: item.PhId
              })
            })
          console.log(Mst, Dtls, errorArr)
          this.oldDetail = this.detail
          this.detail = { Mst, Dtls }
          this.allSelected = false
          this.reSetting = true
          this.data.itemType = 'notApprove'
          break
        case 'approval':
          this.appDialog.title = '查看'
          this.appDialog.btnGroup.cancelName = '取消'
          this.appDialog.btnGroup.onfirmName = '确认'
          this.$refs.approvalDialog.changeDialog()
          break
      }
    },
    // 批量设置转账方式
    selectFSamebankFocus() {
      if (this.detail.Dtls.every(item => item.choosed == false)) {
        this.$refs.selectFSamebank.blur()
        this.$msgBox.show('请先选择要设置的项目。')
      }
    },
    selectFSamebankBlur(visible) {
      console.log(123)
      if (this.bankType !== '' && !visible) {
        console.log(this.bankType)
        this.detail.Dtls.forEach(item => {
          if (item.choosed) {
            console.log(item)
            item.FSamebank = this.bankType
          }
        })
      }
    },
    // checkBox所在框选中
    check(e) {},
    headerClick(column, event) {
      console.log(column)
      if (column.type == 'index') {
        this.allSelected = !this.allSelected
        this.selectAll(this.allSelected)
      }
    },
    rowClick(row, column, event) {
      console.log(column)
      if (column.type == 'index') {
        row.choosed = !row.choosed
        this.selectOne({ row })
      }
    },
    //打开图片预览
    showImg(file) {
      console.log(file)
      this.imgDialog = true
    },
    // 表格合并方法
    tabelColspan({ row, column, rowIndex, columnIndex }) {
      if (this.detail.Dtls.length == 0) return
      if (columnIndex === 1 || columnIndex === 2) {
        let count = 1
        if (rowIndex == 0) {
          while (
            rowIndex < this.detail.Dtls.length - 1 &&
            this.detail.Dtls[rowIndex][column.property] ==
              this.detail.Dtls[rowIndex + 1][column.property]
          ) {
            count++
            rowIndex++
          }
          if (count > 1) {
            return [count, 1]
          }
        } else {
          if (
            this.detail.Dtls[rowIndex][column.property] !=
            this.detail.Dtls[rowIndex - 1][column.property]
          ) {
            while (
              rowIndex < this.detail.Dtls.length - 1 &&
              this.detail.Dtls[rowIndex][column.property] ==
                this.detail.Dtls[rowIndex + 1][column.property]
            ) {
              count++
              rowIndex++
            }
            if (count > 1) {
              return [count, 1]
            }
          } else {
            return [0, 0]
          }
        }
      }
    },
    // 关闭审批流程框
    closeAuditFollow() {
      this.showAuditfollow = false
    },
    // 关闭支付单弹框
    payListClose(done) {
      if (this.reSetting) {
        console.log('setting')
        this.reSetting = false
        this.data.itemType = 'error'
        this.detail = this.oldDetail
        this.allSelected = this.detail.Dtls.every(item => item.choosed)
      } else {
        done()
      }
    },
    // dialog中的check事件
    selectOne($scope) {
      if ($scope.row.choosed) {
        if (this.data.itemType == 'error') {
          var newDtls = this.detail.Dtls.filter(item => item.FState == 2)
          this.allSelected = newDtls.every(item => item.choosed)
          return
        }
        this.allSelected = this.detail.Dtls.every(item => item.choosed)
      } else {
        this.allSelected = false
      }
      this.$forceUpdate()
    },
    selectAll(choosed) {
      this.detail.Dtls.forEach(item => {
        item.choosed = choosed
      })
      this.$forceUpdate()
    },
    //  选择银行
    selectBank(item) {
      this.bankChooseData.openDialog = true
      this.bankChooseData.data = item
    }
  },
  watch: {
    'data.openDialog'(newVal) {
      if (newVal) {
        this.allSelected = false
        console.log(this.detail, this.data.data[0].Mst)
        this.detail.Mst.PhId = this.data.data[0].Mst.PhId
        // this.$forceUpdate()
        this.getData()
        // debugger
        this.getAccountList({
          OrgPhid: this.data.data[0].Mst.OrgPhid,
          selectStr: ''
        })
        this.GetSysSetList()
        if (this.kemuList.length == 0) {
          this.getBudgetAccountsList()
        }
      } else {
        this.closeAuditFollow()
      }
    }
  },
  computed: {
    orgName() {
      let orgListJson = JSON.stringify(this.orglist)
      if (!this.data.data.length) {
        return ''
      }
      let phidIndex = orgListJson.indexOf(this.data.data[0].Mst.OrgPhid)
      let nameIndex = orgListJson.indexOf('OName', phidIndex) + 8
      let nameEndIndex = orgListJson.indexOf('"', nameIndex)
      if (phidIndex == -1 || nameIndex == -1 || nameEndIndex == -1) {
        return ''
      }
      return orgListJson.slice(nameIndex, nameEndIndex)
    },
    ...mapState({
      orgid: state => state.user.orgid,
      userid: state => state.user.userid,
      orglist: state => state.user.orglist
    })
  }
}
</script>
<style lang="scss" scoped>
.payCenter {
  color: #333;
  font-size: 0.16rem;
  .dialog-title {
    overflow: hidden;

    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .content {
    padding: 20px 0 0 0;
    height: 100%;
    margin-bottom: 45px;
  }
  .left-card {
    max-width: 100%;
    border-radius: 8px;
    position: relative;
    padding: 7%;
    padding-bottom: 0;
    > i {
      font-size: 0.2rem;
      color: #91bff8;
    }
    > span {
      padding-top: 7%;
      font-size: 0.2rem;
      color: #ffff00;
      position: absolute;
      height: 140px;
      background-color: $btnColor;
      border-radius: 8px;
      left: 0;
      top: 0;
      width: 100%;
    }
    > div {
      background-color: #ffffff;
      width: 86%;
      border-radius: 8px;
      box-shadow: 0px 2px 10px #888888;
      margin: 50px auto 0;
      overflow: auto;
      position: relative;
      z-index: 2;
      > .apply-info {
        padding: 8px;
        text-align: left;
        font-size: 0.14rem;
        line-height: 0.25rem;
        > li {
          padding-left: 0.75rem;
          overflow: hidden;
          margin-top: 5px;
          margin-bottom: 10px;
          border-bottom: 1px #cccccc9e solid;
          padding-bottom: 10px;
          > span {
            position: relative;
            float: left;
            margin-left: -0.75rem;
          }
          > div {
            float: left;
            position: relative;
            // float: none;
            // margin-top: 35px;
            // margin-left: -0.9rem;
          }
        }
      }
    }
  }

  .detail-table {
    overflow: auto;
    width: 100%;
    > .title {
      background-color: #3294e8;
      border-radius: 6px 6px 0 0;
      height: 35px;
      > span {
        font-size: 0.2rem;
        line-height: 35px;
        color: #ffffff;
      }
    }
    > .top {
      text-align: left;
      margin-top: 10px;
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
  .getDetail {
    background-color: #fff;
    border-radius: 10px;
    .table-item {
      padding: 0 15px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      > span {
        display: inline-block;
        vertical-align: middle;
      }
      &.nopadding {
        padding: 0;
      }
      &:after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }
  }
  &.payList .bottom {
    margin-top: 10px;
    font-size: 0.18rem;
    padding-left: 20px;
    overflow: hidden;
    text-align: left;
    span {
      cursor: pointer;
      margin-right: 20px;
      position: relative;
      padding-left: 0.3rem;
      &::before {
        content: '';
        display: inline-block;
        background-image: url('../../assets/images/yk1.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0 center;
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -0.1rem;
      }
      &:nth-of-type(2) {
        cursor: auto;
        &::before {
          background-image: url('../../assets/images/wzf.png');
        }
        &.success::before {
          background-image: url('../../assets/images/zfcg.png');
        }
      }
      &:last-of-type {
        float: right;
        &::before {
          background-image: url('../../assets/images/dj.png');
          margin-top: -0.09rem;
        }
      }
    }
  }
}
</style>

<style lang='scss'>
.payCenter {
  .el-dialog__body {
    font-size: 0.14rem;
  }
  .el-checkbox,
  .el-checkbox__input.is-checked + .el-checkbox__label,
  .el-checkbox-button__inner {
    color: #333;
  }
  .el-checkbox__label {
    font-size: 0.14rem;
  }
  .tableBody .el-checkbox__label {
    font-size: 0.12rem;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-color: $borderColor_ccc;
  }
  .el-table--border,
  .el-table--group {
    border-color: $borderColor_ccc;
  }
  .getDetail {
    .el-table {
      font-size: 0.14rem;
      thead {
        color: #333;
      }
    }
    .el-collapse-item__header {
      font-size: 0.13rem;
      border-bottom: 0px;
    }
    .el-collapse-item__wrap {
      border-bottom: 0px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .el-table__header-wrapper thead .el-checkbox__label {
      color: #333;
    }
    .el-table__body-wrapper {
      max-height: 280px !important;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #fff;
    }
    .el-radio__label {
      font-size: 0.14rem;
    }
    .el-radio:not(:last-of-type) {
      margin-bottom: 10px;
    }
    .table-item {
      > .el-select {
        > .el-input {
          > .el-input__inner {
            border: 0;
            background-color: transparent;
          }
        }
      }
      .el-input__inner {
        font-size: 0.14rem;
        background-color: transparent;
        border: 0;
      }
    }
  }
  .el-dialog {
    display: inline-block;
    margin: 0 !important;
    vertical-align: middle;
    &.payList {
      min-height: 60%;
    }
    .el-dialog__body {
      padding-top: 0px;
    }
  }
  &.el-dialog__wrapper::after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    height: 100%;
  }
  .apply-info {
    .el-input__inner {
      line-height: 30px;
      height: 30px;
    }
    .el-input__icon {
      line-height: 30px;
    }
  }
  &.payList > .el-dialog {
    min-width: 1200px;
  }
  .detail-table .top {
    .el-input__inner {
      line-height: 35px;
      height: 35px;
    }
    .el-input__icon {
      line-height: 35px;
    }
  }
}
.payList-largeSelects.el-popper .el-select-dropdown__item {
  font-size: 0.14rem;
}
</style>
