<template>
  <div class="projectManage">
    <topHandle :title="'项目管理在线工作平台'"
               @refresh="refresh">

    </topHandle>
    <div class="container">
      <div class="pageNav">
        <div class="project">
          <div class="navTitle">
            <div>
              <div><img src="@/assets/images/xmgl.png"
                     alt=""></div>
              <div>项目管理</div>
            </div>

          </div>
          <div class="navlistCon">
            <ul class="navlist">
              <li @click="routerTo('/preBuildProject')">
                <div><img src="@/assets/images/yulix.png"
                       alt=""></div>
                <div>预立项</div>
              </li>
              <li>
                <div><img src="@/assets/images/xmlix.png"
                       alt=""></div>
                <div>项目立项</div>
              </li>
              <li @click="routerTo('/projectList')">
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
          <div class="leftArr arrowShow">
            <i class="el-icon-d-arrow-right"
               @click.stop="arrowFn(false,0)"></i>
          </div>
          <div class="rightArr arrowShow">
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
              <li>
                <div><img src="@/assets/images/nztz.png"
                       alt=""></div>
                <div>年中调整</div>
              </li>
              <li>
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
          <div class="leftArr arrowShow">
            <i class="el-icon-d-arrow-right"
               @click.stop="arrowFn(false,1)"></i>
          </div>
          <div class="rightArr arrowShow">
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
export default {
  name: 'projectManage',
  mounted () {

  },
  methods: {
    refresh () {

    },
    routerTo (str) {
      this.$router.push({ path: str })
    },
    arrowFn (arrow, type) {
      let list, navlistCon, mixin, left, base;
      base = 230;
      mixin = arrow ? 1 : -1;
      list = document.querySelectorAll('.pageNav .navlistCon .navlist')[type];
      navlistCon = document.querySelectorAll('.pageNav .navlistCon ')[type];
      left = list.style.marginLeft ? parseFloat(list.style.marginLeft) : 0;
      let width = window.getComputedStyle(navlistCon).width;
      if (arrow) {
        list.style.marginLeft = (left > -230 ? 0 : base * mixin + left) + 'px';
      } else {
        list.style.marginLeft = ((left > 230 * 3 - parseFloat(width) && 230 * 3 - parseFloat(width) < -230) ? base * mixin + left : parseFloat(width) - 230 * 4 - 30) + 'px'
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
    topHandle
  }
}
</script>

<style lang="scss" scoped>
.projectManage {
  .container {
    text-align: center;
    .pageNav {
      display: inline-block;
      vertical-align: middle;
      width: 80%;
      height: 470px;
      font-size: 0.25rem;
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
    .leftArr,
    .rightArr {
      position: absolute;
      top: 105px;
      width: 40px;
      height: 40px;
    }
    .leftArr {
      left: -40px;
      animation: da 1s infinite linear;
    }
    .rightArr {
      right: -50px;
      transform: rotate(0deg);
    }
    @media screen and (max-width: 1530px) {
      .leftArr,
      .rightArr {
        display: block;
      }
    }
  }
  .navTitle {
    float: left;
    width: 20%;
    padding: 10px;
    // min-width: 250px;
    height: 230px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    > div {
      width: 100%;
      height: 100%;
      box-shadow: 0 0 10px #888;
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
    float: left;
    width: 80%;
    height: 250px;

    display: inline-block;

    overflow: hidden;
  }
  .navlist {
    height: 230px;
    padding: 10px;
    white-space: nowrap;
    transition: all 0.2s linear;
    color: $btnColor;
    > li {
      display: inline-block;
      width: 220px;
      height: 100%;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
      margin-right: 10px;
      box-shadow: 0 0 5px #ccc;
      &:hover {
        box-shadow: 0 0 5px $btnColor;
      }
      > div {
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
  display: none;
  transform: rotate(180deg);
  transition: all 0.3s linear;
  cursor: pointer;
}
.arrowShow {
  font-size: 33px;
  text-shadow: -2px 0 4px red;
  color: #fff;
  transition: all 0.3s linear;
  animation: ad 1s infinite linear;
  cursor: pointer;
}
.arrowShow:hover {
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

