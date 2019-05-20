<template>
    <section>
      <el-dialog
        :visible.sync="data.openDialog"
        width="80%"
        :close-on-click-modal="false">
        <div slot="title" class="dialog-title">
          <span style="float: left">查看</span>
        </div>
        <div class="dialog-content">
          <el-row :gutter="10">
           <el-col :span="24">
             <div class="top-btn">
               <el-button class="btn" size="mini">审批</el-button>
               <el-button class="btn" size="mini">取消审批</el-button>
               <el-button class="btn" size="mini">打印</el-button>
             </div>
           </el-col>
          </el-row>
          <el-row class="content" :gutter="10">
           <el-col :span="5">
             <div class="left-card">
               <div>
                 <!--申请信息-->
                 <div class="apply-info">
                    <ul>
                      <li>申报部门：{{data.data.applyDepart}}</li>
                      <li>申报金额：{{data.data.applyAmount}}元</li>
                    </ul>
                 </div>
                 <!--拨付说明-->
                 <div class="pay-explain">
                    <div class="title">
                      <span>付款说明</span>
                    </div>
                    <div class="content">
                      <p>{{data.data.itemName}}</p>
                    </div>
                 </div>
               </div>
             </div>
           </el-col>
           <el-col :span="19">
             <div>
                <report-item></report-item>
             </div>
           </el-col>
          </el-row>
        </div>
      </el-dialog>
    </section>
</template>

<script>
    import ReportItem from "./reportItem";
    export default {
        name: "fundDetail",
      components: {ReportItem},
      props:{
        data:{
          type:Object,
          default:{
            openDialog:false,
            data:{}
          }
        }
      },
      data(){
          return{
            openDialog:false,
          }
      }
    }
</script>
<style scoped lang="scss">
  .dialog-title{
    >span{
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .content{
    height: 470px;
    padding: 20px 0 0 0 ;
  }
  .left-card{
    background-color: $primaryColor;
    height: 200px;
    max-width: 100%;
    border-radius: 8px;
    position: relative;
    padding: 7%;
    >div{
      background-color: #ffffff;
      position: absolute;
      width: 86%;
      height: 400px;
      border-radius: 8px;
      box-shadow: 0px 2px 10px #888888;
      >.apply-info{
        padding: 8px;
        >ul{
          >li{
            height: 0.3rem;
            border-bottom: 1px solid #eaeaea;
            line-height: 0.3rem;
            text-align: left;
            width: 100%;
          }
        }
      }
      >.pay-explain{
        max-width: 100%;
        height: 200px;
        margin: 5%;
        box-shadow: 0px 2px 10px #888888;
        border-radius: 8px;
        >.title{
          width: 100%;
          height: 0.25rem;
          border-radius: 8px 8px 0 0;
          background-color: $primaryColor;
          >span{
            line-height: 0.25rem;
            color: #ffffff;
          }
        };
        >.content{
          height: 1.75rem;
          border-radius:0 0 8px 8px;
       }
      }
    }
  }
</style>
<style scoped>
  .top-btn{
    float: right;
  }
  .dialog-content{
    height: 500px;
  }
</style>
