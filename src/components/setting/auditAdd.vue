<template>
    <div class="auditAdd">
        <div class="title">
            <span @click.stop="liucheng('1')" :class="{active:selected==1}">流程信息</span>
            <span @click.stop="liucheng('2')" :class="{active:selected==2}">岗位顺序</span>
            <span @click.stop="liucheng('3')" :class="{active:selected==3}">启用条件</span>
        </div>
        <ul v-show="selected=='1'">
            <li class="auditInfo clear">
                <div>审批类型</div>
                <div>
                    <el-select v-model="info.type" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>流程代码</div>
                <div>
                    <el-input v-model="info.code" placeholder="请输入内容"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>流程名称</div>
                <div>
                    <el-input v-model="info.name" placeholder="请输入内容"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>启用组织</div>
                <div>
                     <el-select v-model="info.org" placeholder="请选择">
                        <el-option
                        v-for="item in orglist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>备注</div>
                <div>
                    <el-input v-model="info.msg" placeholder="请输入内容"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>启用/停用</div>
                <div>
                     <el-radio v-model="info.enable" label="1">启用</el-radio>
                    <el-radio v-model="info.enable" label="2">停用</el-radio>
                </div>
            </li>
        </ul>
        <div class="post" v-show="selected=='2'">
            <p>审批岗位顺序设置</p>
            <ul class="listHead">
                <li>顺序</li>
                <li>审批岗位编码</li>
                <li>审批岗位名称</li>
                <li>是否会签</li>
            </ul>
            <div class="listCon">
                <ul v-for="(n) of 6" class="listContent">
                    <li>{{n}}</li>
                    <li>
                         <el-select v-model="post.org" placeholder="请选择">
                            <el-option
                            v-for="item in orglist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <el-input v-model="post.msg" placeholder="请输入内容"></el-input>
                    </li>
                    <li class="deleteIconCon">
                        <el-radio v-model="post.enable" label="1">是</el-radio>
                        <el-radio v-model="post.enable" label="2">否</el-radio>
                        <div class="icon active">
                            <div><img src="@/assets/images/jia.png" alt=""></div>    
                            <div><img src="@/assets/images/jian.png" alt=""></div>  
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="post condition" v-show="selected=='3'">
            <p>
                <el-checkbox v-model="season">单据金额</el-checkbox>
            </p>
            <div>
                <span>上限</span>
                <el-input v-model="post.msg" placeholder="请输入上限金额(选填)"></el-input>
                <span>元</span>
                <span style="margin-left:30px">下限</span>
                <el-input v-model="post.msg" placeholder="请输入下限金额(选填)"></el-input>
                <span>元</span>
            </div>
        </div>
        <p class="statusBtn">
            <span :class="{grey:selected=='1',green:selected=='2',yellow:selected=='3'}">上一步</span>
            <span :class="{grey:selected=='3',yellow:selected!='3'}">下一步</span>
            <span>保存</span>
            <span @click.stop="$emit('add-cancle')">取消</span>
        </p>
    </div>
</template>

<script>
import fDialog from "@/components/attechment/dialog"
export default {
    name:'auditAdd',
    props:{
        type:{
            type:String,
            default:'add'
        }
    },
    data(){
        return{
            options:[{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }],
            info:{

            },
            post:{

            },
            orglist:[],
            selected:1,
            season:''
        }    
    },
    methods:{
        liucheng(str){
            this.selected=str;
        }
    },
    components:{
        fDialog
    }
}
</script>

<style lang="scss" scoped>
.auditAdd{
    padding:10px;
    width:750px;
    .title{
        width:90%;
        margin:0 auto;
        height:30px;
        position: relative;
        text-align: left;
        >span{
            display: inline-block;
            border-radius: 5px;
            width:16%;
            height:100%;
            line-height:30px;
            margin-left:13%;
            cursor: pointer;
            text-align: center;
            background: #ccc;
            position: relative;
            z-index: 9;
            &.active{
                background:#78B753;
                color:#fff;
                cursor:default;
            }
        }
        &:after{
            content:"";
            position: absolute;
            width:100%;
            top:50%;
            left:0;
            height:1px;
            background: #ccc;
            
        }
    }
    .auditInfo{
        margin-top:10px;
        line-height: 40px;
        text-align: left;
        >div{
            float:left;
            &:first-of-type{
                width:15%;
                font-size:0.16rem;
                text-align: right;
            }
            &:last-of-type{
                width:82%;
                margin-left:3%;
                >div{
                    width:100%;
                }
            }
        }
    }
    .statusBtn{
        >span{
            display: inline-block;
            border-radius: 3px;
            width:70px;
            height:30px;
            line-height: 30px;
            margin-left:10px;
            cursor: pointer;
            &.grey{
                background:#ccc;
                color:#333;
                cursor: default;
            }
            &.green{
                background:#44A8BD; 
                color:#fff;  
            }
            &.yellow{
                background:#ff9900; 
                color:#fff;
            }
            &:nth-of-type(3){
                background:#1F6CFC; 
                color:#fff;
            }
            &:nth-of-type(4){
                background:#fff; 
                border:1px solid #1F6CFC;
                color:#1F6CFC;
            }
        }
    }
    .post{
        position:relative;
        height:290px;
        font-size:0.16rem;
        text-align: left;
        margin:10px 0px 0 20px;
        .listContent >li,.listHead >li{
            float:left;
            text-align: center;
            border:1px solid #ccc;
            border-width:0  1px 1px 0;
            height:40px;
            line-height: 40px;
            &:first-of-type{
                width:9%;
                border-left-width:1px ;
            }
            &:nth-of-type(2){
                width:35%;
            }
            &:nth-of-type(3){
                width:30%;
            }
            &:nth-of-type(4){
                width:25%;
                position: relative;
            }
        }
        .listHead{
            position:absolute;
            top:30px;
            left:0;
            right:-30px;
            height:40px;
            overflow-y: scroll;
            padding-right:20px;
            >li{
                border-top:1px solid #ccc;
                height:38px;

            }
            
        }
        .listCon{
            position:absolute;
            top:70px;
            left:0;
            right:-30px;
            bottom:0;
            height:200px;
            padding-right:20px;
            overflow-y: scroll;
        }
        .listContent{
            height:40px;
            &:hover{
                .deleteIconCon .active{
                    display: block;
                }
            }
            .deleteIconCon{
                position:relative;
                .icon{
                    display: none;
                    position:absolute;
                    top:0;
                    bottom:0;
                    right:-22px;
                    width:20px;
                    >div{
                        height:50%;
                        width:17px;
                        text-align: center;
                        >img{
                            width:100%;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
.condition{

}
</style>
<style>
    .listContent input{
        border:none;
    }
    .condition .el-input{
        width:30%;
    }
    .condition .el-input input{
        border:none;
        border-bottom:1px solid #ccc;
        border-radius: 0;
    }

</style>

