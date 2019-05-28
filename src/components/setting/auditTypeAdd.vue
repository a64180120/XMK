<template>
    <div class="auditTypeAdd">
        <ul class="typelist">
            <li>
                <div>审批类型</div>
                <div><el-input maxlength="10" v-model="auditType" placeholder="请输入审批类型,10个字以内(必填)"></el-input></div>
            </li>
            <li>
                <div>单据类型</div>
                <div>
                     <el-select v-model="orderType" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </li>
            <li class="btnCon">
                <span @click.stop="$emit('add-cancle')" class="whiteBtn">取消</span>
                <span @click="update" class="btn">确定</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'auditTypeAdd',
    props:{
        type:{
            type:String,
            default:'add'
        }
    },
    data(){
        return{
            orderType:'',
            auditType:'',
            options:[
                {value:'1',label:'资金拨付单'},
                {value:'2',label:'支付单'},
                {value:'3',label:'项目用款单'},
                {value:'4',label:'预算审核单'},
                {value:'5',label:'项目申报单'}
            ]
        }
    },
    methods:{
        update(){  //保存
            this.$msgBox.show('保存成功!')
            this.$emit('add-cancle');
        }
    }
}
</script>

<style lang="scss" scoped>
.auditTypeAdd{
    width:450px;
    .typelist{
        >li{
            height:40px;
            line-height: 40px;
            margin-top:10px;
            >div{
                float:left;
                width:75%;
                &:first-of-type{
                    width:20%;
                }
                >div{
                    width:100%;
                }
            }
        }
    }
    .btnCon{
        >span{
            width:70px;
            margin-right:10px;
        }
    }
}
</style>
<style>
.typelist input {
    border:none;
    border-radius: 0;
    border-bottom:1px solid #ccc;
}
</style>


