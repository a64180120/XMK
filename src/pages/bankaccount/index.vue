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
                <div @click.stop="deleteRow" class="handle">
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
import {BankAccountDelete} from '@/api/bankaccount'
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
        //刷新
        refresh(){
            this.$refs.order.getData();
        },
        //新增修改
        showAccountAdd(val){
            this.handleBtn=val;
            if(val=='update'){
                 this.info=this.$refs.order.choosedItem[0];
                 if(!this.info){
                    this.$msgBox.show('请选择一行数据!')
                    return;
                }
                if(this.$refs.order.choosedItem.length>1){
                    this.$msgBox.show('请只选择一行数据!')
                    return;
                }
                 this.info.OCode=this.info.OrgCode;
                 this.info.FLifecycle=this.info.FLifecycle==0?'0':'1';
                 this.info.PersistentState=2;
            }else{
                this.info={FLifecycle:'1',PersistentState:1};
            }
            this.accountAddShow=true;
        },
        //关闭新增修改窗口
        addCancle(val){
            this.accountAddShow=false;
            if(val){
                this.refresh();
            }
            
        },
        //删除行
        deleteRow(){
            let info=JSON.parse(JSON.stringify(this.$refs.order.choosedItem));
            let data={infoData:[]};
            if(info.length==0){
                this.$msgBox.show('请选择一行数据!')
                return;
            }
            this.$confirm('此操作将永久删除该流程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(()=>{
                    info.map(inf=>{
                        data.infoData.push(inf.PhId);
                    })
                    BankAccountDelete(data).then(res=>{
                        this.$msgBox.show(res.Msg);
                        this.refresh();      
                    }).catch((err)=>{
                        console.log(err);
                        this.$msgBox.show('删除数据失败!')
                    })
                })
      
            
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
