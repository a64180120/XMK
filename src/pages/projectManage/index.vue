<template>
  <div class="projectManage">
    <topHandle :title="'预算项目管理在线工作平台'"
               :approvalSum='approvalSum'
               @refresh="refresh">

    </topHandle>
    <div class="container">
      <div class="pageNav">
        <div class="project">
          <div v-if="MenuButton.projectmanage ==='True'"
               class="navTitle">
            <div>
              <div><img src="@/assets/images/xmgl.png"
                     alt=""></div>
              <div>项目管理</div>
            </div>

          </div>
          <div class="navlistCon">
            <ul class="navlist">
              <li v-if="MenuButton.ProjectMstList_Vue ==='True'"
                  @click="routerTo('/preBuildProject')">
                <div><img src="@/assets/images/yulix.png"
                       alt=""></div>
                <div>预立项</div>
              </li>
              <li v-if="MenuButton.ProjectMstList2_Vue ==='True'"
                  @click="routerTo('/projectBuild')">
                <div><img src="@/assets/images/xmlix.png"
                       alt=""></div>
                <div>项目立项</div>
              </li>
              <li v-if="MenuButton.ProjectMstList3_Vue ==='True'"
                  @click="routerTo('/projectList')">
                <div><img src="@/assets/images/xmcx.png"
                       alt=""></div>
                <div>项目查询</div>
              </li>
              <li>
                <div><img src="@/assets/images/hztj.png"
                       alt=""></div>
                <div>汇总统计</div>
              </li>
            </ul>
          </div>
          <div v-show="proArr"
               class="leftArr arrowShow">
            <i class="el-icon-d-arrow-right"
               @click.stop="arrowFn(false,0)"></i>
          </div>
          <div v-show="proArr"
               class="rightArr arrowShow">
            <i class="el-icon-d-arrow-right"
               @click.stop="arrowFn(true,0)"></i>
          </div>
        </div>
        <div class="report">
          <div class="navTitle">
            <div>
              <div><img src="@/assets/images/ysgl.png"
                     alt=""></div>
              <div>预算管理</div>
            </div>

          </div>
          <div class="navlistCon">
            <ul class="navlist">
              <li @click="routerTo('/yearreport')">
                <div><img src="@/assets/images/ncsb.png"
                       alt=""></div>
                <div>年初申报</div>
              </li>
              <li @click="routerTo('/midyearDeclare')">
                <div><img src="@/assets/images/nztz.png"
                       alt=""></div>
                <div>年中调整</div>
              </li>
              <li @click="routerTo('/buggetreport')">
                <div><img src="@/assets/images/ysbb.png"
                       alt=""></div>
                <div>预算报表</div>
              </li>
              <li @click="routerTo('/progresscontrol')">
                <div><img src="@/assets/images/jdkz.png"
                       alt=""></div>
                <div>进度控制</div>
              </li>
            </ul>
          </div>
          <div v-show="repArr"
               class="leftArr arrowShow">
            <i class="el-icon-d-arrow-right"
               @click.stop="arrowFn(false,1)"></i>
          </div>
          <div v-show="repArr"
               class="rightArr arrowShow">
            <i class="el-icon-d-arrow-right"
               @click.stop="arrowFn(true,1)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
import { mapState } from 'vuex'
export default {
  name: 'projectManage',
  data () {
    return {
      approvalSum: {
        status: true,
        sum: 0
      },
      proArr: false,//项目箭头
      repArr: false,//预算箭头
    }
  },
  computed: {
    ...mapState({
      OrgCode: state => state.user.orgcode,
      UserId: state => state.user.userid,
      Orgid: state => state.user.orgid,
      Year: state => state.user.year,
      MenuButton: state => state.user.menubutton,
    })
  },
  mounted () {
    let vm = this;
    this.getProcTypes()
    this.updateTitle();
    this.$nextTick(this.arrowShow)
    window.addEventListener('resize', vm.arrowShow)
  },
  beforeDestroy () {
    let vm = this;
    window.removeEventListener('resize', vm.arrowShow)
  },
  methods: {
    //修改title
    updateTitle () {
      let title = document.getElementsByTagName('title')[0];
      title.innerText = "预算项目管理在线工作平台";
    },
    //获取审批类型，获取为审批数
    getProcTypes () {
      let data = {
        Uid: this.UserId,
        Orgid: this.Orgid,
        OrgCode: this.OrgCode,
        Year: this.Year
      }
      this.getAxios('/GSP/GAppvalRecord/GetRecordListNum', data).then(res => {
        for (let i in res.Data) {
          this.approvalSum.sum += res.Data[i].NNum
        }
        console.log(res)
      }).catch(err => {

      })
    },
    refresh () {

    },
    routerTo (str) {

      this.$router.push({ path: str })
    },
    //箭头显示
    arrowShow () {
      let pro, rep, con, conW, proW, repW;
      con = document.querySelector('.pageNav .navlistCon');//项目容器
      pro = document.querySelectorAll('.pageNav .navlistCon .navlist')[0];//项目
      rep = document.querySelectorAll('.pageNav .navlistCon .navlist')[1];//预算

      conW = window.getComputedStyle(con).width;
      proW = window.getComputedStyle(pro).width;
      repW = window.getComputedStyle(rep).width;
      console.log(conW, proW, repW)
      if (parseFloat(conW) >= parseFloat(proW)) {
        this.proArr = false;
      } else {
        this.proArr = true;
      }
      if (parseFloat(conW) >= parseFloat(repW)) {
        this.repArr = false;
      } else {
        this.repArr = true;
      }

    },
    //箭头左右移动
    arrowFn (arrow, type) {

      let list, navlistCon, mixin, left, base, childrenLength;
      base = 235;
      mixin = arrow ? 1 : -1;
      list = document.querySelectorAll('.pageNav .navlistCon .navlist')[type];
      navlistCon = document.querySelectorAll('.pageNav .navlistCon ')[type];
      childrenLength = navlistCon.children[0].children.length;
      left = list.style.marginLeft ? parseFloat(list.style.marginLeft) : 0;
      let width = window.getComputedStyle(navlistCon).width;
      if (arrow) {
        list.style.marginLeft = (left > -base ? 0 : base * mixin + left) + 'px';
      } else {

        if (childrenLength * base + left <= parseFloat(width) + base) {
          list.style.marginLeft = parseFloat(width) - childrenLength * base - 25 + 'px'
          return;
        } else {
          list.style.marginLeft = left - base + 'px'

        }
      }


    }
    // hasScrollbar () {
    //   let navlist = document.querySelector('.pageNav .navlistCon .navlist');
    //   let father = navlist.parentNode;
    //   let width = window.getComputedStyle(navlist).width;
    //   let arrs = document.getElementsByClassName('arrowShow')

    //   if (father.scrollWidth > parseFloat(width)) {
    //     console.log(arrs, arrs[0])
    //     for (let arr of arrs) {
    //       console.log(arr)
    //       arr.style.display = 'block';
    //     }
    //   }
    //   console.log(father.scrollWidth, width)
    // }
  },
  components: {
    topHandle,
  }
}
</script>

<style lang="scss" scoped>
.projectManage {
  .container {
    overflow: hidden;
    text-align: center;
    .pageNav {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 90%;
      height: 470px;
      font-size: 0.25rem;
      padding-left: 60px;
      > div {
        height: 230px;
        margin-bottom: 10px;
        text-align: left;
        position: relative;
      }
    }
    &:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 100%;
    }
  }

  .project,
  .report {
    width: 100%;
    padding-left: 240px;
    padding-right: 60px;
    position: relative;
    .leftArr,
    .rightArr {
      position: absolute;
      top: 80px;
    }
    .leftArr {
      left: -70px;
      animation: da 1s infinite linear;
    }
    .rightArr {
      right: 0px;
      transform: rotate(0deg);
    }
    // @media screen and (max-width: 1530px) {
    //   .leftArr,
    //   .rightArr {
    //     display: block;
    //   }
    // }
  }
  .navTitle {
    float: left;
    width: 240px;
    padding: 10px;
    // min-width: 250px;
    // margin-right: 10px;
    position: absolute;
    top: 0;
    left: 0;
    height: 230px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    > div {
      width: 100%;
      height: 100%;
      box-shadow: 6px 0 10px #888;
      border-radius: 3px;
      overflow: hidden;
      > div {
        height: 160px;
        line-height: 160px;
        background: $btnColor;
        > img {
          vertical-align: middle;
          width: 100%;
          max-width: 120px;
          max-height: 120px;
          height: 100%;
        }
      }
      > div:nth-of-type(2) {
        background: $btnColor;
        height: 50px;
        line-height: 50px;
      }
    }
  }
  .navlistCon {
    width: 100%;
    height: 250px;
    white-space: nowrap;
    display: inline-block;
    position: relative;
    overflow: hidden;
  }
  .navlist {
    height: 230px;
    padding: 10px;
    white-space: nowrap;
    transition: all 0.2s linear;
    color: $btnColor;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s ease;
    > li {
      display: inline-block;
      // float: left;
      font-size: 0;
      margin-bottom: 50px;
      width: 220px;
      height: 100%;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
      margin-right: 15px;
      // box-shadow: 0 0 5px #ccc;
      &:hover {
        box-shadow: 0 0 5px $btnColor;
      }
      > div {
        font-size: 0.25rem;
        height: 160px;
        line-height: 160px;
        > img {
          vertical-align: middle;
          width: 100%;
          max-width: 120px;
          max-height: 120px;
          height: 100%;
        }
      }
      > div:nth-of-type(2) {
        height: 50px;
        line-height: 50px;
      }
    }
  }
}

.arrowShow {
  // display: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transform: rotate(180deg);
  transition: all 0.3s linear;
  cursor: pointer;
}
.arrowShow {
  font-size: 60px;
  text-shadow: -2px 0 4px $btnColor;
  color: $btnColor;
  transition: all 0.3s linear;
  animation: ad 1s infinite linear;
  cursor: pointer;
}
.arrowShow:hover,
.projectManage .project .leftArr:hover,
.projectManage .report .leftArr:hover {
  animation: none;
}

//箭头左右移动动效
@keyframes ad {
  0% {
    margin-right: 0px;
  }
  25% {
    margin-right: 4px;
  }
  50% {
    margin-right: 8px;
  }
  75% {
    margin-right: 4px;
  }
  100% {
    margin-right: 0px;
  }
}
@keyframes da {
  0% {
    margin-left: 0px;
  }
  25% {
    margin-left: 4px;
  }
  50% {
    margin-left: 8px;
  }
  75% {
    margin-left: 4px;
  }
  100% {
    margin-left: 0px;
  }
}
</style>

