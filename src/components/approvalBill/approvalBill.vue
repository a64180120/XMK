<template>
  <section>
    <div class="content">
      <div class="handle">
        <div v-show="!isApproval" class="title">
          <span>■</span>审批处理
        </div>
        <div class="radio">
          <ul>
            <li>
              <div v-if="isApproval" class="title">
                <span>■</span>送审备注
              </div>
              <el-radio v-if="!isApproval" v-model="handleValue" label="1">同意</el-radio>
              <el-radio v-if="!isApproval" v-model="handleValue" label="2">不同意</el-radio>
              <span v-if="backPersonnel[0] !== undefined " style="color: red">
                (本单据将退回给
                <span v-for="item in backPersonnel">“{{item.OperatorName}}”</span>
                )
              </span>
            </li>
            <li>
              <span style="cursor: pointer">
                附单据
                <span style="text-decoration: underline">{{fileCount}}</span> 张
                <img @click="showUpload" class="icon-img" src="../../assets/images/hxz.png" />
              </span>
            </li>
          </ul>
        </div>
        <div class="textare">
          <el-input type="textarea" v-model="textare" class="text-input"></el-input>
          <div class="word-num">
            <span class="word-size">
              <span style="color: #ec0f0f;">{{wordNum}}</span>/100
            </span>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
      <div class="sub-table">
        <!--审批流程-->
        <div class="sub-approval">
          <div class="title">
            <template v-if="isApproval">
              <span>■</span>送审流程
            </template>
            <template v-else>
              <span>■</span>审批流程
            </template>
          </div>
          <div class="table">
            <el-table
              class="table-content"
              :data="approvalFollow"
              :border="true"
              :header-row-class-name="headerRowClass"
              highlight-current-row
              ref="approvalFollowTable"
              @row-click="handleRowClick"
            >
              <el-table-column prop="FCode" width="80" align="center" label="流程编码"></el-table-column>
              <el-table-column prop="FName" align="center" label="流程名称"></el-table-column>
              <el-table-column v-if="!isApproval" width="60" align="center" label="查看">
                <template slot-scope="scope">
                  <i
                    class="el-icon-search icon-search"
                    @click.stop="searchFlow(scope.row,scope.column.$index,scope.store)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="next-approval">
          <div class="title">
            <template v-if="isApproval">
              <span>■</span>接收人
            </template>
            <template v-else>
              <span>■</span>下一审批人
            </template>
          </div>
          <div class="table">
            <el-table
              v-if="nextApprovaler !== []"
              ref="nextApprovaler"
              class="table-next"
              :data="nextApprovaler"
              :border="true"
              @select="handleSelect"
              @select-all="handleSelectAll"
              :header-row-class-name="headerRowClass"
            >
              <el-table-column type="selection" width="30"></el-table-column>
              <el-table-column prop="OperatorCode" align="center" label="操作员编码"></el-table-column>
              <el-table-column prop="OperatorName" align="center" label="姓名"></el-table-column>
            </el-table>
            <div v-else class="sptg">
              <img src="../../assets/images/sptg.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 *事件:
 * 1、 dialogFlow():审批流程当前行搜索图标点击时触发，传递当前行数据
 * 2、selectApprovaler():下一审批人选中时触发，传递选中行的数据
 * 3、approvalRowClick()：审批流列表当前行的点击事件，传递审批流程列表当前行的数据
 * 4、isAgree:审批需要,送审时不需要。是否同意事件改变时触发 传递一个布尔值 ，ture为同意  false为不同意
 * 属性：
 * 1、approvalFollow ，左边审批流程列表数据
 * 2、nextApprovaler，下一审批人列表数据
 * 3、backPersonnel，审批需要,送审时不需要。用于显示回退人员数据,
 * 4、isApproval，判断是否是送审，true送审 false审核 默认为false
 * 5、fileCount,附件数量
 * 6、upload,显示上传附件弹框
 * v-model:绑定文本域内容
 */

export default {
  name: 'approvalBill',
  props: {
    isApproval: {
      //送审true 审核 false
      type: Boolean,
      default: false
    },
    //回退的操作人员列表
    backPersonnel: {
      type: Array,
      default: function() {
        return []
      }
    },
    //下一审批岗位的审批人列表 如果为空表示最后一个审批人
    nextApprovaler: {
      type: Array,
      default: function() {
        return []
      }
    },
    //审批流程数据列表
    approvalFollow: {
      type: Array,
      default: function() {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    },
    fileCount: {
      type: Number,
      default: 0
    },
    upload: {
      type: Boolean,
      default: false
    },
    FMode: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      textare: this.value,
      openDialog: false,
      handleValue: '',
      subPeople: [],
      wordNum: 0,
      remember: ''
    }
  },
  watch: {
    value(newValue) {
      if (this.wordNum < 100) {
        this.textare = newValue
      }
    },
    textare(newValue) {
      if (newValue !== null && newValue.length < 100) {
        for (let i = 0; i < newValue.length; i++) {
          this.wordNum = i + 1
        }
        this.$emit('input', newValue)
        this.remember = newValue
      } else {
        for (let i = 0; i < newValue.length; i++) {
          this.wordNum = i + 1
        }
        this.textare = newValue.slice(0, 100)
      }
      if (newValue === '') {
        this.wordNum = 0
      }
    },
    handleValue(val) {
      if (val === '2') {
        this.$emit('isArgeen', false)
      } else {
        this.$emit('isArgeen', true)
      }
    },
    FMode(val) {
      if (val == 1) {
        this.$nextTick(() => {
          this.$refs.nextApprovaler.toggleAllSelection()
        })
      }
    },
    nextApprovaler: {
      handler(val) {
        if (this.FMode == 1) {
          this.$nextTick(() => {
            this.$refs.nextApprovaler.toggleAllSelection()
          })
        }
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    showUpload() {
      this.$emit('uploadFn', true)
    },
    changeDialog() {
      this.openDialog = true
      this.subPeople = []
    },
    //表头样式回调
    headerRowClass(val) {
      return 'table-header'
    },
    //查看详细流程
    searchFlow(row, column, index, store) {
      this.$emit('dialogFlow', row)
    },
    //表格单选
    handleSelect(selection, row) {
      this.$emit('selectApprovaler', selection)
      console.log(selection)
    },
    //表格全选
    handleSelectAll(selection) {
      this.$emit('selectApprovaler', selection)
    },
    //当前行点击事件
    handleRowClick(row, column) {
      this.$emit('approvalRowClick', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 335px;
  overflow: auto;
  > .handle {
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
        color: #3294e8;
        text-align: left;
        > span {
          font-size: 0.2rem;
          color: #3294e8;
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
        color: #3294e8;
        text-align: left;
        > span {
          font-size: 0.2rem;
          color: #3294e8;
        }
      }
      > .table {
        padding-right: 10px;
        > .sptg {
          width: 100%;
          min-height: 100px;
          text-align: center;
          > img {
            width: 65%;
          }
        }
      }
    }
  }
}
.title {
  color: #3294e8;
  text-align: left;
  > span {
    font-size: 0.2rem;
    color: #3294e8;
  }
}
.textare {
  > .text-input {
    height: 100px;
  }
  > .word-num {
    position: relative;
    text-align: right;

    > .word-size {
      position: absolute;
      bottom: 0;
      right: 10px;
      font-size: 0.1rem;
    }
  }
}
</style>
<style scoped>
.text-input >>> .el-textarea__inner {
  height: 100px;
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
  font-size: 0.14rem;
}
.table-content >>> tr td {
  padding: 5px 0;
  font-size: 0.14rem;
}
.table-next >>> tr th {
  background-color: #09f;
  padding: 5px 0;
  color: #ffffff;
  font-size: 0.14rem;
}
.table-next >>> tr td {
  padding: 5px 0;
  font-size: 0.14rem;
}
.icon-search {
  font-size: 0.16rem;
  color: #0099ff;
  cursor: pointer;
}
.show-upload {
  font-size: 0.24rem;
}
.icon-img {
  width: 18px;
}
.icon-img:hover {
  width: 18px;
  cursor: pointer;
}
</style>
