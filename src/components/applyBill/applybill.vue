<template>
  <section>
    <div class="dialog-content">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="top-btn">
            <slot name="btn-group">
              <el-button
                class="btn"
                size="mini"
                style="padding: 0;"
                @click="creatApply"
                :disabled="!(record.PaymentMst.FApproval==0&&approvalDataS.subData.length==0)"
              >生成支付单</el-button>
              <el-button
                class="btn"
                size="mini"
                @click="postApply"
                :disabled="!(record.PaymentMst.FApproval==0||record.PaymentMst.FApproval==2)"
              >送审</el-button>
              <el-button
                class="btn"
                size="mini"
                @click="deleteApply"
                :disabled="!(record.PaymentMst.FApproval==0||record.PaymentMst.FApproval==2)"
              >删除</el-button>
              <!--<el-button class="btn" size="mini" @click="checkApply">审批</el-button>
              <el-button class="btn" size="mini" @click="cancelApply">取消审批</el-button>-->
              <el-button class="btn" size="mini">打印</el-button>
            </slot>
          </div>
        </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <el-col :span="5">
          <div class="left-card">
            <i class="el-icon-edit-outline"></i>
            <span>{{approvalType[record.PaymentMst.FApproval]}}</span>
            <div>
              <!--申请信息-->
              <div class="apply-info">
                <span class="title">附件</span>
                <!--<div class="appendix-item" v-for="(item,idx) in projectItem">
                  <span class="title"><i class="el-icon-s-order"></i>{{item.projectName}}</span>
                  <ul>
                    <li  v-for="(folder,idx) in item.projectFolder" @click="clickFolder(folder)">{{folder}}</li>
                  </ul>
                </div>-->
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="detail-table">
            <div class="title">
              <span>资金拨付申请单</span>
            </div>
            <div class="top">
              <ul>
                <li>
                  <span style="color: #3294e8;">申报单位/部门：</span>
                  {{record.PaymentMst.FDepname}}
                </li>
                <li>
                  <span style="color: #3294e8;">申报日期：</span>
                  {{record.PaymentMst.FDate.substring(0,10)}}
                </li>
                <li>
                  <span style="color: #3294e8;">申报金额：</span>
                  {{record.PaymentMst.FAmountTotal | NumFormat}}元
                </li>
              </ul>
            </div>
            <div class="content">
              <div class="top-tbody">
                <table>
                  <colgroup>
                    <col width="16%">
                    <col width="84%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style="color: #3294e8;">申请单号</td>
                      <td>{{record.PaymentMst.FCode}}</td>
                    </tr>
                    <tr>
                      <td style="color: #3294e8;">申请单位名称</td>
                      <td>{{record.PaymentMst.FOrgname+'-'+record.PaymentMst.FDepname}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="top-total">
                <table>
                  <colgroup>
                    <col width="16%">
                    <col width="44%">
                    <col width="20%">
                    <col width="20%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style="color: #3294e8;">申请说明</td>
                      <td>{{record.PaymentMst.FDescribe}}</td>
                      <td style="color: #3294e8;">申请金额合计</td>
                      <td>{{record.PaymentMst.FAmountTotal | NumFormat}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="title">
                <table>
                  <colgroup>
                    <col width="84%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style="background-color: #3294e86b">申请拨付明细</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="bottom-thead">
                <table>
                  <colgroup>
                    <col width="16%">
                    <col width="16%">
                    <col width="16%">
                    <col width="20%">
                    <col width="16%">
                    <col width="16%">
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style="color: #3294e8;">项目编码</td>
                      <td style="color: #3294e8;">项目名称</td>
                      <td style="color: #3294e8;">补助单位/部门</td>
                      <td style="color: #3294e8;">明细项目名称</td>
                      <td style="color: #3294e8;">申请金额</td>
                      <td style="color: #3294e8;">备注</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="bottom-tbody">
                <table>
                  <colgroup>
                    <col width="16%">
                    <col width="16%">
                    <col width="16%">
                    <col width="20%">
                    <col width="16%">
                    <col width="16%">
                  </colgroup>
                  <tbody>
                    <template v-for="(item) in record.PaymentXmDtl" v-if="record.PaymentXmDtl">
                      <tr v-for="(xm,idx) in item.PaymentDtls" v-if="item.PaymentDtls">
                        <td
                          :rowspan="item.PaymentDtls.length"
                          v-if="idx%3==0"
                        >{{item.PaymentXm.XmProjcode}}</td>
                        <td
                          :rowspan="item.PaymentDtls.length"
                          v-if="idx%3==0"
                        >{{item.PaymentXm.XmProjname}}</td>
                        <td>{{xm.FDepartmentname}}</td>
                        <td>{{xm.BudgetdtlName}}</td>
                        <td style="text-align: right">{{xm.FAmount | NumFormat}}</td>
                        <td>{{xm.FRemarks}}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--送审-->
    <go-approval :data="approvalDataS" @delete="handleDelete"></go-approval>
    <!--生成支付单-->
    <approval-dialog
      ref="approvalDialog"
      :title="appDialog.title"
      :btn-group="appDialog.btnGroup"
      :data="approvalData"
    ></approval-dialog>
    <!--附件查看-->
    <el-dialog
      class="dialog img-dialog"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="50%"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">查看附件</span>
      </div>
      <!--<div class="btn-load">
        <el-button class="btn">下载</el-button>
      </div>-->
      <img-view v-if="dialogVisible"></img-view>
    </el-dialog>
  </section>

  <!--内层弹框-->
</template>

<script>
import ApprovalDialog from '../../pages/payfundapproval/approvalDialog'
import goApproval from '../applyPro/goApproval.vue'
import ImgView from '../imgView/imgView'
export default {
  name: 'applybill',
  components: { ApprovalDialog, goApproval, ImgView },
  props: {
    applyNum: {
      type: String,
      default: ''
    },
    subData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
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
      dialogVisible: false //附件查看弹窗
    }
  },
  /*watch:{
        applyNum(val){
          this.getApply();
          this.approvalDataS.data=[val]
        },
        subData:{
          handler(val) {
            this.approvalDataS.subData=val;
          }
        }
      },*/
  mounted() {
    this.getApply()
    this.approvalDataS.data = [this.applyNum]
    this.approvalDataS.subData = this.subData
  },
  methods: {
    //申请单查看
    getApply: function() {
      let param = { fPhId: this.applyNum }
      this.getAxios('GBK/PaymentMstApi/GetPaymentMst', param)
        .then(res => {
          this.record = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    //生成支付单
    creatApply: function() {
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
        .catch(() => {})
    },
    /*生成多条支付单  （post  ,  GSP ）
        /GAppvalRecord/PostAddPayMents
        参数：
        RefbillPhidList: ['10'], （单据主键集合）
        * */
    postBill: function() {
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
    postApply: function() {
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
          .catch(() => {})
      } else {
        this.approvalDataS.openDialog = true
      }
    },
    //删除
    deleteApply: function() {
      this.$confirm('此操作将永久删除该申请，是否继续？', '提示', {
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
        .catch(() => {})
    },
    //打印
    printApply: function() {
      console.log(this.applyNum + '这里添加数据查询方法')
    },

    //点击文件列表
    clickFolder(file) {
      //this.$emit('showImg',file)
      this.dialogVisible = true
    },
    //关闭送审弹窗
    handleDelete: function(val) {
      if (val.flag) {
        this.approvalDataS.openDialog = false
        this.$emit('delete', { flag: true, type: 'applyBill' })
      }
    }
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
  min-height: 470px;
  padding: 20px 0 0 0;
  height: 100%;
}

.left-card {
  background-color: $btnColor;
  height: 200px;
  max-width: 100%;
  border-radius: 8px;
  position: relative;
  padding: 7%;

  > i {
    font-size: 0.2rem;
    color: #91bff8;
  }

  > span {
    font-size: 0.2rem;
    font-family: 宋体;
    color: #ffff00;
    text-decoration: underline;
  }

  > div {
    background-color: #ffffff;
    position: absolute;
    width: 86%;
    height: 350px;
    border-radius: 8px;
    box-shadow: 0px 2px 10px #888888;
    margin-top: 20px;
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
            color: #3294e8;
            text-align: left;
            margin-bottom: 5px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

.detail-table {
  min-height: 650px;
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
    > ul {
      margin: 8px 1%;
      list-style: none;
      float: left;
      width: 98%;

      > li {
        width: 33%;
        display: inline-block;
      }

      > li:first-child {
        text-align: left;
      }

      > li:last-child {
        text-align: right;
      }
    }
  }

  > .content {
    width: 98%;
    margin-left: 1%;
    > .top-tbody {
      > table {
        border: 1px solid #eaeaea;
        width: 100%;
        > tbody {
          > tr {
            > td {
              border: 1px solid #eaeaea;
              height: 30px;
            }
          }
        }
      }
    }
    > .top-total {
      > table {
        border: 1px solid #eaeaea;
        border-top: none;
        border-bottom: none;
        width: 100%;
        > tbody {
          > tr {
            > td {
              border: 1px solid #eaeaea;
              height: 100px;
              border-top: none;
              /*border-bottom: none;*/
            }
          }
        }
      }
    }
    > .title {
      > table {
        border: 1px solid #eaeaea;
        border-top: none;
        border-bottom: none;
        width: 100%;
        > tbody {
          > tr {
            > td {
              border: 1px solid #eaeaea;
              height: 30px;
              border-top: none;
              /*border-bottom: none;*/
            }
          }
        }
      }
    }
    > .bottom-thead {
      > table {
        border: 1px solid #eaeaea;
        border-top: none;
        border-bottom: none;
        width: 100%;
        > tbody {
          > tr {
            > td {
              border: 1px solid #eaeaea;
              height: 30px;
              border-top: none;
              /*border-bottom: none;*/
            }
          }
        }
      }
    }
    > .bottom-tbody {
      > table {
        border: 1px solid #eaeaea;
        border-top: none;
        border-bottom: none;
        width: 100%;
        > tbody {
          > tr {
            > td {
              border: 1px solid #eaeaea;
              height: 30px;
              border-top: none;
              /*border-bottom: none;*/
            }
          }
        }
      }
    }
  }
}
.top-btn {
  text-align: right;
}
</style>
<style>
#delDialog .el-dialog__body {
  height: 550px;
}
#delDialog .el-dialog__footer {
  text-align: center;
}
</style>
