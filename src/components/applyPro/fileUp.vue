<template>
  <div  id="fileupload">
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
      <div class="el-upload__tip" slot="tip"> <span @click="$emit('succe',returnList)" class=" btn" slot="tip" style="width: 120px">添加到上传列表</span></div>

      <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button size="small" type="success" @click="$emit('succe',returnList)">完成</el-button>-->
    </el-upload>
  </div>
</template>

<script>
  import Vue from 'vue'
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
        }
      },
      mounted(){
          console.log(this.ind);
        this.filelist=[];
          if(this.ind.pro.QtAttachments){
            for(var i=0; i<this.ind.pro.QtAttachments.length ; i++){
              let file={
                name:this.ind.pro.QtAttachments[i].BName,
                url:this.ind.pro.QtAttachments[i].BUrlpath
              }
              this.filelist.push(file)
            }
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
        submitUpload(){
          this.$refs.upload.submit();
        },
        beforeUp(file,fileList){},
        handlePreview(file){
        },
        handleRemove(file,fileList){
          let param={BUrlPath:file.url};
          this.postAxios('GQT/QtAttachmentApi/PostDeleteFile',param).then(res=>{
            for(var i in this.filelist){
              if(this.filelist[i].url=file.url);
              this.filelist.splice(i,1);
              this.returnList.splice(i,1);
            }
          }).catch(err=>{
            console.log(err);
          })
        }
      },
    }
</script>

<style scoped>

</style>
