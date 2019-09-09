<template>
  <!--年初收支预算表-->
  <div class="contentPanel">
    <div class="topNav">
      <div @click="book.visiable=true"><span>预算说明书</span></div>
      <!--<div>
        <ul v-if="!edit">
          <li><el-button class="btn" size="mini" @click="edit=true">编辑</el-button></li>
          <li><el-button class="btn" size="mini" @click="">上报预算</el-button></li>
          <li><el-button class="btn" size="mini" @click="">导出</el-button></li>
          <li><el-button class="btn" size="mini" @click="">打印</el-button></li>
          <li><el-button class="btn" size="mini" @click=""><i class="el-icon-refresh"></i></el-button></li>
        </ul>
        <ul v-else>
          <li><el-button class="btn" size="mini" @click="">保存</el-button></li>
          <li><el-button class="btn" size="mini" @click="">保存并上报</el-button></li>
          <li><el-button class="btn" size="mini" @click="edit=false">取消</el-button></li>
        </ul>
      </div>-->
    </div>
    <div class="tbArea"
         @scroll="tablescroll"
         ref="scrollTable">
      <table>
        <thead>
          <th>科目编码</th>
          <th>科目名称</th>
          <th>上年决算数（元）</th>
          <th>本年预算数（元）</th>
          <th>说明{{verifyType}}</th>
        </thead>
        <colgroup>
          <col width="15%">
          <col width="20%">
          <col width="25%">
          <col width="25%">
          <col width="15%">
        </colgroup>
        <tbody>
        <!--全部可编辑-->
         <!-- <template v-for="(item,index) in dataList">
            &lt;!&ndash; 本年结余、期末滚存结余 &ndash;&gt;
            <template v-if="item.SUBJECTCODE=='5QM1'||item.SUBJECTCODE=='5QM6'">
              <tr>
                <td>{{item.SUBJECTNAME}}</td>
                <td></td>
                &lt;!&ndash;上年决算数&ndash;&gt;
                <td class="right">
                  {{item.FINALACCOUNTSTOTAL | NumFormat}}
                </td>
                &lt;!&ndash;本年预算数&ndash;&gt;
                <td class="right">
                  {{item.BUDGETTOTAL | NumFormat}}
                </td>
                <td :style="{padding:edit? '0 !important':''}">
                  <template v-if="edit">
                    <input v-model="item.DESCRIPTION">
                  </template>
                  <template v-else>
                    {{item.DESCRIPTION}}
                  </template>
                </td>
              </tr>

            </template>

            &lt;!&ndash; 上年结余、本年收回投资、本年投资、本年提取后备金 &ndash;&gt;
            <template v-else-if="item.SUBJECTCODE=='5QM2'||item.SUBJECTCODE=='5QM3'||item.SUBJECTCODE=='5QM4'||item.SUBJECTCODE=='5QM5'">
              <tr>
                <td></td>
                <td>{{item.SUBJECTNAME}}</td>
                &lt;!&ndash;上年决算数&ndash;&gt;
                <td class="right">
                  {{item.FINALACCOUNTSTOTAL | NumFormat}}
                </td>
                &lt;!&ndash;本年预算数&ndash;&gt;
                <td class="right">
                  {{item.BUDGETTOTAL | NumFormat}}
                </td>
                <td :style="{padding:edit? '0 !important':''}">
                  <template v-if="edit">
                    <input v-model="item.DESCRIPTION">
                  </template>
                  <template v-else>
                    {{item.DESCRIPTION}}
                  </template>
                </td>
              </tr>

            </template>

            &lt;!&ndash; 本年合计支出 本年合计收入 &ndash;&gt;
            <template v-else-if="item.SUBJECTCODE=='4BNHJSR'||item.SUBJECTCODE=='5BNHJZC'">
              <tr>
                <td colspan="2">{{item.SUBJECTNAME}}</td>
                &lt;!&ndash;上年决算数&ndash;&gt;
                <td class="right">
                  {{item.FINALACCOUNTSTOTAL | NumFormat}}
                </td>
                &lt;!&ndash;本年预算数&ndash;&gt;
                <td class="right">
                  {{item.BUDGETTOTAL | NumFormat}}
                </td>
                <td :style="{padding:edit? '0 !important':''}">
                  <template v-if="edit">
                    <input v-model="item.DESCRIPTION">
                  </template>
                  <template v-else>
                    {{item.DESCRIPTION}}
                  </template>
                </td>
              </tr>

            </template>

            &lt;!&ndash; 普通科目 &ndash;&gt;
            <template v-else>
              <tr>
                <td class="left"
                    style="text-indent: 20px">{{item.SUBJECTCODE}}</td>
                <td class="left"
                    style="text-indent: 20px">{{item.SUBJECTNAME}}</td>
                &lt;!&ndash;上年决算数&ndash;&gt;
                <td class="right"
                    :style="{padding:edit&&!item.Childrens? '0 !important':''}">
                  <template v-if="edit&&!item.Childrens">
                    <input :value="item.FINALACCOUNTSTOTAL"
                           :data-prop="[index,-1,0]"
                           @focus="clearZero"
                           @keyup="clearNoNum"
                           @blur="countMoney">
                  </template>
                  <template v-else>
                    {{item.FINALACCOUNTSTOTAL | NumFormat}}
                  </template>
                </td>
                &lt;!&ndash;本年预算数&ndash;&gt;
                <td class="right"
                    :style="{padding:edit&&!item.Childrens? '0 !important':''}">
                  <template v-if="edit&&!item.Childrens">
                    <input :value="item.BUDGETTOTAL"
                           :data-prop="[index,-1,1]"
                           @focus="clearZero"
                           @keyup="clearNoNum"
                           @blur="countMoney">
                  </template>
                  <template v-else>
                    {{item.BUDGETTOTAL | NumFormat}}
                  </template>
                </td>
                <td :style="{padding:edit? '0 !important':''}">
                  <template v-if="edit">
                    <input v-model="item.DESCRIPTION">
                  </template>
                  <template v-else>
                    {{item.DESCRIPTION}}
                  </template>
                </td>
              </tr>
              &lt;!&ndash; 一级科目对应的子级 &ndash;&gt;
              <template v-if="item.Childrens" v-for="(child,cindex) in item.Childrens">
                <tr>
                  <td class="left"
                      style="text-indent: 40px">{{child.SUBJECTCODE}}</td>
                  <td class="left"
                      style="text-indent: 40px">{{child.SUBJECTNAME}}</td>
                  <td class="right"
                      :style="{padding:edit? '0 !important':''}">
                    <template v-if="edit">
                      <input :value="child.FINALACCOUNTSTOTAL"
                             :data-prop="[index,cindex,0]"
                             @focus="clearZero"
                             @keyup="clearNoNum"
                             @blur="countMoney">
                    </template>
                    <template v-else>
                      {{item.FINALACCOUNTSTOTAL | NumFormat}}
                    </template>
                  </td>
                  <td class="right"
                      :style="{padding:edit? '0 !important':''}">
                    <template v-if="edit">
                      <input :value="child.BUDGETTOTAL"
                             :data-prop="[index,cindex,1]"
                             @focus="clearZero"
                             @keyup="clearNoNum"
                             @blur="countMoney">
                    </template>
                    <template v-else>
                      {{child.BUDGETTOTAL | NumFormat}}
                    </template>
                  </td>
                  <td :style="{padding:edit? '0 !important':''}">
                    <template v-if="edit">
                      <input v-model="child.DESCRIPTION">
                    </template>
                    <template v-else>
                      {{child.DESCRIPTION}}
                    </template>
                  </td>
                </tr>
              </template>
            </template>
          </template>
-->
         <!--只允许编辑说明-->
         <template v-for="(item,index) in dataList">
           <tr>
             <td class="left"
                 style="text-indent: 20px"
                  v-if="item.SUBJECTCODE!='4BNHJSR'&&item.SUBJECTCODE!='5BNHJZC'">
               <template v-if="item.SUBJECTCODE=='5QM1'||item.SUBJECTCODE=='5QM6'">{{item.SUBJECTNAME}}</template>
               <template v-else-if="item.SUBJECTCODE=='5QM2'||item.SUBJECTCODE=='5QM3'||item.SUBJECTCODE=='5QM4'||item.SUBJECTCODE=='5QM5'"></template>
               <template v-else>{{item.SUBJECTCODE}}</template>
             </td>
             <td :class="item.SUBJECTCODE=='4BNHJSR'||item.SUBJECTCODE=='5BNHJZC'?'center':'left'"
                 style="text-indent: 20px"
                 :colspan="item.SUBJECTCODE=='4BNHJSR'||item.SUBJECTCODE=='5BNHJZC'?2:1">
               <template v-if="item.SUBJECTCODE!='5QM1'&&item.SUBJECTCODE!='5QM6'">{{item.SUBJECTNAME}}</template>
             </td>
             <td class="right">{{item.FINALACCOUNTSTOTAL | NumFormat}}</td>
             <td class="right">
                 {{item.BUDGETTOTAL | NumFormat}}
             </td>
             <td :style="{padding:edit? '0 !important':''}">
               <template v-if="edit">
                 <input v-model="item.DESCRIPTION">
               </template>
               <template v-else>
                 {{item.DESCRIPTION}}
               </template>
             </td>
           </tr>
           <template v-if="item.Childrens" v-for="(child,cindex) in item.Childrens">
             <tr>
               <td class="left"
                   style="text-indent: 40px">{{child.SUBJECTCODE}}</td>
               <td class="left"
                   style="text-indent: 40px">{{child.SUBJECTNAME}}</td>
               <td class="right">
                   {{item.FINALACCOUNTSTOTAL | NumFormat}}
               </td>
               <td class="right">
                   {{child.BUDGETTOTAL | NumFormat}}
               </td>
               <td :style="{padding:edit? '0 !important':''}">
                 <template v-if="edit">
                   <input v-model="child.DESCRIPTION">
                 </template>
                 <template v-else>
                   {{child.DESCRIPTION}}
                 </template>
               </td>
             </tr>
           </template>
         </template>
        </tbody>
      </table>
    </div>
    <!-- 上报标记 -->
    <div class="reportMark" v-if="verifyType==1">
      <p>已上报</p>
      <p>{{dataList[0].VERIFYSTARTTIME.substring(0,10)}}</p>
    </div>
    <!--<div class="pageArea" style="transition: all .3s linear;">
      <el-pagination
        :current-page="pageSearch.pageIndex"
        :page-sizes="[20,30,50,100]"
        :page-size="pageSearch.pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="pageSearch.total"
        @size-change="changePagesize"
        @current-change="changePageindex"
      ></el-pagination>
    </div>-->

    <!--经费收支预算表弹窗-->
   <!-- <div data-v-178c06ba="" class="el-dialog__wrapper" style="display: none;">
      <div role="dialog" aria-modal="true" aria-label="预算说明书" class="el-dialog" style="margin-top: 15vh; width: 1200px;">
        <div class="el-dialog__header">
          <span class="el-dialog__title">预算说明书</span>
          <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
        </div>
      </div>
    </div>-->


    <el-dialog modal-append-to-body
               :visible="book.visiable"
               title="预算说明书"
               width="1200px"
               class="bookArea"
               @close="book.visiable=false">
      <div slot="footer">
        <div :style="{left: -(bookStep*1200)+'px'}">
          <!--封面组件-->
          <div>
            <budget-book ref="bookArea"></budget-book>
          </div>

          <!-- 说明书 -->
          <div>
            <div style="text-align: right">
              <el-button class="btn" @click="bookEdit=!bookEdit">{{bookEdit?'保存':'编辑'}}</el-button>
            </div>

            <div  ref="bookContent" v-html="tableFace.Content" :style="{'page-break-after':'always',display:bookEdit?'none':'block',height: '480px' , overflowY:'auto', 'margin-top':'10px'}">{{tableFace.Content}}</div>
            <tinymce-editor
              ref="editor"
              id="budgetet-editor"
              v-model="tableFace.Content"
              :initvalue="tableFace.Content"
              :disabled='false'
              :resize="false"
              @onClick='tinymceClick'
              :style="{'margin-top': '15px','height':'80%'}"
              v-if="bookEdit"
            >
            </tinymce-editor>
          </div>
        </div>

        <!-- 左右箭头，切换封面和说明书 -->
        <i class="el-icon-d-arrow-left arrow arrowLeft" @click="bookStep=0" :style="{'opacity':bookStep==1?1:0}"></i>
        <i class="el-icon-d-arrow-right arrow arrowRight" @click="bookStep=1" :style="{'opacity':bookStep==0?1:0}"></i>
      </div>

    </el-dialog>
    <!--打印内容选择-->
    <el-dialog modal-append-to-body
               :visible="printShow"
               :title="'选择'+(printOrExcel==0?'打印':'导出')+'内容'"
               width="400px"
               @close="printShow=false">
      <div>
        <el-checkbox v-model="printChoice[0]">封面</el-checkbox>
        <el-checkbox v-model="printChoice[1]">说明</el-checkbox>
        <el-checkbox v-model="printChoice[2]">报表</el-checkbox>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button class="btn whiteBtn" size="small" @click="printShow=false">取消</el-button>
        <template v-if="printOrExcel==0">
          <el-button class="btn" size="small" @click="printTableAc">打印</el-button>
        </template>
        <template v-else>
          <el-button class="btn" size="small" @click="printTableAc">导出</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//表头固定监听事件
import { tableScroll } from '@/api/upload'
//预算说明书组件
import budgetBook from './budgetBook'
import { mapState } from 'vuex'
import tinymceEditor from '@/components/tinymce/tinymce-editor.vue'

export default {
  name: "budget",
  data () {
    return {
      //预算说明书
      book: {
        visiable: false
      },
      //表格数据-自造数据
      dataList: [
        // { "PhId": "0", "PHIDSUBJECT": "0", "SUBJECTCODE": "401", "SUBJECTNAME": "会费收入", "ORGID": "488181024000003", "ORGCODE": "101001", "UYEAR": "2019", "FINALACCOUNTSTOTAL": 0.0, "BUDGETTOTAL": 0.0, "ADJUSTMENT": 0.0, "APPROVEDBUDGETTOTAL": 0.0, "ThisaccountsTotal": 0.0, "COMPLETE": 0.0, "DESCRIPTION": null, "VERIFYSTART": 0, "VERIFYMIDDLE": 0, "VERIFYEND": 0, "VERIFYSTARTTIME": null, "VERIFYMIDDLETIME": null, "VERIFYENDTIME": null, "PHIDMST": "0", "DESCRIPTIONMIDDLE": null, "DESCRIPTIONEND": null, "ForeignKeys": null, "BusinessPrimaryKeys": null, "PersistentState": 0, "NgRecordVer": 0, "NgInsertDt": "2019-08-06 14:08:20", "NgUpdateDt": "2019-08-06 14:08:20", "Creator": "0", "Editor": "0", "CurOrgId": "0", "_OldIdValue_": null, "PropertyBytes": null, "ExtendObjects": null }
        /*{code:'401',title:'会费收入',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]},
        {code:'402',title:'拨缴经费收入',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]},
        {code:'403',title:'上级补助收入',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[
            {code:'40301',title:'回拨补助',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]},
            {code:'40302',title:'专项补助',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]},
            {code:'40303',title:'超收补助',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]}
          ]},
        {code:'501',title:'职工活动支出',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]},
        {code:'502',title:'维权支出',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]},
        {code:'503',title:'业务支出',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[
            {code:'50301',title:'培训费',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]},
            {code:'50302',title:'会议费',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]},
            {code:'50303',title:'外事费',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]}
          ]}*/
      ],
      /*记录本年支出合计以及本年收入合计等特殊行的下标，用于计算
      * [  本年收入合计，  本年支出合计， 本年结余（本年收入-本年支出），期末滚存结余（本年结余+上年结余+本年收回投资-本年投资-本年提取后备金）]
      * */
      specialLineList:[0,0,0,0],
      //启用编辑
      edit: false,
      //是否上报 0-未上报，1-已上报
      verifyType: 0,
      tableFace:{
        phid:'',
        Content:'<h1>你好</h1>'
      },
      //打印选择弹窗显示
      printShow: false,
      //打印-0 还是导出-1（共用弹窗）
      printOrExcel:0,
      //打印内容选择-封面，说明书，报表
      printChoice: [false,false,true],
      //封面位置
      bookStep:0,
      //说明书编辑
      bookEdit:false
    }
  },
  components: { budgetBook,tinymceEditor },
  computed: {
    ...mapState({
      orgid: state => state.user.orgid, //id
      orgcode: state => state.user.orgcode, //编码
      orgname: state => state.user.orgname, //名称
      year: state => state.user.year, //年份
      userid: state => state.user.userid,
      usercode: state => state.user.usercode,
      menu: state => state.user.menubutton //权限按钮
    })
  },
  mounted () {
    this.getData();
  },
  methods: {
    //编辑
    editFuc: function () {
      this.edit = !this.edit
    },
    /*报表数据获取
    *
    * 获取年初申报列表
    * /BudgetMstApi/GetBeginYear  （GYS  ， get）
    * 参数：orgid  组织id
    * orgCode  组织code
    * Year   年份
    *
    * */
    getData: function () {
       let data={
         orgid: this.orgid,
         orgCode: this.orgcode,
         Year:this.year,//年度
       }
      /*let data = {
        orgid: '488181024000003',
        orgCode: '101001',
        Year: '2019'
      }*/
      this.getAxios('GYS/BudgetMstApi/GetBeginYear', data)
        .then(res => {
          if(res.Status=='success'){
            this.dataList = res.Data;
            this.verifyType=res.Data[0].VERIFYSTART;
            if(this.verifyType==1){
              this.$emit('hideTil');
            }
            /*这里进行循环，得到特殊行的下标(本年合计收入，本年合计支出，本年结余，期末滚存结余)，同时可以判断，是否已上报（VERIFYSTART）*/
            for( var i in res.Data ){
              if( res.Data[i].SUBJECTCODE=='4BNHJSR' ){
               this.specialLineList[0]=i;
              }
              if( res.Data[i].SUBJECTCODE=='5BNHJZC' ){
                this.specialLineList[1]=i;
              }
              if( res.Data[i].SUBJECTCODE=='5QM1' ){
                this.specialLineList[2]=i;
              }
              if( res.Data[i].SUBJECTCODE=='5QM6' ){
                this.specialLineList[3]=i;
              }
            }
          }else{
            this.$msgBox.show(res.Msg)
          }

        })
        .catch(err => {
          this.$msgBox.show('数据获取异常')
        })
    },
    //表头固定
    tablescroll: function () {
      let vm = this;
      tableScroll('scrollTable', vm)
    },
    changePagesize: function (val) {
      console.log('pagesize更改' + val)
    },
    changePageindex (val) {
      console.log('pageindex更改' + val)
    },
    /*上报预算*/
    reportBudget: function () {
      this.$confirm('上报预算后无法进行编辑，是否上报预算？', '提示', {
        confirmButtonText: '确定',
        cancelBtnText: '取消',
        type: 'warning'
      }).then(() => {
        //修改verifystart
        this.filterData(this.dataList);
        //保存
        this.save(1)
      }).catch(() => { })
    },
    /*保存
    * type: 0只保存 1保存后上报
    * */
    save: function (type) {

      let data={
        orgid: this.orgid,
        orgCode: this.orgcode,
        Year:this.year,//年度
        /*orgid: '488181024000003',
        orgCode: '101001',
        Year: '2019',*/
        infoData:this.dataList  //列表集合
      };
      this.postAxios('GYS/BudgetMstApi/PostSaveAccountList', data)
        .then(res => {
          console.log(res);
          if(res.Status=='success') {
            if(type==1){
              this.$msgBox.show('上报成功。')
            }else{
              this.$msgBox.show('保存成功。')
            }
            this.getData()
          }
        }).catch(err => {
          this.$msgBox.show(err)
        })

     /* this.$msgBox.show({
        content: '保存成功。',
        fn: function () {
          if (type == 1) {
            //clearTimeout(timer)
            vm.reportBudget();
          }

        }
      })*/

    },
    //打印选择弹窗type:0-打印，1-导出
    printOrexcelTable: function( type ) {
      this.printShow=true;
      this.printOrExcel=type;
    },
    //调用打印
    printTableAc: function() {
      let print=document.createElement('div');
      //封面
      if( this.printChoice[0] ) print.appendChild(this.$refs.bookArea.getFace().cloneNode(true));
      //说明书
      if( this.printChoice[1] ) print.appendChild(this.$refs.bookContent.cloneNode(true));
      //报表
      if( this.printChoice[2] )print.appendChild(this.$refs.scrollTable.cloneNode(true));
      this.$print(print);
      print=null;
    },
    //导出
    exportTableAc: function () {
     console.log('这里发送导出请求')
    },
    //输入框清除0，顺便将格式化的金额修改为正常数值，便于修改
    clearZero: function (val) {
      var tgVal = val.target.value;
      if (tgVal == '0.00' || tgVal == '0' || tgVal == '0.0') {
        val.target.value = '';
      }
      console.log(tgVal);
    },
    //输入框金额控制
    clearNoNum: function (val) {
      console.log(val)
      let obj = val.target;
      //obj.value = obj.value.replace(/[\u4e00-\u9fa5]/g,"");  //清除“汉字”和“.”以外的字符
      obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
      obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
      if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj.value = parseFloat(obj.value);
      }
    },
    /*输入框金额计算，上级科目汇总
    接受3个参数
    a:父级对应下标
    b:子级对应下标，若是无子级科目，则传入-1
    c:判断是上年决算数（0）还是本年预算数（1）
    * */
    countMoney (ev) {
      //input用data-prop 传参，需先获取
      let el = ev.target;
      //获取下标
      let valList = el.attributes['data-prop'].value.split(',');
      let a = valList[0], b = valList[1], c = valList[2];
      //设置数组中需要获取的字段
      let str = 'BUDGETTOTAL';
      if (c === '0') {
        //上年决算数计算
        str = 'FINALACCOUNTSTOTAL';
      } else {
        //本年预算数计算
        str = 'BUDGETTOTAL'
      }

      let count = this.dataList[a][str],oldcount=this.dataList[a][str];
      if (b === '-1') {
        //不包含二级科目
        //修改对应数组中的值
        this.$set(this.dataList[a], str, ev.target.value);
      } else {
        //修改二级科目，需要对相应的一级科目进行汇总
        let chilNum = this.dataList[a].Childrens[b][str];
        count = (count * 100 - (chilNum * 100)) / 100;
        count = (count * 100 + (ev.target.value * 100)) / 100;
        this.$set(this.dataList[a].Childrens[b], str, ev.target.value);
        this.$set(this.dataList[a], str, count);
      }
      //根据下标判断是收入还是支出，还是其他类型数值，进行总收入总支出，本年结余计算
      let index=this.specialLineList[0];
      if( +a<+this.specialLineList[0] ){
        //本年合计收入
        index=this.specialLineList[0];
      }else{
        //本年合计支出
        index=this.specialLineList[1];
      }
      //修改本年收入或本年支出  上面已经修改对应一级科目，所以这里可以直接取值，计算
      this.dataList[index][str]=Number(this.dataList[index][str]-oldcount+this.dataList[a][str]);
      //得到本年结余旧值，用于期末滚存结余计算
      let qmkc=this.dataList[this.specialLineList[2]][str];
      //这里进行本年结余计算
      this.dataList[this.specialLineList[2]][str]=Number(this.dataList[this.specialLineList[0]][str]-this.dataList[this.specialLineList[1]][str]);
      //这里进行期末滚存结余计算
      this.dataList[this.specialLineList[3]][str]=this.dataList[this.specialLineList[3]][str]-qmkc+this.dataList[this.specialLineList[2]][str];
    },
    //上报，字段修改
    filterData:function(list){
      for(var i in list){
        list[i].VERIFYSTART=1;
        list[i].VERIFYSTARTTIME=new Date();
        if(list[i].Childrens){
          this.filterData(list[i].Childrens)
        }
      }
    },
    tinymceClick(e,tinymceObj){
      console.log(e);
    },
  }
}
</script>

<style lang="scss" scoped>
@media print {
  @page {
    margin: 10px;
  }
  .tbArea {
    width: 100%;
    overflow: auto;
    padding: 30px;
    > table {
      width: 100%;
      margin-top: 10px;
      th {
        border: solid #eee;
        border-width: 0 1px;
        height: 38px;
        background-color: #d3e9f9;
        position: static;
      }
      td {
        border: 1px solid #eee;
        height: 38px;
        padding: 0 10px;
      }
    }
  }
}
.contentPanel {
  height: 100%;
  padding-bottom: 50px;
  .topNav {
    height: 38px;
    > div {
      display: inline-block;
      &:nth-of-type(1) {
        float: left;
        border-radius: 0 15px 15px 0;
        padding: 3px 15px;
        background-color: #ff9900;
        color: #fff;
        vertical-align: middle;
        font-size: 0.13rem;
        cursor: pointer;
      }
      &:nth-of-type(2) {
        float: right;
        > ul {
          > li {
            display: inline-block;
            width: 78px;
            text-align: center;
            color: #ff9900;
            cursor: pointer;
          }
        }
      }
    }

    &:after {
      content: "";
      clear: both;
    }
  }

  .tbArea {
    position: relative;
    height: 100%;
    overflow: auto;
    margin-top: 10px;
    > table {
      width: 100%;
      > tbody {
        > tr:nth-of-type(1) {
          td {
            border-top: 0;
          }
        }
      }

      th {
        border: solid #eee;
        border-width: 0 1px;
        height: 38px;
        background-color: #d3e9f9;
        position: relative;
        z-index: 100;
      }
      td {
        border: 1px solid #eee;
        height: 38px;
      }
    }
  }
}
.tbArea input {
  width: 100%;
  height: 100%;
  border: 0;
  padding: 10px;
  color: red;
  background-color: aliceblue;
}
.tbArea .right input {
  text-align: right;
}

  /*上报标记样式*/
  .reportMark {
    width: 200px;
    height: 80px;
    color: red;
    position: absolute;
    z-index: 99;
    top: 170px;
    right: 75px;
    border: 2px solid red;
    font-size: .25rem;
    border-radius: 8px;
    transform: rotate(25deg);
    background: rgba(255,255,255,.4);
  }

</style>
<style lang="scss">
  .dialog-footer {
    text-align: center;
  }
  .bookArea .el-dialog{
    height: 600px;
  }
  .bookArea .el-dialog__footer{
    text-align: center;
    padding-top: 0;
    margin-top: -70px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    height: 555px;
    >div{
      >div{
        width: 2400px;
        height: 100%;
        min-height: 500px;
        overflow: hidden;
        position: absolute;
        left: 0;
        transition: all .5s linear;
        >div{
          height: auto;
          min-height: 555px;
          margin: 0 auto;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 10px 30px;
          display: inline-block;
          width: 1200px;
          &:nth-of-type(2){
            text-align: justify;
          }
        }
      }
      .arrow{
        display: inline-block;
        position: absolute;
        top: 190px;
        font-size: .35rem;
        transition: all .3s linear;
        &:hover{
          color: #00B8EE;
        }
      }
      .arrowLeft{
        left: 0;
      }
      .arrowRight{
        left: 1150px;
      }
    }

  }
</style>
