<template>
  <div class="projectManage">
    <topHandle :title="'项目管理在线工作平台'"
               @refresh="refresh">

    </topHandle>
    <div class="container">
      <div class="pageNav">
        <div class="project">
          <div class="navTitle">
            <div><img src="@/assets/images/xmgl.png"
                   alt=""></div>
            <div>项目管理</div>
          </div>
          <ul class="navlist">
            <li>
              <div><img src=""
                     alt=""></div>
              <div>预立项</div>
            </li>
            <li>
              <div><img src=""
                     alt=""></div>
              <div>项目立项</div>
            </li>
            <li>
              <div><img src=""
                     alt=""></div>
              <div>项目查询</div>
            </li>
            <li>
              <div><img src=""
                     alt=""></div>
              <div>汇总统计</div>
            </li>
          </ul>
        </div>
        <div class="report">
          <div class="navTitle">
            <div><img src="@/assets/images/ysgl.png"
                   alt=""></div>
            <div>预算管理</div>
          </div>
          <ul class="navlist">
            <li>
              <div><img src=""
                     alt=""></div>
              <div>年初申报</div>
            </li>
            <li>
              <div><img src=""
                     alt=""></div>
              <div>年中调整</div>
            </li>
            <li>
              <div><img src=""
                     alt=""></div>
              <div>预算报表</div>
            </li>
            <li>
              <div><img src=""
                     alt=""></div>
              <div>进度控制</div>
            </li>
          </ul>
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
    min-width: 250px;
    height: 100%;
    background: $btnColor;
    color: #fff;
    text-align: center;
    > div {
      height: 170px;
      line-height: 170px;
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
  .navlist {
    float: left;
    // width: 80%;
    height: 100%;
    display: inline-block;
    white-space: nowrap;
    > li {
      float: left;
      width: 220px;
    }
  }
}
</style>

