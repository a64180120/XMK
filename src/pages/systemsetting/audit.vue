<template>
    <div class="auditLiuCheng">
        <topHandle></topHandle>
        <div class="container"></div>
    </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
export default {
    name:'auditLiuCheng',
    components:{
        topHandle
    }
}
</script>

<style lang="scss" scoped>
.auditLiuCheng{
   
    .container{
        left:170px;
    }
}
</style>
