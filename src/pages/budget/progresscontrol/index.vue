<template>
  <div class="progresscontrol">
    <topHandle :title="'进度控制在线工作平台'"
               @refresh="refresh">
      <div class="btnCon">
        <div @click.stop="update=true"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/xz.png"
                 alt=""></div>
          编辑
        </div>
        <div @click.stop=""
             class="handle">
          <div class="topIcon"><img src="@/assets/images/xz.png"
                 alt=""></div>
          保存
        </div>
        <div @click.stop=""
             class="handle">
          <div class="topIcon"><img src="@/assets/images/xz.png"
                 alt=""></div>
          取消
        </div>
        <div @click.stop=""
             class="handle">
          <div class="topIcon"><img src="@/assets/images/xz.png"
                 alt=""></div>
          批量设置
        </div>
      </div>
    </topHandle>
    <div class="container">
      <div class="orgListCon">
        <div class="orgsearch">
          <el-input placeholder="输入关键字进行过滤"
                    v-model="filterText">
          </el-input>
        </div>
        <div class="orgtreeCon"
             v-if="orgList.length>0">
          <el-tree ref="orgtree"
                   node-key="OCode"
                   :highlight-current="true"
                   :props="defaultProps"
                   :default-expanded-keys="[checkedOrg.OCode?checkedOrg.OCode:1]"
                   :data="orgList"
                   :render-content="rendercontent"
                   :filter-node-method="filterNode"
                   :expand-on-click-node="false"
                   @node-click="orgChange"></el-tree>
        </div>

      </div>
      <div class="tableCon">
        <template>
          <el-table :data="tableData"
                    style="width: 100%">
            <el-table-column prop="date"
                             label="部门名称">
            </el-table-column>
            <el-table-column label="年初申报阶段">
              <el-table-column prop="name"
                               label="年初申报"
                               width="120">
                <template slot-scope="scope">
                  <div>
                    <el-radio v-model="scope.row.name"></el-radio>
                  </div>
                </template>

              </el-table-column>
              <el-table-column prop="name"
                               label="起止时间">
                <template slot-scope="scope">
                  <div v-show="update"
                       class="block">
                    <el-date-picker v-model="value2"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions">
                    </el-date-picker>
                  </div>
                  <div v-show="!update">
                    <span>{{scope.row.date}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="初报完成阶段"
                             width="120">
              <template slot-scope="scope">
                <div>
                  <el-radio v-model="scope.row.name"></el-radio>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="年中调整阶段">
              <el-table-column prop="name"
                               label="年中调整"
                               width="120">
                <template slot-scope="scope">
                  <div>
                    <el-radio v-model="scope.row.name"></el-radio>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name"
                               label="起止时间">

              </el-table-column>
            </el-table-column>
            <el-table-column label="调整完成阶段"
                             width="120">
              <template slot-scope="scope">
                <div>
                  <el-radio v-model="scope.row.name"></el-radio>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
import { mapState } from 'vuex'
export default {
  name: 'progresscontrol',
  data () {
    return {
      update: false,//表单可编辑状态

      defaultProps: {
        children: 'children',
        label: 'OName'
      },
      checkedOrg: {},
      filterText: '',

      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      value2: '',//时间选择器
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },

    }
  },
  computed: {
    ...mapState({
      orgList: state => state.user.orglist
    })
  },
  methods: {
    refresh () {

    },
    //切换组织
    orgChange () {

    },
    //组织过滤
    filterNode (value, data) {
      console.log(value, data)
      debugger
      if (!value) return true;
      return data.OName.indexOf(value) !== -1;
    },
    //组织树样式
    rendercontent (h, { node, data, store }) {

      let cssname = ''
      if (node.data.WeChatId == 'false') {
        cssname = 'disableOrg'
      }
      return (
        <span class={cssname}>
          <span>{node.label}</span>

        </span>);
    }
  },
  watch: {
    filterText (val) {
      this.$refs.orgtree.filter(val);
    }
  },
  components: {
    topHandle
  }
}
</script>

<style lang="scss" scoped>
.progresscontrol {
  .container {
    padding: 1%;
  }
  .btnCon {
    .handle {
      display: inline-block;
      width: 60px;
      height: 50px;
      padding: 0px 0;
      cursor: pointer;
      &:active {
        background: #ccc;
      }
    }
    .topIcon {
      height: 60%;
      > img {
        height: 100%;
      }
    }
  }
  .orgListCon {
    float: left;
    width: 20%;
    height: 100%;
    border: 1px solid #ddd;
    .orgsearch {
      padding: 10px;
      background: $btnColor;
    }
    .orgtreeCon {
      height: 100%;
      padding-bottom: 40px;
      > div {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
  .tableCon {
    float: left;
    width: 80%;
    height: 100%;
    padding-left: 1%;
  }
}
</style>
