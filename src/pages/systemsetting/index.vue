<template>
    <div class="sys-setting">
        <navbar></navbar>
        <router-view></router-view>
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

}
</style>
