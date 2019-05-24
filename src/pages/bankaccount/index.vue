<template>
    <div class="bankaccount">
        <topHandle :title="'银行账户档案在线工作平台'" @refresh="refresh">
            <div class="btnCon">
                <div @click.stop="showAuditAdd('add')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/xz.png" alt=""></div>
                    新增
                </div>
                <div @click.stop="showAuditAdd('update')" class="handle">
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
            <order ref="order"/>
        </div>
    </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
import order from '@/components/bankorder'

export default {
    name:'bankaccount',
    data(){
        return{

        }
    },
    methods:{
        refresh(){

        }
    },
    mounted(){
        
    },
    components:{
        topHandle,
        order,
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
