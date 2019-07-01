<template>
    <div  id="fileupload">
        <el-upload
        ref='upload'
        class="upload-demo"
        drag
        :on-change="progress"
        :file-list="filelist"
        action=""
        :auto-upload="false"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
        <!-- <div class="el-upload__tip" slot="tip"> <span @click="clear" class=" btn" slot="tip">点击上传</span>&nbsp;&nbsp;文件大小不超过500kb </div> -->
        <div class="el-upload__tip" slot="tip"> <span @click="submit" class=" btn" slot="tip" style="width: 120px">添加到上传列表</span><!--&nbsp;&nbsp;文件大小不超过500kb --></div>

        </el-upload>
    </div>

</template>

<script>
    export default {
        name: "upload",
        data(){
            return {
                filelist:[]
            }
        },
        methods:{
            progress(file,filelist){
                this.filelist=filelist
            },
            submit(){
              this.$emit('submit',this.filelist)
              //this.filelist = []
                // return this.filelist;
            },
            clear(){  //清空文件列表
                this.$refs.upload.clearFiles();
                this.filelist=[];
            }
        }
    }
</script>

<style lang="scss" scope>
.submit{

}
</style>
