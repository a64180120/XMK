<template>
  <div class="password-input-el">
    <div
      class="passwordContainer"
      @click="focusOnInput"
      :style="!disabled?'cursor:pointer':'cursor:not-allowed'"
    ></div>
    <template v-if="canSee">
      <template v-for="index in maxlength">
        <input
          ref="input"
          :maxlength="1"
          type="text"
          style="float:left"
          @keyup="keyup(index-1,$event)"
          oncopy="return false"
          oncontextmenu="return false"
          onpaste="return false"
          oncut="return false"
          :disabled="disabled"
          @keydown="keydown"
        />
      </template>
      <img
        :style="!disabled?'cursor:pointer':'cursor:not-allowed'"
        class="eye"
        src="@/assets/images/zy.png"
        @click="canSee= !canSee"
      />
    </template>
    <template v-else>
      <template v-for="index in maxlength">
        <input
          ref="input"
          :maxlength="1"
          type="text"
          style="float:left"
          @keyup="keyup(index-1,$event)"
          oncopy="return false"
          oncontextmenu="return false"
          onpaste="return false"
          oncut="return false"
          :disabled="disabled"
          @keydown="keydown"
        />
      </template>
      <img
        :style="!disabled?'cursor:pointer':'cursor:not-allowed'"
        class="eye"
        src="@/assets/images/by.png"
        @click="canSee= !canSee"
      />
    </template>
    <div
      class="border"
      :style="{'transform':this.value.length==this.maxlength?'translateX('+(this.maxlength-1)*30+'px)':'translateX('+this.value.length*30+'px)'}"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'passwordInput',
  props: {
    maxlength: {
      type: Number,
      default: 6
    },
    enter: {
      type: Function,
      default: () => {
        console.log('enter')
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      default: ''
    }
  },
  data() {
    return {
      canSee: false,
      type: 'text'
    }
  },
  watch: {
    canSee(newVal) {
      if (newVal) {
        for (let i = 0; i < this.value.length; i++) {
          this.$refs.input[i].value = this.value.substr(i, 1)
        }
      } else {
        for (let i = 0; i < this.value.length; i++) {
          this.$refs.input[i].value = '●'
        }
      }
    },
    value(val) {
      if (val == '') {
        this.$refs.input.forEach(item => {
          item.value = ''
        })
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    keydown(e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // IE中阻止默认事件
        window.event.returnValue = false
      }
    },
    focusOnInput() {
      if (this.value.length == this.maxlength) {
        this.$refs.input[this.value.length - 1].focus()
        this.$refs.input[this.value.length - 1].setSelectionRange(1, 1)
        return
      }
      this.$refs.input[this.value.length].focus()
      this.$refs.input[this.value.length].setSelectionRange(1, 1)
    },
    keyup(index, e) {
      var obj = e.target
      var key = e.key
      if (/^[0-9]$/.test(key)) {
        if (this.value.length < this.maxlength) {
          this.up(this.value + (key + ''))
          if (this.canSee) {
            obj.value = key
          } else {
            obj.value = '●'
          }
          if (index < this.maxlength - 1) {
            this.$refs.input[index + 1].focus()
            // this.$refs.input[index + 1].setSelectionRange(1, 1)
          }
        }
      } else if (key == 'Backspace') {
        if (
          index == this.maxlength - 1 &&
          this.value.length == this.maxlength
        ) {
          obj.value = ''
          this.up(this.value.substring(0, this.value.length - 1))
        } else {
          this.up(this.value.substring(0, this.value.length - 1))
          if (index != 0) {
            this.$refs.input[index - 1].value = ''
            // this.$refs.input[index - 1].setSelectionRange(1, 1)
            this.$refs.input[index - 1].focus()
          }
        }
        // this.value = this.value.substring(0, this.value.length - 1)
      } else if (key == 'Enter') {
        obj.blur()
        this.enter()
      } else if (obj.value != '') {
        // 防止输完密码后，输入别的内容将最后一位删除
      } else {
        obj.value = ''
      }
    },
    up(newVal) {
      this.$emit('update:value', newVal)
    }
  }
}
</script>

<style lang='stylus' scoped>
div.password-input-el
  display inline-block
  position relative
  font-size 14px
  padding-right 56px
  .passwordContainer
    position absolute
    top 0
    left 0
    right 56px
    bottom 0
  input
    box-sizing border-box
    width 30px
    height 40px
    outline none
    box-shadow none
    font-family 'PingFang', 'songti', 'Avenir', Helvetica, Arial, sans-serif
    font-size 16px
    text-align center
    border 1px solid #DCDFE6
    border-right-width 0px
    &:last-of-type
      border-right-width 1px
    &:focus
      &~.border
        display block
        transition all 0.1s linear
  img
    width 56px
    height 40px
    position absolute
    z-index 1
    top 0
    right 0
  .border
    display none
    width 30px
    height 40px
    box-sizing border-box
    position absolute
    top 0
    left 0
    border 1px solid #409EFF
</style>
