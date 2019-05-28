<template>
    <section >
      <div>
        <el-row>
          <el-col :span="24">
            <top-handle title="审批中心在线工作平台"></top-handle>
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
                        <li class="content-item" v-for="i in 7">
                          <div class="item-box">
                            <img src="../../assets/images/yk1.png">
                            <p>资金拨付审批</p>
                            <div class="triangle"></div>
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
                      <div class="content-item">
                        <ul>
                          <li  v-for="(item,idx) in approvaled">
                            <span class="item-value" :class="[idx === 0?'blue':(idx === 1?'green':'orange')]">{{item.value}}</span>
                            <br>
                            <span class="item-title" @click="approvaledClick(item.path)">{{item.label}}</span>
                          </li>
                        </ul>
                      </div>
                      <div class="detail-all">
                        <span>查看全部</span>
                      </div>
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
    export default {
        name: "index",
      components: {TopHandle, SearchInput},
      data(){
          return{
            myApproval:[{
              label:"资金拨付审批",
              approvalValue:'6',
              path:'/payfundapproval'
            },{
              label:"支付单审批",
              approvalValue:'0',
              path:'/paylistapproval'
            },{
              label:"项目用款审批",
              approvalValue:'6',
              path:''
            },{
              label:"项目申报审批",
              approvalValue:'200',
              path:''
            },{
              label:"年度预算审批",
              approvalValue:'0',
              path:''
            },],
            approvaled:[{
              label:"资金拨付单",
              value:"67",
              path:'/payfundapproval'
            },{
              label:"支付单",
              value:"12",
              path:'/paylistapproval'
            },{
              label:"项目用款单",
              value:"56",
              path:''
            }]
          }
      },
      methods:{
          //搜索框的回车与按钮事件
        search(val){
          console.log(val)
        },
        //跳转到置顶的详情页面
        openApprovalList(path){
          this.$router.push({
            path:path,
            query:{
              approval:true
            }
          })
        },
        //我已审批
        approvaledClick(path,label){
          this.$router.push({
            path:path,
            query:{
              approval:false
            }})
        }
      }
    }
</script>
<style lang="scss" scoped>
  .content-body{
    box-shadow: none;
    min-width: 1200px;
    min-height: 750px;
  }
  .search-box{
    box-shadow: 0 0px 14px #cbcbcb;
    margin:10px 15px;
    padding:0 15px;
    border-radius: 8px;
    >.search{
      margin: 10px;
      text-align: right;
    }
  }
  .approval-body{
    padding: 15px;
  }
  .approval-type{
    box-shadow: 0 0px 14px #cbcbcb;
    position: relative;
    margin: 0 20px 0 0;
    min-height: 700px;
    border-radius: 8px;
    padding: 10px 10px;
    >.title{
      height: 0.25rem;
      text-align: left;
      >span{
        font-weight: 800;
        font-size: 0.20rem;
        margin-left: 8px;
        color: #4F9DD5;
      }
    }
    >.content{
      >ul{
        list-style: none;
        width: 100%;
        text-align: left;
        >.content-item{
          display: inline-block;
          width: 20%;
          margin:50px 0 0 0;
          padding: 0 2.5%;
          >.item-box{
            width: 100%;
            height: 250px;
            background-color: #7AB396;
            border-radius: 8px;
            text-align: center;
            padding-top: 70px;
            >img{
              width: 100px;
            }
            >p{
              color: #ffffff;
              font-size: 0.24rem;
              line-height: 0.24rem;
              margin-top: 20px;
            }
            >.triangle{
              width: 0;
              height: 0;
              border: 50px s;

            }
          }
        }
      }
    }
  }
  .approvaled{
    border-radius: 8px;
    padding:10px 20px;
    width: 100%;
    min-height: 650px;
    box-shadow: 0 0px 14px #cbcbcb;
    text-align: left;
    position: relative;
    >div{
      display: inline-block;
    }
    >.title{
      border-left: 10px solid #FF9900;
      height: 0.25rem;
      text-align: left;
      >span{
        font-size: 0.18rem;
        margin-left: 8px;
        color: #4F9DD5;
      }
    }
    >.approval-content{
      min-height: 90%;
      height: 100%;
      >.content-item{
        display: inline-block;
        >ul{
          list-style: none;
          float: left;
          >li{
            text-align: center;
            width: 100%;
            display: inline-block;
            margin-left: 20px;
            padding: 25px;
            >.item-value{
              line-height: 50px;
              font-size: 0.36rem;
            }
            >.blue{
              color: #1F6CFC;
            }
            >.green{
              color:#92C62A
            }
            >.orange{
              color: #FF9900;
            }
            >.item-title{
              font-size:0.18rem ;
              font-family: 宋体;
              &:hover{
                cursor: pointer;
              }
            }
          }
        }
      }
      >.detail-all{
        position: absolute;
        bottom: 20px;
        right:20px;
        >span{
          color:#B7302D;
          font-size: 0.16rem;
          text-decoration: underline;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
