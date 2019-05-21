<template>
    <div class="auditAdd">
        <div class="title">
            <span class="active">流程信息</span>
            <span>岗位顺序</span>
            <span>启用条件</span>
        </div>
        <ul>
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

        <p class="statusBtn">
            <span>上一步</span>
            <span>下一步</span>
            <span>保存</span>
            <span>取消</span>
        </p>
    </div>
</template>

<script>
import fDialog from "@/components/attechment/dialog"
export default {
    name:'auditAdd',
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
            orglist:[]
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
            text-align: center;
            background: #ccc;
            position: relative;
            z-index: 9;
            &.active{
                background:#78B753;
                color:#fff;
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
            &:first-of-type{
                background:#ccc;
                color:#333;
            }
            &:nth-of-type(2){
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
}
</style>
