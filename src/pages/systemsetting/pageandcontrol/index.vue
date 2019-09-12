<template>
  <div class="pageandcontrol">
    <topHandle :title="'系统管理在线工作平台'"
               @refresh="refresh">
      <div class="btnCon">
        <div v-if="menuButton.pageMaintenance_edit!=='True'"
             v-show="disabled"
             @click.stop="disabled=false;deleteList=[]"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/zj2.png"
                 alt=""></div>
          修改
        </div>
        <div v-if="menuButton.pageMaintenance_edit!=='True'"
             v-show="!disabled"
             @click.stop="updateInfo"
             class="handle">
          <div class="topIcon"><img src="@/assets/images/bc.png"
                 alt=""></div>
          保存
        </div>
        <div v-if="menuButton.pageMaintenance_edit!=='True'"
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
              <li>控制项名称</li>
              <li>启用组织</li>
              <li>启用/停用</li>
            </ul>
          </div>

        </div>
        <div :class="{listBodyConUpdate:!disabled}"
             class="list listBodyCon">
          <div class="listBody">
            <div @click.stop="addInfo(0)"
                 v-if="typeInfoList.length==0"
                 style="cursor:pointer">请添加控制项+</div>
            <ul :class="{update:!disabled}"
                v-for="(item,n) of typeInfoList"
                :key="n">
              <li>{{n+1}}</li>
              <li :class="{gray:!disabled&&item.Issystem==1&&ucode!='Admin'}">
                <div v-show="disabled || item.Issystem==1&&ucode!='Admin'">{{item.FName}}</div>
                <div v-show="!disabled&&(item.Issystem!=1||ucode=='Admin')">
                  <el-select style="width:100%"
                             v-model="item.FCode"
                             placeholder="请选择控制项">
                    <el-option v-for="code of options"
                               :label="code.FName "
                               :value="code.FCode">

                    </el-option>
                  </el-select>
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

              <li class="enable">
                <div v-show="disabled">
                  <img v-show="item.FIfuse==0"
                       src="@/assets/images/gou.svg"
                       alt="">
                  <img v-show="item.FIfuse==1"
                       src="@/assets/images/cha.svg"
                       alt="">
                </div>
                <div v-show="!disabled">
                  <el-radio v-model="item.FIfuse"
                            :label="0">启用</el-radio>
                  <el-radio v-model="item.FIfuse"
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
    </div>
    <!--组织树弹窗   visible:显示,,,,@confirm接收选中的值   data组织列表  checked-org当前选中的组织的code列表-->
    <orgtree :visible.sync="orgVisible"
             @confirm="getOrg"
             :data="orglist"
             :checked-org="orgSelected"></orgtree>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetAllWorkFlows, UpdateSetWorkFlowForOrgs } from '../../../api/systemSetting/pageControl'
import Orgtree from "@/components/orgtree/index"
import topHandle from '@/components/topNav/topHandle'
export default {
  name: 'pageandcontrol',
  data () {
    return {
      disabled: true,
      typeInfoList: [],
      orgVisible: false,
      orgSelected: [],
      options: [
        { FCode: '001', FName: '资金拨付是否启用部门发起&汇总审批' },
        { FCode: '002', FName: '支付是否启用部门发起&汇总审批' },
        { FCode: '003', FName: '用款计划是否启用部门发起&汇总审批' },
        { FCode: '004', FName: '预立项是否启用部门发起&汇总审批' },
        { FCode: '005', FName: '项目立项是否启用部门发起&汇总审批' },
      ]
    }
  },
  computed: {
    ...mapState({
      menuButton: state => state.user.menubutton,
      orglist: state => state.user.orglist,
      orgid: state => state.user.orgid,
      ucode: state => state.user.usercode,
      uid: state => state.user.userid,
    })
  },
  mounted () {
    this.refresh();
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
      let data = {
        uid: this.uid,
        orgid: this.orgid
      }
      GetAllWorkFlows(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)
        } else {
          this.typeInfoList = res.Data
        }

      }).catch(err => {
        console.log(err)
        this.$msgBox.error('获取控制项数据失败!')
      })
    },
    //保存
    updateInfo () {

      this.typeInfoList.map(info => {
        this.options.map(op => {
          if (info.FCode == op.FCode) {
            info.FName = op.FName
          }
        })
      })
      let data = {
        uid: this.uid,
        orgid: this.orgid,
        infoData: this.typeInfoList
      }
      UpdateSetWorkFlowForOrgs(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)
        } else {
          this.$msgBox.show(res.Msg)
          this.refresh();
        }
      }).catch(err => {
        this.$msgBox.error('保存数据失败!')
      })
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
          FCode: '001',
          FName: '资金拨付过程',
          PersistentState: 1,
          FIfuse: 0,
          orgid: this.$store.state.user.orgid,
          uid: this.$store.state.user.userid,
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
    Orgtree
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
          width: 10%;
          border-left: 1px solid $borderColor_ccc;
        }
        &:nth-of-type(2) {
          width: 30%;
        }
        &:nth-of-type(3) {
          width: 40%;
        }
        &:nth-of-type(4) {
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


