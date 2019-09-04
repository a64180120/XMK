<template>
  <div class="pageandcontrol">
    <topHandle :title="'系统管理在线工作平台'"
               @refresh="refresh">
      <div class="btnCon">
        <div v-if="menuButton.codeRuleSet_edit=='True'"
             v-show="disabled"
             @click.stop="disabled=false;deleteList=[]"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/zj2.png"
                 alt=""></div>
          修改
        </div>
        <div v-if="menuButton.codeRuleSet_edit=='True'"
             v-show="!disabled"
             @click.stop="refresh"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/bc.png"
                 alt=""></div>
          保存
        </div>
        <div v-if="menuButton.codeRuleSet_edit=='True'"
             v-show="!disabled"
             @click.stop="refresh"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/qx.png"
                 alt=""></div>
          取消
        </div>

      </div>
    </topHandle>
    <div class="container">

      <div class="content">
        <div class="list">
          <div class="listHead">
            <ul>
              <li>序号</li>
              <li>业务单据</li>
              <li>当前账套编码规则</li>

            </ul>
          </div>

        </div>
        <div :class="{listBodyConUpdate:!disabled}"
             class="list listBodyCon">
          <div class="listBody">
            <div @click.stop="addInfo(0)"
                 v-if="typeInfoList.length==0"
                 style="cursor:pointer">请添加编码规则+</div>
            <ul :class="{update:!disabled}"
                v-for="(item,n) of typeInfoList"
                :key="n">
              <li>{{n+1}}</li>
              <li :class="{gray:!disabled&&item.Issystem==1&&ucode!='Admin'}">
                <div v-show="disabled || item.Issystem==1&&ucode!='Admin'">{{item.TypeName}}</div>
                <div v-show="!disabled&&(item.Issystem!=1||ucode=='Admin')">
                  <el-input v-model="item.TypeName"
                            placeholder="请输入单据名称"></el-input>
                </div>
              </li>
              <li :class="{gray:!disabled&&item.Issystem==1&&ucode!='Admin'}">
                <drag :disabled="disabled"
                      :list="item.codes"></drag>
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
import drag from '@/components/drag/index'
import { mapState } from 'vuex'
import Orgtree from "@/components/orgtree/index"
import topHandle from '@/components/topNav/topHandle'
export default {
  name: 'pageandcontrol',
  data () {
    return {
      disabled: true,
      typeInfoList: [{ TypeName: '项目单据', Isactive: 0, codes: [{ name: '组织编码' }, { name: '部门编码' }, { name: '年月日信息' }, { name: '4位流水号' }] }],
      orgVisible: false,
      orgSelected: []
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
  methods: {
    //刷新
    refresh () {
      this.disabled = true;
      this.deleteList = [];
      this.getData()
    },
    //拉取列表
    getData () {

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
          Isactive: 0,
          PersistentState: 1,
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
  filters: {
    orgname (arr) {
      let str = '';
      for (let org of arr) {
        str += org.OName + ' ';
      }
      return str;
    }
  },
  components: {
    topHandle,
    Orgtree,
    drag
  }
}
</script>

<style lang="scss" scoped>
.pageandcontrol {
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

  .content {
    float: left;
    width: 100%;
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
          width: 15%;
          border-left: 1px solid $borderColor_ccc;
        }
        &:nth-of-type(2) {
          width: 25%;
        }
        &:nth-of-type(3) {
          width: 60%;
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
  .listBodyConUpdate {
    padding-bottom: 70px;
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
</style>

<style>
.pageandcontrol .listBody input {
  border: none;
  height: 100%;
}
.pageandcontrol .listBody ul.update input {
  text-align: center;
}
</style>


