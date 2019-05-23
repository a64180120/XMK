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
    </div>
</template>

<script>
export default {
    name:'dictionary'
}
</script>

<style lang="scss" scoped>
.dictionary{

}
</style>
