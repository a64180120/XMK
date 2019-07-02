<template>
  <section>
    <div class="dialog-content">
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="24">
          <div class="top-btn">
            <el-button :disabled="PaymentXmDtl.length==0" class="btn" size="mini" @click="save(0)">保存</el-button>
            <el-button :disabled="PaymentXmDtl.length==0" class="btn" size="mini" @click="save(1)" style="padding: 0">保存并送审</el-button>
            <el-button class="btn" size="mini" @click="add">增加项目</el-button>
            <el-button class="btn" size="mini" @click="delPro">删除项目</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
         <el-col :span="24">
           <el-card class="payText">
             <!--<div slot="header" style="padding: 0 10px;text-align: left;background-color: transparent;border: 1px solid #9acefb">
              <span>
                  基本信息
              </span>
             </div>-->
             <div style="margin: 0 14px">
               <div style="border-bottom: 1px solid rgb(154, 206, 251);text-align: left;font-size: .2rem;margin: 14px 0;padding-top: 4px;padding-bottom: 7px;color: #3294e8;"> 基本信息</div>
               <table class="proTab">
                 <colgroup>
                   <col width="5%" />
                   <col width="45%" />
                   <col width="5%" />
                   <col width="45%" />
                 </colgroup>
                 <tr>
                   <td class="right" style="padding-right: 20px">申请单名称:</td>
                   <td class="left" colspan="3" style="border-bottom: 1px solid #9acefb;"><el-input placeholder="30字以内" maxlength="30" show-word-limit v-model="PaymentMst.FName"></el-input></td>
                 </tr>
                 <tr>
                   <td class="right"style="padding-right: 20px">申&nbsp报&nbsp部&nbsp门:</td>
                   <td class="left" style="border-bottom: 1px solid #9acefb">
                     <el-tooltip :content="PaymentMst.FOrgname&&PaymentMst.FDepname?PaymentMst.FOrgname+'-'+PaymentMst.FDepname:''" popper-class="tooltipCla" placement="bottom-start">
                       <p>{{PaymentMst.FOrgname&&PaymentMst.FDepname?PaymentMst.FOrgname+'-'+PaymentMst.FDepname:''}}</p>
                     </el-tooltip>
                   </td>

                   <td class="right" style="border-bottom: 1px solid #fff;min-width: 100px">金&nbsp额&nbsp合&nbsp计:</td>
                   <td class="left" style="border-bottom:1px solid #9acefb;overflow: hidden">
                     <el-tooltip :content="PaymentMst.FAmountTotal | NumFormat" popper-class="tooltipCla" placement="bottom-start">
                       <p>{{PaymentMst.FAmountTotal | NumFormat}}</p>
                     </el-tooltip>
                   </td>
                 </tr>
                 <tr>
                   <td class="right" style="padding-right: 20px">申&nbsp报&nbsp说&nbsp明:</td>
                   <td colspan="3" style="border-bottom: 1px solid #9acefb">
                     <el-tooltip :disabled="PaymentMst.FDescribe.length<60" :content="PaymentMst.FDescribe" popper-class="tooltipCla" placement="bottom-start">
                       <p><el-input placeholder="100字以内"  resize="none" maxlength="100" show-word-limit v-model="PaymentMst.FDescribe"></el-input></p>
                     </el-tooltip>
                     </td>
                 </tr>
               </table>
             </div>
           </el-card>
         </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <el-col :span="24" style="text-align: left">
          <el-card class="payText" v-for="(item,pindex) in PaymentXmDtl">
            <div slot="header" style="padding: 0 10px;text-align: left">
              <span>
                 <el-checkbox v-model="xmCheckList[pindex]"></el-checkbox>
                  <span>申报项目</span>
              </span>
              <span style="float: right">
                <span style="cursor: pointer"  @click="clickFolder(pindex,item)">
                  附单据 <span style="text-decoration: underline">{{item.QtAttachments?item.QtAttachments.length:0}}</span> 张
                  <span class="hxzBac"></span>
                </span>

                <span style="margin-left: 20px;cursor: pointer" @click="delPro(pindex)"><i class="el-icon-close"></i></span>
              </span>

            </div>

            <div>
              <div style="margin: 0 20px;">
                <span>项目名称：</span>
                <span>
                  <el-select size="small" v-model="item.PaymentXm.XmProjcode" @change="changePro(pindex)">
                    <el-option v-for="pro in prodata.Mst"
                               :label="pro.FProjName"
                               :key="pro.FProjCode"
                               :value="pro.FProjCode"
                               :disabled="pro.checked"
                    ></el-option>
                  </el-select>
                </span>
                <span style="float: right">
                  <span>
                  项目编码
                </span>
                <span>{{item.PaymentXm.XmProjcode}}</span>
                </span>

              </div>
              <!--frozen: 0 sum: 660000 surplus: 660000 use: 0-->
              <div style="height: 40px;line-height: 40px;background-color: #d7d7d7;padding:0 10px;margin-top: 10px;">
                <span>预算总额 （{{item.PaymentXm.Sum | NumFormat}}元）- 实际已使用 （{{item.PaymentXm.Use | NumFormat}}元） - 冻结 （{{item.PaymentXm.Frozen | NumFormat}}元） = </span><span style="color: red;">本次可申请 （{{item.PaymentXm.Surplus | NumFormat}}元）</span>
              </div>
            </div>




            <div style="margin-top: 10px">
              <table style="margin:0 0 0 20px;width: auto;">
                <colgroup>
                  <col width="10%">
                  <col width="25%">
                  <col width="25%">
                  <col width="20%">
                  <col width="20%">
                  <col width="20px">
                </colgroup>
                <thead>
                  <td>序号</td>
                  <td>补助单位/部门</td>
                  <td>明细项目名称</td>
                  <td>申请金额（元）</td>
                  <td>备注<span style="font-size: 12px;color: rgb(50, 148, 232);">(最多100字)</span></td>
                  <td class="iconTd"></td>
                </thead>
                <tbody>
                  <tr v-for="(mx,index) in item.PaymentDtls">
                      <td>{{index+1}}</td>
                      <td @click="showOrg(pindex,index)">
                        {{mx.FDepartmentname}}
                      </td>
                      <td @click="showDetailPro(pindex,index)">{{mx.BudgetdtlName }}</td>
                      <td class="right" style="padding: 0 10px;">
                        <span class="num" v-if="!mx.checked" @click="changeInp(pindex,index)">{{mx.FAmount  | NumFormat}}</span>
                        <input :id="pindex+'-'+index" v-if="mx.checked" :autofocus="mx.checked"  style="width:100%;height: 100%;text-align: right;" class="numInput"
                               v-model="mx.FAmount "
                               @keydown="clearZero(pindex,index)"
                               @keyup="clearNum(pindex,index)"
                               @blur="moneyChange(pindex,index)">
                        <!--<el-input-number v-if="mx.checked" size="small" :precision="2" :controls="false" style="width:auto;" class="numInput"  v-model="mx.FAmount " @blur="$set(mx,'checked',false)" @change="moneyChange"></el-input-number>-->
                      </td>
                      <td>
                        <el-tooltip :disabled="mx.FRemarks&&mx.FRemarks.length<15"  :content="mx.FRemarks" popper-class="tooltipCla" placement="bottom-start">
                          <p style="width: 300px;">{{mx.FRemarks}}</p>
                          <p><input v-model="mx.FRemarks " maxlength="100"/></p>
                        </el-tooltip>

                      </td>
                    <td class="iconTd">
                      <i class="el-icon-plus" @click="addDtl(pindex,index)"></i>
                      <i class="el-icon-minus" @click="delDtl(pindex,index)"></i>
                    </td>
                  </tr>
                <tr>
                    <td></td>
                    <td colspan="2">小计</td>
                    <td class="right">{{item.PaymentXm.FAmountTotal | NumFormat}}</td>
                    <td><input v-model="item.PaymentXm.FRemarks "/></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!--删除提示-->
    <el-dialog
      title="提示"
      :visible.sync="msgType"
      width="500px"
      height="100px"
      append-to-body
      id="delDialog"
    >
      <p>确定删除该记录？</p>
      <span slot="footer"   style="text-align: center">
        <button class="cancelBtn"  @click="msgType=false">取消</button>
        <button class="confirmBtn" style="margin-left: 30px" @click="deleteApply">确定</button>
      </span>
    </el-dialog>
    <!--消息提示窗-->
    <el-dialog
      title="提示"
      :visible.sync="delmsgType"
      width="500px"
      height="100px"
      :before-close="handleClose"
      append-to-body>
      <p>{{msg}} &nbsp（{{time}}s）后自动关闭</p>
      <span slot="footer">
        <button class="confirmBtn"  @click="handleClose">确定</button>
      </span>
    </el-dialog>
    <!--组织树弹窗-->
<!--    <el-dialog id="orgdialog" width="350px" title="组织树"
               :visible.sync="orgType" :append-to-body="true">-->
      <orgtree :visible.sync="orgType" :data="orgList" :checked-org="checkedOrgList"  @confirm="confirmOrg"></orgtree>
     <!-- <span slot="footer"   style="text-align: center">
          <button class="cancelBtn"  @click="orgType=false">取消</button>
          <button class="confirmBtn" style="margin-left: 30px" @click="confirmOrg">确定</button>
        </span>
    </el-dialog>-->
    <!--二级项目弹窗-->
    <el-dialog width="600px" id="prodetail" title="请选择项目明细"
               :visible.sync="orgDetailType" :append-to-body="true">
        <el-radio-group v-model="choosedProject">
            <el-radio v-for="item in prodataList" v-if="prodataList.length>0"
                      :label="item"
                      style="width: 100%;margin: 10px;"
            >{{item.FName}}</el-radio>
        </el-radio-group>
      <span slot="footer"  style="text-align: center">
          <button class="cancelBtn"  @click="orgDetailType=false">取消</button>
          <button class="confirmBtn" style="margin-left: 30px" @click="confirmProDetail">保存</button>
        </span>
    </el-dialog>
    <!--送审-->
    <go-approval v-if="approvalDataS.openDialog"  :data="approvalDataS" @delete="handleDelete"></go-approval>
    <!--<approval-dialog ></approval-dialog>
    <approval-bill @dialogFlow="searchFlow"
                   @approvalRowClick="approvalRowClick"
                   @selectApprovaler="selectApprovaler"
                   @isArgeen="backAproval"
                   :approvalFollow="approvalFollow"
                   :nextApprovaler="nextApprovaler"
                   :backPersonnel="backPersonnel"
                   ref="approval"
                   v-model="textare"></approval-bill>-->

    <!--附件上传-->
    <el-dialog :visible.sync="uploadVis" :append-to-body="true" width="auto" title="附件上传">
      <file-up v-if="uploadVis" :ind="choosedIndexAndPro" @succe="loadFile"></file-up>
    </el-dialog>
  </section>

  <!--内层弹框-->
</template>

<script>
  import Orgtree from "../../components/orgtree/index";
  import goApproval from './goApproval.vue';
  import ImgView from "../imgView/imgView";
  import {mapState} from 'vuex'
  import ApprovalDialog from "../../pages/payfundapproval/approvalDialog";
  import fileUp from "./fileUp"
  export default {
    name: "applypro",
    props:{
      applyNum:String,
      isAdd:Boolean,
      prodata:{
        type:Object,
        default:function () {
          return []
        }
      }
    },
    data(){
      return {
        len:0,//输入长度
        uploadVis:false,//文件上传弹窗

        msgType: false,//删除弹窗
        delSOD: true,//是否删除成功
        delmsgType: false,//点击删除后的提示弹窗
        msg: '',//删除提示消息
        time: 3,//倒计时

        orgType:false,//是否显示组织弹窗

        choosedPro:[0,0],
        orgDetailType:false,//项目明细弹窗
        orgList:[],//组织列表
        choosedOrg:[],//选中的组织,及对应数据下标
        prodataList:[],//项目明细列表
        choosedProject:{},//选中的项目明细PhId
        checkedOrgList:[],//已选中的组织

        approvalDataS: {//送审弹窗
          openDialog: false,
          data: [],
          subData:[],
        },
        dialogVisible:false,//附件查看弹窗

        /*项目新增数据*/
        PaymentMst:{
          PhId:0,
          FYear: '',//（年度）
          FName: '',//（申请单名）
          FOrgphid: '',//（组织主键）
          FOrgcode: '',//（组织编码）
          FOrgname: '',//（组织名）
          FDepphid: "",//（部门主键）
          FDepcode: '',//（部门编码）
          FDepname: '',//（部门名称）
          FAmountTotal: 0,//（申请单金额）
          FDate: '',//（申请单时间）2019-05-30
          FApproval: '',//（审批状态：0- 未审批 1-待审批 2- 未通过 9-审批通过）
          IsPay: '',//（支付状态：0- 否 1-待支付 9-支付完成）
          FDescribe: '', //（申报说明）
          FRemarks: '', //（备注）
        },
        PaymentXmDtl:[
          {
            PaymentXm:{
              XmMstPhid: '',//（项目主表主键）
              XmProjcode: '', //（项目编码）
              XmProjname: '', //（项目名称）
              FAmountTotal: 0, //（项目金额）
              Frozen:0,//冻结金额
              Use:0,//已使用金额
              Surplus:0,//剩余金额
              Sum:0,//合计
              FRemarks: '', //（备注）
            },
            PaymentDtls:[
              {
                XmMstPhid: '', //（预算项目主表主键）
                BudgetdtlPhid: '', //（预算明细主键）
                BudgetdtlName: '', //（预算明细名称）
                FDepartmentcode: '', //（补助单位/部门）
                FDepartmentname: '', //（补助单位名称）
                FAmount: 0, //（项目明细申请金额）
                FRemarks: '', //（备注）
                QtKmdm: '', //（预算项目编码）
                QtKmmc: '' , //（预算项目名称）
                FPayment:'', //(支付状态：0-待支付 1-支付异常  9-支付成功)
                FPaymentdate:'' //（支付日期）
              }
            ],
            QtAttachments:[]
          },

        ],
        xmCheckList:[false],
        choosedIndexAndPro:{index:0,pro:{}},
      }
    },
    computed: {
      ...mapState({
        orgid: state => state.user.orgid, //id
        orgcode:state => state.user.orgcode, //编码
        orgname:state => state.user.orgname,//名称
        year:state => state.user.year,//年份
      })
    },
    watch:{
      'PaymentMst.FDescribe':function(val){
        if(val!=null){
          this.len=val.length;
        }

      },
    },
    components:{ApprovalDialog, Orgtree,goApproval,ImgView,fileUp},
    mounted(){
      console.log(this.prodata);
      this.approvalDataS.subData= this.prodata.subData;//审批流
      this.$nextTick(
        this.getOrgList()
      );
      for(var i in this.prodata.Mst){
        this.prodata.Mst[i].checked=false;
      }
      if(!this.isAdd){
        this.getApply();
      }else{
        this.PaymentMst.FYear= this.year;//（年度）
        this.PaymentMst.FName= '';//（申请单名）
        this.PaymentMst.FOrgphid=this.orgid;//（组织主键）
        this.PaymentMst.FOrgcode=this.orgcode;//（组织编码）
        this.PaymentMst.FOrgname=this.orgname;//（组织名）
        this.PaymentMst.FDepphid=this.prodata.bm.PhId;//（部门主键）
        this.PaymentMst.FDepcode=this.prodata.bm.OCode;//（部门编码）
        this.PaymentMst.FDepname=this.prodata.bm.OName;//（部门名称）
        this.PaymentMst.FAmountTotal= '';//（申请单金额）
        this.PaymentMst.FDate= '';//（申请单时间）2019-05-30
        this.PaymentMst.FApproval='0';//（审批状态：0- 未审批 1-待审批 2- 未通过 9-审批通过）
        this.PaymentMst.IsPay= '0';//（支付状态：0- 否 1-待支付 9-支付完成）
        this.PaymentMst.FDescribe= ''; //（申报说明）
        this.PaymentMst.FRemarks= '' //（备注）

        this.PaymentXmDtl=[];
      }
    },
    methods:{
      changeInp:function(pindex,index){
        if(!this.PaymentXmDtl[pindex].PaymentXm.XmMstPhid){
          this.$msgBox.error('请先选择项目');
          return;
        }else{
          this.$set(this.PaymentXmDtl[pindex].PaymentDtls[index],'checked',true);
          this.$forceUpdate(this.PaymentXmDtl[pindex].PaymentDtls[index]);
          this.$nextTick(()=>{
            document.getElementById(pindex+'-'+index).focus();
          })
        }
        //this.PaymentXmDtl[pindex].PaymentDtls[index]['checked']=true;


      },
      clearZero:function(pindex,index){
        let val=this.PaymentXmDtl[pindex].PaymentDtls[index].FAmount;
        if(!val){
          this.PaymentXmDtl[pindex].PaymentDtls[index].FAmount='';
        }
      },
      /*清空为0的input框*/
      clearNum:function(pindex,index){
        let val=this.PaymentXmDtl[pindex].PaymentDtls[index].FAmount+'';
        //obj.value = obj.value.replace(/[\u4e00-\u9fa5]/g,"");  //清除“汉字”和“.”以外的字符
        val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
        val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
        if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          val= parseFloat(val);
        }
        this.PaymentXmDtl[pindex].PaymentDtls[index].FAmount=val;
      },

      //申请单查看
      getApply:function(){
        console.log(this.applyNum+'这里添加数据查询方法');
        let param={fPhId:this.applyNum};

        this.getAxios('GBK/PaymentMstApi/GetPaymentMst',param).then(res=>{
          console.log(this.applyNum+'这里添加数据查询方法');
          console.log(res);
          this.PaymentMst=res.PaymentMst;
          this.PaymentXmDtl=res.PaymentXmDtl;
          this.xmDisable();
        }).catch(err=>{
          console.log(err);
        })
      },

      //获取组织树数据
      getOrgList:function(){
        this.getAxios('GQT/CorrespondenceSettingsApi/GetALLOrgTree').then(res=>{
          console.log(res);
          this.orgList=res.Record;
        }).catch(err=>{
          console.log(err)
        })
      },

      //保存0，保存并送审1，区别：是否调用送审组件
      save:function(type){

        this.PaymentMst.FDate=new Date();
        for(var m in this.PaymentXmDtl){
          for(var p in this.PaymentXmDtl[m].PaymentDtls){
            // QtKmdm: '', //（预算项目编码）QtKmmc: '' , //（预算项目名称） XmProjcode: '', //（项目编码）XmProjname: '', //（项目名称）
            this.PaymentXmDtl[m].PaymentDtls[p].XmMstPhid=this.PaymentXmDtl[m].PaymentXm.XmMstPhid;/*
            this.PaymentXmDtl[i].PaymentDtls[j].QtKmdm=this.PaymentXmDtl[i].PaymentXm.XmProjcode;
            this.PaymentXmDtl[i].PaymentDtls[j].QtKmmc=this.PaymentXmDtl[i].PaymentXm.XmProjname;*/
          }
        }
        for(var i in this.PaymentMst){
          if(i=='FName'&&!this.PaymentMst[i]){
            this.$msgBox.error('请填写申请单名称');
            return;
          }
        }
        for( var j in this.PaymentXmDtl){
          let pdl=this.PaymentXmDtl[j];
          for( var k in pdl.PaymentXm){
            /*XmMstPhid: '',//（项目主表主键）
                XmProjcode: '', //（项目编码）
                XmProjname: '', //（项目名称）*/
            if(k=='XmMstPhid'&&!pdl.PaymentXm[k]){
              this.$msgBox.error('第'+(Number(j)+1)+'条申报项目未选择项目，请检查');
              return;
            }
          }
          for(var l in pdl.PaymentDtls){
            let pdls=pdl.PaymentDtls[l];
            for(var n in pdls){
              /*FDepartmentname BudgetdtlName*/
              if(n=='FDepartmentname'&&!pdls[n]){
                this.$msgBox.error('第'+(Number(j)+1)+'条申报项目,第'+(Number(l)+1)+'条明细未选择部门，请检查');
                return;
              }
              if(n=='BudgetdtlName'&&!pdls[n]){
                this.$msgBox.error('第'+(Number(j)+1)+'条申报项目,第'+(Number(l)+1)+'条明细未选择项目，请检查');
                return;
              }
            }
          }
        };

        if(this.PaymentXmDtl.length==0){
          this.$msgBox.show({
            content: '请至少创建一个项目。'
          });
          return;
        }
        var data = {
          infoData: {
            PaymentMst: this.PaymentMst,
            PaymentXmDtl: this.PaymentXmDtl
          },
        };
        console.log(data);
        var   url='GBK/PaymentMstApi/PostAdd';
        if(!this.isAdd){
          url='GBK/PaymentMstApi/PostUpdate';
        }
        this.postAxios(url,data).then( res => {
          if(res.Status=="success"){
            this.$msgBox.show({
              content: '保存成功。',
              fn: () => {

                if(type==1){
                  if(this.approvalDataS.subData.length==0){
                    this.$msgBox.show({
                      content: '当前部门未创建审批流，无法送审。'
                    })
                    this.$emit('delete',{flag:true,type:'applyproType'})
                  }else{
                    this.approvalDataS.openDialog=true;
                    this.approvalDataS.data=res.KeyCodes;
                  }
                }else{
                  this.$emit('delete',{flag:true,type:'applyproType'})
                }
              }
            })

          }else{
            this.$msgBox.show({
              content: '保存失败，请重试。',
              fn: () => {
                console.log('test fn')
              }
            })
          }
        }).catch( err => {
          console.log(err);
        })
        return;


      },
      //新增项目
      add(){
        let obj={
          PaymentXm:{
            XmMstPhid : '',//（项目主表主键）
            XmProjcode : '', //（项目编码）
            XmProjname : '', //（项目名称）
            FAmountTotal : '', //（项目金额）
            Frozen:0,//冻结金额
            Use:0,//已使用金额
            Surplus:0,//剩余金额
            Sum:0,//合计
            FRemarks : '', //（备注）
          },
          PaymentDtls:[
            {
              XmMstPhid: '', //（预算项目主表主键）
              BudgetdtlPhid: '', //（预算明细主键）
              BudgetdtlName: '', //（预算明细名称）
              FDepartmentcode: '', //（补助单位/部门）
              FDepartmentname: '', //（补助单位名称）
              FAmount: 0, //（项目明细申请金额）
              FRemarks: '', //（备注）
              QtKmdm: '', //（预算项目编码）
              QtKmmc: '' , //（预算项目名称）
              FPayment:'', //(支付状态：0-待支付 1-支付异常  9-支付成功)
              FPaymentdate:'' //（支付日期）
            }
          ],
          QtAttachments:[]
        }
        this.PaymentXmDtl.push(obj);
        this.xmCheckList.push(false);
      },
      /*删除项目*/
      delPro(index){
        let ds=index;
        if(typeof ds=="number"){
          this.PaymentXmDtl.splice(ds,1);
          this.xmDisable()
        }else{
          let delList=[];
          for(var i in this.xmCheckList){
            if(this.xmCheckList[i]){
              delList.push(i)
            }
          }
          if(delList.length==0){
            this.$msgBox.show({
              content: '请选择要删除的项目。'
            })
          }else{
            for(var i=delList.length-1;i>=0;i--){
              this.PaymentXmDtl.splice(delList[i],1);
            }
            for(var i in this.xmCheckList){
              this.xmCheckList[i]=false;
            }
            this.xmCheckList.splice(this.xmCheckList.length-delList.length,this.xmCheckList.length-delList.length);
            this.$msgBox.show({
              content: '删除成功。',
              fn:() => {
                this.xmDisable()
              }
            })
          }

        }
      },
      //新增项目明细
      addDtl:function(pindex,index){
        let dtl={
          XmMstPhid: '', //（预算项目主表主键）
          BudgetdtlPhid: '', //（预算明细主键）
          BudgetdtlName: '', //（预算明细名称）
          FDepartmentcode: '', //（补助单位/部门）
          FDepartmentname: '', //（补助单位名称）
          FAmount: '', //（项目明细申请金额）
          FRemarks: '', //（备注）
          QtKmdm: '', //（预算项目编码）
          QtKmmc: '' , //（预算项目名称）
          FPayment:'', //(支付状态：0-待支付 1-支付异常  9-支付成功)
          FPaymentdate:'' //（支付日期）
        };
        this.PaymentXmDtl[pindex].PaymentDtls.splice(index+1,0,dtl)
      },
      //删除项目明细
      delDtl:function(pindex,index){
        this.PaymentXmDtl[pindex].PaymentDtls.splice(index,1)
        if(this.PaymentXmDtl[pindex].PaymentDtls.length==0){
          this.addDtl(pindex,0)
        }
      },
      /*金额计算*/
      moneyChange:function(pindex,index){
        let countAll=0;
        for(var i in this.PaymentXmDtl){
          let px=this.PaymentXmDtl[i];
          let count=0;
          for(var j in px.PaymentDtls){
            let pd=px.PaymentDtls[j];
            count=(Number((count*100).toFixed(0))+Number((pd.FAmount*100).toFixed(0)))/100;
            console.log(count)
          }
          px.PaymentXm.FAmountTotal=count;
          if(pindex==i&&count>px.PaymentXm.Surplus){
            let dis=(Number((count*100).toFixed(0))-Number((px.PaymentXm.Surplus*100).toFixed(0)))/100;//超出的可申请资金
            count=px.PaymentXm.Surplus;
            px.PaymentXm.FAmountTotal=count;

            px.PaymentDtls[index].FAmount=(Number((px.PaymentDtls[index].FAmount*100).toFixed(0))-Number((dis*100).toFixed(0)))/100;
            this.$msgBox.show({
              content: '您输入的金额已超出可使用金额，已自动为您修改为剩余最大可申请金额。',
              fn:() => {
                this.xmDisable()
              }
            })
          }
          countAll+=count;
        }
        this.PaymentMst.FAmountTotal=countAll;
        this.PaymentXmDtl[pindex].PaymentDtls[index].checked=false;
      },
      //送审
      postApply:function(){
        console.log(this.applyNum+'这里添加数据查询方法');
      },
      //删除
      deleteApply:function(){
        this.msgType=false;
        this.delmsgType=true;
        this.delSOD=true;
        if(this.delSOD){
          this.msg='删除成功！'
        }else{
          this.msg='删除失败，请稍后重试！'
        }
        this.timer()
      },
      //打印
      printApply:function(){
        console.log(this.applyNum+'这里添加数据查询方法');
      },
      //删除后提示弹窗关闭操作
      handleClose:function(){
        this.delmsgType=false;
        if(this.delSOD){
          this.$emit('delete',{flag:true,type:'applyproType'})
        };
      },
      //提示窗口倒计时
      timer:function(){
        setTimeout(()=>{
          if(this.time>1){
            this.time--;
            this.timer()
          }else{
            this.time=3;
            this.handleClose();
          }
          //this.$forceUpdate();
        },1000)
      },
      //弹出组织树f表示项目下标，s表示项目对应的pdList下标
      showOrg(f,s){
        this.choosedPro=[f,s];
        this.orgType=true;
      },
      //组织树点击选择事件
      getOrg:function(data){
        console.log(data);//这边可以得到选中的组织，当点击确定时，进行选中组织赋值，建议添加中间变量，用于保存点击组织树获取的值
        this.choosedOrg=data;
      },
      //点击组织树确定按钮进行选中组织赋值
      confirmOrg:function(val){
        //OCode: "100001" OName: "广东省总工会(大账)" FDepartmentcode: '101.09', //（补助单位/部门）   FDepartmentname: '法工部', //（补助单位名称）
        this.PaymentXmDtl[this.choosedPro[0]].PaymentDtls[this.choosedPro[1]].FDepartmentcode=val[0].OCode;
        this.PaymentXmDtl[this.choosedPro[0]].PaymentDtls[this.choosedPro[1]].FDepartmentname=val[0].OName;
        if(val.length>1){
          for(var i=0; i<val.length-1;i++){
            let sc={
              XmMstPhid: '', //（预算项目主表主键）
              BudgetdtlPhid: '', //（预算明细主键）
              BudgetdtlName: '', //（预算明细名称）
              FDepartmentcode: '', //（补助单位/部门）
              FDepartmentname: '', //（补助单位名称）
              FAmount: '', //（项目明细申请金额）
              FRemarks: '', //（备注）
              QtKmdm: '', //（预算项目编码）
              QtKmmc: '' , //（预算项目名称）
              FPayment:'', //(支付状态：0-待支付 1-支付异常  9-支付成功)
              FPaymentdate:'' //（支付日期）
            }
            sc.FDepartmentcode=val[i+1].OCode;
            sc.FDepartmentname=val[i+1].OName;
            this.PaymentXmDtl[this.choosedPro[0]].PaymentDtls.splice(this.choosedPro[1]+1,0,sc);
            sc=null;
          }
        }
      },
      confirmProDetail:function(){
        this.orgDetailType=false;
        this.PaymentXmDtl[this.choosedPro[0]].PaymentDtls[this.choosedPro[1]].BudgetdtlPhid=this.choosedProject.PhId;
        this.PaymentXmDtl[this.choosedPro[0]].PaymentDtls[this.choosedPro[1]].BudgetdtlName=this.choosedProject.FName;
        this.PaymentXmDtl[this.choosedPro[0]].PaymentDtls[this.choosedPro[1]].QtKmdm=this.choosedProject.FBudgetAccounts;
        this.PaymentXmDtl[this.choosedPro[0]].PaymentDtls[this.choosedPro[1]].QtKmmc=this.choosedProject.FBudgetAccounts_EXName;
        this.choosedProject={};
       // this.PaymentXmDtl[this.choosedPro[0]].PaymentDtls[this.choosedPro[1]].pdName=this.prodataList[this.choosedProject];
      },
      //弹出明细项目，f表示项目下标，s,表示项目对应pdlist下标
      showDetailPro(f,s){
        if(!this.PaymentXmDtl[f].PaymentXm.XmMstPhid){
          this.$msgBox.error('请先选择项目');
          return;
        }
        this.orgDetailType=true;

        this.getProDetail(f);

        this.choosedPro=[f,s];
      },
      //查看附件
      clickFolder(index,item){
        //this.$emit('showImg',file)
        this.choosedIndexAndPro={
          index:index,
          pro:item
        }
        this.uploadVis=true;
      },
      //选择主项目
      changePro:function(index){
        let proCode=this.PaymentXmDtl[index].PaymentXm.XmProjcode;
        for(var i in this.prodata.Mst){
          if(proCode==this.prodata.Mst[i].FProjCode){
            this.PaymentXmDtl[index].PaymentXm.XmMstPhid=this.prodata.Mst[i].PhId;
            this.PaymentXmDtl[index].PaymentXm.XmProjname=this.prodata.Mst[i].FProjName;
            //this.PaymentXmDtl[index].PaymentXm.FAmountTotal=this.prodata.Mst[i].FProjAmount;
            this.PaymentXmDtl[index].PaymentXm.FRemarks='';
            this.getProMoney(index,this.prodata.Mst[i].PhId);
          }
        }
        this.PaymentXmDtl[index].PaymentDtls=[{
          XmMstPhid: '', //（预算项目主表主键）
          BudgetdtlPhid: '', //（预算明细主键）
          BudgetdtlName: '', //（预算明细名称）
          FDepartmentcode: '', //（补助单位/部门）
          FDepartmentname: '', //（补助单位名称）
          FAmount: 0, //（项目明细申请金额）
          FRemarks: '', //（备注）
          QtKmdm: '', //（预算项目编码）
          QtKmmc: '' , //（预算项目名称）
          FPayment:'', //(支付状态：0-待支付 1-支付异常  9-支付成功)
          FPaymentdate:'' //（支付日期）
        }]
        this.moneyChange(index,0)
        this.xmDisable();
      },
      //禁用项目选择
      xmDisable:function(){
        for(var i in this.prodata.Mst){
          this.prodata.Mst[i].checked=false;
          for(var j in this.PaymentXmDtl){
            if( this.PaymentXmDtl[j].PaymentXm.XmMstPhid==this.prodata.Mst[i].PhId){
              this.prodata.Mst[i].checked=true;
            }
          }
        }
      },
      //获取项目总额，已冻结，剩余金额
      getProMoney:function(index,phid){
        let param={xmPhid:phid,phid:this.PaymentMst.PhId};
        this.getAxios('GBK/PaymentMstApi/GetAmountOfMoney',param).then(res=>{
          this.PaymentXmDtl[index].PaymentXm['Frozen']=res.Frozen;
          this.PaymentXmDtl[index].PaymentXm['Use']=res.Use;
          this.PaymentXmDtl[index].PaymentXm['Surplus']=res.Surplus;
          this.PaymentXmDtl[index].PaymentXm['Sum']=res.Sum;
          /*Frozen:0,//冻结金额
            Use:0,//已使用金额
            Surplus:0,//剩余金额
            Sum:0,//合计*/
          this.$forceUpdate(this.PaymentXmDtl)
        }).catch(err=>{
          console.log(err);
        })
      },
      //获取明细项目列表
      getProDetail:function(f){
        let param={
          id:this.PaymentXmDtl[f].PaymentXm.XmMstPhid
        };
        this.getAxios('GYS/BudgetMstApi/GetBudgetMstDtlList',param).then(res=>{
          this.prodataList=res.Dtl;
        }).catch(err=>{
          console.log(err);
        })
      },
      //关闭送审弹窗
      handleDelete:function(val){
        if(val.flag){
          this.approvalDataS.openDialog=false;
          this.$emit('delete',{flag:true,type:'applyproType'})
        }
      },
      //获取返回的上传文件列表
      loadFile(val){
        //this.PaymentXmDtl[this.choosedIndexAndPro.index].QtAttachments=val;
        this.PaymentXmDtl[this.choosedIndexAndPro.index].QtAttachments=val;
        this.$forceUpdate( this.PaymentXmDtl );
        this.uploadVis=false;
      }
    }
  }
</script>

<style scoped lang="scss">
  thead td{
    text-align: center;
  }
  .iconTd{
    border: none;
    position: relative;
    min-width: 20px;
    padding: 0 2px;
  }
  .iconTd i{
    width: 15px;
    height: 15px;
    border-radius: 15px;
    color: #fff;
    font-size: 10px;
    line-height: 15px;
    margin: auto;
    text-align: center;
    display: none;
    cursor: pointer;
  }
  .iconTd .el-icon-minus{
    background-color: red;
  }
  .iconTd .el-icon-plus{
    background-color: #67971a;
    margin-top: 3px;
  }
  tr:hover i{
    display: block;
  }
  .dialog-title {
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .right .num{
    display: inline-block;
    width:100%;
  }
  .content {
    padding: 20px 0 0 0;
  }

  .left-card {
    background-color: $btnColor;
    height: 200px;
    max-width: 100%;
    border-radius: 8px;
    position: relative;
    padding: 7%;


    > p {
      font-size: 0.2rem;
      font-family: 宋体;
      color: #fff;
      text-align: left;
    }

    > div:nth-of-type(2) {
      background-color: #ffffff;
      position: absolute;
      width: 86%;
      height: 350px;
      border-radius: 8px;
      box-shadow: 0px 2px 10px #888888;
      margin-top: 20px;
      margin-right: -15px;
      overflow-y: auto;
      overflow-x: hidden;

      > .apply-info {
        padding: 8px;
        text-align: left;
        >ul {
          font-size: .15rem;
          font-weight: 600;
          >li{
            padding: 10px;
            display: flex;
            >span{
              display: inline-block;
              width: 35%;
              min-width: 80px;
            }
            >span:nth-of-type(2){
              white-space: nowrap;
              overflow-x: hidden;
              text-overflow: ellipsis;
              width: 65%;
              padding-bottom: 5px;
              border-bottom: 1px solid #ccc;
            }

          }
        }
      }
    }
  }

  .detail-table {
    height: 450px;
    overflow: auto;
    width: 100%;

    > .title {
      > span {
        font-size: 0.2rem;
      }
    }

    > .top {
      > ul {
        list-style: none;
        float: left;
        width: 100%;

        > li {
          width: 33%;
          display: inline-block;
        }

        > li:first-child {
          text-align: left;
        }

        > li:last-child {
          text-align: right;
        }
      }
    }

    > .content {
      > .top-tbody {
        > table {
          border: 1px solid #eaeaea;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 30px;
              }
            }
          }
        }
      }
      > .top-total{
        > table {
          border: 1px solid #eaeaea;
          border-top: none;
          border-bottom: none;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 100px;
                border-top: none;
                /*border-bottom: none;*/
              }
            }
          }
        }
      }
      > .title{
        > table {
          border: 1px solid #eaeaea;
          border-top: none;
          border-bottom: none;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 30px;
                border-top: none;
                /*border-bottom: none;*/
              }
            }
          }
        }
      }
      > .bottom-thead{
        > table {
          border: 1px solid #eaeaea;
          border-top: none;
          border-bottom: none;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 30px;
                border-top: none;
                /*border-bottom: none;*/
              }
            }
          }
        }
      }
      > .bottom-tbody{
        > table {
          border: 1px solid #eaeaea;
          border-top: none;
          border-bottom: none;
          width: 100%;
          > tbody {
            > tr {
              > td {
                border: 1px solid #eaeaea;
                height: 30px;
                border-top: none;
                /*border-bottom: none;*/
              }
            }
          }
        }
      }
    }
  }
  .top-btn{
    text-align: right;
  }
table{
  width: 100%;
}
  table td{
    border: 1px solid #cbcbcb;
    height: 35px;
    padding: 0 10px;
  }
  .payText{
    margin-bottom: 10px;
  }
  table td input{
    border: none;
    width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .proTab td{
    border: none;
    height: 40px;
    line-height: 40px;
    min-width: 125px;
  }
</style>
<style>
  .proTab .el-textarea__inner,.proTab .el-input__inner{
    border: none;
    padding: 0;
    height: 40px;
  }
  #delDialog .el-dialog__footer{
    text-align: center;
  }
  .el-upload-list__item{
    text-align: left;
  }
  .payText .el-card__header{
    background-color: #3294e8;
    color: #fff;
    text-align: center;
    padding: 10px 0;
  }
  .payText .el-card__body{
    padding: 10px;
  }
  .payText textarea{
    min-height: 33px;
    margin-top: 0px;
    margin-bottom: 0px;
    height: 160px;
    resize: none;
    border: none;
  }
  .numInput.is-without-controls .el-input__inner{
    border: none;
    text-align: right;
  }
#prodetail .el-dialog__body{
  text-align: left;
}
  .proTab .el-input__inner{
    padding-right: 60px;
  }
  .proTab .el-input__suffix{
    right: 0;
  }
</style>
