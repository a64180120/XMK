<template>
  <div class="payIndex">
    <top-handle @refresh="getData" title="支付中心在线工作平台">
      <div class="navs">
        <div class="nav" @click="payNav('payListData')">
          <img src="../../assets/images/sfk.png" alt>
          <div>收付款信息维护</div>
        </div>
        <div class="nav" @click="payNav('mergePayData')">
          <img src="../../assets/images/hb.png" alt>
          <div>合并支付</div>
        </div>
        <div class="nav" @click="payNav('payErrorHandleData')">
          <img src="../../assets/images/yc.png" alt>
          <div>异常处理</div>
        </div>
        <div class="nav" @click="payNav('approvalData')">
          <img src="../../assets/images/ss.png" alt>
          <div>送审</div>
        </div>
      </div>
    </top-handle>
    <!-- 主体内容 -->
    <div class="container">
      <div class="formArea">
        <div class="selects">
          <span>支付单据</span>
          <el-select
            @change="selectType"
            collapse-tags
            v-model="type"
            placeholder="请选择"
            size="mini"
            style="width:110px"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>支付状态</span>
          <el-select
            @change="selectStatus"
            collapse-tags
            v-model="status"
            multiple
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>申报日期</span>
          <el-date-picker
            v-model="sbrq"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="large-input"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <span>支付日期</span>
          <el-date-picker
            v-model="zfrq"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="large-input"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <div class="btns">
            <div class="search">
              <search-input @btnClick="getData"></search-input>
            </div>
          </div>
        </div>
        <div class="tableHead">
          <table>
            <colgroup>
              <col width="5%">
              <col width="13%">
              <col width="13%">
              <col width="10%">
              <col width="13%">
              <col width="13%">
              <col width="10%">
              <col width="10%">
              <col width="13%">
            </colgroup>
            <thead>
              <tr>
                <td title="序号">
                  <el-checkbox v-model="checkAll" @change="handleCheckAll">序号</el-checkbox>
                </td>
                <td
                  v-for="(item,index) in tableHeader"
                  :key="index"
                  :title="item.label"
                >{{item.label}}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tableBody">
          <table v-if="tableData.length">
            <colgroup>
              <col width="5%">
              <col width="13%">
              <col width="13%">
              <col width="10%">
              <col width="13%">
              <col width="13%">
              <col width="10%">
              <col width="10%">
              <col width="13%">
            </colgroup>
            <thead>
              <tr v-for="(item,index) in tableData" :key="index">
                <td>
                  <el-checkbox v-model="item.checked" @change="handleCheckOne(item)">{{index+1}}</el-checkbox>
                </td>
                <td>
                  <div @click="payNav('payListData',item)" style="cursor:pointer">{{item.FCode}}</div>
                </td>
                <td>
                  <div>{{item.FAmountTotal | NumFormat}}</div>
                </td>
                <td>
                  <div>{{item.FBilltype}}</div>
                </td>
                <td>
                  <div>{{item.RefbillCode}}</div>
                </td>
                <td>
                  <div>{{item.NgInsertDt.replace('T',' ')}}</div>
                </td>
                <td>
                  <div>
                    <template v-if="item.FApproval==0">待送审</template>
                    <template v-else-if="item.FApproval==1">审批中</template>
                    <template v-else-if="item.FApproval==2">未通过</template>
                    <template v-else-if="item.FApproval==9">审批通过</template>
                    <template v-else>————</template>
                  </div>
                </td>
                <td>
                  <div>
                    <template v-if="item.FState==0">待支付</template>
                    <template v-else-if="item.FState==1">支付成功</template>
                    <template v-else-if="item.FState==2">支付异常</template>
                    <template v-else>————</template>
                  </div>
                </td>
                <td>
                  <div>{{item.FDate?item.FDate.replace('T',' '):"————"}}</div>
                </td>
              </tr>
            </thead>
          </table>
          <div v-else style="height:40px;font-size:0.16rem;line-height:40px;">暂无数据</div>
        </div>
      </div>
      <div class="pages">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          layout="total,sizes,prev,pager,next,jumper"
          @current-change="getData"
          :total="total"
        >
          <!-- <span>当前 第 {{currentPage}} 页</span>
          <span>共 {{Math.ceil(total/pageSize)}} 页</span>
          <span
            @click="currentPage!=1?changePage(1):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==1}"
          >首页</span>
          <span
            @click="currentPage!=1?currentPage--:'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==1}"
          >上一页</span>
          <span
            @click="currentPage!=(Math.ceil(total/pageSize))?(currentPage++):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==(Math.ceil(total/pageSize))}"
          >下一页</span>
          <span
            @click="currentPage!=(total%pageSize>0?total%pageSize+1:total%pageSize)?currentPage=(Math.ceil(total/pageSize)):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==Math.ceil(total/pageSize)}"
          >最后一页</span>-->
        </el-pagination>
      </div>
    </div>
    <!-- 支付单查看 -->
    <pay-list v-if="payListData.openDialog" :data="payListData"></pay-list>
    <merge-pay v-if="mergePayData.openDialog" :data="mergePayData"></merge-pay>
    <pay-error-handle v-if="payErrorHandleData.openDialog" :data="payErrorHandleData"></pay-error-handle>
    <go-approval v-if="approvalData.openDialog" :data="approvalData"></go-approval>
  </div>
</template>

<script>
import topHandle from '../../components/topNav/topHandle.vue'
import searchInput from '../../components/searchInput/searchInput'
import payList from './payList.vue'
import mergePay from './mergePay.vue'
import payErrorHandle from './payErrorHandle.vue'
import goApproval from './goApproval.vue'
export default {
  name: 'pay',
  components: {
    topHandle,
    payList,
    mergePay,
    payErrorHandle,
    goApproval,
    searchInput
  },
  data() {
    return {
      // dialog数据
      fundDetailData: { openDialog: false, data: {} },
      mergePayData: { openDialog: false, data: {} },
      payListData: {
        openDialog: false,
        data: {},
        itemType: 'notApprove'
      },
      payErrorHandleData: {
        openDialog: false,
        data: {}
      },
      approvalData: {
        openDialog: false,
        data: {}
      },
      radio: '',
      itemType: '',
      tishi: false,
      message: '',
      // 筛选数据
      sbrq: [],
      zfrq: [],
      typeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'zjbf',
          label: '资金拨付单'
        },
        {
          value: 'xmzc',
          label: '项目支出单'
        }
      ],
      type: '',
      statusList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '待支付'
        },
        {
          value: 2,
          label: '支付异常'
        },
        {
          value: 1,
          label: '支付成功'
        }
      ],
      status: '',
      // 搜索数据
      search: '',
      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 0,
      // 首页表格数据
      tableHeader: [
        {
          label: '支付单编号',
          width: 200
        },
        {
          label: '支付金额'
        },
        {
          label: '单据类型'
        },
        {
          label: '申请单编号'
        },
        {
          label: '申报日期'
        },
        {
          label: '审批状态'
        },
        {
          label: '支付状态'
        },
        {
          label: '支付日期'
        }
      ],
      tableData: [],
      checkAll: false
    }
  },
  created() {
    var res = {
      totalRows: 44,
      Record: [
        {
          PhId: 1,
          OrgPhid: 521180820000001,
          OrgCode: '1',
          RefbillPhid: 1,
          RefbillCode: 'zfbf00011',
          FCode: 'zf0001',
          FPaymethod: 1,
          FAmountTotal: 2000.0,
          FApproval: 1,
          FState: 0,
          FDescribe: '测试',
          FDate: null,
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2018-12-25T11:26:23',
          NgUpdateDt: '2018-12-25T11:26:23',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 521180820000001
        },
        {
          PhId: 2,
          OrgPhid: 521180820000001,
          OrgCode: '1',
          RefbillPhid: 2,
          RefbillCode: 'zfbf0002',
          FCode: 'zf0002',
          FPaymethod: 1,
          FAmountTotal: 2002.0,
          FApproval: 2,
          FState: 0,
          FDescribe: '测试',
          FDate: null,
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2019-12-20T11:00:23',
          NgUpdateDt: '2019-12-20T11:00:23',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 521180820000001
        },
        {
          PhId: 3,
          OrgPhid: 521180820000001,
          OrgCode: '1',
          RefbillPhid: 3,
          RefbillCode: 'zfbf0003',
          FCode: 'zf0001',
          FPaymethod: 1,
          FAmountTotal: 2003.0,
          FApproval: 9,
          FState: 0,
          FDescribe: '测试',
          FDate: null,
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2018-12-25T11:26:23',
          NgUpdateDt: '2018-12-25T11:26:23',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 521180820000001
        },
        {
          PhId: 4,
          OrgPhid: 521180820000001,
          OrgCode: '1',
          RefbillPhid: 4,
          RefbillCode: 'zfbf0004',
          FCode: 'zf0001',
          FPaymethod: 1,
          FAmountTotal: 2004.0,
          FApproval: 9,
          FState: 1,
          FDescribe: '测试',
          FDate: null,
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2018-12-25T11:26:23',
          NgUpdateDt: '2018-12-25T11:26:23',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 521180820000001
        },
        {
          PhId: 5,
          OrgPhid: 521180820000001,
          OrgCode: '1',
          RefbillPhid: 5,
          RefbillCode: 'zfb8f0005',
          FCode: 'zf0001',
          FPaymethod: 1,
          FAmountTotal: 2005.0,
          FApproval: 9,
          FState: 2,
          FDescribe: '测试',
          FDate: null,
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2018-12-25T11:26:23',
          NgUpdateDt: '2018-12-25T11:26:23',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 521180820000001
        },
        {
          PhId: 127190529000001,
          OrgPhid: 547181121000001,
          OrgCode: '100',
          RefbillPhid: 7,
          RefbillCode: 'zfbbf0007',
          FCode: 'P1559096542043',
          FPaymethod: 2,
          FAmountTotal: 2006.0,
          FApproval: 0,
          FState: 0,
          FDescribe: '单元测试-1559096542043',
          FDate: '2019-05-28T00:00:00',
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2019-05-29T10:22:25',
          NgUpdateDt: '2019-05-29T10:22:25',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 547181121000001
        },
        {
          PhId: 127190529000002,
          OrgPhid: 547181121000001,
          OrgCode: '100',
          RefbillPhid: 7,
          RefbillCode: 'zfbbf0007',
          FCode: 'P1559096586066',
          FPaymethod: 2,
          FAmountTotal: 2006.0,
          FApproval: 0,
          FState: 0,
          FDescribe: '单元测试-1559096586066',
          FDate: '2019-05-28T00:00:00',
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2019-05-29T10:23:06',
          NgUpdateDt: '2019-05-29T10:23:06',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 547181121000001
        },
        {
          PhId: 182190529000001,
          OrgPhid: 547181121000001,
          OrgCode: '100',
          RefbillPhid: 7,
          RefbillCode: 'zfbbf0007',
          FCode: 'P1559096718686',
          FPaymethod: 2,
          FAmountTotal: 2006.0,
          FApproval: 0,
          FState: 0,
          FDescribe: '单元测试-1559096718686',
          FDate: '2019-05-28T00:00:00',
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2019-05-29T10:25:22',
          NgUpdateDt: '2019-05-29T10:25:22',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 547181121000001
        },
        {
          PhId: 216190528000004,
          OrgPhid: 547181121000001,
          OrgCode: '1',
          RefbillPhid: 6,
          RefbillCode: 'zfbbf0006',
          FCode: 'P1559012223811',
          FPaymethod: 2,
          FAmountTotal: 2006.0,
          FApproval: 0,
          FState: 0,
          FDescribe: '单元测试-1559012223811',
          FDate: '2019-05-27T00:00:00',
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2019-05-28T10:57:03',
          NgUpdateDt: '2019-05-28T10:57:03',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 547181121000001
        },
        {
          PhId: 216190528000005,
          OrgPhid: 547181121000001,
          OrgCode: '1',
          RefbillPhid: 6,
          RefbillCode: 'zfbbf0006',
          FCode: 'P1559012283053',
          FPaymethod: 2,
          FAmountTotal: 2006.0,
          FApproval: 0,
          FState: 0,
          FDescribe: '单元测试-1559012283053',
          FDate: '2019-05-27T00:00:00',
          FBilltype: 'zjbf',
          FYear: null,
          PersistentState: 0,
          NgRecordVer: 1,
          NgInsertDt: '2019-05-28T10:58:03',
          NgUpdateDt: '2019-05-28T10:58:03',
          Creator: 521180820000001,
          Editor: 521180820000001,
          CurOrgId: 547181121000001
        }
      ],
      index: 0,
      size: 10
    }
    this.total = res.totalRows
    this.tableData = res.Record.map(item => {
      item.checked = false
      return item
    })
    // this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      var query = {
        'NgInsertDt*date*ge*1': this.sbrq ? this.sbrq[0] || '' : '', //申报日期开始
        'NgInsertDt*date*le*1': this.sbrq ? this.sbrq[1] || '' : '', //申报日期结束
        'FDate*date*ge*1': this.zfrq ? this.zfrq[0] || '' : '', //支付日期开始
        'FDate*date*le*1': this.zfrq ? this.zfrq[1] || '' : '', //支付日期结束
        'FApproval*byte*eq*1': '', //审批状态0- 待送审 1-待审批 2- 未通过 9-审批通过
        'FBilltype*str*eq*1': this.type, //关联单据类型
        '[or-dictionary0]*dictionary*or': {
          'RefbillCode*str*like*1': this.search.toString(),
          'FCode*str*like*1': this.search.toString()
        }
        // '[or-dictionary1]*dictionary*or': {
        //   'FState*byte*eq*1': 0,
        //   'FState*byte*eq*2': 1
        // }
      }
      function deleteBlank(obj, father) {
        for (let i in obj) {
          if (obj[i] === '') {
            delete obj[i]
            if (Object.keys(obj).length == 0 && father) {
              deleteBlank(father)
            }
          } else if (typeof obj[i] === 'object') {
            if (Object.keys(obj[i]).length > 0) {
              deleteBlank(obj[i], obj)
            } else {
              delete obj[i]
            }
          }
        }
      }
      if (this.status || this.status.length > 0) {
        if (this.status.length === 1) {
          query['FState*byte*eq*1'] = this.status[0]
        } else {
          query['[or-dictionary1]*dictionary*or'] = {}
          this.status.forEach((item, index) => {
            query['[or-dictionary1]*dictionary*or'][
              'FState*byte*eq*' + (index + 1)
            ] = item
          })
        }
      }
      deleteBlank(query)
      console.log(query)
      this.getAxios('/GKPaymentMstApi/GetPaymentList', {
        queryfilter: JSON.stringify(query),
        PageIndex: this.currentPage - 1, //当前第几页，从0开始
        PageSize: this.pageSize, //每页显示行数
        uid: '521180820000001', //用户id
        orgid: '547181121000001', //组织id
        ryear: '2019'
      })
        .then(res => {
          console.log(res)
          if (res.Status == 'error') {
            return
          }
          this.total = res.totalRows
          this.tableData = res.Record.map(item => {
            item.checked = false
            return item
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 主体全选事件
    handleCheckAll(val) {
      this.tableData.forEach(item => {
        item.checked = val
      })
    },
    handleCheckOne(item) {
      if (!item.checked) {
        this.checkAll = false
      } else {
        this.checkAll = this.tableData.every(item => item.checked)
      }
    },
    // 导航栏事件
    payNav(type, item) {
      this.noDataRefresh()
      if (item) {
        this
        if (item.FApproval == 0 || item.FApproval == 2) {
          this.payListData.itemType = 'notApprove'
        } else if (item.FState == 2) {
          this.payListData.itemType = 'error'
        } else if (item.FState == 0 && item.FApproval == 9) {
          this.payListData.itemType = 'pay'
        } else if (item.FState == 1) {
          this.payListData.itemType = 'success'
        } else {
          this.payListData.itemType = ''
        }
      } else {
        var handleitem = []
        let checkedCount = this.tableData.reduce((prev, cur) => {
          if (cur.checked) handleitem.push(cur)
          return prev + cur.checked
        }, 0)
        if (handleitem.length < 1) {
          this.$msgBox.show({
            content: '请至少选择一条数据进行操作。',
            fn: () => {
              console.log('test fn')
            }
          })
          return
        }
        switch (type) {
          case 'payListData':
            if (checkedCount != 1) {
              this.$msgBox.show('请选择一条数据进行维护。')
              return
            } else if (
              handleitem[0].FApproval == 0 ||
              handleitem[0].FApproval == 2
            ) {
              this.payListData.itemType = 'notApprove'
            } else {
              this.$msgBox.show(`单据已经${handleitem[0].FApproval}。`)
              return
            }
            break
          case 'mergePayData':
            if (
              !handleitem.every(item => {
                return item.FApproval == 9 && item.FState == 0
              })
            ) {
              this.$msgBox.show(
                '只有审批状态为“审批通过”，支付状态为“待支付”的单据，才可以使用【合并支付】。'
              )
              return
            }
            break
          case 'payErrorHandleData':
            if (
              !handleitem.every(item => {
                return item.FState == '支付异常'
              })
            ) {
              this.$msgBox.show('只能对支付异常的单据进行处理。')
              return
            }
            break
          case 'approvalData':
            if (
              !handleitem.every(item => {
                return item.FApproval == 0
              })
            ) {
              this.$msgBox.show('只能对待送审的单据进行处理。')
              return
            }
            break
        }
      }
      this[type].data = item || handleitem
      this[type].openDialog = true
    },
    // tableData无数据处理
    noDataRefresh() {
      if (this.tableData.length === 0) {
        this.notClosedAll = false
        this.showMask = true
        this.message = '暂无数据可以操作。'
        this.tishi = true
        return
      }
    },
    // 筛选
    selectType(cur) {
      console.log(cur, this.type)
    },
    selectStatus(cur) {
      if (cur && cur.length > 0) {
        if (cur[cur.length - 1] === '') {
          this.status = ['']
        } else if (cur.includes('')) {
          cur.splice(cur.findIndex(item => item === ''), 1)
        } else if (cur.length == 3) {
          this.status = ['']
        }
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    changePage(page) {
      console.log(page)
      this.currentPage = page
    }
  }
}
</script>
<style lang="scss" scoped>
.payIndex {
  color: #333;
  font-size: 0.16rem;
  .navs {
    padding-top: 7px;
    height: 60px;
    > .nav {
      display: inline-block;
      font-size: 0.12rem;
      color: #676767;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 60px;
      }
      > img {
        width: 30px;
      }
      // &::before {
      //   content: '';
      //   display: block;
      //   width: 100%;
      //   height: 27px;
      //   background-image: url(../../assets/images/zj6.png);
      //   background-repeat: no-repeat;
      //   background-size: contain;
      //   background-position: center 0;
      // }
      // &:first-child::before {
      //   background-image: url(../../assets/images/3_03.png);
      // }
    }
  }
  .tableBody table {
    border-collapse: separate;
    border-spacing: 0 10px;
    padding: 0 15px;
  }
  .tableHead table {
    border-collapse: separate;
    border-spacing: 0;
    padding: 0 15px;
  }

  .container {
    min-width: 1300px;
    .selects {
      text-align: left;
      line-height: 28px;
      height: 28px;
      margin: 8px 0;
      box-sizing: border-box;
      font-size: 0.12rem;
      color: #757575;
      > span:not(:first-of-type) {
        margin-left: 0px;
        @media screen and (min-width: 1430px) {
          margin-left: 10px;
        }
      }
      > span + div {
        width: 150px;
        margin-left: 0px;
        @media screen and (min-width: 1430px) {
          margin-left: 10px;
        }
        &.large-input {
          width: 280px;
        }
      }
      .btns {
        float: right;
      }
    }
    .pages {
      position: absolute;
      bottom: 10px;
      right: 1%;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
  }
  .dialogContainer {
    &.lowIndex {
      z-index: 1999;
    }
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2001;
    .payCenterDialog {
      &.smallDialog {
        width: 300px;
      }
      &.largeDialog {
        width: 80%;
      }
      z-index: 2001;
      background-color: #fff;
      width: 50%;
      padding: 20px;
      display: inline-block;
      vertical-align: middle;
      .header {
        text-align: left;
        font-size: 0.24rem;
        line-height: 0.24rem;
        height: 0.24rem;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        color: #535252;
        position: relative;
        i.el-icon-close {
          float: right;
          cursor: pointer;
          line-height: 0.24rem;
        }
      }
      .content {
        margin-top: 10px;
        text-align: left;
        font-size: 0.16rem;
        > span {
          line-height: 55px;
        }
        > .el-input {
          width: auto;
          line-height: 55px;
        }
        > img {
          width: 55px;
          height: 55px;
          margin-right: 10px;
        }
        &.payList {
          background-color: #f5f5f5;
          padding: 10px;
          margin-top: 15px;
          .payDetail {
            background-color: #fff;
            border-radius: 5px;
          }
          .getDetail {
            background-color: #fff;
          }
        }
      }
      .btns {
        text-align: right;
        padding-top: 10px;
        .btn {
          border: 1px solid $btnColor;
          cursor: pointer;
          &:not(:last-of-type) {
            margin-right: 10px;
          }
          &.btn-cancel {
            background: #fff;
            color: $btnColor;
            border: 1px solid $btnColor;
          }
          &.btn-large {
            width: 88px;
          }
        }
        .payId {
          float: left;
          line-height: 28px;
        }
      }
      .el-collapse {
        margin-top: 10px;
      }
    }
    &::after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
  }
}
</style>

<style lang='scss'>
.payIndex {
  .el-checkbox,
  .el-checkbox__input.is-checked + .el-checkbox__label,
  .el-checkbox-button__inner {
    color: #333;
  }
  .el-checkbox__label {
    font-size: 0.14rem;
  }
  .tableBody .el-checkbox__label {
    font-size: 0.12rem;
  }
  .selects {
    .el-input--mini .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
    .el-range-editor--mini.el-input__inner {
      height: 28px;
      line-height: 28px;
    }
    .el-input--mini,
    .el-select-dropdown__item,
    .el-range-editor--mini .el-range-separator,
    .el-range-editor--mini .el-range-input {
      font-size: 0.12rem;
      color: #757575;
    }
    .el-date-editor {
      padding: 3px 0;
      .el-input__icon.el-range__icon.el-icon-time {
        display: none;
      }
      .el-range-separator {
        width: 10%;
      }
      .el-range-input {
        width: 45%;
      }
    }
  }
  .el-pagination {
    color: #333;
    font-weight: normal;
    font-size: 0.14rem;
  }
  .el-pagination button,
  .el-pagination span:not([class*='suffix']) {
    font-size: 0.14rem;
  }
  .pages slot > span.changePage {
    text-decoration: underline;
    cursor: pointer;
    &.unclickable {
      cursor: not-allowed;
      color: #c0c4cc;
    }
  }
  .el-table td,
  .el-table th.is-leaf {
    border-color: rgb(204, 204, 204);
  }
  .el-table--border,
  .el-table--group {
    border-color: rgb(204, 204, 204);
  }
  .payCenterDialog {
    .el-table {
      font-size: 0.14rem;
      th {
        background-color: $btnColor;
        border-right-color: #fff;
      }
      thead {
        color: #fff;
      }
    }
    .el-collapse-item__header {
      font-size: 0.13rem;
      border-bottom: 0px;
    }
    .el-collapse-item__wrap {
      border-bottom: 0px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .el-table__header-wrapper thead .el-checkbox__label {
      color: #fff;
    }
    &.smallDialog {
      .el-radio__inner {
        width: 0.14rem;
        height: 0.14rem;
      }
      .el-radio__label {
        font-size: 0.14rem;
      }
      .el-radio:not(:last-of-type) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
