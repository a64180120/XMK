<template>
  <section>
    <el-dialog
      :visible.sync="openDialog"
      width="37.5%"
      :close-on-click-modal="false"
      class="dialog"
      @close="closeDialog"
    >
      <div slot="title" class="dialog-title">
        <p>审批并生成支付单</p>
      </div>
      <approval-bill @dialogFlow="searchFlow()" @nuargeen="backAproval" :backPeople="backPeople"></approval-bill>
      <div class="approval-btn">
        <el-button size="small" type="primary" @click="cancel()">取消</el-button>
        <el-button size="small" type="primary" @click="submit()">生成支付单</el-button>
      </div>
    </el-dialog>
    <back-approval :visible.sync="visible" @getBackPeople="getBackPeople"></back-approval>
  </section>
</template>

<script>
  import ApprovalBill from "../../components/approvalBill/approvalBill";
  import BackApproval from "../../components/backApproval/backApproval";
  export default {
    name: "paylistDialog",
    components: {BackApproval, ApprovalBill},
    props:{
      data:{
        type:Object,
        default:function () {
          return {
          }
        }
      }
    },
    data(){
      return{
        visible:false,
        textare:'',
        backPeople:[],
        openDialog:false,
        handleValue:'',
        subData:[{
          code:"0001",
          name:"ZXXXXX"
        },{
          code:"0001",
          name:"FASAS"
        }]
      }
    },
    methods:{
      changeDialog(){
        if (this.openDialog) {
          this.openDialog = false
        }else {
          this.openDialog = true
        }
      },
      //表头样式回调
      headerRowClass(val){
        return "table-header"
      },
      //查看详细流程
      searchFlow(row,column,index,store){

      },
      //表格单选
      handleSelect(selection,row){

      },
      //表格全选
      handleSelectAll(selection){

      },
      //取消
      cancel(){
        this.openDialog = false
      },
      //生成支付单
      submit(){
        let that = this
        this.visible = false
        this.$msgBox.show({
          content:'生成支付单成功',
          fn:function () {
            that.openDialog = false
            that.$emit('subSuc')
          }
        })
        let now = new Date().getTime().toString();
        let addData = {
          "uid": 521180820000001,     //用户id
          "orgid": 547181121000001,   //组织id
          "ryear": '2019',               //年度
          "infoData": {
            "Mst": {
              "PhId": 0,
              "OrgPhid": 547181121000001,
              "OrgCode": "1",
              "RefbillPhid": 6,
              "RefbillCode": "zfbbf0006",
              "FCode": "P" + now,
              "FPaymethod": 2,
              "FAmountTotal": 2006.0,
              "FApproval": 0,
              "FState": 0,
              "FDescribe": "单元测试-" + now,
              "FDate": "2019-05-27",
              "FBilltype": "zjbf",
              "PersistentState": 1
            },
            "Dtls": [{
              "PhId": 0,
              "MstPhid": 0,
              "OrgPhid": 547181121000001,
              "OrgCode": "1",
              "RefbillPhid": 6,
              "RefbillCode": "zfbbf0006",
              "RefbillDtlPhid": 1,
              "RefbillDtlPhid2": 1,
              "FAmount": 1000.0,
              "FCurrency": "001",
              "FPayAcntname": "付款账户1",
              "FPayAcnt": "111001",
              "FPayBankcode": "102",
              "FRecAcntname": "收款账户1",
              "FRecAcnt": "222122",
              "FRecBankcode": "102",
              "FRecCityname": "杭州市",
              "FSamecity": 0,
              "FSamebank": 1,
              "FIsurgent": 1,
              "FCorp": 1,
              "FUsage": "用途信息",
              "FPostscript": "附言：xxx",
              "FExplation": "摘要",
              "FDescribe": "描述",
              "FSubmitdate": null,
              "FSeqno": null,
              "FBkSn": null,
              "FResult": null,
              "FResultmsg": null,
              "FState": 0,
              "FNewCode": null,
              "ForeignKeys": null,
              "BusinessPrimaryKeys": null,
              "PersistentState": 1
            }, {
              "PhId": 0,
              "MstPhid": 0,
              "OrgPhid": 547181121000001,
              "OrgCode": "1",
              "RefbillPhid": 6,
              "RefbillCode": "zfbbf0006",
              "RefbillDtlPhid": 1,
              "RefbillDtlPhid2": 1,
              "FAmount": 1006.0,
              "FCurrency": "001",
              "FPayAcntname": "付款账户2",
              "FPayAcnt": "111002",
              "FPayBankcode": "102",
              "FRecAcntname": "收款账户1",
              "FRecAcnt": "222122",
              "FRecBankcode": "102",
              "FRecCityname": "杭州市",
              "FSamecity": 0,
              "FSamebank": 1,
              "FIsurgent": 1,
              "FCorp": 1,
              "FUsage": "用途信息2",
              "FPostscript": "附言：xxx2",
              "FExplation": "摘要2",
              "FDescribe": "描述2",
              "FSubmitdate": null,
              "FSeqno": null,
              "FBkSn": null,
              "FResult": null,
              "FResultmsg": null,
              "FState": 0,
              "FNewCode": null,
              "PersistentState": 1
            }
            ]
          }
        };
        this.postAxios('/GKPaymentMstApi/PostAdd',addData)
          .then(success=>{
          console.log(success)

        }).catch(err=>{
          console.log(err)
        })
      },
      backAproval(val){
        if (val[0] != undefined ){
          this.visible = true
        } else {
          this.visible = false
          this.backPeople = []
        }
      },
      getBackPeople(item){
        this.$set(this.backPeople,0,item.name)
        console.log(this.backPeople)
      },
      //关闭弹框
      closeDialog(){
        this.openDialog = false
        this.visible = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-title{
    border-bottom: 1px solid #CCC;
    text-align: left;
    padding-left: 20px;
    >p{
      line-height: 0.4rem;
      font-size: 0.2rem;
    }
  }
  .content{
    width: 100%;
    height:228px;
    overflow: auto;
    >.handle{
      >.title{
        color: #3294e8;
        text-align: left;
        >span{
          font-size: 0.2rem;
          color: #3294e8;
        }
      }
      >.radio{
        >ul{
          list-style: none;
          >li{
            display: inline;
          }
          >li:first-child{
            float: left;
          }
          >li:last-child{
            float: right;
          }
        }
      }
    }
    >.sub-table{
      max-width:100% ;
      display: inline;
      >.sub-approval{
        float: left;
        width: 60%;
        >.title{
          color: #3294e8;
          text-align: left;
          >span{
            font-size: 0.2rem;
            color: #3294e8;
          }
        }
        >.table{
          padding-right: 10px;
        }
      }
      >.next-approval{
        float: left;
        width: 40%;
        >.title{
          color: #3294e8;
          text-align: left;
          >span{
            font-size: 0.2rem;
            color: #3294e8;
          }
        }
        >.table{
          padding-right: 10px;
        }
      }
    }
  }
  .icon-search{
    color: #09F;
    font-size: 0.16rem;
    &:hover{
      cursor: pointer;
    }
  }
  .approval-btn{
    margin-top: 5px;
    text-align: right;
    >.el-button{
      padding: 4px 15px;
    }
  }
</style>

<style scoped>
  .dialog{}
  .dialog >>> .el-dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%,-50%);
    height: 310px;
  }
  .dialog >>> .el-dialog__header{
    padding: 0;
  }
  .dialog >>> .el-dialog__body{
    padding: 0 1%;
  }
  .dialog >>> .el-dialog__header .el-dialog__headerbtn{
    top:15px;
  }
  .table-content >>> tr th{
    background-color: #09F;
    padding: 6px 0;
    color: #ffffff;
    font-size: 0.12rem
  ;
  }
  .table-content >>> tr td{
    padding: 5px 0;
    font-size: 0.12rem
  }
  .table-next >>>tr th{
    background-color: #09F;
    padding: 5px 0;
    color: #ffffff;
    font-size: 0.12rem
  ;
  }
  .table-next >>>tr td{
    padding: 5px 0;
    font-size: 0.12rem
  }
</style>
