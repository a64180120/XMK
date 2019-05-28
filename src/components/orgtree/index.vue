<template>
    <el-dialog  id="orgtreedialog" width="350px" title="组织选择"
                :visible.sync="visible2" :append-to-body="true">
      <div style="height: 350px;overflow-y: auto">
        <el-tree
          ref="elt"
          :data="data"
          :props="{ children: 'children',label: 'OName' }"
          node-key="OCode"
          :default-checked-keys="checkedOrg!=null?checkedOrg:[]"
          :highlight-current="true"
          :show-checkbox="true"
          :check-strictly="true"
          @check-change="handleNodeClick">
        </el-tree>
      </div>
      <div style="text-align: center;margin-top:10px">
          <button class="cancelBtn"  @click="$emit('update:visible',false)">取消</button>
          <button class="confirmBtn" style="margin-left: 30px" @click="confirmOrg">确定</button>
      </div>
    </el-dialog>

</template>

<script>
    export default {
        name: "orgtree",
      data(){
          return {
            choosenOrg:{label:''},
            visible2:false,
           selected:[],
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
          },
          visible:{
            type:Boolean,
            default:false
          }
      },
      computed:{
      },
      watch:{
        visible(val){
          this.visible2=val;
          if(val&&this.$refs.elt){
            this.$nextTick(this.$refs.elt.setCheckedKeys([]))
          }
        },
        visible2(val){
          this.$emit('update:visible',val);
        },
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
           this.selected=this.$refs.elt.getCheckedNodes();
        },
        //点击组织树确定按钮进行选中组织赋值
        confirmOrg:function(){
             this.$emit('confirm',this.selected);
            this.$emit('update:visible',false);
         
        },
      }
    }
</script>

<style>
#orgtreedialog .el-dialog__body{
  padding:20px;
}
</style>
