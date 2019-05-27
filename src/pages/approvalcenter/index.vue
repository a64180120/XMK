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
              <!--搜索框-->
              <el-row class="search-box">
                <el-col :span="24" class="search">
                  <search-input @btnClick="search"></search-input>
                </el-col>
              </el-row>
              <!--待我审批类型-->
              <el-row>
                <el-col :span="24">
                  <div class="approval-type">
                    <div class="title">
                      <span>待我审批类型</span>
                    </div>
                    <div class="content">
                      <div class="content-item" v-for="(item,idx) in myApproval" @click="openApprovalList(item.path,item.label)">
                        <img v-if="idx === 0" src="../../assets/images/yk1.png">
                        <img v-else-if="idx === 1" src="../../assets/images/yk.png">
                        <img v-else-if="idx === 2" src="../../assets/images/pz.png">
                        <img v-else-if="idx === 3" src="../../assets/images/y1.png">
                        <img v-else-if="idx === 4" src="../../assets/images/ys.png">
                        <span>{{item.label}}</span>
                        <div v-if="item.approvalValue>0" class="badge">
                          <span v-if="item.approvalValue<100">{{item.approvalValue}}</span>
                          <span v-else>99+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!--我已审批-->
              <el-row>
                <el-row :span="24">
                  <div class="approvaled">
                    <div class="title">
                      <span>我<br />已<br />审<br/>批</span>
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
                </el-row>
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
    min-width: 1200px;
    min-height: 500px;
  }
  .search-box{
    margin: 10px;
    >.search{
      text-align: right;
    }
  }
  .approval-type{
    background-color:#EFEFEF;
    max-width: 100%;
    height: 330px;
    margin: 0 20px;
    border-radius: 20px;
    padding: 10px 20px;
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
  }
  .content{
    max-width: 100%;
    height: 270px;
    margin: 20px 10px;
    >.content-item{
      width:22%;
      margin:0 1.5% 35px 1.5%;
      height: 100px;
      background-color: #ffffff;
      border-radius: 5px;
      display: inline-block;
      float: left;
      position: relative;
      border: 2px solid #ffffff;
      &:hover{
        border: 2px solid #1F6CFC;
        cursor: pointer;
      }
      >img{
        margin-left: -25px;
        transform: scale(0.5,0.5);
        margin-top: 0px;
        width: 100px;
      }
      >i{
        height: 100px;
        line-height: 100px;
        font-size: 0.35rem;
        color:$primaryColor
      }
      >span{
        margin-left: -15px;
        height: 100px;
        line-height: 100px;
        font-size: 0.24rem;
        font-family: 宋体;
        font-weight: 800;
      }
      >.badge{
        position: absolute;
        top: -18px;
        right: -18px;
        height: 36px;
        width: 36px;
        z-index: 1;
        border-radius: 18px;
        background-color: #1F6CFC;
        >span{
          color: #ffffff;
          line-height: 36px;
          font-size: 0.16rem;
        }
      }
    }
  }
  .approvaled{
    margin: 20px;
    >div{
      display: inline-block;
      float: left;
    }
    >.title{
      padding-top: 18px;
      height: 135px;
      width: 5%;
      background-color: #B7302D;
      border-radius: 8px 0 0 8px;
      border: 2px solid #B7302D;
      >span{
        color: #ffffff;
        width: 50px;
        font-size: 0.16rem;
        line-height: 25px;
      }

    }
    >.approval-content{
      width: 94%;
      height: 135px;
      border: 2px solid #B7302D;
      border-radius: 0 8px 8px 0;
      display: flex;
      >.content-item{
        width:90% ;
        height: 100%;
        display: inline-block;
        >ul{
          list-style: none;
          float: left;
          >li{
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
        height: 85%;
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
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
