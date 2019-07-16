<template>
  <section>
    <div>
      <el-row>
        <el-col :span="24">
          <top-handle title="审批中心在线工作平台" type="approval"></top-handle>
        </el-col>
      </el-row>
      <div style="clear:both"></div>
      <section class="">
        <div class="container content-body">
          <el-row class="approval-body">
            <el-col :span="20">
              <!--待我审批类型-->
              <div class="approval-type">
                <div class="title">
                  <span>待我审批类型</span>
                </div>
                <div class="content">
                  <ul>
                    <li class="content-item"
                        v-for="(item,idx) in myApproval">
                      <div class="item-box"
                           @click="openApprovalList(item)">
                        <img v-if="item.Value === '001'"
                             src="../../assets/images/yk1(w).png">
                        <img v-else-if="item.Value === '002'"
                             src="../../assets/images/yk(w).png">
                        <img v-else-if="item.Value === '003'"
                             src="../../assets/images/pz(w).png">
                        <img v-else-if="item.Value === '004'"
                             src="../../assets/images/y1(w).png">
                        <img v-else-if="item.Value === '005'"
                             src="../../assets/images/ys(w).png">
                        <p>{{item.TypeName}}</p>
                        <div v-if="item.NNum != 0 && item.NNum"
                             class="triangle"></div>
                        <div v-if="item.NNum != 0 && item.NNum"
                             class="inner-triangle"></div>
                        <div v-if="item.NNum >0"
                             class="number"
                             :class="[item.NNum< 10?'position1':(item.NNum< 100 && item.NNum>11?'position2':'position3')]">
                          <span v-if="item.NNum<100">{{item.NNum}}</span>
                          <span v-else>99+</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <!--我已审批-->
              <div class="approvaled">
                <div class="title">
                  <span>我已审批</span>
                </div>
                <div class="approval-content">
                  <ul>
                    <li v-for="(item,idx) in approvaled">
                      <span :class="[idx %3 === 0 ? 'blue':(idx %3 === 1 ? 'green':'orange')]"
                            @click="approvaledClick(item)">{{item.YNum?item.YNum:"0"}}</span>
                      <p :class="[idx %3 === 0 ? 'blue':(idx %3 === 1 ? 'green':'orange')]"
                         @click="approvaledClick(item,)">{{item.TypeName}}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import SearchInput from "../../components/searchInput/searchInput";
import TopHandle from "../../components/topNav/topHandle";
import { mapState } from 'vuex'
export default {
  name: "index",
  components: { TopHandle, SearchInput },
  data () {
    return {
      myApproval: [],
      approvaled: []
    }
  },
  mounted () {
    this.getProcTypes();
    this.updateTitle()
  },
  computed: {
    ...mapState({
      OrgCode: state => state.user.orgcode,
      UserId: state => state.user.userid,
      Orgid: state => state.user.orgid,
      Year: state => state.user.year,
    })
  },
  methods: {
    //修改title
    updateTitle () {
      let title = document.getElementsByTagName('title')[0];
      title.innerText = "审批中心在线工作平台";
    },
    //获取审批类型
    getProcTypes () {
      let data = {
        Uid: this.UserId,
        Orgid: this.Orgid,
        OrgCode: this.OrgCode,
        Year: this.Year
      }
      // this.getAxios('/GAppvalProc/GetProcTypes',data).then(success=>{
      //     console.log(success);
      //   this.myApproval = success.Data;
      //   this.approvaled = success.Data
      // }).catch(err =>{
      //   console.log(err)
      // })
      this.getAxios('/GAppvalRecord/GetRecordListNum', data).then(res => {
        this.myApproval = res.Data;
        this.approvaled = res.Data
        console.log(res)
      }).catch(err => {

      })
    },
    //搜索框的回车与按钮事件
    search (val) {
      console.log(val)
    },
    //跳转到置顶的详情页面
    openApprovalList (item) {
      /**
       * '001':'资金拨付单',
       '002':'支付单',
       '003':'项目用款单',
       '004':'预算审核单',
       '005':'项目申报单'
       */
      let path = '';
      if (item.Value === '001') {
        path = '/payfundapproval' //资金拨付页面路由
      } else if (item.Value === '002') {
        path = '/paylistapproval'//支付单页面路由
      } else if (item.Value === '003') {
        path = ''
      } else if (item.Value === '004') {
        path = ''
      } else if (item.Value === '005') {
        path = ''
      } else {
        path = ''
      }
      console.log(item.PhId)
      this.$router.push({
        path: path,
        query: {
          approval: true,
          SplxPhid: item.PhId,
        }
      })
    },
    //我已审批
    approvaledClick (item) {
      let path = '';
      if (item.Value === '001') {
        path = '/payfundapproval' //资金拨付页面路由
      } else if (item.Value === '002') {
        path = '/paylistapproval'//支付单页面路由
      } else if (item.Value === '003') {
        path = ''
      } else if (item.Value === '004') {
        path = ''
      } else if (item.Value === '005') {
        path = ''
      } else {
        path = ''
      }

      this.$router.push({
        path: path,
        query: {
          approval: false,
          SplxPhid: item.PhId,
        }      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content-body {
  box-shadow: none;
  min-width: 1200px;
  min-height: 750px;
}
.search-box {
  box-shadow: 0 0px 14px #cbcbcb;
  margin: 10px 15px;
  padding: 0 15px;
  border-radius: 8px;
  > .search {
    margin: 10px;
    text-align: right;
  }
}
.approval-body {
  padding: 15px;
}
.approval-type {
  box-shadow: 0 0px 14px #cbcbcb;
  position: relative;
  margin: 0 20px 0 0;
  min-height: 650px;
  border-radius: 8px;
  padding: 10px 10px;
  > .title {
    height: 0.25rem;
    text-align: left;
    > span {
      font-weight: 800;
      font-size: 0.2rem;
      margin-left: 8px;
      color: #4f9dd5;
    }
  }
  > .content {
    > ul {
      list-style: none;
      width: 100%;
      text-align: left;
      > .content-item {
        vertical-align: bottom;
        display: inline-block;
        height: 250px;
        width: 20%;
        margin: 50px 0 0 0;
        padding: 0 2.5%;
        > .item-box {
          width: 100%;
          height: 100%;
          background-color: #7ab396;
          border-radius: 8px;
          text-align: center;
          padding-top: 70px;
          position: relative;
          &:hover {
            box-shadow: 0 0 10px #7ab396;
            cursor: pointer;
          }
          > img {
            width: 100px;
          }
          > p {
            color: #ffffff;
            font-size: 0.24rem;
            line-height: 0.24rem;
            margin-top: 20px;
          }
          > .triangle {
            width: 0;
            height: 0;
            border: 30px solid #6c8e8175;
            border-left: 30px solid transparent;
            border-bottom: 30px solid transparent;
            border-radius: 0 8px 0 0;
            position: absolute;
            top: 0;
            right: 0;
          }
          > .inner-triangle {
            width: 0;
            height: 0;
            border: 28px solid #3294e8;
            border-left: 28px solid transparent;
            border-bottom: 28px solid transparent;
            border-radius: 0 8px 0 0;
            position: absolute;
            top: 0;
            right: 0;
          }
          > .number {
            position: absolute;
            > span {
              color: #ffffff;
              font-size: 0.18rem;
            }
          }
          > .position1 {
            top: 8px;
            right: 12px;
          }
          > .position2 {
            top: 8px;
            right: 8px;
          }
          > .position3 {
            top: 8px;
            right: 6px;
          }
        }
      }
    }
  }
}
.approvaled {
  border-radius: 8px;
  padding: 10px 10px;
  margin: 0 20px 0 0;
  width: 100%;
  height: 650px;
  box-shadow: 0 0px 14px #cbcbcb;
  text-align: left;
  position: relative;
  /*overflow-x: hidden;*/
  > .title {
    height: 0.25rem;
    text-align: left;
    > span {
      font-weight: 800;
      font-size: 0.2rem;
      margin-left: 8px;
      color: #4f9dd5;
    }
  }
  > .approval-content {
    overflow-x: hidden;
    > ul {
      height: 600px;
      overflow: auto;
      margin-right: -27px;
      padding-right: 12px;
      > li {
        width: 100%;
        height: 200px;
        border-bottom: 1px solid #e3e3e3;
        text-align: center;
        padding-top: 80px;
        > span {
          font-size: 0.6rem;
          &:hover {
            cursor: pointer;
          }
        }
        > .blue {
          color: #1f6cfc;
          text-shadow: 2px 2px 6px #1f6cfc;
        }
        > .green {
          color: #92c62a;
          text-shadow: 2px 2px 6px #92c62a;
        }
        > .orange {
          color: #ff9900;
          text-shadow: 2px 2px 6px #ff9900;
        }
        > p {
          font-size: 0.2rem;
          font-weight: 500;
          text-shadow: none !important;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
