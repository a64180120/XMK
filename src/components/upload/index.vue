<template>
    <div  id="fileupload" :class="{active:filelist.length>0}">
        <el-upload
        ref='upload'
        class="upload-demo"
        drag
        :on-change="progress"
        :file-list="files"
        action=""
        :auto-upload="false"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
        <!-- <div class="el-upload__tip" slot="tip"> <span @click="clear" class=" btn" slot="tip">点击上传</span>&nbsp;&nbsp;文件大小不超过500kb </div> -->
        <div class="el-upload__tip" slot="tip"> <span @click="submit" class=" btn" slot="tip" style="width: 120px">确认上传</span><!--&nbsp;&nbsp;文件大小不超过500kb --></div>

        </el-upload>
        <ul class="fileHandle">
            <li :title="file.name" @mouseenter="picView(file)"  @mouseleave="picpreview=''" v-for="(file,index) of filelist">
                {{file.name}}
                <i @click="clear(index)" class="el-icon-close"></i>
            </li>
            
        </ul>
        <div class="preview" v-if="picpreview"><img :src="picpreview" alt=""></div>
    </div>

</template>

<script>
    import lrz from 'lrz'
    export default {
        name: "upload",
        prop:{
            file:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                filelist:[],
                files:[],
                picpreview:'',
            }
        },
        methods:{
            progress(file,filelist){
                let vm = this;
                this.filelist=filelist;
                
                console.log(file)
            },
            picView(file){
                let vm = this;
                if((file.raw.type === 'image/png') || (file.raw.type === 'application/pdf') || (file.raw.type === 'image/gif') || (file.raw.type === 'image/jpeg')){
                    lrz(file.raw, { width: 480 }).then(function(rst) {
                        vm.picpreview=rst.base64;
                    
                        return rst;
                    })
                }else{
                    vm.picpreview='';
                }
                
            },

            submit(){
              this.$emit('submit',this.filelist)
              //this.filelist = []
                // return this.filelist;
            },
            clear(index){  //清空文件列表
                this.picpreview='';
                this.$refs.upload.clearFiles();
                this.filelist.splice(index,1);
                this.files=JSON.parse(JSON.stringify(this.filelist));
            }
        },
        watch:{
            file(val){
                if(val){
                    this.files=val;
                }
            }
        }
    }
</script>

<style lang="scss" scope>
#fileupload{
    width:370px;
    height:240px;
    text-align: left;
    position:relative;
    &.active{
        width:640px;
    }
    >div.preview:last-of-type{
        width:480px;
        height:auto;
        img{
            width:100%;
            height:auto;
            position: absolute;
            top:-100px;
            right:270px;
            border:1px solid #eee;
        }
    }
}
.submit{

}
.fileHandle{
    display: inline-block;
    width:250px;
    position:relative;
    height:100%;
    overflow-y: auto;
    >li{
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover{
            background:#eee;
        }
       
        >i{
            float:right;
            margin-top:8px;
        }
    }
    
}
</style>
<style lang="scss" >

.upload-demo{
    width:370px;
    display: inline-block;
    .el-upload-list,.el-upload-list--text{
        display: none;
    }
}
</style>

