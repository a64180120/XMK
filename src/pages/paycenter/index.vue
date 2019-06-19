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
          <div ref="selectsContainer" style="transform:translateX(0)">
            <div class="tab">
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
            </div>
            <div class="tab">
              <span>支付状态</span>
              <el-select
                @change="selectStatus"
                collapse-tags
                v-model="status"
                multiple
                placeholder="请选择"
                size="mini"
                @visible-change="statusBlur"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="tab">
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
                @change="getData"
              ></el-date-picker>
            </div>
            <div class="tab">
              <span>支付日期</span>
              <el-date-picker
                v-model="zfrq"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                class="large-input"
                @change="getData"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </div>
          </div>
          <i class="el-icon-d-arrow-left"></i>
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="btns">
          <div class="search">
            <search-input placeholder="支付单编号/申请单编号" v-model="search" @btnClick="getData"></search-input>
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
                <td :class="{trActive:checkAll}" title="序号">
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
              <tr
                :class="{trActive:item.Mst.checked}"
                v-for="(item,index) in tableData"
                :key="index"
              >
                <td @click.self="selectItem(item)">
                  <el-checkbox v-model="item.Mst.checked" @change="handleCheckOne(item)">{{index+1}}</el-checkbox>
                </td>
                <td>
                  <span @click.stop="payNav('payListData',item)" class="atype">{{item.Mst.FCode}}</span>
                </td>
                <td>
                  <div>{{item.Mst.FAmountTotal | NumFormat}}</div>
                </td>
                <td>
                  <div>{{typeList.find(i=>item.Mst.FBilltype == i.value).label}}</div>
                </td>
                <td>
                  <div>{{item.Mst.RefbillCode}}</div>
                </td>
                <td>
                  <div>{{item.Mst.NgInsertDt.replace('T',' ')}}</div>
                </td>
                <td>
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
                  <div>{{item.Mst.FDate?item.Mst.FDate.replace('T',' '):"————"}}</div>
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
    <pay-list :data="payListData"></pay-list>
    <merge-pay v-if="mergePayData.openDialog" :data="mergePayData"></merge-pay>
    <pay-error-handle v-if="payErrorHandleData.openDialog" :data="payErrorHandleData"></pay-error-handle>
    <go-approval v-if="approvalData.openDialog" :bType="'002'" :data="approvalData"></go-approval>
  </div>
</template>

<script>
// import topHandle from '../../components/topNav/topHandle.vue'
// import searchInput from '../../components/searchInput/searchInput'
// import payList from './payList.vue'
// import mergePay from './mergePay.vue'
// import payErrorHandle from './payErrorHandle.vue'
// import goApproval from './goApproval.vue'
import { mapState } from 'vuex'
export default {
  name: 'pay',
  components: {
    //topHandle,
    //payList,
   // mergePay,
    //payErrorHandle,
    //goApproval,
   // searchInput
  },
  provide() {
    return { refreshIndexData: this.getData }
  },
  data() {
    return {
      needSet: true,
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
      tableData: []
    }
  },
  created() {},
  mounted() {
    this.getData()
    // var vm = this
    // let container = vm.$refs.selectsContainer, //滚动容器
    //   tabs = document.querySelectorAll('.selects>div>.tab'),
    //   contentWidth = 0, //所有tab总宽度
    //   tabsWidth = [], //各个tab筛选条件宽度
    //   left = document.querySelector('.selects>i.el-icon-d-arrow-left'),
    //   right = document.querySelector('.selects>i.el-icon-d-arrow-right')
    // tabs.forEach(item => {
    //   contentWidth += item.offsetWidth
    //   tabsWidth.push(item.offsetWidth)
    // })
    // function getComWidth(ele, cla) {
    //   return parseInt(
    //     (window.getComputedStyle
    //       ? window.getComputedStyle(ele, cla || null)
    //       : ele.currentStyle
    //     ).width
    //   )
    // }
    // function resize() {
    //   let containerWidth = getComWidth(container)
    //   if (containerWidth >= contentWidth) {
    //     container.className = ''
    //     container.style.transform = 'translateX(0)'
    //   } else {
    //     container.className = 'scroll'
    //     if (contentWidth - getTrans() <= containerWidth) {
    //       container.style.transform = `translateX(-${contentWidth -
    //         containerWidth}px)`
    //     }
    //   }
    // }
    // function getTrans() {
    //   return container.style.transform.match(/\d+/) == -1
    //     ? 0
    //     : container.style.transform.match(/\d+/)[0]
    // }
    // left.onclick = function() {
    //   let trans = getTrans()
    //   if (trans != 0) {
    //     let containerWidth = getComWidth(container),
    //       index = 0,
    //       totalWidth = 0
    //     for (let i of tabsWidth) {
    //       if (totalWidth + i >= trans) {
    //         container.style.transform = `translateX(-${totalWidth}px)`
    //         break
    //       }
    //       totalWidth += i
    //     }
    //   }
    // }
    // right.onclick = function() {
    //   let containerWidth = getComWidth(container),
    //     index = 0,
    //     totalWidth = 0
    //   for (let i of tabsWidth) {
    //     if (totalWidth - getTrans() + i > containerWidth) {
    //       container.style.transform = `translateX(-${totalWidth +
    //         i -
    //         containerWidth}px)`
    //       break
    //     }
    //     totalWidth += i
    //   }
    // }
    // window.onresize = resize
    // resize()
  },
  methods: {
    selectItem(item) {
      item.Mst.checked = !item.Mst.checked
    },
    getData() {
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
    handleCheckOne(item) {
      console.log(item)
    },
    // 导航栏事件
    payNav(type, item) {
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
              this.tableData.forEach(item => {
                item.Mst.checked = false
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
              this.tableData.forEach(item => {
                item.Mst.checked = false
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
              this.tableData.forEach(item => {
                item.Mst.checked = false
              })
              return
            }
            break
          case 'payErrorHandleData':
            if (
              !handleitem.every(item => {
                return item.Mst.FState == 2
              })
            ) {
              this.$msgBox.error('只能对支付异常的单据进行处理。')
              this.tableData.forEach(item => {
                item.Mst.checked = false
              })
              return
            } else if (
              handleitem.some(item => {
                return item.Dtls.some(item => item.FNewCode)
              })
            ) {
              this.$msgBox.error('只能对未重新支付的单据进行处理。')
              this.tableData.forEach(item => {
                item.Mst.checked = false
              })
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
              this.tableData.forEach(item => {
                item.Mst.checked = false
              })
              return
            }
            if (
              !handleitem.every(item => {
                return (
                  item.Mst.FPaymethod != 0 &&
                  item.Dtls.every(subitem => {
                    return !!subitem.BankPhid
                  })
                )
              })
            ) {
              this.$msgBox.error('请先完善数据信息')
              this.tableData.forEach(item => {
                item.Mst.checked = false
              })
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
      year: state => state.user.year
    })
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
      color: #676767;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 10px;
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
      height: 29px;
      margin: 8px 240px 8px 0px;
      box-sizing: border-box;
      color: #757575;
      overflow: hidden;
      position: relative;
      > i {
        font-size: 0.2rem;
        width: 0;
        transition: all 0.3s linear;
        background: #fff;
        z-index: 2;
        line-height: 29px;
        position: absolute;
        height: 100%;
        cursor: pointer;
      }
      > div {
        white-space: nowrap;
        font-size: 0;
        transition: all 0.3s linear;
        height: 29px;
        box-sizing: content-box;
        &.scroll {
          padding: 0 0.2rem;
          ~ i {
            width: 0.2rem;
            &:hover {
              color: $btnColor;
            }
            &.el-icon-d-arrow-left {
              left: 0;
              top: 0px;
            }
            &.el-icon-d-arrow-right {
              right: 0;
              top: 0px;
            }
          }
        }
        .tab {
          height: 29px;
          display: inline-block;
          &:first-of-type > span {
            margin-left: 0;
          }
          > span {
            font-size: 0.14rem;
            margin-left: 10px;
          }
          > span + div {
            width: 150px;
            margin-left: 10px;
            &.large-input {
              width: 320px;
            }
          }
        }
      }
    }
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
  .el-checkbox,
  .el-checkbox__input.is-checked + .el-checkbox__label,
  .el-checkbox-button__inner {
    color: #333;
  }
  .el-checkbox__label {
    font-size: 0.14rem;
  }
  .selects {
    .el-range-editor--mini.el-input__inner {
      height: 28px;
      line-height: 28px;
    }
    .el-select-dropdown__item,
    .el-range-editor--mini .el-range-separator,
    .el-range-editor--mini .el-range-input {
      font-size: 0.14rem;
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
}
</style>
