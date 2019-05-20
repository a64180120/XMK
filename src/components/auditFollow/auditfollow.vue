<template>
    <div v-show="visible" class="auditfollow msFixed">
        <p class="title">
            <span>{{title}}</span>  
            <i @click="close"></i>  
        </p>
        <div class="content">
            <ul>
                <li></li>
                <li class="msg" v-for="(item,index) of auditMsg" :key="index">
                    <audit-msg :info="item" :index="index+1"></audit-msg>
                </li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
import auditMsg from './auditMsg'
export default {
    name:"auditfollow",
    props:{
        title:{
            type:String,
            default:'审批流查看'
        },
        visible:{  //控制显示隐藏
            type:Boolean,
            default:true
        },
        auditMsg:{
            type:Array,
            default(){
                return [{
                    name:'王刚',
                    time:'2019-04-25T14:00',
                    att:'附件1',
                    msg:'不同意'
                    },{
                    name:'金晶',
                    time:'2019-04-25T17:00',
                    att:'附件2',
                    msg:'同意'
                }]
            }
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        close(){
            this.$emit('update:visible',false);
        }
    },
    components:{
        auditMsg
    }
}
</script>

<style lang="scss" scoped>
.auditfollow{
    right:0;
    top:0;
    bottom:0;
    width:230px;
    z-index: 99;
    background: #fff;
    box-shadow: -4px 1px 9px #3294e894;
    .title{
        text-align: center;
        color:#fff;
        font-size:0.2rem;
        height:40px;
        line-height: 40px;
        background:$primaryColor;
        position: relative;
        >i{
            position: absolute;
            width:30px;
            height:30px;
            top:5px;
            right:10px;
            cursor:pointer;
            background:url(../../assets/images/delete.svg);
            background-size:100% 100%;
        }
    }
    .content{
        padding:50px 10px 10px 30px;
        >ul{
            >li{
                border-left:1px solid $btnColor;
                &:first-of-type{
                    height:50px;
                }
                &:last-of-type{
                    height:150px;
                }
            }
            .msg{
                padding-bottom:40px;
            }
        }
    }
}
</style>

