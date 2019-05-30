<template>
    <div class="bankaccount">
        <topHandle :title="'银行账户档案在线工作平台'" @refresh="refresh">
            <div class="btnCon">
                <div @click.stop="showAccountAdd('add')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/xz.png" alt=""></div>
                    新增
                </div>
                <div @click.stop="showAccountAdd('update')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
                    修改
                </div>
                <div class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj3.png" alt=""></div>
                    删除
                </div>
            </div>
        </topHandle>
        <div class="container">
            <order :type="'handle'"  ref="order"/>
        </div>
        <el-dialog :title="'银行账号'+(handleBtn=='add'?'新增':'修改')" :visible.sync="accountAddShow">
            <accountAdd @add-cancle="addCancle" :type="handleBtn" :info="info"></accountAdd>
        </el-dialog>
    </div>
</template>


<script>
import accountAdd from '@/pages/bankaccount/add'
import topHandle from '@/components/topNav/topHandle'
import order from '@/components/bankorder'

export default {
    name:'bankaccount',
    data(){
        return{ 
            handleBtn:'',
            accountAddShow:false,
            info:''
        }
    },
    methods:{
        refresh(){
            this.$refs.order.getData();
        },
        showAccountAdd(val){
            this.handleBtn=val;
            if(val=='update'){
                 this.info=this.$refs.order.choosedItem[0];
                 this.info.OCode=this.info.OrgCode;
                 this.info.FLifecycle=this.info.FLifecycle==0?'0':'1';
                 console.log(this.info);
            }else{
                this.info={FLifecycle:'1'};
            }
            this.accountAddShow=true;
        },
        addCancle(){
            console.log(1111)
            this.accountAddShow=false;
            this.refresh();
        }
    },
    mounted(){
        
    },
    components:{
        topHandle,
        order,
        accountAdd
    }
}
</script>

<style lang="scss" scoped>
.bankaccount{
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
        .topIcon{
            height:60%;
            >img{
                height:100%;
            }
        }
    }
}

</style>

<style>
.bankaccount .el-dialog{
        text-align: left;
        min-width: 560px;
    }
 .bankaccount   .el-dialog__body {
     padding-top:0;
   

}
</style>
