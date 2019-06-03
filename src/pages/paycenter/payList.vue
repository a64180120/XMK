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
        <span style="float: left">支付单查看</span>
      </div>
      <el-row :gutter="10">
        <el-col :span="24">
          <span style="float:left;font-size:0.16rem;line-height:28px;">支付单号：{{detail.Mst.FCode}}</span>
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
                  <div>浙江省总工会</div>
                </li>
                <li>
                  <span>付款账户：</span>
                  <div v-if="data.itemType == 'notApprove'">
                    <el-select
                      popper-class="payList-largeSelects"
                      v-model="account"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in accountList"
                        :label="item.FBankname"
                        :value="item.PhId"
                      ></el-option>
                    </el-select>
                  </div>
                  <div v-else>{{accountList.find(item=>item.PhId == account).FBankname}}</div>
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
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </div>
                  <div
                    v-else
                  >{{FPaymethodList.find(item=>item.value == detail.Mst.FPaymethod).label}}</div>
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
              >
                <!-- 序号列 -->
                <el-table-column type="index" width="80" header-align="center" align="center">
                  <template slot="header" slot-scope="scope">
                    <el-checkbox
                      @change="selectAll"
                      v-model="allSelected"
                      v-if="data.itemType == 'notApprove'||data.itemType == 'error'"
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
                      v-else-if="scope.column.property=='FDescribe'&& data.itemType == 'notApprove'"
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
                        <span v-if="scope.row.FState == 1">————</span>
                        <span v-else>{{scope.row[scope.column.property]}}</span>
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
      </el-row>
    </el-dialog>
    <!-- 关联申请单信息查看 -->
    <el-dialog
      append-to-body
      :visible.sync="fundDetailData.openDialog"
      width="80%"
      :close-on-click-modal="false"
      class="dialog detail-dialog payCenter"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left;">查看申请</span>
      </div>
      <apply-bill :data="fundDetailData" @showImg="showImg">
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
    <merge-pay :father="data" :data="mergePayData"></merge-pay>
    <!-- 异常处理 -->
    <pay-error-handle
      :father="data"
      v-if="payErrorHandleData.openDialog"
      :data="payErrorHandleData"
    ></pay-error-handle>
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
import ImgView from '../../components/imgView/imgView'
import approvalDialog from '../payfundapproval/approvalDialog.vue'
import { BankAccountList } from '@/api/bankaccount'

export default {
  name: 'payList',
  components: {
    applyBill,
    mergePay,
    payErrorHandle,
    goApproval,
    bankChoose,
    auditfollow,
    approvalDialog,
    ImgView
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
      imgDialog: false, //图片预览弹框
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
          name: 'FPayBankcode',
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
      account: '',
      accountList: [
        {
          label: '浙江省总工会',
          value: 1
        },
        {
          label: '浙江省总工会政治部',
          value: 2
        },
        {
          label: '浙江省总工会财务部',
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
      detail: {
        Mst: {
          FCode: '',
          FPaymethod: 1
        },
        Dtls: []
      },

      oldDtls: [],
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
    this.detail.Mst = Array.isArray(this.data.data)
      ? this.data.data[0]
      : this.data.data
    this.$nextTick(() => {
      this.account = this.detail.Mst.OrgPhid
      this.getData()
      this.getAccountList({
        OrgPhid: 488181024000001,
        // OrgPhid: this.detail.Mst.OrgPhid,
        selectStr: ''
      })
    })
  },
  mounted() {},
  methods: {
    // 获取付款银行档案
    getAccountList(data) {
      BankAccountList(data)
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.show(res.Msg)
          } else {
            this.accountList = res.Record
          }
        })
        .catch(err => {
          this.$msgBox.show('获取银行档案列表失败!')
        })
    },
    // 批量设置转账方式
    selectFSamebankFocus() {
      if (this.detail.Dtls.every(item => item.choosed === false)) {
        this.$refs.selectFSamebank.blur()
        this.$msgBox.show('请先选择要设置的项目。')
        console.log('thishis')
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
    getData() {
      this.detail.Dtls = [
        {
          choosed: false,
          PhId: '401190528000001',
          MstPhid: '401190528000001',
          OrgPhid: '521180820000002',
          OrgCode: '100',
          RefbillPhid: '7',
          RefbillCode: 'zfbbf0007',
          RefbillDtlPhid: '1',
          RefbillDtlPhid2: '1',
          FAmount: 1000.0,
          FCurrency: '001',
          FPayAcntname: '付款账户1',
          FPayAcnt: '111001',
          FPayBankcode: '102',
          FRecAcntname: '收款账户1',
          FRecAcnt: '222122',
          FRecBankcode: '102',
          FRecCityname: '杭州市',
          FSamecity: 0,
          FSamebank: 1,
          FIsurgent: 1,
          FCorp: 1,
          FUsage: '用途信息',
          FPostscript: '附言：xxx',
          FExplation: '摘要-修改',
          FDescribe: '描述-修改',
          FSubmitdate: null,
          FSeqno: null,
          FBkSn: null,
          FResult: null,
          FResultmsg: null,
          FState: 0,
          FNewCode: null,
          XmProjcode: 'XM0001', //项目代码
          XmProjname: '项目0001', //项目名称
          BudgetdtlName: '预算明细项目001', //明细项目名称
          FDepartmentcode: '100.1', //补助单位/部门代码
          FDepartmentname: '省总财务部', //补助单位/部门名称
          QtKmdm: null, //预算科目代码
          QtKmmc: null, //预算科目名称
          PersistentState: 0,
          NgRecordVer: 2,
          NgInsertDt: '2019-05-28 09:57:50',
          NgUpdateDt: '2019-05-28 13:23:27',
          Creator: '521180820000001',
          Editor: '521180820000001',
          CurOrgId: '521180820000002'
        },
        {
          PhId: '401190528000002',
          MstPhid: '401190528000001',
          OrgPhid: '521180820000002',
          OrgCode: '100',
          RefbillPhid: '7',
          choosed: false,
          RefbillCode: 'zfbbf0007',
          RefbillDtlPhid: '2',
          RefbillDtlPhid2: '2',
          FAmount: 1006.0,
          FCurrency: '001',
          FPayAcntname: '付款账户2',
          FPayAcnt: '111002',
          FPayBankcode: '102',
          FRecAcntname: '收款账户1',
          FRecAcnt: '222122',
          FRecBankcode: '102',
          FRecCityname: '杭州市',
          FSamecity: 0,
          FSamebank: 1,
          FIsurgent: 1,
          FCorp: 1,
          FUsage: '用途信息2',
          FPostscript: '附言：xxx2',
          FExplation: '摘要2-修改',
          FDescribe: '描述2-修改',
          FSubmitdate: null,
          FSeqno: null,
          FBkSn: null,
          FResult: null,
          FResultmsg: null,
          FState: 0,
          FNewCode: null,
          XmProjcode: 'XM0001',
          XmProjname: '项目0001',
          BudgetdtlName: '预算明细项目002',
          FDepartmentcode: '100.1',
          FDepartmentname: '省总财务部',
          QtKmdm: null,
          QtKmmc: null,
          PersistentState: 0,
          NgRecordVer: 2,
          NgInsertDt: '2019-05-28 09:57:50',
          NgUpdateDt: '2019-05-28 13:23:35',
          Creator: '521180820000001',
          Editor: '521180820000001',
          CurOrgId: '521180820000002'
        }
      ]
      return
      this.getAxios('GGK/GKPaymentMstApi/GetPayment4Zjbf', {
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
          // this.$nextTick(() => {
          //   this.$refs.payListTable.doLayout()
          // })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取银行
    getBank(data) {
      console.log(data)
      if (this.bankChooseData.data.choosed) {
        this.detail.Dtls.forEach(item => {
          if (item.choosed) {
            item.FRecAcntname = data.FBankname
            item.FRecAcnt = data.FAccount
            item.FPayBankcode = data.FOpenAccount
            item.FRecBankcode = data.FBankcode
          }
        })
      } else {
        this.bankChooseData.data.FRecAcntname = data.FBankname
        this.bankChooseData.data.FRecAcnt = data.FAccount
        this.bankChooseData.data.FPayBankcode = data.FOpenAccount
        this.bankChooseData.data.FRecBankcode = data.FBankcode
      }
    },
    closeAuditFollow() {
      this.showAuditfollow = false
    },
    payListClose(done) {
      if (this.reSetting) {
        console.log('setting')
        this.reSetting = false
        this.data.itemType = 'error'
        this.detail.Dtls.unshift(this.oldDtls)
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
        if (this.data.itemType == 'error') {
          var newDtls = this.detail.Dtls.filter(item => item.FState == 2)
          this.allSelected = newDtls.every(item => item.choosed)
          return
        }
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
                this.detail.Dtls.unshift(this.oldDtls)
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
          this[type].data = this.data.data
          break
        case 'new':
          this.reSetting = true
          this.data.itemType = 'notApprove'
          this.oldDtls = this.detail.Dtls[0]
          this.detail.Dtls.splice(0, 1)
          this.detail.Dtls[0].RefbillDtlPhid2 = 2161905280009999
          break
        case 'approval':
          this.appDialog.title = '查看'
          this.appDialog.btnGroup.cancelName = '取消'
          this.appDialog.btnGroup.onfirmName = '确认'
          this.$refs.approvalDialog.changeDialog()
          break
      }
    },
    // 测试用 选择银行
    selectBank(item) {
      console.log(123)
      this.bankChooseData.openDialog = true
      this.bankChooseData.data = item
    }, // 测试用,清空select
    clearItems(item) {
      item['QtKmdm'] = ''
      item['FSamebank'] = ''
      item['FRecAcntname'] = ''
      item['FRecAcnt'] = ''
      item['FPayBankcode'] = ''
      item['FRecBankcode'] = ''
    }
  },
  watch: {
    // 'data.openDialog'(newVal) {
    //   if (newVal) {
    //     this.detail.Mst = Array.isArray(this.data.data)
    //       ? this.data.data[0]
    //       : this.data.data
    //     if (this.detail.Mst.FApproval == 0) {
    //       var Dtls = JSON.parse(JSON.stringify(this.detail.Dtls))
    //       Dtls.forEach(item => {
    //         this.clearItems(item)
    //       })
    //       this.detail.Dtls = Dtls
    //     }
    //   }
    // }
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
          > span {
            position: relative;
            float: left;
            margin-left: -0.75rem;
          }
          > div {
            float: left;
            position: relative;
            padding-bottom: 10px;
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
