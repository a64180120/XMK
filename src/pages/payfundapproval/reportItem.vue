<template>
    <section>
      <el-card class="box-card">
        <div slot="header" class="clear-fix">
          <el-row>
            <el-col :span="12">
              <el-checkbox v-model="checkbox" class="select">项目申报：</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-button></el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </section>
</template>

<script>
    export default {
        name: "reportItem",
      data(){
          return{
            checkbox:false
          }
      }

    }
</script>

<style scoped>
  .box-card{
    padding: 10px;
  }
  .select{
   text-align: left;
  }
</style>
