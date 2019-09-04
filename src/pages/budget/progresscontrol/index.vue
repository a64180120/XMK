<template>
  <div class="progresscontrol">
    <topHandle :title="'进度控制在线工作平台'"
               @refresh="refresh">
      <div class="btnCon">
        <div v-if="!update"
             @click.stop="update=true"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/zj2.png"
                 alt=""></div>
          编辑
        </div>
        <div v-if="update"
             @click.stop="save"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/bc.png"
                 alt=""></div>
          保存
        </div>
        <div v-if="update"
             @click.stop="getData();update=false"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/qx.png"
                 alt=""></div>
          取消
        </div>
        <div style="width:70px"
             @click.stop="settingShow"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/pl.png"
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
                    :height="tableH"
                    header-row-class-name="headerClass"
                    style="width: 100%">
            <el-table-column prop="FDeptName"
                             label="部门名称"
                             min-width="150"
                             header-align="center">
            </el-table-column>
            <el-table-column label="年初申报阶段"
                             align="center">
              <el-table-column prop="FProcessStatus"
                               label="年初申报"
                               width="110"
                               align="center">
                <template slot-scope="scope">
                  <div>
                    <el-radio :disabled="!update"
                              :label="'1'"
                              v-model="scope.row.FProcessStatus"></el-radio>
                  </div>
                </template>

              </el-table-column>
              <el-table-column prop="name"
                               label="起止时间"
                               width="290"
                               header-align="center">
                <template slot-scope="scope">
                  <div v-show="update"
                       class="block">
                    <el-date-picker v-model="scope.row.pickerDate1"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    format='yyyy-MM-dd'
                                    value-format='yyyy-MM-dd'
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="test"
                                    :picker-options="pickerOptions">
                    </el-date-picker>
                  </div>
                  <div v-show="!update">
                    <span>{{scope.row.StartDt.slice(0,10)+' 至 '+scope.row.EndDt.slice(0,10)}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="初报完成阶段"
                             width="110"
                             align="center">
              <template slot-scope="scope">
                <div>
                  <el-radio :disabled="!update"
                            label="2"
                            v-model="scope.row.FProcessStatus"> </el-radio>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="年中调整阶段"
                             align="center">
              <el-table-column prop="name"
                               label="年中调整"
                               width="110"
                               align="center">
                <template slot-scope="scope">
                  <div>
                    <el-radio :disabled="!update"
                              label="3"
                              v-model="scope.row.FProcessStatus"> </el-radio>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name"
                               label="起止时间"
                               width="290"
                               header-align="center">
                <template slot-scope="scope">
                  <div v-show="update"
                       class="block">
                    <el-date-picker v-model="scope.row.pickerDate2"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    format='yyyy-MM-dd'
                                    value-format='yyyy-MM-dd'
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="test"
                                    :picker-options="pickerOptions">
                    </el-date-picker>
                  </div>
                  <div v-show="!update">
                    <span>{{scope.row.StartDt2.slice(0,10)+' 至 '+scope.row.EndDt2.slice(0,10)}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="调整完成阶段"
                             width="110"
                             align="center">
              <template slot-scope="scope">
                <div>
                  <el-radio :disabled="!update"
                            label="4"
                            v-model="scope.row.FProcessStatus"> </el-radio>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </div>
      <div class="pageArea">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageindex"
                       :page-sizes="[30,50,100,150,200]"
                       :page-size="pagesize"
                       layout="total,sizes,prev,pager,next,jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog modal-append-to-body
               width="600px"
               :visible.sync="dialogVisible"
               title="批量设置"
               :close-on-click-modal="false">
      <div class="allSetting">
        <div class="setContent">
          <p>进度设置</p>
          <div>
            <el-radio v-model="radio"
                      label='1'>年初申报</el-radio>
            <el-radio v-model="radio"
                      label='2'>年初申报完成</el-radio>
            <el-radio v-model="radio"
                      label='3'>年中调整</el-radio>
            <el-radio v-model="radio"
                      label='4'>年中调整完成</el-radio>
          </div>
          <div v-show="datepickShow">
            <span>{{dateTitle}}</span>
            <el-date-picker v-model="setDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <p>
          <span @click="dialogVisible=false"
                class="whiteBtn">取消</span>
          <span @click="settingConfirm"
                class="btn">确定</span>
        </p>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
import { mapState } from 'vuex'
import { PorcessList, DistinctList, ProcessCtrl, ProcessTime } from '@/api/progresscontrol'
export default {
  name: 'progresscontrol',
  data () {
    return {
      datepickShow: true,//显示批量设置时间选择
      setDate: '',//批量设置时间选择器值
      radio: '1',
      dateTitle: '年初申报起止时间:',
      dialogVisible: false,//显示批量设置
      update: false,//表单可编辑状态
      tableH: '500',//表格高度
      defaultProps: {
        children: 'children',
        label: 'OName'
      },

      checkedOrg: {},//选中的组织
      filterText: '',
      pageindex: 1,
      pagesize: 30,
      total: 0,
      tableData: [],
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
  mounted () {
    let vm = this;
    window.addEventListener("resize", vm.setTableH)
    this.checkedOrg = {
      PhId: this.$store.state.user.orgid,
      OCode: this.$store.state.user.orgcode,
      OName: this.$store.state.user.orgname
    }
    this.getData();
    this.$nextTick(function () {
      //设置table列表高度
      this.setTableH();

      //高亮选中的组织
      this.$refs.orgtree.setCurrentNode({ OCode: this.checkedOrg.OCode })
    })
    // this.getOrglist();

  },
  beforeDestroy () {
    let vm = this;
    window.removeEventListener("resize", vm.setTableH)
  },
  methods: {
    test (val) {
      console.log(val)
    },
    refresh () {
      this.filterText = '';
      this.getData();
    },
    getData () {
      this.update = false;
      let data = {
        FYear: this.$store.state.user.year,
        FOcode: this.checkedOrg.OCode,
        PageIndex: this.pageindex - 1,
        PageSize: this.pagesize,
      }
      PorcessList(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)
        } else {

          this.tableData = res.Record;
          this.total = res.totalRows;
          this.tableData.map(data => { //时间控件已数组接收起止时间参数
            this.$set(data, 'pickerDate1', [data.StartDt.slice(0, 10), data.EndDt.slice(0, 10)])
            this.$set(data, 'pickerDate2', [data.StartDt2, data.EndDt2])
            console.log(data)
            //  data.pickerDate1 = [new Date(data.StartDt.slice(0, 10)), new Date(data.EndDt.slice(0, 10))];
            //   data.pickerDate2 = [new Date(data.StartDt2.slice(0, 10)), new Date(data.EndDt2.slice(0, 10))];
          })
        }
      }).catch(err => {
        console.log(err)
        this.$msgBox.error('获取进度控制数据失败!')
      })
    },
    //保存
    save () {
      this.tableData.map(data => {
        data.StartDt = data.pickerDate1[0];
        data.EndDt = data.pickerDate1[1];
        data.StartDt2 = data.pickerDate2[0];
        data.EndDt2 = data.pickerDate2[1];
      })
      let data = {
        infodata: this.tableData
      }
      ProcessCtrl(data).then(res => {
        if (res.Status == 'success') {
          this.$msgBox.show(res.Msg)
          this.getData();
        } else {
          this.$msgBox.error(res.Msg)
        }
      }).catch(err => {
        console.log(err)
        this.$msgBox.error('保存数据失败!')
      })
    },

    //获取用户下的组织
    // getOrglist () {
    //   let data = {
    //     UserId: this.$store.state.user.userid
    //   }
    //   DistinctList(data).then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    //切换每页显示数量
    handleSizeChange (val) {
      this.pagesize = val;
      this.getData();
    },
    //
    handleCurrentChange (val) {
      this.pageindex = val;
      this.getData();
    },
    //设置table高度
    setTableH () {
      let tableCon = document.querySelector('.progresscontrol .tableCon');
      let h = window.getComputedStyle(tableCon).height;
      this.tableH = parseFloat(h) - 30 + 'px';
    },
    //
    settingShow () {
      this.dialogVisible = true;
      this.radio = '1';
      this.setDate = []
    },
    //批量设置完成
    settingConfirm () {
      let date1, date2;
      let vm = this;
      if (this.setDate.length) {
        date1 = this.setDate[0].getFullYear() + '-' + (this.setDate[0].getMonth() < 9 ? '0' + (this.setDate[0].getMonth() + 1) : (this.setDate[0].getMonth() + 1)) + '-' + this.setDate[0].getDate();
        date2 = this.setDate[1].getFullYear() + '-' + (this.setDate[1].getMonth() < 9 ? '0' + (this.setDate[1].getMonth() + 1) : (this.setDate[1].getMonth() + 1)) + '-' + this.setDate[1].getDate();

      }


      let data = {
        FOcode: this.checkedOrg.OCode,
        FProcessStatus: this.radio,

        StartDt: date1,

        EndDt: date2,

        StartDt2: date1,

        EndDt2: date2,
      }
      ProcessTime(data).then(res => {

        if (res.Status == 'success') {

          this.$msgBox.show({
            content: res.Msg,
            fn: () => {
              vm.dialogVisible = false;
              vm.getData();
            }
          });

        } else {
          this.$msgBox.error(res.Msg);
        }
      }).catch(err => {
        console.log(err)
        this.$msgBox.error('批量设置失败!')
      })

    },
    //切换组织
    orgChange (val) {
      if (val.WeChatId != 'false') {
        this.getData()
      }
    },
    //组织过滤
    filterNode (value, data) {
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
    },
    radio (val) {
      if (val == '1' || val == '3') {
        this.datepickShow = true;
        this.dateTitle = val == '1' ? '年初申报起止时间:' : '年中调整起止时间:'
      } else {
        this.datepickShow = false;
      }
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
    bottom: 20px;
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
      padding-bottom: 60px;
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
    > div {
      // height: 100%;
      // overflow: auto;
    }
  }
}
.allSetting {
  border-top: 1px solid #ccc;
  > p {
    text-align: right;
    > span {
      margin-right: 20px;
    }
  }
  .setContent {
    height: 140px;
    padding: 10px;
    > div {
      margin: 10px 0 10px 20px;
    }
  }
}
</style>
<style lang="scss">
.progresscontrol .disableOrg {
  color: $orgdisabled;
}
.progresscontrol .tableCon .el-input__inner {
  width: 100%;
}
.progresscontrol {
  .el-dialog {
    text-align: left;
  }
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 20px;
  }
}
.headerClass > th,
.headerClass {
  background: $btnColor !important;
  color: #fff;
}
</style>
<style>
.progresscontrol .tableCon .el-radio span.el-radio__label {
  display: none;
}
.progresscontrol .tableCon .el-date-editor .el-range-separator {
  padding: 0;
}
</style>

