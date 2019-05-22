<template>
  <div>申请单组件</div>
</template>

<script>
    export default {
        name: "applybill",
      props:{billNum:String},
      methods:{
          //申请单查看
        getApply:function(){
          console.log(this.billNum+'这里添加数据查询方法');
        },
        //生成支付单
        creatApply:function(){
          console.log(this.billNum+'这里添加数据查询方法');
        },
        //送审
        postApply:function(){
          console.log(this.billNum+'这里添加数据查询方法');
        },
        //删除
        deleteApply:function(){
          console.log(this.billNum+'这里添加数据查询方法');
        },
        //打印
        printApply:function(){
          console.log(this.billNum+'这里添加数据查询方法');
        }
      }
    }
</script>

<style scoped>

</style>
