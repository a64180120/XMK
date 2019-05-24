<template>
    <div class="dictionary">
        <topHandle>
            <div class="btnCon">
                <div @click.stop="showAuditAdd('update')" class="handle">
                    <div class="topIcon"><img src="@/assets/images/zj2.png" alt=""></div>
                    修改
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
                <ul>
                    <li>序号</li>
                    <li>类型编码</li>
                    <li>类型名称</li>
                    <li>备注</li>
                    <li>启用/停用</li>
                </ul>   
            </div>
        </div>
    </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
export default {
    name:'dictionary',
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
    }
}
</style>
