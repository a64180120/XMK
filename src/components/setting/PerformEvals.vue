<template>
  <div class="PerformEvals">
    <div v-if="ucode=='Admin'"
         class="orgTreeCon">
      <div>
        <el-tree v-if="orglist.length"
                 ref="orgtree"
                 node-key="OCode"
                 :highlight-current="true"
                 :props="defaultProps"
                 :default-expanded-keys="[orglist[0].OCode]"
                 :data="orglist"
                 :render-content="rendercontent"
                 :expand-on-click-node="false"
                 @node-click="orgChange"></el-tree>
      </div>

    </div>
    <div class="PerformEvalsType">
      <div class="treeCon">
        <el-tree v-if="typeList.length"
                 ref="typetree"
                 node-key="FCode"
                 :highlight-current="true"
                 :props="typeProps"
                 :default-expanded-keys="[type.FCode]"
                 :data="typeList"
                 :expand-on-click-node="false"
                 @node-click="typeChange"></el-tree>
      </div>

      <div class="handleBtn">
        <div>
          <div @click="targetUpdateShow('add')"
               style="margin-left: 0;"
               class="typeAdd">
            <img src="@/assets/images/add.png"
                 alt=""> <span>新增</span>
          </div>
          <div @click="targetUpdateShow('update')"
               class="typeUpdate">
            <img src="@/assets/images/update.png"
                 alt=""> <span>修改</span>
          </div>
          <div @click="targetUpdateShow('delete')"
               class="typeDelete">
            <img src="@/assets/images/del.png"
                 alt=""> <span>删除</span>
          </div>
        </div>

      </div>
    </div>
    <div class="infoList">
      <div class="list">
        <div class="listHead">
          <ul>
            <li>序号</li>
            <li>指标类别</li>
            <li>指标代码</li>
            <li>指标名称</li>
            <li>指标值</li>
            <li>指标权重</li>
            <li>指标描述</li>
          </ul>
        </div>

      </div>
      <div :class="{listBodyConUpdate:!disabled}"
           class="list listBodyCon">
        <div class="listBody">
          <div @click.stop="addInfo(0)"
               v-if="infoList.length==0"
               style="cursor:pointer">请添加指标信息+</div>
          <ul :class="{update:!disabled}"
              v-for="(item,n) of infoList"
              :key="n">
            <li>{{n+1}}</li>
            <li :class="{gray:!disabled}">
              <div v-show="disabled">{{item.FTargetClassName}}</div>
              <!-- <div v-show="disabled || item.Issystem==1">{{item.TypeCode}}</div>  -->
              <div v-show="!disabled">
                <el-select v-model="item.FTargetClassCode"
                           placeholder="请选择指标类别">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.TypeName"
                             :value="item.TypeCode">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li :class="{gray:!disabled}">
              <div v-show="disabled ">{{item.FTargetCode}}</div>
              <div v-show="!disabled">
                <el-input v-model="item.FTargetCode"
                          placeholder="请输入指标代码"></el-input>
              </div>
            </li>

            <li :class="{gray:!disabled}">
              <div v-show="disabled">{{item.FTargetName}}</div>
              <div v-show="!disabled">
                <el-input v-model="item.FTargetName"
                          placeholder="请输入指标名称"></el-input>
              </div>
            </li>
            <li :class="{gray:!disabled}">
              <div v-show="disabled">
                <el-tooltip :content="item.FTargetValue">
                  <span>
                    {{item.FTargetValue}}
                  </span>

                </el-tooltip>
              </div>
              <div v-show="!disabled">
                <el-input v-model="item.FTargetValue"
                          placeholder="请输入指标值"></el-input>
              </div>
            </li>
            <li :class="{gray:!disabled}">
              <div v-show="disabled">{{item.FTargetWeight}}</div>
              <div v-show="!disabled">
                <el-input v-model="item.FTargetWeight"
                          placeholder="请输入指标权重"></el-input>
              </div>
            </li>
            <li :class="{gray:!disabled}">
              <div v-show="disabled">
                <el-tooltip :content="item.FTargetDescribe">
                  <span>
                    {{item.FTargetDescribe}}
                  </span>

                </el-tooltip>
              </div>
              <div v-show="!disabled">
                <el-input v-model="item.FTargetDescribe"
                          placeholder="请输入指标描述"></el-input>
              </div>
            </li>
            <li v-if="!disabled">
              <div @click="addInfo(n)">
                <img src="@/assets/images/jia.png"
                     alt="">
              </div>
              <div @click="deleteInfo(n,item)">
                <img src="@/assets/images/jian.png"
                     alt="">
              </div>
            </li>
          </ul>
        </div>
        <div class="handleBtn"
             v-show="!disabled">
          <span @click.stop="$emit('refresh')"
                class="whiteBtn">取消</span>
          <span @click.stop="UpdateTargets"
                class="btn">保存</span>
        </div>
      </div>
    </div>
    <fDialog title='指标类型'
             :visible.sync="targetTypeShow">
      <div class="auditTypeAdd">
        <ul class="typelist">
          <li>
            <div>指标名称</div>
            <div>
              <el-input maxlength="20"
                        v-model="targetName"
                        placeholder="请输入指标名称(必填)"></el-input>
            </div>
          </li>
          <li class="btnCon">
            <span @click.stop="targetTypeShow=false"
                  class="whiteBtn">取消</span>
            <span @click="targetUpdate"
                  class="btn">确定</span>
          </li>
        </ul>
      </div>
    </fDialog>
  </div>
</template>
<script>
import fDialog from "@/components/attechment/dialog"
import { mapState } from 'vuex'
import { GetTargetTypeTree, GetSysSetList, GetPerformEvalTargets, PostUpdateTargetType, PostUpdateTargets, GetPerformEvals, UpdatePerformEvals } from '@/api/systemSetting/dataSafe'
export default {
  name: 'PerformEvals',
  props: {
    disabled: { type: Boolean, }
  },
  computed: {
    ...mapState({
      menuButton: state => state.user.menubutton,
      orglist: state => state.user.orglist,
      orgid: state => state.user.orgid,
      orgcode: state => state.user.orgcode,
      ucode: state => state.user.usercode
    })
  },
  data () {
    return {
      options: [],//指标类别列表

      targetTypeShow: false,//显示类型弹窗
      targetType: false,//新增or修改
      targetName: '',//新增修改类型的名字
      org: {},//当前组织
      typeList: [],//类型列表
      infoList: [],//绩效指标列表
      deleteList: [],//删除的列表
      type: {},//当前类型
      typeProps: {
        children: 'Children',
        label: 'FName'
      },
      defaultProps: {
        children: 'children',
        label: 'OName'
      }
    }
  },
  mounted () {
    if (this.ucode == "Admin") {
      this.org = this.orglist[0]
      this.org.orgid = this.org.PhId;
      this.$nextTick(this.orgTreeShow)
    } else {
      this.org.OCode = this.orgcode;
      this.org.orgid = this.orgid;

    }

    this.refresh();

  },
  methods: {
    refresh () {

      this.getTargetClasses();
      this.getType();

    },
    //获取类型
    getType () {
      let data = {
        orgid: this.org.orgid,
        orgCode: this.org.OCode
      }

      GetTargetTypeTree(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox(res.Msg)
        } else {
          res.FCode = '0000'
          this.typeList = [res]  //sb  wgg  一会对象一会数组
          if (this.typeList[0].Children.length) {

            this.type = this.typeList[0].Children[0]

            this.$nextTick(this.typeTreeShow);//类型tree高亮
            this.getData();
          } else {
            this.type = this.typeList[0]
          }

        }
      }).catch(err => {
        console.log(err)
        this.$msgBox('获取绩效类型失败!')
      })
    },
    //获取指标信息列表
    getData () {
      let data = {
        orgid: this.org.orgid,
        orgCode: this.org.OCode,
        TargetTypeCode: this.type.FCode
      }
      GetPerformEvalTargets(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)
        } else {
          this.infoList = res.Data
          this.deleteList = []
        }
      }).catch(err => {
        console.log(err)
        this.$msgBox.error('获取指标信息列表失败!')
      })
    },
    //修改指标信息列表
    UpdateTargets () {
      let list = this.infoList.concat(this.deleteList);

      let data = {
        orgid: this.org.orgid,
        orgCode: this.org.OCode,
        infoData: list
      }
      PostUpdateTargets(data).then(res => {
        this.$msgBox.show(res.Msg)
        if (res.Status == 'success') {
          this.$emit('refresh');
        }
      }).catch(err => {
        console.log(err)
        this.$msgBox.show('修改指标信息失败!')
      })
    },
    orgTreeShow () {//组织树高亮
      this.$refs.orgtree.setCurrentNode({ OCode: this.orglist[0].OCode });
    },
    typeTreeShow () {//类型树高亮
      this.$refs.typetree.setCurrentNode({ FCode: this.type.FCode });
    },
    //选择组织
    orgChange (val) {
      this.org = val;
      this.org.orgid = this.org.PhId;

      this.getType();
    },
    //组织树样式
    rendercontent (h, { node, data, store }) {

      let cssname = ''
      if (node.data.WeChatId == 'false') {
        cssname = 'disableOrg'
      }
      return (
        <span class={cssname}>
          <span>{node.label}</span>

        </span>);
    },
    //指标类别
    getTargetClasses () {
      let data = {
        orgid: this.$store.state.user.orgid,
        uid: this.$store.state.user.userid,
        //uid:266190618000001,
        DicType: 'TargetClasses'
      }
      GetSysSetList(data).then(res => {
        if (res.Status == 'error') {
          this.$msgBox.error(res.Msg)

        } else {
          this.options = res.Record

        }
      }).catch(err => {
        console.log(err)
        this.$msgBox.error('获取指标类别失败!')
      })
    },
    //显示类型新增修改弹窗
    targetUpdateShow (str) {

      if (str == 'add') {
        this.targetName = ''
        this.targetTypeShow = true;
      } else if (str == 'update') {
        this.targetName = this.type.FName;
        this.targetTypeShow = true;
      } else if (str == 'delete') {
        this.targetTypeAdd = str
        this.$confirm('此操作将永久删除该申报，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelBtnText: '取消',
          type: 'warning'
        }).then(() => { this.targetUpdate() })
      }
      this.targetTypeAdd = str

    },
    targetUpdate () {

      let str = this.targetTypeAdd
      if (str == 'add') {
        let data = {
          orgid: this.orgid,
          orgcode: this.orgcode,
          fname: this.targetName,
          PersistentState: 1

        }
        this.$refs.typetree.append(data, this.type);
      } else if (str == 'update') {
        this.type.FName = this.targetName;
        this.type.PersistentState = 2
      } else if (str == 'delete') {
        this.type.PersistentState = 3
      }
      let info = {
        orgid: this.orgid,
        orgcode: this.orgcode,
        infoData: this.typeList[0]      }
      PostUpdateTargetType(info).then(res => {

        this.$msgBox.show(res.Msg);
        this.targetTypeShow = false;

        this.$emit('refresh');

      }).catch(err => {
        console.log(err)
        this.$msgBox.error('保存数据出错!')
      })
      console.log(this.typeList, this.type)
    },
    //选择类型
    typeChange (val) {
      this.type = val
      this.getData();
    },
    addInfo (index) {
      let row = {
        "FTargetCode": "",
        "FTargetName": "",
        "FTargetContent": null,
        "FTargetValue": "",
        "FTargetWeight": "",
        "FTargetDescribe": "",
        "FTargetClassCode": "",
        "FTargetTypeCode": this.type.FCode,
        "FIfCustom": 0,
        "Orgid": this.org.orgid,
        "Orgcode": this.org.OCode,
        "FTargetClassName": "",
        "FTargetTypeName": this.type.FName,
      }
      if (index == 0) {
        this.$emit('disableUpdate', false)
      }
      this.infoList.splice(
        index + 1,
        0,
        row
      )

    },
    deleteInfo (n, item) {
      if (item.PhId) {
        item.PersistentState = 3;
        this.deleteList.push(item);
      }
      this.infoList.splice(n, 1)

    }
  },
  components: {
    fDialog
  }
}
</script>
<style lang="scss" scoped>
.PerformEvals {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  position: relative;
  padding: 0 0 0 10px;
  > div {
    display: inline-block;
    height: 100%;
    border: 1px solid $borderColor_ccc;
  }
  .orgTreeCon {
    width: 215px;
    font-size: 0.15rem;
    overflow: auto;
  }
  .PerformEvalsType {
    width: 20%;
    min-width: 215px;
    height: 100%;
    padding-bottom: 30px;
    overflow: hidden;
    position: relative;
    .treeCon {
      height: 100%;
      overflow: auto;
    }
    .handleBtn {
      height: 30px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      > div {
        width: 100%;
        margin: 0 auto;
        text-align: center;
        > div {
          display: inline-block;
          cursor: pointer;
          margin-left: 15px;
          font-size: 0.14rem;
          > span {
            position: relative;
            top: 2px;
          }
          > img {
            width: 20px;
            vertical-align: middle;
          }
          &.typeAdd {
            color: $btnColor;
          }
          &.typeUpdate {
            color: #ff9900;
          }
          &.typeDelete {
            color: #8e8e8e;
            > img {
              width: 25px;
            }
          }
        }
      }
    }
  }
  .infoList {
    width: 79%;
    min-width: 810px;
    border: 0;
    height: 100%;
    overflow: hidden;
  }
  .list {
    position: relative;

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
          width: 13%;
        }
        &:nth-of-type(3) {
          width: 12%;
        }
        &:nth-of-type(4) {
          width: 15%;
        }
        &:nth-of-type(5) {
          width: 20%;
        }
        &:nth-of-type(6) {
          width: 10%;
        }
        &:nth-of-type(7) {
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
    padding-bottom: 77px;
  }
  .listBody {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 25px;
    height: 100%;
    > ul {
      position: relative;
      height: 40px;
      > li {
        overflow: hidden;
      }
      &.update {
        > li:last-of-type {
          display: none;
          position: absolute;
          width: 25px;
          height: 40px;
          right: -25px;
          top: 0px;
          border: 0;
          > div {
            height: 19px;
            width: 20px;
            margin: 0 auto;
            cursor: pointer;
            &:last-of-type {
              margin-top: 1px;
            }
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      &.update:hover > li:last-of-type {
        display: block;
      }
    }
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
}
.auditTypeAdd {
  width: 450px;
  .typelist {
    > li {
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
      > div {
        float: left;
        width: 75%;
        &:first-of-type {
          width: 20%;
        }
        > div {
          width: 100%;
        }
      }
    }
  }
  .btnCon {
    > span {
      width: 70px;
      margin-right: 10px;
    }
  }
}
.handleBtn {
  text-align: right;
  padding-right: 80px;
  margin-top: 7px;
  > span {
    margin-left: 20px;
  }
}
</style>
<style lang="scss">
.PerformEvals {
  .disableOrg {
    color: $orgdisabled;
  }
}
</style>

