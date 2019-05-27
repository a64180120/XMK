<template>
    <section>
      <el-input class="input" v-model="inputValue" :size="size" :style="inputStyle" :placeholder="placeholder" @keyup.enter.native="btnClick(inputValue)"></el-input>
      <el-button class="button" :size="size"  :type="type" :style="btnStyle"  @click="btnClick(inputValue)">{{label}}</el-button>
    </section>
</template>

<script>
  /**
   * size：输入框与按钮的尺寸，值有mini、small，medium
   * placeholder:输入框内的提示文字，字符串
   * label：按钮的内的文字，字符串
   * type：按钮的类型，elementUI 按钮tpye值
   * inputStyle：输入框样式，对象，默认输入框长度为180px
   */
    export default {
        name: "searchInput",
      props:{
        size:{
          type:String,
          default:'mini'
        },
        placeholder:{
          type:String,
          default:""
        },
        label:{
          type:String,
          default:'搜索'
        },
        type:{
          type:String,
          default:"primary"
        },
        inputStyle:{
          type:Object,
          default:function () {
            return {
              width:"180px",
            }
          }
        },
        btnStyle:{
          type:Object,
          default:function () {
            return{

            }
          }
        },
        value:{
          type:String,
          default:''
        }
      },
      data(){
          return{
            inputValue:this.value
          }
      },
    watch:{
      value(newValue){
            this.inputValue = newValue
          },
      inputValue(newValue){
            this.$emit('input',newValue)
          }
    },
      methods:{
        btnClick(a){
          this.$emit('btnClick')
        },
      }
    }
</script>

<style scoped>
  .input >>>input{
    border-radius: 20px 0 0 20px !important;
    border-right: none;
  }
  .input{
    margin-right: -4px;
  }
  .button{
    border-radius: 0 4px 4px 0;
  }
</style>
