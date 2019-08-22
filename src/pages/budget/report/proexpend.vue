<template>
  <!--年初收支预算表-->
  <div class="contentPanel">
    <!--一级栏-->
    <!--<div class="topNav">
      <div>
        <ul>
          <li>
            <span>单位：</span>
            <el-select size="mini" v-model="searchData.moneyType">
              <el-option v-for="item in moneyTypeList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li>
            <span>支出类别：</span>
            <el-select size="mini" v-model="searchData.payType">
              <el-option v-for="item in payTypeList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li>
            <span>审批状态：</span>
            <el-select size="mini" v-model="searchData.approval">
              <el-option v-for="item in approvalList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <search-input
              @btnClick="search()"
              placeholder="项目编码/名称"
              v-model="searchData.value"
            ></search-input>
          </li>
          <li>
            <el-popover palcement="bottom" width="500" trigger="click" v-model="popvisiable">
              <div class="seniorSearch">
                <div>
                  <span>高级查询</span>
                  <span class="el-icon-close" @click="popvisiable=false"></span>
                </div>
                <table>
                  <colgroup>
                    <col width="15%">
                    <col width="15%">
                    <col width="5%">
                    <col width="15%">
                    <col width="15%">
                    <col width="35%">
                  </colgroup>
                  <tr>
                    <td>项目编码</td>
                    <td colspan="5"><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>项目名称</td>
                    <td colspan="5"><el-input size="mini" placeholder="请输入项目名称"></el-input></td>
                  </tr>
                  <tr>
                    <td>申报部门</td>
                    <td colspan="3"><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                    <td>项目属性</td>
                    <td><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>项目金额</td>
                    <td><el-input size="mini"></el-input></td>
                    <td>至</td>
                    <td><el-input size="mini"></el-input></td>
                    <td>续存期限</td>
                    <td><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>支出类别</td>
                    <td colspan="3">
                      <el-select size="mini" v-model="searchData.payType">
                        <el-option v-for="item in payTypeList" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </td>
                    <td>审批状态</td>
                    <td>
                      <el-select size="mini" v-model="searchData.approval">
                        <el-option v-for="item in approvalList" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </td>
                  </tr>
                  <tr>
                    <td>项目级别</td>
                    <td colspan="3"><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                    <td>绩效评价</td>
                    <td><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>起止日期</td>
                    <td colspan="3"><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                    <td>申报日期</td>
                    <td><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                </table>
                <div>
                  <span><el-checkbox label="记忆搜索"></el-checkbox></span>
                  <ul>
                    <li>
                      <el-button class="btn" size="mini">清空</el-button>
                    </li>
                    <li>
                      <el-button class="btn" size="mini">搜索</el-button>
                    </li>
                  </ul>
                </div>
              </div>

              <el-button class="btn" size="mini" slot="reference">高级</el-button>
            </el-popover>
          </li>
          <li><el-button class="btn" size="mini" @click="">导出</el-button></li>
          <li><el-button class="btn" size="mini" @click="">打印</el-button></li>
          <li><el-button class="btn" size="mini" @click="tableType=tableType==0?'1':'0'">切换表格</el-button></li>
          <li><el-button class="btn" size="mini" @click=""><i class="el-icon-refresh"></i></el-button></li>
        </ul>
      </div>
    </div>-->
    <!--二级栏-->
    <div  class="secondNav">
      <div>
        <ul>
          <li>
            <span>单位：</span>
            <el-select size="mini" style="width: 100px;" v-model="searchData.moneyType">
              <el-option v-for="item in moneyTypeList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li>
            <span>支出类别：</span>
            <el-select size="mini" style="width: 130px;" v-model="searchData.payType" @change="getData">
              <el-option v-for="item in payTypeList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li>
            <span>审批状态：</span>
            <el-select size="mini" style="width: 100px;" v-model="searchData.approval" @change="getData">
              <el-option v-for="item in approvalList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <search-input
              @btnClick="search()"
              placeholder="项目编码/名称"
              v-model="searchData.value"
            ></search-input>
          </li>
          <li>
            <el-popover palcement="bottom" width="500" trigger="click" v-model="popvisiable">
              <div class="seniorSearch">
                <div>
                  <span>高级查询</span>
                  <span class="el-icon-close" @click="popvisiable=false"></span>
                </div>
                <table>
                  <colgroup>
                    <col width="15%">
                    <col width="15%">
                    <col width="5%">
                    <col width="15%">
                    <col width="15%">
                    <col width="35%">
                  </colgroup>
                  <tr>
                    <td>项目编码</td>
                    <td colspan="5"><el-input size="mini" v-model="seniorSearch.FProjCode" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>项目名称</td>
                    <td colspan="5"><el-input size="mini"  v-model="seniorSearch.FProjName" placeholder="请输入项目名称"></el-input></td>
                  </tr>
                  <tr>
                    <td>申报部门</td>
                    <td colspan="3"><!--<el-input size="mini"  v-model="seniorSearch.FDeclarationDept"  placeholder="请输入申报部门"></el-input>-->
                      <el-select size="small"
                                 class="approvalDepart"
                                 popper-class="AD-proper"
                                 v-model="seniorSearch.FDeclarationDept">
                        <el-option v-for="item in bmList"
                                   :key="item.OCode"
                                   :label="item.OName"
                                   :value="item.OCode"></el-option>
                      </el-select>

                    </td>
                    <td>项目属性</td>
                    <td>
                      <!--<el-input size="mini" v-model="seniorSearch.FProjAttr" placeholder="请输入项目属性"></el-input>-->
                      <el-select size="small"
                                 class="approvalDepart"
                                 popper-class="AD-proper"
                                 v-model="seniorSearch.FProjAttr">
                        <el-option v-for="item in baseList.ProjectPropers"
                                   :key="item.TypeCode"
                                   :label="item.TypeName"
                                   :value="item.TypeCode"></el-option>
                      </el-select>

                    </td>
                  </tr>
                  <tr>
                    <td>项目金额</td>
                    <td><el-input size="mini" v-model="seniorSearch.FProjAmountBegin"></el-input></td>
                    <td>至</td>
                    <td><el-input size="mini"  v-model="seniorSearch.FProjAmountEnd"></el-input></td>
                    <td>续存期限</td>
                    <td><el-input size="mini"  v-model="seniorSearch.FDuration" placeholder="请输入续存期限"></el-input></td>
                  </tr>
                  <tr>
                    <td>支出类别</td>
                    <td colspan="3">
                      <el-select size="mini" style="width: 100%" v-model="searchData.payType">
                        <el-option v-for="item in payTypeList" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </td>
                    <td>审批状态</td>
                    <td>
                      <el-select size="mini" style="width: 100%" v-model="searchData.approval">
                        <el-option v-for="item in approvalList" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </td>
                  </tr>
                  <tr>
                   <!-- <td>项目级别</td>
                    <td colspan="3"><el-input size="mini" v-model="seniorSearch.PLevel" placeholder="请输入项目级别"></el-input></td>-->
                    <td>起止日期</td>
                    <td colspan="5">
                      <el-date-picker size="mini"
                                      style="width: 100%;"
                                      v-model="seniorSearch.FTime"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期">
                      </el-date-picker>

                      <!--<el-input size="mini" v-model="seniorSearch.PTime" placeholder="请选择起止日期"></el-input>--></td>
                    <!--<td>绩效评价</td>
                    <td colspan="5"><el-input size="mini" v-model="seniorSearch.FIfPerformanceAppraisal" placeholder="请输入绩效评价"></el-input></td>-->
                  </tr>
                  <tr>
                    <!--<td>起止日期</td>
                    <td colspan="3">
                      <el-date-picker size="mini"
                                      style="width: 100%;"
                                      v-model="seniorSearch.PTime"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期">
                      </el-date-picker</td>>-->

                      <!--<el-input size="mini" v-model="seniorSearch.PTime" placeholder="请选择起止日期"></el-input>-->
                    <td>绩效评价</td>
                    <td colspan="3">
                      <el-select size="mini" style="width: 100%" v-model="seniorSearch.FIfPerformanceAppraisal">
                        <el-option v-for="item in FIfPerformanceAppraisal" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <!--<el-input size="mini" v-model="seniorSearch.FIfPerformanceAppraisal" placeholder="请输入绩效评价"></el-input>-->
                    </td>
                    <td>申报日期</td>
                    <td>
                      <el-date-picker size="mini"
                                      style="width: 100%;"
                                      v-model="seniorSearch.FDateofDeclaration"
                                      type="date"
                                      palceholder="请选择日期">
                      </el-date-picker>
                      <!--<el-input size="mini" v-model="seniorSearch.FTime" placeholder="请输入申报日期"></el-input>-->
                    </td>
                  </tr>
                </table>
                <div>
                  <span><el-checkbox label="记忆搜索" v-model="seniorSearch.memory"></el-checkbox></span>
                  <ul>
                    <li>
                      <el-button class="btn" size="mini" @click="clearSenior">清空</el-button>
                    </li>
                    <li>
                      <el-button class="btn" size="mini" @click="seniorGetData">搜索</el-button>
                    </li>
                  </ul>
                </div>
              </div>

              <el-button class="btn" size="mini" slot="reference">高级</el-button>
            </el-popover>
          </li>
          <li v-if="tableType==0">
            <el-popover palcement="bottom" width="500" trigger="click" v-model="popvisiableCol">
              <div class="seniorSearch colShow">
                <div>
                  <span>列表显示选择</span>
                  <span class="el-icon-close" @click="popvisiableCol=false"></span>
                </div>
                <table>
                  <colgroup>
                    <col width="60%">
                    <col width="40%">
                  </colgroup>
                  <tr>
                    <td>列名</td>
                    <td>是否显示</td>
                  </tr>
                  <tr v-for="(item,index) in tableContent" v-if="index<tableContent.length-1">
                    <td>{{item.title}}</td>
                    <td><el-checkbox v-model="item.isShow"></el-checkbox></td>
                  </tr>
                </table>
                <div>
                  <span><el-checkbox v-model="tableContent[tableContent.length-1].memory" label="记忆搜索"></el-checkbox></span>
                  <ul>
                    <li>
                      <el-button class="btn" size="mini" @click="popvisiableCol=false">取消</el-button>
                    </li>
                    <li>
                      <el-button class="btn" size="mini" @click="tableStrorage">保存</el-button>
                    </li>
                  </ul>
                </div>
              </div>

              <el-button class="btn" size="mini" slot="reference">列表显示</el-button>
            </el-popover>
          </li>
         <!-- <li><el-button class="btn" size="mini" @click="tableType=tableType==0?'1':'0'">切换表格</el-button></li>-->
        </ul>
      </div>
    </div>

      <!--普通表格-->
      <template v-if="tableType==0">
        <div class="tbArea" @scroll="tablescroll" ref="scrollTable">
          <table >
            <thead>
            <th><input type="checkbox" v-model="checkeAll" />序号</th>
            <th v-for="item in tableContent" v-if="item.isShow&&item.title">
              <span>{{item.title}}</span>
              <span class="upOrDown">
              <i :class="{'el-icon-arrow-up':true,'isactive':order&&order.split(' ')[0]==item.prop&&order.split(' ')[1]=='desc'}" @click="order=item.prop+' desc'"></i>
              <i :class="{'el-icon-arrow-down':true,'isactive':order&&order.split(' ')[0]==item.prop&&order.split(' ')[1]=='asc'}" @click="order=item.prop+' asc'"></i>
            </span>
            </th>
            </thead>
            <tbody>
            <tr v-for="(data,index) in dataList">
              <td><input type="checkbox" v-model="data['checked']"/>{{index+1}}</td>
              <template v-for="col in tableContent">
                <td v-if="col.isShow&&col.title">
                  <template v-if="col.title=='起止日期'">
                    {{data[col.prop.split('-')[0]].substring(0,10)+'至'+data[col.prop.split('-')[1]].substring(0,10)}}
                  </template>
                  <template v-else-if="col.title=='项目金额'">
                    <el-tooltip :content="data[col.prop] | NumFormat"
                                popper-class="tooltipCla"
                                placement="bottom-start">
                      <p style="overflow: hidden;text-overflow: ellipsis;text-align: right">{{ searchData.moneyType==1?data[col.prop]/10000:data[col.prop] | NumFormat}}</p>
                    </el-tooltip>
                  </template>
                  <template v-else>
                    <el-tooltip :disabled="!(data[col.prop]&&data[col.prop].length>20)" :content="(col.subLen?data[col.prop].substring(col.subLen[0],col.subLen[1]):data[col.prop]||'').toString()"
                                popper-class="tooltipCla"
                                placement="bottom-start">
                      <p style="overflow: hidden;text-overflow: ellipsis">{{col.subLen?data[col.prop].substring(col.subLen[0],col.subLen[1]):data[col.prop]}}</p>
                    </el-tooltip>
                  </template>

                </td>
              </template>
            </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!--面板表格-->
      <template v-else>
        <div class="tbArea_panel">
          <paneltable v-if="tableType!=0" :moneyType="searchData.moneyType"></paneltable>
        </div>
      </template>



    <div class="pageArea" style="transition: all .3s linear;">
      <el-pagination
        :current-page="pageSearch.pageIndex"
        :page-sizes="[20,30,50,100]"
        :page-size="pageSearch.pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="pageSearch.total"
        @size-change="changePagesize"
        @current-change="changePageindex"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  //表头固定监听事件
  import {tableScroll} from '@/api/upload'
  //搜索框组件
  import SearchInput from '@/components/searchInput/searchInput'
  //面板表格
  import paneltable from '@/components/panelTable/paneltable'
  //引入cookie
  import Cookie from 'js-cookie'
  import {mapState} from 'vuex'
  export default {
    name: "proexpend",
    data(){
      return {
        //分页页码
        pageSearch:{
          pageIndex:1,
          pageSize:20,
          total:100
        },
        searchData:{
          moneyType:0,//单位
          payType:0,//支出类别
          approval:0,//审批状态
          value:''//搜索框
        },
        //金额单位列表
        moneyTypeList:[{label:'元',value:0},{label:'万元',value:1}],
        //支出类别
        payTypeList:[{label:'全部',value:0},{label:'主业类',value:1},{label:'企事业类',value:2},{label:'机关行政类',value:3}],
        //审批状态 审批状态0-全部 1-待上报 2-审批中 3-已审批 4-纳入预算 5-作废
        approvalList:[{label:'全部',value:0},{label:'待上报',value:1},{label:'审批中',value:2},{label:'审批通过',value:3},{label:'已退回',value:4},{label:'作废',value:5}],
        //绩效评价
        FIfPerformanceAppraisal:[{label:'是',value:1},{label:'否',value:2}],
        //高级弹窗
        popvisiable:false,
        //高级弹窗参数
        seniorSearch:{
          memory:false, //记忆高级搜索
          FTime:'', // 起止日期（时间格式） 会在数据查询时进行修改
          FProjCode :"", //项目编码
          FProjName:"",//项目名称
          FProjAmountBegin:"", // 项目金额起始
          FProjAmountEnd:"", // 项目金额结束
          FDeclarationDept:"",  //申报部门
          FProjAttr:"", //项目属性
          FDuration:"",//续存期限
/*          FExpenseCategory:"",//支出类别
          FApproveStatus: "",//审批状态（文档里已加）*/
          FIfPerformanceAppraisal:"",//绩效评价 是1/否2
          FDateofDeclaration:"" //申报日期（时间格式）
        },


        //列表显示弹窗
        popvisiableCol:false,
        //表格显示列 列表
        tableContent:[
          {title:'申报部门',isSort:true,isShow:true,prop:'FDeclarationDept_EXName'},
          {title:'项目编码',isSort:true,isShow:true,prop:'FProjCode'},
          {title:'项目名称',isSort:true,isShow:true,prop:'FProjName'},
          {title:'项目金额',isSort:true,isShow:true,prop:'FProjAmount'},
          {title:'项目属性',isSort:true,isShow:false,prop:'FProjAttr'},
          {title:'缓存期限',isSort:true,isShow:false,prop:'FDuration'},
          {title:'支出类别',isSort:true,isShow:true,prop:'FExpenseCategory_EXName'},
          {title:'项目级别',isSort:true,isShow:false,prop:'FProjStatus'},
          {title:'绩效评价',isSort:true,isShow:false,prop:'FPerformEvalType'},
          {title:'绩效指标类别',isSort:true,isShow:false,prop:'FPerformType'},
          {title:'起止日期',isSort:true,isShow:true,prop:'FStartDate-FEndDate',subLen:[0,10]},
          {title:'申报人员',isSort:true,isShow:true,prop:'FDeclarer'},
          {title:'申报日期',isSort:true,isShow:true,prop:'FDateofDeclaration',subLen:[0,10]},
          {title:'审批状态',isSort:true,isShow:true,prop:'FApproveStatus'},
          {memory:false}
        ],
        //表格排序
        order:'',
        //切换列表,0-普通列表，1-面板列表
        tableType:0,
        //列表数据
        highlightCurrentRow:false,
        rowNumber:4,
        table1:{
          tableData:[]
        },
        dataList:[],
        bmList:[],//部门列表
        baseList:[],//基础信息列表
        checkeAll:false,//表格全选

      }
    },
    components:{SearchInput,paneltable},
    computed:{
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
    mounted(){
        let sin=this.getCookie('seniorSearch');
        if(sin!=undefined){
          this.seniorSearch=JSON.parse(sin);
        }
        let tableRow=this.getCookie('tableRow');
        console.log(JSON.parse(tableRow))
        if(tableRow!=undefined){
          this.tableContent=JSON.parse(tableRow);
        }
      console.log('this.tableContent')
        console.log(this.tableContent)
        this.getData();
        //获取部门
        this.getDataC();
        //获取基础信息
      this.getBaseData();
    },
    watch:{
     /* seniorSearch:{
        handler(val,nval){
          console.log(val,nval);
          for(var i in val){
            if(val[i]!=nval[i]&&i=='memory'){
              return
            }else{
              this.seniorSearch.memory=false;
            }
          }
        },
        deep:true
      },
      'seniorSearch.memory':function(val){
        console.log(val)
        if(val){
          this.setCookie('seniorSearch',this.seniorSearch)
        }else{
          this.removeCookie('seniorSearch')
        }
      }*/
      checkeAll: function(val) {
        for(var i in this.dataList){
          this.dataList[i]['checked']=val
        }
      },
      order: function(val1,val2){
        console.log(val1,val2)
        if(val1!=val2){
          this.getData();
        }
      }
    },
    methods:{
      /*cookie获取 seniorSearch*/
      getCookie:function(key){
        let str=Cookie.get(key);
        return str
      },
      /*coolie保存*/
      setCookie:function(key,data){
        //设置cookie失效时间
        var maxAge = new Date(new Date().getTime() + 60 * 60 * 1000);
        // 这里要判断是字符串还是对象
        if (typeof data == "string") {
          Cookie.set(key, data, { expires: maxAge })
        } else {
          let item = JSON.stringify(data)
          Cookie.set(key, item, { expires: maxAge })
        }
      },
      /*cookie删除 设置*/
      removeCookie:function(key){
        Cookie.set(key, '', { expires: -1 })
      },
      /*报表数据获取*/
      getData:function(search_val){
        let data={
          /*UserId:this.userid,*/
          UserId:'9999',
          FApproveStatus:this.searchData.approval, //(选填，审批状态0-全部；1-待上报；2-审批中；3-审批通过；4-未通过)、
          FExpenseCategory:this.searchData.payType,
          PageIndex:this.pageSearch.pageIndex-1,
          PageSize:this.pageSearch.pageSize,
          OrderBy:this.order//排序类型
        };
        for(var i in this.seniorSearch){
          if(i!='memory'&&i!='FTime'){
            data[i]=this.seniorSearch[i]
          }
        };
        //这里进行起止时间修改，时间选择器是数组，需要在发请求前进行赋值
        data['FStartDate']=this.seniorSearch.FTime?this.seniorSearch.FTime[0]:'';
        data['FEndDate']=this.seniorSearch.FTime?this.seniorSearch.FTime[1]:'';
        //搜索框搜索--若传值过来，则以搜索框为主，修改字段
        if(search_val){
          data['FProjCode']=search_val; //项目编码
          data['FProjName']=search_val//项目名称
        }
        console.log(data)
        this.getAxios('GYS/BudgetMstApi/GetBudgetMstLists', data)
          .then(res => {
            console.log(res)
            this.dataList=res.Record;
            this.pageSearch.total=res.totalRows;
            /*if (res && res.Status === 'success') {

            } else {

            }*/
          })
          .catch(err => {
            this.$msgBox.show('数据获取异常')
          })
      },
      //清空高级搜索
      clearSenior: function(){
        for(var i in this.seniorSearch) {
          if (typeof this.seniorSearch[i] == "string") {
            this.seniorSearch[i] = ''
          }else if(typeof  this.seniorSearch[i] == 'boolean'){
            this.seniorSearch[i] = false
          } else {
            this.seniorSearch[i] = {};
          }
        }
      },
      //搜索  同时判断是否要将高级搜索放入缓存
      seniorGetData:function(){
        //高级搜索条件缓存操作
        if(this.seniorSearch.memory){
          this.setCookie('seniorSearch',this.seniorSearch)
        }else{
          this.removeCookie('seniorSearch')
        }
        //数据获取
        this.getData()
      },
      //保存表格显示列
      tableStrorage:function(){
        //高级搜索条件缓存操作
        if(this.tableContent[this.tableContent.length-1].memory){
          this.setCookie('tableRow',this.tableContent)
        }else{
          this.removeCookie('tableRow')
        }
        this.popvisiableCol=false;
      },
      //表格滚动事件，表头悬浮
      tablescroll:function(){
        let vm=this;
        tableScroll('scrollTable',vm)
      },
      //修改页面条数
      changePagesize:function(val){
        console.log('pagesize更改'+val)
        this.pageSearch.pageSize=val;
        this.getData()
      },
      //修改页数
      changePageindex(val){
        console.log('pageindex更改'+val)
        this.pageSearch.pageIndex=val;
        this.getData();
      },
      //搜索框事件
      search() {
        this.pageSearch.pageSize = 20;
        this.pageSearch.pageIndex = 1;


        this.getData(this.searchData.value)
      },
      //获取部门
      getDataC: function () {
        let param = { orgid: this.orgid, uid: this.userid }
        this.searchData.bmType = ''
        this.getAxios('GQT/CorrespondenceSettingsApi/GetDeptByUnit', param)
          .then(res => {
            this.bmList = res.Record;
          })
          .catch(err => {
            console.log(err)
          })
      },
      //获取基础数据
      getBaseData: function() {
        let param = { orgid: this.orgid, orgCode: this.orgcode }
        this.getAxios('GQT/QTSysSetApi/GetAllBasicData', param)
          .then(res => {
            console.log(res)
            if(res.Status=='success') this.baseList=res;

          })
          .catch(err => {
            console.log(err)
          })
      },
      //调用打印
      printTables: function() {
        let print=document.createElement('div');
        print.appendChild(this.$refs.scrollTable.cloneNode(true));
        this.$print(print);
        print=null;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .contentPanel{
    height: 100%;
    padding-bottom:85px;
    .topNav{
      height: 38px;
      border-bottom: 2px dotted #00b8ee;
      >div{
        display: inline-block;
        >ul{
          >li{
            display: inline-block;
          }
        }
        &:nth-of-type(1){
        /*  float: left;
        }
        &:nth-of-type(2){*/
          float: right;
          li{
            width: 78px;
            text-align: center;
            color: #ff9900;
            cursor: pointer ;
            &:nth-of-type(1){
              width: auto;
            }
          }
        }
        &:after{
          content: '';
          clear: both;
        }
      }
      &:after{
        content: '';
        clear: both;
      }
    }
    .secondNav{
      height: 38px;
      border-bottom: 2px dotted #00b8ee;
      >div{
        display: inline-block;
        >ul{
          >li{
            display: inline-block;
          }
        }
        &:nth-of-type(1){
          float: left;
        }
        &:nth-of-type(2){
          float: right;
          li{
            width: 78px;
            text-align: center;
            color: #ff9900;
            cursor: pointer ;
            &:nth-of-type(1){
              width: auto;
            }
          }
        }
        &:after{
          content: '';
          clear: both;
        }
      }
      &:after{
        content: '';
        clear: both;
      }
    }
    .tbArea{
      position: relative;
      height: 100%;
      overflow: auto;
      margin-top: 10px;
      >table{
        width:auto;
        min-width: 100%;
        >tbody{
          >tr:nth-of-type(1){
            td{
              border-top: 0;
            }
          }
        }

        th{
          border:solid #eee;
          border-width: 0 1px;
          height: 38px;
          background-color: #d3e9f9;
          position: relative;
          z-index: 100;
          min-width: 150px;
        }
        td{
          border: 1px solid #eee;
          height: 38px;
          max-width: 300px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:nth-of-type(1){
            position: relative;
          }
        }
        .upOrDown{
          display: inline-block;
          height: 40px;
          vertical-align: middle;
          position: absolute;
          right: 8px;
          top: 7px;
          font-size: 13px;
          i{
            display: block;
            cursor: pointer;
            &:hover{
              color: #00b7ee;
            }
            &.isactive{
              color: red;
              font-size: 15px;
            }
          }
        }
        input{
          position: absolute;
          left: 20px;
          top: 15px;
          height: 15px;
          width: 15px;
        }
      }
    }
    .tbArea_panel {
      height: 100%;
      overflow: hidden;
      padding: 0 1%;
    }
  }
.seniorSearch{
  padding: 5px;
  >div{
    &:nth-of-type(1){
      border-bottom: 2px solid #00B8EE;
      color: #00B8EE;
      font-size: .2rem;
    }
    &:nth-of-type(2){
      padding: 10px 0 0 0;
      border-top: 1px solid #ccc;
      >ul{
        display: inline-block;
        float: right;
        >li{
          display: inline-block;
          margin-left: 5px;
          &:nth-of-type(1){
            >.btn{
              background-color: #fff;
              color: #00B8EE;
            }

          }
        }
      }
    }
    >span:nth-of-type(2){
      float: right;
    }
  }

  table{
    width: 100%;
    td{
      padding: 8px 5px;
    }
  }
}
  .colShow{
    table{
      margin: 10px 0;
      td{
        border: 1px solid #ccc;
      }
    };

  }
  .seniorSearch{
    td{
      text-align: center;
    }
  }
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
          &:nth-of-type(1){
            display: none;
          }
          span:nth-of-type(2){
            display: none;
          }
        }
        td {
          border: 1px solid #eee;
          height: 38px;
          padding: 0 10px;
          min-width: 100px;
          &:nth-of-type(1){
            display: none;
          }
        }
      }
    }
  }
</style>
