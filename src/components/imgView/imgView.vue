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
            <i class="el-icon-d-arrow-left"></i>
          </li>
          <li v-for="i in 5" class="img-item">
            <div class="img-bg">
              <img src="../../assets/test.jpg" alt="图片">
            </div>
          </li>
          <li class="next">
            <i class="el-icon-d-arrow-right"></i>
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
              return []
            }
          },
      },
      data(){
          return{
            imgDialog:false,
            options:{
              navbar:true,
              inline:true,
              transition:true,
              button:false,
              title:false
            },
            width:'100%'
          }
      },
      mounted(){
        // this.show()
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
        >li{
          margin: 0 10px;
        }
        >.img-item{
          width: 18%;
          >.img-bg{
            background-color: #eaeaea;
            width: 100%;
            height: 55px;
            >img{
              width: 100%;
              height: 55px;
              object-fit: contain;
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
