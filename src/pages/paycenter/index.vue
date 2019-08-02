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
          <div>支付状态清查</div>
        </div>
        <div
          v-if="menubutton.paycenter_check=='True'"
          class="nav handle"
          @click="payNav('approvalData')"
        >
          <img src="../../assets/images/ss.png" alt />
          <div>送审</div>
        </div>
        <div
          v-if="menubutton.paycenter_uncheck=='True'"
          class="nav handle"
          @click="payNav('cancelApproval')"
        >
          <img src="@/assets/images/ss_d.png" alt />
          <div>取消送审</div>
        </div>
        <div
          v-if="menubutton.paycenter_cancel=='True'"
          class="nav handle"
          @click="payNav('fiveBill')"
        >
          <img src="@/assets/images/zf.png" alt />
          <div>作废</div>
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
          <div
            style="height: 100%;width: 130px;display: inline-block;vertical-align: middle;line-height: 30px;"
          >
            <el-checkbox v-model="isMe">标记我的待办</el-checkbox>
          </div>
          <i
            class="el-icon-d-arrow-left iicon"
            style="position:absolute;left:130px;"
            @click.stop="unionStateScroll(false)"
          ></i>
          <i
            class="el-icon-d-arrow-right iicon"
            style="position:absolute;right:275px;"
            @click.stop="unionStateScroll(true)"
          ></i>
          <div class="scrollNav" style="left: 160px;">
            <div>
              <ul>
                <li>
                  <span>支付单据</span>
                  <el-select
                    @change="selectType"
                    collapse-tags
                    v-model="type"
                    placeholder="请选择"
                    size="mini"
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
                  <el-select collapse-tags v-model="status" multiple placeholder="请选择" size="mini">
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
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    @change="rePageGetData"
                  ></el-date-picker>
                </li>
                <li>
                  <span>支付日期</span>
                  <el-date-picker
                    v-model="zfrq"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    @change="rePageGetData"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </li>
              </ul>
            </div>
          </div>
          <!-- <label class="searchArea" style="float: right">
            <search-input placeholder="" v-model="search" @btnClick="rePageGetData"></search-input>
          </label>-->
          <!-- <label class="searchArea" style="float: right">
            <el-input
              size="mini"
              placeholder="支付单编号/申报单编号"
              v-model="search"
            >
              <el-button
                @click="rePageGetData"
                slot="append"
                size="mini"
              >搜索</el-button>
            </el-input>
          </label>-->
          <label class="searchArea" style="float: right">
            <el-input size="mini" placeholder="支付单编号/申报单编号" v-model="search">
              <el-button slot="append" size="mini" @click="rePageGetData">搜索</el-button>
            </el-input>
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
                <td v-for="(item,index) in tableHeader" :key="index">
                  <template v-if="item.label == '申报单编号'">
                    {{item.label}}
                    <el-tooltip content="显示全部单据">
                      <i class="el-icon-refresh refrest-same-follow" @click="RefbillCode=''"></i>
                    </el-tooltip>
                  </template>
                  <template v-else>{{item.label}}</template>
                </td>
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
                :class="{trActive:item.Mst.checked,deleteRow:item.Mst.FDelete}"
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
                    <!-- <template v-if="item.Mst.FState==1">{{item.Mst.FAmountTotal | NumFormat}}</template> -->
                    <template>{{item.Dtls.reduce((prev,cur)=>{return (cur.FState==1&&!cur.FNewCode)?cur.FAmount*100+prev:0+prev},0)/100 | NumFormat}}</template>
                    <!-- <template v-else>{{0 | NumFormat}}</template> -->
                  </div>
                </td>
                <td>
                  <div>{{typeList.find(i=>item.Mst.FBilltype == i.value).label}}</div>
                </td>
                <td class="refbillitem">
                  <div>
                    {{item.Mst.RefbillCode}}
                    <el-tooltip content="显示关联单据">
                      <i
                        class="el-icon-search refrest-same-follow"
                        @click="RefbillCode=item.Mst.RefbillCode"
                      ></i>
                    </el-tooltip>
                  </div>
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
                <td
                  class="atype"
                  style="position: relative;overflow: visible"
                  @click="openAuditfollow(item.Mst.PhId)"
                >
                  <div v-if="item.Mst.FApproval==0">待送审</div>
                  <div v-else-if="item.Mst.FApproval==1">审批中</div>
                  <div v-else-if="item.Mst.FApproval==2">未通过</div>
                  <div v-else-if="item.Mst.FApproval==9">审批通过</div>
                  <div v-else>————</div>
                  <div
                    v-if="isMe&&item.Mst.IsApprovalNow"
                    style="color: red;"
                    class="iconMsg"
                    @click.stop="approvalSubmit(item)"
                  >
                    <i class="el-icon-chat-round"></i>
                    <span>审批</span>
                  </div>
                </td>
                <td>
                  <div v-if="item.Mst.FState==0">待支付</div>
                  <div v-else-if="item.Mst.FState==1">支付成功</div>
                  <div class="dangerText" v-else-if="item.Mst.FState==2">支付异常</div>
                  <div v-else-if="item.Mst.FState==3">支付中</div>
                  <div v-else>————</div>
                </td>
                <td style="position: relative;">
                  <p style="width:100%;height:100%;"></p>
                  <div
                    v-if="item.Mst.FDelete==1"
                    style="width:60px;height:30px;position: absolute;top:50%;left:50%;margin-top:-15px;margin-left:-30px;"
                  >
                    <img style="width:60px;height:30px;" src="../../assets/images/zhang_zf.png" />
                  </div>
                  <el-tooltip
                    v-else
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
    <!-- 当前页面审批 -->
    <approval-dialog
      ref="approvalDialog"
      :title="appDialog.title"
      :btn-group="appDialog.btnGroup"
      :rowData="myapprovalData"
      BType="002"
      @refresh="getData"
    ></approval-dialog>
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
        <span style="float: left;">查看申报</span>
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
import ApprovalDialog from '../../components/applyPro/approval'
import { mapState } from 'vuex'
import { printTable } from '@/api/upload'
import { PostCancelAppvalRecord, PostCancetPaymentList } from '@/api/paycenter'
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
    applyBill,
    ApprovalDialog
  },

  provide() {
    return { refreshIndexData: this.getData }
  },
  data() {
    return {
      myapprovalData: [],
      isMe: false,
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
      appDialog: {
        title: '',
        btnGroup: {
          cancelName: '取消',
          onfirmName: '确认'
        }
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
          label: '申报单编号'
        },
        {
          label: '申报单名称'
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
      RefbillCode: ''
    }
  },
  created() {},
  mounted() {
    console.log(this.$route)
    this.$route.params.phid
      ? (this.RefbillCode = this.$route.params.phid)
      : this.getData()
    this.updateTitle()
  },
  methods: {
    // 当前页面审批
    approvalSubmit: function(val) {
      console.log(val)
      let newObj = Object.assign({}, val.Mst)
      newObj.RefbillPhid = newObj.PhId
      this.myapprovalData = [newObj]
      this.$nextTick(() => {
        this.$refs.approvalDialog.changeDialog()
      })
    },
    //修改title
    updateTitle() {
      let title = document.getElementsByTagName('title')[0]
      title.innerText = '支付中心在线工作平台'
    },
    // 刷新页面，并将页码为1
    rePageGetData() {
      this.currentPage = 1
      this.getData()
    },
    // 打印
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
    openRefbill(code) {
      // this.applyNum = PhId.toString()
      // this.fundDetailData.openDialog = true
      this.RefbillCode = code
      this.rePageGetData()
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
        'NgInsertDt*date*ge*1':
          this.sbrq && this.sbrq.length ? this.sbrq[0] || '' : '', //申报日期开始
        'NgInsertDt*date*le*1':
          this.sbrq && this.sbrq.length
            ? this.sbrq[1].toString() + ' 23:59:59' || ''
            : '', //申报日期结束
        'FDate*date*ge*1': this.zfrq ? this.zfrq[0] || '' : '', //支付日期开始
        'FDate*date*le*1': this.zfrq ? this.zfrq[1] || '' : '', //支付日期结束
        'FApproval*byte*eq*1': '', //审批状态0- 待送审 1-待审批 2- 未通过 9-审批通过
        'FBilltype*str*eq*1': this.type, //关联单据类型
        '[or-dictionary0]*dictionary*or': {
          'RefbillCode*str*like*1': this.search.toString(),
          'FCode*str*like*1': this.search.toString()
        },
        'OrgCode*str*like*1': this.orgcode,
        'RefbillCode*str*eq*1': this.RefbillCode,
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
        if (this.status.findIndex(i => i === '') == -1) {
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
      }
      deleteBlank(query)
      console.log(query)
      // this.getAxios('GGK/GKPaymentMstApi/GetPaymentList', {
      this.getAxios(
        this.isMe
          ? 'GGK/GKPaymentMstApi/GetPaymentList4Zjbf2'
          : 'GGK/GKPaymentMstApi/GetPaymentList4Zjbf',
        {
          queryfilter: JSON.stringify(query),
          PageIndex: this.currentPage - 1, //当前第几页，从0开始
          PageSize: this.pageSize, //每页显示行数
          uid: this.userid || 488181024000001, //用户id
          orgid: this.orgid, //组织id
          ryear: this.year || '2019'
        }
      )
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
      } else {
        var handleitem = []
        let checkedCount = this.tableData.reduce((prev, cur) => {
          if (cur.Mst.checked) handleitem.push(cur)
          return prev + cur.Mst.checked
        }, 0)
        console.log(handleitem)
        if (handleitem.length < 1) {
          this.$msgBox.error({
            content: '请至少选择一条数据进行操作。'
          })
          return
        }
        switch (type) {
          case 'payListData':
            if (checkedCount != 1) {
              this.$msgBox.error({
                content: '请选择一条数据进行维护。'
              })
              return
            } else if (handleitem[0].Mst.FDelete) {
              this.$msgBox.error('该单据已作废，无法修改！')
              return
            } else if (
              handleitem[0].Mst.FApproval == 1 ||
              handleitem[0].Mst.FApproval == 9
            ) {
              this.$msgBox.error({
                content:
                  handleitem[0].Mst.FApproval == 1
                    ? '单据正在审批中。'
                    : '单据已经审批通过。'
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
                  "只有审批状态为“<span class='dangerText'>审批通过</span>”，支付状态为“<span class='dangerText'>待支付</span>”的单据，才可以使用【合并支付】。"
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
              handleitem.length > 1 &&
              !handleitem.every(item => {
                return item.Mst.FState == handleitem[0].Mst.FState
              })
            ) {
              this.$msgBox.error('只能对相同支付状态的单据进行处理。')
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
            if (handleitem.some(i => i.Mst.FDelete)) {
              this.$msgBox.error('已作废单据无法送审！')
              return
            }
            if (
              !handleitem.every(item => {
                return item.Mst.FApproval == 0 || item.Mst.FApproval == 2
              })
            ) {
              this.$msgBox.error('只能对待送审的单据进行送审。')
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
          case 'cancelApproval':
            this.$confirm('确定要取消送审所选支付单', '提示', {
              type: 'warning'
            })
              .then(() => {
                PostCancelAppvalRecord({
                  OperaPhid: this.userid,
                  FBilltype: '002',
                  RefbillPhidList: (item ? [item] : handleitem).map(
                    i => i.Mst.PhId
                  )
                })
                  .then(res => {
                    if (res.Status == 'error') {
                      this.$msgBox.error(res.Msg)
                      return
                    }
                    this.$msgBox.show('取消送审成功!')
                    this.getData()
                    console.log(res)
                  })
                  .catch(err => {
                    this.$msgBox.error(err.message || '取消送审失败！')
                    return
                  })
              })
              .catch(err => {
                console.log(err)
              })
            return
            break
          case 'fiveBill':
            if (
              !handleitem.every(
                i => i.Mst.FApproval == 0 || i.Mst.FApproval == 2
              )
            ) {
              this.$msgBox.error('只能对待送审和未送审的单据进行作废！')
              return
            } else if (handleitem.some(i => i.Mst.FDelete)) {
              this.$msgBox.error('存在已作废单据，请检查！')
              return
            }
            this.$confirm('确定要作废所选支付单？', '提示', { type: 'warning' })
              .then(() => {
                PostCancetPaymentList({
                  fPhIdList: (item ? [item] : handleitem).map(i => i.Mst.PhId)
                })
                  .then(res => {
                    if (res.Status == 'error') {
                      this.$msgBox.error(res.Msg)
                      return
                    }
                    this.$msgBox.show('单据作废成功!')
                    this.getData()
                    console.log(res)
                  })
                  .catch(err => {
                    this.$msgBox.error(err.message || '作废单据失败！')
                    return
                  })
              })
              .catch(err => {
                console.log(err)
              })
            return
            break
        }
      }
      this[type].data = item ? [item] : handleitem
      this[type].openDialog = true
    },
    // 筛选
    selectType(cur) {
      console.log(cur, this.type)
      this.rePageGetData()
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
  watch: {
    status(newVal, oldVal) {
      function arrSame(arr1, arr2) {
        return JSON.stringify(arr1) == JSON.stringify(arr2)
      }
      let allChoosed = this.statusList.map(i => i.value)
      if (newVal[newVal.length - 1] === '') {
        //点击全选
        this.status = this.statusList.map(i => i.value)
        return
      } else if (
        arrSame(oldVal, allChoosed) &&
        arrSame(['', ...newVal], allChoosed)
      ) {
        // 点击全部取消全选
        this.status = []
        return
      } else if (arrSame(oldVal, allChoosed) && newVal[0] === '') {
        // 点击其他取消全选
        newVal.splice(0, 1)
        return
      } else if (
        newVal.length == allChoosed.length - 1 &&
        newVal.findIndex(i => i === '') == -1
      ) {
        //手动全选
        this.status = allChoosed
        return
      }
      this.rePageGetData()
    },
    RefbillCode() {
      this.rePageGetData()
    },
    isMe() {
      this.rePageGetData()
    }
  },
  beforeDestroy() {
    window.onresize = function() {}
  }
}
</script>
<style lang="scss" scoped>
.payIndex {
  color: #333;
  font-size: 0.14rem;
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
    min-width: 1400px;
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
  .refrest-same-follow {
    color: #409eff;
    font-size: 0.18rem;
  }
  .refrest-same-follow:hover {
    cursor: pointer;
  }
  td.refbillitem .refrest-same-follow {
    display: none;
  }
  td.refbillitem:hover .refrest-same-follow {
    display: inline-block;
  }
  .iconMsg {
    position: absolute;
    right: 5px;
    width: 30px;
    height: 30px;
    font-size: 0.12rem;
    top: -4px;
    background-color: #fff;
    cursor: pointer;
    > i {
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: 0.35rem;
      top: -10px;
      right: 2px;
    }
  }
  .deleteRow,
  .deleteRow .atype {
    cursor: not-allowed;
    color: #ccc !important;
  }
}
</style>

<style lang='scss'>
.payIndex {
  .el-date-editor .el-range__close-icon {
    color: #3b3c40;
  }
  .el-select .el-tag__close.el-icon-close {
    background-color: #3b3c40;
  }
  .scrollNav .el-select__tags {
    position: absolute;
    left: 0;
  }
  .el-input__inner.el-date-editor--datetimerange.el-range-editor--mini {
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
