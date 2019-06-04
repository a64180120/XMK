<template>
  <section>
    <el-dialog
      :visible.sync="data.openDialog"
      width="540px"
      :close-on-click-modal="false"
      class="dialog goApproval"
      append-to-body
    >
      <div slot="title" class="dialog-title">
        <p>送审</p>
      </div>
      <div class="content">
        <div class="handle">
          <div class="title">
            <span>送审备注</span>
            <span style="float:right;color:#333;">附单据 0 张</span>
          </div>
          <div class="textare">
            <el-input type="textarea" v-model="content"></el-input>
          </div>
        </div>
        <div class="sub-table">
          <!--审批流程-->
          <div class="sub-approval">
            <div class="title">
              <span>送审流程</span>
            </div>
            <div class="table">
              <el-table
                class="table-content"
                :data="subData"
                :border="true"
                highlight-current-row
                @current-change="handleCurrentChange"
                header-row-class-name="table-header"
                ref="content"
              >
                <el-table-column prop="code" width="80" align="center" label="流程编码"></el-table-column>
                <el-table-column prop="name" align="center" label="流程名称"></el-table-column>
                <el-table-column width="60" align="center" label="查看">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-search icon-search"
                      @click="searchFlow(scope.row,scope.column.$index,scope.store)"
                    ></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="next-approval">
            <div class="title">
              <span>接收人</span>
            </div>
            <div class="table">
              <el-table
                class="table-next"
                :data="nextData"
                :border="true"
                @select="handleSelect"
                @select-all="handleSelectAll"
                header-row-class-name="table-header"
              >
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column prop="code" align="center" label="操作员编码"></el-table-column>
                <el-table-column prop="name" align="center" label="姓名"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="approval-btn">
        <el-button
          size="small"
          type="primary"
          @click="data.openDialog = false"
        >{{btnGroup.cancelName}}</el-button>
        <el-button size="small" type="primary" @click="submit">{{btnGroup.onfirmName}}</el-button>
      </div>
      <auditfollow :visible="showAuditfollow" @update:visible="closeAuditFollow()"></auditfollow>
    </el-dialog>
  </section>
</template>

<script>
import auditfollow from '../../components/auditFollow/auditfollow'

export default {
  name: 'goApproval',
  components: { auditfollow },
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: null,
        itemType: ''
      }
    },
    btnGroup: {
      type: Object,
      default: function() {
        return {
          cancelName: '取消',
          onfirmName: '确认'
        }
      }
    },
    father: {
      default: null
    },
    reSetting: {
      default: false
    }
  },
  data() {
    return {
      showAuditfollow: false,
      openDialog: false,
      handleValue: '',
      content: '',
      subData: [
        {
          code: '0001',
          name: '资金拨付流程1'
        },
        {
          code: '0002',
          name: '资金拨付流程2'
        }
      ],
      nextData: [],
      nextDataList: [
        [
          {
            code: '1001',
            name: '王官官'
          },
          {
            code: '1002',
            name: '王管管'
          }
        ],
        [
          {
            code: '2001',
            name: '王罐罐'
          },
          {
            code: '2002',
            name: '王关关'
          }
        ]
      ]
    }
  },
  methods: {
    closeAuditFollow() {
      this.showAuditfollow = false
    },
    changeDialog() {
      this.openDialog = true
    },
    //查看详细流程
    searchFlow(row, column, index, store) {
      this.showAuditfollow = true
    },
    //表格单选
    handleSelect(selection, row) {},
    //表格全选
    handleSelectAll(selection) {},
    //取消
    cancel() {
      this.openDialog = false
    },
    handleCurrentChange(newRow, oldRow) {
      this.nextData = this.nextDataList[
        this.subData.findIndex(item => item.code == newRow.code)
      ]
    },
    //确认
    submit() {
      var vm = this
      this.$msgBox.show({
        content: '送审成功',
        fn: () => {
          if (vm.reSetting) {
            vm.father.itemType = 'error'
            vm.$parent.reSetting = false
            vm.$parent.detail.Dtls.unshift(vm.$parent.oldDtls)
          } else {
            vm.father ? (vm.father.openDialog = false) : ''
          }
          console.log(this.data.data)
          if (Array.isArray(this.data.data)) {
            this.data.data.forEach(item => {
              if (item.FApproval !== 9) {
                item.Mst.checked = false
                item.Mst.FApproval = 1
              }
            })
          } else {
            if (this.data.data.FApproval !== 9) {
              this.data.data.Mst.checked = false
              this.data.data.Mst.FApproval = 1
            }
          }
          vm.data.openDialog = false
        }
      })
    }
  },
  created() {
    console.log(this.father, this.reSetting)
    this.nextData = this.nextDataList[0]
    if (this.data.openDialog) {
      this.$nextTick(() => {
        this.$refs.content.setCurrentRow(this.subData[0])
      })
    }
  },
  watch: {
    'data.openDialog'(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.content.setCurrentRow(this.subData[0])
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-title {
  border-bottom: 1px solid $borderColor_ccc;
  text-align: left;
  padding-left: 20px;
  > p {
    line-height: 0.4rem;
    font-size: 0.2rem;
  }
}
.content {
  width: 100%;
  height: 228px;
  overflow: auto;
  > .handle {
    margin-bottom: 10px;
    > .title {
      color: $btnColor;
      text-align: left;
      font-size: 0.16rem;
      > span {
        &:first-of-type:before {
          content: '';
          display: inline-block;
          width: 0.12rem;
          height: 0.12rem;
          background-color: $btnColor;
          margin-right: 5px;
        }
        color: $btnColor;
      }
    }
    > .radio {
      > ul {
        list-style: none;
        > li {
          display: inline;
        }
        > li:first-child {
          float: left;
        }
        > li:last-child {
          float: right;
        }
      }
    }
  }
  > .sub-table {
    max-width: 100%;
    display: inline;
    > .sub-approval {
      float: left;
      width: 60%;
      > .title {
        color: $btnColor;
        text-align: left;
        > span {
          font-size: 0.16rem;
          color: $btnColor;
          &:first-of-type:before {
            content: '';
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
            margin-right: 5px;
            background-color: $btnColor;
          }
        }
      }
      > .table {
        padding-right: 10px;
      }
    }
    > .next-approval {
      float: left;
      width: 40%;
      > .title {
        color: $btnColor;
        text-align: left;
        > span {
          font-size: 0.16rem;
          color: $btnColor;
          &:first-of-type:before {
            content: '';
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
            margin-right: 5px;
            background-color: $btnColor;
          }
        }
      }
      > .table {
        padding-right: 10px;
      }
    }
  }
}
.icon-search {
  color: #09f;
  font-size: 0.16rem;
  &:hover {
    cursor: pointer;
  }
}
.approval-btn {
  margin-top: 5px;
  text-align: right;
  > .el-button {
    padding: 4px 15px;
  }
}
</style>

<style scoped>
.dialog {
}
.dialog >>> .el-dialog {
  margin: 0 !important;
  height: 310px;
}
.dialog >>> .el-dialog__header {
  padding: 0;
}
.dialog >>> .el-dialog__body {
  padding: 0 1%;
}
.dialog >>> .el-dialog__header .el-dialog__headerbtn {
  top: 15px;
}
.table-content >>> tr th {
  background-color: #09f;
  padding: 6px 0;
  color: #ffffff;
  font-size: 0.12rem;
}
.table-content >>> tr td {
  padding: 5px 0;
  font-size: 0.12rem;
}
.table-next >>> tr th {
  background-color: #09f;
  padding: 5px 0;
  color: #ffffff;
  font-size: 0.12rem;
}
.table-next >>> tr td {
  padding: 5px 0;
  font-size: 0.12rem;
}
</style>
<style lang="scss">
.goApproval {
  .el-dialog {
    display: inline-block;
    margin: 0 !important;
    vertical-align: middle;
    .el-dialog__body {
      padding-top: 0px;
    }
    .el-table__body tr.current-row > td {
      background-color: $primaryColor;
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
</style>
