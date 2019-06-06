<template>
    <section class="img-view">
        <viewer v-if="false" :options="options"
                :images="images"
                @inited="inited"
                class="images"
                :style="{width:width}"
                ref="viewer"
        >
          <template slot-scope="scope">
            <img   src="../../assets/images/sj2.png"  style="display: none">
            <img   src="../../assets/images/by.png"  style="display: none">
            <img   src="../../assets/logo.png"  style="display: none">
          </template>
        </viewer>


      <div class="img-body">
        <img src="../../assets/test.jpg">
      </div>
      <div class="img-nav">
        <div class="prev" @click="prevImg">
          <span></span>
        </div>
        <ul id="img-main">
          <li  class="img-content" v-for="(item,idx) in images">
            <img src="../../assets/test.jpg" alt="图片">
          </li>
        </ul>
        <div class="next" @click="nextImg">
          <span></span>
        </div>
      </div>
    </section>
</template>

<script>
    import 'viewerjs/dist/viewer.css'
    import Viewer from 'v-viewer/src/component.vue'
    import {stringify} from 'querystring'
    export default {
        name: "imgView",
      components:{Viewer},
      props:{
          images:{
            type:Array,
            default:function () {
              return [{
                path:'../../assets/test.jpg',
                name:'name'
              },{
                path:'../../assets/test.jpg',
                name:'name'
              },{
                path:'../../assets/test.jpg',
                name:'name'
              },{
                path:'../../assets/test.jpg',
                name:'name'
              },{
                path:'../../assets/test.jpg',
                name:'name'
              },{
                path:'../../assets/test.jpg',
                name:'name'
              }]
            }
          },
      },
      data(){
          return{
            img:[],
            activeItem:Number,
            imgDialog:false,
            options:{
              navbar:true,
              inline:true,
              transition:true,
              button:false,
              title:false
            },
            width:'100%',
            listLeight:Number
          }
      },
      mounted(){
      },
      methods:{
          inited(viewer){

            this.$viewer = viewer;
            this.$refs.viewer = viewer;
            this.$emit('getViewer',viewer)
          },
        show(){
            this.$nextTick(()=>{
              const vuer = this.$el.querySelector('.images').viewer
              vuer.show()
            })

        },
        prevImg(){
          let scrollLeft = document.getElementById('img-main')
          // console.log(scrollLeft.scrollLeft)
          this.$nextTick(()=>{
            scrollLeft.scrollLeft = 0
          })
          console.log(document.getElementById('img-main').scrollLeft)
        },
        nextImg(){

          let scrollLeft = document.getElementById('img-main')
          // console.log(scrollLeft.scrollLeft)
          this.$nextTick(()=>{
            for (let i=0;i<50;i++) {
                scrollLeft.scrollLeft = i
            }
          })
          console.log(document.getElementById('img-main').scrollLeft)
        }
      }
    }
</script>

<style scoped lang="scss">
  .images{
    height:400px;
    padding: 50px;
  }

  .img-view{
    .img-body{
      width: 100%;
      height: 300px;
      background-color: #e3e3e3;
      display: flex;
      justify-content: center;
      align-items: center;
      >img{
        /*max-width:100%;*/
        /*max-height: 100%;*/
        width: 100%;
        height: 300px;
        object-fit: contain;

      }
    }
    >.img-nav{
      margin-top: 25px;
      >.prev{
        display: inline-block;
        vertical-align: middle;
        width: 50px;
        height: 50px;
        cursor: pointer;
        margin: 0 10px;
        background-color:#00b7ee;
        &:hover{
          /*background:linear-gradient(to left,rgba(96,110,112,0.8),rgba(96,110,112,0));*/
        }
        >span{
          position: relative;
          &:before{
            content:'';
            display: inline-block;
            width: 20px;
            height: 10px;
            transform: skewY(-45deg);
            background-color: #eee;
            position: absolute;
            top: 10px;
            left: 10px;
          }
          &:after{
            content:'';
            display: inline-block;
            width:  20px;
            height: 10px;
            transform: skewY(45deg);
            background-color: #eee;
            position: absolute;
            top: 30px;
            left: 10px;
          }
        }
      }
      >ul{
        width: 570px;
        height: 80px;
        padding: 10px 0;
        vertical-align: middle;
        display: inline-block;
        white-space: nowrap;
        overflow-x: hidden;
        overflow-y: hidden;
        transition: all 0.5s;
        >li{
          width: 94px;
          height: 55px;
          display: inline-block;
          margin: 0 10px 0 10px;
          background-color: #E3E3E3;
          box-shadow: 0 1px 6px 2px rgba(227,227,227,0.6);
          border-radius: 2px;
          border: 2px solid rgba(227,227,227,0.6);
          transition: all 0.5s;
          position: relative;
          cursor: pointer;
          >img{
            max-width: 66px;
            max-height: 51px;
          }
          &:hover{
            transform: scale(1.05);
            box-shadow: 0 1px 8px 4px rgba(227,227,227,0.8);
            border:2px solid rgba(227,227,227,0.8); ;
          }
        }
      }
      >.next{
        display: inline-block;
        vertical-align: middle;
        width: 50px;
        height: 50px;
        cursor: pointer;
        margin: 0 10px;
        background-color:#00b7ee;
        &:hover{
          /*background:linear-gradient(to left,rgba(96,110,112,0.8),rgba(96,110,112,0));*/
        }
        >span{
          position: relative;
          &:before{
            content:'';
            display: inline-block;
            width: 20px;
            height: 10px;
            transform: skewY(45deg);
            background-color: #eee;
            position: absolute;
            top: 10px;
            left: 10px;
          }
          &:after{
            content:'';
            display: inline-block;
            width:  20px;
            height: 10px;
            transform: skewY(-45deg);
            background-color: #eee;
            position: absolute;
            top: 30px;
            left: 10px;
          }
        }
      }
    }
  }
</style>
<style>
  /*修改图片预览内部样式*/
  .img-view .viewer-backdrop{
    background-color: #ffffff;
  }
  .img-view  .viewer-backdrop .viewer-footer .viewer-navbar{
    background-color: #ffffff;
  }
  .img-view  .viewer-backdrop .viewer-footer .viewer-navbar ul{
    width: 180px;
  }
  .img-view  .viewer-backdrop .viewer-footer .viewer-navbar ul li{
    width: 50px;
  }
  .img-view .viewer-player{
    background-color: #eaeaea;
  }
</style>
