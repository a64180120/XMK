<template>
  <section>
    <div class="dialog-content">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="top-btn">
            <el-button class="btn" size="mini">生成支付单</el-button>
            <el-button class="btn" size="mini">送审</el-button>
            <el-button class="btn" size="mini" @click="msgType=true">删除</el-button>
            <!--<el-button class="btn" size="mini">审批</el-button>
            <el-button class="btn" size="mini">取消审批</el-button>-->
            <el-button class="btn" size="mini">打印</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <el-col :span="5">
          <div class="left-card">
            <i class="el-icon-edit-outline"></i>
            <span>待审核</span>
            <div>
              <!--申请信息-->
              <div class="apply-info">
                <span class="title">附件</span>
                <div class="appendix-item" v-for="(item,idx) in projectItem">
                  <span class="title"><i class="el-icon-s-order"></i>{{item.projectName}}</span>
                  <ul>
                    <li v-for="(folder,idx) in item.projectFolder">{{folder}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="detail-table">
            <div class="title">
              <span>资金拨付申请单</span>
            </div>
            <div class="top">
              <ul>
                <li>申报单位/部门：{{data.applyDepart}}</li>
                <li>申报日期：{{data.applyDate}}</li>
                <li>单位：元</li>
              </ul>
            </div>
            <div class="content">
              <div class="top-tbody">
                <table>
                  <colgroup>
                    <col width="16%">
                    <col width="84%">
                  </colgroup>
                  <tbody>
                  <tr>
                    <td>申请单号</td>
                    <td>{{applyNum}}</td>
                  </tr>
                  <tr>
                    <td>申请单位名称</td>
                    <td>{{data.applyDepart}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="top-total">
                <table>
                  <colgroup>
                    <col width="16%">
                    <col width="44%">
                    <col width="20%">
                    <col width="20%">
                  </colgroup>
                  <tbody>
                  <tr>
                    <td>申请说明</td>
                    <td></td>
                    <td>申请金额合计</td>
                    <td>{{data.applyAmount}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="title">
                <table>
                  <colgroup>
                    <col width="84%">
                  </colgroup>
                  <tbody>
                  <tr>
                    <td>申请拨付明细</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="bottom-thead">
                <table>
                  <colgroup>
                    <col width="16%">
                    <col width="16%">
                    <col width="16%">
                    <col width="20%">
                    <col width="16%">
                    <col width="16%">
                  </colgroup>
                  <tbody>
                  <tr>
                    <td>项目编码</td>
                    <td>项目名称</td>
                    <td>补助单位/部门</td>
                    <td>明细项目名称</td>
                    <td>申请金额</td>
                    <td>备注</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="bottom-tbody">
                <table>
                  <colgroup>
                    <col width="16%">
                    <col width="16%">
                    <col width="16%">
                    <col width="20%">
                    <col width="16%">
                    <col width="16%">
                  </colgroup>
                  <tbody>
                  <tr v-for="i in 6">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="msgType"
      width="500px"
      height="100px"
      append-to-body
      id="delDialog"
    >
      <p>确定删除该记录？</p>
      <span slot="footer"   style="text-align: center">
        <button class="cancelBtn"  @click="msgType=false">取消</button>
        <button class="confirmBtn" style="margin-left: 30px" @click="deleteApply">确定</button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="delmsgType"
      width="500px"
      height="100px"
      :before-close="handleClose"
      append-to-body>
      <p>{{msg}} &nbsp（{{time}}s）后自动关闭</p>
      <span slot="footer">
        <button class="confirmBtn"  @click="handleClose">确定</button>
      </span>
    </el-dialog>
  </section>

  <!--内层弹框-->
</template>

<script>
    export default {
        name: "applybill",
      props:{applyNum:Number},
      data(){
          return {
            msgType:false,//删除弹窗
            delSOD:true,//是否删除成功
            delmsgType:false,//点击删除后的提示弹窗
            msg:'',//删除提示消息
            time:3,//倒计时
            data:{applyDepart:'浙江省总工会本级办公室',
              applyDate:new Date().getDate(),
              applyAmount:'100000'},
            projectItem: [{
              projectName: 'XXXXX项目A',
              projectFolder: ['附件1', '附件2', '附件3', '附件4']
            }, {
              projectName: 'XXXXX项目B',
              projectFolder: ['附件1', '附件2', '附件3', '附件4']
            }, {
              projectName: 'XXXXX项目C',
              projectFolder: ['附件1', '附件2', '附件3', '附件4']
            }]
          }
      },
      watch:{
        applyNum(){
          this.getApply();
        },
      },
      mounted(){
          this.$nextTick(
            this.getApply()
          );

      },
      methods:{
          //申请单查看
        getApply:function(){
          console.log(this.applyNum+'这里添加数据查询方法');
        },
        //生成支付单
        creatApply:function(){
          console.log(this.applyNum+'这里添加数据查询方法');
        },
        //送审
        postApply:function(){
          console.log(this.applyNum+'这里添加数据查询方法');
        },
        //删除
        deleteApply:function(){
          console.log(this.applyNum+'这里添加数据查询方法');
          this.msgType=false;
          this.delmsgType=true;
          this.delSOD=true;
          if(this.delSOD){
            this.msg='删除成功！'
          }else{
            this.msg='删除失败，请稍后重试！'
          }
          this.timer()
        },
        //打印
        printApply:function(){
          console.log(this.applyNum+'这里添加数据查询方法');
        },
        //删除后提示弹窗关闭操作
        handleClose:function(){
          this.delmsgType=false;
          if(this.delSOD){
            this.$emit('delete',true)
          };
        },
        //提示窗口倒计时
        timer:function(){
          setTimeout(()=>{
            if(this.time>1){
              this.time--;
              this.timer()
            }else{
              this.time=3;
              this.handleClose();
            }
            //this.$forceUpdate();
          },1000)
        }
      }
    }
</script>

<style scoped lang="scss">
  .dialog-title {
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }

  .content {
    height: 470px;
    padding: 20px 0 0 0;
  }

  .left-card {
    background-color: $btnColor;
    height: 200px;
    max-width: 100%;
    border-radius: 8px;
    position: relative;
    padding: 7%;

    > i {
      font-size: 0.2rem;
      color: #91BFF8;
    }

    > span {
      font-size: 0.2rem;
      font-family: 宋体;
      color: #FFFF00;
      text-decoration: underline;
    }

    > div {
      background-color: #ffffff;
      position: absolute;
      width: 86%;
      height: 350px;
      border-radius: 8px;
      box-shadow: 0px 2px 10px #888888;
      margin-top: 20px;
      margin-right: -15px;
      overflow: auto;

      > .apply-info {
        padding: 8px;

        > .title {
          font-size: 0.20rem;
          font-weight: 800;
          font-family: 宋体;
        }

        > .appendix-item {
          margin-bottom: 15px;

          > .title {
            font-size: 0.16rem;

            > i {
              color: red;
            }
          }

          > ul {
            padding: 0 20px;

            > li {
              text-align: left;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }

  .detail-table {
    height: 450px;
    overflow: auto;
    width: 100%;

    > .title {
      > span {
        font-size: 0.2rem;
      }
    }

    > .top {
      > ul {
        list-style: none;
        float: left;
        width: 100%;

        > li {
          width: 33%;
          display: inline-block;
        }

        > li:first-child {
          text-align: left;
        }

        > li:last-child {
          text-align: right;
        }
      }
    }

    > .content {
      > .top-tbody {
        > table {
          border: 1px solid #eaeaea;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 30px;
              }
            }
          }
        }
      }
      > .top-total{
        > table {
          border: 1px solid #eaeaea;
          border-top: none;
          border-bottom: none;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 100px;
                border-top: none;
                /*border-bottom: none;*/
              }
            }
          }
        }
      }
      > .title{
        > table {
          border: 1px solid #eaeaea;
          border-top: none;
          border-bottom: none;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 30px;
                border-top: none;
                /*border-bottom: none;*/
              }
            }
          }
        }
      }
      > .bottom-thead{
        > table {
          border: 1px solid #eaeaea;
          border-top: none;
          border-bottom: none;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 30px;
                border-top: none;
                /*border-bottom: none;*/
              }
            }
          }
        }
      }
      > .bottom-tbody{
        > table {
          border: 1px solid #eaeaea;
          border-top: none;
          border-bottom: none;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 30px;
                border-top: none;
                /*border-bottom: none;*/
              }
            }
          }
        }
      }
    }
  }
  .top-btn{
    text-align: right;
  }

</style>
<style>
  #delDialog .el-dialog__footer{
    text-align: center;
  }
</style>
