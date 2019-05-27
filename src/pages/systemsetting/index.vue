<template>
    <div class="sys-setting">  
        <router-view></router-view>
        <navbar></navbar>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
export default {
    name:'systemsetting',
    components:{
        navbar
    }
}
</script>

<style lang="scss" scoped>
.sys-setting{
    min-width: 1200px;
    position: relative;
    height:100%;
}
</style>
