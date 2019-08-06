<template>
  <div class="payList">
    <!-- 支付单查看 -->
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="data.openDialog"
               width="80%"
               :close-on-click-modal="false"
               class="payCenter payList"
               :before-close="payListClose">
      <div slot="title"
           class="dialog-title">
        <span v-if="!reSetting"
              style="float: left">支付单查看</span>
        <span v-else
              style="float: left">发起重新支付</span>
      </div>
      <el-row :gutter="10"
              style="margin-bottom: 20px">
        <el-col :span="24">
          <span v-if="!reSetting"
                style="float:left;font-size:0.16rem;line-height:28px;">支付单号：{{detail.Mst.FCode}}</span>
          <div class="top-btn">
            <template v-if="detail.Mst.FState == 2&&menubutton.paycenter_catch=='True'">
              <el-button class="btn"
                         size="mini"
                         @click="save('payErrorHandleData')">异常处理</el-button>
              <el-button class="btn"
                         size="mini"
                         @click="save('new')">重新支付</el-button>
            </template>
            <template v-if="detail.Mst.FState == 3&&detail.Mst.FApproval == 9&&menubutton.paycenter_mergepay=='True'">
              <el-button class="btn"
                         size="mini"
                         @click="save('payErrorHandleData')">异常处理</el-button>
            </template>
            <template v-if="!detail.Mst.FDelete&&(detail.Mst.FApproval == 0||detail.Mst.FApproval == 2)&&menubutton.paycenter_maintain=='True'">
              <el-button class="btn"
                         size="mini"
                         @click="save('')">保存</el-button>
              <el-button class="btn"
                         size="mini"
                         style="padding:0"
                         @click="save('approvalData')"
                         v-if="menubutton.paycenter_check=='True'">保存并送审</el-button>
            </template>
            <template v-if="detail.Mst.FState == 0&&detail.Mst.FApproval == 9&&menubutton.paycenter_mergepay=='True'">
              <el-button class="btn"
                         size="mini"
                         @click="save('mergePayData')">支付</el-button>
            </template>
            <el-button class="btn"
                       size="mini"
                       @click="print">打印</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="payText">
            <div class="pay-card">
              <div>付款方</div>
              <ul>
                <li>
                  <span>付款单位：</span>
                  <div style>{{detail.Mst.FOrgname}}</div>
                </li>
                <li :class="{'my-10':detail.Mst.FApproval == 2 ||detail.Mst.FApproval == 0}">
                  <span>付款账户：</span>
                  <div v-if="detail.Mst.FApproval == 2 ||detail.Mst.FApproval == 0"
                       style="border:0;padding-left:0;">
                    <el-tooltip class="payTooltip"
                                :disabled="!account">
                      <el-select popper-class="payList-largeSelects"
                                 v-model="account"
                                 placeholder="请选择"
                                 @change="accountChange"
                                 width="100%">
                        <el-option v-if="accountList.length>0"
                                   v-for="item in accountList"
                                   :label="item.FBankname"
                                   :value="item.PhId"></el-option>
                      </el-select>
                      <span slot="content">{{(accountList.length && account&&account!='0')?(accountList.find(item=>{return item.PhId == account})).FBankname:''}}</span>
                    </el-tooltip>
                  </div>
                  <div v-else>
                    <el-tooltip class="payTooltip">
                      <span slot="content">{{(accountList.length && account&&account!='0')?(accountList.find(item=>{return item.PhId == account})).FBankname:''}}</span>
                      <span>{{(accountList.length && account&&account!='0')?(accountList.find(item=>{return item.PhId == account})).FBankname:''}}</span>
                    </el-tooltip>
                  </div>
                </li>
                <li>
                  <span>支付方式：</span>
                  <div v-if="detail.Mst.FApproval == 2 ||detail.Mst.FApproval == 0"
                       style="border:0;padding-left:0;">
                    <el-tooltip class="payTooltip"
                                :disabled="!detail.Mst.FPaymethod">
                      <el-select popper-class="payList-largeSelects"
                                 v-model="detail.Mst.FPaymethod"
                                 placeholder="请选择"
                                 width="100%">
                        <el-option v-for="(item,index) in FPaymethodList"
                                   :label="item.TypeName"
                                   :value="item.PhId.toString()"
                                   :key="index"></el-option>
                      </el-select>
                      <span slot="content">{{detail.Mst.FPaymethod.length==15&&FPaymethodList.length>0?(FPaymethodList.find(item=>item.PhId == detail.Mst.FPaymethod)).TypeName:''}}</span>
                    </el-tooltip>
                  </div>
                  <div v-else>
                    <el-tooltip class="payTooltip">
                      <span slot="content">{{detail.Mst.FPaymethod.length==15&&FPaymethodList.length>0?(FPaymethodList.find(item=>item.PhId == detail.Mst.FPaymethod)).TypeName:''}}</span>
                      <span>{{detail.Mst.FPaymethod.length==15&&FPaymethodList.length>0?(FPaymethodList.find(item=>item.PhId == detail.Mst.FPaymethod)).TypeName:''}}</span>
                    </el-tooltip>
                  </div>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="content"
              :gutter="10">
        <el-col :span="24"
                style="text-align: left">
          <el-card class="payText">
            <div slot="header"
                 style="padding: 0 10px;text-align: left">
              <span>
                <span>收款方</span>
              </span>
            </div>
            <div class="detail-table">
              <div class="top">
                <template v-if="detail.Mst.FApproval == 0 || detail.Mst.FApproval == 2">
                  批量设置转账方式
                  <el-select @focus="selectFSamebankFocus"
                             @visible-change="selectFSamebankBlur"
                             v-model="bankType"
                             placeholder="请选择"
                             ref="selectFSamebank">
                    <el-option v-for="(item,index) in FSamebankList"
                               :label="item.label"
                               :value="item.value"
                               :key="index"></el-option>
                  </el-select>
                </template>
              </div>
              <div class="getDetail">
                <el-table max-height="350px"
                          ref="payListTable"
                          style="margin-top:10px;"
                          :data="detail.Dtls"
                          v-if="detail.Dtls.length"
                          border
                          :span-method="tabelColspan"
                          @row-click="rowClick"
                          @header-click="headerClick">
                  <!-- 序号列 -->
                  <el-table-column width="80"
                                   header-align="center"
                                   align="center">
                    <template slot="header"
                              slot-scope="scope">
                      <el-checkbox @click.stop.native="check"
                                   @change="selectAll"
                                   v-model="allSelected"
                                   label="序号"
                                   v-if="(detail.Mst.FApproval == 0) ||( detail.Mst.FApproval == 2)"></el-checkbox>
                      <template v-else>序号</template>
                    </template>
                    <template slot-scope="scope">
                      <el-checkbox @click.stop.native="check"
                                   @change="selectOne(scope)"
                                   :label="scope.$index+1"
                                   v-model="scope.row.choosed"
                                   v-if="(detail.Mst.FApproval == 0) ||( detail.Mst.FApproval == 2)"></el-checkbox>
                      <span v-else>{{scope.$index+1}}</span>
                    </template>
                  </el-table-column>
                  <!-- 公共列 -->
                  <el-table-column v-for="(item,index) in payHeaders1"
                                   :key="index"
                                   :property="item.name"
                                   :label="item.label"
                                   :width="item.width||''"
                                   :header-align="item.headerAlign||'center'"
                                   :align="item.bodyAlign||'left'"
                                   empty-text="————">
                    <template slot-scope="scope">
                      <!-- 申报金额 -->
                      <div v-if="scope.column.property=='FAmount'"
                           class>{{scope.row[scope.column.property] | NumFormat}}</div>
                      <!-- 备注  -->
                      <div v-else-if="scope.column.property=='FDescribe'&& (detail.Mst.FApproval == 0 || detail.Mst.FApproval == 2)"
                           class>
                        <el-input v-model="scope.row[scope.column.property]"
                                  placeholder></el-input>
                      </div>
                      <!-- 预算科目  -->
                      <div v-else-if="scope.column.property=='QtKmdm'"
                           class>
                        <template v-if="(detail.Mst.FApproval == 0 || detail.Mst.FApproval == 2)&&kemuList.length>0&&scope.row.QtKmdm">
                          <el-select v-model="scope.row.QtKmdm"
                                     placeholder="请选择预算科目"
                                     @change="kumuChange(scope.row)">
                            <el-option v-for="(item,index) in kemuList.filter(item=>scope.row.QtKmdm.slice(0,3)==item.KMDM.slice(0,3))"
                                       :label="item.KMDM+' '+item.KMMC"
                                       :value="item.KMDM"
                                       :disabled="item.KMDM.length==3"></el-option>
                          </el-select>
                        </template>
                        <template v-else>{{scope.row.QtKmdm}} {{scope.row.QtKmmc}}</template>
                      </div>
                      <!-- 支付方式 -->
                      <div v-else-if="scope.column.property=='FSamebank'"
                           class>
                        <template v-if="(detail.Mst.FApproval == 0 || detail.Mst.FApproval == 2)">
                          <el-select v-model="scope.row[scope.column.property]"
                                     placeholder="请选择支付方式">
                            <el-option v-for="(item,index) in FSamebankList"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="index"></el-option>
                          </el-select>
                        </template>
                        <template v-else>{{FSamebankList.find(item=>item.value==scope.row[scope.column.property]).label}}</template>
                      </div>
                      <!-- 收款方账户名称 -->
                      <div v-else-if="scope.column.property=='FRecAcntname'&&(detail.Mst.FApproval == 0 || detail.Mst.FApproval == 2)"
                           class="atype"
                           @click="selectBank(scope.row)">
                        <span>{{scope.row[scope.column.property]}}</span>
                      </div>
                      <!-- 其他 -->
                      <div class
                           v-else>
                        <el-tooltip>
                          <p slot="content">{{scope.row[scope.column.property]}}</p>
                          <p class="payTooltip">{{scope.row[scope.column.property]}}</p>
                        </el-tooltip>
                      </div>
                    </template>
                  </el-table-column>
                  <!-- 支付状态,原因,关联单据列，只有审批通过才显示 -->
                  <template v-if="detail.Mst.FApproval==9">
                    <!-- 开始支付且支付异常或曾经支付异常过的：显示支付状态，原因，关联单据 -->
                    <template v-if="(detail.Dtls.some(item=>item.FNewCode)||detail.Mst.FState==2)&&detail.Mst.FState!=0">
                      <el-table-column v-for="(item,index) in payHeaders2"
                                       :key="index+20"
                                       :property="item.name"
                                       :label="item.label"
                                       :width="item.width||''"
                                       :header-align="item.headerAlign||'center'"
                                       :align="item.bodyAlign||'left'">
                        <template slot-scope="scope">
                          <template v-if="scope.column.property=='FState'">{{FStateList.find(item=>item.value==scope.row[scope.column.property]).label}}</template>
                          <template v-else-if="scope.column.property=='FNewCodes'">
                            <template v-if="scope.row[scope.column.property]">
                              <p class="atype"
                                 style="display:inline-block;position:relative;"
                                 v-for="(item,index) in scope.row[scope.column.property].split(',')"
                                 @click="goNewPayList(scope.row,index)">{{item}}</p>
                            </template>
                            <template v-else>————</template>
                          </template>
                          <span v-else-if="scope.column.property=='FResultmsg'">
                            <el-tooltip v-if="scope.row.FResultmsg&&scope.row.FState!=1"
                                        :content="scope.row.FResultmsg">
                              <span>{{scope.row.FResultmsg}}</span>
                            </el-tooltip>
                            <template v-else>————</template>
                          </span>
                        </template>
                      </el-table-column>
                    </template>
                    <!-- 待支付，支付中，没有异常直接支付成功：只显示支付状态 -->
                    <template v-else>
                      <el-table-column v-for="(item,index) in payHeaders3"
                                       :key="index+20"
                                       :property="item.name"
                                       :label="item.label"
                                       :width="item.width||''"
                                       :header-align="item.headerAlign||'center'"
                                       :align="item.bodyAlign||'left'">
                        <template slot-scope="scope">
                          <template v-if="scope.column.property=='FState'">
                            <!-- 支付中悬浮提示状态 -->
                            <template v-if="scope.row.FState==3">
                              <el-tooltip :content="scope.row.FResultmsg">
                                <span>支付中</span>
                              </el-tooltip>
                            </template>
                            <template v-else>{{FStateList.find(item=>item.value==scope.row[scope.column.property]).label}}</template>
                          </template>
                        </template>
                      </el-table-column>
                    </template>
                  </template>
                </el-table>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <div class="bottom">
          <span v-if="!reSetting"
                @click="getAuditfollow">{{detail.Mst.FApproval!=undefined?FApprovalList.find(item=>item.value==detail.Mst.FApproval).label:''}}</span>
          <span v-if="!reSetting"
                :class="{success:detail.Mst.FState==1}">{{detail.Mst.FState!=undefined?FStateList.find(item=>item.value==detail.Mst.FState).label:''}}</span>
          <span class="dj"
                @click="fundDetailData.openDialog = true">点击查看关联申报单信息（申报编号：{{detail.Mst.RefbillCode}}）</span>
        </div>
      </el-row>
    </el-dialog>
    <!-- 关联申报单信息查看 -->
    <el-dialog append-to-body
               modal-append-to-body
               v-if="fundDetailData.openDialog"
               :visible.sync="fundDetailData.openDialog"
               width="90%"
               :close-on-click-modal="false"
               class="dialog detail-dialog payCenter">
      <div slot="title"
           class="dialog-title">
        <span style="float: left;">查看申报</span>
      </div>
      <apply-bill :applyNum="detail.Mst.RefbillPhid.toString()"
                  :subData="[]"
                  @showImg="showImg">
        <div slot="btn-group">
          <el-button v-show="false"
                     class="btn"
                     size="mini">打印</el-button>
        </div>
      </apply-bill>
    </el-dialog>
    <!-- 合并支付组件 -->
    <merge-pay v-if="mergePayData.openDialog"
               :father="data"
               :data="mergePayData"></merge-pay>
    <!-- 异常处理 -->
    <pay-error-handle :father="data"
                      v-if="payErrorHandleData.openDialog"
                      :data="payErrorHandleData"></pay-error-handle>
    <!-- 送审 -->
    <go-approval :bType="'002'"
                 v-if="approvalData.openDialog"
                 :father="data"
                 :reSetting="reSetting"
                 :data="approvalData"></go-approval>
    <!-- 银行档案 -->
    <bank-choose v-if="bankChooseData.openDialog"
                 :data="bankChooseData"
                 @getBank="getBank"></bank-choose>
    <!-- 审批流程 -->
    <auditfollow :auditMsg="auditMsg"
                 :visible="showAuditfollow"
                 @update:visible="closeAuditFollow"></auditfollow>
    <!-- 关联支付单 -->
    <pay-list v-if="boy.openDialog"
              :data="boy" />
    <div class="content printcontent"
         ref="printArea">
      <table>
        <colgroup>
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="20%" />
        </colgroup>
        <tr>
          <td colspan="2"
              class="left"
              style="border: 0;">
            <span style="color: #3294e8;">申报单位/部门：</span>
            {{detail.Mst.fdepname}}
          </td>
          <td colspan="2"
              style="border: 0;">
            <span style="color: #3294e8;">申报日期：</span>
            {{detail.Mst.NgInsertDt&&(detail.Mst.NgInsertDt.substring(0,19)).replace('T',' ')}}
          </td>
          <td colspan="2"
              class="right"
              style="border: 0;">
            <span style="color: #3294e8;">申报金额（元）：</span>
            {{detail.Mst.FAmountTotal | NumFormat}}
          </td>
        </tr>
        <tr>
          <td colspan="1"
              class="tbTitle"
              style="letter-spacing: 9px;padding-left: 14px;">申报单号</td>
          <td colspan="5">{{detail.Mst.RefbillCode}}</td>
        </tr>
        <tr>
          <td colspan="1"
              class="tbTitle">申报单位名称</td>
          <td colspan="5">{{detail.Mst.FOrgname}}-{{detail.Mst.fdepname}}</td>
        </tr>
        <tr>
          <td colspan="1"
              class="tbTitle"
              style="letter-spacing: 9px;padding-left: 14px;">申报说明</td>
          <td colspan="3">{{detail.Mst.FDescribe}}</td>
          <td class="tbTitle">申报金额合计(元)</td>
          <td class="right">{{detail.Mst.FAmountTotal | NumFormat}}</td>
        </tr>
      </table>
      <table style="display:none">
        <colgroup>
          <col width="25%" />
          <col width="45%" />
          <col width="30%" />
        </colgroup>
        <tr>
          <td colspan="3"
              class="secondTitle">审批流程</td>
        </tr>
        <tr>
          <td class="tbTitle">审批人</td>
          <td class="tbTitle">审批意见</td>
          <td class="tbTitle">审批时间</td>
        </tr>
        <tr v-if="auditMsg.length"
            v-for="(item,index) in auditMsg">
          <td>{{item.OperaName}}</td>
          <td>{{item.FOpinion}}</td>
          <td>{{item.FDate}}</td>
        </tr>
        <tr v-else>
          <td colspan="3">暂无审批数据</td>
        </tr>
      </table>
      <table>
        <colgroup>
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="20%" />
        </colgroup>
        <tr>
          <td colspan="6"
              class="secondTitle">申报拨付明细</td>
        </tr>
        <tr class="tbTitle">
          <td>项目编码</td>
          <td>项目名称</td>
          <td>补助单位/部门</td>
          <td>明细项目名称</td>
          <td>申报金额(元)</td>
          <td>备注</td>
        </tr>
        <template v-if="detail.Dtls.length">
          <tr v-for="(item,index) in detail.Dtls">
            <td class="left"
                v-if="index==0||(detail.Dtls[index-1].XmProjcode!=item.XmProjcode)"
                :rowspan="(index<detail.Dtls.length-1)&&(detail.Dtls[index+1].XmProjcode==item.XmProjcode)&&[...detail.Dtls].splice(index+1).findIndex(i=>i.XmProjcode==item.XmProjcode)+2">{{item.XmProjcode}}</td>
            <td class="left"
                v-if="index==0||detail.Dtls[index-1].XmProjcode!=item.XmProjcode"
                :rowspan="(index<detail.Dtls.length-1)&&(detail.Dtls[index+1].XmProjcode==item.XmProjcode)&&[...detail.Dtls].splice(index).findIndex(i=>i.XmProjcode==item.XmProjcode)+2">{{item.XmProjname}}</td>
            <td class="left">{{item.FDepartmentname}}</td>
            <td class="left">{{item.BudgetdtlName}}</td>
            <td class="right">{{item.FAmount | NumFormat}}</td>
            <td class="left">{{item.FDescribe}}</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import applyBill from '@/components/applyBill/applybill'
import mergePay from './mergePay.vue'
import payErrorHandle from './payErrorHandle.vue'
import goApproval from './goApproval.vue'
import bankChoose from './bankChoose'
import auditfollow from '@/components/auditFollow/auditfollow'
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
    auditfollow
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
  data () {
    return {
      boy: {
        openDialog: false,
        data: [
          {
            Mst: {
              FCode: '',
              FPaymethod: '',
              PhId: ''
            },
            Dtls: []
          }
        ]
      },
      imgDialog: false, //图片预览弹框
      showAuditfollow: false,
      auditMsg: [], //审批流程 数据
      // 支付单表单
      // 未送审
      payHeaders1: [
        {
          name: 'XmProjcode',
          label: '项目编码',
          width: '200'
        },
        {
          name: 'XmProjname',
          label: '项目名称',
          width: '200'
        },
        {
          name: 'BudgetdtlName',
          label: '明细项目名称',
          width: '200'
        },
        {
          name: 'FDepartmentname',
          label: '收款单位/部门',
          width: '200'
        },

        {
          name: 'FAmount',
          label: '申报金额（元）',
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
          label: '银行返回状态信息',
          width: '350',
          bodyAlign: 'center'
        },
        {
          name: 'FNewCodes',
          label: '重新支付后关联支付单编号',
          width: '200',
          bodyAlign: 'center'
        }
      ],
      payHeaders3: [
        {
          name: 'FState',
          label: '支付状态',
          width: '150',
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
      FApprovalList: [
        {
          label: '待送审',
          value: 0
        },
        {
          label: '审批中',
          value: 1
        },
        {
          label: '未通过',
          value: 2
        },
        {
          label: '审批通过',
          value: 9
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
          FPaymethod: '',
          PhId: ''
        },
        Dtls: []
      },
      oldDetail: null,
      orgName: ''
    }
  },
  methods: {
    print: function () {
      let that = this
      function prints () {
        let printArea = that.$refs.printArea.cloneNode(true)
        printArea.childNodes[2].style.display = 'table'
        let title = document.createElement('h2')
        title.innerText = '支付单'
        title.style.width = '100%'
        title.style.textAlign = 'center'
        printArea.insertBefore(title, printArea.firstChild)
        that.$print(printArea)
      }
      if (!this.auditMsg.length) {
        this.getAxios('GSP/GAppvalRecord/GetAppvalRecordList', {
          RefbillPhid: this.detail.Mst.PhId,
          FBilltype: '002'
        })
          .then(res => {
            if (res && res.Status === 'success') {
              that.auditMsg = res.Data
              that.$nextTick(() => {
                prints()
              })
            } else {
              that.$msgBox.show(res.Msg)
            }
          })
          .catch(err => {
            that.$msgBox.show('获取审批信息失败！无法打印。')
          })
      } else {
        prints()
      }
    },
    //拉取审批流数据查看
    getAuditfollow () {
      let that = this
      this.getAxios('GSP/GAppvalRecord/GetAppvalRecordList', {
        RefbillPhid: this.detail.Mst.PhId,
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
    },
    // 付款账号修改后立即赋值给子表
    accountChange (phid) {
      this.detail.Dtls.forEach(item => {
        item.BankPhid = phid
      })
    },
    // 预算科目选择
    kumuChange (e) {
      e.QtKmmc = this.kemuList.find(item => item.KMDM == e.QtKmdm).KMMC
    },
    // 获取支付单详情
    getData (type, getNewFCode) {
      getPayment({
        id: type ? this.oldDetail.Mst.PhId : this.detail.Mst.PhId,
        // id: 401190528000001,
        uid: this.userid || 488181024000001, //用户id
        orgid: this.orgid, //组织id
        ryear: this.year || '2019' //年度
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg || '获取支付单详情失败！')
            return
          }
          if (getNewFCode) {
            getNewFCode(res)
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
              res.Dtls[0].BankPhid == '0' ? '' : parseInt(res.Dtls[0].BankPhid)
            this.accountChange(this.account) //修改bug 第一次没有把account给子表
          }
          this.allSelected = false
          // this.orgName = (() => {
          //   let orgListJson = JSON.stringify(this.orglist)
          //   let phidIndex = orgListJson.indexOf(this.detail.Mst.OrgPhid)
          //   let nameIndex = orgListJson.indexOf('OName', phidIndex) + 8
          //   let nameEndIndex = orgListJson.indexOf('"', nameIndex)
          //   if (phidIndex == -1 || nameIndex == -1 || nameEndIndex == -1) {
          //     return ''
          //   }
          //   return orgListJson.slice(nameIndex, nameEndIndex)
          // })()
          if (res.Mst.FPaymethod == 0) {
            this.detail.Mst.FPaymethod = ''
          }
          if (this.accountList.length == 0) {
            this.getAccountList(
              {
                OrgPhid: this.detail.Mst.OrgPhid,
                selectStr: ''
              },
              this.detail.Mst.FApproval
            )
          }
          !this.FPaymethodList.length && this.GetSysSetList()
          !this.kemuList.length && this.getBudgetAccountsList()
        })
        .catch(err => {
          this.$msgBox.error('获取支付单详情失败！')
          console.log('payList', err)
        })
    },
    // 重新生成支付单-提交新增请求，将返回id保存到旧支付单请求（保存完新的旧支付单请求，原因：两行可能分开重新支付！旧支付单需要更新！），获取新增的支付单最新情况（多次保存，如果有新的Mst.PhId，则为保存）
    postAddPayList (postAddAppvalRecord) {
      postAddPayList({
        uid: this.userid, //用户id
        orgid: this.orgid, //组织id
        ryear: this.year || '2019', //年度
        infoData: this.detail
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
          } else {
            this.detail.Mst.PhId = res.KeyCodes[0]
            this.getData('', newData => {
              this.oldDetail.Dtls.forEach(item => {
                if (item.FState == 2) {
                  item.FNewCode = newData.Mst.FCode
                }
              })
              this.detail.Dtls.forEach(item => {
                item.FNewCode = newData.Mst.FCode
              })
              this.savePayList(this.oldDetail, postAddAppvalRecord)
            })
          }
        })
        .catch(err => {
          this.$msgBox.error('保存失败！')
          console.log('save new err', err)
        })
    },
    // 保存支付单接口
    savePayList (data, postAddAppvalRecord) {
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
              postAddAppvalRecord(this.detail.Mst.PhId)
            } else {
              this.$msgBox.show({
                content: '保存成功',
                fn: () => {
                  this.data.openDialog = false
                }
              })
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
    getBudgetAccountsList () {
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
    getAccountList (data, FApproval) {
      BankAccountList(data)
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
          } else {
            // this.account = this.detail.Mst.OrgPhid
            let record = res.Record
            if (FApproval == 0 || FApproval == 2) {
              record = record.filter(i => i.FLifecycle == '1')
            }
            this.accountList = record
            if (record.length == 1 && !this.account) {
              this.account = record[0].PhId
            }
          }
        })
        .catch(err => {
          this.$msgBox.error('获取银行档案列表失败!')
        })
    },
    // 获取到新的银行信息
    getBank (data) {
      this.bankChooseData.data[0].FRecAcntname = data.FBankname
      this.bankChooseData.data[0].FRecAcnt = data.FAccount
      this.bankChooseData.data[0].FRecBankname = data.FOpenAccount
      this.bankChooseData.data[0].FRecBankcode = data.FBankcode
      this.bankChooseData.data[0].FRecCityname = data.FCity
    },
    // 获取支付方式
    GetSysSetList () {
      GetSysSetList({
        DicType: 'PayMethod',
        uid: this.userid,
        orgid: this.detail.Mst.CurOrgId
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
          } else {
            if (
              this.detail.Mst.FApproval == 0 ||
              this.detail.Mst.FApproval == 2
            ) {
              this.FPaymethodList = res.Record.filter(item => {
                return (
                  item.Isactive == 0 || item.PhId == this.detail.Mst.FPaymethod
                )
              })
            } else {
              this.FPaymethodList = res.Record
            }
          }
        })
        .catch(err => {
          console.log('获取支付方式列表失败! ' + err)
          this.$msgBox.error('获取支付方式列表失败!')
        })
    },
    // 支付单 按钮事件
    save (type) {
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
            this.detail.Dtls.some(item => {
              return item.BankPhid == '0'
            })
          ) {
            this.$msgBox.error('请选择付款账户！')
            return
          } else if (!this.detail.Mst.FPaymethod) {
            this.$msgBox.error('请选择支付方式！')
            return
          } else if (
            this.detail.Dtls.some(item => {
              return !item.FRecAcnt
            })
          ) {
            this.$msgBox.error('请完善所有单据收款账户信息！')
            return
          }
          this[type].openDialog = true
          this[type].data = [this.detail]
          break
        case 'payErrorHandleData':
          if (
            this.detail.Dtls.some(item => {
              return !!item.FNewCode
            })
          ) {
            this.$msgBox.error('只能对未重新支付的单据进行处理。')
            return
          }
        case 'mergePayData':
          this[type].openDialog = true
          this[type].data = [this.detail]
          break
        case 'new':
          let errorArr = this.detail.Dtls.filter(item => item.FState == 2)
          if (
            errorArr.some(item => {
              return item.FNewCode
            })
          ) {
            this.$msgBox.error('只能对未生成新的支付单的项目重新支付！')
            return
          }
          this.$msgBox.show({
            content: '将对所有支付异常的明细项目生成新的支付单！',
            fn: () => {
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
                FState: 0,
                FSubmitdate: null
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
              this.oldDetail = this.detail
              this.detail = { Mst, Dtls }
              this.allSelected = false
              this.reSetting = true
            }
          })
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
    selectFSamebankFocus () {
      if (this.detail.Dtls.every(item => item.choosed == false)) {
        this.$refs.selectFSamebank.blur()
        this.$msgBox.show('请先选择要设置的项目。')
      }
    },
    selectFSamebankBlur (visible) {
      if (this.bankType !== '' && !visible) {
        this.detail.Dtls.forEach(item => {
          if (item.choosed) {
            item.FSamebank = this.bankType
          }
        })
      }
    },
    // checkBox所在框选中
    check (e) { },
    headerClick (column, event) {
      if (!column.property) {
        this.allSelected = !this.allSelected
        this.selectAll(this.allSelected)
      }
    },
    rowClick (row, column, event) {
      if (column && !column.property) {
        row.choosed = !row.choosed
        this.selectOne({ row })
      }
    },
    //打开图片预览
    showImg (file) {
      this.imgDialog = true
    },
    // 表格合并方法
    tabelColspan ({ row, column, rowIndex, columnIndex }) {
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
    closeAuditFollow () {
      this.showAuditfollow = false
    },
    // 关闭支付单弹框
    payListClose (done) {
      if (this.reSetting) {
        this.reSetting = false
        this.detail = this.oldDetail
        this.allSelected = this.detail.Dtls.every(item => item.choosed)
      } else {
        done()
      }
    },
    // dialog中的check事件
    selectOne ($scope) {
      if ($scope.row.choosed) {
        this.allSelected = this.detail.Dtls.every(item => item.choosed)
      } else {
        this.allSelected = false
      }
      this.$forceUpdate()
    },
    selectAll (choosed) {
      this.detail.Dtls.forEach(item => {
        item.choosed = choosed
      })
      this.$forceUpdate()
    },
    //  选择银行
    selectBank (item) {
      this.bankChooseData.openDialog = true
      this.bankChooseData.data = item.choosed
        ? this.detail.Dtls.filter(i => i.choosed)
        : [item]
    },
    // 跳转子支付单
    goNewPayList (row, index) {
      console.log(row, index)
      let phid = row.FNewCodesMstPhid.split(',')[index]
      this.boy.data[0].Mst.PhId = phid
      this.boy.openDialog = true
    }
  },
  mounted () {
    this.allSelected = false
    this.detail.Mst.PhId = this.data.data[0].Mst.PhId
    this.getData()
  },
  computed: {
    ...mapState({
      menubutton: state => state.user.menubutton,
      orgid: state => state.user.orgid,
      userid: state => state.user.userid,
      year: state => state.user.year,
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
    .el-select {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: inline-block;
      vertical-align: middle;
      .el-input {
        display: inline-block;
        vertical-align: middle;
      }
      &:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }
    .atype {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: inline-block;
      padding: 0 10px;
      > span {
        display: inline-block;
        vertical-align: middle;
        text-decoration: underline;
      }
      &:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }
  }
  &.payList .bottom {
    font-size: 0.18rem;
    padding-left: 20px;
    overflow: hidden;
    text-align: left;
    span {
      cursor: pointer;
      margin-right: 20px;
      position: relative;
      padding-left: 0.3rem;
      text-decoration: underline;
      &::before {
        content: "";
        display: inline-block;
        background-image: url("../../assets/images/yk1.png");
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
        text-decoration: none;
        &::before {
          background-image: url("../../assets/images/wzf.png");
        }
        &.success::before {
          background-image: url("../../assets/images/zfcg.png");
        }
      }
      &:last-of-type {
        float: right;
        &::before {
          background: none;
        }
      }
    }
  }
  .pay-card {
    margin: 0 14px;
    > div {
      border-bottom: 1px solid rgb(154, 206, 251);
      text-align: left;
      font-size: 0.2rem;
      margin: 14px 0;
      padding-top: 4px;
      padding-bottom: 7px;
      color: #3294e8;
      & ~ ul > li {
        width: 100%;
        padding-left: 125px;
        overflow: hidden;
        line-height: 40px;
        text-align: left;
        &.my-10 {
          margin: 10px 0;
        }
        > span {
          float: left;
          margin-left: -100px;
          letter-spacing: 3px;
        }
        > div {
          border-bottom: 1px solid #9acefb;
          float: left;
          width: 100%;
          padding-left: 10px;
          min-height: 40px;
          .payTooltip {
            width: 100%;
          }
        }
      }
    }
  }
}
.content.printcontent {
  opacity: 0;
}
@media print {
  .printcontent.content {
    width: 100%;
    padding: 20px;
    opacity: 1;
    box-sizing: border-box;
    table {
      width: 100%;
      margin: 20px 0;
      /* page-break-after: always;*/
      td {
        border-collapse: collapse;
        border-spacing: 0;
        height: 40px;
        border: 1px solid #eaeaea;
        padding: 5px;
        text-align: center;
      }
      .tbTitle {
        color: #3294e8;
      }
      .secondTitle {
        background-color: #3294e8;
        color: #fff;
      }
      .left {
        text-align: left;
      }
      .right {
        text-align: right;
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
    .el-table .cell {
      // position: relative;
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
    tr.el-table__row td:not([rowspan="1"]) {
      .table-item {
        position: relative;
        > p {
          margin-top: -24px;
          position: absolute;
          width: 100%;
          left: 0;
          right: 0;
          top: 50%;
        }
      }
    }
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
  .getDetail {
    background-color: #fff;
    border-radius: 10px;
    .el-select {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: inline-block;
      vertical-align: middle;
      > .el-input {
        display: inline-block;
        vertical-align: middle;
      }
      &:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }
    .el-input {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: inline-block;
      vertical-align: middle;
      > .el-input__inner {
        display: inline-block;
        vertical-align: middle;
        border: 0;
      }
      &:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }
  }
}
.payList-largeSelects.el-popper .el-select-dropdown__item {
  font-size: 0.14rem;
}
p.payTooltip.el-tooltip {
  max-width: 300px;
}
.payText .el-card__header {
  background-color: #3294e8;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}
</style>
