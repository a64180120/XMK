<template>
    <div class="auditTypeAdd">
        <ul class="typelist">
            <li>
                <div>审批类型</div>
                <div><el-input maxlength="10" v-model="auditType.TypeName" placeholder="请输入审批类型,10个字以内(必填)"></el-input></div>
            </li>
            <li>
                <div>单据类型</div>
                <div>
                     <el-select :disabled="typeinfo.Issystem==1" v-model="orderType" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.Value"
                        :label="item.label"
                        :value="item.Value">
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
import {PostAddProcType,PostUpdateProcType} from '@/api/systemSetting/audit'
export default {
    name:'auditTypeAdd',
    props:{
        type:{
            type:String,
            default:'add'
        },
        typeinfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            orderType:'001',
            auditType:{TypeCode:'',TypeName:''},
            options:[
                {Value:'001',label:'资金拨付单'},
                {Value:'002',label:'支付单'},
                {Value:'003',label:'项目用款单'},
                {Value:'004',label:'预算审核单'},
                {Value:'005',label:'项目申报单'}
            ]
        }
    },
    watch:{
    },
    created(){
        this.updateInfo();
    },
    methods:{

        //修改
        updateInfo(){
            let val =this.typeinfo;
            if(val){
                this.orderType=val.Value;
                this.auditType.TypeName=val.TypeName;
                this.auditType.TypeCode=val.TypeCode;   
            }
        },
        update(){  //保存
            let data={
                "BillType":this.orderType,
                "ApprovalTypeName":this.auditType.TypeName,
                "ApprovalTypeCode":this.auditType.TypeCode,
                ApprovalTypeId:this.typeinfo.PhId,
                "Orgid":this.$store.state.user.orgid,
                "OrgCode":this.$store.state.user.orgcode
            }
            this.fnType(this.typeinfo.PhId,data).then(res=>{
                if(res.Status=="error"){
                    this.$msgBox.error(res.Msg);
                }else{
                    this.$msgBox.show('保存成功!')
                    this.$emit('add-cancle',true);
                }
            }).catch(err=>{
                this.$msgBox.error('保存失败!')
            })
        },
        fnType(bool,data){
            if(bool){
              return  PostUpdateProcType(data)
            }else {
              return  PostAddProcType(data)
            }
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


