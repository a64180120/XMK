<template>
  <section>
    <div class="dialog-content">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="top-btn">
            <el-button class="btn" size="mini" @click="save(0)">保存</el-button>
            <el-button class="btn" size="mini" @click="save(1)" style="padding: 0">保存并送审</el-button>
            <el-button class="btn" size="mini" @click="add">增加项目</el-button>
            <el-button class="btn" size="mini" @click="delPro">删除项目</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <el-col :span="5">
          <div class="left-card">
            <p>申请单名称：</p>
            <el-input placeholder="30字以内" maxlength="30"></el-input>
            <div>
              <!--申请信息-->
              <div class="apply-info">
                <ul>
                  <li><span>申报部门：</span><span>{{data.applyDepart}}</span></li>
                  <li><span>金额合计：</span><span>{{data.applyDate}}</span></li>
                </ul>
                <el-card class="payText">
                  <div slot="header">
                    <span>拨付说明</span>
                  </div>
                  <el-input type="textarea" placeholder="100字以内" resize="none" maxlength="100" v-model="data.applyText"></el-input>
                </el-card>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19" style="height: 470px;overflow: auto;text-align: left">
          <el-card class="payText" v-for="(item,pindex) in projectItem">
            <div slot="header" style="padding: 0 10px;text-align: left">
              <span>
                 <el-checkbox v-model="item.checked"></el-checkbox>
                  <span>拨付说明</span>
              </span>
              <span style="float: right">
                <span>附单据 {{item.projectFileNum}} 张</span>
                <span class="">图</span>
                <span style="margin-left: 20px" @click="delPro(pindex)"><i class="el-icon-close"></i></span>
              </span>

            </div>
            <div>
              <div>
                <span>项目名称：</span>
                <span>
                  <el-select size="small" v-model="item.projectCode">
                    <el-option v-for="pro in projectList"
                               :label="pro.proName"
                               :key="pro.proCode"
                               :value="pro.proCode"
                    ></el-option>
                  </el-select>
                </span>
                <span style="float: right">
                  <span>
                  项目编码
                </span>
                <span>{{item.projectCode}}</span>
                </span>

              </div>
              <div style="height: 40px;line-height: 40px;background-color: #d7d7d7;padding:0 10px;margin: 10px 0;">
                <span>预算总额 （93,432,78元）- 实际已使用 （4,423.78元） - 冻结 （1,234,00元） = </span><span style="color: red;">本次可申请 （86,546.98元）</span>
              </div>
            </div>
            <div>
              <table>
                <colgroup>
                  <col width="10%">
                  <col width="25%">
                  <col width="25%">
                  <col width="20%">
                  <col width="20%">
                </colgroup>
                <thead>
                  <td>序号</td>
                  <td>补助单位/部门</td>
                  <td>明细项目名称</td>
                  <td>申请金额（元）</td>
                  <td>备注</td>
                </thead>
                <tbody>
                  <tr v-for="(mx,index) in item.pdList">
                    <template v-if="index==item.pdList.length-1">
                      <td></td>
                      <td colspan="2">小计</td>
                      <td>{{mx.countMoney}}</td>
                      <td>{{mx.countNode}}</td>
                    </template>
                    <template v-else>
                      <td>{{index+1}}</td>
                      <td @click="showOrg(pindex,index)">
                        {{mx.pdOrg.OName}}
                      </td>
                      <td @click="showDetailPro(pindex,index)">{{mx.pdName}}</td>
                      <td>
                        <input v-model="mx.pdMoney">
                      </td>
                      <td>
                        <input v-model="mx.pdNode"></input>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
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
    <el-dialog width="350px" title="请选择项目明细"
               :visible.sync="orgDetailType" :append-to-body="true">
        <el-radio-group v-model="choosedPro.pro">
            <el-radio v-for="item in projectList"
                      :key="item.proCode"
                      :label="item.proName"
                      :value="item.proCode"
                      style="width: 100%;margin: 10px;"
            ></el-radio>
        </el-radio-group>
      <span slot="footer"   style="text-align: center">
          <button class="cancelBtn"  @click="orgDetailType=false">取消</button>
          <button class="confirmBtn" style="margin-left: 30px" @click="confirmOrgDetail">保存</button>
        </span>
    </el-dialog>
    <!--送审-->
    <go-approval  :data="approvalDataS"></go-approval>
  </section>

  <!--内层弹框-->
</template>

<script>
  import Orgtree from "../../components/orgtree/index";
  import goApproval from '../../pages/paycenter/goApproval.vue';
  export default {
    name: "applypro",
    props:{applyNum:String},
    data(){
      return {
        msgType: false,//删除弹窗
        delSOD: true,//是否删除成功
        delmsgType: false,//点击删除后的提示弹窗
        msg: '',//删除提示消息
        time: 3,//倒计时
        projectList:[{proCode:'001',proName:'政府扶贫项目',children:[{proCode:'00101',proName:'政府扶贫项目1'},{proCode:'00102',proName:'政府扶贫项目2'}]},
          {proCode:'002',proName:'山区希望小学',children:[{proCode:'00101',proName:'山区希望小学1'},{proCode:'00102',proName:'山区希望小学2'}]},
          {proCode:'003',proName:'可持续发展项目',children:[{proCode:'00101',proName:'可持续发展项目1'},{proCode:'00102',proName:'可持续发展项目2'}]},
          {proCode:'004',proName:'新能源项目',children:[{proCode:'00101',proName:'新能源项目1'},{proCode:'00102',proName:'新能源项目2'}]}],//可选择项目
        data: {
          applyDepart: '浙江省总工会本级办公室',
          applyDate: new Date().getDate(),
          applyAmount: '100000',
          applyText:''
        },
        projectItem: [
          {
            checked: false,
            projectCode: '001',
            projectFileNum: 2,
            projectFileList: 2,
            pdList: [
              {pdOrg:{OName: '杭州市总工会',OCode:'0001'}, pdName: '未见星河', pdMoney: 1000, pdNode: ''},
              {pdOrg:{OName: '杭州市总工会',OCode:'0001'}, pdName: '爱上咖啡', pdMoney: 2000, pdNode: ''},
              {countName: '小计', countMoney: 3000, countNode: ''}
            ]
          },
          {
            checked: false,
            projectCode: '001',
            projectFileNum: 0,
            projectFileList: 2,
            pdList: [
              {pdOrg:{OName: '杭州市总工会',OCode:'0001'}, pdName: '未见星河', pdMoney: 1000, pdNode: ''},
              {pdOrg:{OName: '杭州市总工会',OCode:'0001'}, pdName: '爱上咖啡', pdMoney: 2000, pdNode: ''},
              {countName: '小计', countMoney: 3000, countNode: ''}
            ]
          }
        ],
        orgType:false,//是否显示组织弹窗
        choosedOrg:{index:[0,0],org:{orgName: '杭州市总工会',orgId:'0001'}},//选中的组织,及对应数据下标
        chooseProList:{index:[0,0],pro:{proCode:'001',proName:'政府扶贫项目',children:[{proCode:'00101',proName:'政府扶贫项目1'},{proCode:'00102',proName:'政府扶贫项目2'}]}},//存放选择的详细项目
        choosedPro:{index:[0,0],pro:{proCode:'00101',proName:'政府扶贫项目1'}},
        orgDetailType:false,
        orgList:[{"RelatId":"","OCode":"10200301","ParentOrg":"","OrgId":"326190107000009","ParentOrgId":"0","OName":"温州市总本级","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000009","PhId":0,"text":"(10200301)温州市总本级","cls":null,"expanded":false,"children":[{"RelatId":"","OCode":"10200301.01","ParentOrg":"","OrgId":"267190228000001","ParentOrgId":"326190107000009","OName":"财务部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"267190228000001","PhId":0,"text":"(10200301.01)财务部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false}],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030201","ParentOrg":"","OrgId":"609190107000008","ParentOrgId":"0","OName":"瑞安市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"609190107000008","PhId":0,"text":"(1020030201)瑞安市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030202","ParentOrg":"","OrgId":"218190107000001","ParentOrgId":"0","OName":"乐清市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000001","PhId":0,"text":"(1020030202)乐清市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103001","ParentOrg":"","OrgId":"326190107000017","ParentOrgId":"0","OName":"省直机关工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000017","PhId":0,"text":"(103001)省直机关工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030204","ParentOrg":"","OrgId":"326190107000011","ParentOrgId":"0","OName":"平阳县总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000011","PhId":0,"text":"(1020030204)平阳县总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103006","ParentOrg":"","OrgId":"218190107000005","ParentOrgId":"0","OName":"省邮政工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000005","PhId":0,"text":"(103006)省邮政工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103011","ParentOrg":"","OrgId":"218190107000010","ParentOrgId":"0","OName":"省电力工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000010","PhId":0,"text":"(103011)省电力工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200601","ParentOrg":"","OrgId":"250190301000001","ParentOrgId":"0","OName":"湖州市总本级","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"250190301000001","PhId":0,"text":"(10200601)湖州市总本级","cls":null,"expanded":false,"children":[{"RelatId":"","OCode":"10200601.01","ParentOrg":"","OrgId":"442190301000001","ParentOrgId":"250190301000001","OName":"经济技术和劳动保护部 ","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"442190301000001","PhId":0,"text":"(10200601.01)经济技术和劳动保护部 ","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200601.03","ParentOrg":"","OrgId":"285190301000002","ParentOrgId":"250190301000001","OName":"法律和权益保障部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"285190301000002","PhId":0,"text":"(10200601.03)法律和权益保障部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200601.04","ParentOrg":"","OrgId":"285190301000003","ParentOrgId":"250190301000001","OName":"经费审查委员会办公室","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"285190301000003","PhId":0,"text":"(10200601.04)经费审查委员会办公室","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200601.06","ParentOrg":"","OrgId":"285190301000005","ParentOrgId":"250190301000001","OName":"财务和资产管理部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"285190301000005","PhId":0,"text":"(10200601.06)财务和资产管理部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200601.05","ParentOrg":"","OrgId":"285190301000004","ParentOrgId":"250190301000001","OName":"湖州市职工服务中心（湖州市总工会职工维权帮扶中心）","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"285190301000004","PhId":0,"text":"(10200601.05)湖州市职工服务中心（湖州市总工会职工维权帮扶中心）","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200601.02","ParentOrg":"","OrgId":"226190301000003","ParentOrgId":"250190301000001","OName":"基层工作和组宣部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"226190301000003","PhId":0,"text":"(10200601.02)基层工作和组宣部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false}],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1","ParentOrg":"","OrgId":"488181024000001","ParentOrgId":"0","OName":"浙江省总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"488181024000001","PhId":0,"text":"(1)浙江省总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101","ParentOrg":"","OrgId":"488181024000002","ParentOrgId":"0","OName":"浙江省总本级","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"488181024000002","PhId":0,"text":"(101)浙江省总本级","cls":null,"expanded":false,"children":[{"RelatId":"","OCode":"101.03","ParentOrg":"","OrgId":"251181026000001","ParentOrgId":"488181024000002","OName":"办公室","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"251181026000001","PhId":0,"text":"(101.03)办公室","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.09","ParentOrg":"","OrgId":"562181026000003","ParentOrgId":"488181024000002","OName":"法工部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"562181026000003","PhId":0,"text":"(101.09)法工部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.02","ParentOrg":"","OrgId":"457181024000003","ParentOrgId":"488181024000002","OName":"财务部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"457181024000003","PhId":0,"text":"(101.02)财务部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.12","ParentOrg":"","OrgId":"427181026000004","ParentOrgId":"488181024000002","OName":"干部人事处","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"427181026000004","PhId":0,"text":"(101.12)干部人事处","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.13","ParentOrg":"","OrgId":"562181026000005","ParentOrgId":"488181024000002","OName":"离退休干部处","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"562181026000005","PhId":0,"text":"(101.13)离退休干部处","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.10","ParentOrg":"","OrgId":"427181026000003","ParentOrgId":"488181024000002","OName":"保障部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"427181026000003","PhId":0,"text":"(101.10)保障部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.05","ParentOrg":"","OrgId":"427181026000001","ParentOrgId":"488181024000002","OName":"政研室","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"427181026000001","PhId":0,"text":"(101.05)政研室","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.07","ParentOrg":"","OrgId":"562181026000002","ParentOrgId":"488181024000002","OName":"宣教部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"562181026000002","PhId":0,"text":"(101.07)宣教部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.15","ParentOrg":"","OrgId":"562181026000006","ParentOrgId":"488181024000002","OName":"经审办","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"562181026000006","PhId":0,"text":"(101.15)经审办","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.17","ParentOrg":"","OrgId":"562181026000007","ParentOrgId":"488181024000002","OName":"机关服务中心","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"562181026000007","PhId":0,"text":"(101.17)机关服务中心","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.14","ParentOrg":"","OrgId":"427181026000005","ParentOrgId":"488181024000002","OName":"机关党委","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"427181026000005","PhId":0,"text":"(101.14)机关党委","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.06","ParentOrg":"","OrgId":"562181026000001","ParentOrgId":"488181024000002","OName":"基层工作部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"562181026000001","PhId":0,"text":"(101.06)基层工作部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.04","ParentOrg":"","OrgId":"645181026000002","ParentOrgId":"488181024000002","OName":"纪检组","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"645181026000002","PhId":0,"text":"(101.04)纪检组","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.16","ParentOrg":"","OrgId":"427181026000006","ParentOrgId":"488181024000002","OName":"网络办","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"427181026000006","PhId":0,"text":"(101.16)网络办","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.01","ParentOrg":"","OrgId":"223181024000001","ParentOrgId":"488181024000002","OName":"资产部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"223181024000001","PhId":0,"text":"(101.01)资产部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.08","ParentOrg":"","OrgId":"427181026000002","ParentOrgId":"488181024000002","OName":"劳动经济部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"427181026000002","PhId":0,"text":"(101.08)劳动经济部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101.11","ParentOrg":"","OrgId":"562181026000004","ParentOrgId":"488181024000002","OName":"女工部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"562181026000004","PhId":0,"text":"(101.11)女工部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false}],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102002","ParentOrg":"","OrgId":"153190121000001","ParentOrgId":"0","OName":"宁波市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"153190121000001","PhId":0,"text":"(102002)宁波市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102008","ParentOrg":"","OrgId":"184190122000002","ParentOrgId":"0","OName":"衢州市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"184190122000002","PhId":0,"text":"(102008)衢州市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102011","ParentOrg":"","OrgId":"378190122000004","ParentOrgId":"0","OName":"丽水市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"378190122000004","PhId":0,"text":"(102011)丽水市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102003","ParentOrg":"","OrgId":"378190122000001","ParentOrgId":"0","OName":"温州市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"378190122000001","PhId":0,"text":"(102003)温州市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101001","ParentOrg":"","OrgId":"488181024000003","ParentOrgId":"0","OName":"浙江省总工会(大账)","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"488181024000003","PhId":0,"text":"(101001)浙江省总工会(大账)","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102001","ParentOrg":"","OrgId":"289190121000001","ParentOrgId":"0","OName":"杭州市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"289190121000001","PhId":0,"text":"(102001)杭州市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102007","ParentOrg":"","OrgId":"378190122000003","ParentOrgId":"0","OName":"金华市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"378190122000003","PhId":0,"text":"(102007)金华市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102006","ParentOrg":"","OrgId":"250190122000001","ParentOrgId":"0","OName":"湖州市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"250190122000001","PhId":0,"text":"(102006)湖州市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102010","ParentOrg":"","OrgId":"189190122000002","ParentOrgId":"0","OName":"台州市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"189190122000002","PhId":0,"text":"(102010)台州市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"101002","ParentOrg":"","OrgId":"488181024000004","ParentOrgId":"0","OName":"浙江省总工会(机关账)","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"488181024000004","PhId":0,"text":"(101002)浙江省总工会(机关账)","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102004","ParentOrg":"","OrgId":"184190122000001","ParentOrgId":"0","OName":"嘉兴市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"184190122000001","PhId":0,"text":"(102004)嘉兴市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102005","ParentOrg":"","OrgId":"189190122000001","ParentOrgId":"0","OName":"绍兴市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"189190122000001","PhId":0,"text":"(102005)绍兴市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102009","ParentOrg":"","OrgId":"250190122000002","ParentOrgId":"0","OName":"舟山市总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"250190122000002","PhId":0,"text":"(102009)舟山市总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030208","ParentOrg":"","OrgId":"609190107000010","ParentOrgId":"0","OName":"洞头区总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"609190107000010","PhId":0,"text":"(1020030208)洞头区总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020100101","ParentOrg":"","OrgId":"563190228000003","ParentOrgId":"0","OName":"台州市总工会（大账）","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"563190228000003","PhId":0,"text":"(1020100101)台州市总工会（大账）","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101","ParentOrg":"","OrgId":"387190107000001","ParentOrgId":"0","OName":"杭州市总本级","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"387190107000001","PhId":0,"text":"(10200101)杭州市总本级","cls":null,"expanded":false,"children":[{"RelatId":"","OCode":"10200101.02","ParentOrg":"","OrgId":"609190107000002","ParentOrgId":"387190107000001","OName":"政研室","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"609190107000002","PhId":0,"text":"(10200101.02)政研室","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.09","ParentOrg":"","OrgId":"150190107000006","ParentOrgId":"387190107000001","OName":"干部人事处","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"150190107000006","PhId":0,"text":"(10200101.09)干部人事处","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.11","ParentOrg":"","OrgId":"326190107000006","ParentOrgId":"387190107000001","OName":"机关党委","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"326190107000006","PhId":0,"text":"(10200101.11)机关党委","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.13","ParentOrg":"","OrgId":"387190107000005","ParentOrgId":"387190107000001","OName":"基建办","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"387190107000005","PhId":0,"text":"(10200101.13)基建办","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.21","ParentOrg":"","OrgId":"387190107000009","ParentOrgId":"387190107000001","OName":"职工文化中心资产管理有限公司","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"387190107000009","PhId":0,"text":"(10200101.21)职工文化中心资产管理有限公司","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.03","ParentOrg":"","OrgId":"609190107000003","ParentOrgId":"387190107000001","OName":"基层工作部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"609190107000003","PhId":0,"text":"(10200101.03)基层工作部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.14","ParentOrg":"","OrgId":"609190107000005","ParentOrgId":"387190107000001","OName":"智慧办","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"609190107000005","PhId":0,"text":"(10200101.14)智慧办","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.17","ParentOrg":"","OrgId":"150190107000010","ParentOrgId":"387190107000001","OName":"工人业余大学","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"150190107000010","PhId":0,"text":"(10200101.17)工人业余大学","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.16","ParentOrg":"","OrgId":"609190107000007","ParentOrgId":"387190107000001","OName":"宣教中心","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"609190107000007","PhId":0,"text":"(10200101.16)宣教中心","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.20","ParentOrg":"","OrgId":"326190107000008","ParentOrgId":"387190107000001","OName":"职工国际旅行社","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"326190107000008","PhId":0,"text":"(10200101.20)职工国际旅行社","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.05","ParentOrg":"","OrgId":"326190107000003","ParentOrgId":"387190107000001","OName":"劳动关系部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"326190107000003","PhId":0,"text":"(10200101.05)劳动关系部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.06","ParentOrg":"","OrgId":"326190107000004","ParentOrgId":"387190107000001","OName":"保障工作部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"326190107000004","PhId":0,"text":"(10200101.06)保障工作部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.07","ParentOrg":"","OrgId":"150190107000005","ParentOrgId":"387190107000001","OName":"宣传教育部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"150190107000005","PhId":0,"text":"(10200101.07)宣传教育部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.15","ParentOrg":"","OrgId":"387190107000006","ParentOrgId":"387190107000001","OName":"职工服务中心","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"387190107000006","PhId":0,"text":"(10200101.15)职工服务中心","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.18","ParentOrg":"","OrgId":"387190107000007","ParentOrgId":"387190107000001","OName":"工人文化宫","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"387190107000007","PhId":0,"text":"(10200101.18)工人文化宫","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.01","ParentOrg":"","OrgId":"326190107000002","ParentOrgId":"387190107000001","OName":"办公室","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"326190107000002","PhId":0,"text":"(10200101.01)办公室","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.04","ParentOrg":"","OrgId":"150190107000004","ParentOrgId":"387190107000001","OName":"经济工作部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"150190107000004","PhId":0,"text":"(10200101.04)经济工作部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.08","ParentOrg":"","OrgId":"326190107000005","ParentOrgId":"387190107000001","OName":"财务资产部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"326190107000005","PhId":0,"text":"(10200101.08)财务资产部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.10","ParentOrg":"","OrgId":"150190107000007","ParentOrgId":"387190107000001","OName":"经审办","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"150190107000007","PhId":0,"text":"(10200101.10)经审办","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.12","ParentOrg":"","OrgId":"609190107000004","ParentOrgId":"387190107000001","OName":"机关工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"609190107000004","PhId":0,"text":"(10200101.12)机关工会","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200101.19","ParentOrg":"","OrgId":"150190107000011","ParentOrgId":"387190107000001","OName":"职工休养院","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"150190107000011","PhId":0,"text":"(10200101.19)职工休养院","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false}],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020010101","ParentOrg":"","OrgId":"150190107000002","ParentOrgId":"0","OName":"杭州市总工会（大账）","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"150190107000002","PhId":0,"text":"(1020010101)杭州市总工会（大账）","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200102","ParentOrg":"","OrgId":"609190107000001","ParentOrgId":"0","OName":"杭州县区工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"609190107000001","PhId":0,"text":"(10200102)杭州县区工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030209","ParentOrg":"","OrgId":"326190107000012","ParentOrgId":"0","OName":"鹿城区总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000012","PhId":0,"text":"(1020030209)鹿城区总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030210","ParentOrg":"","OrgId":"326190107000013","ParentOrgId":"0","OName":"瓯海区总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000013","PhId":0,"text":"(1020030210)瓯海区总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103","ParentOrg":"","OrgId":"326190107000016","ParentOrgId":"0","OName":"省产业工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000016","PhId":0,"text":"(103)省产业工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103002","ParentOrg":"","OrgId":"326190107000018","ParentOrgId":"0","OName":"省国土工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000018","PhId":0,"text":"(103002)省国土工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103005","ParentOrg":"","OrgId":"218190107000004","ParentOrgId":"0","OName":"省联通工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000004","PhId":0,"text":"(103005)省联通工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103007","ParentOrg":"","OrgId":"218190107000006","ParentOrgId":"0","OName":"省移动工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000006","PhId":0,"text":"(103007)省移动工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103010","ParentOrg":"","OrgId":"218190107000009","ParentOrgId":"0","OName":"省烟草工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000009","PhId":0,"text":"(103010)省烟草工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103012","ParentOrg":"","OrgId":"218190107000011","ParentOrgId":"0","OName":"企事业工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000011","PhId":0,"text":"(103012)企事业工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103015","ParentOrg":"","OrgId":"609190107000012","ParentOrgId":"0","OName":"教育工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"609190107000012","PhId":0,"text":"(103015)教育工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001","ParentOrg":"","OrgId":"563190228000001","ParentOrgId":"0","OName":"台州市总本级","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"563190228000001","PhId":0,"text":"(10201001)台州市总本级","cls":null,"expanded":false,"children":[{"RelatId":"","OCode":"10201001.07","ParentOrg":"","OrgId":"474190218000003","ParentOrgId":"563190228000001","OName":"网络和宣教部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"474190218000003","PhId":0,"text":"(10201001.07)网络和宣教部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.01","ParentOrg":"","OrgId":"146190218000001","ParentOrgId":"563190228000001","OName":"办公室","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"146190218000001","PhId":0,"text":"(10201001.01)办公室","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.05","ParentOrg":"","OrgId":"208190218000002","ParentOrgId":"563190228000001","OName":"基层工作部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"208190218000002","PhId":0,"text":"(10201001.05)基层工作部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.08","ParentOrg":"","OrgId":"779190218000002","ParentOrgId":"563190228000001","OName":"保障部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"779190218000002","PhId":0,"text":"(10201001.08)保障部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.09","ParentOrg":"","OrgId":"779190218000003","ParentOrgId":"563190228000001","OName":"女职委","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"779190218000003","PhId":0,"text":"(10201001.09)女职委","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.12","ParentOrg":"","OrgId":"474190218000005","ParentOrgId":"563190228000001","OName":"市直工会工作委","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"474190218000005","PhId":0,"text":"(10201001.12)市直工会工作委","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.14","ParentOrg":"","OrgId":"208190218000003","ParentOrgId":"563190228000001","OName":"文化宫","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"208190218000003","PhId":0,"text":"(10201001.14)文化宫","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.02","ParentOrg":"","OrgId":"779190218000001","ParentOrgId":"563190228000001","OName":"资产部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"779190218000001","PhId":0,"text":"(10201001.02)资产部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.03","ParentOrg":"","OrgId":"474190218000001","ParentOrgId":"563190228000001","OName":"建筑工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"474190218000001","PhId":0,"text":"(10201001.03)建筑工会","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.04","ParentOrg":"","OrgId":"208190218000001","ParentOrgId":"563190228000001","OName":"机关支部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"208190218000001","PhId":0,"text":"(10201001.04)机关支部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.11","ParentOrg":"","OrgId":"474190218000004","ParentOrgId":"563190228000001","OName":"财务部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"474190218000004","PhId":0,"text":"(10201001.11)财务部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.13","ParentOrg":"","OrgId":"474190218000006","ParentOrgId":"563190228000001","OName":"财贸工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"474190218000006","PhId":0,"text":"(10201001.13)财贸工会","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.15","ParentOrg":"","OrgId":"146190218000002","ParentOrgId":"563190228000001","OName":"职工服务中心","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"146190218000002","PhId":0,"text":"(10201001.15)职工服务中心","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.06","ParentOrg":"","OrgId":"474190218000002","ParentOrgId":"563190228000001","OName":"劳动和经济工作部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"474190218000002","PhId":0,"text":"(10201001.06)劳动和经济工作部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201001.10","ParentOrg":"","OrgId":"779190218000004","ParentOrgId":"563190228000001","OName":"经审办","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"779190218000004","PhId":0,"text":"(10201001.10)经审办","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false}],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020060102","ParentOrg":"","OrgId":"226190301000002","ParentOrgId":"0","OName":"湖州市总工会（机关账）","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"226190301000002","PhId":0,"text":"(1020060102)湖州市总工会（机关账）","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030205","ParentOrg":"","OrgId":"609190107000009","ParentOrgId":"0","OName":"苍南县总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"609190107000009","PhId":0,"text":"(1020030205)苍南县总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030206","ParentOrg":"","OrgId":"218190107000002","ParentOrgId":"0","OName":"文成县总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000002","PhId":0,"text":"(1020030206)文成县总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030211","ParentOrg":"","OrgId":"326190107000014","ParentOrgId":"0","OName":"龙湾区总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000014","PhId":0,"text":"(1020030211)龙湾区总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103003","ParentOrg":"","OrgId":"326190107000019","ParentOrgId":"0","OName":"省交通工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000019","PhId":0,"text":"(103003)省交通工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103008","ParentOrg":"","OrgId":"218190107000007","ParentOrgId":"0","OName":"省监狱管理局工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000007","PhId":0,"text":"(103008)省监狱管理局工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103013","ParentOrg":"","OrgId":"218190107000012","ParentOrgId":"0","OName":"建设建材工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000012","PhId":0,"text":"(103013)建设建材工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020100102","ParentOrg":"","OrgId":"563190228000004","ParentOrgId":"0","OName":"台州市总工会（机关账）","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"563190228000004","PhId":0,"text":"(1020100102)台州市总工会（机关账）","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020060101","ParentOrg":"","OrgId":"226190301000001","ParentOrgId":"0","OName":"湖州市总工会（大账）","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"226190301000001","PhId":0,"text":"(1020060101)湖州市总工会（大账）","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200602","ParentOrg":"","OrgId":"285190301000001","ParentOrgId":"0","OName":"湖州区县工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"285190301000001","PhId":0,"text":"(10200602)湖州区县工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"102","ParentOrg":"","OrgId":"150190107000001","ParentOrgId":"0","OName":"市级工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"150190107000001","PhId":0,"text":"(102)市级工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020010102","ParentOrg":"","OrgId":"387190107000002","ParentOrgId":"0","OName":"杭州市总工会（机关账）","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"387190107000002","PhId":0,"text":"(1020010102)杭州市总工会（机关账）","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10200302","ParentOrg":"","OrgId":"326190107000010","ParentOrgId":"0","OName":"温州县区工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000010","PhId":0,"text":"(10200302)温州县区工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030203","ParentOrg":"","OrgId":"150190107000012","ParentOrgId":"0","OName":"永嘉县总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"150190107000012","PhId":0,"text":"(1020030203)永嘉县总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030207","ParentOrg":"","OrgId":"218190107000003","ParentOrgId":"0","OName":"泰顺县总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000003","PhId":0,"text":"(1020030207)泰顺县总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"1020030212","ParentOrg":"","OrgId":"326190107000015","ParentOrgId":"0","OName":"经开区总工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"326190107000015","PhId":0,"text":"(1020030212)经开区总工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103004","ParentOrg":"","OrgId":"150190107000014","ParentOrgId":"0","OName":"省经信委工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"150190107000014","PhId":0,"text":"(103004)省经信委工会","cls":null,"expanded":false,"children":[{"RelatId":"","OCode":"103004.01","ParentOrg":"","OrgId":"142190124000001","ParentOrgId":"150190107000014","OName":"财务部","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"N","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":true,"id":"142190124000001","PhId":0,"text":"(103004.01)财务部","cls":null,"expanded":false,"children":[],"leaf":true,"hrefTarget":null,"myLevel":2,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false}],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103009","ParentOrg":"","OrgId":"218190107000008","ParentOrgId":"0","OName":"省电信工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"218190107000008","PhId":0,"text":"(103009)省电信工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"103014","ParentOrg":"","OrgId":"609190107000011","ParentOrgId":"0","OName":"财贸工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"609190107000011","PhId":0,"text":"(103014)财贸工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false},{"RelatId":"","OCode":"10201002","ParentOrg":"","OrgId":"563190228000002","ParentOrgId":"0","OName":"台州区县工会","RelaIndex":"","index":"","OrderType":"formorgmodel","IfCorp":"","HasRight":0,"Selected":"Y","NgRecordVer":"0","FldExOne":"","FldExTwo":"","FldExThree":"","FldExFour":"","FldExFive":"","FldExSix":"","Bopomofo":"","DeptBelongOrg":"","LeafSeted":false,"id":"563190228000002","PhId":0,"text":"(10201002)台州区县工会","cls":null,"expanded":false,"children":[],"leaf":false,"hrefTarget":null,"myLevel":1,"allowDrag":false,"exparams":null,"customsort":null,"iconCls":null,"disabled":false}],
        checkedOrgList:['10200301','10200301.01'],
        approvalDataS: {
          openDialog: false,
          data: {}
        },
      }
    },
    components:{Orgtree,goApproval},
    watch:{
      applyNum(){
        this.getApply();
      },
    },
    mounted(){
      this.$nextTick(
        this.getApply()
      );

    },
    methods:{
      //申请单查看
      getApply:function(){
        console.log(this.applyNum+'这里添加数据查询方法');
      },
      //保存0，保存并送审1，区别：是否调用送审组件
      save:function(type){
        this.$msgBox.show({
          content: '保存成功。',
          fn: () => {
            console.log('test fn')
          }
        })
        if(type==1){
          setTimeout(()=>{
            this.approvalDataS.openDialog=true;
          },1000)

        }
      },
      //新增项目
      add(){
        let obj={
            checked: false,
            projectCode: '001',
            projectFileNum: 0,
            projectFileList: 0,
            pdList: [
              {pdOrg:{OName: '杭州市总工会',OCode:'0001'}, pdName: '', pdMoney: '', pdNode: ''},
              {countName: '小计', countMoney: 0, countNode: ''}
            ]
          };
        this.projectItem.push(obj)
      },
      delPro(index){
        let ds=index;
        if(typeof ds=="number"){
          this.projectItem.splice(ds,1)
        }else{
          let delList=[];
          for(var i in this.projectItem){
            if(this.projectItem[i].checked){
              delList.push(i)
            }
          }
          if(delList.length==0){
            this.$msgBox.show({
              content: '请选择要删除的项目。',
              fn: () => {
                console.log('test fn')
              }
            })
          }else{
            for(var i=delList.length-1;i>=0;i--){
              this.projectItem.splice(delList[i],1);
            }
            this.$msgBox.show({
              content: '删除成功。',
              fn: () => {
                console.log('test fn')
              }
            })
          }

        }
      },
      //送审
      postApply:function(){
        console.log(this.applyNum+'这里添加数据查询方法');
      },
      //删除
      deleteApply:function(){
        console.log(this.applyNum+'这里添加数据查询方法');
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
          this.$emit('delete',true)
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
        this.choosedOrg.index=[f,s];
        this.orgType=true;
      },
      //组织树点击选择事件
      getOrg:function(data){
        console.log(data);//这边可以得到选中的组织，当点击确定时，进行选中组织赋值，建议添加中间变量，用于保存点击组织树获取的值
        this.choosedOrg.org=data;
      },
      //点击组织树确定按钮进行选中组织赋值
      confirmOrg:function(val){
        this.projectItem[this.choosedOrg.index[0]].pdList[this.choosedOrg.index[1]].pdOrg=val[0];
        if(val.length>1){
          for(var i=0; i<val.length-1;i++){
            let sc={pdOrg:{}, pdName: '爱上咖啡', pdMoney: 2000, pdNode: ''};
            sc.pdOrg=val[i+1];
            this.projectItem[this.choosedOrg.index[0]].pdList.splice(this.choosedOrg.index[1],0,sc);
            sc=null;
          }
        }
      },
      confirmOrgDetail:function(){
        this.orgDetailType=false;
        console.log(this.choosedPro);
        this.projectItem[this.choosedPro.index[0]].pdList[this.choosedPro.index[1]].pdName=this.choosedPro.pro;
      },
      //弹出明细项目，pindex表示项目下标，s,表示项目对应pdlist下标
      showDetailPro(f,s){
        this.orgDetailType=true;
        this.choosedPro.index=[f,s];
        /*for( var i in this.projectList){
          if (this.projectList[i].proCode==this.projectItem[f].projectCode){
            this.choosedPro.pro=this.projectList[i];
          }
        }*/
      },
    }
  }
</script>

<style scoped lang="scss">
  .dialog-title {
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }

  .content {
    height: 470px;
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
      overflow: auto;

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
  }
</style>
<style>
  #delDialog .el-dialog__footer{
    text-align: center;
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

</style>
