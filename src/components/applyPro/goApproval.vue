<template>
  <section>
    <el-dialog
      :visible.sync="data.openDialog"
      width="540px"
      :close-on-click-modal="false"
      class="dialog goApproval"
      append-to-body
    >
      <div slot="title" class="dialog-title">
        <p>送审</p>
      </div>
      <div class="content">
        <div class="handle">
          <div class="title">
            <span>送审备注</span>
            <span style="float:right;color:#333;">附单据 0 张</span>
          </div>
          <div class="textare">
            <el-input type="textarea" v-model="param.FOpinion"></el-input>
          </div>
        </div>
        <div class="sub-table">
          <!--审批流程-->
          <div class="sub-approval">
            <div class="title">
              <span>送审流程</span>
            </div>
            <div class="table">
              <el-table
                class="table-content"
                :data="data.subData"
                :border="true"
                highlight-current-row
                @current-change="handleCurrentChange"
                header-row-class-name="table-header"
                ref="content"
              >
                <el-table-column prop="FCode" width="80" align="center" label="流程编码"></el-table-column>
                <el-table-column prop="FName" align="center" label="流程名称"></el-table-column>
                <el-table-column width="60" align="center" label="查看">
                  <template slot-scope="scope">
                    <span style="display: inline-block;width: 100%;height: 100%;cursor: pointer" @click="searchFlow(scope.row,scope.column.$index,scope.store)">
                      <i
                        class="el-icon-search icon-search"

                      ></i>
                    </span>

                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="next-approval">
            <div class="title">
              <span>接收人</span>
            </div>
            <div class="table">
              <el-table
                class="table-next"
                :data="nextDataList"
                :border="true"
                @select="handleSelect"
                @select-all="handleSelectAll"
                header-row-class-name="table-header"
                ref="opTable"
              >
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column prop="OperatorCode" align="center" label="操作员编码"></el-table-column>
                <el-table-column prop="OperatorName" align="center" label="姓名"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="approval-btn">
        <el-button
          size="small"
          type="primary"
          @click="data.openDialog = false"
        >{{btnGroup.cancelName}}</el-button>
        <el-button size="small" type="primary" @click="submit">{{btnGroup.onfirmName}}</el-button>
      </div>
      <auditfollow
        :isApproval="true"
        :auditMsg="auditMsg"
        :visible="showAuditfollow"
        @update:visible="closeAuditFollow()"
      ></auditfollow>
    </el-dialog>
  </section>
</template>

<script>
import auditfollow from '../../components/auditFollow/auditfollow'
import { getAppvalProc, postAddAppvalRecord } from '@/api/paycenter'
import {mapState} from 'vuex'

export default {
  name: 'goApproval',
  components: { auditfollow,mapState },
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: null,
        subData:[],
        itemType: ''
      }
    },
    btnGroup: {
      type: Object,
      default: function() {
        return {
          cancelName: '取消',
          onfirmName: '确认'
        }
      }
    },
    father: {
      default: null
    },
    reSetting: {
      default: false
    },
    bType: {
      default: '001'
    }
  },
  data() {
    return {
      showAuditfollow: false,
      openDialog: false,
      handleValue: '',
      content: '',
      nextDataList: [],
      /*送审数据*/
      param:{
        RefbillPhidList: [], //（单据主键集合）
        FBilltype: '001', //（单据类型）
        ProcPhid: '',  //（流程主键）
        PostPhid: '',  //（岗位主键）
        NextOperators: [], //（下个岗位操作员主键集合）
        FSeq: '', //（序号）
        FSendDate: '', //（送审时间）
        FApproval: '1', //（审批状态）
        FOpinion: '', //（备注）
        OperaPhid:this.userid,//(当前人的phid)
        OperatorCode :this.usercode//(当前人code)
      },
      auditMsg:[],//审批流数据存放
    }
  },
  computed: {
    ...mapState({
      /*组织信息*/
      orgid: state => state.user.orgid, //id
      orgcode:state => state.user.orgcode, //编码
      orgname:state => state.user.orgname,//名称
      /*部门信息*/
      bmid:state => state.user.bmid,
      bmcode:state => state.user.bmcode, //编码
      bmname:state => state.user.bmname,//名称
      year:state => state.user.year,//年份
      userid:state => state.user.userid,//用户id
      usercode:state => state.user.usercode//用户code
    })
  },
  methods: {
    closeAuditFollow() {
      this.showAuditfollow = false
    },
    changeDialog() {
      this.openDialog = true
    },
    /*//获取审批流
    getAppvalProc:function(){
      let param={
        Orgid:this.bmid,//组织id
        BType:'001' //单据类型（"001":资金拨付单,"002":支付单）
       };
      this.getAxios('GSP/GAppvalProc/GetAppvalProc',param).then(res=>{
          this.subData=res.Data;
          this.getApprovalPerson(res.Data[0].PhId);
      }).catch(err=>{
        console.log(err);
      })
    },*/


    //获取审批人
    getApprovalPerson:function(phid){
      console.log(this.data)
      let param={PhId:phid};
      this.getAxios('GSP/GAppvalPost/GetFirstStepOperator',param).then(res=>{
        this.nextDataList=res.Data.Operators;
        this.param.PostPhid=res.Data.PhId;
      }).catch(err=>{
        console.log(err)
      })

    },
    //查看详细流程
    searchFlow(row, column, index, store) {
      console.log(row, column, index, store);
      let param={
        ProcId:row.PhId
      };
      this.getAxios('GSP/GAppvalRecord/GetAllPostsAndOpersByProc',param).then(res=>{
        console.log(res);
        this.auditMsg=res;
      }).then(err=>{
        console.log(err);
      })
      this.showAuditfollow = true;
    },
    //表格单选
    handleSelect(selection, row) {},
    //表格全选
    handleSelectAll(selection) {},
    //取消
    cancel() {
      this.openDialog = false
    },
    handleCurrentChange(newRow, oldRow) {
      this.param.ProcPhid=newRow.PhId;
      this.getApprovalPerson(newRow.PhId)
    },
    //确认
    submit() {
      let nextOperatorsList=this.$refs.opTable.selection;
      if(nextOperatorsList.length==0){
        this.$msgBox.show({
          content: '请至少选择一个接收人。',
          fn: () => {
            console.log('test fn')
          }
        });
        return;
      }else{
        this.param.NextOperators=[];
        for(var i in nextOperatorsList){
          this.param.NextOperators.push(nextOperatorsList[i].PhId)
        }
      }
      this.param.FSendDate=new Date();
      this.param.OperaPhid=this.userid;
      this.param.OperatorCode=this.usercode;
      this.param.RefbillPhidList=this.data.data;
      this.postAxios('GSP/GAppvalRecord/PostAddAppvalRecord',this.param).then(res=>{
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)
          return
        }else{
          this.$msgBox.show({
            content:'送审成功',
            fn:() => {
              this.$emit('delete',{flag:true,type:'dsa'});
              this.openDialog=false;
              this.param={
                RefbillPhidList: [], //（单据主键集合）
                FBilltype: '001', //（单据类型）
                ProcPhid: '',  //（流程主键）
                PostPhid: '',  //（岗位主键）
                NextOperators: [], //（下个岗位操作员主键集合）
                FSeq: '', //（序号）
                FSendDate: '', //（送审时间）
                FApproval: '1', //（审批状态）
                FOpinion: '', //（备注）
                OperaPhid:'',//(当前人的phid)
                OperatorCode:''//(当前人code)
              }
            }
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  /*created() {
    this.getAppvalProc();
  },*/
  /*watch: {
    data:{
      handler(val){
        if(val){
          this.param.RefbillPhidList=val.data;
        }
      },
      deep:true,
    },
  }*/
}
</script>

<style lang="scss" scoped>
.dialog-title {
  border-bottom: 1px solid $borderColor_ccc;
  text-align: left;
  padding-left: 20px;
  > p {
    line-height: 0.4rem;
    font-size: 0.2rem;
  }
}
.content {
  width: 100%;
  height: 228px;
  overflow: auto;
  > .handle {
    margin-bottom: 10px;
    > .title {
      color: $btnColor;
      text-align: left;
      font-size: 0.16rem;
      > span {
        &:first-of-type:before {
          content: '';
          display: inline-block;
          width: 0.12rem;
          height: 0.12rem;
          background-color: $btnColor;
          margin-right: 5px;
        }
        color: $btnColor;
      }
    }
    > .radio {
      > ul {
        list-style: none;
        > li {
          display: inline;
        }
        > li:first-child {
          float: left;
        }
        > li:last-child {
          float: right;
        }
      }
    }
  }
  > .sub-table {
    max-width: 100%;
    display: inline;
    > .sub-approval {
      float: left;
      width: 60%;
      > .title {
        color: $btnColor;
        text-align: left;
        > span {
          font-size: 0.16rem;
          color: $btnColor;
          &:first-of-type:before {
            content: '';
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
            margin-right: 5px;
            background-color: $btnColor;
          }
        }
      }
      > .table {
        padding-right: 10px;
      }
    }
    > .next-approval {
      float: left;
      width: 40%;
      > .title {
        color: $btnColor;
        text-align: left;
        > span {
          font-size: 0.16rem;
          color: $btnColor;
          &:first-of-type:before {
            content: '';
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
            margin-right: 5px;
            background-color: $btnColor;
          }
        }
      }
      > .table {
        padding-right: 10px;
      }
    }
  }
}
.icon-search {
  color: #09f;
  font-size: 0.16rem;
  &:hover {
    cursor: pointer;
  }
}
.approval-btn {
  margin-top: 5px;
  text-align: right;
  > .el-button {
    padding: 4px 15px;
  }
}
</style>

<style scoped>
.dialog {
}
.dialog >>> .el-dialog {
  margin: 0 !important;
  height: 310px;
}
.dialog >>> .el-dialog__header {
  padding: 0;
}
.dialog >>> .el-dialog__body {
  padding: 0 1%;
}
.dialog >>> .el-dialog__header .el-dialog__headerbtn {
  top: 15px;
}
.table-content >>> tr th {
  background-color: #09f;
  padding: 6px 0;
  color: #ffffff;
  font-size: 0.12rem;
}
.table-content >>> tr td {
  padding: 5px 0;
  font-size: 0.12rem;
}
.table-next >>> tr th {
  background-color: #09f;
  padding: 5px 0;
  color: #ffffff;
  font-size: 0.12rem;
}
.table-next >>> tr td {
  padding: 5px 0;
  font-size: 0.12rem;
}
</style>
<style lang="scss">
.goApproval {
  .el-dialog {
    display: inline-block;
    margin: 0 !important;
    vertical-align: middle;
    .el-dialog__body {
      padding-top: 0px;
    }
    .el-table__body tr.current-row > td {
      background-color: $primaryColor;
    }
  }
  &.el-dialog__wrapper {
    text-align: center;
  }
  &.el-dialog__wrapper::after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    height: 100%;
  }
}
</style>
