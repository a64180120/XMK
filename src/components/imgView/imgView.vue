<template>
  <section class="img-view" @click.stop="fn()">
    <div class="img-body" @mouseenter="enter()" @mouseleave="leave()">
      <img :src="nowImg">
      <div class="img-mask" v-show="maskShow">
        <div class="icon-btn">
          <div class="icon icon-play" @click="imgPlay()">
            <i class="el-icon-video-play"></i>
          </div>
          <div class="icon icon-download">
            <a :href="nowImg" download>
              <i class="el-icon-download"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="img-nav">
      <div class="prev" @click="prevImg">
        <i class="el-icon-d-arrow-left"></i>
      </div>
      <div id="img-main" class="img-main">
        <div class="nav-body" :style="{left:nowMoveLength+'px'}">
          <div
            class="nav-item"
            v-for="(item,idx) in images"
            :class="[idx ===activeIdx ?'active':'']"
          >
            <img @click="clickImg(item,idx)" :src="item.path" alt="图片">
          </div>
        </div>
      </div>
      <div class="next" @click="nextImg">
        <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <div class="img-read" v-if="isPlay">
      <img :src="nowImg" title>
      <i class="el-icon-close close" @click="closeRead()"></i>
    </div>
  </section>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import { stringify } from 'querystring'
export default {
  name: 'imgView',
  props: {
    images: {
      type: Array,
      default: function() {
        return [
          {
            path: require('@/assets/test.jpg'),
            name: 'name'
          }
        ]
      }
    },
    nowIdx:{
      type: Number,
      default:0
    }
  },
  data() {
    return {
      img: [],
      activeItem: Number,
      activeIdx: this.nowIdx, //默认显示第一个
      imgDialog: false,
      width: '100%',
      nowImg: this.images[this.nowIdx].path,
      maxMoveLength: 0, //最大移动距离
      nowMoveLength: 0, //当前移动距离
      maskShow: false, //遮罩层是否隐藏
      isPlay: false
    }
  },
  watch:{
    images(val){
      this.nowImg = val[this.nowIdx].path
    },
  },
  mounted() {
    //默认预览第一个
    this.nowImg = this.images[this.nowIdx].path
  },
  methods: {
    fn(){},
    //左移动图片列表
    prevImg() {
      if (this.nowMoveLength < 0) {
        this.nowMoveLength = this.nowMoveLength + 114
      }
    },
    //右移动图片列表
    nextImg() {
      let imgLeight = this.images.length - 5
      if (imgLeight >= 0) {
        this.maxMoveLength = 94 * imgLeight
      } else {
        this.maxMoveLength = 0
      }
      if (Math.abs(this.nowMoveLength) < this.maxMoveLength) {
        this.nowMoveLength = this.nowMoveLength - 114
      }
    },
    //列表获取当前点击的图片
    clickImg(item, idx) {
      this.activeIdx = idx
      this.activeItem = item
      this.nowImg = item.path
    },
    //鼠标移入预览
    enter() {
      this.maskShow = true
    },
    //鼠标移出预览
    leave() {
      this.maskShow = false
    },
    //放大预览
    imgPlay() {
      this.isPlay = true
    },
    //关闭阅览
    closeRead() {
      this.isPlay = false
    }
  }
}
</script>

<style scoped lang="scss">
.images {
  height: 400px;
  padding: 50px;
}

.img-view {
  width: 100%;
  position: relative;
  > .img-body {
    width: 100%;
    height: 310px;
    background-color: #e3e3e3;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    > .img-mask {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(115, 115, 115, 0.6);
      z-index: 0;
      > .icon-btn {
        width: 200px;
        height: 50px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        > .icon {
          color: #00b7ee;
          width: 50px;
          height: 50px;
          background-color: #ffffff;
          text-align: center;
          border-radius: 25px;
          display: inline-block;
          > i {
            line-height: 50px;
            font-size: 0.4rem;
          }
          > a {
            > i {
              line-height: 50px;
              font-size: 0.4rem;
            }
          }
        }
        > .icon-play {
          margin-right: 10px;
          &:hover {
            cursor: pointer;
          }
        }
        > .icon-download {
          margin-left: 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    > img {
      /*max-width:100%;*/
      /*max-height: 100%;*/
      width: 100%;
      height: 310px;
      object-fit: contain;
    }
  }
  > .img-nav {
    margin-top: 25px;
    > .prev {
      display: inline-block;
      vertical-align: middle;
      width: 50px;
      height: 100px;
      cursor: pointer;
      margin: 0 10px;
      /*background-color:#00b7ee;*/
      &:hover {
        color: #409eff;
        /*background:linear-gradient(to left,rgba(96,110,112,0.8),rgba(96,110,112,0));*/
      }
      > i {
        font-stretch: condensed;
        font-size: 0.48rem;
        line-height: 100px;
      }
    }
    > .img-main {
      width: 570px;
      height: 130px;
      padding: 10px 0;
      vertical-align: middle;
      display: inline-block;
      white-space: nowrap;
      overflow-x: hidden;
      overflow-y: hidden;
      transition: all 0.5s;
      position: relative;
      > .nav-body {
        position: absolute;
        transition: all 0.8s;
        > .nav-item {
          width: 94px;
          height: 105px;
          display: inline-block;
          margin: 0 10px 0 10px;
          background-color: #e3e3e3;
          /*box-shadow: 0 1px 6px 2px rgba(227,227,227,0.6);*/
          border-radius: 2px;
          border: 2px solid rgba(227, 227, 227, 0.6);
          transition: all 0.5s;
          position: relative;
          cursor: pointer;
          > img {
            width: 90px;
            height: 101px;
            object-fit: contain;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
          }
          &:hover {
            transform: scale(1.05);
            box-shadow: 0px 0px 4px 0px #747575;
            border: 2px solid rgba(227, 227, 227, 0.8);
          }
        }
      }
    }
    > .next {
      display: inline-block;
      vertical-align: middle;
      width: 50px;
      height: 50px;
      cursor: pointer;
      margin: 0 10px;
      &:hover {
        color: #409eff;
        /*background:linear-gradient(to left,rgba(96,110,112,0.8),rgba(96,110,112,0));*/
      }
      > i {
        font-stretch: condensed;
        font-size: 0.48rem;
      }
    }
  }
  > .img-read {
    width: 75%;
    height: 90%;
    position: fixed;
    background-color: #e3e3e3;
    top: 5%;
    left: 10%;
    z-index: 9999;
    > .close {
      font-size: 0.24rem;
      position: absolute;
      right: 5px;
      top: 5px;
      &:hover {
        cursor: pointer;
      }
    }
    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.active {
  transform: scale(1.05);
  box-shadow: 0px 0px 4px 0px #747575;
  border: 2px solid rgba(227, 227, 227, 0.8);
}
</style>
<style>
/*修改图片预览内部样式*/
.img-view .viewer-backdrop {
  background-color: #ffffff;
}
.img-view .viewer-backdrop .viewer-footer .viewer-navbar {
  background-color: #ffffff;
}
.img-view .viewer-backdrop .viewer-footer .viewer-navbar ul {
  width: 180px;
}
.img-view .viewer-backdrop .viewer-footer .viewer-navbar ul li {
  width: 50px;
}
.img-view .viewer-player {
  background-color: #eaeaea;
}
</style>
