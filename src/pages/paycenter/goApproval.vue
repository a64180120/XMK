<template>
  <section>
    <el-dialog
      :visible.sync="data.openDialog"
      width="37.5%"
      :close-on-click-modal="false"
      class="dialog"
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
                :header-row-class-name="headerRowClass"
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
                :data="subData"
                :border="true"
                @select="handleSelect"
                @select-all="handleSelectAll"
                :header-row-class-name="headerRowClass"
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
        <el-button size="small" type="primary" @click="cancel()">{{btnGroup.cancelName}}</el-button>
        <el-button size="small" type="primary" @click="submit()">{{btnGroup.onfirmName}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'approvalDialog',
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: {},
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
    }
  },
  data() {
    return {
      openDialog: false,
      handleValue: '',
      content: '',
      subData: [
        {
          code: '0001',
          name: 'ZXXXXX'
        },
        {
          code: '0001',
          name: 'FASAS'
        }
      ]
    }
  },
  methods: {
    changeDialog() {
      this.openDialog = true
    },
    //表头样式回调
    headerRowClass(val) {
      return 'table-header'
    },
    //查看详细流程
    searchFlow(row, column, index, store) {},
    //表格单选
    handleSelect(selection, row) {},
    //表格全选
    handleSelectAll(selection) {},
    //取消
    cancel() {
      this.openDialog = false
    },
    //确认
    submit() {}
  }
}
</script>

<style lang="scss" scoped>
.dialog-title {
  border-bottom: 1px solid #ccc;
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
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
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
