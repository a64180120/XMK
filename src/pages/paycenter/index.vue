<template>
  <div class="payIndex">
    <top-handle @refresh="getData" title="支付中心在线工作平台">
      <div class="navs">
        <div
          v-if="menubutton.paycenter_maintain=='True'"
          class="nav handle"
          @click="payNav('payListData')"
          style="margin-left:0;"
        >
          <img src="../../assets/images/sfk.png" alt />
          <div>收付款信息维护</div>
        </div>
        <div
          v-if="menubutton.paycenter_mergepay=='True'"
          class="nav handle"
          @click="payNav('mergePayData')"
        >
          <img src="../../assets/images/hb.png" alt />
          <div>合并支付</div>
        </div>
        <div
          v-if="menubutton.paycenter_catch=='True'"
          class="nav handle"
          @click="payNav('payErrorHandleData')"
        >
          <img src="../../assets/images/yc.png" alt />
          <div>异常处理</div>
        </div>
        <div
          v-if="menubutton.paycenter_check=='True'"
          class="nav handle"
          @click="payNav('approvalData')"
        >
          <img src="../../assets/images/ss.png" alt />
          <div>送审</div>
        </div>
        <div @click.stop="printTables" class="nav handle">
          <img src="@/assets/images/dy.png" style="width:28px" alt />
          <!-- @click="creatPayItem()"-->
          <div>打印</div>
        </div>
      </div>
    </top-handle>
    <!-- 主体内容 -->
    <div class="container">
      <div class="formArea">
        <div class="btnArea">
          <i
            class="el-icon-d-arrow-left iicon"
            style="position:absolute;left:0;top: .12rem;"
            @click.stop="unionStateScroll(false)"
          ></i>
          <i
            class="el-icon-d-arrow-right iicon"
            style="position:absolute;right:275px;top: .12rem;"
            @click.stop="unionStateScroll(true)"
          ></i>
          <div class="scrollNav">
            <div>
              <ul>
                <li>
                  <span>支付单据</span>
                  <el-select
                    @change="selectType"
                    collapse-tags
                    v-model="type"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="item in typeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>支付状态</span>
                  <el-select
                    @change="selectStatus"
                    collapse-tags
                    v-model="status"
                    multiple
                    placeholder="请选择"
                    size="small"
                    @visible-change="statusBlur"
                    @remove-tag="getData"
                  >
                    <el-option
                      v-for="item in statusList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span>申报日期</span>
                  <el-date-picker
                    v-model="sbrq"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="getData"
                  ></el-date-picker>
                </li>
                <li>
                  <span>支付日期</span>
                  <el-date-picker
                    v-model="zfrq"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                    @change="getData"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </li>
              </ul>
            </div>
          </div>
          <label class="searchArea" style="float: right">
            <search-input placeholder="支付单编号/申请单编号" v-model="search" @btnClick="getData"></search-input>
          </label>
        </div>
        <div class="tableHead" style="margin-top:10px;">
          <table>
            <colgroup>
              <col width="7%" />
              <col width="15%" />
              <col width="13%" />
              <col width="13%" />
              <col width="13%" />
              <col width="13%" />
              <col width="13%" />
              <col width="13%" />
              <col width="10%" />
              <col width="10%" />
              <col width="13%" />
            </colgroup>
            <thead>
              <tr>
                <td :class="{trActive:checkAll}" @click.self="selectAll">
                  <el-checkbox v-model="checkAll" @change="handleCheckAll">序号</el-checkbox>
                </td>
                <td v-for="(item,index) in tableHeader" :key="index">{{item.label}}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tableBody">
          <table v-if="tableData.length" ref="printArea">
            <colgroup>
              <col width="7%" />
              <col width="15%" />
              <col width="13%" />
              <col width="13%" />
              <col width="13%" />
              <col width="13%" />
              <col width="13%" />
              <col width="13%" />
              <col width="10%" />
              <col width="10%" />
              <col width="13%" />
            </colgroup>
            <tbody>
              <tr
                :class="{trActive:item.Mst.checked}"
                v-for="(item,index) in tableData"
                :key="index"
              >
                <td @click.self="selectItem(item)">
                  <el-checkbox v-model="item.Mst.checked" @change="handleCheckOne(item)">{{index+1}}</el-checkbox>
                </td>
                <td @click.stop="payNav('payListData',item)" class="atype">
                  <span>{{item.Mst.FCode}}</span>
                </td>
                <td>
                  <div style="text-align:right;">{{item.Mst.FAmountTotal | NumFormat}}</div>
                </td>
                <td>
                  <div style="text-align:right;">
                    <template v-if="item.Mst.FState==1">{{item.Mst.FAmountTotal | NumFormat}}</template>
                    <template
                      v-else-if="item.Mst.FState==2"
                    >{{item.Dtls.reduce((prev,cur)=>{return cur.FState==1?cur.FAmount*100+prev:0+prev},0)/100 | NumFormat}}</template>
                    <template v-else>{{0 | NumFormat}}</template>
                  </div>
                </td>
                <td>
                  <div>{{typeList.find(i=>item.Mst.FBilltype == i.value).label}}</div>
                </td>
                <td class="atype" @click="openRefbill(item.Mst.RefbillPhid)">
                  <div>{{item.Mst.RefbillCode}}</div>
                </td>
                <td>
                  <el-tooltip :content="item.Mst.RefbillName">
                    <p>{{item.Mst.RefbillName}}</p>
                  </el-tooltip>
                </td>
                <td>
                  <el-tooltip :content="item.Mst.NgInsertDt.replace('T',' ')">
                    <p>{{item.Mst.NgInsertDt.replace('T',' ')}}</p>
                  </el-tooltip>
                </td>
                <td class="atype" @click="openAuditfollow(item.Mst.PhId)">
                  <div v-if="item.Mst.FApproval==0">待送审</div>
                  <div v-else-if="item.Mst.FApproval==1">审批中</div>
                  <div v-else-if="item.Mst.FApproval==2">未通过</div>
                  <div v-else-if="item.Mst.FApproval==9">审批通过</div>
                  <div v-else>————</div>
                </td>
                <td>
                  <div v-if="item.Mst.FState==0">待支付</div>
                  <div v-else-if="item.Mst.FState==1">支付成功</div>
                  <div v-else-if="item.Mst.FState==2">支付异常</div>
                  <div v-else-if="item.Mst.FState==3">支付中</div>
                  <div v-else>————</div>
                </td>
                <td>
                  <el-tooltip
                    :content="item.Mst.FSubmitdate?item.Mst.FSubmitdate.replace('T',' '):'————'"
                  >
                    <p>{{item.Mst.FSubmitdate?item.Mst.FSubmitdate.replace('T',' '):"————"}}</p>
                  </el-tooltip>
                </td>
              </tr>
            </tbody>
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
          :page-sizes="[20,30,50,100]"
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
    <!-- 合并支付 -->
    <merge-pay v-if="mergePayData.openDialog" :data="mergePayData"></merge-pay>
    <!-- 异常处理 -->
    <pay-error-handle v-if="payErrorHandleData.openDialog" :data="payErrorHandleData"></pay-error-handle>
    <!-- 送审 -->
    <go-approval v-if="approvalData.openDialog" :bType="'002'" :data="approvalData"></go-approval>
    <!-- 审批流程 -->
    <auditfollow :auditMsg="auditMsg" :visible="showAuditfollow" @update:visible="closeAuditFollow"></auditfollow>
    <!-- 资金拨付单查看 -->
    <el-dialog
      append-to-body
      v-if="fundDetailData.openDialog"
      :visible.sync="fundDetailData.openDialog"
      width="80%"
      :close-on-click-modal="false"
      class="dialog detail-dialog payCenter"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left;">查看申请</span>
      </div>
      <apply-bill :applyNum="applyNum" :subData="[]">
        <div slot="btn-group">
          <el-button v-show="false" class="btn" size="mini">打印</el-button>
        </div>
      </apply-bill>
    </el-dialog>
  </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle.vue'
import auditfollow from '@/components/auditFollow/auditfollow'
import applyBill from '@/components/applyBill/applybill'
import searchInput from '@/components/searchInput/searchInput'
import payList from './payList.vue'
import mergePay from './mergePay.vue'
import payErrorHandle from './payErrorHandle.vue'
import goApproval from './goApproval.vue'
import { mapState } from 'vuex'
import { printTable } from '@/api/upload'
export default {
  name: 'pay',
  components: {
    topHandle,
    payList,
    mergePay,
    payErrorHandle,
    goApproval,
    searchInput,
    auditfollow,
    applyBill
  },
  provide() {
    return { refreshIndexData: this.getData }
  },
  data() {
    return {
      applyNum: '',
      auditMsg: [],
      showAuditfollow: false,
      needSet: true,
      // dialog数据
      fundDetailData: { openDialog: false },
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
          value: '001',
          label: '资金拨付单'
        },
        {
          value: '002',
          label: '支付单'
        },
        {
          value: '003',
          label: '项目用款单'
        },
        {
          value: '004',
          label: '预算审核单'
        },
        {
          value: '005',
          label: '项目申报单'
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
        },
        {
          value: 3,
          label: '支付中'
        }
      ],
      status: [0, 2],
      // 搜索数据
      search: '',
      // 分页
      pageSize: 20,
      currentPage: 1,
      total: 0,
      // 首页表格数据
      tableHeader: [
        {
          label: '支付单编号',
          width: 200
        },
        {
          label: '应付金额（元）'
        },
        {
          label: '实付金额（元）'
        },
        {
          label: '单据类型'
        },
        {
          label: '申请单编号'
        },
        {
          label: '申请单名称'
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
      tableData: []
    }
  },
  created() {},
  mounted() {
    this.getData()
  },
  methods: {
    printTables() {
      let vm = this
      printTable(vm)
    },
    //滚动
    unionStateScroll(bool) {
      var union = document.getElementsByClassName('scrollNav')[0]
      var unionStateCon = document.getElementsByClassName('scrollNav')[0]
        .firstElementChild
      let unionStateConChild = unionStateCon.firstElementChild
      let eleChildren = unionStateConChild.childNodes
      let unionStateConWidth = 0
      let scrollWidth = 200
      for (var i in eleChildren) {
        if (eleChildren[i].nodeType == 1) {
          unionStateConWidth += eleChildren[i].clientWidth + 15
        }
      }
      unionStateCon.style.width = unionStateConWidth + 'px'

      var pWidth = parseInt(window.getComputedStyle(union).width) //父级宽度
      //return;
      let gap = unionStateConWidth - pWidth

      if (!parseInt(unionStateCon.style.right)) {
        unionStateCon.style.right = '0px'
      }
      if (bool) {
        if (parseInt(unionStateCon.style.right) > gap) {
          return
        } else {
          let rig = parseInt(unionStateCon.style.right)
          if (rig + scrollWidth > gap) {
            rig = gap
          } else {
            rig = rig + scrollWidth
          }
          unionStateCon.style.right = rig + 'px'
        }
      } else {
        if (parseInt(unionStateCon.style.right) <= 0) {
          return
        } else {
          unionStateCon.style.right =
            parseInt(unionStateCon.style.right) < scrollWidth
              ? 0
              : parseInt(unionStateCon.style.right) - scrollWidth + 'px'
        }
      }
    },
    openRefbill(PhId) {
      this.applyNum = PhId.toString()
      this.fundDetailData.openDialog = true
    },
    openAuditfollow(PhId) {
      let that = this
      this.getAxios('GSP/GAppvalRecord/GetAppvalRecordList', {
        RefbillPhid: PhId,
        FBilltype: '002'
      })
        .then(res => {
          if (res && res.Status === 'success') {
            that.auditMsg = res.Data
            that.showAuditfollow = true
          } else {
            that.$msgBox.show(res.Msg)
          }
        })
        .catch(err => {
          that.$msgBox.show('获取审批流程数据异常')
        })
    },
    closeAuditFollow() {
      this.showAuditfollow = false
    },
    selectItem(item) {
      item.Mst.checked = !item.Mst.checked
    },
    getData() {
      this.showAuditfollow = false
      let query = {
        'NgInsertDt*date*ge*1': this.sbrq ? this.sbrq[0] || '' : '', //申报日期开始
        'NgInsertDt*date*le*1': this.sbrq ? this.sbrq[1] || '' : '', //申报日期结束
        'FDate*date*ge*1': this.zfrq ? this.zfrq[0] || '' : '', //支付日期开始
        'FDate*date*le*1': this.zfrq ? this.zfrq[1] || '' : '', //支付日期结束
        'FApproval*byte*eq*1': '', //审批状态0- 待送审 1-待审批 2- 未通过 9-审批通过
        'FBilltype*str*eq*1': this.type, //关联单据类型
        '[or-dictionary0]*dictionary*or': {
          'RefbillCode*str*like*1': this.search.toString(),
          'FCode*str*like*1': this.search.toString()
        },
        'OrgCode*str*like*1': this.orgcode,
        'FYear*str*like*1': this.year
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
      // this.getAxios('GGK/GKPaymentMstApi/GetPaymentList', {
      this.getAxios('GGK/GKPaymentMstApi/GetPaymentList4Zjbf', {
        queryfilter: JSON.stringify(query),
        PageIndex: this.currentPage - 1, //当前第几页，从0开始
        PageSize: this.pageSize, //每页显示行数
        uid: this.userid || 488181024000001, //用户id
        orgid: this.orgid, //组织id
        ryear: this.year || '2019'
      })
        .then(res => {
          console.log(res)
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          this.total = res.totalRows
          this.tableData = res.Record.map(item => {
            item.Mst.checked = false
            return item
          })
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.error('获取支付单列表失败！')
        })
    },
    // 主体全选事件
    handleCheckAll(val) {
      this.tableData.forEach(item => {
        item.Mst.checked = val
      })
    },
    selectAll() {
      var tf = !this.checkAll
      this.tableData.forEach(item => {
        item.Mst.checked = tf
      })
    },
    handleCheckOne(item) {
      console.log(item)
    },
    // 导航栏事件
    payNav(type, item) {
      this.showAuditfollow = false
      if (item) {
        if (item.Mst.FApproval == 0 || item.Mst.FApproval == 2) {
          this.payListData.itemType = 'notApprove'
        } else if (item.Mst.FState == 2) {
          this.payListData.itemType = 'error'
        } else if (item.Mst.FState == 0 && item.Mst.FApproval == 9) {
          this.payListData.itemType = 'pay'
        } else if (item.Mst.FState == 1) {
          this.payListData.itemType = 'success'
        } else {
          this.payListData.itemType = ''
        }
      } else {
        var handleitem = []
        let checkedCount = this.tableData.reduce((prev, cur) => {
          if (cur.Mst.checked) handleitem.push(cur)
          return prev + cur.Mst.checked
        }, 0)
        console.log(handleitem)
        if (handleitem.length < 1) {
          this.$msgBox.error({
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
              this.$msgBox.error({
                content: '请选择一条数据进行维护。',
                fn: () => {}
              })
              return
            } else if (
              handleitem[0].Mst.FApproval == 0 ||
              handleitem[0].Mst.FApproval == 2
            ) {
              this.payListData.itemType = 'notApprove'
            } else {
              this.$msgBox.error({
                content:
                  handleitem[0].Mst.FApproval == 1
                    ? '单据正在审批中。'
                    : '单据已经审批通过。',
                fn: () => {}
              })
              return
            }
            break
          case 'mergePayData':
            if (
              !handleitem.every(item => {
                return item.Mst.FApproval == 9 && item.Mst.FState == 0
              })
            ) {
              this.$msgBox.error({
                content:
                  "只有审批状态为“<span class='dangerText'>审批通过</span>”，支付状态为“<span class='dangerText'>待支付</span>”的单据，才可以使用【合并支付】。",
                fn: () => {}
              })
              return
            }
            break
          case 'payErrorHandleData':
            if (
              !handleitem.every(item => {
                return item.Mst.FState == 2 || item.Mst.FState == 3
              })
            ) {
              this.$msgBox.error('只能对支付异常和支付中的单据进行处理。')

              return
            } else if (
              handleitem.some(item => {
                return item.Dtls.some(item => item.FNewCode)
              })
            ) {
              this.$msgBox.error('只能对未重新支付的单据进行处理。')
              return
            }
            break
          case 'approvalData':
            if (
              !handleitem.every(item => {
                return item.Mst.FApproval == 0
              })
            ) {
              this.$msgBox.error('只能对待送审的单据进行处理。')
              return
            }
            if (
              !handleitem.every(item => {
                return (
                  item.Mst.FPaymethod != 0 &&
                  item.Dtls.every(subitem => {
                    return !!subitem.BankPhid && !!subitem.FRecAcnt
                  })
                )
              })
            ) {
              this.$msgBox.error('请先维护收付款信息！')
              return
            }
            break
        }
      }
      this[type].data = item ? [item] : handleitem
      this[type].openDialog = true
    },
    // 筛选
    selectType(cur) {
      console.log(cur, this.type)
      this.getData()
    },
    selectStatus(cur) {
      if (cur && cur.length > 0) {
        if (cur[cur.length - 1] === '') {
          this.status = ['']
        } else if (cur.includes('')) {
          cur.splice(cur.findIndex(item => item === ''), 1)
        } else if (cur.length == this.statusList.length - 1) {
          this.status = ['']
        }
      }
    },
    statusBlur(visible) {
      if (!visible) this.getData()
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
  },
  computed: {
    checkAll() {
      return this.tableData.every(item => item.Mst.checked)
    },
    ...mapState({
      orgid: state => state.user.orgid,
      userid: state => state.user.userid,
      year: state => state.user.year,
      menubutton: state => state.user.menubutton,
      orgcode: state => state.user.orgcode
    })
  },
  beforeDestroy() {
    window.onresize = function() {}
  }
}
</script>
<style lang="scss" scoped>
.payIndex {
  color: #333;
  font-size: 0.16rem;
  .navs {
    height: 60px;
    > .nav {
      display: inline-block;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 10px;
      }
      > img {
        width: 30px;
      }
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
    min-width: 1200px;
    .btns {
      position: absolute;
      top: 8px;
      right: 0px;
    }
    .pages {
      position: absolute;
      bottom: 10px;
      right: 1%;
    }
  }
}
</style>

<style lang='scss'>
.payIndex {
  .scrollNav .el-select__tags {
    position: absolute;
    left: 0;
  }
  .el-input__inner.el-date-editor--datetimerange.el-range-editor--small {
    position: relative;
    top: 1px;
  }
  .el-checkbox,
  .el-checkbox__input.is-checked + .el-checkbox__label,
  .el-checkbox-button__inner {
    color: #333;
  }
  .el-checkbox__label {
    font-size: 0.14rem;
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
  p.el-tooltip {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.payCenter .el-dialog__body {
  padding-top: 0px;
}
.el-tooltip__popper > span {
  display: inline-block;
  max-width: 300px;
}
.el-input__inner {
  vertical-align: middle;
  line-height: 30px;
}
</style>
