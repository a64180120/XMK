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
      <approval-bill
        :approvalFollow="approvalFollow"
        :nextApprovaler="nextApprovaler"
        @dialogFlow="searchFlow"
        @isArgeen="backAproval"
        @selectApprovaler="selectApprovaler"
        :backPersonnel="backPersonnel"
        ref="approval"
        v-model="textare"
      ></approval-bill>
      <div class="approval-btn">
        <el-button size="small" type="primary" @click="cancel()">取消</el-button>
        <el-button size="small" :disabled="disabled" type="primary" @click="submit()">生成支付单</el-button>
      </div>
    </el-dialog>
    <back-approval v-if="visible" :visible.sync="visible" :auditMsg="backData" @getBackPeople="getBackPeople" @closeBack="closeBack"></back-approval>
  </section>
</template>

<script>
  import ApprovalBill from "../../components/approvalBill/approvalBill";
  import BackApproval from "../../components/backApproval/backApproval";
  export default {
    name: "paylistDialog",
    components: {BackApproval, ApprovalBill},
    props:{
      rowData:{
        type:Array,
        default:function () {
          return []
        }
      },
      BType:{
        type: String,
        default:'002'
      },
    },
    data(){
      return{
        visible:false,
        textare:'',
        openDialog:false,
        handleValue:'',
        approvalFollow:[],
        nextApprovaler:[],
        backPost:[],//获取回退的审批人岗位
        isAgree:'', //保存是否同意审批
        backPersonnel:[],//回退审批人集合
        backData:[],//回退的审批人岗位集合
        operatorID:[], //操作人员集合,
        isApproval:Boolean,
        disabled:false
      }
    },
    methods:{
      //根据组织id，单据类型获取所有的审批流程
      getAppvalProc(){
        let data = {
          ProcPhid:this.rowData[0].ProcPhid,
          PostPhid:this.rowData[0].PostPhid
        }
        this.getAxios('/GAppvalPost/GetAppvalProcAndOperator',data).then(res=>{
          if (res && res.Status === 'success'){
            this.$set(this.approvalFollow,0,res.Process);
            this.nextApprovaler = res.AppvalPost.Operators;
            for (let key in this.approvalFollow){
              this.approvalFollow[key].RefbillPhid =this.rowData[0].RefbillPhid;
              this.approvalFollow[key].ProcPhid = this.rowData[0].ProcPhid;
            }
            console.log(this.approvalFollow,this.nextApprovaler)
          }else {
            let that = this
            this.$msgBox.show({
              content: res.Msg,
              fn:function () {
                that.openDialog =false
              }
            })
          }
        }).catch(err =>{
          console.log(err)
        })
      },
      changeDialog(){
        if (this.openDialog) {
          this.openDialog = false
        }else {
          this.getAppvalProc()
          this.openDialog = true
        }
      },
      //下一审批人选中弹框
      selectApprovaler(e){
        for (let k in e){
          this.operatorID[k] = e[k].OperatorPhid
        }
      },
      //取消
      cancel(){
        this.openDialog = false;
        this.visible = false;
        this.backPersonnel = [];
        this.$refs.approval.handleValue = ''
      },
      //审批通过
      submit(){
        // let that = this
        // this.visible = false
        // this.$msgBox.show({
        //   content:'操作成功',
        //   fn:function () {
        //     that.openDialog = false
        //     that.$emit('subSuc')
        //   }
        // })

        //同意数据 单条
        let data = {
          PhId:this.rowData[0].PhId,//单据ID
          ProcPhid:this.rowData[0].ProcPhid,//审批流程id
          PostPhid:this.rowData[0].PostPhid,//审批岗位id
          RefbillPhid:this.rowData[0].RefbillPhid,//单据id
          FBilltype:'001',//单据类型 先支付单审批
          FApproval:this.isAgree,//审批意见(0- 未审批 1-待审批 2- 未通过 9-审批通过)
          NextOperators:"",//下一岗位审批人id的集合
          FOpinion:this.textare //审批备注
        }
        if (this.isAgree === '9') {
          data.NextOperators = this.operatorID
        }else if(this.isAgree === '2'){
          let arr =[]
          for (let key in this.backPersonnel){
            arr[key] = this.backPersonnel[key].OperatorPhid
          }
          data.NextOperators = arr
          data.BackPostPhid = this.backPost.PhId
        }
        console.log(1231321)
        if (this.isApproval){
          this.postAxios('/GAppvalRecord/PostApprovalRecord',data).then(res=>{
            if (res.Status == 'success'&&res) {
              let that= this
              this.visible = false
              this.$msgBox.show({
                content:'审批成功',
                fn:function () {
                  that.openDialog = false;
                  that.$emit('subSuc');
                  that.$refs.approval.handleValue = '';
                  this.textare = ''
                }
              })
              this.creatPayList()
            }else {
              this.$msgBox.show(res.Msg)
            }
          }).catch(err=>{
            this.$msgBox.show('请求出错')
          })
        } else {
        }

      },
      //生成支付单
      creatPayList(){
        let data = {
          RefbillPhid:this.rowData[0].RefbillPhid
        }
        let that= this
        this.postAxios('/GAppvalRecord/PostAddPayMent',data).then(res=>{
          if (res && res.Status =='success') {
            this.$msgBox.show({
              content:'生成支付单成功',
              fn:function () {
                that.openDialog = false;
                that.$emit('subSuc');
                that.$refs.approval.handleValue = '';
                that.textare = '';
                that.$emit('refresh')
              }
            })
          }else {
            this.$msgBox.error({
              content:res.Msg,
              fn:function () {
                that.openDialog = false;
                that.$emit('subSuc');
                that.$refs.approval.handleValue = '';
                that.textare = '';
                that.$emit('refresh')
              }
            })
          }
        }).catch(err=>{
          this.$msgBox.error('请求失败')
        })
      },
      backAproval(val){
        if (!val){
          // this.visible = true
          this.getBackApprovalPost()
          this.isAgree = '2'
        } else {
          this.isAgree = '9'
          this.visible = false
          this.backPersonnel = []
        }
      },
      //关闭销毁回退,下次打开执行生命周期
      closeBack(){
        this.visible = false

      },
      getBackPeople(item){
        for (let key in item.Operators){
          this.$set(this.backPersonnel,key,item.Operators[key])
        }
        console.log(this.backPersonnel)
      },
      //关闭弹框
      closeDialog(){
        this.openDialog = false
        this.visible = false
        this.textare = ''
      },
      //查看详细流程
      searchFlow(row){
        this.$emit("dialogFlow",row)
      },
      //拉去回退时,获取之前的所有岗位,包括发起人(岗位id为0)
      getBackApprovalPost(){

        let data = {
          ProcPhid:this.rowData[0].ProcPhid,
          PostPhid:this.rowData[0].PostPhid,
          RefbillPhid:this.rowData[0].RefbillPhid,
        }
        this.getAxios('/GAppvalPost/GetBackApprovalPost',data).then(success=>{
          if (success && success.Status == 'success') {
            this.backData = success.Data
            this.visible = true
          }else {
            this.$msgBox.show(success.Msg)
          }
        }).catch(err =>{
          this.$msgBox.show('请求出错')
        })
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
    height: 435px;
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
