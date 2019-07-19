<template>
  <!-- <el-dialog append-to-body :visible="true" width="1000px" :close-on-click-modal="false">
    <tb-data></tb-data>
  </el-dialog>-->
  <section class="item-print">
    <div slot="title" class="dialog-title">
      <span style="float: left">申报表打印</span>
    </div>
    <el-row>
      <el-col :span="24" style="margin-top:10px;margin-bottom: 10px">
        <slot name="btn">
          <div class="top-btn">
            <el-button class="btn" size="mini">取消</el-button>
            <el-button class="btn" size="mini">打印</el-button>
          </div>
        </slot>
      </el-col>
    </el-row>
    <div class="printContent">
      <h2>广东省总工会预立项项目申报表</h2>
      <h2 style="text-align:right;">单据号： 201900000201</h2>
      <div class="content">
        <div class="list">
          <div class="tableBody">
            <table>
              <colgroup>
                <col width="18%" />
                <col width="6%" />
                <col width="10%" />
                <col width="10%" />
                <col width="11%" />
                <col width="9%" />
                <col width="9%" />
                <col width="18%" />
              </colgroup>
              <tbody>
                <tr>
                  <td>申报部门</td>
                  <td colspan="2">{{'广东深公会啊'}}</td>
                  <td>申报日期</td>
                  <td colspan="2">123</td>
                  <td>填表人</td>
                  <td>123</td>
                </tr>
                <tr>
                  <td>项目名称</td>
                  <td colspan="5">{{'广东testtttttttttt'}}</td>
                  <td>项目编码</td>
                  <td>123</td>
                </tr>
                <tr>
                  <td>项目属性</td>
                  <td colspan="7">{{'广东testtttttttttt'}}</td>
                </tr>
                <!-- 项目预算明细行 -->
                <tr>
                  <td rowspan="3">项目预算明细</td>
                  <td>序号</td>
                  <td colspan="2">明细项目名称</td>
                  <td>金额</td>
                  <td>支付方式</td>
                  <td colspan="2">测算过程或其他需要说明的事项</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td class="tltd" colspan="2">明细项目名称1111</td>
                  <td class="trtd">{{123 | NumFormat}}</td>
                  <td class="tltd">支付方式1</td>
                  <td
                    colspan="2"
                  >测算过程或其他需要说明的事项测算过程或其他需要说明的事项测算过程或其他需要说明的事项测算过程或其他需要说明的事项测算过程或其他需要说明的事项测算过程或其他需要说明的事项测算过程或其他需要说明的事项测算过程或其他需要说明的事项测算过程或其他需要说明的事项</td>
                </tr>
                <tr>
                  <td colspan="3">合计</td>
                  <td class="trtd">{{123 | NumFormat}}</td>
                  <td></td>
                  <td colspan="2"></td>
                </tr>
                <!-- 项目资金申请行 -->
                <tr>
                  <td rowspan="2">项目资金申请(万元)</td>
                  <td>1</td>
                  <td class="tltd" colspan="5">胜总预算拨款</td>
                  <td class="trtd">{{123 | NumFormat}}</td>
                </tr>
                <tr>
                  <td colspan="6">资金总额</td>
                  <td class="trtd">{{123 | NumFormat}}</td>
                </tr>
                <!-- 项目实施进度计划 -->
                <tr>
                  <td rowspan="2">项目实施进度计划</td>
                  <td colspan="4">项目实施内容</td>
                  <td colspan="2">开始时间</td>
                  <td colspan="1">完成时间</td>
                </tr>
                <tr>
                  <td class="tltd" colspan="4">工会经费发放</td>
                  <td colspan="2">2019/1/1</td>
                  <td colspan="1">2019/2/1</td>
                </tr>
                <!-- 绩效目标 -->
                <tr>
                  <td rowspan="2">绩效目标</td>
                  <td colspan="4">年度目标</td>
                  <td colspan="3">长期目标</td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    class="tltd"
                  >年度目标内容年度目标内容年度目标内容年度目标内容年度目标内容年度目标内容年度目标内容年度目标内容年度目标内容年度目标内容年度目标内容年度目标内容</td>
                  <td class="tltd" colspan="3">长期目标长期目标长期目标长期目标长期目标长期目标长期目标长期目标长期目标长期目标长期目标</td>
                </tr>
                <!-- 部门领导意见 -->
                <tr>
                  <td>部门领导意见</td>
                  <td colspan="4" class="tltd">同意</td>
                  <td class="tltd">部门分管领导意见</td>
                  <td colspan="2" class="tltd">停用</td>
                </tr>
                <!-- 预算编审小组意见 -->
                <tr>
                  <td>预算编审小组意见</td>
                  <td>会议时间</td>
                  <td colspan="3" class="tltd">20119/1/1</td>
                  <td class="tltd">会议纪要编号</td>
                  <td colspan="2" class="tltd">110</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'itemPrint',

  data() {
    return {
      checkAll: false,
      checkedList: [],
      list: [
        0,
        '与行业协会合作共同展开全面与行业协会合作共同展开全面....',
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      isIndeterminate: false
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedList = val ? this.list : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
    }
  }
}
</script>
<style lang="scss" scoped>
.item-print {
  .dialog-title {
    overflow: hidden;
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
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
  .printContent {
    h2 {
      margin-bottom: 10px;
    }
    .content {
      height: 350px;
      position: relative;
      .list {
        color: #333;
        position: absolute;
        bottom: 0;
        top: 0;
        left: 10px;
        right: 10px;
        overflow: hidden;
        .tableHead {
          th {
            color: #fff;
            height: 48px;
            border-right: 1px solid #fff;
            background: $btnColor;
          }
        }
        .tableBody {
          top: 0;
          bottom: 10px;
          table {
            border: 1px solid $borderColor_ccc;
          }
          td {
            border-radius: 0;
            border-bottom: 1px solid $borderColor_ccc;
            border-left-color: $borderColor_ccc;
            line-height: 24px;
            word-break: break-all;
            white-space: normal;
          }
          .trtd {
            text-align: right;
          }
          .tltd {
            text-align: left;
          }
        }
        .tableBody table tr {
          box-shadow: none;
        }
      }
    }
  }

  .bottom-btn {
    margin-top: 10px;
    text-align: right;
    .btn {
      margin-right: 15px;
    }
  }
}
</style>
<style lang="scss">
.item-print {
  .el-checkbox-group {
    font-size: 0.14rem;
  }
  th .el-checkbox__label {
    color: #fff !important;
  }
  td .el-checkbox__label {
    color: #333 !important;
  }
}
</style>
