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

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
export default {
  name: 'projectManage',
  methods: {
    refresh () {

    },
    routerTo (str) {
      this.$router.push({ path: str })
    }
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
      height: 500px;
      font-size: 0.25rem;
      > div {
        height: 50%;
        padding: 10px 0;
        text-align: left;
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
  .project {
  }
  .report {
  }
  .navTitle {
    float: left;
    width: 20%;
    padding: 10px;
    // min-width: 250px;
    height: 100%;
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
    height: 100%;

    display: inline-block;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .navlist {
    height: 100%;
    padding: 10px;
    white-space: nowrap;
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
</style>

