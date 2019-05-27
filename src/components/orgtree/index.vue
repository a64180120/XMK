<template>
  <section>
    <div style="height: 350px;overflow-y: auto">
      <el-tree
        ref="elt"
        :data="data"
        :props="{ children: 'children',label: 'OName' }"
        node-key="OCode"
        :default-checked-keys="checkedOrg!=null?checkedOrg:['1']"
        :highlight-current="true"
        :show-checkbox="true"
        :check-strictly="true"
        @check-change="handleNodeClick">
      </el-tree>
    </div>

  </section>

</template>

<script>
    export default {
        name: "orgtree",
      data(){
          return {
            choosenOrg:{label:''},
            /*orgList:[
              { label: '浙江省总工会', children:
                  [
                    { label: '省级本公会',
                      children:
                        [
                          { label: '办公室' },
                          { label: '女工部' },
                          { label: '财务与资产部' }
                        ]
                    },
                    { label: '杭州市总工会',
                      children:
                        [
                          { label: '财务与资产部' },
                          { label: '基层部' }
                        ]
                    },
                    { label: '宁波市总工会' },
                    { label: '绍兴市总工会' }
                  ]
              },
              { label: 'XXXX省总工会', children:
                  [
                    { label: 'XX市总工会'}
                  ]
              }]*/
          }
      },
      props:{
          data:{
            type:Array,
            default(){
              return {}
            }
          },
          checkedOrg:{
            type:Array,
            default(){
              return {}
            }
          }
      },
      watch:{
        currentOrg(){
          //alert(this.currentOrg.label);
         /* console.log(this.$refs.elt.getCurrentNode());*/

        }
      },
      mounted(){
       /* console.log(this.$refs.elt);
        console.log(this.currentOrg.label);
        console.log(this.$refs.elt.setCurrentNode);*/
        /*for(var i in orgList){

        }*/
      },
      methods:{
        handleNodeClick:function(data){
          data=this.$refs.elt.getCheckedNodes();
          this.$emit('choose',data)
        }
      }
    }
</script>

<style scoped>

</style>
