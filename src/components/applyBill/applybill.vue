<template>
  <section>
    <div class="dialog-content">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="top-btn">
            <slot name="btn-group">
              <el-button class="btn" size="mini" style="padding: 0;" @click="creatApply">生成支付单</el-button>
              <el-button class="btn" size="mini" @click="postApply">送审</el-button>
              <el-button class="btn" size="mini" @click="msgType=true">删除</el-button>
              <!--<el-button class="btn" size="mini" @click="checkApply">审批</el-button>
              <el-button class="btn" size="mini" @click="cancelApply">取消审批</el-button>-->
              <el-button class="btn" size="mini" >打印</el-button>
            </slot>

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
                    <li  v-for="(folder,idx) in item.projectFolder" @click="clickFolder(folder)">{{folder}}</li>
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
                <li>单位：4396.00元</li>
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
                    <td>{{data.BNum}}</td>
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
                    <td>{{data.BDescribe}}</td>
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
                  <tr v-for="(item,idx) in data.table">
                    <td :rowspan="idx%3==0 ?'3':'1'" v-if="idx%3==0">
                      {{item.id}}
                    </td>
                    <td :rowspan="idx%3==0 ?'3':'1'" v-if="idx%3==0">
                      {{item.BName}}
                    </td>
                    <td>{{item.depart}}</td>
                    <td>{{item.name}}</td>
                    <td style="text-align: right">{{item.amount}}</td>
                    <td >{{item.remark}}</td>
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
    <!--送审-->
    <go-approval  :data="approvalDataS"></go-approval>
    <!--生成支付单-->
    <approval-dialog ref="approvalDialog" :title="appDialog.title" :btn-group="appDialog.btnGroup" :data="approvalData"></approval-dialog>
  </section>

  <!--内层弹框-->
</template>

<script>
    import ApprovalDialog from "../../pages/payfundapproval/approvalDialog";
    import goApproval from '../../pages/paycenter/goApproval.vue';
    export default {
        name: "applybill",
      components: {ApprovalDialog,goApproval},
      props:{applyNum:String},
      data(){
          return {
            msgType:false,//删除弹窗
            delSOD:true,//是否删除成功
            delmsgType:false,//点击删除后的提示弹窗
            msg:'',//删除提示消息
            time:3,//倒计时
            data:{applyDepart:'浙江省总工会本级办公室',
              applyDate:new Date().getFullYear()+"-"+ (new Date().getMonth()+1)+"-"+ new Date().getDate(),
              applyAmount:'4,567.90',
              BNum:'201904180001',
              BDescribe:'本申请款用于工会基础设施建设使用',
              table:[{
                id:'2019050300001',
                BName:'预算款报表项目申请',
                depart:'宁波市总工会',
                name:'预算款报表',
                amount:"22,384.00",
                remark:''
              },{
                id:'2019050300001',
                BName:'预算款报表项目申请',
                depart:'杭州市总工会',
                name:'预算款报表',
                amount:"384.40",
                remark:''
              },{
                id:'2019050300001',
                BName:'预算款报表项目申请',
                depart:'舟山市总工会女工部',
                name:'预算款报表',
                amount:"26.60",
                remark:''
              },{
                id:'2019050300001',
                BName:'往来明细款项目申请',
                depart:'宁波市总工会',
                name:'往来明细款',
                amount:"4,320.40",
                remark:''
              },{
                id:'2019050300001',
                BName:'往来明细款项目申请',
                depart:'杭州市总工会',
                name:'往来明细款',
                amount:"30.40",
                remark:''
              }]
            },
            projectItem: [{
              projectName: '预算款报表项目',
              projectFolder: ['附件资料图片1.png', '附件资料图片2.png', '附件资料图片3.png', '附件资料图片4.png']
            }, {
              projectName: '往来款报表项目',
              projectFolder: ['附件资料图片1.png', '附件资料图片2.png', '附件资料图片3.png']
            }],
            //生成支付单
            appDialog:{
              title:'',
              btnGroup: {
                cancelName:"",
                onfirmName:""
              }
            },
            approvalData:{
            },
            //送审
            approvalDataS: {
              openDialog: false,
              data: {}
            },
            timeF:'',
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
          this.appDialog.title = '审批并生成支付单'
          this.appDialog.btnGroup.cancelName = '取消'
          this.appDialog.btnGroup.onfirmName = '生成支付单'
          this.$refs.approvalDialog.changeDialog()
        },
        //送审
        postApply:function(){
          console.log(this.applyNum+'这里添加数据查询方法');
          this.approvalDataS.openDialog=true
        },
        //审批
        checkApply:function(){

        },
        //取消审批
        cancelApply:function(){

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
            clearTimeout(this.timeF);
            this.time=3;
            this.$emit('delete',true)
          };
        },
        //提示窗口倒计时
        timer:function(){
          this.timeF=setTimeout(()=>{
            if(this.time>1){
              this.time--;
              this.timer()
            }else{
              this.time=3;
              this.handleClose();
            }
            //this.$forceUpdate();
          },1000)
        },
        //点击文件列表
        clickFolder(file){
          this.$emit('showImg',file)
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
    min-height: 470px;
    padding: 20px 0 0 0;
    height: 100%;
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
              text-decoration: underline;
              color: #3294E8;
              text-align: left;
              margin-bottom: 5px;
              &:hover{
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  .detail-table {
     min-height: 650px;
    overflow: auto;
    width: 100%;

    > .title {
      background-color: #3294e8;
      border-radius: 6px 6px 0 0;
      height: 35px;
      > span {
        font-size: 0.2rem;
        line-height: 35px;
        color: #ffffff;
      }
    }

    > .top {
      > ul {
        margin: 8px 0;
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
