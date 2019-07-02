<template>
  <div  id="fileupload" :class="{active:filelist.length>0}">
    <el-upload
      ref='upload'
      class="upload-demo"
      drag
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="filelist"
      :before-upload="beforeUp"
      :on-change="progress"
      action="fileUp"
      :http-request="loadFile"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
      <div class="el-upload__tip" slot="tip"> <span @click="$emit('succe',returnList)" class=" btn" slot="tip" style="width: 120px">确认上传</span></div>

      <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button size="small" type="success" @click="$emit('succe',returnList)">完成</el-button>-->
    </el-upload>
    <ul v-show="filelist.length>0" class="fileHandle">
      <li
        :title="file.name"
        @mouseenter="picView(file)"
        @mouseleave="picpreview=''"
        v-for="(file,index) of filelist"
      >
        {{file.name}}
        <i @click="handleRemove(file)" class="el-icon-close"></i>
      </li>
    </ul>
    <div class="preview" v-if="picpreview">
      <img :src="picpreview" alt>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { baseURL } from '@/utils/config.js'
    export default {
        name: "fileUp",
      props:{
          ind:{
            type:Object,
            default:function(){
              return {}
            }
          }
      },
      data(){
        return {
          filelist:[],
          returnList:[],
          picpreview: ''
        }
      },
      mounted(){
          console.log(this.ind);
        this.filelist=[];
          if(this.ind.pro.QtAttachments){
            for(var i=0; i<this.ind.pro.QtAttachments.length ; i++){

              this.ind.pro.QtAttachments[i]['name']=this.ind.pro.QtAttachments[i].BName;
              this.ind.pro.QtAttachments[i]['url']=this.ind.pro.QtAttachments[i].BUrlpath
            }
            this.filelist=this.ind.pro.QtAttachments;
            this.returnList=this.ind.pro.QtAttachments;
          }
      },
      methods:{
        loadFile(param){
          let fromData = new FormData();
          fromData.append('file',param.file);
          Vue.prototype.formAxios('GQT/QtAttachmentApi/PostUploadFileBk',fromData).then(res=>{
            if(res.Status=="success"){
              console.log(res);
              for(var i in this.filelist){
                if(this.filelist[i].name==res.Oldnames[0]){
                  this.filelist[i].url=res.Data[0].BUrlpath;
                  this.returnList[i]=res.Data[0];
                }
              }
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        progress(file,filelist){
          this.filelist=filelist;
          this.returnList.length=filelist.length;
        },
        beforeUp(file,fileList){},
        handlePreview(file){
        },
        picView(file) {
          console.log(file);
          let vm = this
          if(file.raw){
            if(
              file.raw.type === 'image/png' ||
              file.raw.type === 'application/pdf' ||
              file.raw.type === 'image/gif' ||
              file.raw.type === 'image/jpeg'
            ){
              vm.picpreview =baseURL.replace('/api', '')+ file.url;
            } else {
              vm.picpreview = ''
            }
          }else{
            if(file.BType.toLowerCase() === '.png' ||
              file.BType.toLowerCase() === '.pdf' ||
              file.BType.toLowerCase() === '.gif' ||
              file.BType.toLowerCase() === '.jpeg' ||
              file.BType.toLowerCase() === '.jpg'
            ){
                vm.picpreview =baseURL.replace('/api', '')+ file.url;
            } else {
              vm.picpreview = ''
            }
          }
          console.log(vm.picpreview);
        },
        handleRemove(file,fileList){
          let param={BUrlPath:file.url};
          this.postAxios('GQT/QtAttachmentApi/PostDeleteFile',param).then(res=>{
            for(var i in this.filelist){
              if(this.filelist[i].url=file.url);
              this.filelist.splice(i,1);
              this.returnList.splice(i,1);
            }
            this.picpreview='';
          }).catch(err=>{
            console.log(err);
          })
        }
      },
    }
</script>

<style lang="scss" scope>
  #fileupload {
    width: 370px;
    height: 240px;
    text-align: left;
    position: relative;
    &.active {
      width: 640px;
    }
    > div.preview:last-of-type {
      width: 480px;
      height: 480px;
      position: absolute;
      top: -100px;
      right: 270px;
      border: 1px solid #eee;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .submit {
  }
  .fileHandle {
    display: inline-block;
    width: 250px;
    height: 100%;
    overflow-y: auto;
    > li {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      padding-right: 20px;
      &:hover {
        background: #eee;
      }

      > i {
        position: absolute;
        right: 5px;
        top: 8px;
      }
    }
  }
</style>
<style lang="scss" >
  .upload-demo {
    width: 370px;
    display: inline-block;
    .el-upload-list,
    .el-upload-list--text {
      display: none;
    }
  }
</style>
