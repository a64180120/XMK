<template>
  <div class="payList">
    <!-- 支付单查看 -->
    <el-dialog
      append-to-body
      :visible.sync="data.openDialog"
      width="80%"
      :close-on-click-modal="false"
      class="payCenter"
      :before-close="payListClose"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">支付单查看</span>
      </div>
      <div class="payCenterDialog">
        <div class="btns">
          <span class="payId">支付单号：{{detail.Mst.FCode}}</span>
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
        <div class="content payListContent">
          <h1>付款方</h1>
          <div class="payDetail">
            <h2>付款单位：浙江省总工会</h2>
            <h2 class="selects">
              <span>
                付款账户：
                <template v-if="data.itemType == 'notApprove'">
                  <el-select
                    popper-class="payList-largeSelects"
                    v-model="account"
                    placeholder="请选择"
                  >
                    <el-option v-for="item in accountList" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </template>
                <div
                  class="el-select"
                  v-else
                >{{accountList.find(item=>item.value == account).label}}</div>
              </span>
              <span>
                支付方式：
                <template v-if="data.itemType == 'notApprove'">
                  <el-select
                    popper-class="payList-largeSelects"
                    v-model="detail.Mst.FPaymethod"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,index) in FPaymethodList"
                      :label="item.label"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </template>
                <div
                  class="el-select"
                  v-else
                >{{FPaymethodList.find(item=>item.value == detail.Mst.FPaymethod).label}}</div>
              </span>
            </h2>
          </div>
          <h1>收款方</h1>
          <div class="getDetail">
            <div v-if="data.itemType == 'notApprove'">
              批量设置转账方式
              <el-select v-model="bankType" placeholder="请选择">
                <el-option label="同行" value="1"></el-option>
                <el-option label="跨行" value="2"></el-option>
              </el-select>
            </div>
            <el-table
              max-height="350px"
              ref="payListTable"
              style="margin-top:10px;"
              :data="detail.Dtls"
              border
              :span-method="tabelColspan"
            >
              <!-- 序号列 -->
              <el-table-column type="index" width="80" header-align="center" align="center">
                <template slot="header" slot-scope="scope">
                  <el-checkbox
                    @change="selectAll"
                    v-model="allSelected"
                    v-if="data.itemType == 'notApprove'"
                  >序号</el-checkbox>
                  <template v-else>序号</template>
                </template>
                <template slot-scope="scope">
                  <el-checkbox
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
                    :title="scope.row[scope.column.property]"
                    class="table-item"
                  >{{scope.row[scope.column.property] | NumFormat}}</div>
                  <!-- 备注  -->
                  <div
                    v-else-if="scope.column.property=='descrilbe'&& data.itemType == 'notApprove'"
                    class="table-item nopadding"
                  >
                    <el-input v-model="scope.row[scope.column.property]" placeholder></el-input>
                  </div>
                  <!-- 预算科目  -->
                  <div v-else-if="scope.column.property=='QtKmdm'" class="table-item nopadding">
                    <template v-if="data.itemType == 'notApprove'">
                      <el-select v-model="scope.row[scope.column.property]" placeholder="请选择预算科目">
                        <el-option label="501 活动支出" :value="501" disabled></el-option>
                        <el-option label="501001 活动支出001" :value="501001"></el-option>
                        <el-option label="501002 活动支出002" :value="501002"></el-option>
                      </el-select>
                    </template>
                    <template
                      v-else
                    >{{scope.row[scope.column.property]?kemuList.find(item=>item.value==scope.row[scope.column.property]).label:'————'}}</template>
                  </div>
                  <!-- 支付方式 -->
                  <div v-else-if="scope.column.property=='FSamebank'" class="table-item nopadding">
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
                    class="table-item"
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
                      <span>{{scope.row[scope.column.property]}}</span>
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
                  :align="item.bodyAlign||'left'"
                ></el-table-column>
              </template>
            </el-table>
          </div>
          <div class="bottom">
            <span v-if="!reSetting" @click="showAuditfollow = true">
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
            <span class="dj" @click="showFundDetail">点击查看关联申请单信息（申请编号：{{detail.Mst.RefbillCode}}）</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 关联申请单信息查看 -->
    <el-dialog
      append-to-body
      :visible.sync="fundDetailData.openDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <div slot="title" class="dialog-title">
        <span>查看申请</span>
      </div>
      <apply-bill v-if="fundDetailData.openDialog" :data="fundDetailData" :applyNum="1"></apply-bill>
    </el-dialog>
    <!-- 合并支付组件 -->
    <merge-pay v-if="mergePayData.openDialog" :father="data" :data="mergePayData"></merge-pay>
    <!-- 异常处理 -->
    <pay-error-handle v-if="payErrorHandleData.openDialog" :data="payErrorHandleData"></pay-error-handle>
    <!-- 送审 -->
    <go-approval
      v-if="approvalData.openDialog"
      :father="data"
      :reSetting="reSetting"
      :data="approvalData"
    ></go-approval>
    <!-- 银行档案 -->
    <bank-choose :data="bankChooseData" @getBank="getBank"></bank-choose>
    <auditfollow :visible="showAuditfollow" @update:visible="closeAuditFollow"></auditfollow>
    <!-- 审批弹框 -->
    <approval-dialog
      ref="approvalDialog"
      :title="appDialog.title"
      :btn-group="appDialog.btnGroup"
      :data="approvalData"
    ></approval-dialog>
  </div>
</template>

<script>
import applyBill from '@/components/applyBill/applybill'
import mergePay from './mergePay.vue'
import payErrorHandle from './payErrorHandle.vue'
import goApproval from './goApproval.vue'
import bankChoose from './bankChoose'
import auditfollow from '../../components/auditFollow/auditfollow'
import approvalDialog from '../payfundapproval/approvalDialog.vue'

export default {
  name: 'payList',
  components: {
    applyBill,
    mergePay,
    payErrorHandle,
    goApproval,
    bankChoose,
    auditfollow,
    approvalDialog
  },
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: {},
        itemType: '' //'':审批中,error':支付异常,'notApprove':待送审、未通过,'success':支付成功,'approval':审批,
      }
    }
  },
  data() {
    return {
      showAuditfollow: false,
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
          name: 'depart',
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
          name: 'descrilbe',
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
          name: 'bankName',
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
          name: 'RefbillDtlPhid2',
          label: '重新支付后关联支付单编号',
          width: '250',
          bodyAlign: 'center'
        }
      ],
      account: 1,
      accountList: [
        {
          label: '账号A',
          value: 1
        },
        {
          label: '账号B',
          value: 2
        },
        {
          label: 'XXXXX',
          value: 3
        }
      ],
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
        }
      ],
      FPaymethodList: [
        {
          label: '现金',
          value: 1
        },
        {
          label: '网银',
          value: 2
        },
        {
          label: '支票',
          value: 3
        }
      ],
      bankType: '',
      kemuList: [
        {
          label: '501 活动支出',
          value: 501,
          disabled: true
        },
        {
          label: '501001 活动支出001',
          value: 501001
        },
        {
          label: '501002 活动支出002',
          value: 501002
        }
      ],
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
      reSetting: false,
      allSelected: false,
      // detail: {
      //   Mst: {
      //     FCode: '',
      //     FPaymethod: 1
      //   },
      //   Dtls: []
      // },
      detail: {
        Mst: {
          PhId: '216190528000005',
          OrgPhid: '547181121000001',
          OrgCode: '1',
          RefbillPhid: '6',
          RefbillCode: 'zfbbf0006',
          FCode: 'P1559012283053',
          FPaymethod: 2,
          FAmountTotal: 2006.0,
          FApproval: 0,
          FState: 0,
          FDescribe: '单元测试-1559012283053',
          FDate: '2019-05-27 00:00:00',
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2019-05-28 10:58:03',
          NgUpdateDt: '2019-05-28 10:58:03',
          Creator: '521180820000001',
          Editor: '521180820000001',
          CurOrgId: '547181121000001'
        },
        Dtls: [
          {
            depart: '杭州市总工会',
            PhId: '216190528000009',
            MstPhid: '216190528000005',
            OrgPhid: '547181121000001',
            OrgCode: '1',
            RefbillPhid: '6',
            RefbillCode: 'zfbbf0006',
            RefbillDtlPhid: '1',
            RefbillDtlPhid2: '1',
            FAmount: 1000.0,
            FCurrency: '001',
            FPayAcntname: '付款账户1',
            FPayAcnt: '111001',
            FPayBankcode: '',
            FRecAcntname: '',
            FRecAcnt: '',
            FRecBankcode: '',
            FRecCityname: '杭州市',
            FSamecity: 0,
            FSamebank: 1,
            FIsurgent: 1,
            FCorp: 1,
            FUsage: '用途信息',
            FPostscript: '附言：xxx',
            FExplation: '摘要',
            FDescribe: '描述',
            FSubmitdate: null,
            FSeqno: null,
            FBkSn: null,
            FResult: null,
            FResultmsg: 'testtest',
            FState: 2,
            FNewCode: null,
            XmProjcode: 'XM0002',
            XmProjname: '项目0002',
            BudgetdtlName: '预算明细项目001',
            FDepartmentcode: null,
            FDepartmentname: null,
            QtKmdm: 501001,
            QtKmmc: null,
            PersistentState: 0,
            NgRecordVer: 1,
            NgInsertDt: '2019-05-28 10:58:03',
            NgUpdateDt: '2019-05-28 10:58:03',
            Creator: '521180820000001',
            Editor: '521180820000001',
            CurOrgId: '547181121000001'
          },
          {
            depart: '杭州市总工会',
            PhId: '216190528000009',
            MstPhid: '216190528000005',
            OrgPhid: '547181121000001',
            OrgCode: '1',
            RefbillPhid: '6',
            RefbillCode: 'zfbbf0006',
            RefbillDtlPhid: '1',
            RefbillDtlPhid2: '1',
            FAmount: 1000.0,
            FCurrency: '001',
            FPayAcntname: '付款账户1',
            FPayAcnt: '111001',
            FPayBankcode: '',
            FRecAcntname: '',
            FRecAcnt: '',
            FRecBankcode: '',
            FRecCityname: '杭州市',
            FSamecity: 0,
            FSamebank: 1,
            FIsurgent: 1,
            FCorp: 1,
            FUsage: '用途信息',
            FPostscript: '附言：xxx',
            FExplation: '摘要',
            FDescribe: '描述',
            FSubmitdate: null,
            FSeqno: null,
            FBkSn: null,
            FResult: null,
            FResultmsg: null,
            FState: 0,
            FNewCode: null,
            XmProjcode: 'XM0002',
            XmProjname: '项目0002',
            BudgetdtlName: '预算明细项目002',
            FDepartmentcode: null,
            FDepartmentname: null,
            QtKmdm: 501001,
            QtKmmc: null,
            PersistentState: 0,
            NgRecordVer: 1,
            NgInsertDt: '2019-05-28 10:58:03',
            NgUpdateDt: '2019-05-28 10:58:03',
            Creator: '521180820000001',
            Editor: '521180820000001',
            CurOrgId: '547181121000001'
          },
          {
            PhId: '216190528000010',
            MstPhid: '216190528000005',
            OrgPhid: '547181121000001',
            depart: '杭州市总工会',
            OrgCode: '1',
            RefbillPhid: '6',
            RefbillCode: 'zfbbf0006',
            RefbillDtlPhid: '1',
            RefbillDtlPhid2: '1',
            FAmount: 1006.0,
            FCurrency: '001',
            FPayAcntname: '付款账户2',
            FPayAcnt: '111002',
            FPayBankcode: '',
            FRecAcntname: '',
            FRecAcnt: '',
            FRecBankcode: '',
            FRecCityname: '杭州市',
            FSamecity: 0,
            FSamebank: 1,
            FIsurgent: 1,
            FCorp: 1,
            FUsage: '用途信息2',
            FPostscript: '附言：xxx2',
            FExplation: '摘要2',
            FDescribe: '描述2',
            FSubmitdate: null,
            FSeqno: null,
            FBkSn: null,
            FResult: null,
            FResultmsg: null,
            FState: 0,
            FNewCode: null,
            XmProjcode: 'XM0001',
            XmProjname: '项目0001',
            BudgetdtlName: '预算明细项目003',
            FDepartmentcode: null,
            FDepartmentname: null,
            QtKmdm: 501001,
            QtKmmc: null,
            PersistentState: 0,
            NgRecordVer: 1,
            NgInsertDt: '2019-05-28 10:58:03',
            NgUpdateDt: '2019-05-28 10:58:03',
            Creator: '521180820000001',
            Editor: '521180820000001',
            CurOrgId: '547181121000001'
          },
          {
            PhId: '216190528000010',
            MstPhid: '216190528000005',
            OrgPhid: '547181121000001',
            OrgCode: '1',
            depart: '杭州市总工会',
            RefbillPhid: '6',
            RefbillCode: 'zfbbf0006',
            RefbillDtlPhid: '1',
            RefbillDtlPhid2: '1',
            FAmount: 1006.0,
            FCurrency: '001',
            FPayAcntname: '付款账户2',
            FPayAcnt: '111002',
            FPayBankcode: '',
            FRecAcntname: '',
            FRecAcnt: '',
            FRecBankcode: '',
            FRecCityname: '杭州市',
            FSamecity: 0,
            FSamebank: 0,
            FIsurgent: 1,
            FCorp: 1,
            FUsage: '用途信息2',
            FPostscript: '附言：xxx2',
            FExplation: '摘要2',
            FDescribe: '描述2',
            FSubmitdate: null,
            FSeqno: null,
            FBkSn: null,
            FResult: null,
            FResultmsg: null,
            FState: 0,
            FNewCode: null,
            XmProjcode: 'XM0001',
            XmProjname: '项目0001',
            BudgetdtlName: '预算明细项目004',
            FDepartmentcode: null,
            FDepartmentname: null,
            QtKmdm: 501002,
            QtKmmc: null,
            PersistentState: 0,
            NgRecordVer: 1,
            NgInsertDt: '2019-05-28 10:58:03',
            NgUpdateDt: '2019-05-28 10:58:03',
            Creator: '521180820000001',
            Editor: '521180820000001',
            CurOrgId: '547181121000001'
          }
        ]
      },
      appDialog: {
        title: '',
        btnGroup: {
          cancelName: '',
          onfirmName: ''
        }
      }
    }
  },
  created() {
    console.log(this.data.data)
    this.detail.Mst = Array.isArray(this.data.data)
      ? this.data.data[0]
      : this.data.data
    // this.getData()
  },
  mounted() {},
  methods: {
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
    getData() {
      this.getAxios('/GKPaymentMstApi/GetPayment4Zjbf', {
        id: this.data.data.PhId,
        // id: 401190528000001,
        uid: '521180820000001', //用户id
        orgid: '547181121000001', //组织id
        ryear: '2019' //年度
      })
        .then(res => {
          console.log(res)
          if (res.Status == 'error') {
            return
          }
          res.Dtls.forEach(item => (item.choosed = false))
          this.detail.Dtls = res.Dtls
          this.$nextTick(() => {
            this.$refs.payListTable.doLayout()
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getBank(e) {
      if (this.bankChooseData.data.choosed) {
        this.detail.Dtls.forEach(item => {
          item.FRecAcntname = '杭州市总工会'
          item.FRecAcnt = '2019010101'
          item.bankName = '杭州银行'
          item.FRecBankcode = '2019010101'
        })
      } else {
        this.bankChooseData.data.FRecAcntname = '杭州市总工会'
        this.bankChooseData.data.FRecAcnt = '2019010101'
        this.bankChooseData.data.bankName = '杭州银行'
        this.bankChooseData.data.FRecBankcode = '2019010101'
      }
    },
    closeAuditFollow() {
      this.showAuditfollow = false
    },
    payListClose(done) {
      if (this.reSetting) {
        this.reSetting = false
        this.data.itemType = 'error'
      } else {
        done()
      }
    },
    showFundDetail() {
      this.fundDetailData.openDialog = true
    },
    // dialog中的check事件
    selectOne($scope) {
      console.log($scope.row.choosed)
      if ($scope.row.choosed) {
        this.allSelected = this.detail.Dtls.every(item => item.choosed)
      } else {
        this.allSelected = false
      }
    },
    selectAll(choosed) {
      this.detail.Dtls.forEach(item => {
        item.choosed = choosed
      })
    },
    // 支付单详情事件
    save(type) {
      switch (type) {
        case '':
          if (this.reSetting) {
            this.$msgBox.show({
              content: '保存成功。',
              fn: () => {
                this.reSetting = false
                this.data.itemType = 'error'
              }
            })
            return
          }
          this.$msgBox.show({
            content: '保存成功。'
          })
          return
          break
        case 'approvalData':
        case 'payErrorHandleData':
        case 'mergePayData':
          this[type].openDialog = true
          break
        case 'new':
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
    // 选择银行
    selectBank(item) {
      console.log(123)
      this.bankChooseData.openDialog = true
      this.bankChooseData.data = item
    }
  },
  watch: {}
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
      font-size: 0.18rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .payCenterDialog {
    background-color: #fff;
    .content {
      text-align: left;
      font-size: 0.16rem;
      > span {
        line-height: 55px;
      }
      > .el-input {
        width: auto;
        line-height: 55px;
      }
      > img {
        width: 55px;
        height: 55px;
        margin-right: 10px;
      }
      &.payListContent {
        background-color: #f5f5f5;
        padding: 10px;
        margin-top: 15px;
        > h1 {
          font-size: 0.18rem;
          margin-bottom: 10px;
        }
        .payDetail {
          background-color: #fff;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
          font-size: 0.18rem;
          h2 {
            line-height: 40px;
            &.selects {
              display: flex;
              > span:first-child {
                flex: 1;
                display: flex;
                line-height: 40px;
                padding-right: 50px;
                > .el-select {
                  flex: 1;
                }
              }
              > span:nth-child(2) {
                .el-select {
                  min-width: 200px;
                }
              }
            }
          }
        }
        .getDetail {
          background-color: #fff;
          border-radius: 10px;
          padding: 10px;
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
            > .el-select {
              height: 100%;
            }
            &:after {
              content: '';
              display: inline-block;
              vertical-align: middle;
              height: 100%;
            }
          }
        }
      }
      .bottom {
        margin-top: 10px;
        font-size: 0.18rem;
        padding-left: 20px;
        overflow: hidden;
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
    .btns {
      text-align: right;
      .btn {
        border: 1px solid $btnColor;
        cursor: pointer;
        line-height: 28px;
        &:not(:last-of-type) {
          margin-right: 10px;
        }
        &.btn-cancel {
          background: #fff;
          color: $btnColor;
          border: 1px solid $btnColor;
        }
        &.btn-large {
          width: 88px;
        }
      }
      .payId {
        float: left;
        line-height: 30px;
        font-size: 0.18rem;
      }
    }
    .el-collapse {
      margin-top: 10px;
    }
  }
}
</style>

<style lang='scss'>
.payCenter {
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
    border-color: rgb(204, 204, 204);
  }
  .el-table--border,
  .el-table--group {
    border-color: rgb(204, 204, 204);
  }
  .payCenterDialog {
    .el-table {
      font-size: 0.14rem;
      th {
        background-color: $btnColor;
        border-right-color: #fff;
      }
      thead {
        color: #fff;
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
      color: #fff;
    }
    .payDetail h2 .el-input__inner {
      font-size: 0.18rem;
    }
    .payListContent .getDetail .el-table__body-wrapper {
      max-height: 200px !important;
    }
    .payListContent
      .getDetail
      .el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td {
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
    max-height: 90%;
    .el-dialog__body {
      padding-top: 0px;
    }
  }
  &.el-dialog__wrapper {
    text-align: center;
  }
  &.el-dialog__wrapper::after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    height: 100%;
  }
}
.payList-largeSelects.el-popper .el-select-dropdown__item {
  font-size: 0.18rem;
}
</style>
