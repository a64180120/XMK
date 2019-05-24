<template>
    <div class="paypassword">
        <topHandle :title="'系统管理在线工作平台'">
        </topHandle>
        <div class="container">
            <div>
                <paySet/>
            </div>
        </div>
    </div>
</template>

<script>
import paySet from '@/pages/systemsetting/dataSafe/passwordsetting'
import topHandle from '@/components/topNav/topHandle'
export default {
    name:'paypassword',
    components:{
        topHandle,
        paySet
    }
}
</script>

<style lang="scss" scoped>
.paypassword{
    .container{
        left:200px;
        text-align: center;
        >div{
            width:60%;
            display: inline-block;
            vertical-align: middle;
            box-shadow:0 1px 3px #66b1ff8c;
             border-radius:5px;
            overflow: hidden;
        }
        &:after{
            content:"";
            display: inline-block;
            width:0;
            height:100%;
            vertical-align: middle;
        }
    }
}
</style>
