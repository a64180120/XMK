<template>
<div class="self">
  <div style="position: relative">
    <tophandle title="审批中心在线工作平台"></tophandle>
  </div>

  <div class="container">


    <div class="formArea">
      <div class="btnArea">
        <label>
          <span>审批状态：</span>
          <el-select size="small" v-model="searchData.approvalType">
            <el-option v-for="item in approvalList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </label>
        <label>
          <span>支付状态：</span>
          <el-select size="small" v-model="searchData.payType">
            <el-option v-for="item in payList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </label>
        <el-button size="small" @click="showOrg">{{searchData.searchorg.label}}</el-button>
        <div style="float: right;display: flex">
          <label>
            <el-input size="small" placeholder="请输入内容" style="border-top-right-radius: 0;border-bottom-right-radius: 0" v-model="searchData.searchValue">
              <el-button slot="append" size="small" style="background-color: #3294e8;color: #fff;border-top-left-radius: 0;border-bottom-left-radius: 0">搜索</el-button>
            </el-input>
          </label>
          <label>
            <el-popover trigger="click" placement="bottom-start" width="412" v-model="visiable" :hide-on-click="false">
              <!--<span class=" el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </span>-->
              <el-button size="small" slot="reference" style="margin-left:20px;background-color: #39b49b;border-color: #39b49b;color: #fff">高级</el-button>
              <ul class="sinor">
                <li>
                  <span>审批状态</span>
                  <el-select size="small" v-model="searchData.approvalType">
                    <el-option v-for="item in approvalList"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>支付状态</span>
                  <el-select size="small" v-model="searchData.payType">
                    <el-option v-for="item in payList"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>申请日期</span>
                  <el-date-picker
                    size="small"
                    v-model="searchData.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </li>
                <li class="smallinput">
                  <span>申请金额</span>
                  <el-input size="small" v-model="searchData.money.smoney"></el-input>
                  <span>至</span>
                  <el-input size="small" v-model="searchData.money.emoney"></el-input>
                </li>
                <li style="text-align: center;margin:15px 0 0 0 ">
                  <button class="cancelBtn">重置</button>
                  <button class="confirmBtn" style="margin-left: 50px">搜索</button>
                </li>
              </ul>
            </el-popover>
          </label>
        </div>

      </div>
      <div class="tableHead">
        <table>
          <colgroup>
            <col width="5%">
            <col width="15%">
            <col width="15%">
            <col width="15%">
            <col width="15%">
            <col width="10%">
            <col width="10%">
            <col width="15%">
          </colgroup>
          <thead>
            <tr>
              <td>
                <el-checkbox v-model="checked">序号</el-checkbox>
              </td>
              <td>
                申请单编号
              </td>
              <td>
                申请单名称
              </td>
              <td>
                申请单金额（元）
              </td>
              <td>
                申请日期
              </td>
              <td>
                审批状态
              </td>
              <td>
                支付状态
              </td>
              <td>
                申请说明
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="tableBody">
        <table>
          <colgroup>
            <col width="5%">
            <col width="15%">
            <col width="15%">
            <col width="15%">
            <col width="15%">
            <col width="10%">
            <col width="10%">
            <col width="15%">
          </colgroup>
          <thead>
          <tr v-for="n in 35">
            <td>
              <el-checkbox v-model="checked">序号</el-checkbox>
            </td>
            <td @click="showApply(n)">
              申请单编号
            </td>
            <td>
              申请单名称
            </td>
            <td>
              申请单金额（元）
            </td>
            <td>
              申请日期
            </td>
            <td>
              {{spTypeList[n%4].label}}
            </td>
            <td>
              {{payTypeList[n%3].label}}
            </td>
            <td>
              申请说明
            </td>
          </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="rightPanel">
      <div style="">
        <!--部门选择-->
        <el-select size="small" style="width: 260px;" v-model="searchData.bmType">
          <el-option v-for="item in bmList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <!--预算显示区域-->
        <el-card>
          <div>
            <p style="color: #3294e8;">28</p>
            <div>预算支出项目总数</div>
          </div>
          <div>
            <p style="color:#f52c1d">1859543.88</p>
            <div>支出预算总额</div>
          </div>
        </el-card>
        <el-card>
          <div style="border-bottom: 1px solid #ccc">
            <span>对下补助项目名称：</span>
            <!--部门选择-->
            <el-select size="small" style="width: 100px" v-model="searchData.bzType">
              <el-option v-for="item in bzList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <!--echartArea-->
            <pie-chart :chartData="chartData"></pie-chart>
          </div>
        </el-card>
      </div>

    </div>
    <div class="pageArea">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchData.pageSearch.pageIndex"
        :page-sizes="[50,100,150,200]"
        :page-size="searchData.pageSearch.pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="dataList.total"
      >

      </el-pagination>
    </div>
  </div>

  <!--申请单弹窗-->
  <el-dialog id="applydialog" title="查看申请"
  :visible.sync="applyType"
  :before-close="handleClose">
    <applybill :applyNum="applyNum"
      @delete="handleDelete"
    ></applybill>
  </el-dialog>
  <!--申请单弹窗-->
  <el-dialog id="orgdialog" width="350px" title="组织树"
             :visible.sync="orgType">
    <orgtree :currentOrg="searchData.searchorg" @choose="getOrg"></orgtree>
   <!-- <span slot="body">
      <orgtree></orgtree>
    </span>
-->
    <span slot="footer"   style="text-align: center">
        <button class="cancelBtn"  @click="orgType=false">取消</button>
        <button class="confirmBtn" style="margin-left: 30px" @click="confirmOrg">确定</button>
      </span>
  </el-dialog>
</div>
</template>

<script>
  import tophandle from '../../components/topNav/topHandle'
  import pieChart from '../../components/echart/pieChart'
  import Applybill from "../../components/applyBill/applybill";
  import Orgtree from "../../components/orgtree/index";
    export default {
        name: "index",
      data(){
          return{
            checked:false,//多选选择框
            dataList:{
              total:200,
              data:[],
            },
            searchData:{
              approvalType:0,
              payType:0,
              bmType:0,
              bzType:0,
              searchValue:'',
              date:'',
              money:{
                smoney:'',
                emoney:''
              },
              pageSearch:{
                pageIndex:1,
                pageSize:50
              },
              searchorg:{label:'女工部'}
            },
            approvalList:[{value:0,label:'全部'},{value:1,label:'待审批'},{value:2,label:'审批中'},{value:3,label:'审批未通过'},{value:4,label:'审批通过'}],
            payList:[{value:0,label:'全部'},{value:1,label:'待支付'},{value:2,label:'支付异常'},{value:3,label:'支付成功'}],
            bmList:[{value:0,label:'办公室'},{value:1,label:'女工部'},{value:2,label:'财务与资产部'}],
            bzList:[{value:0,label:'全部'},{value:1,label:'XXX项目1'},{value:2,label:'XXX项目2'}],
            spTypeList:[{value:0,label:'待送审'},{value:1,label:'审批中'},{value:2,label:'审批通过'},{value:3,label:'未通过'}],
            payTypeList:[{value:0,label:'—'},{value:1,label:'待支付'},{value:2,label:'支付成功'}],
            visiable:false,//高级搜索框显示隐藏
            chartData:[],//图表数据
            applyType:false,//是否显示查看申请弹窗
            applyNum:'',//当前查看申请单的编号
            orgType:true,//是否显示组织弹窗
            choosedOrg:{}//选中的组织
          }
      },
      components:{Orgtree, Applybill, tophandle,pieChart},
      methods:{
          getData:function(){
            console.log('查询数据');
          },
        //分页pagesize修改触发事件
        handleSizeChange:function(){},
        //当前页码修改触发事件
        handleCurrentChange:function(){},
        //dialog关闭前触发事件
        handleClose:function(){
            //alert('cloase');
            this.applyType=false;
        },
        //查看申请弹窗
        showApply:function(num){
          this.applyType=true;
          this.applyNum=num;
        },
        //删除事件
        handleDelete:function(flag){
          if(flag){
            this.applyType=false;
            this.getData();
          }
        },
        //弹出组织树
        showOrg(){
            this.orgType=true;
        },
        //组织树点击选择事件
        getOrg:function(data){
            console.log(data);//这边可以得到选中的组织，当点击确定时，进行选中组织赋值，建议添加中间变量，用于保存点击组织树获取的值
          this.choosedOrg=data;
        },
        //点击组织树确定按钮进行选中组织赋值
        confirmOrg:function(){
          this.orgType=false;
          if(this.choosedOrg!==this.searchData.searchorg){
            this.searchData.searchorg=this.choosedOrg;
          }
        },
      }
    }
</script>

<style scoped>
  .formArea,.pageArea{
    right: 300px;
  }
.rightPanel{
  width: 260px;
  position: absolute;
  right: 20px;
  top: 8px;
  bottom: 20px;
  box-shadow: 0 0 7px #ccc;
  padding: 5px;
  background-color: #58a5e6;
  overflow-y: auto;
  font-size: 0.12rem;
}
  .rightPanel p{
    font-size: .4rem;
    margin-top: 10px;
    text-shadow: 1px 2px 1px #5302026e;
  }
</style>
<style>
  .sinor li{
    margin-bottom: 15px;
  }
  .sinor .el-input{
    width: 350px;
  }
  .sinor .smallinput .el-input{
    width: 164px;
  }
  .container .el-card{
    margin: 5px 0 0 0;
  }
  .rightPanel .el-input--small .el-input__inner{
    border: 0;
  }
  .rightPanel .el-card__body{
    padding: 5px;
  }
  #applydialog .el-dialog{
    padding: 0 10px;
    width: 90%;
    height: 600px;
    margin:auto;
  }
  #applydialog .el-dialog__header{
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  #applydialog .el-dialog__body{
    padding: 10px 20px 30px;
  }
</style>
