<template>
  <!-- <el-dialog append-to-body :visible="true" width="600px" :close-on-click-modal="false">
    <tb-data></tb-data>
  </el-dialog>-->
  <section class="tbData">
    <div slot="title" class="dialog-title">
      <span style="float: left">同步数据</span>
    </div>
    <div class="content">
      <div class="list">
        <div class="tableHead">
          <table>
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                  >序号</el-checkbox>
                </th>
                <th>项目编码</th>
                <th>项目名称</th>
              </tr>
            </thead>
          </table>
        </div>
        <el-checkbox-group v-model="checkedList" @change="handleCheckedCitiesChange">
          <div class="tableBody">
            <table>
              <colgroup>
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
              </colgroup>
              <tbody>
                <tr v-for="(i,index) in list">
                  <td>
                    <el-checkbox :label="index+1" :key="i"></el-checkbox>
                  </td>
                  <td>{{i}}</td>
                  <el-tooltip :content="i">
                    <td>{{i}}</td>
                  </el-tooltip>
                </tr>
              </tbody>
            </table>
          </div>
        </el-checkbox-group>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="bottom-btn">
      <el-button class="btn" size="mini">取消</el-button>
      <el-button class="btn" size="mini">同步</el-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'tbData',

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
.tbData {
  .dialog-title {
    overflow: hidden;
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .content {
    height: 350px;
    position: relative;
    .list {
      color: #333;
      position: absolute;
      bottom: 0;
      top: 20px;
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
        top: 48px;
        bottom: 10px;
        table {
          border: 1px solid $borderColor_ccc;
        }
        td {
          border-radius: 0;
          border-bottom: 1px solid $borderColor_ccc;
          border-left-color: $borderColor_ccc;
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
.tbData {
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
