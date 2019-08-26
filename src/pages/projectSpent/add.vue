<!-- 新增 -->
<template>
    <div>
      <div class="nav">
        <el-button class="btn" @click="saveBill">保存</el-button>
        <el-button class="btn">保存并送审</el-button>
      </div>
      <div>
        <!-- 单据信息 -->
        <div>
          <div style="text-align: left;padding-left: 25px">
            <span style="letter-spacing: 9px">单据名称</span>
            <el-input style="display: inline-block;width: 635px;" size="mini" v-model="formDate.FProjname"></el-input>
            <!--<el-upload
              class="avatar-uploader"
              action="https://www.dmeo.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
          </div>
          <div class="msgPanel">
            <div class="typeTitle">部门信息</div>
            <ul>
              <li>
                <span>申报部门</span>
                <el-input :disabled="true" size="mini" :value="ysbm.deptName"></el-input>
              </li>
              <li>
                <span>预算部门</span>
                <el-input size="mini" :disabled="true" :value="bm.OName"></el-input>
                <!--<el-select size="small"
                           style="display: inline-block;width: 200px;"
                           v-model="pListIndex">
                  <el-option v-for="(item,index) in pList"
                             :key="index"
                             :label="item.FProjName"
                             :value="index"></el-option>
                </el-select>-->
              </li>
              <!--<li>
                <span>申报单位</span>
                <el-input size="mini" :disabled="true" :value="ysbm.FDeclarationDept"></el-input>
              </li>-->
              <li>
                <span>申报日期</span>
                <el-date-picker size="mini" v-model="formDate.FDateofdeclaration" ></el-date-picker>
              </li>
            </ul>
          </div>

          <div  class="msgPanel">
            <div  class="typeTitle">项目信息</div>
            <ul>
              <li>
                <span>项目名称</span>
                <el-select size="small"
                           style="display: inline-block;width: 200px;"
                           v-model="pListIndex">
                  <el-option v-for="(item,index) in pList"
                             :key="index"
                             :label="item.FProjName"
                             :value="index"></el-option>
                </el-select>
              </li>
              <li>
                <span>项目类型</span>
                <el-input size="mini" v-model="formDate.FExpenseCategory_EXName"></el-input>
              </li>
            </ul>
          </div>

          <div class="msgPanel">
            <div  class="typeTitle">申报信息</div>
            <ul>
              <li>
                <span style="letter-spacing:0">服务意向单位</span>
                <el-input size="mini" v-model="formDate.FServiceDept"></el-input>
              </li>
              <li>
                <span>经费标准</span>
                <el-input size="mini" v-model="formDate.FFundStandard"></el-input>
              </li>
              <li style="width: 66%;">
                <span>申报备注</span>
                <el-input style="width: 635px;" size="mini" v-model="formDate.remark"></el-input>
              </li>
              <li style="width: 100%">
                <div>核定预算数：{{budgetMoney.FProjAmount | NumFormat}}
                  -已使用数：{{budgetMoney.UsedSum | NumFormat}}
                  -冻结数：{{budgetMoney.FrozenSum | NumFormat}}
                  =<span style="color: red;letter-spacing: 0">剩余可编报数：{{budgetMoney.FPlayamount | NumFormat}}</span>
                </div>
              </li>
            </ul>

          </div>

        </div>

        <div class="msgPanel">
          <div  class="typeTitle">项目支出预算明细</div>
          <!-- 预算明细表格 -->
          <table>
            <colgroup>
              <col width="10%"/>
              <col width="15%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="15%"/>
              <col width="20%"/>
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2">序号</th>
                <th rowspan="2">明细费用名称</th>
                <th colspan="4">关联项目明细</th>
                <th rowspan="2">预计支出金额</th>
                <th rowspan="2">备注</th>
                <th class="aod"></th>
              </tr>
              <tr>
                <th>明细项目名称</th>
                <th>资金来源</th>
                <th>预算科目</th>
                <th>支出渠道</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in dataList" v-if="item.PersistentState!=3">
              <td>{{index+1}}</td>
              <td><input v-model="item.FName"/></td>
              <td @click="openDtl(index)">{{item.FDtlName}}</td>
              <td @click="openDtl(index)">
                {{item.FSourceOfFunds_EXName}}
              </td>
              <td @click="openDtl(index)">
                {{item.FBudgetAccounts_EXName}}
              </td>
              <td @click="openDtl(index)">
                {{item.FExpensesChannel_EXName}}
              </td>
              <td style="text-align: right" id="numInput">
                <span>{{item.FAmount | NumFormat}}</span>
                <input style="text-align: right" v-model="item.FAmount" @blur="moneyCharge(index)">
              </td>

              <td></td>
              <td class="aod">
                <i class="el-icon-minus" @click="minusData(index)"></i>
                <i class="el-icon-plus" @click="addData(index)"></i>
              </td>
            </tr>
            </tbody>
          </table>
        </div>


      </div>
      <el-dialog width="600px"
                 id="prodetail"
                 title="请选择项目明细"
                 :visible.sync="budgetDtlsShow"
                 modal-append-to-body
                 :append-to-body="true"
                 :close-on-click-modal="false">
        <el-radio-group v-model="choosedDtl">
          <el-radio v-for="item in budgetDtls"
                    v-if="budgetDtls.length>0"
                    :label="item"
                    style="width: 100%;margin: 10px;">{{item.FName}}</el-radio>
        </el-radio-group>
        <div slot="footer"
              style="text-align: center">
        <button class="whiteBtn"
                @click="budgetDtlsShow=false">取消</button>
        <button class="btn"
                style="margin-left: 30px"
                @click="confirmDtl()">保存</button>
      </div>
      </el-dialog>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
        name: "add",
      props:{
        isadd: {
          type: Boolean,
          default() {
           return true
          }
        },
        phid: {
          type: String,
          default(){
            return ''
          }
        },
          bm: {
            type: Object,
            default(){
              return {}
            }
          },
        ysbm: {
            type: Object,
          default() {
              return {
                deptCode: "101.01",
                deptName: "资产部",
                orgCode: "101",
                orgName: "浙江省总本级"
              }
          }
        }
      },
        data(){
          return{
            dataList: [
              {
                FName:'',//明细费用名称；
                FDtlName:'',//明细项目名称；
                FAmount:'',//预计支出金额；
                FSourceoffunds:'',//资金来源；
                FSourceoffunds_EXName:'',//资金来源名称；
                FBudgetaccounts:'',//预算科目；
                FBudgetaccounts_EXName:'',//预算科目名称；
                FOtherinstructions:'',//其他说明；
                FExpenseschannel:'',//支出渠道；
                FExpenseschannel_EXName:'',//支出渠道名称；
                FReturnamount:0//返还金额
              }
            ],
            delDataList: [],
            formDate:{
              FYear:'',//项目年度
              FProjcode:'',
              FProjAmount:'',//选择项目时赋值
              FDeclarationunit: '',//申报单位
              FBudgetDept: '',//申报部门
              FDeclarationDept: '',//预算部门
              FDateofdeclaration: '',//申报日期
              FProjname: '',//项目名称
              FExpenseCategory_EXName: '',//项目类型名称
              FExpenseCategory: '',//项目类型
              FServiceDept: '',//服务意向单位
              FFundStandard: '',//经费标准
              remark: '',//备注
              FApprovestatus:1,
              FSurplusamount:0//明细合计金额
            },
            imageUrl:'',//附件列表
            pList:[],//可选部门列表
            pListIndex:'',//选中的部门下标
            chooseBm:{},//选中的部门
            budgetDtls:[],//预算明细
            budgetDtlsShow:false,//预算明细选择弹窗
            openDtlIndex:'',//打开预算明细的下标
            choosedDtl:{},//选择的明细，用于赋值
            //预算金额
            budgetMoney:{
              FPlayamount: 1110,
              FProjAmount: 1110,
              FrozenSum: 0,
              UsedSum: 0
            },
            //科目可申报金额上限
            maxMoney:{}
          }
        },
      components: { mapState },
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
      watch: {
        pListIndex:function(val){
          this.chooseBm=this.pList[val];
          this.formDate.FProjcode=this.pList[val].FProjCode;
          this.formDate.FProjname=this.pList[val].FProjName;
          this.formDate.FExpenseCategory_EXName=this.pList[val].FExpenseCategory_EXName;
          this.formDate.FExpenseCategory = this.pList[val].FExpenseCategory;
          this.formDate.FProjAmount = this.pList[val].FBudgetAmount;
          this.getProMst( this.pList[val].PhId )
        }
      },
      mounted(){
        if( !this.isadd ){
          this.getData();
        }else{
          this.formDate.FDeclarationunit=this.ysbm.orgCode;
          this.formDate.FBudgetDept=this.ysbm.deptCode;
          this.formDate.FDeclarationDept=this.bm.OCode;
          this.formDate.FYear=this.year;
          this.getDataPro();
        }

      },
      methods:{
          //附件上传
        handleAvatarSuccess(res, file){
          console.log(res,file)
        },
        //附件上传校验
        beforeAvatarUpload(file) {
          console.log(file)
        },
        //列表增行
        addData: function(index) {
          this.dataList.splice(index+1,0,{});
        },
        //列表删行
        minusData: function(index) {
          if(this.dataList[index].PhId!=undefined){
            this.dataList[index].PersistentState=3;
            this.delDataList.push(this.dataList.slice(index,index+1));
          }
          this.dataList.splice(index,1);
        },
        //获取申报项目信息--id 单据主键
        getData: function() {
          let url='GYS/ExpenseMstApi/GetExpenseMstInfo';
          let param={ id:this.phid };
          this.getAxios( url,param ).then( res=>{
            this.formDate=res.ExpenseMst;
            this.dataList=res.ExpenseDtls;
            this.getDataPro();
          }).catch( err=>{
            console.log(err)
          })
        },
        //获取项目列表
        getDataPro: function() {
          var url = 'GYS/BudgetMstApi/GetYS_expense'
          let param = {
            FBudgetDept:this.ysbm.deptCode,//申报部门,
            FDeclarationunit:this.ysbm.orgCode,//申报单位
            FDeclarationDept: this.bm.OCode,//预算部门
            FYear: this.year
          }
          this.getAxios(url, param)
            .then(res => {
              this.pList=res.Record;
              //this.$set(this.pList,'',res.Record);
              if( this.isadd ){
                this.pListIndex=0;
              }else{
                for(var val=0; val<this.pList.length; val++){
                  if( this.formDate.FProjcode==this.pList[val].FProjCode ){
                    this.pListIndex = val;
                  }
                }
              }

              /*this.getProMst( res.Record[0].PhId )*/
            })
            .catch(err => {
              console.log(err)
            })
        },
        //根据选择的项目获取项目明细，及项目金额
        getProMst: function( phid ) {
          let url='GYS/ExpenseMstApi/GetinfoByProjCode';
          let param={
            YsPhid: phid
          }
          this.getAxios( url,param ).then( res=>{
            this.budgetMoney={
              FPlayamount: res.FPlayamount,
              FProjAmount: res.FProjAmount,
              FrozenSum: res.FrozenSum,
              UsedSum: res.UsedSum
            }
            this.budgetDtls=res.budgetDtls;
            this.formDate.FExpenseCategory=res.FExpenseCategory;
            this.maxMoney=res.Yskm_Amount;//科目可申报上限，与明细配合
          }).catch( err=>{
            console.log(err)
          })
        },
        //打开明细弹窗
        openDtl:function(val) {
          this.openDtlIndex=val;//保存当前打开弹窗的下标，用于后面数据赋值
          this.budgetDtlsShow=true
        },
        //确认选择明细
        confirmDtl: function() {
          this.dataList[this.openDtlIndex].FDtlName=this.choosedDtl.FName; //明细项目名称；
          //this.dataList[this.openDtlIndex].FAmount=this.choosedDtl.FAmount; //预计支出金额；
          this.dataList[this.openDtlIndex].FSourceoffunds=this.choosedDtl.FSourceOfFunds;//资金来源；
          this.dataList[this.openDtlIndex].FSourceoffunds_EXName=this.choosedDtl.FSourceOfFunds_EXName; //资金来源名称；
          this.dataList[this.openDtlIndex].FBudgetaccounts=this.choosedDtl.FBudgetAccounts; //预算科目；
          this.dataList[this.openDtlIndex].FBudgetaccounts_EXName=this.choosedDtl.FBudgetAccounts_EXName; //预算科目名称；
          this.dataList[this.openDtlIndex].FOtherinstructions=this.choosedDtl.FOtherInstructions; //其他说明；
          this.dataList[this.openDtlIndex].FExpenseschannel=this.choosedDtl.FExpensesChannel; //支出渠道；
          this.dataList[this.openDtlIndex].FExpenseschannel_EXName=this.choosedDtl.FExpensesChannel_EXName; //支出渠道名称；

          this.budgetDtlsShow=false;
        },
        //明细金额修改，判断是否超出该科目可申报金额 参数，index
        moneyCharge: function(index) {
          let countmoney=JSON.parse(JSON.stringify(this.maxMoney));//
          for( var i in this.dataList ){
            let name=this.dataList[i].FBudgetaccounts;
            let money=this.dataList[i].FAmount;

           countmoney[name]=((+countmoney[name])*100+(+money)*100)/100;
          }
          //这里进行金额判断调整,由于是在基础之上加，所以只要判断是否超过两倍就可以
          if(countmoney[this.dataList[index].FBudgetaccounts]/this.maxMoney[this.dataList[index].FBudgetaccounts]>2){
            let overMoney=countmoney[this.dataList[index].FBudgetaccounts]-this.maxMoney[this.dataList[index].FBudgetaccounts]*2;//取超出部分数
            this.dataList[index].FAmount=((+this.dataList[index].FAmount)*100-(+overMoney)*100)/100;
            this.$msgBox.show({
              content:  this.dataList[index].FBudgetaccounts + this.dataList[index].FBudgetaccounts_EXName + "科目剩余"
                + this.maxMoney[this.dataList[index].FBudgetaccounts] + "元可用！当前输入超过可用余额，已自动为您调整为最大可申报金额"
            })
          }
          this.countMoney();
        },
        //金额合计
        countMoney: function() {
          let count=0;
          for( var i in this.dataList ){
            count=((+count)*100+(+this.dataList[i].FAmount)*100)/100;
          }
          this.formDate.FSurplusamount=count;
        },
        //保存单据
        saveBill: function() {
          let url='GYS/ExpenseMstApi/PostSave';
          this.formDate.FDateofdeclaration=new Date();
          let exDtls=this.dataList.concat(...this.delDataList);
          let data={
            ExpenseMst: this.formDate,
            ExpenseDtls: exDtls,
            beforeSum:0,
            beforeFReturnamount:0
          };
          this.postAxios(url,data).then( res=>{
            if( res.Status=='success' ){
              this.$msgBox.show({
                content:  res.Msg,
                fn:()=>{
                  this.$emit( 'updata' ) ;
                }
              })
            }
          }).catch( err=>{
            console.log(err);
          })
        },
      }
    }
</script>

<style lang="scss" scoped>
  #numInput{
    span{
      display: block;
    }
    input{
      display: none;
    }
    &:hover{
      input{
        display: block;
      }
      span{
        display: none;
      }
    }
  }
  .nav{
    margin-bottom: 20px;
    text-align: right;
  }

  .msgPanel{
    text-align: left;
    .typeTitle{
      margin: 15px 0;
      font-size: 22px;
      color: #00B8EE;
      &:before,&:after{
        content: ' ';
        width: 50px;
        border-bottom: 1px solid;
        vertical-align: middle;
        display: inline-block;
        margin: 0 5px;
      }
    }
    ul li{
      display: inline-block;
      width: 33%;
      padding: 15px 25px;
      /deep/.el-input{
        width: 220px;
        display: inline-block;
      }
      span{
        letter-spacing: 9px;
      }
    }
    table{
      th,td{
        border: 1px solid #ccc;
        height: 20px;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
      }
      td{
        height: 28px;
        padding: 10px;
        input{
          border: 0;
          width: 100%;
        }
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
  }
/deep/.avatar-uploader{
  padding: 0 10px;
  border: 1px dotted #ccc;
  display: inline-block;
  float: right;
}
</style>
