<template>
    <div class="auditfollow msFixed">
        <p class="title">
            <span>审批流查看</span>  
            <i></i>  
        </p>
        <div></div>
    </div>
</template>

<script>
export default {
    name:"auditfollow",
}
</script>

<style lang="scss" scoped>
.auditfollow{
    right:0;
    top:0;
    bottom:0;
    width:230px;
    z-index: 99;
    background: #fff;
    box-shadow: -4px 1px 9px #3294e894;
    .title{
        text-align: center;
        color:#fff;
        font-size:0.2rem;
        height:40px;
        line-height: 40px;
        background:$primaryColor;
        position: relative;
        >i{
            position: absolute;
            width:30px;
            height:30px;
            top:5px;
            right:10px;
            background:url(../../assets/images/delete.svg);
            background-size:100% 100%;
        }
    }
}
</style>

