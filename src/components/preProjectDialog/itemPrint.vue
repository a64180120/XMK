<template>
  <!-- <el-dialog append-to-body :visible="true" width="1000px" :close-on-click-modal="false">
    <tb-data></tb-data>
  </el-dialog>-->
  <section class="item-print">
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
      <h2>{{data.ProjectMst.FProjName}}</h2>
      <h2 style="text-align:right;">单据号： {{data.ProjectMst.PhId}}</h2>
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
                  <td colspan="2">{{data.ProjectMst.FDeclarationDept_EXName}}</td>
                  <td>申报日期</td>
                  <td colspan="2">{{data.ProjectMst.FDateofDeclaration}}</td>
                  <td>填表人</td>
                  <td>{{data.ProjectMst.FDeclarer}}</td>
                </tr>
                <tr>
                  <td>项目名称</td>
                  <td colspan="5">{{data.ProjectMst.FProjName}}</td>
                  <td>项目编码</td>
                  <td>{{data.ProjectMst.FProjCode}}</td>
                </tr>
                <tr>
                  <td>项目属性</td>
                  <td colspan="7">{{data.ProjectMst.FProjAttr}}</td>
                </tr>
                <!-- 项目预算明细行 -->
                <tr>
                  <td v-if="data.ProjectDtlBudgetDtls.length !==0" :rowspan="data.ProjectDtlBudgetDtls.length+2">项目预算明细</td>
                  <td v-if="data.ProjectDtlBudgetDtls.length ===0" :rowspan="1+2">项目预算明细</td>
                  <td>序号</td>
                  <td colspan="2">明细项目名称</td>
                  <td>金额(元)</td>
                  <td>支付方式</td>
                  <td colspan="2">测算过程或其他需要说明的事项</td>
                </tr>
                <tr v-if="data.ProjectDtlBudgetDtls.length !==0" v-for="(item,idx) in data.ProjectDtlBudgetDtls">
                  <td>{{idx+1}}</td>
                  <td class="tltd" colspan="2">{{item.FName}}</td>
                  <td class="trtd">{{item.FAmount | NumFormat}}</td>
                  <td class="tltd">{{item.FPaymentMethod_EXName}}</td>
                  <td
                    colspan="2"
                  >{{item.FOtherInstructions}}</td>
                </tr>
                <tr v-if="data.ProjectDtlBudgetDtls.length ===0">
                  <td class="no-data" colspan="7">暂无数据</td>
                </tr>
                <tr>
                  <td colspan="3">合计(元)</td>
                  <td  colspan="4">{{budgetAmount | NumFormat}}</td>
                </tr>
                <!-- 项目资金申请行 -->
                <tr>
                  <td v-if="data.ProjectDtlFundAppls.length !==0" :rowspan="data.ProjectDtlFundAppls.length +1">项目资金申请(万元)</td>
                  <td v-if="data.ProjectDtlFundAppls.length ===0" :rowspan="1 +1">项目资金申请(万元)</td>
                  <td>序号</td>
                  <td  colspan="5">资金来源</td>
                  <td>金额</td>
                </tr>
                <tr v-if="data.ProjectDtlFundAppls.length !== 0" v-for="(item,idx) in data.ProjectDtlFundAppls">
                  <td  colspan="1">{{idx + 1}}</td>
                  <td class="tltd" colspan="5">{{item.FSourceOfFunds_EXName}}</td>
                  <td class="trtd">{{item.FAmount | NumFormat}}</td>
                </tr>
                <tr v-if="data.ProjectDtlFundAppls.length === 0">
                  <td class="no-data" colspan="7">暂无数据</td>
                </tr>
                <!-- 项目实施进度计划 -->
                <tr>
                  <td v-if="data.ProjectDtlImplPlans.length !== 0" :rowspan="data.ProjectDtlImplPlans.length+1">项目实施进度计划</td>
                  <td v-if="data.ProjectDtlImplPlans.length === 0" :rowspan="1+1">项目实施进度计划</td>
                  <td colspan="4">项目实施内容</td>
                  <td colspan="2">开始时间</td>
                  <td colspan="1">完成时间</td>
                </tr>
                <tr v-if="data.ProjectDtlImplPlans.length !== 0" v-for="(item,idx) in data.ProjectDtlImplPlans">
                  <td class="tltd" colspan="4">{{item.FImplContent}}</td>
                  <td colspan="2">{{item.FStartDate}}</td>
                  <td colspan="1">{{item.FEndDate}}</td>
                </tr>
                <tr v-if="data.ProjectDtlImplPlans.length === 0">
                  <td class="no-data" colspan="7">暂无数据</td>
                </tr>
                <!-- 绩效目标 -->
                <tr>
                  <td v-if="data.ProjectDtlTextContents.length !==0" :rowspan="data.ProjectDtlTextContents.length + 1">绩效目标</td>
                  <td v-if="data.ProjectDtlTextContents.length ===0" :rowspan="1 + 1">绩效目标</td>
                  <td colspan="4">年度目标</td>
                  <td colspan="3">长期目标</td>
                </tr>
                <tr v-if="data.ProjectDtlTextContents.length !== 0" v-for="(item,idx) in data.ProjectDtlTextContents">
                  <td colspan="4" class="tltd">{{item.FLTPerformGoal}}</td>
                  <td class="tltd" colspan="3">{{item.FAnnualPerformGoal}}</td>
                </tr>
                <tr v-if="data.ProjectDtlTextContents.length === 0">
                  <td colspan="7" class="no-data">暂无数据</td>
                </tr>
                <!-- 部门领导意见 -->
                <tr>
                  <td>部门领导意见</td>
                  <td colspan="4">{{'待添加字段'}}</td>
                  <td class="tltd">部门分管领导意见</td>
                  <td colspan="2" class="tltd">{{'待添加字段'}}</td>
                </tr>
                <!-- 预算编审小组意见 -->
                <tr>
                  <td>预算编审小组意见</td>
                  <td colspan="1">会议时间</td>
                  <td colspan="3" class="tltd">{{data.ProjectMst.FMeetingTime}}</td>
                  <td class="tltd">会议纪要编号</td>
                  <td colspan="2" class="tltd">{{data.ProjectMst.FMeetiingSummaryNo}}</td>
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
  props:{
    data:{
      type:Object,
      default:function () {
        return {}
      }
    }
  },
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
  computed:{
    budgetAmount(){
      let budg =  this.data.ProjectDtlBudgetDtls
      if (budg.length !== 0 ){
        let amount = 0
        for (let key in budg){
          amount = amount + budg[key].FAmount
        }
        return amount
      }else {
        return amount
      }
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
      height: 670px;
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
  .no-data{
    font-size: 14px;
    color: #ccc;
  }
}
</style>
