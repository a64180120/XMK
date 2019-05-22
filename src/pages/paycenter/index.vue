<template>
  <div class="payIndex">
    <top-handle title="支付中心在线工作平台">
      <div class="navs">
        <div class="nav" @click="payNav('showPayList')">收付款信息维护</div>
        <div class="nav" @click="payNav('showMergePay')">合并支付</div>
        <div class="nav" @click="payNav('showErrorHandle')">异常处理</div>
        <div class="nav" @click="payNav('showApprove')">送审</div>
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
          <span class="demonstration">申报日期</span>
          <el-date-picker
            v-model="sbrq"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="large-input"
          ></el-date-picker>
          <span class="demonstration">支付日期</span>
          <el-date-picker
            v-model="zfrq"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="large-input"
          ></el-date-picker>
          <div class="btns">
            <div class="search">
              <el-input v-model="search" placeholder="申请单编号/名称"></el-input>
              <span class="btn">搜索</span>
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
                <td>
                  <el-checkbox v-model="checkAll" @change="handleCheckAll">序号</el-checkbox>
                </td>
                <td v-for="(item,index) in tableHeader" :key="index">{{item.label}}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tableBody">
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
              <tr v-for="(item,index) in tableData" :key="index">
                <td>
                  <el-checkbox v-model="item.checked" @change="handleCheckOne(item)">{{index+1}}</el-checkbox>
                </td>
                <td>
                  <div @click="payNav('showPayList')">{{item.zfdbh}}</div>
                </td>
                <td>
                  <div>{{item.zfje}}</div>
                </td>
                <td>
                  <div>{{item.djlx}}</div>
                </td>
                <td>
                  <div>{{item.sqdbh}}</div>
                </td>
                <td>
                  <div>{{item.sbrq}}</div>
                </td>
                <td>
                  <div>{{item.spzt}}</div>
                </td>
                <td>
                  <div>{{item.zfzt}}</div>
                </td>
                <td>
                  <div>{{item.zfrq}}</div>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-size="12"
          layout="slot, jumper"
          :total="total"
        >
          <span>当前 第 {{currentPage}} 页</span>
          <span>共 {{total%pageSize>0?total%pageSize+1:total%pageSize}} 页</span>
          <span
            @click="currentPage!=1?changePage(1):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==1}"
          >首页</span>
          <span
            @click="currentPage!=1?changePage(currentPage-1):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==1}"
          >上一页</span>
          <span
            @click="currentPage!=(total%pageSize>0?total%pageSize+1:total%pageSize)?changePage(currentPage+1):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==(total%pageSize>0?total%pageSize+1:total%pageSize)}"
          >下一页</span>
          <span
            @click="currentPage!=(total%pageSize>0?total%pageSize+1:total%pageSize)?changePage(total%pageSize>0?total%pageSize+1:total%pageSize):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==(total%pageSize>0?total%pageSize+1:total%pageSize)}"
          >最后一页</span>
        </el-pagination>
      </div>
    </div>
    <div class="mask" v-show="showMask"></div>
    <!-- 支付单查看 -->
    <pay-list :data="payList"></pay-list>
    <!-- <div class="dialogContainer" :class="{lowIndex:index>1}" v-show="showPayList">
      <div class="payCenterDialog largeDialog">
        <div class="header">
          支付单查看
          <i @click="closeDialog('showPayList')" class="el-icon-close"></i>
        </div>
        <div class="btns">
          <span class="payId">支付单号：201904180001</span>
          <template v-if="itemType == 'error'">
            <span class="btn btn-large" @click="save('showErrorHandle')">异常处理</span>
            <span class="btn btn-large" @click="save('new')">重新支付</span>
          </template>
          <template v-if="itemType == 'notApprove'">
            <span class="btn btn-large" @click="save('')">保存</span>
            <span class="btn btn-large" @click="save('showApprove')">保存并送审</span>
          </template>
          <template v-if="itemType =='pay'">
            <span class="btn btn-large" @click="save('showMergePay')">支付</span>
          </template>
          <span class="btn btn-large">打印</span>
        </div>
        <div class="content payList">
          <h1>付款方</h1>
          <div class="payDetail">
            <h2>付款单位：浙江省总工会</h2>
            <h2>
              <span>
                付款账户：
                <el-select v-model="account" placeholder="请选择" size="mini">
                  <el-option label="账号A" value="1"></el-option>
                  <el-option label="账号B" value="2"></el-option>
                  <el-option label="XXXXX" value="3"></el-option>
                </el-select>
              </span>
              <span>
                支付方式：
                <el-select v-model="payWay" placeholder="请选择" size="mini">
                  <el-option label="网银" value="1"></el-option>
                  <el-option label="现金" value="2"></el-option>
                  <el-option label="支票" value="3"></el-option>
                </el-select>
              </span>
            </h2>
          </div>
          <h1>收款方</h1>
          <div class="getDetail">
            <div>
              批量设置转账方式
              <el-select v-model="bankType" placeholder="请选择" size="mini">
                <el-option label="同行" value="1"></el-option>
                <el-option label="跨行" value="2"></el-option>
              </el-select>
            </div>
            <el-table max-height="250px" :data="payList" border>
              <el-table-column type="index" width="80">
                <template slot="header" slot-scope="scope">
                  <el-checkbox @change="selectAll">序号</el-checkbox>
                </template>
                <template slot-scope="scope">
                  <el-checkbox
                    @change="selectOne(scope)"
                    :label="scope.$index"
                    v-model="scope.row.choosed"
                  >{{scope.$index+1}}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                v-for="item in payHeaders1"
                :property="item.name"
                :label="item.label"
                :width="item.width||''"
                :header-align="item.headerAlign||'center'"
              ></el-table-column>
            </el-table>
          </div>
          <div>
            <span>待送审</span>
            <span>未支付</span>
            <span @click="showFundDetail">点击查看关联申请单信息（申请编号：20191010201212）</span>
          </div>
        </div>
      </div>
    </div>-->
    <!-- 合并支付 -->
    <div class="dialogContainer" :class="{lowIndex:index>2}" v-show="showMergePay">
      <div class="payCenterDialog">
        <div class="header">
          合并支付
          <i @click="closeDialog('showMergePay')" class="el-icon-close"></i>
        </div>
        <div class="content">
          <img src="@/assets/images/mergepay.png" alt>
          <span>合计支付1982,834.24元？</span>
        </div>
        <div class="btns">
          <span class="btn btn-cancel" @click="closeDialog('showMergePay')">取消</span>
          <span class="btn" @click="enterPassword">确定</span>
        </div>
        <el-collapse>
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-menu" style="margin-left:10px;"></i>点击查看详细收款信息
            </template>
            <el-table height="250px" :data="gridData" border>
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column property="date" label="收款方姓名" width="200"></el-table-column>
              <el-table-column property="name" label="待付金额" width="200"></el-table-column>
              <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
              <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
              <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
              <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 支付口令 -->
    <div class="dialogContainer" :class="{lowIndex:index>2}" v-show="showPassword">
      <div class="payCenterDialog smallDialog">
        <div class="header">
          请输入支付口令
          <i @click="closeDialog('showPassword')" class="el-icon-close"></i>
        </div>
        <div class="content">
          <img src="@/assets/images/mergepay.png" alt>
          <el-input v-model="password" placeholder="请输入支付口令" show-password></el-input>
        </div>
        <div class="btns">
          <span class="btn btn-cancel" @click="closeDialog('showPassword')">取消</span>
          <span class="btn" @click="pay">支付</span>
        </div>
      </div>
    </div>
    <!-- 异常处理 -->
    <div class="dialogContainer" :class="{lowIndex:index>2}" v-show="showErrorHandle">
      <div class="payCenterDialog smallDialog">
        <div class="header">
          支付异常处理
          <i @click="closeDialog('showErrorHandle')" class="el-icon-close"></i>
        </div>
        <div class="content">
          <el-radio-group v-model="radio">
            <el-radio :label="0">发起线上异常处理。</el-radio>
            <el-radio :label="1">线下确认已成功支付，消除异常。</el-radio>
          </el-radio-group>
        </div>
        <div class="btns">
          <span class="btn" @click="closeDialog('showErrorHandle')">取消</span>
          <span class="btn" @click="errorHandle">确定</span>
        </div>
      </div>
    </div>
    <!-- 送审选择 -->
    <div class="dialogContainer" :class="{lowIndex:index>2}" v-show="showApprove">
      <div class="payCenterDialog">
        <div class="header">
          送审
          <i @click="closeDialog('showApprove')" class="el-icon-close"></i>
        </div>
        <div class="btns">
          <span class="btn" @click="closeDialog('showApprove')">取消</span>
          <span class="btn" @click="songShen">确定</span>
        </div>
      </div>
    </div>
    <fund-detail :data="fundDetailData"></fund-detail>
    <xm-message :visible.sync="tishi" :message="message" :modal="false"></xm-message>
  </div>
</template>

<script>
import topHandle from '../../components/topNav/topHandle.vue'
import fundDetail from '../payfundapproval/fundDetail'
import payList from './payList.vue'
export default {
  name: 'pay',
  components: { topHandle, fundDetail, payList },
  data() {
    return {
      // dialog数据
      fundDetailData: { openDialog: false, data: {} },
      radio: '',
      bankType: '',
      account: '',
      payWay: '',
      itemType: '',
      showErrorHandle: false,
      notClosedAll: true,
      dialogCheckList: [],
      tishi: false,
      message: '',
      showApprove: false,
      showMask: false,
      paySuccess: false,
      showMergePay: false,
      showPassword: false,
      showPayList: false,
      index: 1,
      password: '',
      // 筛选数据
      sbrq: '',
      zfrq: '',
      typeList: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '资金拨付单'
        },
        {
          value: 2,
          label: '项目支出单'
        }
      ],
      type: null,
      statusList: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '待支付'
        },
        {
          value: 2,
          label: '支付异常'
        },
        {
          value: 3,
          label: '支付成功'
        }
      ],
      status: [],
      // 搜索数据
      search: '',
      // 分页
      pageSize: 12,
      currentPage: 1,
      total: 100,
      // 首页表格数据
      tableHeader: [
        {
          label: '支付单编号',
          name: 'zfdbh',
          width: 200
        },
        {
          label: '支付金额',
          name: 'zfje'
        },
        {
          label: '单据类型',
          name: 'djlx'
        },
        {
          label: '申请单编号',
          name: 'sqdbh'
        },
        {
          label: '申报日期',
          name: 'sbrq'
        },
        {
          label: '审批状态',
          name: 'spzt'
        },
        {
          label: '支付状态',
          name: 'zfzt'
        },
        {
          label: '支付日期',
          name: 'zfrq'
        }
      ],
      tableData: [
        {
          checked: false,
          zfdbh: 201904180001,
          zfje: '4,567.90',
          djlx: '资金拨付单',
          sqdbh: '201901300008',
          sbrq: '2019-04-17 15：21',
          spzt: '待送审',
          zfzt: '待支付',
          zfrq: '——'
        },
        {
          checked: false,
          zfdbh: 201904180001,
          zfje: '4,567.90',
          djlx: '资金拨付单',
          sqdbh: '201901300008',
          sbrq: '2019-04-17 15：21',
          spzt: '审批中',
          zfzt: '待支付',
          zfrq: '——'
        },
        {
          checked: false,
          zfdbh: 201904180001,
          zfje: '4,567.90',
          djlx: '资金拨付单',
          sqdbh: '201901300008',
          sbrq: '2019-04-17 15：21',
          spzt: '未通过',
          zfzt: '待支付',
          zfrq: '——'
        },
        {
          zfdbh: 201904180001,
          zfje: '4,567.90',
          djlx: '资金拨付单',
          checked: false,
          sqdbh: '201901300008',
          sbrq: '2019-04-17 15：21',
          spzt: '审批通过',
          zfzt: '待支付',
          zfrq: '——'
        },
        {
          zfdbh: 201904180002,
          zfje: '4,567.90',
          djlx: '资金拨付单',
          checked: false,
          sqdbh: '201901300008',
          sbrq: '2019-04-17 15：21',
          spzt: '审批通过',
          zfzt: '待支付',
          zfrq: '——'
        },
        {
          zfdbh: 201904180001,
          zfje: '4,567.90',
          checked: false,
          djlx: '资金拨付单',
          sqdbh: '201901300008',
          sbrq: '2019-04-17 15：21',
          spzt: '审批通过',
          zfzt: '支付异常',
          zfrq: '——'
        },
        {
          zfdbh: 201904180001,
          zfje: '4,567.90',
          djlx: '资金拨付单',
          checked: false,
          sqdbh: '201901300008',
          sbrq: '2019-04-17 15：21',
          spzt: '审批通过',
          zfzt: '支付成功',
          zfrq: '2019-04-17 15:23'
        }
      ],
      checkAll: false,
      // 合并支付表单
      gridData: [
        {
          xuhao: 1,
          date: '浙江省总工会本级女工部',
          name: '20121254',
          address: '上海市普陀区金沙江上海市普陀18 弄'
        },
        {
          xuhao: 1,
          date: '浙江省总工会本级女工部',
          name: '20121254',
          address: '上海市普陀区金沙江上海市路 1518 弄'
        },
        {
          xuhao: 1,
          date: '浙江省总工会本级女工部',
          name: '20121254',
          address: '上海市普陀普区金路 1518 弄'
        },
        {
          xuhao: 1,
          date: '浙江省总工会本级女工部',
          name: '20121254',
          address: '上海市普陀区金沙江上金路 1518 弄'
        }
      ],
      // 支付单表单
      payList: {
        openDialog: true,
        data: {},
        itemType: ''
      }
      // payHeaders1: [
      //   {
      //     name: 'depart',
      //     label: '收款单位/部门',
      //     width: '200'
      //   },
      //   {
      //     name: 'proName',
      //     label: '明细项目名称',
      //     width: '200'
      //   },
      //   {
      //     name: 'money',
      //     label: '申请金额（元）',
      //     width: '200'
      //   },
      //   {
      //     name: 'descrilbe',
      //     label: '备注',
      //     width: ''
      //   },
      //   {
      //     name: 'kemu',
      //     label: '预算科目',
      //     width: '120'
      //   },
      //   {
      //     name: 'way',
      //     label: '转账方式',
      //     width: '120'
      //   },
      //   {
      //     name: 'getName',
      //     label: '收款方账户名称',
      //     width: '120'
      //   },
      //   {
      //     name: 'getAccount',
      //     label: '收款账号',
      //     width: '120'
      //   },
      //   {
      //     name: 'bankName',
      //     label: '开户行',
      //     width: '120'
      //   },
      //   {
      //     name: 'cardId',
      //     label: '银行行号',
      //     width: '120'
      //   }
      // ],
      // payList: [
      //   {
      //     choosed: false,
      //     depart: '杭州市总工会',
      //     proName: 'XXXXX',
      //     money: '99999',
      //     descrilbe: 'beizhu',
      //     kemu: '',
      //     way: '',
      //     getName: '',
      //     getAccount: '',
      //     bankName: '',
      //     cardId: ''
      //   },
      //   {
      //     choosed: false,
      //     depart: '杭州市总工会',
      //     proName: 'XXXXX',
      //     money: '99999',
      //     descrilbe: 'beizhu',
      //     kemu: '',
      //     way: '',
      //     getName: '',
      //     getAccount: '',
      //     bankName: '',
      //     cardId: ''
      //   },
      //   {
      //     choosed: false,
      //     depart: '杭州市总工会',
      //     proName: 'XXXXX',
      //     money: '99999',
      //     descrilbe: 'beizhu',
      //     kemu: '',
      //     way: '',
      //     getName: '',
      //     getAccount: '',
      //     bankName: '',
      //     cardId: ''
      //   },
      //   {
      //     choosed: false,
      //     depart: '杭州市总工会',
      //     proName: 'XXXXX',
      //     money: '99999',
      //     descrilbe: 'beizhu',
      //     kemu: '',
      //     way: '',
      //     getName: '',
      //     getAccount: '',
      //     bankName: '',
      //     cardId: ''
      //   },
      //   {
      //     choosed: false,
      //     depart: '杭州市总工会',
      //     proName: 'XXXXX',
      //     money: '99999',
      //     descrilbe: 'beizhu',
      //     kemu: '',
      //     way: '',
      //     getName: '',
      //     getAccount: '',
      //     bankName: '',
      //     cardId: ''
      //   }
      // ]
    }
  },
  created() {},
  mounted() {},
  methods: {
    showFundDetail() {
      this.showMask = false
      this.fundDetailData.openDialog = true
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
    // dialog中的check事件
    selectOne($scope) {
      console.log($scope)
    },
    selectAll(choosed) {
      console.log(choosed)
    },
    // 导航栏事件
    payNav(type) {
      this.noDataRefresh()
      var handleitem = []
      let checkedCount = this.tableData.reduce((prev, cur) => {
        if (cur.checked) handleitem.push(cur)
        return prev + cur.checked
      }, 0)
      if (handleitem.length < 1) {
        this.errorAlert('请至少选择一条数据进行操作。')
        return
      }
      switch (type) {
        case 'showPayList':
          if (checkedCount != 1) {
            this.errorAlert('请选择一条数据进行维护。')
            return
          } else if (
            handleitem[0].spzt == '待送审' ||
            handleitem[0].spzt == '未通过'
          ) {
            this.itemType = 'notApprove'
          } else {
            this.errorAlert(`单据已经${handleitem[0].spzt}。`)
            return
          }
          break
        case 'showMergePay':
          if (
            !handleitem.every(item => {
              return item.spzt == '审批通过' && item.zfzt == '待支付'
            })
          ) {
            this.errorAlert(
              '只有审批状态为“审批通过”，支付状态为“待支付”的单据，才可以使用【合并支付】。'
            )
            return
          }
          break
        case 'showErrorHandle':
          if (
            !handleitem.every(item => {
              return item.zfzt == '支付异常'
            })
          ) {
            this.errorAlert('只能对支付异常的单据进行处理。')
            return
          }
          break
        case 'showApprove':
          if (
            !handleitem.every(item => {
              return item.spzt == '待送审'
            })
          ) {
            this.errorAlert('只能对待送审的单据进行处理。')
            return
          }
          break
      }
      this.showMask = true
      this[type] = true
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
    // 主页错误提示
    errorAlert(message) {
      this.notClosedAll = false
      this.showMask = true
      this.message = message
      this.tishi = true
    },
    // 支付单详情事件
    save(type) {
      console.log(type)
      switch (type) {
        case '':
          this.index = 2
          this.message = '保存成功'
          this.notClosedAll = true
          this.tishi = true
        case 'showApprove':
        case 'showErrorHandle':
        case 'showMergePay':
          this.index = 2
          this[type] = true
          break
        case 'new':
          alert('newTable????')
          break
      }
    },
    // 送审请求
    songShen() {
      this.showApprove = false
      this.showPayList = false
      this.notClosedAll = false
      this.tishi = true
    },
    // 支付请求
    pay() {
      this.showPayList = false
      this.showMergePay = false
      this.showPassword = false
      this.message = '支付操作成功！具体到账情况以银行处理时间为准。'
      this.tishi = true
      this.notClosedAll = false
    },
    // 异常处理请求
    errorHandle() {
      this.message = '操作成功！请在2小时后查看状态。'
      this.showErrorHandle = false
      if (this.index == 1) {
        this.notClosedAll = false
        this.tishi = true
      } else {
        this.notClosedAll = true
        this.tishi = true
      }
    },
    // 关闭弹窗事件
    closeDialog(dialog) {
      this[dialog] = false
      console.log(dialog)
      switch (dialog) {
        case 'showPayList':
          this.showMask = false
          break
        case 'showPassword':
          this.showMergePay = true
          break
        case 'showMergePay':
        case 'showApprove':
        case 'showErrorHandle':
          if (this.index > 1) {
            this.index--
          } else {
            this.showMask = false
          }
          break
      }
    },
    // 打开输入密码
    enterPassword() {
      this.showMergePay = false
      this.showPassword = true
    },
    // 筛选
    selectType(cur) {
      console.log(cur, this.type)
    },
    selectStatus(cur) {
      console.log(cur, this.type)
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    changePage(page) {
      console.log(page)
      this.currentPage = page
    }
  },
  watch: {
    tishi(newVal) {
      if (!newVal) {
        if (this.notClosedAll) {
          this.index--
        } else {
          this.index = 1
          this.showMask = false
        }
      }
    },
    'fundDetailData.openDialog'(val) {
      if (val) {
        this.showMask = false
      } else {
        this.showMask = true
      }
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
      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 27px;
        background-image: url(../../assets/images/zj6.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center 0;
      }
      img {
        width: 100%;
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
    .selects {
      text-align: left;
      line-height: 30px;
      height: 30px;
      margin: 8px;
      box-sizing: border-box;
      font-size: 0.12rem;
      color: #757575;
      > span:not(:first-of-type) {
        margin-left: 20px;
      }
      > span + div {
        width: 150px;
        &.large-input {
          width: 210px;
        }
      }
      .btns {
        float: right;
        .search > span.btn {
          float: right;
          margin-left: -5px;
          position: relative;
          z-index: 2;
          cursor: pointer;
          border-radius: 0;
          background-color: $btnColor;
        }
      }
    }
    .pages {
      position: absolute;
      bottom: 0;
      right: 0;
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
          line-height: 30px;
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
      height: 30px;
      line-height: 30px;
    }
    .search .el-input {
      width: auto;
      font-size: 0.12rem;
    }
    .search .el-input__inner {
      font-size: 0.12rem;
      border: 1px #bbb9b9 solid;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
      height: 30px;
      line-height: 30px;
      color: #333;
    }
    .el-range-editor--mini.el-input__inner {
      height: 30px;
      line-height: 30px;
    }
    .el-input--mini,
    .el-select-dropdown__item,
    .el-range-editor--mini .el-range-separator,
    .el-range-editor--mini .el-range-input {
      font-size: 0.12rem;
      color: #757575;
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
