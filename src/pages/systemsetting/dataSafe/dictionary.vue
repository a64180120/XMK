<template>
  <div class="dictionary">
    <topHandle :title="'系统管理在线工作平台'"
               @refresh="refresh">
      <div class="btnCon">
        <div v-if="menuButton.datadic_edit=='True'"
             v-show="disabled"
             @click.stop="disabled=false;deleteList=[]"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/zj2.png"
                 alt=""></div>
          修改
        </div>
        <div v-show="!disabled"
             @click.stop="update"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/zj2.png"
                 alt=""></div>
          保存
        </div>
        <div v-show="!disabled"
             @click.stop="getData();disabled=true;"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/zj2.png"
                 alt=""></div>
          取消
        </div>
      </div>
    </topHandle>
    <div class="container">
      <div class="type">
        <p>字典类型</p>
        <div>
          <ul>
            <li class="typeTitle">--资金拨付--</li>
            <li @click="selectType(type)"
                :class="{active:type.DicType==selected.DicType}"
                v-for="(type,ind) of typeList"
                :key="ind">{{type.DicName}}</li>
            <li class="typeTitle">--预算项目管理--</li>
            <li @click="selectType(type2)"
                :class="{active:type2.DicType==selected.DicType}"
                v-for="(type2) of typeList2"
                :key="type2.DicType">{{type2.DicName}}</li>
            <li class="typeTitle">--绩效评价--</li>
            <li @click="selectType(type3)"
                :class="{active:type3.DicType==selected.DicType}"
                v-for="(type3) of typeList3"
                :key="type3.DicType">{{type3.DicName}}</li>

          </ul>
        </div>

      </div>
      <!-- <div v-if="selected.DicType=='PayMethod'||selected.DicType=='PayMethodTwo'||selected.DicType=='TimeLimit'||selected.DicType=='ProjectProper'||selected.DicType=='ProjectLevel'"
           class="content"> -->
      <div v-if="typeCssList.includes(selected.DicType)"
           class="content">
        <div class="list">
          <div class="listHead">
            <ul>
              <li>序号</li>
              <li>类型编码</li>
              <li>类型名称</li>
              <li>组织</li>
              <li>备注</li>
              <li>启用/停用</li>
            </ul>
          </div>

        </div>
        <div class="list listBodyCon">
          <div class="listBody">
            <div @click.stop="addInfo(0)"
                 v-if="typeInfoList.length==0"
                 style="cursor:pointer">请添加类型+</div>
            <ul :class="{update:!disabled}"
                v-for="(item,n) of typeInfoList"
                :key="n">
              <li>{{n+1}}</li>
              <li :class="{gray:!disabled&&ucode!='Admin'}">
                <div v-show="!(!disabled&&ucode=='Admin')">{{item.TypeCode}}</div>
                <!-- <div v-show="disabled || item.Issystem==1">{{item.TypeCode}}</div>  -->
                <div v-show="!disabled&&ucode=='Admin'">
                  <el-input v-model="item.TypeCode"
                            placeholder="请输入类型编码"></el-input>
                </div>
              </li>
              <li :class="{gray:!disabled&&item.Issystem==1&&ucode!='Admin'}">
                <div v-show="disabled || item.Issystem==1&&ucode!='Admin'">{{item.TypeName}}</div>
                <div v-show="!disabled&&(item.Issystem!=1||ucode=='Admin')">
                  <el-input v-model="item.TypeName"
                            placeholder="请输入类型名称"></el-input>
                </div>
              </li>
              <li :class="{gray:!disabled&&item.Issystem==1&&ucode!='Admin'}">
                <div v-show="disabled || item.Issystem==1&&ucode!='Admin'">{{item.OrgList | orgname}}</div>
                <el-tooltip :content="item.OrgList | orgname">
                  <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
                       @click="orgTree(item,n)"
                       v-show="!disabled&&(item.Issystem!=1||ucode=='Admin')">
                    {{item.OrgList | orgname}}
                  </div>
                </el-tooltip>
              </li>
              <li :class="{gray:!disabled&&item.Issystem==1&&ucode!='Admin'}">
                <div v-show="disabled || item.Issystem==1&&ucode!='Admin'">{{item.Bz}}</div>
                <div v-show="!disabled&&(item.Issystem!=1||ucode=='Admin')">
                  <el-input v-model="item.Bz"
                            placeholder="请输入备注"></el-input>
                </div>
              </li>
              <li class="enable">
                <div v-show="disabled">
                  <img v-show="item.Isactive==0"
                       src="@/assets/images/gou.svg"
                       alt="">
                  <img v-show="item.Isactive==1"
                       src="@/assets/images/cha.svg"
                       alt="">
                </div>
                <div v-show="!disabled">
                  <el-radio v-model="item.Isactive"
                            :label="0">启用</el-radio>
                  <el-radio v-model="item.Isactive"
                            :label="1">停用</el-radio>
                </div>
                <div class="icon active">
                  <div @click="addInfo(n)">
                    <img src="@/assets/images/jia.png"
                         alt="">
                  </div>
                  <div @click="deleteInfo(n,item)">
                    <img src="@/assets/images/jian.png"
                         alt="">
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>
      <div v-else-if="selected.DicType=='DxbzCode'"
           class="content">
        <div v-if="ucode!='Admin'"
             class="codeCon">
          <span>对下补助代码: </span>

          <div>
            <el-input :disabled="disabled"
                      placeholder="请输入补助代码"
                      @keyup.native="clearNoNum('Value')"
                      v-model="Value"></el-input>
          </div>
        </div>
        <div v-else
             class="adminCode list">
          <div class="listHead">
            <ul>
              <li>序号</li>
              <li>对下补助代码</li>
              <li>组织</li>
            </ul>
          </div>
          <div class="list listBodyCon">
            <div class="listBody">
              <div @click.stop="addCode(0)"
                   v-if="typeInfoList.length==0"
                   style="cursor:pointer">请添加组织+</div>
              <ul :class="{update:!disabled}"
                  v-for="(item,n) of typeInfoList"
                  :key="n">
                <li>{{n+1}}</li>
                <li>
                  <span v-show="disabled">{{item.Value}}</span>
                  <input v-show="!disabled"
                         type="text"
                         placeholder="请输入对下补助代码"
                         @keyup="clearNoNum(item)"
                         v-model="item.Value">
                </li>
                <li>
                  <div v-if="item.OrgList.length==0"
                       style="width:100%;height:100%"
                       @click="orgTree(item,n)"></div>
                  <el-tooltip :content="item.OrgList | orgname">
                    <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
                         @click="orgTree(item,n)">
                      {{item.OrgList | orgname}}
                    </div>
                  </el-tooltip>
                  <div class="icon active">
                    <div @click="addCode(n)">
                      <img src="@/assets/images/jia.png"
                           alt="">
                    </div>
                    <div @click="deleteInfo(n,item)">
                      <img src="@/assets/images/jian.png"
                           alt="">
                    </div>
                  </div>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </div>
      <div v-else-if="selected.DicType=='PerformEvals'"
           class="content">
        <PerformEvals @disableUpdate="disableUpdate"
                      :disabled="disabled" />
      </div>
    </div>
    <!--组织树弹窗   visible:显示,,,,@confirm接收选中的值   data组织列表  checked-org当前选中的组织的code列表-->
    <orgtree :visible.sync="orgVisible"
             @confirm="getOrg"
             :data="orglist"
             :checked-org="orgSelected"></orgtree>
  </div>
</template>

<script>
import Orgtree from "@/components/orgtree/index"
import { mapState } from 'vuex'
import PerformEvals from '@/components/setting/PerformEvals'
import topHandle from '@/components/topNav/topHandle'
import { GetSysSetList, dictionarySave } from '@/api/systemSetting/dataSafe'
import { GetAllChildTree } from '@/api/systemSetting/post'
export default {
  name: 'dictionary',
  data () {
    return {

      // ucode:'Admin',
      // orglist:[],//组织树
      orgIndex: '',//当前选中的组织切换
      orgVisible: false,
      orgSelected: [],
      disabled: true,//不可编辑,修改
      Value: '',//对下补助代码
      typeList: [  //资金拨付字典
        {          DicType: 'PayMethod',
          DicName: '支付方式',
        },
        {          DicType: 'DxbzCode',
          DicName: '对下补助代码维护',
        }],//字典类型列表
      typeList2: [//预算项目管理字典
        { DicType: 'ProjectLevel', DicName: '项目级别' },

        { DicType: 'ProjectProper', DicName: '项目属性' },

        { DicType: 'TimeLimit', DicName: '续存期限', },
        { DicType: 'PayMethodTwo', DicName: '支付方式', },
        { DicType: 'ProcurementsCatalog', DicName: '采购目录', },
        { DicType: 'ProcurementsProcedures', DicName: '采购程序', },
        { DicType: 'ProcurementsType', DicName: '采购类型', }
      ],
      typeList3: [//绩效评价字典
        { DicType: 'PerformEvals', DicName: '绩效指标' },
        { DicType: 'TargetClasses', DicName: '指标类别' }
      ],
      typeCssList: [
        'PayMethod',
        'ProjectLevel',
        'ProjectProper',
        'TimeLimit',
        'PayMethodTwo',
        'ProcurementsCatalog',
        'ProcurementsProcedures',
        'ProcurementsType',
        'TargetClasses',
        // 'PerformEvals',
      ],
      typeInfoList: [
      ],//类型信息列表
      deleteList: [],//删除的数据
      selected: {
        DicType: 'PayMethod',
        DicName: '支付方式',
      }
    }
  },
  computed: {
    ...mapState({
      menuButton: state => state.user.menubutton,
      orglist: state => state.user.orglist,
      orgid: state => state.user.orgid,
      ucode: state => state.user.usercode
    })
  },
  mounted () {
    this.getData();
    // this.getorglist();
  },
  watch: {
    orgid (val) {
      if (val) {
        this.getData();
      }
    }
  },
  methods: {
    refresh () {
      this.disabled = true;
      this.getData();
    },
    getData () {
      let data = {
        orgid: this.$store.state.user.orgid,
        uid: this.$store.state.user.userid,
        //uid:266190618000001,
        DicType: this.selected.DicType
      }
      GetSysSetList(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.show(res.Msg)
        } else {
          this.typeInfoList = res.Record;
          if (this.selected.DicType == "DxbzCode" && this.ucode != 'Admin') {
            if (res.Record.length) {
              this.Value = res.Record[0].Value;
            } else {
              this.Value = ''
            }
          }
          this.typeInfoList.map(info => info.PersistentState = 2)
          this.deleteList = [];
        }
      }).catch(err => {
        console.log(err)
        this.$msgBox.show('获取数据失败!')
      })
    },
    update () {
      if (this.ucode != 'Admin' && this.selected.DicType == 'DxbzCode') {
        if (this.typeInfoList.length) {
          this.typeInfoList[0].Value = this.Value;
          this.typeInfoList[0].OrgList = [{
            PhId: this.$store.state.user.orgid,
            OCode: this.$store.state.user.orgcode,
            OName: this.$store.state.user.orgname
          }]
        } else {
          this.typeInfoList = [{
            DicType: this.selected.DicType,
            Value: this.Value,
            OrgList: [{
              PhId: this.$store.state.user.orgid,
              OCode: this.$store.state.user.orgcode,
              OName: this.$store.state.user.orgname
            }]
          }]
        }

      }

      let arr = this.typeInfoList.concat(this.deleteList);
      let data = {
        orgid: this.$store.state.user.orgid,
        uid: this.$store.state.user.userid,
        //uid:266190618000001,
        infoData: arr
      }
      dictionarySave(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)
        } else {
          this.$msgBox.show(res.Msg)
          this.disabled = true;
          this.getData();
        }
      }).catch(err => {
        this.$msgBox.show('修改失败!')
      })
    },
    selectType (type) {
      this.selected = type;
      this.disabled = true;
      this.getData();
    },
    disableUpdate () {
      this.disabled = false;
    },
    //输入框限定***
    clearNoNum (val) {

      if (val.Value) {
        val.Value = val.Value.replace(/[^0-9]/g, "");
      } else if (typeof obj == 'string') {
        this[val] = this[val].replace(/[^0-9]/g, "");
      }

      //清除“数字”和“.”以外的字符  
    },

    //code信息新增
    addCode (index) {
      if (index == 0) {
        this.disabled = false;
      }
      this.typeInfoList.splice(
        index + 1,
        0,
        {

          DicType: this.selected.DicType,
          Isactive: 0,
          PersistentState: 1,
          DicName: this.selected.DicName,
          Orgid: this.$store.state.user.orgid,
          Orgcode: this.$store.state.user.orgcode,
          OrgList: []
        }
      )
    },
    //类型信息新增
    addInfo (index) {
      if (index == 0) {
        this.disabled = false;
      }
      this.typeInfoList.splice(
        index + 1,
        0,
        {
          DicType: this.selected.DicType,
          Isactive: 0,
          PersistentState: 1,
          DicName: this.selected.DicName,
          Orgid: this.$store.state.user.orgid,
          Orgcode: this.$store.state.user.orgcode,
          OrgList: [{ PhId: this.$store.state.user.orgid, OCode: this.$store.state.user.orgcode, OName: this.$store.state.user.orgname }]
        }
      )
    },
    //类型信息删除
    deleteInfo (index, item) {
      if (item.Issystem == 1) {
        this.$msgBox.error('系统内置类型不能删除!')
        return;
      }
      if (item.PhId) {
        item.PersistentState = 3;
        this.deleteList.push(item);
      }
      this.typeInfoList.splice(index, 1);

    },
    //获取组织筛选列表
    // getorglist(){
    //     let data={
    //         orgid:this.$store.state.user.orgid
    //     }
    //     GetAllChildTree(data).then(res => {
    //         if(res.Status=='error'){
    //             this.$msgBox.error(res.Msg)
    //         }else{
    //             this.orglist=res.Record;
    //         }
    //     }).catch(err => {
    //         this.$msgBox.error('获取组织列表失败!')
    //     })
    // },
    //接收选中的组织
    getOrg (val) {
      this.typeInfoList[this.orgIndex].OrgList = [];
      val.map(org => {
        this.typeInfoList[this.orgIndex].OrgList.push({
          PhId: org.PhId,
          OCode: org.OCode,
          OName: org.OName
        })
      })
      //this.typeInfoList[this.orgIndex].OrgList=val;
      this.$forceUpdate();
    },
    //显示组织树选择
    orgTree (val, index) {
      if (this.ucode != 'Admin' || this.disabled) {
        return;
      }
      this.orgIndex = index;
      if (val) {
        let arr = [];
        val.OrgList.map(v => {
          arr.push(v.OCode)
        })
        this.orgSelected = arr;//需要code的列表
      }
      this.orgVisible = true;
    },
  },
  components: {
    topHandle,
    Orgtree,
    PerformEvals
  },
  filters: {
    orgname (arr) {
      let str = '';
      for (let org of arr) {
        str += org.OName + ' ';
      }
      return str;
    }
  },
}


</script>

<style lang="scss" scoped>
.dictionary {
  .btnCon {
    .handle {
      display: inline-block;
      width: 60px;
      height: 50px;
      padding: 0px 0;
      cursor: pointer;
      &:active {
        background: #ccc;
      }
    }
  }
  .topIcon {
    height: 60%;
    > img {
      height: 100%;
    }
  }
  .container {
    left: 200px;
    top: 160px;
    padding: 1%;
    padding-right: 0;
  }
  .type {
    float: left;
    width: 18%;
    height: 100%;
    border: 1px solid $borderColor_ccc;
    > p {
      height: 40px;
      line-height: 40px;
      background: #83c350;
      color: #fff;
      font-size: 0.18rem;
      font-weight: 700;
    }
    > div {
      height: 100%;
      padding-top: 40px;
    }
    > div > ul {
      padding: 10px;
      font-size: 0.16rem;
      height: 100%;
      margin-top: -40px;
      overflow: auto;
      > li {
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        border-radius: 8px;
        border: 1px solid $borderColor_ccc;
        cursor: pointer;
        &:hover {
          background: #ff9900;
          color: #fff;
          border-color: #ff9900;
        }
        &.active {
          background: #ff9900;
          color: #fff;
          border-color: #ff9900;
          cursor: default;
        }
      }
      .typeTitle {
        border: 0;
        &:hover {
          color: inherit;
          background: none;
          cursor: default;
        }
      }
    }
  }
  .content {
    float: left;
    width: 82%;
    height: 100%;
  }
  .list {
    position: relative;
    padding-left: 17px;
    width: 100%;
    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 17px;
      content: "";
      background: #fff;
    }
    ul {
      width: 100%;
      > li {
        float: left;
        border: 1px solid $borderColor_ccc;
        border-width: 0 1px 1px 0;
        height: 40px;
        line-height: 40px;
        font-size: 0.16rem;
        &:first-of-type {
          width: 10%;
          border-left: 1px solid $borderColor_ccc;
        }
        &:nth-of-type(2) {
          width: 15%;
        }
        &:nth-of-type(3) {
          width: 20%;
        }
        &:nth-of-type(4) {
          width: 20%;
        }
        &:nth-of-type(5) {
          width: 15%;
        }
        &:nth-of-type(6) {
          width: 20%;
        }
      }
    }
    .listHead {
      overflow-y: scroll;
      padding-right: 25px;
      font-size: 0.18rem;
      color: #fff;
      > ul {
        height: 100%;
        > li {
          float: left;
          background: $btnColor;
          border-top: 1px solid $borderColor_ccc;
        }
      }
    }
  }
  .listBodyCon {
    height: 100%;
    padding-bottom: 40px;
  }
  .listBody {
    overflow-y: scroll;
    padding-right: 25px;
    height: 100%;
    .enable {
      position: relative;
      > div > img {
        height: 20px;
        vertical-align: middle;
      }
      > .icon {
        display: none;
        position: absolute;
        right: -20px;
        top: 0;
        z-index: 999;
        width: 20px;
        padding-left: 5px;
        height: 100%;
        > div {
          width: 100%;
          height: 50%;
          cursor: pointer;
          > img {
            width: 100%;
            height: 16px;
          }
        }
      }
    }

    ul.update:hover {
      .enable > .active {
        display: block;
      }
    }
  }
  .codeCon {
    padding-left: 50px;
    text-align: left;
    font-size: 0.16rem;
    > div {
      width: 50%;
      display: inline-block;
    }
    > span {
      display: inline-block;
    }
  }
}
.gray {
  background: #e6e8ea;
}
.adminCode {
  padding-left: 0;
  width: 100%;
  .listHead {
    width: 100%;
    > ul {
      width: 100%;
      height: 40px;
      > li {
        &:first-of-type {
          width: 20%;
        }
        &:nth-of-type(2) {
          width: 40%;
        }
        &:nth-of-type(3) {
          width: 40%;
        }
      }
    }
  }
  .listBodyCon {
    padding-left: 0;
    .listBody {
      > ul {
        > li {
          position: relative;
          &:first-of-type {
            width: 20%;
          }
          &:nth-of-type(2) {
            width: 40%;
          }
          &:nth-of-type(3) {
            width: 40%;
          }
        }
      }
      ul.update {
        > li {
          &:hover {
            .active {
              display: block;
            }
          }
        }
      }
    }
  }
  .icon {
    display: none;
    position: absolute;
    right: -20px;
    top: 0;
    z-index: 999;
    width: 20px;
    padding-left: 5px;
    height: 100%;
    > div {
      width: 100%;
      height: 50%;
      cursor: pointer;
      > img {
        width: 100%;
        height: 16px;
      }
    }
  }
}
</style>
<style>
.dictionary .listBody input {
  border: none;
  height: 100%;
}
.dictionary .listBody ul.update input {
  text-align: center;
}
</style>



