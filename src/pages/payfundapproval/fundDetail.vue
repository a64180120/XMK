<template>
  <section>
    <el-dialog modal-append-to-body
               append-to-body
               :visible.sync="openDialog"
               width="94%"
               class="dialog"
               :close-on-click-modal="false">
      <div slot="title"
           class="dialog-title">
        <span style="float: left">查看</span>
      </div>
      <div class="dialog-content">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="top-btn">
              <el-button class="btn"
                         size="mini"
                         @click="approval()">审批</el-button>
              <el-button class="btn"
                         size="mini">取消审批</el-button>
              <el-button class="btn"
                         size="mini">打印</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="content"
                :gutter="10">
          <el-col :span="5">
            <div class="left-card">
              <i class="el-icon-edit-outline"></i>
              <span>待审核</span>
              <div>
                <!--申报信息-->
                <div class="apply-info">
                  <span class="title">附件</span>
                  <div class="appendix-item"
                       v-for="(item,idx) in projectItem">
                    <span class="title"><i class="el-icon-s-order"></i>{{item.projectName}}</span>
                    <ul>
                      <li v-for="(folder,idx) in item.projectFolder">{{folder}}</li>
                    </ul>
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
              <div class="top">
                <ul>
                  <li>申报单位/部门：{{data.applyDepart}}</li>
                  <li>申报部门：{{data.applyDate}}</li>
                  <li>单位：元</li>
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
                        <td>申报单号</td>
                        <td>{{data.applyCode}}</td>
                      </tr>
                      <tr>
                        <td>申报单位名称</td>
                        <td>{{data.applyDepart}}</td>
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
                        <td>申报说明</td>
                        <td></td>
                        <td>申报金额合计</td>
                        <td>{{data.applyAmount}}</td>
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
                        <td>申报拨付明细</td>
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
                        <td>项目编码</td>
                        <td>项目名称</td>
                        <td>补助单位/部门</td>
                        <td>明细项目名称</td>
                        <td>申报金额</td>
                        <td>备注</td>
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
                      <tr v-for="i in 6">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--内层弹框-->
      <approval-dialog ref="approvalDialog"
                       :inner="true"></approval-dialog>
    </el-dialog>
  </section>
</template>

<script>
import ApprovalDialog from "./approvalDialog";
export default {
  name: "fundDetail",
  components: { ApprovalDialog },
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: {}
      }
    }
  },
  data () {
    return {
      openDialog: false,

      projectItem: [{
        projectName: 'XXXXX项目A',
        projectFolder: ['附件1', '附件2', '附件3', '附件4']
      }, {
        projectName: 'XXXXX项目B',
        projectFolder: ['附件1', '附件2', '附件3', '附件4']
      }]
    }
  },
  mounted () {

  },
  methods: {
    changeDialog () {
      this.openDialog = true
    },
    approval () {
      this.$emit('detailBtn', 'approvl', this.data)
    },
    payList () {
      this.$emit('detailBtn', 'payList', this.data)
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
  height: auto;
  padding: 20px 0 0 0;
}

.left-card {
  background-color: #00b8ee;
  height: auto;
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
    height: auto;
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
            text-align: left;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}

.detail-table {
  height: auto;
  overflow: auto;
  width: 100%;

  > .title {
    > span {
      font-size: 0.2rem;
    }
  }

  > .top {
    > ul {
      list-style: none;
      float: left;
      width: 100%;

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
              height: auto;
              min-height: 30px;
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
</style>
<style scoped>
.dialog >>> .el-dialog {
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  height: auto;
  display: flex;
  flex-direction: column;
}
.top-btn {
  float: right;
}

.dialog-content {
  height: auto;
}
</style>
