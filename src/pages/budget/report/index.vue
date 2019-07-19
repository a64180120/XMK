<template>
  <section class="report">
    <div style="position: relative">
      <tophandle title="预算中心" @refresh="getData">
        <div class="btnCon">
          <div @click.stop="printTables" class="handle" style="width: 80px;">
            <div class="topIcon">
              <img src="@/assets/images/dy.png" alt="">
            </div>
            打印
          </div>
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
    </div>
  </section>

</template>

<script>
  import tophandle from '@/components/topNav/topHandle'
  export default {
    name: "yearreport",
    data(){
      return{
        //左侧导航
        navList:[
          {title:'年初收支预算汇总表',url:''},
          {title:'项目支出申报',url:''},
          {title:'基本支出申报',url:''},
          {title:'收入预算申报',url:''}
        ],
        //选中的导航
        navActive:0
      }
    },

    components:{tophandle},
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
            border-bottom: 1px solid #fff;
            text-align: center;
            box-shadow: inset 0px 0px 10px 0px #bbb;
            &.active{
              background-color: #00B8EE;
              color: #fff;
              box-shadow: inset 0px 0px 10px 0px #f6fdff;
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
    }
  }

</style>
