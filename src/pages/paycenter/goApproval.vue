<template>
  <section>
    <el-dialog
      :visible.sync="data.openDialog"
      width="620px"
      :close-on-click-modal="false"
      class="dialog goApproval"
      append-to-body
    >
      <div slot="title" class="dialog-title">
        <p>送审</p>
      </div>
      <approval-bill
        ref="approvalbill"
        v-model="content"
        :isApproval="true"
        :approvalFollow="approvalFollow"
        @approvalRowClick="approvalRowClick"
        :nextApprovaler="nextApprovaler"
        @dialogFlow="dialogFlow"
        @selectApprovaler="selectApprovaler"
        :upload.sync="upload"
        :fileCount="fileCount"
        @uploadFn="upload = true"
        :FMode="mode"
      ></approval-bill>
      <div class="approval-btn">
        <el-button
          size="small"
          type="primary"
          @click="data.openDialog = false"
        >{{btnGroup.cancelName}}</el-button>
        <el-button size="small" type="primary" @click="submit">{{btnGroup.onfirmName}}</el-button>
      </div>
      <el-dialog width="auto" append-to-body :visible.sync="upload">
        <upload ref="upload" @submit="uploadClose"/>
      </el-dialog>
      <!-- <div
        :class="{approvalfollow:true,show:showAuditfollow}"
        :style="showAuditfollow?'height:'+(auditMsg.length*40+15)+'px':''"
      >
        <template v-for="(item,index) in auditMsg">
          <auditmsg :info="item" :index="index+1" :isApproval="true"></auditmsg>
        </template>
      </div>-->
      <approvalfollow :showAuditfollow="showAuditfollow" :auditMsg="auditMsg"></approvalfollow>
    </el-dialog>
  </section>
</template>

<script>
import approvalfollow from '@/components/applyPro/approvalFollow.vue'
import approvalBill from '@/components/approvalBill/approvalBill.vue'
import upload from '@/components/upload'
import {
  getAppvalProc,
  postAddAppvalRecord,
  GetFirstStepOperator,
  GetAllPostsAndOpersByProc
} from '@/api/paycenter'
import { testUpload, PostUploadFile } from '@/api/upload'
import { mapState } from 'vuex'
export default {
  name: 'goApproval',
  components: { approvalfollow, approvalBill, upload },
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
    },
    bType: {
      default: '001'
    }
  },
  inject: ['refreshIndexData'],
  data() {
    return {
      showAuditfollow: false,
      openDialog: false,
      handleValue: '',
      content: '',
      subData: [],
      nextData: [],
      nextDataList: [],
      approvalFollow: [],
      nextApprovaler: [],
      ProcPhid: '',
      PostPhid: '',
      NextOperators: [],
      mode: 0, //0普通模式1会签模式,
      upload: false,
      files: null,
      fileCount: 0,
      auditMsg: [],
      files: []
    }
  },
  methods: {
    // 获取审批人
    approvalRowClick(item) {
      this.ProcPhid = item.PhId
      this.NextOperators = []
      GetFirstStepOperator({
        PhId: item.PhId
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          this.mode = res.Data.FMode
          this.PostPhid = res.Data.PhId
          this.nextApprovaler = res.Data.Operators
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.error('获取审批人失败！')
        })
    },
    selectApprovaler(list) {
      this.NextOperators = list
    },
    closeAuditFollow() {
      this.showAuditfollow = false
    },
    changeDialog() {
      this.openDialog = true
    },
    //查看详细流程
    dialogFlow(row) {
      GetAllPostsAndOpersByProc({
        ProcId: row.PhId
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }

          res.forEach(item => {
            item.FBilltype = '002'
          })
          this.auditMsg = res
          this.showAuditfollow = true
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.error('获取审批流程信息失败！')
        })
    },
    //取消
    cancel() {
      this.openDialog = false
    },
    // 送审请求
    postAddAppvalRecord(PhId) {
      let formData = new FormData()
      let data = {
        RefbillPhidList: PhId
          ? JSON.stringify([PhId + ''])
          : JSON.stringify(
              this.data.data.map(item => {
                return item.Mst.PhId + ''
              })
            ),
        FBilltype: this.bType,
        ProcPhid: this.ProcPhid,
        PostPhid: this.PostPhid,
        NextOperators: JSON.stringify(
          this.nextApprovaler.map(item => {
            return item.PhId
          })
        ),
        FSeq: 0,
        FSendDate: '',
        FApproval: '1',
        FOpinion: this.content,
        OperaPhid: this.userid,
        OperatorCode: this.usercode
      }
      for (let i in data) {
        formData.append(i + '', data[i])
      }
      for (let file of this.files) {
        formData.append('files', file.raw)
      }
      console.log(formData)
      postAddAppvalRecord(formData)
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          this.data.openDialog = false
          this.$msgBox.show('送审成功')
          if (this.father) this.father.openDialog = false
          this.refreshIndexData()
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.error('送审失败！')
        })
    },
    //确认
    submit() {
      if (this.ProcPhid == '') {
        this.$msgBox.error('请选择一条审批流程！')
        return
      }
      if (this.mode) {
        if (this.NextOperators.length != this.nextApprovaler.length) {
          this.$msgBox.error('请选择所有审批人！')
          return
        }
      } else {
        if (this.NextOperators.length == 0) {
          this.$msgBox.error('请至少选择一位审批人！')
          return
        }
      }
      if (this.$parent.reSetting == undefined) {
        // 直接送审
        this.postAddAppvalRecord()
      } else if (this.$parent.reSetting && !this.$parent.detail.Mst.PhId) {
        // 生成新的支付单，送审
        this.$parent.postAddPayList(this.postAddAppvalRecord)
      } else {
        // 保存支付单，送审
        this.$parent.savePayList(this.$parent.detail, this.postAddAppvalRecord)
      }
    },
    // 上传附件
    uploadClose(files) {
      console.log(files)
      this.upload = false
      this.fileCount = files.length
      this.files = files
    }
  },
  mounted() {
    // 获取所有审批流程
    getAppvalProc({
      Orgid: this.orgid,
      BType: this.bType
    })
      .then(res => {
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)
          return
        }
        this.approvalFollow = res.Data
        if (res.Data.length > 0) {
          this.approvalRowClick(res.Data[0])
          this.$refs.approvalbill.$refs.approvalFollowTable.setCurrentRow(
            res.Data[0]
          )
        }
      })
      .catch(err => {
        console.log(err)
        this.$msgBox.error('获取送审流程失败！')
      })
  },
  created() {},
  watch: {
    'data.openDialog'(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.content.setCurrentRow(this.subData[0])
        })
      }
    }
  },
  computed: {
    ...mapState({
      orgid: state => state.user.orgid,
      usercode: state => state.user.usercode,
      userid: state => state.user.userid
    })
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
.approval-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: right;
  > .el-button {
    padding: 4px 15px;
  }
}
</style>

<style scoped>
.dialog >>> .el-dialog {
  margin: 0 !important;
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
    .el-dialog__body {
      padding-top: 0px;
      section .content {
        height: auto;
      }
      .title,
      .radio {
        font-size: 16px;
      }
    }
  }
  &.el-dialog__wrapper {
    text-align: center;
  }
  .el-table__body-wrapper.is-scrolling-none {
    max-height: 90px !important;
  }
}
</style>
