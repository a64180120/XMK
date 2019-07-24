<template>
  <section>
    <handle-btn title="审批中心在线工作平台" :auditBtn="true" @refresh="refresh()" type="approval">
      <div class="top" v-if="isApproval">
        <ul>
          <!--v-if="MenuButton.approvalcenter_approval"-->
          <li class="handle" @click="aprovalItem()">
            <div>
              <img src="../../assets/images/sp.png" />
            </div>
            <span>审批</span>
          </li>
          <li class="handle">
            <div @click.stop="printTables" class="handle" style=" width: 80px;">
              <div class="topIcon">
                <img src="@/assets/images/dy.png" alt />
              </div>
              <!-- @click="creatPayItem()"-->
              打印
            </div>
          </li>
        </ul>
      </div>
      <div class="top" v-else>
        <ul>
          <li class="handle">
            <div @click.stop="printTables" class="handle" style="width: 80px;">
              <div class="topIcon">
                <img src="@/assets/images/dy.png" alt />
              </div>
              <!-- @click="creatPayItem()"-->
              打印
            </div>
          </li>
        </ul>
      </div>
    </handle-btn>
    <div>
      <div class="container content-body">
        <div class="formArea">
          <!--搜索栏-->
          <div class="btnArea">
            <el-form :inline="true">
              <el-form-item label="申报部门" class="top-form-left">
                <el-tooltip v-if="applyDeportTop !=='' " :content="applyDeportTop">
                  <el-input
                    size="mini"
                    v-model="applyDeportTop"
                    @focus="openOrg()"
                    @change="changeInput()"
                    style="width: 120px"
                    placeholder="全部"
                  ></el-input>
                </el-tooltip>
                <el-input
                  v-else
                  size="mini"
                  v-model="applyDeportTop"
                  @focus="openOrg()"
                  @change="changeInput()"
                  style="width: 120px"
                  placeholder="全部"
                ></el-input>
              </el-form-item>
              <el-form-item label="停留时长" class="top-form-left">
                <el-input
                  size="mini"
                  v-model="searchForm.StopHour"
                  style="vertical-align:middle !important;width: 200px;margin-top: -1px"
                  placeholder="请输入停留时长"
                  @change="changeInput()"
                >
                  <el-select
                    v-model="searchForm.Operator"
                    slot="prepend"
                    placeholder="类型"
                    class="select-input"
                    style="width: 75px"
                    @change="changeInput('operator')"
                  >
                    <el-option label="等于" value="1"></el-option>
                    <el-option label="大于" value="2"></el-option>
                    <el-option label="小于" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="申报日期" class="top-form-left">
                <el-date-picker
                  v-model="searchForm.BDate"
                  @change="changeInput()"
                  style="width: 240px"
                  size="mini"
                  type="daterange"
                  start-placeholder="开始时间"
                  end-placeholder="开始时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label class="top-form-right">
                <search-input @btnClick="search()" placeholder="申报单编号" v-model="searchForm.BName"></search-input>
              </el-form-item>
            </el-form>
          </div>
          <!--未审批表格-->
          <div v-if="isApproval" class="tableHead">
            <table>
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="10%" />
                <col width="8%" />
                <col width="8%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="8%" />
                <col v-if="isApproval" width="5%" />
                <col width="11%" />
              </colgroup>
              <thead>
                <tr>
                  <td>
                    <el-checkbox v-model="checkedAll" :indeterminate="IsIndeterminate">序号</el-checkbox>
                  </td>
                  <td>申报部门/单位</td>
                  <td>支付单编号</td>
                  <td>支付金额(元)</td>
                  <td>单据类型</td>
                  <td>申报单编号</td>
                  <td>申报日期</td>
                  <td>支付单名称</td>
                  <td>审批状态</td>
                  <td v-if="isApproval">
                    <el-tooltip content="停留时长">
                      <span>停留时长</span>
                    </el-tooltip>
                  </td>
                  <td>申报说明</td>
                </tr>
              </thead>
            </table>
          </div>
          <div v-if="isApproval" class="tableBody">
            <table ref="printArea">
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="10%" />
                <col width="8%" />
                <col width="8%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="8%" />
                <col width="5%" />
                <col width="11%" />
              </colgroup>
              <tbody>
                <tr :class="{trActive:check[idx]}" v-for="(item,idx) in tableData" :key="idx">
                  <td @click.self="handleCheckBoxCellClick(item,idx)">
                    <el-checkbox v-model="check[idx]" @change="fn(item,idx)">{{idx+1}}</el-checkbox>
                  </td>
                  <td>
                    <el-tooltip
                      effect="dark"
                      :content="item.OrgName"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.OrgName}}</p>
                    </el-tooltip>
                  </td>
                  <td @click="handleRowClick(item,idx)" class="apply-epart cell-click">
                    <el-tooltip
                      effect="dark"
                      :content="item.PayNum"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.PayNum}}</p>
                    </el-tooltip>
                  </td>
                  <td style="text-align: right">{{item.PayAccount | NumFormat}}</td>
                  <td>
                    <span v-if="item.BBilltype == '001'">资金拨付单</span>
                    <span v-if="item.BBilltype == '002'">支付单</span>
                  </td>
                  <td>
                    <el-tooltip
                      effect="dark"
                      :content="item.BNum"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.BNum}}</p>
                    </el-tooltip>
                  </td>
                  <td>
                    <el-tooltip
                      effect="dark"
                      :content="item.BDate"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.BDate}}</p>
                    </el-tooltip>
                  </td>
                  <td>
                    <el-tooltip
                      effect="dark"
                      :content="item.BName"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.BName}}</p>
                    </el-tooltip>
                  </td>
                  <td>
                    <span
                      class="cell-click"
                      v-if="item.BStatus ==0 "
                      @click.stop="openAuditfollow(item,idx)"
                    >未审批</span>
                    <span
                      class="cell-click"
                      v-if="item.BStatus ==1 "
                      @click.stop="openAuditfollow(item,idx)"
                    >审批中</span>
                    <span
                      class="cell-click"
                      v-if="item.BStatus ==2 "
                      @click.stop="openAuditfollow(item,idx)"
                    >未通过</span>
                    <span
                      class="cell-click"
                      v-if="item.BStatus ==9 "
                      @click.stop="openAuditfollow(item,idx)"
                    >审批通过</span>
                  </td>
                  <td>
                    <div>
                      <el-tooltip
                        class
                        effect="dark"
                        :content="'已经停留'+(item.StopHour>24?Math.floor(item.StopHour/24)+'天':'')+(Math.floor(item.StopHour%24) +'小时')"
                        placement="bottom-start"
                      >
                        <img
                          v-if="item.StopHour<timeValue"
                          src="../../assets/images/sj2.png"
                          class="img-icon"
                        />
                        <img v-else src="../../assets/images/sj1.png" class="img-icon" />
                      </el-tooltip>
                      <!--<el-tooltip v-if="item.BStatus == 0" class="" effect="dark" :content="'已经停留'+item.StopHour +'小时'" placement="bottom-start">
                      <img  src="../../assets/images/sj2.png" class="img-icon">
                    </el-tooltip>
                  </td>
                  <td style="text-align: right">
                    {{item.PayAccount | NumFormat}}
                  </td>
                  <td>
                    <span v-if="item.BBilltype == '001'">资金拨付单</span>
                    <span v-if="item.BBilltype == '002'">支付单</span>
                  </td>
                  <td>
                    <el-tooltip effect="dark"
                                :content="item.BNum"
                                placement="bottom"
                                popper-class="pay-fund-approval_tooltip">
                      <p>
                        {{item.BNum}}
                      </p>
                    </el-tooltip>
                  </td>
                  <td>
                    <el-tooltip effect="dark"
                                :content="item.BDate"
                                placement="bottom"
                                popper-class="pay-fund-approval_tooltip">
                      <p>
                        {{item.BDate}}
                      </p>
                    </el-tooltip>
                    <el-tooltip v-else-if="item.BStatus == 10" class="" effect="dark" :content="'已经停留'+item.StopHour +'小时'" placement="bottom-start">
                      <img  src="../../assets/images/sj1.png" class="img-icon">
                      </el-tooltip>-->
                    </div>
                  </td>
                  <td style="text-align: left">
                    <el-tooltip
                      effect="dark"
                      :content="item.BDescribe"
                      placement="bottom-start"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.BDescribe}}</p>
                    </el-tooltip>
                  </td>
                </tr>
                <tr v-if="tableData.length === 0" :class="{trActive:check[0]}">
                  <td colspan="10">未查询到数据</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--已审批表格-->
          <div v-if="!isApproval" class="tableHead">
            <table>
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="8%" />
                <col width="8%" />
                <col width="8%" />
                <col width="12%" />
                <col width="10%" />
                <col width="10%" />
                <col width="8%" />
                <col width="21%" />
              </colgroup>
              <thead>
                <tr>
                  <td>
                    <el-checkbox v-model="checkedAll" :indeterminate="IsIndeterminate">序号</el-checkbox>
                  </td>
                  <td>申报部门/单位</td>
                  <td>支付单编号</td>
                  <td>支付金额(元)</td>
                  <td>单据类型</td>
                  <td>
                    申报单编号
                    <el-tooltip content="显示全部单据">
                      <i class="el-icon-refresh refrest-same-follow" @click="resetSameFollow"></i>
                    </el-tooltip>
                  </td>
                  <td>申报日期</td>
                  <td>支付单名称</td>
                  <td>申报状态</td>
                  <td>申报说明</td>
                </tr>
              </thead>
            </table>
          </div>
          <div v-if="!isApproval" class="tableBody">
            <table ref="printArea">
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="8%" />
                <col width="8%" />
                <col width="8%" />
                <col width="12%" />
                <col width="10%" />
                <col width="10%" />
                <col width="8%" />
                <col width="21%" />
              </colgroup>
              <tbody>
                <tr :class="{trActive:check[idx]}" v-for="(item,idx) in tableData" :key="idx">
                  <td @click.self="handleCheckBoxCellClick(item,idx)">
                    <el-checkbox v-model="check[idx]">{{idx+1}}</el-checkbox>
                  </td>
                  <td>
                    <el-tooltip
                      effect="dark"
                      :content="item.OrgName"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.OrgName}}</p>
                    </el-tooltip>
                  </td>
                  <td @click="handleRowClick(item,idx)" class="apply-epart cell-click">
                    <el-tooltip
                      effect="dark"
                      :content="item.PayNum"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.PayNum}}</p>
                    </el-tooltip>
                  </td>
                  <td style="text-align: right">{{item.PayAccount | NumFormat}}</td>
                  <td>
                    <span v-if="item.BBilltype == '001'">资金拨付单</span>
                    <span v-if="item.BBilltype == '002'">支付单</span>
                  </td>
                  <td @mouseenter="showSearchIcon(item,idx)" @mouseleave="hideSearchIcon()">
                    <span>{{item.BNum}}</span>
                    <el-tooltip content="显示关联单据">
                      <i
                        v-show="idx === showSearchIconIdx"
                        class="el-icon-search refrest-same-follow"
                        @click="seachSameFollow(item.BNum)"
                      ></i>
                    </el-tooltip>
                  </td>
                  <td>
                    <el-tooltip
                      effect="dark"
                      :content="item.BDate"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.BDate}}</p>
                    </el-tooltip>
                  </td>
                  <td>
                    <el-tooltip
                      effect="dark"
                      :content="item.BName"
                      placement="bottom"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.BName}}</p>
                    </el-tooltip>
                  </td>
                  <td>
                    <span
                      class="cell-click"
                      v-if="item.BStatus ==0 "
                      @click.stop="openAuditfollow(item,idx)"
                    >未审批</span>
                    <span
                      class="cell-click"
                      v-if="item.BStatus ==1 "
                      @click.stop="openAuditfollow(item,idx)"
                    >审批中</span>
                    <span
                      class="cell-click"
                      v-if="item.BStatus ==2 "
                      @click.stop="openAuditfollow(item,idx)"
                    >未通过</span>
                    <span
                      class="cell-click"
                      v-if="item.BStatus ==9 "
                      @click.stop="openAuditfollow(item,idx)"
                    >审批通过</span>
                  </td>
                  <td style="text-align: left">
                    <el-tooltip
                      effect="dark"
                      :content="item.BDescribe"
                      placement="bottom-start"
                      popper-class="pay-fund-approval_tooltip"
                    >
                      <p>{{item.BDescribe}}</p>
                    </el-tooltip>
                  </td>
                </tr>
                <tr v-if="tableData.length === 0" :class="{trActive:check[0]}">
                  <td colspan="10">未查询到数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="pageArea">
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="page.pageSizes"
            layout="total,sizes,prev,pager,next,jumper"
            :total="page.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--审批-->
    <pay-dialog
      ref="payDialog"
      :rowData="selection"
      @refresh="loadData"
      @dialogFlow="childrenAuditfollow"
      @subSuc="plSubSuc()"
    ></pay-dialog>
    <!--查看审批流程-->
    <auditfollow :visible.sync="visible" @closefollow="closeFollow" :auditMsg="auditMsg"></auditfollow>
    <!--组织树-->
    <orgtree :data="orgtreeData" :checkedOrg="checkedOrg" :visible.sync="orgType" @confirm="getOrg"></orgtree>
    <!--支付单查看-->
    <paylist
      :data="payListData"
      :OrgTree="orgtreeData"
      v-if="openDialog"
      :openDialog="openDialog"
      @closeDetail="closeDetail"
      ref="payList"
    ></paylist>
  </section>
</template>

<script>
import HandleBtn from '../../components/topNav/topHandle'
import SearchInput from '../../components/searchInput/searchInput'
import Auditfollow from '../../components/auditFollow/auditfollow'
import Applybill from '../../components/applyBill/applybill'
import ApprovalDialog from '../payfundapproval/approvalDialog'
import Orgtree from '../../components/orgtree/index'
import Paylist from './payList'
import { selection } from '../payfundapproval/selection'
import { mapState } from 'vuex'
import PayDialog from './payDialog'
import ImgView from '../../components/imgView/imgView'
import { printTable } from '@/api/upload'
import { GetSysSetList } from '@/api/systemSetting/dataSafe'
export default {
  name: 'index',
  components: {
    ImgView,
    PayDialog,
    Paylist,
    Orgtree,
    ApprovalDialog,
    Applybill,
    Auditfollow,
    SearchInput,
    HandleBtn
  },
  data() {
    return {
      payListVisible: false,
      BType: '002', //单据类型 资金拨付 001  申报单 002
      checkedAll: false, //是否全选
      IsIndeterminate: false, //列表中是否有选中的值并且不是全选
      check: [], //列表所有选中状态
      selection: [], //选中后的值
      payListData: {},
      auditMsg: [], //审批流程 数据
      select: '', //类型
      openDetailDialog: false,
      detailData: {},
      approvalData: {},
      openApprovalDialog: false,
      searchForm: {
        BName: '', //申报单名称或编号查询内容
        BDate: [], //申报时间段
        Operator: '', //停留时长的判断条件(1:等于,2:大于,3:小于)
        StopHour: '', //停留时长
        OrgCode: '', //组织编码
        OrgName: '', //组织名称
        OrgPhId: '',
        OrgIds: []
      },
      tableData: [], //模拟表格数据
      page: {
        currentPage: 1, //当前页
        pageSizes: [20, 30, 50, 100], //每页显示多少条
        total: 0, //总条数
        pageSize: 20 //当前每页显示多少条
      }, //分页
      visible: false,
      appDialog: {
        title: '',
        btnGroup: {
          cancelName: '',
          onfirmName: ''
        }
      }, //审核弹框
      openDialog: false, //打开详情弹框
      openInnerDialog: false, //打开详情内层弹框

      //判断显示为已审批页面还是未审批页面
      isApproval: '',
      orgtreeData: [], //工会组织列表
      checkedOrg: [], //设置组织树默认选中项
      orgType: false, //控制组织树的展示与隐藏
      SplxPhid: '',

      //审批弹框
      approvalDialog: false,
      //支付单相同数据的编号
      sameFollowNum: '',

      showSearchIconIdx: '',

      applyDeportTop: '',
      //停留时长最大值
      timeValue: ''
    }
  },
  computed: {
    ...mapState({
      OrgCode: state => state.user.orgcode,
      UserId: state => state.user.userid,
      Orgid: state => state.user.orgid,
      Year: state => state.user.year,
      MenuButton: state => state.user.menubutton
    })
  },
  mounted() {
    this.isApproval = eval(this.$route.query.approval)
    console.log(this.isApproval)
    console.log(typeof this.isApproval)
    this.SplxPhid = this.$route.query.SplxPhid
    this.loadData()
    this.getOrgList()
    this.updateTitle()
    this.setTimeValue()
  },
  watch: {
    check(val, oldval) {
      console.log(val)
      this.selection = selection(this.check, this.tableData)
      console.log(this.selection)
      if (
        this.selection.length !== 0 &&
        this.selection.length !== this.tableData.length
      ) {
        this.IsIndeterminate = true
      } else if (this.selection.length === this.tableData.length) {
        this.IsIndeterminate = false
        this.checkedAll = true
      } else if (this.selection.length === 0) {
        this.IsIndeterminate = false
        this.checkedAll = false
      }
    },
    checkedAll(val, ovlval) {
      this.IsIndeterminate = false
      if (val) {
        this.check = this.check.map((item, index, array) => true)
      } else {
        this.check = this.check.map((item, index, array) => false)
      }
    }
  },
  methods: {
    //设置停留时长
    setTimeValue() {
      let data = {
        orgid: this.$store.state.user.orgid,
        uid: this.$store.state.user.userid,
        DicType: 'StayTime'
      }
      GetSysSetList(data)
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.show(res.Msg)
          } else {
            if (this.ucode != 'Admin') {
              if (res.Record.length) {
                this.timeValue = res.Record[0].Value
                console.log(this.timeValue)
              } else {
                this.timeValue = ''
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.show('获取数据失败!')
        })
    },
    //修改title
    updateTitle() {
      let title = document.getElementsByTagName('title')[0]
      title.innerText = '审批中心在线工作平台'
    },
    printTables: function() {
      let vm = this
      printTable(vm)
    },
    //拉取列表数据
    loadData(e) {
      let data = {
        Uid: this.UserId,
        OrgCode:
          this.searchForm.OrgCode == ''
            ? this.OrgCode
            : this.searchForm.OrgCode,
        Orgid:
          this.searchForm.OrgPhId == '' ? this.Orgid : this.searchForm.OrgPhId,
        Year: this.Year,
        PageIndex: this.page.currentPage,
        PageSize: this.page.pageSize,
        BType: this.BType,
        BName:
          this.searchForm.BName == ''
            ? this.sameFollowNum
            : this.searchForm.BName.trim(),
        Operator: this.searchForm.Operator,
        StopHour: this.searchForm.StopHour,
        BStartDate:
          this.searchForm.BDate === null ? '' : this.searchForm.BDate[0],
        BEndTime:
          this.searchForm.BDate === null
            ? ''
            : this.searchForm.BDate[1] + ' 23:59:59',
        Splx_Phid: this.SplxPhid,
        OrgIds: this.searchForm.OrgIds
      }
      let that = this
      if (eval(this.isApproval)) {
        this.getAxios('/GAppvalRecord/GetUnDoRecordList', data)
          .then(success => {
            console.log(success.Data)
            if (success && success.Status === 'success') {
              that.tableData = success.Data
              that.page.total = success.Total
              // this.page.total = 100

              for (let i in success.Data) {
                that.check.push(false)
              }
            } else {
              this.$msgBox.error(success.Msg)
            }
          })
          .catch(err => {
            that.$msgBox.error('数据获取异常')
          })
      } else {
        this.getAxios('/GAppvalRecord/GetDoneRecordList', data)
          .then(res => {
            console.log(res.Data)
            if (res && res.Status === 'success') {
              that.tableData = res.Data
              that.page.total = res.Total
              // this.page.total = 100
              console.log(res)
              for (let i in res.Data) {
                that.check.push(false)
              }
            } else {
              this.$msgBox.show(res.Msg)
            }
          })
          .catch(err => {
            that.$msgBox.error('数据获取异常')
          })
      }
    },
    //拉取组织树
    getOrgList() {
      this.getAxios('GQT/CorrespondenceSettingsApi/GetALLOrgTree')
        .then(res => {
          console.log(res)
          this.orgtreeData = res.Record
        })
        .catch(err => {
          that.$msgBox.error('组织树获取失败')
        })
    },
    //搜索框事件
    search(val) {
      this.sameFollowNum = ''
      this.page.pageSize = 20
      this.page.currentPage = 1
      this.loadData()
    },
    //单行选中事件
    handleSelect(selection, row) {
      console.log(selection, row)
    },
    //全部选中事件
    handleSelectAll(selection) {
      console.log(selection)
    },
    //单行点击事件
    handleRowClick(row, idx) {
      this.payListData = row

      this.openDialog = true
      this.detailData = row
    },
    //点击checkBox单元格事件
    handleCheckBoxCellClick(row, idx) {
      if (this.isApproval){
        this.fn(row, idx)
        return
      }
      for (let key in this.check) {
        if (idx === parseInt(key)) {
          if (this.check[key] === true) {
            this.$set(this.check, key, false)
          } else {
            this.$set(this.check, key, true)
          }
        }
      }
    },
    //当前页显示多少条数据
    handleSizeChange(val) {
      this.page.pageSize = val
      this.loadData()
    },
    //调到第几页
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.loadData()
    },
    //打开审批弹框
    aprovalItem() {
      if (this.selection.length === 0) {
        this.$msgBox.error('请选择需要审批的单据')
      } else {
        this.appDialog.title = '查看'
        this.appDialog.btnGroup.cancelName = '取消'
        this.appDialog.btnGroup.onfirmName = '确认'
        this.$refs.payDialog.changeDialog()
      }
    },
    //生成支付单弹框
    creatPayItem() {
      this.appDialog.title = '审批并生成支付单'
      this.appDialog.btnGroup.cancelName = '取消'
      this.appDialog.btnGroup.onfirmName = '生成支付单'
    },
    openAuditfollow(item, idx) {
      this.visible = true
      let data = {
        RefbillPhid: item.RefbillPhid,
        FBilltype: this.BType
      }
      this.getAuditfollow(data)
    },
    closeFollow(val){
      console.log('2++++++++++++++')
      this.visible = val
    },
    //拉去审批流数据查看
    getAuditfollow(data) {
      let that = this
      this.getAxios('/GAppvalRecord/GetAppvalRecordList', data)
        .then(success => {
          console.log(success)
          if (success && success.Status === 'success') {
            that.auditMsg = success.Data
          } else {
            that.$msgBox.show(success.Msg)
          }
        })
        .catch(err => {
          that.$msgBox.show('数据获取异常')
        })
    },
    //打开组织树
    openOrg() {
      this.orgType = true
    },
    //获取组织树
    getOrg(e) {
      this.searchForm.OrgIds = []
      this.applyDeportTop = ''
      this.searchForm.OrgName = e.map(item => item.OName)
      this.searchForm.OrgName.forEach((item, idx) => {
        if (idx !== this.searchForm.OrgName.length - 1) {
          this.applyDeportTop = this.applyDeportTop + item + '、'
        } else {
          this.applyDeportTop = this.applyDeportTop + item
        }
      })
      for (let key in e) {
        this.searchForm.OrgIds[key] = e[key].PhId
      }
      this.loadData()

      // this.searchForm.OrgName = e[0].OName;
      // this.searchForm.OrgCode = e[0].OCode;
      // this.searchForm.OrgPhId = e[0].PhId;
      // this.loadData(e)
    },
    //子组件审批流查看
    childrenAuditfollow(item, idx) {
      this.visible = true
      let data = {
        RefbillPhid: this.selection[0].RefbillPhid,
        FBilltype: this.BType
      }
      this.getAuditfollow(data)
    },
    //输入框值改变
    changeInput(e) {
      console.log(this.searchForm)
      this.page.pageSize = 20
      this.page.currentPage = 1
      if (e === 'operator') {
        if (this.searchForm.StopHour !== '') {
          this.loadData()
          return
        } else {
          return
        }
      }
      this.loadData()
    },
    //
    closeDetail(e) {
      this.openDialog = e
      this.selection = []
      this.check = this.check.map((item, index, array) => false)
    },
    //刷新
    refresh() {
      this.searchForm.BName = ''
      this.searchForm.BDate = []
      this.searchForm.Operator = []
      this.searchForm.StopHour = ''
      this.searchForm.OrgName = ''
      this.page.currentPage = 1
      this.page.pageSize = 20
      this.loadData()
    },
    plSubSuc() {},
    //获取图片列表
    getImgList(imgList) {
      console.log(111)
      console.log(imgList)
      if (this.imgList.length !== 0) {
        for (let key in this.imgList) {
          this.imgList.splice(key, 1)
        }
      }
      this.imgDialog = false
      let arr = []
      if (imgList !== null) {
        this.imgDialog = true
        for (let key in imgList) {
          let img = {
            name: imgList[key].BUrlpath.replace('/UpLoadFiles/BkPayment/', ''),
            path: baseURL.replace('/api', '') + imgList[key].BUrlpath
          }
          this.$set(this.imgList, key, img)
        }
      }
      console.log(this.imgList)
    },
    //搜索支付单相同的数据
    seachSameFollow(num) {
      this.searchForm.BName = ''
      this.sameFollowNum = num
      this.page.pageSize = 20
      this.page.currentPage = 1
      this.loadData()
    },
    resetSameFollow() {
      this.sameFollowNum = ''
      this.page.pageSize = 20
      this.page.currentPage = 1
      this.loadData()
    },
    //移入显示对应单元格的图标
    showSearchIcon(item, idx) {
      this.showSearchIconIdx = idx
    },
    hideSearchIcon() {
      this.showSearchIconIdx = ''
    },
    // 表格单选
    fn(item,idx){
      this.check = this.check.map((item, index, array) => false)
      for (let key in this.check){
        this.$set(this.check, idx, true)
      }
    }
  }
}
</script>
<style scoped>
.content-body {
  min-width: 1480px;
  min-height: 500px;
}
.top {
  position: absolute;
  top: 50%;
  left: 50%;
  margin:-5px 0 0 0 !important;
  transform: translate(-50%, -50%);
}
.top ul li {
  float: left;
  width: 115px;
}
.top ul li:hover {
  cursor: pointer;
}
.top ul li div img {
  width: 30px;
}
.divider .el-divider--horizontal {
  margin: 0;
}
.top-form-left {
  float: left;
  margin-bottom: 0px;
}
.top-form-right {
  float: right;
  margin-bottom: 0px;
}
.cell-click {
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
}
.img-icon {
  width: 30px;
}
.blue {
  color: #00b8ee;
}
.red {
  color: crimson;
}
.top-btn {
  float: right;
  margin: 10px 0;
}
.top-btn .top-ul .top-li {
  list-style: none;
  float: left;
  margin-right: 15px;
}
.top-btn .top-ul .top-li span:hover {
  color: #39b49b;
  cursor: pointer;
}
.apply-epart:hover {
  cursor: pointer;
}
.dialog-title span {
  width: 100%;
  text-align: left;
  font-size: 0.16rem;
  border-bottom: 1px solid #eaeaea;
}
/*.dialog>>>.el-dialog{*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  left: 50%;*/
/*  margin: 0 !important;*/
/*  transform: translate(-50%,-50%);*/
/*}*/
.detail-dialog >>> .el-dialog {
  /*height: 86%;*/
  height: 600px;
}
.img-dialog >>> .el-dialog {
  height: 550px;
  width: 780px;
}
.hidden {
  display: none;
}
.dialog-title span {
  width: 100%;
  text-align: left;
  font-size: 0.16rem;
  border-bottom: 1px solid #eaeaea;
}

.select-input >>> .el-input--suffix {
  width: 75px !important;
}
.btn-load {
  text-align: right;
}
/*.BDescribe{*/
/*  overflow: hidden;*/
/*  text-overflow: ellipsis;*/
/*  white-space: nowrap;*/
/*}*/
.refrest-same-follow {
  color: #409eff;
  font-size: 0.18rem;
}
.refrest-same-follow:hover {
  cursor: pointer;
}
</style>
<style>
.pay-fund-approval_tooltip {
  max-width: 300px;
}
</style>
