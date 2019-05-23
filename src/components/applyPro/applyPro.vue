<template>
  <section>
    <div class="dialog-content">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="top-btn">
            <el-button class="btn" size="mini">保存</el-button>
            <el-button class="btn" size="mini">保存并新增</el-button>
            <el-button class="btn" size="mini">增加项目</el-button>
            <el-button class="btn" size="mini" @click="msgType=true">删除项目</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <el-col :span="5">
          <div class="left-card">
            <p>申请单名称：</p>
            <el-input placeholder="30字以内" maxlength="30"></el-input>
            <div>
              <!--申请信息-->
              <div class="apply-info">
                <ul>
                  <li><span>申报部门：</span><span>{{data.applyDepart}}</span></li>
                  <li><span>金额合计：</span><span>{{data.applyDate}}</span></li>
                </ul>
                <el-card class="payText">
                  <div slot="header">
                    <span>拨付说明</span>
                  </div>
                  <el-input type="textarea" placeholder="100字以内" resize="none" maxlength="100" v-model="data.applyText"></el-input>
                </el-card>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19" style="height: 470px;overflow: auto;text-align: left">
          <el-card class="payText" v-for="(item,index) in projectItem">
            <div slot="header" style="padding: 0 10px;text-align: left">
              <span>
                 <el-checkbox v-model="item.checked"></el-checkbox>
                  <span>拨付说明</span>
              </span>
              <span style="float: right">
                <span>附单据 {{item.projectFileNum}} 张</span>
                <span class="">图</span>
                <span style="margin-left: 20px"><i class="el-icon-close"></i></span>
              </span>

            </div>
            <div>
              <div>
                <span>项目名称：</span>
                <sapn>
                  <el-select size="small" v-model="item.projectCode">
                    <el-option v-for="pro in projectList"
                               :label="pro.proName"
                               :key="pro.proCode"
                               :value="pro.proCode"
                    ></el-option>
                  </el-select>
                </sapn>
                <span>
                  项目编码
                </span>
                <span>{{item.projectCode}}</span>
              </div>
              <div style="height: 40px;line-height: 40px;background-color: #d7d7d7;padding:0 10px;">
                <span>预算总额 （93,432,78元）- 实际已使用 （4,423.78元） - 冻结 （1,234,00元） = </span><span>本次可申请 （86,546.98元）</span>
              </div>
            </div>
            <div>
              <table>
                <colgroup>
                  <col width="10%">
                  <col width="25%">
                  <col width="25%">
                  <col width="20%">
                  <col width="20%">
                </colgroup>
                <thead>
                  <td>序号</td>
                  <td>补助单位/部门</td>
                  <td>明细项目名称</td>
                  <td>申请金额（元）</td>
                  <td>备注</td>
                </thead>
                <tbody>
                  <tr v-for="(mx,index) in item.pdList">
                    <template v-if="index==item.pdList.length-1">
                      <td></td>
                      <td colspan="2">小计</td>
                      <td>{{mx.countMoney}}</td>
                      <td>{{mx.countNode}}</td>
                    </template>
                    <template v-else>
                      <td>{{index+1}}</td>
                      <td>{{mx.pdOrgName}}</td>
                      <td>{{mx.pdName}}</td>
                      <td>{{mx.pdMoney}}</td>
                      <td>{{mx.pdNode}}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-card>
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
    name: "applypro",
    props:{applyNum:String},
    data(){
      return {
        msgType: false,//删除弹窗
        delSOD: true,//是否删除成功
        delmsgType: false,//点击删除后的提示弹窗
        msg: '',//删除提示消息
        time: 3,//倒计时
        projectList:[{proCode:'001',proName:'政府扶贫项目'},{proCode:'002',proName:'山区希望小学'},{proCode:'003',proName:'可持续发展项目'},{proCode:'004',proName:'新能源项目'}],//可选择项目
        data: {
          applyDepart: '浙江省总工会本级办公室',
          applyDate: new Date().getDate(),
          applyAmount: '100000',
          applyText:''
        },
        projectItem: [
          {
            checked: false,
            projectCode: '001',
            projectFileNum: 2,
            projectFileList: 2,
            pdList: [
              {pdOrgName: '杭州市总工会', pdName: '未见星河', pdMoney: 1000, pdNode: ''},
              {pdOrgName: '宁波市总工会', pdName: '爱上咖啡', pdMoney: 2000, pdNode: ''},
              {countName: '小计', countMoney: 3000, countNode: ''}
            ]
          },
          {
            checked: false,
            projectCode: '001',
            projectFileNum: 0,
            projectFileList: 2,
            pdList: [
              {pdOrgName: '杭州市总工会', pdName: '未见星河', pdMoney: 1000, pdNode: ''},
              {pdOrgName: '宁波市总工会', pdName: '爱上咖啡', pdMoney: 2000, pdNode: ''},
              {countName: '小计', countMoney: 3000, countNode: ''}
            ]
          }
        ]
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


    > p {
      font-size: 0.2rem;
      font-family: 宋体;
      color: #fff;
      text-align: left;
    }

    > div:nth-of-type(2) {
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
        text-align: left;
        >ul {
          font-size: .15rem;
          font-weight: 600;
          >li{
            padding: 10px;
            display: flex;
            >span{
              display: inline-block;
              width: 35%;
              min-width: 80px;
            }
            >span:nth-of-type(2){
              white-space: nowrap;
              overflow-x: hidden;
              text-overflow: ellipsis;
              width: 65%;
              padding-bottom: 5px;
              border-bottom: 1px solid #ccc;
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
table{
  width: 100%;
}
  table td{
    border: 1px solid #cbcbcb;
    height: 35px;
    padding: 0 10px;
  }
  .payText{
    margin-bottom: 10px;
  }
</style>
<style>
  #delDialog .el-dialog__footer{
    text-align: center;
  }
  .payText .el-card__header{
    background-color: #3294e8;
    color: #fff;
    text-align: center;
    padding: 10px 0;
  }
  .payText .el-card__body{
    padding: 10px;
  }
  .payText textarea{
    min-height: 33px;
    margin-top: 0px;
    margin-bottom: 0px;
    height: 160px;
    resize: none;
    border: none;
  }

</style>
