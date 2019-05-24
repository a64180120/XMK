<template>
    <div class="dictionary">
        <topHandle :title="'系统管理在线工作平台'">
            <div class="btnCon">
                <div v-show="disabled" @click.stop="disabled=false" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
                    修改
                </div>
                <div v-show="!disabled" @click.stop="update" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
                    保存
                </div>
                <div v-show="!disabled" @click.stop="getData();disabled=true;" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
                    取消
                </div>
            </div>
        </topHandle>
        <div class="container">
            <div class="type">
                <p>字典类型</p>
                <ul>
                    <li>支付方式</li>
                </ul>
            </div>
            <div class="content">
                <div class="list">
                    <div class="listHead">
                        <ul >
                            <li>序号</li>
                            <li>类型编码</li>
                            <li>类型名称</li>
                            <li>备注</li>
                            <li>启用/停用</li>
                        </ul>
                    </div>
                    
                </div>
                <div class="list listBodyCon">
                    <div class="listBody">
                        <ul :class="{update:!disabled}" v-for="n of 35">
                            <li>{{n}}</li>
                            <li>
                                <div v-show="disabled">类型编码</div> 
                                <div v-show="!disabled">
                                    <el-input v-model="test" placeholder="请输入类型编码"></el-input>
                                </div>
                            </li>
                            <li>
                                <div v-show="disabled">类型名称</div>
                                <div v-show="!disabled">
                                    <el-input v-model="test" placeholder="请输入类型名称"></el-input>
                                </div>
                            </li>
                            <li>
                                <div v-show="disabled">备注</div>
                                <div v-show="!disabled">
                                    <el-input v-model="test" placeholder="请输入备注"></el-input>
                                </div>
                            </li>
                            <li class="enable">
                                <div v-show="disabled">
                                    <img v-show="enable=='0'" src="@/assets/images/gou.svg" alt="">
                                    <img v-show="enable=='1'" src="@/assets/images/cha.svg" alt=""> 
                                </div>
                                <div v-show="!disabled">
                                    <el-radio v-model="enable" label="0">启用</el-radio>
                                    <el-radio v-model="enable" label="1">停用</el-radio>
                                </div> 
                                <div class="icon active">
                                    <div>
                                        <img src="@/assets/images/jia.png" alt="">
                                    </div>
                                    <div>
                                         <img src="@/assets/images/jian.png" alt="">
                                    </div>
                                </div>   
                            </li>
                        </ul>
                    </div>
                    
                </div>
                   
            </div>
        </div>
    </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
export default {
    name:'dictionary',
    data(){
        return{
            disabled:true,//不可编辑,修改
            enable:"0",
            test:'',
        }
    },
    methods:{
        getData(){
            console.log(222)
        },
    },
    components:{
        topHandle
    }
}
</script>

<style lang="scss" scoped>
.dictionary{
    .btnCon{

        .handle{
            display: inline-block;
            width: 60px;
            height: 50px;
            padding: 0px 0;
            cursor: pointer;
            &:active{
                background: #ccc;
            }
        }
    }
    .topIcon{
        height:60%;
        >img{
            height:100%;
        }
    }
    .container{
        left:200px;
        top:150px;  
        padding:1%; 
        padding-right:0;

    }
    .type{
        float:left;
        width:18%;
        height:100%;
        border:1px solid $borderColor_ccc;
        >p{
            height:40px;
            line-height: 40px;
            background: $btnColor;
            color:#fff;
            font-size:0.18rem;
            font-weight: 700;
        }
        >ul{
            padding:10px;
            font-size:0.16rem;
            >li{
                height:30px;
                line-height: 30px;
                margin-bottom:10px;
                border-radius: 8px;
                border:1px solid $borderColor_ccc;
                cursor:pointer;
                &:hover{
                    background: #ff9900;
                    color:#fff;
                    border-color:#ff9900;
                }
                &.active{
                    background: #ff9900;
                    color:#fff;
                     border-color:#ff9900;
                    cursor: default;
                }
            }
        }
    }
    .content{
        float:left;
        width:82%;
        height:100%;
        
        .list{
            position:relative;
            padding-left:17px;
            width:100%;
            &:after{
                position:absolute;
                top:0;
                bottom:0;
                right:0;
                width:17px;
                content:"";
                background:#fff;
            }
            ul{
               
                width:100%;
                >li{
                    float:left;
                    border:1px solid $borderColor_ccc;
                    border-width:0 1px 1px 0;
                    height:40px;
                    line-height: 40px;
                    &:first-of-type{
                        width:10%;
                        border-left:1px solid $borderColor_ccc;
                    }
                    &:nth-of-type(2){
                        width:20%;
                    }
                     &:nth-of-type(3){
                         width:20%;
                    }
                     &:nth-of-type(4){
                         width:30%;
                    }
                     &:nth-of-type(5){
                         width:20%;
                    }
                }
            }
            .listHead{
                overflow-y: scroll;
                padding-right:25px;
                
                font-size:0.18rem;
                color:#fff;
                >ul{
                  
                    height:100%;
                    >li{
                          background:$btnColor;
                        border-top:1px solid $borderColor_ccc;
                    }
                }
            }
        }
        .listBodyCon{
            height:100%;
            padding-bottom: 40px;
        }
        .listBody{        
            overflow-y: scroll;    
            padding-right:25px;
            height:100%;   
            .enable{
                position: relative;
                >div>img{
                    height:20px;
                    vertical-align: middle;
                }
                 >.icon{
                     display: none;
                    position: absolute;
                    right: -20px;
                    top: 0;
                    z-index: 999;
                    width: 20px;
                    padding-left: 5px;
                    height: 100%;
                    >div{
                        width:100%;
                        height:50%;
                        cursor: pointer;
                        >img{
                            width:100%;
                            height:16px;
                        }
                    }
                }
                
            } 
            ul.update:hover{
                .enable >.active{
                    display: block;
                }
            } 
        }
    }
}
</style>
<style>
.dictionary .listBody input{
    border:none;
    height: 100%;
}
</style>

