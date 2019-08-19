<!-- 额度核销弹窗 -->
<template>
  <div>
    <div class="nav">
      <el-button class="btn">增行</el-button>
      <el-button class="btn">删行</el-button>
      <el-button class="btn">保存</el-button>
      <el-button class="btn" @click="amountReturn">额度返还</el-button>
    </div>
    <div style="margin-top: 20px">
      <table>
        <colgroup>
          <col width="5%"/>
          <col width="12%"/>
          <col width="17%"/>
          <col width="18%"/>
          <col width="21%"/>
          <col width="20%"/>
        </colgroup>
        <thead>
        <th>行号</th>
        <th>核销日期</th>
        <th>核销金额</th>
        <th>关联报销单据号</th>
        <th>关联业务单据号（请核对审批表）</th>
        <th>备注及说明</th>
        <th class="aod"></th>
        </thead>
        <tbody>
        <tr v-for="(item,index) in dataList">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="aod">
            <i class="el-icon-minus" @click="addData"></i>
            <i class="el-icon-plus" @click="minusData"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div style="text-align: right;margin-top: 20px">
      <el-button class="btn">确认</el-button>
      <el-button class="btn whiteBtn">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cancel",
    data(){
      return{
        dataList: [
          {}
        ]
      }
    },
    methods: {
      amountReturn: function() {
        this.$confirm('是否确认支出预算已落实完毕?', '提示', {
          confirmButtonText: '确定',
          cancelBtnText: '取消',
          type: 'warning'
        }) .then(() => {
          //额度返还接口
          console.log('额度返还')
        })
          .catch(() => { })
      },
      //增行
      addData: function(index) {
        this.dataList.splice(index,0,{});
      },
      //减行
      minusData: function(index) {
        this.dataList.splice(index,1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav{
    text-align: left;
  }
 table {
   th,td{
     padding: 10px;
     border: 1px solid #ccc;
     height: 38px;
   }
   tr:hover {
     .aod{
       visibility: visible;
     }
   }
   .aod{
     border: 0;
     padding: 0 0 0 5px;
     visibility: hidden;
     i{
       width: 20px;
       height: 20px;
       text-align: center;
       display: block;
       font-size: 15px;
       padding:3px;
       color: #fff;
       border-radius: 50%;
       &:nth-of-type(1){
         background-color: red;
       }
       &:nth-of-type(2){
         background-color: green;
       }
     }
   }
 }

</style>
