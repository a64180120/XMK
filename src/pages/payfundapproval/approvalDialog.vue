<template>
    <section>
      <el-dialog
        :visible.sync="openDialog"
        width="37.5%"
        :close-on-click-modal="false"
        class="dialog"
        :append-to-body="true"
        @close="closeDialog"
      >
        <div slot="title" class="dialog-title">
          <p>查看</p>
        </div>
        <approval-bill @dialogFlow="searchFlow"
                       @approvalRowClick="approvalRowClick"
                       @selectApprovaler="selectApprovaler"
                       @isArgeen="backAproval"
                       :approvalFollow="approvalFollow"
                       :nextApprovaler="nextApprovaler"
                       :backPersonnel="backPersonnel"
                        ref="approval"></approval-bill>
        <div class="approval-btn">
          <el-button size="small" type="primary" @click="cancel()">取消</el-button>
          <el-button size="small" type="primary" @click="submit()">确认</el-button>
        </div>
      </el-dialog>
      <back-approval v-if="visible" :visible.sync="visible" :auditMsg="backData" @getBackPeople="getBackPeople" @closeBack="closeBack"></back-approval>
    </section>
</template>

<script>
    import ApprovalBill from "../../components/approvalBill/approvalBill";
    import BackApproval from "../../components/backApproval/backApproval";
    export default {
        name: "approvalDialog",
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
           default:'001'
         }
      },
      data(){
          return{
            visible:false,
            textare:'',
            openDialog:false,
            handleValue:'',
            approvalFollow:[],
            nextApprovaler:[],
            backPersonnel:[],
            backData:[]
          }
      },
      mounted(){
      },
      methods:{
        //根据组织id，单据类型获取所有的审批流程
        getAppvalProc(){
          let data = {
            ProcPhid:this.rowData[0].ProcPhid,
            PostPhid:this.rowData[0].PostPhid
          }

          this.getAxios('/GAppvalPost/GetAppvalProcAndOperator',data).then(success=>{
            if (success && success.Status === 'success'){
              this.$set(this.approvalFollow,0,success.Process);
              this.nextApprovaler = success.AppvalPost.Operators;
              for (let key in this.approvalFollow){
                this.approvalFollow[key].RefbillPhid =this.rowData[0].RefbillPhid;
                this.approvalFollow[key].ProcPhid = this.rowData[0].ProcPhid;
              }
              console.log(this.approvalFollow,this.nextApprovaler)
            }else {
              let that = this
              this.$msgBox.show({
                content: success.Msg,
                fn:function () {
                  that.openDialog =false
                }
              })
            }
          }).catch(err =>{
            console.log(err)
          })
        },
        //审批流列表行点击事件
        approvalRowClick(e){
          console.log(e)
        },
        //下一审批人选中弹框
        selectApprovaler(e){
          console.log(e)
        },
        //开启或关闭弹框
        changeDialog(){
          this.openDialog = true
          this.getAppvalProc()
        },
        //表头样式回调
        headerRowClass(val){
          return "table-header"
        },
        //查看详细流程
        searchFlow(row){
          this.$emit("dialogFlow",row)
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
          this.visible = false
          this.backPersonnel = []
          this.$refs.approval.handleValue = ''
        },
        //关闭弹框
        closeDialog(){
          this.openDialog = false
          this.visible = false;
          this.backPersonnel = [];
          this.$refs.approval.handleValue = ''
        },

        //确认
        submit(){
          let that= this
          this.visible = false
          this.$msgBox.show({
            content:'审批成功',
            fn:function () {
              that.openDialog = false;
              that.$emit('subSuc');
              that.$refs.approval.handleValue = ''
            }
          })
        },

        //关闭销毁回退,下次打开执行生命周期
        closeBack(){
          this.visible = false
        },
        backAproval(val){
          if (!val ){
            this.getBackApprovalPost()
            // this.getGetOperators()
          } else {
            this.visible = false
            this.backPersonnel = []
          }
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
        //根据审批岗位获取审批人(包括岗位id为0的发起人)
        // getGetOperators(){
        //   let data = {
        //     RefbillPhid:this.rowData[0].RefbillPhid,
        //     PostPhid:this.rowData[0].PostPhid
        //   }
        //   this.getAxios('/GAppvalPost/GetOperators',data).then(success=>{
        //     console.log('获取审批人===============')
        //       console.log(success)
        //   }).catch(err =>{
        //
        //   })
        // },
        //点击获取回退人员名字
        getBackPeople(item){
          for (let key in item.Operators){
            this.$set(this.backPersonnel,key,item.Operators[key])
          }
          console.log(this.backPersonnel)
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
