<template>
  <div class="handleBtnCon msFixed" style="z-index: 9;">
    <!-- <div style="z-index:9" v-show="orgTreeShow" class="model" @click.stop="orgTreeShow=false"> -->

    <!-- </div> -->
    <div class="handleBtn">
      <p>{{title}}</p>
      <div class="btnContainer">
        <ul class="rightBtn">
          <li v-if="auditBtn" @click.stop="auditPage">
            <div>
              <img src="@/assets/images/zj6.png" alt>
            </div>
            <span>审批中心</span>
          </li>
          <li @click.stop="refresh">
            <div>
              <img src="@/assets/images/sx.png" alt>
            </div>
            <span>刷新</span>
          </li>
          <li @click.stop="goHome">
            <div>
              <img src="@/assets/images/g-1.png" alt>
            </div>
            <span>主目录</span>
          </li>
        </ul>
        <slot></slot>
      </div>
    </div>
    <div class="orgInfo">
      <div v-if="countBtn" class="count">
        <img src="@/assets/images/3_03.png" alt>
        <span>当前在线人数:</span>
        <span class="num">23</span>
      </div>
      <div>
        <span class="mr-2">年度:</span>
        <el-select style="width:100px" @change="yearChange" v-model="year" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="orgSelect clear">
        <span class="fl mr-2">单位:</span>
        <div @click.stop="orgTreeShow" class="fl">
          <el-popover width="300" placement="bottom" :popper-class="'maxH'" trigger="click">
            <el-tree
              ref="orgtree"
              node-key="OCode"
              :highlight-current="true"
              :props="defaultProps"
              
              :default-expanded-keys="[org.OCode]"
              :data="orgList"
              :expand-on-click-node="false"
              @node-click="orgChange"
            ></el-tree>
            <p  slot="reference" class="orgName">{{orgname}}</p>
          </el-popover>
          <!-- <p @click="orgTreeInit" class="orgName">{{orgName}}</p>
          <div v-show="orgTreeShow" class="treeCon" style="z-index:9;">
            <el-tree
              ref="orgtree"
              node-key="label"
              :props="defaultProps"
              :data="orgList"
              :expand-on-click-node="false"
              @node-click="orgChange"
              >
          </el-tree>-->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import  {organizeTree} from '@/api/organize'
    import {mapState} from 'Vuex'
    export default {
        name: "topHandle",
        props:{
            auditBtn:{ //审批中心
              type:Boolean,
              default:false
            },
            countBtn:{  //在线人数
              type:Boolean,
              default:false
            },
            title:{
              type:String,
              default:'资金拨付在线工作平台'
            },

        },
        data(){
          return {
            options: [],//年度列表    
            year: new Date().getFullYear(),//年度
            org:{ //当前组织
               "OCode": "101",
               "OName": "浙江省总本级",
            },
            defaultProps: {
              children: 'children',
              label: 'OName'
            }
          }
        },
        computed:{
            ...mapState({
                  orgList: state=>state.user.orglist,
                  orgcode: state=>state.user.orgcode,
                  orgname: state=>state.user.orgname,
            })
        },
        mounted(){   
            //this.getOrganize();
             this.setyearList();
        },
        methods:{
          orgTreeShow(){//组织树显示
            this.$refs.orgtree.setCurrentNode({OCode:this.orgcode});
          },
          goHome(){  //回首页
            window.open('/g6h/web','_self')
          },
          setyearList(){ //年度列表
            for(let y=2018;y<=new Date().getFullYear();y++){
              this.options.unshift({label:y,value:y})
            }
          },
          orgChange(val){ //组织改变
            //this.org=val;
            this.$store.commit('user/setOrganize',val);
            
            let p = document.querySelector('.handleBtnCon .orgName');
            p.click();
            this.refresh();
          },
           yearChange(){  //年度改变
            this.refresh();
          },
          auditPage(){  //审批中心
            this.$router.push('/approvalcenter')
          },
          refresh(){ //刷新
            this.$emit('refresh');
          },
          
        }
    }
</script>

<style lang="scss" scoped>
.handleBtnCon {
  position: fixed;
  top: 0;
  height: 150px;
  left: 0;
  right: 0;
  color: #676767;
  background: #fff;
}
.handleBtn {
  width: 100%;
  height: 110px;
  overflow: hidden;
  background: url(../../assets/images/bj.gif);
  box-shadow: 0px 1px 5px #959595;

  > p {
    width: 100%;
    text-align: center;
    font-weight: 600;
    color: #676767;
    font-size: 0.3rem;
  }
  .btnContainer {
    width: 100%;
    height: 60px;
    font-size: 0.14rem;
    margin-top:10px;
    position: relative;
    > div {
      margin: 0 auto;
    }
    .rightBtn {
      float: right;
      overflow: hidden;
      position: absolute;
      right: 20px;
      top: -2px; 
      > li {
        float: left;
        width: 60px;
        height: 50px;
        padding: 0;
        text-align: center;
        cursor: pointer;
        &:active {
          background: #ccc;
        }
        > div {
          text-align: center;
          > img {
            width: 28px;
            margin:2px 0 ;
          }
        }

        > span {
        }
      }
    }
  }
}
.orgInfo {
  height: 50px;
  padding: 10px 23px;
  font-size: 0.16rem;
  .count {
    float: left;
    img {
      height: 22px;
    }
    .num {
      color: red;
    }
  }
  > div {
    float: right;
    position: relative;
  }
  .treeCon {
    position: absolute;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
    padding: 3px;
    left: 0;
    top: 100%;

    min-width: 100px;
  }
  .orgSelect {
    height: 100%;
    margin-right: 20px;
    .fl {
      line-height: 30px;
    }
    > span {
      height: 100%;
      line-height: 30px;
    }
    > div {
      height: 100%;
      position: relative;
      > p {
        height: 100%;
        line-height: 30px;
      }
    }
    .orgName {
      cursor: pointer;
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.mr-2 {
  margin-right: 10px;
}
.model {
  position: fixed;
  position: -ms-page;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: none;
}
</style>
<style>
.handleBtnCon .btnContainer{
    font-size:0.14rem;
  }

.orgInfo .el-input--suffix .el-input__inner {
  height: 30px;
}
.orgInfo .el-input__icon {
  line-height: 30px;
}
.maxH {
  max-height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

