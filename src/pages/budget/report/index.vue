<template>
  <section>
    <div style="position: relative">
      <tophandle title="预算中心"
                 @refresh="getData">
        <div class="btnCon">
<!--          <div @click.stop="showAuditAdd('add')"
               class="handle">
            <div class="topIcon"><img src="@/assets/images/xz.png"
                                      alt=""></div>
            新增
          </div>
          <div @click.stop="showAuditAdd('update')"
               class="handle">
            <div class="topIcon"><img src="@/assets/images/zj2.png"
                                      alt=""></div>
            修改
          </div>
          <div @click.stop="showAuditAdd('delete')"
               class="handle">
            <div class="topIcon"><img src="@/assets/images/zj3.png"
                                      alt=""></div>
            删除
          </div>
          <div @click.stop="showAuditAdd('SS')"
               class="handle">
            <div class="topIcon"><img src="@/assets/images/sp.png"
                                      alt=""></div>&lt;!&ndash; @click.stop="approvalDataS.openDialog=true"&ndash;&gt;
            送审
          </div>
          <div @click.stop="showAuditAdd('QXSS')"
               class="handle">
            <div class="topIcon"><img src="@/assets/images/ss_d.png"
                                      alt=""></div>&lt;!&ndash; @click.stop="approvalDataS.openDialog=true"&ndash;&gt;
            取消送审
          </div>
          <div @click.stop="showAuditAdd('SC')"
               class="handle"
               style="width: 80px;">
            <div class="topIcon"><img src="@/assets/images/sc.png"
                                      alt=""></div>&lt;!&ndash; @click="creatPayItem()"&ndash;&gt;
            生成支付单
          </div>
          <div @click.stop="showAuditAdd('ZF')"
               class="handle">
            <div class="topIcon"><img src="@/assets/images/zf.png"
                                      alt=""></div>&lt;!&ndash; @click.stop="approvalDataS.openDialog=true"&ndash;&gt;
            作废
          </div>-->
          <div @click.stop="printTables" class="handle" style="width: 80px;">
            <div class="topIcon">
              <img src="@/assets/images/dy.png" alt="">
            </div><!-- @click="creatPayItem()"-->
            打印
          </div>
        </div>
      </tophandle>
    </div>

    <div ref="container" class="container fullTable">
      <div class="leftNav">
        <ul>
          <template v-for="(item,index) in navList">
            <li @click="navActive=index" :class="{active:navActive==index}">{{item.title}}</li>
          </template>
        </ul>
      </div>
    </div>
  </section>

</template>

<script>
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
    }
  }
</script>
