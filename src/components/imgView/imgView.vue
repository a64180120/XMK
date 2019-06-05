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
        <ul>
          <li class="prev">
            <i class="el-icon-d-arrow-left" @click="prevImg()"></i>
          </li>
          <li  class="img-content">
            <div class="img-main">
              <div class="img-item" v-for="(item,idx) in images">
                <div  class="img-bg" :class="[idx === 2?'active':'']">
                  <img src="../../assets/test.jpg" alt="图片">
                </div>
              </div>
            </div>
          </li>
          <li class="next">
            <i class="el-icon-d-arrow-right" @click="nextImg()"></i>
          </li>
        </ul>
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
          this.activeItem --
        },
        nextImg(){
          this.activeItem ++
          if (this.activeItem === 2 &&this.listLeight.length>4 ){
            for (let i in this.images){
              this.$set(this.img,i+this.activeItem-1,this.images[i+this.activeItem-1])
            }
          }
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
      >ul{
        list-style: none;
        text-align: left;
        height: 55px;
        display: flex;
        >.img-content{
          width: 100%;
          >.img-main{
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            >.img-item{
              margin: auto;
              white-space: normal;
              overflow: auto;
              display: inline-block;
              width: 20%;
              height: 55px;
              padding: 0 10px;
              .img-bg{
                width: 100%;
                background-color: #eaeaea;
                >img{
                  width: 100%;
                  height: 55px;
                  object-fit: contain;
                }
              }
              .active{
                background-color: #00b7ee;
              }
            }
          }
        }
        >.prev{
          width: 5%;
          >i{
            font-size: 0.32rem;
          }
        }
        >.next{
          width: 5%;
          font-size: 0.32rem;
          text-align: right;
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
