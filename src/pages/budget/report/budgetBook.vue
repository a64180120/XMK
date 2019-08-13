<template>
  <div class="container_bk" ref="bookFace">
    <ul>
      <li>
        <input />
        <span>总工会</span>
      </li>
      <li>
        <input />
        <span>年度</span>
      </li>
      <li>
        <span>工会经费收支预算表</span>
      </li>
      <li>
        <span>目录</span>

        <ul>
          <li>经费预算说明书</li>
          <li>本级经费收支预算表</li>
        </ul>
      </li>
      <li>
        <div>
          <span>工会主席：<input value=""/></span>
          <span>财务部长：<input value=""/></span>
          <span>制表：<input value=""/></span>
        </div>
        <div>
          <span>经费审查委员会主任：<input value=""/></span>
        </div>

      </li>
      <li>
        <span>报出日期：</span>
        <input value=""/>
        <span>年</span>
        <input value=""/>
        <span>月</span>
        <input value=""/>
        <span>日</span>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "budgetBook",
      methods:{
          getFace:function(){
            return (this.$refs.bookFace)
          }
      }
    }
</script>

<style lang="scss" scoped>
input{
  border-width: 0 0 1px 0 ;
}
  .container_bk{
    padding: 20px 50px;
    text-align: center;
    page-break-after: always;
    >ul{
      >li{
        padding: 10px;
        &:nth-of-type(1){
          font-size: .3rem;
          input{
            width: 300px;
          }
        }
        &:nth-of-type(2){
          font-size: .3rem;
          input{
            width: 100px;
          }
        }
        &:nth-of-type(3){
          font-size: .4rem;
          >span{
            letter-spacing: 20px;
          }

        }
        &:nth-of-type(4){
          font-size: 0.15rem;
          >span{
            display: inline-block;
            width: 20px;
          }
          >ul{
            width: 30%;
            display: inline-block;
            list-style: decimal inside;
            li{
              border: solid #ccc;
              border-width: 0 0 1px 1px;
              text-align: left;
              padding-left: 2px;
            }
          }

        }
        &:nth-of-type(5){
          font-size: .15rem;
          padding: 50px 0 30px 0;
          >div{
            width: 45%;
            display: inline-block;
            text-align: right;
          }
          input{
            width: 80px;
            text-align: center;
          }
        }
        &:nth-of-type(6){
          font-size: .15rem;
          input{
            width: 100px;
          }
        }
      }
    }
  }
</style>
