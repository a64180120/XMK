<template>
    <div v-show="visible" class="dialogCon msFixed" style="z-index:99;">
        <div class="fDialog">
            <p class="title">
                <span>{{title}}</span>
                <i @click="close"></i>
            </p>
            <div class="content">
                <slot></slot>    
            </div> 
        </div>        
    </div>
</template>

<script>
export default {
    name:"fDialog",
    props:{
        title:{
            type:String,
            default:'标题'
        },
        visible:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:'50%'
        },
        callback:{}  //回调函数
    },
    mounted(){
        this.$nextTick(this.dialogWidth);
    },
    methods:{
        close(){
            if(this.callback){
                this.callback();
            }
            this.$emit('update:visible',false);
        },
        dialogWidth(){
            if(this.width){
                let dialog=document.querySelector('.fDialog');
                console.log(dialog.style)
                dialog.style.maxWidth=this.width;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.dialogCon{
    top:0;
    left:0;
    right:0;
    bottom:0;
    text-align: center;
    background: rgba(0,0,0,0.5);
    .fDialog{
        display: inline-block;
        vertical-align: middle;
        background:#fff;
        border-radius: 5px;
        box-shadow: 0 0  9px #3294e894;
        padding:10px;
        .title{
            position: relative;
            text-align: left;
            font-size:0.2rem;
            height:30px;
            line-height: 30px;
            padding:0 5px;
            border-bottom:1px solid #ccc;
            >i{
                position: absolute;
                width:30px;
                height:30px;
                top:0px;
                right:0px;
                cursor:pointer;
                background:url(../../assets/images/close.svg);
                background-size:100% 100%;
            }
        }
        .content{
            min-height:100px;
            overflow: hidden; 
        }
    }
    &:after{
        content:"";
        display: inline-block;
        vertical-align: middle;
        width:0;
        height:100%;
    }
}

</style>
