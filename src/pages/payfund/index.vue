<template>
  <div class="self">
    <div style="position: relative">
      <tophandle title="资金拨付在线工作平台">
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


      <div class="formArea">
        <div class="btnArea">
          <i class="el-icon-d-arrow-left iicon" style="position:absolute;left:0;" @click.stop="$stateScroll(false)"></i>
          <i class="el-icon-d-arrow-right iicon" style="position:absolute;right:275px;" @click.stop="$stateScroll(true)"></i>
          <div class="scrollNav">
            <div>
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
              <label>
                <span>申请日期</span>
                <el-date-picker
                  size="small"
                  v-model="searchData.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </label>

              <label>
                <span>申请金额</span>
                <el-input-number size="small" :precision="2" :controls="false" v-model="searchData.money.smoney" style="width:auto"></el-input-number>
                <span>至</span>
                <el-input-number size="small" :precision="2" :controls="false" v-model="searchData.money.emoney"style="width: auto"></el-input-number>
              </label>
            </div>


          </div>
          <label class="searchArea" style="float: right">
            <el-input size="small" placeholder="请输入内容" style="border-radius: 5px;width: 250px;overflow: hidden" v-model="searchData.searchValue">
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
          </div>-->

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
                <td title="序号">
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
            <tbody>
            <tr v-for="(item,index) in dataList.data" v-if="(searchData.approvalType==0&&searchData.payType==0)||(searchData.approvalType==0&&searchData.payType==item.billZfType)||(searchData.payType==0&&searchData.approvalType==item.billSpType)||(searchData.payType==item.billZfType&&searchData.approvalType==item.billSpType)">
              <td>
                <el-checkbox v-model="checkList[index]">{{index+1}}</el-checkbox>
              </td>
              <td @click="showApply(item.billNum)">
                {{item.billNum}}
              </td>
              <td>
                {{item.billName}}
              </td>
              <td class="right">
                {{item.billMoney | NumFormat}}
              </td>
              <td>
                {{item.billDate}}
              </td>
              <td class="atype" @click="openAuditfollow">
                {{spTypeList[item.billSpType]}}
              </td>
              <td>
                {{payTypeList[item.billZfType]}}
              </td>
              <td>
                {{item.billNote}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="rightPanel">
        <div style="">
          <!--部门选择-->
          <el-select size="small" style="width: 250px;" v-model="searchData.bmType" @change="changeApart">
            <el-option v-for="item in bmList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!--预算显示区域-->
          <el-card>
            <div>
              <p style="color: #3294e8;">{{apartData.count}}</p>
              <div>预算支出项目总数</div>
            </div>
            <div>
              <p style="color:#f52c1d">
                <num :vv="apartData.money"></num>
                <!--{{apartData.money}}--></p>
              <div>支出预算总额</div>
            </div>
          </el-card>
          <el-card>
            <div style="border-bottom: 1px solid #ccc">
              <span>对下补助项目名称：</span>
              <!--部门选择-->
              <el-select size="small" style="width: 100px" v-model="searchData.bzType" @change="getChartList">
                <el-option v-for="item in bzList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <!--echartArea-->
              <pie-chart :chart="chartData.chart" :title="chartData.title"></pie-chart>
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

    <el-dialog class="applydialog" title="查看申请"
    :visible.sync="applyType"
    :before-close="handleClose">
      <applybill :applyNum="applyNum"
        @delete="handleDelete"
      ></applybill>
    </el-dialog>
    <!--组织树弹窗-->
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
    <!--项目新增修改-->
    <el-dialog class="applydialog" :title="applyproTitle"
               :visible.sync="applyproType"
               >
       <applypro :applyNum="applyNum"  @delete="handleDelete"></applypro>
    </el-dialog>

    <go-approval  :data="approvalDataS"></go-approval>
    <!--生成支付单-->
    <approval-dialog ref="approvalDialog" :title="appDialog.title" :btn-group="appDialog.btnGroup" :data="approvalData" ></approval-dialog>
    <!--查看审批流程-->
    <auditfollow :visible="visible" @update:visible="closeAuditFollow()"></auditfollow>
  </div>
</template>

<script>
  import tophandle from '../../components/topNav/topHandle'
  import pieChart from '../../components/echart/pieChart'
  import num from '../../components/numAct/index'
  import Applybill from "../../components/applyBill/applybill";
  import Orgtree from "../../components/orgtree/index";
  import Applypro from "../../components/applyPro/applyPro";
  import goApproval from '../paycenter/goApproval.vue';
  import Auditfollow from "../../components/auditFollow/auditfollow";
  import ApprovalDialog from "../payfundapproval/approvalDialog";
    export default {
        name: "index",
      data(){
          return{
            checked:false,//多选选择框
            checkList:[],//选择框列表
            dataList:{
              total:7,
              data:[
                {
                  billDate: "2019-5-27",
                  billMoney: 90434.53,
                  billName: "专家授课课酬支付申请",
                  billNote: "",
                  billNum: "1558946679753TRIN",
                  billSpType: 3,
                  billZfType: 0
                },
                {
                  billDate: "2019-5-22",
                  billMoney: 7647.67,
                  billName: "专家授课课酬支付申请",
                  billNote: "",
                  billNum: "1558946890819E",
                  billSpType: 1,
                  billZfType: 0
                },
                {
                  billDate: "2019-5-21",
                  billMoney: 3000,
                  billName: "办公设备打印机购买",
                  billNote: "",
                  billNum: "1558946890819QX",
                  billSpType: 2,
                  billZfType: 0
                },
                {
                  billDate: "2019-5-21",
                  billMoney: 3000,
                  billName: "办公设备打印机购买",
                  billNote: "",
                  billNum: "1558946890819QX",
                  billSpType: 4,
                  billZfType: 1
                },
                {
                  billDate: "2019-5-21",
                  billMoney: 3000,
                  billName: "部门聚餐申请",
                  billNote: "",
                  billNum: "1558946890819QX",
                  billSpType: 4,
                  billZfType: 1
                },
                {
                  billDate: "2019-5-27",
                  billMoney: 90434.53,
                  billName: "专家授课课酬支付申请",
                  billNote: "",
                  billNum: "1558946679753TR",
                  billSpType: 4,
                  billZfType: 2
                },
                {
                  billDate: "2019-5-22",
                  billMoney: 7647.67,
                  billName: "专家授课课酬支付申请",
                  billNote: "",
                  billNum: "1558946890819WE",
                  billSpType: 4,
                  billZfType: 3
                },
              ],
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
            approvalList:[{value:0,label:'全部'},{value:1,label:'待送审'},{value:2,label:'审批中'},{value:3,label:'审批未通过'},{value:4,label:'审批通过'}],
            payList:[{value:0,label:'全部'},{value:1,label:'待支付'},{value:2,label:'支付异常'},{value:3,label:'支付成功'}],
            bmList:[{value:0,label:'办公室'},{value:1,label:'女工部'},{value:2,label:'财务与资产部'}],
            bzList:[{value:0,label:'全部'},{value:1,label:'XXX项目1'},{value:2,label:'XXX项目2'}],
            spTypeList:{'1':'待送审','2':'审批中','3':'未通过','4':'审批通过'},
            payTypeList:{'0':'—','1':'待支付','2':'支付异常','3':'支付成功'},
            visiable:false,//高级搜索框显示隐藏
            chartData:{
              chart:[{name:'可申请',value:13210},{name:'冻结',value:1200},{name:'已使用',value:2301}],
              title:['可申请','冻结','已使用'],
            },//图表数据
            applyType:false,//是否显示查看申请弹窗
            applyNum:'',//当前查看申请单的编号
            orgType:false,//是否显示组织弹窗
            choosedOrg:{},//选中的组织
            applyproType:false,//显示项目新增修改弹窗
            applyproTitle:'',
            approvalDataS: {
              openDialog: false,
              data: {}
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
            apartData:{count:28,money:'1,230,989.32'}
          }
      },
      components:{Applypro, Orgtree, Applybill, tophandle,pieChart,goApproval,Auditfollow,ApprovalDialog,num},
      mounted(){
          //this.getData();
          //this.dataFuc();
        this.getCheckList(this.dataList.total);
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
      },
      methods:{
        //滚动
        unionStateScroll(bool){

          var union=document.getElementsByClassName('scrollNav')[0];
          var unionStateCon=document.getElementsByClassName('scrollNav')[0].firstElementChild;
          let eleChildren=unionStateCon.childNodes;
          let unionStateConWidth=0;
          let scrollWidth=200;
          for(var i in eleChildren ){

            if(eleChildren[i].nodeType==1){
              console.log(eleChildren[i].clientWidth);
              unionStateConWidth+=eleChildren[i].clientWidth+15;
            }

          }
          unionStateCon.style.width=unionStateConWidth+'px';
          console.log(unionStateConWidth);

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
          console.log(val);
          switch(val){
            case 0:
              this.chartData.chart=[{name:'可申请',value:13210},{name:'冻结',value:1200},{name:'已使用',value:2301}];
              break;
            case 1:
              this.chartData.chart=[{name:'可申请',value:6210},{name:'冻结',value:4100},{name:'已使用',value:2101}];
              break;
            case 2:
              this.chartData.chart=[{name:'可申请',value:7000},{name:'冻结',value:5200},{name:'已使用',value:5001}];
              break;
            default:
              this.$msgBox.show({
                content: '数据获取错误'
              })
          }
        },


        getDataC:function(){
          let param={uid:'488181024000001'};
          this.$axios.get('GQT/CorrespondenceSettings2Api/GetSBUnit',{params:param}).then(res=>{
            console.log(res);
          }).catch(err=>{
            console.log(err);
          })

        },
        getData:function(){
          let param={
            PageIndex:this.searchData.pageSearch.pageIndex,
            PageSize:this.searchData.pageSearch.pageSize,
            FName:this.searchData.searchValue,
            FApprovalBz:this.searchData.approvalType,
            PayBz:this.searchData.payType,
            StartDate:this.searchData.date,
            EndDate:this.searchData.date,
            MaxAmount:this.searchData.money.smoney==0?'':this.searchData.money.smoney,
            MinAmount:this.searchData.money.emoney==0?'':this.searchData.money.emoney,
            FOrgphid: 521180820000002,
            FDepphid:288180827000002,
            FYear:2019
          }
          this.getAxios('GBK/PaymentMstApi/GetPaymentMstList',param).then(res=>{
            console.log(res);
          }).catch(err=>{
            console.log(err);
          })

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
        //
        showAuditAdd(val){  //流程编辑

          switch (val) {
            case 'add':
              this.applyproTitle='新增申请';
              this.applyproType=true;
              break;
            case 'update':
              this.applyproTitle='修改申请';
              this.applyproType=true;
              break;
            case 'delete':
              let delList=this.getCheckedList();
              console.log(delList);
              if(delList.length==0){
                this.$msgBox.show({
                  content: '请选择要删除的数据。',
                  fn: () => {
                    console.log('test fn')
                  }
                })
              }else{
                this.$msgBox.show({
                  content: '删除成功。',
                  fn: () => {
                    console.log('test fn')
                  }
                })
              }
              break;
            case 'SS':
              //this.applyproTitle='修改申请';
              this.approvalDataS.openDialog=true
              break;
            case 'SC':
              this.appDialog.title = '审批并生成支付单'
              this.appDialog.btnGroup.cancelName = '取消'
              this.appDialog.btnGroup.onfirmName = '生成支付单'
              this.$refs.approvalDialog.changeDialog()
              break;
            default:
              break;
          }
        },
        closeAuditFollow(){
          this.visible = false
        },
        openAuditfollow(){
          this.visible = true
        },
        //生成支付单弹框
        creatPayItem(){
          this.appDialog.title = '审批并生成支付单'
          this.appDialog.btnGroup.cancelName = '取消'
          this.appDialog.btnGroup.onfirmName = '生成支付单'
          this.$refs.approvalDialog.changeDialog()
        },
        changeApart:function(val){
          // bmList:[{value:0,label:'办公室'},{value:1,label:'女工部'},{value:2,label:'财务与资产部'}],
          switch(val){
            case 0:
              this.apartData={count:28,money:'1,230,989.32'};
              break;
            case 1:
              this.apartData={count:8,money:'2,459.32'};
              break;
            case 2:
              this.apartData={count:18,money:'120,000.13'};
              break;
            default:
              break;
          }
        }
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
  overflow-y: auto;
  font-size: 0.12rem;
}
  .rightPanel p{
    font-size: .4rem;
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
    height: 600px;
    margin:auto;
  }
  .applydialog .el-dialog__header{
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  .applydialog .el-dialog__body{
    padding: 10px 20px 30px;
  }
</style>
