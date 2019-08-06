<template>
  <section>
    <div class="dialog-content">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="top-btn">
            <slot name="btn-group">
              <el-button v-if="applyBillType!=1&&menu['fund_createpay']"
                         class="btn"
                         size="mini"
                         style="padding: 0;"
                         @click="creatApply"
                         :disabled="!(record.PaymentMst.FApproval==0&&approvalDataS.subData.length==0)">生成支付单</el-button>
              <el-button v-if="applyBillType!=1&&menu['fund_check']"
                         class="btn"
                         size="mini"
                         @click="postApply"
                         :disabled="!(record.PaymentMst.FApproval==0||record.PaymentMst.FApproval==2)">送审</el-button>
              <el-button v-if="menu['fund_delete']"
                         class="btn"
                         size="mini"
                         @click="deleteApply"
                         :disabled="!(record.PaymentMst.FApproval==0||record.PaymentMst.FApproval==2)">删除</el-button>
              <!--<el-button class="btn" size="mini" @click="checkApply">审批</el-button>
              <el-button class="btn" size="mini" @click="cancelApply">取消审批</el-button>-->
              <el-button class="btn"
                         size="mini"
                         @click="printTable">打印</el-button>
            </slot>
          </div>
        </el-col>
      </el-row>
      <el-row class="content"
              :gutter="10">
        <el-col :span="5">
          <div class="left-card">
            <div>
              <p class="left-card_title"
                 @click="openAuditfollow">
                <span>
                  <i class="el-icon-edit-outline"></i>
                  <span>{{approvalType[record.PaymentMst.FApproval]}}</span>
                </span>

              </p>
              <p class="left-card_title">
                <span>
                  <i class="el-icon-coin"></i>
                  <span style="color: #fff;text-decoration: none">{{record.PaymentMst.FApproval==9?payTypeList[record.PaymentMst.IsPay]:'-'}}</span>
                </span>
              </p>
            </div>

            <div>
              <!--申报信息-->
              <div class="apply-info">
                <span class="title">附件</span>
                <div class="appendix-item"
                     v-for="(item,idx) in record.PaymentXmDtl">
                  <span class="title">
                    <i class="el-icon-s-order"></i>
                    {{item.PaymentXm.XmProjname}}
                  </span>
                  <ul v-if="item.QtAttachments&&item.QtAttachments.length>0">
                    <li v-for="(folder,idx) in item.QtAttachments"
                        v-if="folder.BUrlpath"
                        @click="clickFolder(folder,idx)"
                        :title="folder.BName">{{folder.BName}}</li>
                  </ul>
                  <p v-else>无附件</p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="detail-table">
            <div class="title">
              <span>资金拨付申报单</span>
            </div>
            <div class="content"
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
                    {{record.PaymentMst.FDepname}}
                  </td>
                  <td colspan="2"
                      style="border: 0;">
                    <span style="color: #3294e8;">申报日期：</span>
                    {{(record.PaymentMst.FDate.substring(0,19)).replace('T',' ')}}
                  </td>
                  <td colspan="2"
                      class="right"
                      style="border: 0;">
                    <span style="color: #3294e8;">申报金额（元）：</span>
                    {{record.PaymentMst.FAmountTotal | NumFormat}}
                  </td>
                </tr>
                <tr>
                  <td colspan="1"
                      class="tbTitle"
                      style="letter-spacing: 9px;padding-left: 14px;">申报单号</td>
                  <td colspan="5">{{record.PaymentMst.FCode}}</td>
                </tr>
                <tr>
                  <td colspan="1"
                      class="tbTitle">申报单位名称</td>
                  <td colspan="5">{{record.PaymentMst.FOrgname+'-'+record.PaymentMst.FDepname}}</td>
                </tr>
                <tr>
                  <td colspan="1"
                      class="tbTitle"
                      style="letter-spacing: 9px;padding-left: 14px;">申报说明</td>
                  <td colspan="3">{{record.PaymentMst.FDescribe}}</td>
                  <td class="tbTitle">申报金额合计(元)</td>
                  <td class="right">{{record.PaymentMst.FAmountTotal | NumFormat}}</td>
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
                <tr v-for="(item,index) in auditMsg">

                  <td>{{item.OperaName}}</td>
                  <td>{{item.FOpinion}}</td>
                  <td>{{item.FDate}}</td>
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
                <template v-for="(item) in record.PaymentXmDtl"
                          v-if="record.PaymentXmDtl">
                  <tr v-for="(xm,idx) in item.PaymentDtls"
                      v-if="item.PaymentDtls">
                    <td class="left"
                        :rowspan="item.PaymentDtls.length"
                        v-if="idx%item.PaymentDtls.length==0">{{item.PaymentXm.XmProjcode}}</td>
                    <td class="left"
                        :rowspan="item.PaymentDtls.length"
                        v-if="idx%item.PaymentDtls.length==0">{{item.PaymentXm.XmProjname}}</td>
                    <td class="left">{{xm.FDepartmentname}}</td>
                    <td class="left">{{xm.BudgetdtlName}}</td>
                    <td class="right">{{xm.FAmount | NumFormat}}</td>
                    <td class="left">{{xm.FRemarks}}</td>
                  </tr>
                </template>
              </table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--送审-->
    <go-approval v-if="approvalDataS.openDialog"
                 :data="approvalDataS"
                 @delete="handleDelete"></go-approval>
    <!--生成支付单-->
    <approval-dialog ref="approvalDialog"
                     :title="appDialog.title"
                     :btn-group="appDialog.btnGroup"
                     :data="approvalData"></approval-dialog>
    <!--附件查看-->
    <el-dialog class="dialog img-dialog"
               :visible.sync="dialogVisible"
               modal-append-to-body
               :append-to-body="true"
               :close-on-click-modal="true"
               width="800px">
      <div slot="title"
           class="dialog-title">
        <span style="float: left">查看附件</span>
      </div>
      <!--<div class="btn-load">
        <el-button class="btn">下载</el-button>
      </div>-->
      <img-view v-if="dialogVisible"
                :images="imgList"
                :nowIdx="activeIdx"></img-view>
    </el-dialog>
    <auditfollow :visible.sync="visible"
                 :auditMsg="auditMsg"></auditfollow>
  </section>

  <!--内层弹框-->
</template>

<script>
import ApprovalDialog from '../../pages/payfundapproval/approvalDialog'
import goApproval from '../applyPro/goApproval.vue'
import ImgView from '../imgView/imgView'
import { baseURL } from '@/utils/config.js'
import Auditfollow from "../../components/auditFollow/auditfollow";
import { mapState } from 'vuex'
export default {
  name: 'applybill',
  components: { ApprovalDialog, goApproval, ImgView, Auditfollow },
  props: {
    applyNum: {
      type: String,
      default: ''
    },
    applyBillType: Number,
    subData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      visible: false,
      auditMsg: [],
      record: {
        PaymentMst: {
          FDepname: '',
          FDate: '',
          FAmountTotal: '',
          FCode: '',
          FOrgname: '',
          FDescribe: ''
        },
        PaymentXmDtl: [
          {
            PaymentDtls: {
              PhId: '',
              BudgetdtlName: '',
              FDepartmentname: '',
              FAmount: '',
              FPayment: ''
            },
            PaymentXm: {
              XmProjcode: '',
              XmProjname: ''
            }
          }
        ]
      },
      approvalType: { 0: '待送审', 1: '审批中', 2: '未通过', 9: '审批通过' },
      payTypeList: { '0': '待支付', '1': '支付异常', '2': '支付中', '9': '支付成功' },
      //生成支付单
      appDialog: {
        title: '',
        btnGroup: {
          cancelName: '',
          onfirmName: ''
        }
      },
      approvalData: {},
      //送审
      approvalDataS: {
        openDialog: false,
        data: [],
        subData: []
      },
      timeF: '',
      dialogVisible: false, //附件查看弹窗
      imgList: [], //附件数组
      activeIdx: 0
    }
  },
  computed: {
    ...mapState({
      orgid: state => state.user.orgid, //id
      menu: state => state.user.menubutton //权限按钮
    })
  },

  mounted () {
    this.getApply()
    this.approvalDataS.data = [this.applyNum];
    this.approvalDataS.subData = this.subData;

  },
  methods: {
    /*打印*/
    printTable: function () {
      let printArea = this.$refs.printArea.cloneNode(true);
      printArea.childNodes[2].style.display = 'table';
      let title = document.createElement("h2");
      title.innerText = '资金拨付申报单';
      title.style.width = '100%';
      title.style.textAlign = 'center';
      printArea.insertBefore(title, printArea.firstChild);
      this.$print(printArea);
    },
    //申报单查看
    getApply: function () {
      let param = { fPhId: this.applyNum, orgid: this.orgid }
      this.getAxios('GBK/PaymentMstApi/GetPaymentMst', param)
        .then(res => {
          this.record = res
          this.imgList = []
          for (var i in res.PaymentXmDtl) {
            let pxd = res.PaymentXmDtl[i]
            for (var j in pxd.QtAttachments) {
              let img = {
                path: baseURL.replace('/api', '') + pxd.QtAttachments[j].BUrlpath,
                name: pxd.QtAttachments[j].BName
              }
              this.imgList.push(img)
            }
          }
          //这里进行审批流获取，用作审批流查看以及打印使用
          this.getAuditfollow();
        })
        .catch(err => {
          console.log(err)
        })
    },
    //生成支付单
    creatApply: function () {
      this.$confirm(
        '合计支付' +
        this.record.PaymentMst.FAmountTotal +
        '元，确定生成支付单？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelBtnText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.postBill()
        })
        .catch(() => { })
    },
    /*生成多条支付单  （post  ,  GSP ）
      /GAppvalRecord/PostAddPayMents
      参数：
      RefbillPhidList: ['10'], （单据主键集合）
      * */
    postBill: function () {
      let param = { RefbillPhidList: [this.applyNum] }
      this.postAxios('GSP//GAppvalRecord/PostAddPayMents', param)
        .then(res => {
          console.log(res)
          if (res.Status == 'success') {
            this.$msgBox.show({
              content: '生成支付单成功。',
              fn: () => {
                this.approvalDataS.openDialog = false
                this.$emit('delete', { flag: true, type: 'applyBill' })
              }
            })
          } else {
            this.$msgBox.show({
              content: '生成支付单失败，请稍后重试。'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //送审
    postApply: function () {
      if (this.approvalDataS.subData.length == 0) {
        this.$confirm(
          '当前部门未创建审批流，无法送审。是否直接生成支付单？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelBtnText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.creatApply()
          })
          .catch(() => { })
      } else {
        this.approvalDataS.openDialog = true
      }
    },
    //删除
    deleteApply: function () {
      this.$confirm('此操作将永久删除该申报，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelBtnText: '取消',
        type: 'warning'
      })
        .then(() => {
          let param = {
            fPhIdList: [this.applyNum]
          }
          this.postAxios('GBK/PaymentMstApi/PostDelete', param)
            .then(res => {
              if (res.Status == 'success') {
                this.$msgBox.show({
                  content: '删除成功。',
                  fn: () => {
                    this.approvalDataS.openDialog = false
                    this.$emit('delete', { flag: true, type: 'applyBill' })
                  }
                })
              } else {
                this.$msgBox.show({
                  content: '删除失败，请稍后重试。'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => { })
    },
    //打印
    printApply: function () {
      console.log(this.applyNum + '这里添加数据查询方法')
    },

    //点击文件列表
    clickFolder (file, idx) {
      //this.$emit('showImg',file)
      this.dialogVisible = true
      this.activeIdx = idx
      console.log(this.activeIdx)
    },
    //关闭送审弹窗
    handleDelete: function (val) {
      if (val.flag) {
        this.approvalDataS.openDialog = false
        this.$emit('delete', { flag: true, type: 'applyBill' })
      }
    },
    openAuditfollow () {
      if (this.record.PaymentMst.FApproval == 0) {
        this.visible = false;
        this.$confirm('当前项目未送审，无法查看审批流。是否送审？', '提示', {
          confirmButtonText: '确定',
          cancelBtnText: '取消',
          type: 'warning'
        }).then(() => {
          this.postApply();
        }).catch(() => { })
      } else {
        /*审批流查看*/
        this.visible = true;
      }

    },
    //拉取审批流数据查看  也为打印做准备
    getAuditfollow () {
      //判断是否已送审，未送审则取消审批流获取
      if (this.record.PaymentMst.FApproval == 0) {
        return;
      } else {
        let data = {
          RefbillPhid: this.applyNum,
          FBilltype: '001' //单据类型（"001":资金拨付单,"002":支付单）
        }
        this.getAxios("GSP/GAppvalRecord/GetAppvalRecordList", data).then(res => {
          console.log(res)
          if (res && res.Status === "success") {
            this.auditMsg = res.Data
          } else {
            this.$msgBox.show(res.Msg)
          }
        }).catch(err => {
          this.$msgBox.show("数据获取异常")
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.dialog-title {
  > span {
    width: 100%;
    text-align: left;
    font-size: 0.16rem;
    border-bottom: 1px solid #eaeaea;
  }
}

.content {
  margin-top: 10px;
  height: 100%;
}

.left-card {
  max-width: 100%;
  position: relative;
  > div:nth-of-type(1) {
    padding-top: 20px;
    background-color: $btnColor;
    height: 200px;
    border-radius: 8px;
    > .left-card_title {
      margin-bottom: 10px;
      cursor: pointer;
      > span {
        width: 150px;
        display: inline-block;
        text-align: left;
        > i {
          font-size: 0.2rem;
          color: #fff;
          width: 20px;
        }

        > span {
          font-size: 0.2rem;
          font-family: 宋体;
          color: #ffff00;
          text-decoration: underline;
          display: inline-block;
          width: 100px;
          text-align: center;
        }
      }
    }
  }
  > div:nth-of-type(2) {
    margin-left: 7%;
    background-color: #ffffff;
    position: relative;
    width: 86%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0px 2px 10px #888888;
    top: -110px;
    min-height: 270px;
    margin-right: -15px;
    overflow: auto;

    > .apply-info {
      padding: 8px;

      > .title {
        font-size: 0.2rem;
        font-weight: 800;
        font-family: 宋体;
      }

      > .appendix-item {
        margin-bottom: 15px;
        text-align: left;
        > .title {
          font-size: 0.16rem;

          > i {
            color: red;
          }
        }

        > ul {
          padding: 0 20px;

          > li {
            text-decoration: underline;
            text-indent: 0.1rem;
            color: #3294e8;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        > p {
          text-indent: 0.4rem;
        }
      }
    }
  }
}

.detail-table {
  height: auto;
  overflow: auto;
  width: 100%;
  box-shadow: 0 0 10px #c7c7c7;
  border-radius: 5px;
  padding-bottom: 10px;
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
    > ul {
      margin: 10px 1%;
      list-style: none;
      width: 98%;
      clear: both;
      height: 20px;
      > li {
        width: 33%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        float: left;
      }

      > li:first-child {
        text-align: left;
      }

      > li:last-child {
        text-align: right;
      }
    }
    > :after {
      content: "";
      clear: both;
    }
  }

  > .content {
    width: 98%;
    margin-left: 1%;
    table {
      width: 100%;
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
.top-btn {
  text-align: right;
}
@media print {
  .content {
    width: 100%;
    padding: 20px;
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
<style>
#delDialog .el-dialog__body {
  height: auto;
}
#delDialog .el-dialog__footer {
  text-align: center;
}
</style>
