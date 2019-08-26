<template>
  <div class="board-column">

    <draggable v-if="!disabled"
               class="board-column-content"
               :list="list">
      <div class="board-item"
           v-for="(item,index) of list"
           :key="index">
        <div style="background-color: #fff;box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);">
          <el-checkbox v-model="item.checked">{{item.name}}</el-checkbox>

        </div>
      </div>
    </draggable>
    <div v-else
         class="board-item"
         v-for="(el,ind) in list"
         :key="ind">
      <div style="background-color: #fff;box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);">
        <el-checkbox disabled
                     v-model="el.checked">{{el.name}}</el-checkbox>

      </div>
    </div>

  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'dragKanban-demo',
  components: {
    draggable
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  methods: {
    close () {
      this.$emit('drag-click', false);
    },
  },

}
</script>
<style lang="scss" scoped>
.board-column {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;
  position: relative;
  .board-column-content {
    // margin-top:50px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    overflow: hidden;
    .board-item {
      cursor: pointer;
    }
  }
}
.board-item {
  width: 120px;
  display: inline-block;
  margin-right: 10px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 5px;
  box-sizing: border-box;
  > div {
    width: 100%;
    height: 100%;
    > span {
      margin-right: 20px;
    }
  }
}
.voucherDetail {
  position: relative;
  width: 100%;
  padding: 5px 10px;
  //border:1px solid #bcbdbd;
  display: none;
  background: #fff;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
}
.voucherDetailShow {
  margin-top: 10px;
  display: block;
  position: relative;
  z-index: 9;
  position: relative;
}
.listTitle {
  height: 30px;
  overflow-y: scroll;
  > li {
    line-height: 30px;
    height: 100%;
    text-align: center;
    float: left;
    border: 1px solid #bcbdbd;
    border-left: 0;
    &:first-of-type {
      width: 32%;
      border-left: 1px solid #bcbdbd;
    }
    &:nth-of-type(2) {
      width: 28%;
    }
    &:nth-of-type(3) {
      width: 20%;
    }
    &:nth-of-type(4) {
      width: 20%;
    }
  }
}
.listContent {
  overflow-y: scroll;
  max-height: 150px;
}
.listContent > li {
  height: 28px;
  line-height: 30px;
  text-align: left;
  border: 1px solid #bcbdbd;
  border-width: 0 1px 1px 0;
  &:first-of-type {
    border-left: 1px solid #bcbdbd;
  }
  > span {
    margin-left: 5%;
  }
  > div {
    float: left;
    text-align: left;
    height: 100%;
    padding: 0 5px;
    border-left: 1px solid #bcbdbd;
    &:first-of-type {
      width: 32%;
    }
    &:nth-of-type(2) {
      width: 28%;
    }
    &:nth-of-type(3) {
      width: 20%;
      text-align: right;
    }
    &:nth-of-type(4) {
      width: 20%;
      text-align: right;
    }
  }
  &:last-of-type {
    > div {
      &:first-of-type {
        width: 60%;
        padding-left: 10%;
      }
      &:nth-of-type(2) {
        width: 20%;
        text-align: right;
      }
      &:nth-of-type(3) {
        width: 20%;
        text-align: right;
      }
    }
  }
}
</style>
