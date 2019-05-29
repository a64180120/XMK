<template>
    <section>
      <div class="content">
        <div class="sub-table">
          <!--审批流程-->
          <div class="sub-approval">
            <div class="title">
              <span>■</span>审批流程
            </div>
            <div class="table">
              <el-table class="table-content"
                        :data="subData"
                        :border="true" :header-row-class-name="headerRowClass">
                <el-table-column prop="code" width="80" align="center" label="流程编码">
                </el-table-column>
                <el-table-column prop="name" align="center"  label="流程名称">
                </el-table-column>
                <el-table-column width="60" align="center"  label="查看">
                  <template slot-scope="scope">
                    <i class="el-icon-search icon-search" @click="searchFlow(scope.row,scope.column.$index,scope.store)"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="next-approval">
            <div class="title">
              <span>■</span>接受人
            </div>
            <div class="table">
              <el-table class="table-next"
                        :data="subPeople"
                        :border="true"
                        @select="handleSelect"
                        @select-all="handleSelectAll"
                        :header-row-class-name="headerRowClass">
                <el-table-column type="selection" width="30">
                </el-table-column>
                <el-table-column prop="code" align="center"  label="操作员编码">
                </el-table-column>
                <el-table-column prop="name" align="center"  label="姓名">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="handle">
          <div v-show="!isApproval"  class="title">
            <span>■</span>审批处理
          </div>
          <div class="radio">
            <ul>
              <li>
                <div v-if="isApproval" class="title">
                  <span>■</span>审批处理
                </div>
                <el-radio v-if="!isApproval" v-model="handleValue" label="1">同意</el-radio>
                <el-radio v-if="!isApproval" v-model="handleValue" label="2">不同意</el-radio>
              </li>
              <li>
                <span>附单据 {{list}} 张</span>
              </li>
            </ul>
          </div>
          <div class="textare">
            <el-input type="textarea" v-model="textare"></el-input>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    import Auditfollow from "../auditFollow/auditfollow";
    export default {
        name: "approvalBill",
      components: {Auditfollow},
      props:{
        isApproval:{//送审true 审核 false
          type:Boolean,
          default:false
        }
      },
      data(){
        return{
          list:2,
          textare:'',
          openDialog:false,
          handleValue:'',
          subData:[{
            code:"0001",
            name:"活动资金"
          },{
            code:"0002",
            name:"活动资金"
          }],
          subPeople:[{
            code:'0001',
            name:'王刚'
          },{
            code:'0002',
            name:'李明'
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
        },
        //确认
        submit(){

        }
      }
    }
</script>

<style lang="scss" scoped>
  .content{
    width: 100%;
    height:228px;
    overflow: auto;
    >.handle{
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
  .title{
    color: #3294e8;
    text-align: left;
    >span{
      font-size: 0.2rem;
      color: #3294e8;
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
  .icon-search{
    font-size: 0.16rem;
    color: #0099FF;
  }
</style>
