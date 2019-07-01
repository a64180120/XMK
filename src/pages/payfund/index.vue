<template>
  <div class="self">
    <div style="position: relative">
      <tophandle title="资金拨付在线工作平台" @refresh="getDataC">
        <div class="btnCon">
          <div @click.stop="showAuditAdd('add')" class="handle">
            <div class="topIcon"><img src="@/assets/images/xz.png" alt=""></div>
            新增
          </div>
          <div @click.stop="showAuditAdd('update')" class="handle">
            <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
            修改
          </div>
          <div @click.stop="showAuditAdd('delete')" class="handle">
            <div class="topIcon"><img src="@/assets/images/zj3.png" alt=""></div>
            删除
          </div>
          <div @click.stop="showAuditAdd('SS')" class="handle">
            <div class="topIcon"><img src="@/assets/images/sp.png" alt=""></div><!-- @click.stop="approvalDataS.openDialog=true"-->
            送审
          </div>
          <div @click.stop="showAuditAdd('SC')" class="handle" style="width: 80px;">
            <div class="topIcon"><img src="@/assets/images/sc.png" alt=""></div><!-- @click="creatPayItem()"-->
            生成支付单
          </div>

          <!--<div class="nav" @click="payNav('approvalData')">送审</div>-->
        </div>
      </tophandle>
    </div>

    <div class="container">
      <el-button @click="printTables">打印</el-button>
      <div class="formArea">
        <div class="btnArea">
          <i class="el-icon-d-arrow-left iicon" style="position:absolute;left:0;top: .12rem;" @click.stop="unionStateScroll(false)"></i>
          <i class="el-icon-d-arrow-right iicon" style="position:absolute;right:275px;top: .12rem;" @click.stop="unionStateScroll(true)"></i>
          <div class="scrollNav">
            <div>
              <ul>
                <li>
                  <span>审批状态：</span>
                  <el-select size="small" v-model="searchData.approvalType">
                    <el-option v-for="item in approvalList"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>支付状态：</span>
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
                <li>
                  <span>申请金额</span>
                  <input style="width:auto;height: 32px;" class="el-input__inner"
                                   :precision="2"
                                   :controls="false"
                                   v-model="money.smoney"
                                   @keydown="clearZero(0)"
                                    @keyup="clearNum(0)"
                                   @blur="moneyChange" />
                  <span>至</span>
                  <input style="width:auto;height: 32px;" class="el-input__inner"
                         :precision="2"
                         :controls="false"
                         v-model="money.emoney"
                         @keydown="clearZero(1)"
                         @keyup="clearNum(1)"
                         @blur="moneyChange"/>
                </li>
              </ul>

            </div>


          </div>
          <label class="searchArea" style="float: right">
            <el-input size="small" placeholder="请输入申请单编号/名称" style="border-radius: 5px;width: 250px;overflow: hidden" v-model="searchData.searchValue">
              <el-button slot="append" size="small" style="background-color: #3294e8;color: #fff;border-top-left-radius: 0;border-bottom-left-radius: 0">搜索</el-button>
            </el-input>
          </label>
          <!--<el-button size="small" @click="showOrg">{{searchData.searchorg.label}}</el-button>-->
          <!--搜索、高级-->
          <!--<div style="float: right;display: flex" class="searchArea">

            <label>
              <el-popover trigger="click" placement="bottom-start" width="412" v-model="visiable" :hide-on-click="false">
                &lt;!&ndash;<span class=" el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
              </span>&ndash;&gt;
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
                    <el-input size="small" v-model="money.smoney"></el-input>
                    <span>至</span>
                    <el-input size="small" v-model="money.emoney"></el-input>
                  </li>
                  <li style="text-align: center;margin:15px 0 0 0 ">
                    <button class="cancelBtn">重置</button>
                    <button class="confirmBtn" style="margin-left: 50px">搜索</button>
                  </li>
                </ul>
              </el-popover>
            </label>
          </div>-->

        </div>
        <div class="tableHead">
          <table>
            <colgroup>
              <col width="7%">
              <col width="13%">
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="10%">
              <col width="10%">
              <col width="15%">
            </colgroup>
            <thead>
              <tr>
                <td title="序号" style="text-align: right;padding-right: .5rem">
                  <el-checkbox v-model="checked">序号</el-checkbox>
                </td>
                <td title="申请单编号">
                  申请单编号
                </td>
                <td title="申请单名称">
                  申请单名称
                </td>
                <td title="申请单金额（元）">
                  申请单金额（元）
                </td>
                <td title="申请日期">
                  申请日期
                </td>
                <td title="审批状态">
                  审批状态
                </td>
                <td title="支付状态">
                  支付状态
                </td>
                <td title="申请说明">
                  申请说明
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tableBody">
          <table ref="printArea">
            <colgroup>
              <col width="7%">
              <col width="13%">
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="10%">
              <col width="10%">
              <col width="15%">
            </colgroup>
            <tbody>
            <tr :class="{trActive:checkList[index]}" v-for="(item,index) in dataList.data">
              <td style="text-align: right;padding-right: .5rem" @click.self="changeCheck(index)">
                <el-checkbox v-model="checkList[index]">{{index+1}}</el-checkbox>
              </td>
              <td @click="showApply(item.PhId)" class="atype">
                <el-tooltip :content="item.FCode" popper-class="tooltipCla" placement="bottom-start">
                  <p>{{item.FCode}}</p>
                </el-tooltip>
              </td>
              <td>
                <el-tooltip :content="item.FName" popper-class="tooltipCla" placement="bottom-start">
                  <p>{{item.FName}}</p>
                </el-tooltip>
              </td>
              <td class="right">
                <el-tooltip :content="item.FAmountTotal| NumFormat" popper-class="tooltipCla" placement="bottom-start">
                  <p>{{item.FAmountTotal| NumFormat}}</p>
                </el-tooltip>
              </td>
              <td>
                <el-tooltip :content="(item.FDate.substring(0,19)).replace('T',' ')" popper-class="tooltipCla" placement="bottom-start">
                  <p>{{(item.FDate.substring(0,19)).replace('T',' ')}}</p>
                </el-tooltip>
              </td>
              <td class="atype" @click="openAuditfollow(item,index)">
                <el-tooltip :content="spTypeList[item.FApproval]" popper-class="tooltipCla" placement="bottom-start">
                  <p>{{spTypeList[item.FApproval]}}</p>
                </el-tooltip>
              </td>
              <td>
                <el-tooltip :content="payTypeList[item.IsPay]" popper-class="tooltipCla" placement="bottom-start">
                  <p>{{payTypeList[item.IsPay]}}</p>
                </el-tooltip>
              </td>
              <td class="left">
                <el-tooltip :content="item.FDescribe" popper-class="tooltipCla" placement="bottom-start">
                  <p>{{item.FDescribe}}</p>
                </el-tooltip>

              </td>
            </tr>
            <tr v-if="dataList.data.length==0">
              <td colspan="8">未查询到数据</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="rightPanel">
        <div style="width: 278px;overflow-y: scroll;padding-right: 11px;height: 100%;">
          <!--部门选择-->
          <el-select size="small" style="width: 250px;" v-model="searchData.bmType" @change="changeApart">
            <el-option v-for="item in bmList"
                       :key="item.PhId"
                       :label="item.OName"
                       :value="item.PhId">
            </el-option>
          </el-select>
          <!--预算显示区域-->
          <el-card>
            <div>
              <p style="color: #3294e8;font-size: .4rem">{{apartData.Mst.length}}</p>
              <div>预算支出项目总数</div>
            </div>
            <div>
              <p :title="apartData.Amount | NumFormat">
                <num :vv="Number(apartData.Amount)"></num>
                <!--{{apartData.money}}--></p>
            </div>
          </el-card>
          <el-card>
            <div style="border-bottom: 1px solid #ccc">
              <div style="font-size: .15rem">对下补助项目名称</div>
              <!--部门选择-->
              <el-select size="small" style="width: 100%" :title="apartDataMst[bzType]" v-model="bzType" @change="getChartList">
                <el-option v-for="item in apartData.Mst"
                           :key="item.PhId"
                           :label="item.FProjName"
                           :value="item.PhId">
                </el-option>
              </el-select>
            </div>
            <div>
              <!--echartArea-->
              <pie-chart
                         :dw="chartData.dw"
                         :opinion="chartData.title"
                         :opinionData="chartData.chart"></pie-chart>
            </div>
          </el-card>
        </div>

      </div>
      <div class="pageArea">
        <el-pagination
          :current-page="pageSearch.pageIndex"
          :page-sizes="[20,30,50,100]"
          :page-size="pageSearch.pageSize"
          layout="total,sizes,prev,pager,next,jumper"
          :total="dataList.total"
          @size-change="changePagesize"
          @current-change="changePageindex"
        >

        </el-pagination>
      </div>
    </div>

    <!--申请单弹窗-->

    <el-dialog v-if="applyType" class="applydialog" title="查看申请"
    :visible.sync="applyType"
    :before-close="handleClose">
      <applybill :applyNum="applyNum"
                 :subData="approvalDataS.subData"
        @delete="handleDelete"
      ></applybill>
    </el-dialog>
    <!--项目新增修改-->
    <el-dialog v-if="applyproType" class="applydialog" :title="applyproTitle"
               :visible.sync="applyproType"
               :close-on-click-modal="false"
               >
       <applypro :applyNum="applyNum" :prodata="apartData" :isAdd="isAdd"  @delete="handleDelete"></applypro>
    </el-dialog>
    <!--送审-->
    <go-approval v-if="approvalDataS.openDialog" :data="approvalDataS" @delete="handleDelete"></go-approval>
    <!--生成支付单-->
    <approval-dialog v-if="approvalData.openDialog" ref="approvalDialog" :title="appDialog.title" :btn-group="appDialog.btnGroup" :data="approvalData" ></approval-dialog>
    <!--查看审批流程-->
    <auditfollow v-if="visible" :visible="visible" @update:visible="closeAuditFollow()" :auditMsg="auditMsg" ></auditfollow>
  </div>
</template>

<script>
  import tophandle from '../../components/topNav/topHandle'
  import pieChart from '../../components/echart/pieChart'
  import num from '../../components/numAct/index'
  import Applybill from "../../components/applyBill/applybill";
  import Orgtree from "../../components/orgtree/index";
  import Applypro from "../../components/applyPro/applyPro";
  import goApproval from '../../components/applyPro/goApproval';
  import Auditfollow from "../../components/auditFollow/auditfollow";
  import ApprovalDialog from "../payfundapproval/approvalDialog";
  import {mapState} from 'vuex'
  import {printTable}  from '@/api/upload'
    export default {
        name: "index",
      data(){
          return{
            checked:false,//多选选择框
            checkList:[],//选择框列表
            dataList:{
              total:7,
              data:[],
            },
            bzType:0,
            pageSearch:{
              pageIndex:1,
              pageSize:20
            },
            money:{
              smoney:'',
              emoney:''
            },
            searchData:{
              approvalType:'',
              payType:'',
              bmType:0,

              searchValue:'',
              date:[],

            },
            approvalList:[{value:'',label:'全部'},{value:0,label:'待送审'},{value:1,label:'审批中'},{value:2,label:'审批未通过'},{value:9,label:'审批通过'}],
            payList:[{value:'',label:'全部'},{value:0,label:'待支付'},{value:1,label:'支付异常'},{value:9,label:'支付成功'}],
            bmList:[],//部门列表
            bzList:[{value:0,label:'全部'},{value:1,label:'救灾补助项目'},{value:2,label:'送温暖项目'}],
            spTypeList:{'0':'待送审','1':'审批中','2':'未通过','9':'审批通过'},
            payTypeList:{'0':'待支付','1':'支付异常','9':'支付成功'},
            visiable:false,//高级搜索框显示隐藏
            chartData:{
              chart:[{name:'可申请',value:13210},{name:'冻结',value:1200},{name:'已使用',value:2301}],
              title:['可申请','冻结','已使用'],
              dw:'元'
            },//图表数据
            applyType:false,//是否显示查看申请弹窗
            applyNum:'',//当前查看申请单的编号
            applyproType:false,//显示项目新增修改弹窗
            applyproTitle:'',
            approvalDataS: {
              openDialog: false,
              data: {},
              subData:[],//审批流获取
            },
            visible:false,//审批流程
            appDialog:{
              title:'',
              btnGroup: {
                cancelName:"",
                onfirmName:""
              }
            },
            approvalData:{
            },
            apartData:{bm:{},Mst:[],Amount:'0',subData:[]},//选择部门后获取的项目信息
            apartDataMst:{},//部门数组，通过phid绑值，用于显示title
            isAdd:true,//判断是修改（false）还是新增(true)
            auditMsg:[],//审批流程 数据
          }
      },
      components:{mapState,Applypro, Orgtree, Applybill, tophandle,pieChart,goApproval,Auditfollow,ApprovalDialog,num},
      mounted(){
          //this.getData();
        this.getDataC();
        //this.getCheckList(this.dataList.total);
      },
      watch:{
        checked:function(val){
          //数组快速修改，方法一
         this.checkList.forEach((item,index,array)=>{
            this.checkList[index]=val;
          })
          //方法二
         /* for(var i in this.checkList){
            this.checkList[i]=val
          }
          this.$forceUpdate(this.checkList);*/
        },
        searchData:{
          handler(val){
            if(val.bmType){
              this.pageSearch.pageIndex=1;
              this.getData();
            }
          },
          deep:true
        },

      },

      computed: {
        ...mapState({
          orgid: state => state.user.orgid, //id
          orgcode:state => state.user.orgcode, //编码
          orgname:state => state.user.orgname,//名称
          year:state => state.user.year,//年份
          userid:state => state.user.userid,
          usercode:state => state.user.usercode
        })
      },
      methods:{
        printTables:function(){
          let vm = this;
          printTable(vm);
        },
        clearZero:function(type){
          console.log(this.money.smoney)

         if(type==0){
           if(this.money.smoney=='.'){
             this.money.smoney='0.';
           }
           if(!this.money.smoney||this.money.smoney=='0.00'){
             this.money.smoney='';
           }

         }else{
           if(this.money.emoney=='.'){
             this.money.emoney='0.';
           }
           if(!this.money.emoney||this.money.emoney=='0.00'){
             this.money.emoney='';
           }
         }
        },
        clearNum:function(type){
            let val=this.money[type==0?'smoney':'emoney']+'';
            //obj.value = obj.value.replace(/[\u4e00-\u9fa5]/g,"");  //清除“汉字”和“.”以外的字符
            val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
            val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
            val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
            if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
              val= parseFloat(val);
            }
            this.money[type==0?'smoney':'emoney']=val;
        },
          //td选中事件
        changeCheck(val){
          this.checkList[val]=!this.checkList[val];
          this.$forceUpdate(this.checkList);
        },
        //滚动
        unionStateScroll(bool){
          var union=document.getElementsByClassName('scrollNav')[0];
          var unionStateCon=document.getElementsByClassName('scrollNav')[0].firstElementChild;
          let unionStateConChild=unionStateCon.firstElementChild
          let eleChildren=unionStateConChild.childNodes;
          let unionStateConWidth=0;
          let scrollWidth=200;
          for(var i in eleChildren ){
            if(eleChildren[i].nodeType==1){
              unionStateConWidth+=eleChildren[i].clientWidth+15;
            }
          }
          unionStateCon.style.width=unionStateConWidth+'px';

          var pWidth=parseInt(window.getComputedStyle(union).width);//父级宽度
          //return;
          let gap=unionStateConWidth-pWidth;

          if(!parseInt(unionStateCon.style.right)) {
            unionStateCon.style.right='0px';
          }
          if(bool){
            if(parseInt(unionStateCon.style.right)>gap){
              return;
            }else{
              let rig=parseInt(unionStateCon.style.right);
              if(rig+scrollWidth>gap){
                rig=gap;
              }else{
                rig=rig+scrollWidth;
              }
              unionStateCon.style.right=rig+'px';
            }
          }else{
            if(parseInt(unionStateCon.style.right)<=0){
              return;
            }else{

              unionStateCon.style.right=(parseInt(unionStateCon.style.right)<scrollWidth)?0:(parseInt(unionStateCon.style.right)-scrollWidth)+'px';
            }
          }
        },
          //根据数据的长度生成checkList
        getCheckList:function(n){
          let checkList=[];
          for(var i=0 ; i<n ; i++){
            checkList.push(false);
          }
          this.checkList=checkList;
          this.checked=false;
        },
        //获取当前选中的数组
        getCheckedList:function(){
          let checkedList=[];
          this.checkList.forEach((item,index,array)=>{
            if(item){
              checkedList.push(this.dataList.data[index])
            }
          })
          return checkedList;
        },
        //q切换右侧项目是进行并状态数据切换
        getChartList:function(val){
          let param={xmPhid:val,PhId:0};
          this.getAxios('GBK/PaymentMstApi/GetAmountOfMoney',param).then(res=>{
            this.chartData.chart=[{name:'可申请',value:res.Sum},{name:'冻结',value:res.Frozen},{name:'已使用',value:res.Use}];
            let maxNum=0;
            for(var i in  this.chartData.chart){
              if( this.chartData.chart[i].value>maxNum){
                maxNum= this.chartData.chart[i].value
              }
            }
            if(maxNum>=10000&&maxNum<100000000){
              this.chartData.dw='万元';
              for(var j in  this.chartData.chart){
                this.chartData.chart[j].value=( this.chartData.chart[j].value/10000).toFixed(2)
              }
            }else if(maxNum>=100000000){
              this.chartData.dw='亿元';
              for(var k in  this.chartData.chart){
                this.chartData.chart[k].value=( this.chartData.chart[k].value/100000000).toFixed(2)
              }
            }else{
              this.chartData.dw='元';
              for(var k in  this.chartData.chart){
                this.chartData.chart[k].value=( this.chartData.chart[k].value ).toFixed(2)
              }
            }



          }).catch(err=>{
            console.log(err);
          })
         /* for(var i in this.apartData.Mst){
            if(val==this.apartData.Mst[i].XmMstPhid){//FProjAmount FBudgetAmount RemainAmount UseAmount
              this.chartData.chart=[{name:'可申请',value:FBudgetAmount},{name:'冻结',value:1200},{name:'已使用',value:2301}];
            }
          }*/
        },

        //获取部门
        getDataC:function(){
          let param={orgid:this.orgid,uid:this.userid};
          this.searchData.bmType='';
          this.getAxios('GQT/CorrespondenceSettingsApi/GetDeptByUnit',param).then(res=>{
            this.bmList=res.Record;
            this.searchData.bmType=res.Record[0].PhId;
            this.apartData['bm']=this.bmList[0];
            this.$store.commit('user/setBm',this.bmList[0]);
            this.getAppvalProc();
            this.getAllProByBm();
          }).catch(err=>{
            console.log(err);
          })
        },
        //获取部门对应的项目及项目总额
        getAllProByBm:function(){

          let param={
            Year: this.year,  //年度
            UnitId: this.orgid, //组织代码
            DeptId: this.searchData.bmType //部门代码
          };
          /*alert(param.Year)*/
          this.apartData.Mst=[];
          this.apartData.Amount=0;
          this.bzType='';
          this.chartData.chart=[{name:'可申请',value:0},{name:'冻结',value:0},{name:'已使用',value:0}];
          this.getAxios('GYS/BudgetMstApi/GetBudgetMstList',param).then(res=>{
            this.apartData.Mst=res.Mst;
            if(res.Mst.length>0){
              for(var i in res.Mst){
                this.apartDataMst[res.Mst[i].PhId]=res.Mst[i].FProjName;
              }
              this.apartData.Amount=res.FAmount;
              this.bzType=res.Mst[0].PhId;
              this.getChartList(res.Mst[0].PhId);
            }

          }).catch(err=>{
            console.log(err);
          })
        },
        //获取审批流
        getAppvalProc:function(){
          let param={
            Orgid:this.apartData.bm.PhId,//组织id
            BType:'001' //单据类型（"001":资金拨付单,"002":支付单）
          };
          this.getAxios('GSP/GAppvalProc/GetAppvalProc',param).then(res=>{
            this.approvalDataS.subData=res.Data;
            this.apartData.subData=res.Data;
          }).catch(err=>{
            console.log(err);
          })
        },
        //获取列表数据
        getData:function(){
          /*console.log(new Date(this.searchData.date[0]).getFullYear());
          let startTime=new Date(this.searchData.date[0]).getFullYear()+'-'*/
          if(!this.apartData['bm'].PhId){
            return;
          }
          let param={
            PageIndex:this.pageSearch.pageIndex,
            PageSize:this.pageSearch.pageSize,
            FName:this.searchData.searchValue,
            ApprovalBz:this.searchData.approvalType,
            PayBz:this.searchData.payType,
            StartDate:this.searchData.date[0]||'',
            EndDate:this.searchData.date[1]||'',
            MinAmount:this.money.smoney==0?'':this.money.smoney,
            MaxAmount:this.money.emoney==0?'':this.money.emoney,
            FOrgphid:this.orgid,
            FDepphid:this.apartData['bm'].PhId,
            FYear:this.year
          }
          this.getAxios('GBK/PaymentMstApi/GetPaymentMstList',param).then(res=>{
            this.dataList.total=res.totalRows;
            this.dataList.data=res.Record;
            this.getCheckList(res.Record.length);
            this.$forceUpdate(this.dataList)
          }).catch(err=>{
            console.log(err);
          })
        },
        /*//分页pagesize修改触发事件
        handleSizeChange:function(){
          this.getData();
        },
        //当前页码修改触发事件
        handleCurrentChange:function(){
          this.getData()
        },*/
        //dialog关闭前触发事件
        handleClose:function(){
            //alert('cloase');
            this.applyType=false;
        },
        //查看申请弹窗
        showApply:function(num){
          this.applyType=true;
          this.applyNum=num+'';
        },
        //删除事件
        handleDelete:function(val){
          if(val.flag){
            if(val.type=='applyproType'){
              this.applyproType=false;
            }else if(val.type=='applyBill'){
              this.applyType=false;
            }else{
              this.approvalDataS.openDialog=false;
            }
            this.getData();
          }
        },
        //弹出组织树
        showOrg(){
            this.orgType=true;
        },

        //
        showAuditAdd(val){

          switch (val) {
            case 'add':
              if(this.apartData.Mst.length==0){
                this.$msgBox.error('当前部门无预算支出项目，无法发起资金拨付申请。')
                return;
              }
              this.isAdd=true;
              this.$forceUpdate(this.isAdd);
              this.applyproTitle='新增申请';
              this.applyproType=true;
              break;
            case 'update':
              let upList=this.getCheckedList();
              if(upList.length==0){
                this.$msgBox.show({
                  content: '请选择要修改的数据。'
                })
              }else if(upList.length>1){
                this.$msgBox.show({
                  content: '一次只允许修改一条数据。'
                })
              }else{
                if(upList[0].FApproval!=0&&upList[0].FApproval!=2){
                  this.$msgBox.show({
                    content: '只允许修改待送审及未通过项目。'
                  })
                }else{
                  this.applyNum=upList[0].PhId+'';
                  this.isAdd=false;
                  this.$forceUpdate(this.isAdd);
                  this.applyproTitle='修改申请';
                  this.applyproType=true;
                }
              }

              break;
            case 'delete':
              let delList=this.getCheckedList();
              if(delList.length==0){
                this.$msgBox.show({
                  content: '请选择要删除的数据。'
                })
              }else{
                let phidList=[];
                for(var i in delList){
                  if(delList[i].FApproval!=0&&delList[i].FApproval!=2){
                    this.$msgBox.show({
                      content: '审批中及审批通过的单据不允许删除。'
                    });
                    return;
                  }
                  phidList.push(delList[i].PhId);
                }
                let param={
                  fPhIdList:phidList
                }
                this.postAxios('GBK/PaymentMstApi/PostDelete',param).then(res=>{
                  if(res.Status=='success'){
                    this.$msgBox.show({
                      content: '删除成功。'
                    });
                    this.getData();
                    this.checkList=[];
                  }else{
                    this.$msgBox.show({
                      content: '删除失败，请稍后重试。'
                    })
                  }

                }).catch(err=>{
                  console.log(err);
                })

              }
              break;
            case 'SS':
              //this.applyproTitle='修改申请';
              let ssList=this.getCheckedList();
              if(ssList.length==0){
                this.$msgBox.show({
                  content: '请选择要送审的数据。'
                })
              }else{
                if(this.approvalDataS.subData.length==0){
                  this.$confirm('当前部门未创建审批流，无法送审。是否直接生成支付单','提示',{
                    confirmButtonText:'确定',
                    cancelBtnText: '取消',
                    type:'warning'
                  }).then( () => {
                    this.showAuditAdd('SC')
                  }).catch(() =>{})
                }else{
                  let data=[];
                  for(var i in ssList){
                    if(ssList[i].FApproval!=0&&ssList[i].FApproval!=2){
                      this.$msgBox.show({
                        content: '只允许送审待送审及未通过项目。'
                      })
                      return;
                    }else{
                      data.push(ssList[i].PhId)
                    }
                  }
                  this.approvalDataS.openDialog=true;
                  this.approvalDataS.data=data;

                }
              }
              break;
            case 'SC':
              if(this.approvalDataS.subData.length!=0){
                this.$msgBox.show({
                  content:  '当前部门已创建审批流，请送审后在审批页面进行生成支付单操作。'
                });
                return;
              }
              let data=[],zfList=this.getCheckedList(),mCount=0;
              if(zfList.length==0){
                this.$msgBox.show({
                  content:'请选择要生成支付单的单据（可多选）。'
                })
                return;
              }
              for(var i in zfList){
                if(zfList[i].FApproval!=0){
                  this.$msgBox.show({
                    content:'只允许待送审项目生成支付单。'
                  })
                  return;
                }else{
                  mCount+=Math.floor(zfList[i].FAmountTotal*100);
                  data.push(zfList[i].PhId)
                }
              }
                this.$confirm('合计支付'+(mCount/100)+'元，确定生成支付单？','提示',{
                  confirmButtonText:'确定',
                  cancelBtnText: '取消',
                  type:'warning'
                }).then( () => {
                  this.postBill(data);
                }).catch(() =>{
                  this.approvalDataS.openDialog=false;
                  this.$emit('delete',{flag:true,type:'applyBill'})
                })

              break;
            default:
              break;
          }
        },
        closeAuditFollow(){
          this.visible = false
        },
        openAuditfollow(item,idx){
          if(this.apartData.subData.length==0){
            this.$msgBox.show({
              content: '当前部门未创建审批流。'
            });
            return;
          }
          if(item.FApproval==0){
            this.visible = false;
            this.$confirm('当前项目未送审，无法查看审批流。是否送审？','提示',{
              confirmButtonText:'确定',
              cancelBtnText: '取消',
              type:'warning'
            }).then( () => {
              this.checkList[idx]=true;
              this.showAuditAdd('SS')
            }).catch(() =>{})
          }else{
            /*审批流查看*/
            this.visible = true;
            let data = {
              RefbillPhid:item.PhId,
              FBilltype:'001' //单据类型（"001":资金拨付单,"002":支付单）
            }
            this.getAuditfollow(data)
          }

        },
        //拉去审批流数据查看
        getAuditfollow(data){
          this.getAxios("GSP/GAppvalRecord/GetAppvalRecordList",data).then(res =>{
            console.log(res)
            if (res && res.Status === "success") {
              this.auditMsg = res.Data
            }else {
              this.$msgBox.show(res.Msg)
            }
          }).catch(err =>{
            this.$msgBox.show("数据获取异常")
          })
        },
        /*生成多条支付单  （post  ,  GSP ）
        /GAppvalRecord/PostAddPayMents
        参数：
        RefbillPhidList: ['10'], （单据主键集合）
        * */
        postBill:function(data){

          let param={RefbillPhidList:data};
          this.postAxios('GSP//GAppvalRecord/PostAddPayMents',param).then(res=>{
            if(res.Status=='success'){
              this.$msgBox.show({
                content: '生成支付单成功。',
                fn: () => {
                  this.getData()
                }
              });
            }else{
              this.$msgBox.show({
                content: '生成支付单失败，请稍后重试。'
              })
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        //生成支付单弹框
        creatPayItem(){
          this.appDialog.title = '审批并生成支付单'
          this.appDialog.btnGroup.cancelName = '取消'
          this.appDialog.btnGroup.onfirmName = '生成支付单'
          this.$refs.approvalDialog.changeDialog()
        },
        changeApart:function(val){
         for(var i in this.bmList){
            if(this.searchData.bmType==this.bmList[i].PhId){
              this.apartData.bm=this.bmList[i];
              this.$store.commit('user/setBm',this.bmList[i]);

            }
          }
          this.getAppvalProc();
          //this.getData();
          this.getAllProByBm();
        },

        changePagesize:function(val){
          this.pageSearch.pageSize=val;
          this.pageSearch.pageIndex=1;
          this.getData();
        },
        changePageindex:function(val){
          this.pageSearch.pageIndex=val;
          this.getData();
        },
        moneyChange:function(){
          if(this.money.smoney&&this.money.smoney.toString().lastIndexOf('.')==this.money.smoney.length-1){
            this.money.smoney.length=this.money.smoney.length-1
          }
          if(this.money.emoney&&this.money.emoney.toString().lastIndexOf('.')==this.money.emoney.length-1){
            this.money.emoney.length=this.money.emoney.length-1
          }
          if(this.money.smoney>this.money.emoney){
            this.money.emoney=this.money.smoney;
          }
          this.getData();
        },

      }
    }
</script>

<style scoped>
  .formArea,.pageArea{
    right: 300px;
  }
  .rightPanel{
  width: 270px;
  position: absolute;
  right: 20px;
  top: 8px;
  bottom: 20px;
  box-shadow: 0 0 7px #ccc;
  padding: 10px;
  background-color: #58a5e6;
  overflow: hidden;
  font-size: 0.12rem;
}
  .rightPanel p{
    margin-top: 10px;
    text-shadow: 1px 2px 1px #5302026e;
  }
</style>
<style lang="scss">
  .self{
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
    .topIcon{
      height:60%;
      >img{
        height:100%;
      }
    }
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
    margin: 10px 0 0 0;
  }
  .rightPanel .el-input--small .el-input__inner{
    border: 0;
  }
  .rightPanel .el-card__body{
    padding: 5px;
  }
  .applydialog .el-dialog{
    padding: 0 10px;
    width: 90%;
    margin-top: 10%;
  }
  .applydialog .el-dialog__header{
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  .applydialog .el-dialog__body{
    padding: 10px 20px 30px;
  }
  .el-input__inner{
    vertical-align: middle;
    line-height: 30px;
  }
</style>
