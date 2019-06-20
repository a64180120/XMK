<template>
  <div  id="fileupload">
    <el-upload
      ref='upload'
      class="upload-demo"

      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="filelist"
      :before-upload="beforeUp"
      :on-change="progress"

      action="fileUp"
      :http-request="loadFile"
      multiple>
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button size="small" type="success" @click="$emit('succe',returnList)">完成</el-button>
      <div class="el-upload__tip" slot="tip"> <!--<span @click="submit" class=" btn" slot="tip">点击上传</span>-->&nbsp;&nbsp;文件大小不超过500kb </div>

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
                name:this.ind.pro.QtAttachments[i].BUrlpath.replace('/UpLoadFiles/BkPayment/',''),
                url:this.ind.pro.QtAttachments[i].BUrlpath
              }
              this.filelist.push(file)
            }
            this.returnList=this.filelist;
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
            console.log(res);
            console.log(this.filelist);
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
