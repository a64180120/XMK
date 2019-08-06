<template>
  <!-- <el-dialog append-to-body :visible="true" width="700px" :close-on-click-modal="false">
    <turn-item></turn-item>
  </el-dialog>-->
  <section class="prerojectturnItem">
    <div slot="title"
         class="dialog-title">
      <span style="float: left">转立项</span>
    </div>
    <!-- 预算编审小组意见 -->
    <div class="line1">
      <h2 class="title">■预算编审小组意见</h2>
      <div class="content">
        <el-row>
          <el-col class="list-item"
                  :span="12">
            <span>会议时间：</span>
            <el-date-picker size="small"
                            v-model="value1"
                            type="date"
                            placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col class="list-item"
                  :span="12">
            <span>会议纪要编号：</span>
            <el-input size="small"
                      v-model="value1"
                      placeholder="请填写项目名称（必填）"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="list-item"
                  :span="12">
            <span>会议时间：</span>
            <div style="text-align:center;">
              <el-radio v-model="radio"
                        label="1">通过</el-radio>
              <el-radio v-model="radio"
                        label="0">未通过</el-radio>
            </div>
          </el-col>
          <el-col class="list-item"
                  :span="12">
            <span>附件上传：</span>
            <div>
              <span style="cursor: pointer">
                附单据
                <span style="text-decoration: underline">{{fileCount}}</span> 张
                <img @click="upload = true"
                     class="icon-img"
                     src="../../assets/images/hxz.png" />
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 备注 -->
    <div class="line2">
      <h2 class="title">■备注</h2>
      <div class="content">
        <el-input type="textarea"
                  show-word-limit
                  maxlength="100"
                  :rows="3"
                  placeholder="请输入备注，100字以内。"
                  v-model="textarea"></el-input>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="bottom-btn">
      <el-button class="btn"
                 size="mini">取消</el-button>
      <el-button class="btn"
                 size="mini">确认</el-button>
    </div>
    <!-- 附件上传 -->
    <el-dialog modal-append-to-body
               :close-on-click-modal="false"
               width="auto"
               append-to-body
               :visible.sync="upload">
      <upload ref="upload"
              @submit="uploadClose" />
    </el-dialog>
  </section>
</template>

<script>
import upload from '@/components/upload'

export default {
  name: 'prerojectturnItem',
  components: {
    upload
  },
  data () {
    return {
      radio: 1,
      value1: '',
      fileCount: 0,
      upload: false,
      files: null
    }
  },
  methods: {
    uploadClose (files) {
      this.upload = false
      this.fileCount = files.length
      this.files = files
    }
  }
}
</script>
<style lang="scss" scoped>
.prerojectturnItem {
  .dialog-title {
    overflow: hidden;
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .line1 {
    .title {
      margin: 10px auto;
      text-align: left;
      color: $btnColor;
      font-size: 0.14rem;
    }
    .content {
      .list-item {
        padding-left: 70px;
        position: relative;
        &:first-of-type {
          padding-right: 30px;
        }
        &:nth-of-type(2) {
          padding-left: 100px;
        }
        > span {
          position: absolute;
          left: 0;
          line-height: 32px;
          top: 0;
        }
        > div {
          width: 100%;
          line-height: 32px;
          text-align: left;
        }
        .icon-img {
          vertical-align: middle;
          width: 18px;
        }
        .icon-img:hover {
          width: 18px;
          cursor: pointer;
        }
      }
    }
  }
  .line2 {
    .title {
      margin: 10px auto 0;
      text-align: left;
      color: $btnColor;
      font-size: 0.14rem;
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
.prerojectturnItem {
  .line1 {
    .content {
      .list-item {
        .el-date-editor {
          .el-input__prefix {
            display: none;
          }
          .el-input__inner {
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>
