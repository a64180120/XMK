<template>
    <section>
      <el-dialog
        :visible.sync="openDialog"
        width="37.5%"
        :close-on-click-modal="false"
        class="dialog"
        :append-to-body="true"
      >
        <div slot="title" class="dialog-title">
          <p>查看</p>
        </div>
        <approval-bill></approval-bill>
        <div class="approval-btn">
          <el-button size="small" type="primary" @click="cancel()">取消</el-button>
          <el-button size="small" type="primary" @click="submit()">确认</el-button>
        </div>
      </el-dialog>
    </section>
</template>

<script>
    import ApprovalBill from "../../components/approvalBill/approvalBill";
    export default {
        name: "approvalDialog",
      components: {ApprovalBill},
      props:{

         data:{
           type:Object,
           default:function () {
             return {
             }
           }
         },

      },
      data(){
          return{
            textare:'',
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
          this.openDialog = true
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
        //确认
        submit(){
          let that= this
          this.$msgBox.show({
            content:'审批支付单成功',
            fn:function () {
              that.openDialog = false
              that.$emit('subSuc')
            }
          })
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
