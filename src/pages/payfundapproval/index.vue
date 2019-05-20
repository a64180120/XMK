<template>
  <section>
    <handle-btn></handle-btn>
    <div >
      <div class="container">
        <!--顶部按钮栏-->
        <div>
          <el-row>
            <el-col>
              <div class="top-btn">
                <ul>
                  <li>
                    <span>审批</span>
                  </li>
                  <li>
                    <span>取消审批</span>
                  </li>
                  <li>
                    <span>申请打印表</span>
                  </li>
                  <li>
                    <span>汇总打印表</span>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--分割线-->
        <div class="divider">
          <el-divider class="line"></el-divider>
        </div>
        <!--搜索栏-->
        <div class="btnArea">
          <el-form :inline="true">
            <el-form-item label="申报部门" class="top-form-left">
              <el-select size="mini" v-model="form.depart" style="width: 120px"></el-select>
            </el-form-item>
            <el-form-item label="提留时长" class="top-form-left">
              <el-input size="mini" v-model="form.long" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="申报日期" class="top-form-left">
              <el-date-picker v-model="form.date" style="width: 240px" size="mini" type="daterange" start-placeholder="开始时间" end-placeholder="开始时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="" class="top-form-right">
              <el-input class="search-input" size="mini"></el-input>
              <el-button size="mini" type="primary" class="search-btn">搜索</el-button>
              <el-button size="mini" type="success" class="senior-btn">高级</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="clear: both"></div>
        <!--表格-->
        <div >
          <div class="formArea" style="top:100px">
            <div class="tableHead">
              <table>
                <colgroup>
                  <col width="5%">
                  <col width="10%">
                  <col width="10%">
                  <col width="15%">
                  <col width="10%">
                  <col width="17%">
                  <col width="10%">
                  <col width="8%">
                  <col width="10%">
                  <col width="5%">
                </colgroup>
                <thead>
                <tr>
                  <td>
                    <el-checkbox v-model="checked">序号</el-checkbox>
                  </td>
                  <td>
                    申报部门
                  </td>
                  <td>
                    申请单编号
                  </td>
                  <td>
                    申请单名称
                  </td>
                  <td>
                    涉及预算项目编码
                  </td>
                  <td>
                    涉及预算项目名称
                  </td>
                  <td>
                    申请金额
                  </td>
                  <td>
                    申请日期
                  </td>
                  <td>
                    审批状态
                  </td>
                  <td>
                    停留时长
                  </td>
                </tr>
                </thead>
              </table>
            </div>
            <div class="tableBody">
              <table>
                <colgroup>
                  <col width="5%">
                  <col width="10%">
                  <col width="10%">
                  <col width="15%">
                  <col width="10%">
                  <col width="17%">
                  <col width="10%">
                  <col width="8%">
                  <col width="10%">
                  <col width="5%">
                </colgroup>
                <tbody>
                <tr v-for="(item,idx) in tableData"  :key="idx" @click="handleRowClick(item,idx)">
                  <td>
                    <el-checkbox v-model="checked" >{{idx}}</el-checkbox>
                  </td>
                  <td>
                    {{item.applyDepart}}
                  </td>
                  <td>
                    {{item.applyCode}}
                  </td>
                  <td>
                    {{item.applyName}}
                  </td>
                  <td>
                    {{item.itemCode}}
                  </td>
                  <td>
                    {{item.itemName}}
                  </td>
                  <td>
                    {{item.applyAmount}}
                  </td>
                  <td>
                    {{item.applyDate}}
                  </td>
                  <td>
                    <span style="cursor: pointer" v-if="item.approvalStutas ==1 " @click.stop="openApproval(item,idx)">待审核</span>
                    <span style="cursor: pointer" v-if="item.approvalStutas ==2 " @click.stop="openApproval(item,idx)">审批中</span>
                    <span style="cursor: pointer" v-if="item.approvalStutas ==3 " @click.stop="openApproval(item,idx)">审批通过</span>
                  </td>
                  <td>
                    <i @click.stop="openApproval(item,idx)" class="el-icon-alarm-clock icon-clock" :class="[item.approvalStutas == 1 ? 'blue' :'red']"></i>
                  </td>
                </tr>
                </tbody>
              </table>
              <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="page.pageSize"
                layout="total,sizes,prev,pager,next,jumper"
                :total="page.total"></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <!--弹框-->
      <fund-detail :data="detail"></fund-detail>
    </div>


  </section>
</template>

<script>
  import FundDetail from "./fundDetail";
  import HandleBtn from "../../components/topNav/topHandle";
  export default {
    name: "index",
    components: {HandleBtn, FundDetail},
    data(){
      return{
        detail:{
          openDialog:false,
          data:{

          }
        },
        checked:'',
        form:{
          depart:'',
          long:'',
          date:[]
        },
        tableData:[{}],
        page:{
          currentPage:1,//当前页
          pageSize:[20,50,100], //每页显示多少条
          total:200//总条数
        },
      }
    },
    mounted() {
      let data1 = {
        applyDepart:'实业中心',
        applyCode:'201904180001',
        applyName:'专家授课课酬支付申请',
        itemCode:'20190000007',
        itemName:'与行业协会合作共同展开...',
        applyAmount:'4,567.90',
        applyDate:'2019-04-17',
        approvalStutas:'1'
      };
      let data2 = {
        applyDepart:'广东省工人医院',
        applyCode:'201904180001',
        applyName:'专家授课课酬支付申请',
        itemCode:'20190000007',
        itemName:'与行业协会合作共同展开...',
        applyAmount:'4,567.90',
        applyDate:'2019-04-17',
        approvalStutas:'2'
      };
      let data3 = {
        applyDepart:'财务与资产管理部',
        applyCode:'201904180001',
        applyName:'专家授课课酬支付申请',
        itemCode:'20190000007',
        itemName:'与行业协会合作共同展开...',
        applyAmount:'4,567.90',
        applyDate:'2019-04-17',
        approvalStutas:'3'
      };
      for (let i = 0;i<20;i++){
        if(i%4 == 1){
          this.tableData[i] = data1
        }else if (i%4 == 2) {
          this.tableData[i] = data2
        } else {
          this.tableData[i] = data3
        }
      }
    },
    watch:{
      checked(val,oldval){
        console.log(val)
      }
    },
    methods:{
      //单行选中事件
      handleSelect(selection,row){
        console.log(selection,row)
      },
      //全部选中事件
      handleSelectAll(selection){
        console.log(selection)
      },
      //单行点击事件
      handleRowClick(row,idx){
        console.log(row,idx)
        this.detail.openDialog = true
        this.detail.data = row
      },
      //当前页显示多少条数据
      handleSizeChange(val){
        console.log(val)
      },
      //调到第几页
      handleCurrentChange(val){
        console.log(val)
      },
      //打开查看审批流
      openApproval(row,idx){
        console.log(row,idx)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .top-btn{
    float: right;
    margin: 10px 0;
    >ul{
      >li{
        list-style: none;
        float: left;
        margin-right: 15px;
        >span{
          &:hover{
            color: #39b49b;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
<style scoped>
  .divider .el-divider--horizontal{
    margin: 0;
  }
  .btnArea{
    padding: 10px;
  }
  .top-form-left{
    float: left;
    margin-bottom: 0px;
  }
  .top-form-right{
    float: right;
    margin-bottom: 0px;
  }
  .search-input{
    margin-right: -4px;
    width: 180px;
  }
  .search-input>>>input{
    border-radius: 20px 0 0 20px !important;
    border-right: none;
  }
  .search-btn{
    border-radius: 0;
    margin-right: -14px;
  }
  .senior-btn{
    border-radius: 0;
    margin-left: -4px;
  }
  .icon-clock{
    font-size: 20px;
    cursor: pointer;
  }
  .blue{
    color: #00B8EE;
  }
  .red{
    color: crimson;
  }
</style>
