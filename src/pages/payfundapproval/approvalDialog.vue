<template>
    <section>
      <el-dialog
        :visible.sync="openDialog"
        width="37.5%"
        :close-on-click-modal="false"
        class="dialog approval-dialog"
        :append-to-body="true"
        @close="closeDialog"
      >
        <div slot="title" class="dialog-title">
          <p>审批</p>
        </div>
        <approval-bill @dialogFlow="searchFlow"
                       @approvalRowClick="approvalRowClick"
                       @selectApprovaler="selectApprovaler"
                       @isArgeen="backAproval"
                       @uploadFn="openUpload"
                       :upload="uploadDialog"
                       :approvalFollow="approvalFollow"
                       :nextApprovaler="nextApprovaler"
                       :backPersonnel="backPersonnel"
                        ref="approval"
                        v-model="textare"
                       :file-count="fileCount"></approval-bill>
        <div class="approval-btn">
          <el-button size="small" type="primary" @click="cancel()">取消</el-button>
          <el-button size="small" type="primary" @click="submit()">确认</el-button>
        </div>
        <el-dialog
          :visible.sync="uploadDialog"
          width="410px"
          :close-on-click-modal="false"
          class=""
          :append-to-body="true">
          <upload @submit="submitFn"></upload>
        </el-dialog>
      </el-dialog>
      <back-approval v-if="visible" :visible.sync="visible" :auditMsg="backData" @getBackPeople="getBackPeople" @closeBack="closeBack"></back-approval>
    </section>
</template>

<script>
    import ApprovalBill from "../../components/approvalBill/approvalBill";
    import BackApproval from "../../components/backApproval/backApproval";
    import Upload from "../../components/upload/index";
    export default {
        name: "approvalDialog",
      components: {Upload, BackApproval, ApprovalBill},
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
            uploadDialog:false,
            visible:false,
            textare:'',
            openDialog:false,
            handleValue:'',
            approvalFollow:[],
            nextApprovaler:[],//左边下一审批人信息，绑定表格
            backPersonnel:[],//回退审批人集合
            backData:[],//回退的审批人岗位集合
            backPost:[],//获取回退的审批人岗位
            isAgree:'', //保存是否同意审批
            operatorID:[], //操作人员集合
            row:this.rowData[0],
            fileList:[],//文件列表
            fileCount:0
          }
      },
      mounted(){
      },
      watch:{
          rowData:{
            handler(val){
              console.log(val)
            },
            deep:true
          },
        textare(ac){
            console.log('key:',ac)
        }
      },
      methods:{
        //根据组织id，单据类型获取所有的审批流程
        getAppvalProc(){
          let data = {
            ProcPhid:this.rowData[0].ProcPhid,
            PostPhid:this.rowData[0].PostPhid,
            RefbillPhid: this.rowData[0].RefbillPhid,
            FBilltype:this.rowData[0].FBilltype
          }

          this.getAxios('/GAppvalPost/GetAppvalProcAndOperator',data).then(res=>{
            if (res && res.Status === 'success'){
              this.$set(this.approvalFollow,0,res.Process);
              this.nextApprovaler = res.AppvalPost.Operators;
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
        //审批流列表行点击事件
        approvalRowClick(e){
          console.log(e)
        },
        //下一审批人选中弹框
        selectApprovaler(e){
          for (let k in e){
            this.operatorID[k] = e[k].OperatorPhid
          }
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
        //取消
        cancel(){
          this.openDialog = false;
          this.visible = false;
          this.backPersonnel = [];
          this.fileCount = 0;
          this.textare = '';
          this.$refs.approval.handleValue = ''
        },
        //关闭弹框
        closeDialog(){
          this.openDialog = false;
          this.visible = false;
          this.backPersonnel = [];
          this.textare = '';
          this.$refs.approval.handleValue = ''
        },

        //确认
        submit(){
          //同意数据 单条
          let formData = new FormData();
          console.log(this.textare)
          let data = {
            PhId:this.rowData[0].PhId,//单据ID
            ProcPhid:this.rowData[0].ProcPhid,//审批流程id
            PostPhid:this.rowData[0].PostPhid,//审批岗位id
            RefbillPhid:this.rowData[0].RefbillPhid,//单据id
            FBilltype:this.BType,//单据类型
            FApproval:this.isAgree,//审批意见(0- 未审批 1-待审批 2- 未通过 9-审批通过)
            NextOperators:"",//下一岗位审批人id的集合
            FOpinion:this.textare //审批备注
          }
          formData.append('PhId',this.rowData[0].PhId);
          formData.append('ProcPhid',this.rowData[0].ProcPhid);
          formData.append('PostPhid',this.rowData[0].PostPhid);
          formData.append('RefbillPhid',this.rowData[0].RefbillPhid);
          formData.append('FBilltype',this.BType);
          formData.append('FApproval',this.isAgree);
          formData.append('FOpinion',this.textare);
          if (this.isAgree === '9') {
            formData.append('NextOperators',JSON.stringify(this.operatorID));
          }else if(this.isAgree === '2'){
            let arr =[]
            for (let key in this.backPersonnel){
              arr[key] = this.backPersonnel[key].OperatorPhid
            }
            formData.append('NextOperators',JSON.stringify(arr));
            formData.append('BackPostPhid',this.backPost.PhId);
          }
          if(this.fileList.length !==0){
            for(let file of this.fileList){
              formData.append('files',file.raw);
            }
          }
          this.formAxios('GSP/GAppvalRecord/PostApprovalRecordList',formData).then(res=>{
            if (res.Status == 'success'&&res) {
              this.fileCount = 0
              let that= this
              that.textare = ''
              this.visible = false
              this.$msgBox.show({
                content:'审批成功',
                fn:function () {
                  that.openDialog = false;
                  that.$emit('subSuc');
                  that.$refs.approval.handleValue = '';
                  that.$emit('refresh')
                }
              })
            }else {
              this.textare = ''
              this.fileCount = 0
              this.$msgBox.show(res.Msg)
            }
          }).catch(err=>{
            this.fileCount = 0
            this.$msgBox.show('请求出错')
          })
        },

        //关闭销毁回退,下次打开执行生命周期
        closeBack(){
          this.visible = false;
          this.textare = '';
          this.fileCount = 0
          // this.$emit('refresh')
        },
        backAproval(val){
          this.getAppvalProc()
          console.log(val)
          if (!val ){
            this.getBackApprovalPost()
            this.isAgree = '2'
          } else {
            this.isAgree = '9'
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
            OperaPhid:this.rowData[0].OperaPhid
          }
          this.getAxios('/GAppvalPost/GetBackApprovalPost',data).then(res=>{
            if (res && res.Status == 'success') {
              console.log(res)
              this.backData = res.Data
              this.visible = true
            }else {
              this.$msgBox.show(res.Msg)
            }
          }).catch(err =>{
            this.$msgBox.show('请求出错')
          })
        },
        //点击获取回退人员名字 以及回退的岗位信息
        getBackPeople(item){
          this.backPost = item
          for (let key in item.Operators){
            this.$set(this.backPersonnel,key,item.Operators[key])
          }
          for (let key in this.nextApprovaler) {
            this.nextApprovaler.splice(key,1)
          }
        },
        openUpload(e){
          this.uploadDialog = true
        },
        //点击添加到附件列表
        submitFn(e){
          this.fileList = e
          this.fileCount = e.length
          this.uploadDialog = false
        }
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
    min-width: 620px;
  }
  .dialog >>>.el-dialog{
    min-width: 620px;
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
