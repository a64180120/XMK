<template>
  <div class="container_bk">
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
        <span>
          <ul>
            <li>经费预算说明书</li>
            <li>本级经费收支预算表</li>
          </ul>
        </span>
      </li>
      <li>
        <span>工会主席：<input value="王刚"/></span>
        <span>财务部长：<input value="赵阳"/></span>
        <span>制表：<input value="JJ"/></span>
        <span>经费审查委员会主任：<input value=""/></span>
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
        name: "budgetBook"
    }
</script>

<style lang="scss" scoped>
input{
  border-width: 0 0 1px 0 ;
}
  .container_bk{
    padding: 20px 50px;
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
        }
        &:nth-of-type(4){
          font-size: .1rem;
          >ul{
            
            li{
              border: solid #ccc;
              border-width: 0 0 1px 1px;
              text-align: left;
            }
          }

        }
      }
    }
  }
</style>
