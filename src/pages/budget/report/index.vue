<template>
  <section class="report">
    <div style="position: relative">
      <tophandle title="预算中心" @refresh="getData">
       <div class="btnCon">
         <!-- 预算按钮事件 -->
         <template v-if="navActive==0">
           <template v-if="!edit">
             <div v-if="!budgetHide" @click.stop="editFuc" class="handle">
               <div class="topIcon">
                 <img src="@/assets/images/dy.png" alt="">
               </div>
               编辑
             </div>
             <div v-if="!budgetHide" @click.stop="$refs.budget.reportBudget" class="handle" style="width:80px">
               <div class="topIcon" >
                 <img src="@/assets/images/dy.png" alt="">
               </div>
               上报预算
             </div>
             <div @click.stop="$refs.budget.printOrexcelTable(1)" class="handle">
               <div class="topIcon">
                 <img src="@/assets/images/dy.png" alt="">
               </div>
               导出
             </div>
             <div @click.stop="$refs.budget.printOrexcelTable(0)" class="handle">
               <div class="topIcon">
                 <img src="@/assets/images/dy.png" alt="">
               </div>
               打印
             </div>
           </template>
           <template v-else>
             <div @click.stop="$refs.budget.save(0)" class="handle">
               <div class="topIcon">
                 <img src="@/assets/images/dy.png" alt="">
               </div>
               保存
             </div>
             <div @click.stop="$refs.budget.reportBudget" class="handle" style="width:80px">
               <div class="topIcon">
                 <img src="@/assets/images/dy.png" alt="">
               </div>
               保存并上报
             </div>
             <div @click.stop="editFuc" class="handle">
               <div class="topIcon">
                 <img src="@/assets/images/dy.png" alt="">
               </div>
               取消
             </div>
           </template>
         </template>

         <!-- 项目支出事件 -->
         <template v-if="navActive==1">
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             导出
           </div>
           <div @click.stop="$refs.proexpend.printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             打印
           </div>
         </template>
         <!-- 基本支出按钮事件 -->
         <template v-if="navActive==2">
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             编辑
           </div>
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             上报预算
           </div>
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             导出
           </div>
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             打印
           </div>
         </template>
         <!-- 收入预算按钮事件 -->
         <template v-if="navActive==3">
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             编辑
           </div>
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             上报预算
           </div>
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             导出
           </div>
           <div @click.stop="printTables" class="handle">
             <div class="topIcon">
               <img src="@/assets/images/dy.png" alt="">
             </div>
             打印
           </div>
         </template>
        </div>
      </tophandle>
    </div>

    <div ref="container" class="container fullTable">
      <div class="leftNav">
        <ul>
          <template v-for="(item,index) in navList">
            <li :style="{height:(100/navList.length)+'%'}" @click="navActive=index" :class="{active:navActive==index}">
              <p>{{item.title}}</p>
            </li>
          </template>
        </ul>
      </div>
      <div class="rightArea">
        <section v-if="navActive==0">
          <budget v-if="navActive==0" @hideTil="hideTil" ref="budget"></budget>
        </section>
        <section v-if="navActive==1">
          <proexpend v-if="navActive==1" ref="proexpend"></proexpend>
        </section>
        <section v-if="navActive==2">
          <basexpend v-if="navActive==2" ref="basexpend"></basexpend>
        </section>
        <section v-if="navActive==3">
          <income v-if="navActive==3" ></income>
        </section>
      </div>
    </div>

  </section>

</template>

<script>
  import tophandle from '@/components/topNav/topHandle'
  import budget from './budget'
  import income from './income'
  import basexpend from './basexpend'
  import proexpend from './proexpend'
  export default {
    name: "yearreport",
    data(){
      return{
        //左侧导航
        navList:[
          {title:'年初收支预算汇总表',url:''},
          {title:'项目支出申报',url:''},
          /*{title:'基本支出申报',url:''},
          {title:'收入预算申报',url:''}*/
        ],
        //选中的导航
        navActive:0,
        //当为预算表时，编辑按钮切换,默认false,非编辑
        edit: false,
        //预算已上报时，隐藏上报和编辑按钮
        budgetHide:false,
      }
    },

    components:{tophandle,budget,income,basexpend,proexpend},
    methods:{
      getData:function(){

      },
      editFuc: function() {
        this.edit=!this.edit;
        this.$refs.budget.editFuc();
      },
      //当预算已上报时，进行修改，隐藏编辑上报按钮
      hideTil: function(){
        this.budgetHide=true;
      }
    }
  }
</script>
<style lang="scss" >
  .btnCon{
    .handle{
      display: inline-block;
      width: 60px;
      height: 50px;
      padding: 0px 0;
      cursor: pointer;
      &:active{
        background: #ccc;
      }
    }
  }
  .report{
    >.container{
      min-width: 1250px;
      >.leftNav{
        height: 100%;
        width: .4rem;
        float: left;
        display: inline-block;
        &:after{
          content: '';
          clear: both;
        }
        >ul{
          height: 100%;
          >li{
            background-color: #cccccc;
            box-sizing: border-box;
            border-bottom: 1px solid #949494;
            text-align: center;
            cursor: pointer;
            /*box-shadow: inset 0px 0px 10px 0px #bbb;*/
            &:last-child{
              border-bottom: 0;
            }
            &.active{
              background-color: #00B8EE;
              color: #fff;
              /*box-shadow: inset 0px 0px 10px 0px #f6fdff;*/
            }
            &:before{
              content: '';
              height: 130%;
              vertical-align: middle;
              display: inline-block;
            }
            >p{
              display: inline-block;
              line-height: 20px;
            }
          }

        }
      }
      >.rightArea{
        padding: 10px;
        height: 100%;
        overflow: hidden;
        >section{
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }

</style>
