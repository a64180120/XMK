<template>
    <div class="handleBtn">
      <p>{{title}}</p>
      <div class="btnContainer">
        <slot></slot>
        <ul class="rightBtn">
          <li>
            <div><img src="@/assets/images/dy.png" alt=""></div>
            <span>打印</span>
          </li>
          <li>
            <div><img src="@/assets/images/sx.png" alt=""></div>
            <span>刷新</span>
          </li>
          <li>
            <div><img src="@/assets/images/g-1.png" alt=""></div>
            <span>回主页</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "handleBtn",
        props:{
           year:'',
            org:{},
            printBtn:true,
            title:{
              type:String,
              default:'资金拨付在线工作平台'
            }
        },
        mounted(){

        },
        methods:{
          change(data){  //修改组织,年度
            this.$emit('change',data);
          },
          print(){  //打印
            this.$emit('print');
          },
          refresh(){ //刷新
            this.$emit('refresh');
          }
        }
    }
</script>

<style lang="scss" scoped>
.handleBtn{
  width:100%;
  overflow: hidden;
  background: url(../../assets/images/bj.gif);
  box-shadow: 0px 1px 5px #959595;
  >p{
    width:100%;
    text-align: center;
    font-weight: 600;
    color: #676767;
    font-size:0.3rem;
  }
  .btnContainer{
    width:100%;
    font-size:0.16rem;
    >div{
      margin:0 auto;
    }
    .rightBtn{
      float:right;
      overflow: hidden;
      >li{
        float:left;
        width:80px;
        height:60px;
        padding:10px 0;
        text-align: center;
        >div{
          text-align: center;
           >img{
             width:40px;
          }
        }
       
        >span{

        }
      }
    }
  }
}
</style>
