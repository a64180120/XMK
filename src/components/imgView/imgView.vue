<template>
    <section class="img-view">
        <viewer :options="options"
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

<style scoped>
  .images{
    height:400px;
    padding: 50px;
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
