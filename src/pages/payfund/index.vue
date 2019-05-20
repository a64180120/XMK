<template>
<div>
  <div style="position: relative">
    <tophandle></tophandle>
  </div>

  <div class="container">

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
      <div style="float: right;display: flex">
        <label>
          <el-input size="small" placeholder="请输入内容" v-model="searchData.searchValue">
            <el-button slot="append" >搜索</el-button>
          </el-input>
        </label>
        <label>
          <el-popover trigger="click" placement="bottom-start" width="412" v-model="visiable" :hide-on-click="false">
              <!--<span class=" el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </span>-->
            <el-button size="small" slot="reference" style="margin-left:20px">高级</el-button>
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
    <div class="formArea">
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
</div>
</template>

<script>
  import tophandle from '../../components/topNav/topHandle'
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

            },
            approvalList:[{value:0,label:'全部'},{value:1,label:'待审批'},{value:2,label:'审批中'},{value:3,label:'审批未通过'},{value:4,label:'审批通过'}],
            payList:[{value:0,label:'全部'},{value:1,label:'待支付'},{value:2,label:'支付异常'},{value:3,label:'支付成功'}],
            visiable:false,//高级搜索框显示隐藏
          }
      },
      components:{tophandle},
      methods:{
        handleSizeChange:function(){},
        handleCurrentChange:function(){},
      }
    }
</script>

<style scoped>

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
</style>
