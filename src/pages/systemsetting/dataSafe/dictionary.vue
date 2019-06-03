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
                    <li @click="selectType(type)" :class="{active:type.DicType==selected.DicType}" v-for="(type,ind) of typeList" :key="ind">{{type.DicName}}</li>
                </ul>
            </div>
            <div v-if="selected.DicType=='PayMethod'" class="content">
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
                        <div v-if="typeInfoList.length==0">请添加类型</div>
                        <ul :class="{update:!disabled}" v-for="(item,n) of typeInfoList" :key="n">
                            <li>{{n+1}}</li>
                            <li>
                                <div v-show="disabled">{{item.TypeCode}}</div> 
                                <div v-show="!disabled">
                                    <el-input v-model="item.TypeCode" placeholder="请输入类型编码"></el-input>
                                </div>
                            </li>
                            <li>
                                <div v-show="disabled">{{item.TypeName}}</div>
                                <div v-show="!disabled">
                                    <el-input v-model="item.TypeName" placeholder="请输入类型名称"></el-input>
                                </div>
                            </li>
                            <li>
                                <div v-show="disabled">{{item.Bz}}</div>
                                <div v-show="!disabled">
                                    <el-input v-model="item.Bz" placeholder="请输入备注"></el-input>
                                </div>
                            </li>
                            <li class="enable">
                                <div v-show="disabled">
                                    <img v-show="item.Isactive=='0'" src="@/assets/images/gou.svg" alt="">
                                    <img v-show="item.Isactive=='1'" src="@/assets/images/cha.svg" alt=""> 
                                </div>
                                <div v-show="!disabled">
                                    <el-radio v-model="item.Isactive" :label="0">启用</el-radio>
                                    <el-radio v-model="item.Isactive" :label="1">停用</el-radio>
                                </div> 
                                <div class="icon active">
                                    <div @click="addInfo(n)">
                                        <img src="@/assets/images/jia.png" alt="">
                                    </div>
                                    <div @click="deleteInfo(n,item)">
                                         <img src="@/assets/images/jian.png" alt="">
                                    </div>
                                </div>   
                            </li>
                        </ul>
                    </div>
                    
                </div>
                   
            </div>
            <div v-else-if="selected.DicType=='DxbzCode'" class="content">
                <div class="codeCon">
                    <span>对下补助代码: </span>
                    
                    <div><el-input :disabled="disabled" placeholder="请输入补助代码" v-model="Value"></el-input>   </div>
                </div>        
            </div>
        </div>
    </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
import {GetSysSetList,dictionarySave} from '@/api/systemSetting/dataSafe'
export default {
    name:'dictionary',
    data(){
        return{
            disabled:true,//不可编辑,修改
            Value:'',//对下补助代码
            typeList:[
              

                {   DicType: 'PayMethod',
                    DicName: '支付方式',
                    
                }  ,
                {   DicType: 'DxbzCode',
                    DicName: '对下补助代码维护',
                }],//字典类型列表
            typeInfoList:[
            ],//类型信息列表
            deleteList:[],//删除的数据
            selected:{   
                    DicType: 'PayMethod',
                    DicName: '支付方式',
                }
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            let data={
                DicType: this.selected.DicType
            }
            GetSysSetList(data).then(res=>{
                if(res.Status=='error'){
                    this.$msgBox.show(res.Msg)
                }else{
                    this.typeInfoList=res.Record;
                    this.Value=res.Record[0].Value;
                    this.typeInfoList.map(info => info.PersistentState=2)
                }
            }).catch(err=>{
                this.$msgBox.show('获取数据失败!')
            })
        },
        update(){
            this.typeInfoList[0].Value=this.Value;
            let arr=this.typeInfoList.concat(this.deleteList);
            let data={
                infoData:arr
            }
            dictionarySave(data).then(res=>{
                if(res.Status=='error'){
                    this.$msgBox.show(res.Msg)
                }else{
                    this.disabled=true;
                    this.getData();
                }
            }).catch(err=>{
                this.$msgBox.show('修改失败!')
            })
        },
        selectType(type){
            this.selected=type;
            this.disabled=true;
            this.getData();
        },
        //类型信息新增
        addInfo(index){
            this.typeInfoList.splice(index+1,0,{DicType:"PayMethod",Isactive:0,PersistentState:1,DicName:'支付方式'})
        },
        //类型信息删除
        deleteInfo(index,item){
            if(this.typeInfoList.length>1){
                if(item.PhId){
                    item.PersistentState=3;
                    this.deleteList.push(item);
                }
                this.typeInfoList.splice(index,1);
            }
        }
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
        top:160px;  
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
            background: #83C350;
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
        .codeCon{
            padding-left:50px;
            text-align: left;
            font-size:0.16rem;
            >div{
                width:50%;
                display: inline-block;
            }
            >span{
                display: inline-block;
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

