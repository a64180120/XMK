<template>
  <div class="timesetting">
    <topHandle :title="'系统管理在线工作平台'"
               @refresh="refresh">
      <div class="btnCon">
        <div v-if="menuButton.datadic_edit=='True'"
             v-show="disabled"
             @click.stop="disabled=false"
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
      <div v-if="ucode!='Admin'"
           class="codeCon">
        <span>提醒时间设置: </span>

        <div>
          <el-input :disabled="disabled"
                    @keyup.native="clearNoNum('Value')"
                    placeholder="请输入提醒时间(小时)"
                    v-model="Value"></el-input>
        </div>
      </div>
      <div v-else
           class="adminCode list">
        <div class="listHead">
          <ul>
            <li>序号</li>
            <li>提醒时间(小时)</li>
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
                       placeholder="请输入提醒时间"
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
import topHandle from '@/components/topNav/topHandle'
import { GetSysSetList, dictionarySave } from '@/api/systemSetting/dataSafe'
export default {
  name: 'timesetting',
  data () {
    return {
      // ucode:'Admin',
      // orglist:[],//组织树
      orgIndex: '',//当前选中的组织切换
      orgVisible: false,
      orgSelected: [],
      disabled: true,//不可编辑,修改
      Value: '',//对下补助代码
      typeInfoList: [
      ],//类型信息列表
      deleteList: [],//删除的数据
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
        //uid: 266190618000001,
        DicType: 'StayTime'
      }
      GetSysSetList(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.show(res.Msg)
        } else {
          this.typeInfoList = res.Record;
          if (this.ucode != 'Admin') {
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
      if (this.ucode != 'Admin') {
        if (this.typeInfoList.length) {
          this.typeInfoList[0].Value = this.Value;
          this.typeInfoList[0].OrgList = [{
            PhId: this.$store.state.user.orgid,
            OCode: this.$store.state.user.orgcode,
            OName: this.$store.state.user.orgname
          }]
        } else {
          this.typeInfoList = []
        }

      }

      let arr = this.typeInfoList.concat(this.deleteList);
      let data = {
        orgid: this.$store.state.user.orgid,
        uid: this.$store.state.user.userid,
        //uid: 266190618000001,
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
    //输入框限定***
    clearNoNum (obj) {
      var val = '';
      if (obj.Value) {
        val = obj.Value;
      } else if (typeof obj == 'string') {
        val = this[obj];
      }

      val = val.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
      val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
      val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
      if (val.indexOf(".") < 0 && val != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        val = parseFloat(val);
      }
      if (obj.Value) {
        obj.Value = val.toString();
      } else {
        this[obj] = val.toString();
      }
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
          DicType: "StayTime",
          Isactive: 0,
          PersistentState: 1,
          DicName: '停留时长提醒设置',
          Orgid: this.$store.state.user.orgid,
          Orgcode: this.$store.state.user.orgcode,
          OrgList: []
        }
      )
    },
    //信息删除
    deleteInfo (index, item) {
      if (item.Issystem == 1) {
        this.$msgBox.error('系统内置信息不能删除!')
        return;
      }
      if (item.PhId) {
        item.PersistentState = 3;
        this.deleteList.push(item);
      }
      this.typeInfoList.splice(index, 1);

    },
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
    Orgtree
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
.timesetting {
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
}
</style>

<style>
.timesetting .listBody input {
  border: none;
  height: 100%;
}
.timesetting .listBody ul.update input {
  text-align: center;
}
</style>
