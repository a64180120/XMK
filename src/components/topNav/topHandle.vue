<template>
  <div class="handleBtnCon">
    <div style="z-index:9" v-show="orgTreeShow" class="model" @click.stop="orgTreeShow=false">

    </div>
    <div class="handleBtn">
      <p>{{title}}</p>
      <div class="btnContainer">
        <ul class="rightBtn">
          <li @click.stop="print">
            <div><img src="@/assets/images/dy.png" alt=""></div>
            <span >打印</span>
          </li>
          <li @click.stop="refresh">
            <div><img src="@/assets/images/sx.png" alt=""></div>
            <span>刷新</span>
          </li>
          <li>
            <div><img src="@/assets/images/g-1.png" alt=""></div>
            <span>回主页</span>
          </li>
        </ul>
        <slot></slot>
      </div>
    </div>
    <div class="orgInfo">
      <div>
        <span class="mr-2">年度:</span>
        <el-select style="width:100px" @change="yearChange" v-model="year" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="orgSelect clear">
        <span class="fl mr-2">单位:</span>
        <div class="fl">
          <p @click="orgTreeInit" class="orgName">{{orgName}}</p>
          <div v-show="orgTreeShow" class="treeCon">
            <el-tree
              :props="props"
              :load="loadNode1"
              lazy
              show-checkbox
              :check-strictly="true"
              @node-click="orgChange"
              >
            </el-tree>
          </div>
        </div>
        
      </div>
      
    </div>
    
  </div>   
</template>

<script>
    export default {
        name: "handleBtn",
        props:{
            printBtn:true,
            title:{
              type:String,
              default:'资金拨付在线工作平台'
            }
        },
        data(){
          return {
            options: [{  //年度选项
                value: '2019',
                label: '2019'
              }, {
                value: '2018',
                label: '2018'
            }],
            
            year: '2018',//年度
            orgName:'组织名aklshdflhas',//组织=名
            orgTreeShow:false,//显示组织树
            props: {  //组织树懒加载配置
              label: 'OrgName',
              children: 'zones',
              isLeaf: 'leaf'
            },
          }
        },
        mounted(){

        },
        methods:{
          orgTreeInit(){
            this.orgTreeShow=true;
          },
          orgChange(val,val2,val3){
            console.log(val,val2,val3)
          },
          yearChange(){
            this.$emit("year-click",this.year);
          },
          print(){  //打印
            this.$emit('print');
          },
          refresh(){ //刷新
            this.$emit('refresh');
          },
          //组织树懒加载方法
          loadNode1(node, resolve) {
            console.log(node,resolve)
            if (node.level === 0) {
              return resolve([{ OrgName: 'region' }]);
            }
            if (node.level > 1) return resolve([]);

            setTimeout(() => {
              const data = [{
                OrgName: '浙江省总',
                leaf: true
              }, {
                OrgName: '湖南省总',
                
              }];

              resolve(data);
            }, 500);
          }
        }
    }
</script>

<style lang="scss" scoped>
.handleBtn{
  width:100%;
  height:100px;
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
    position:relative;
    >div{
      margin:0 auto;
    }
    .rightBtn{
      float:right;
      overflow: hidden;
      position: absolute;
      right:20px;
      top:-10px;
      >li{
        float:left;
        width:60px;
        height:50px;
        padding:10px 0;
        text-align: center;
        cursor:pointer;
        >div{
          text-align: center;
           >img{
             width:30px;
          }
        }
       
        >span{

        }
      }
    }
  }
}
.orgInfo{
  
  height:30px;
  padding:10px ;
  font-size:0.16rem;
  >div{
    float:right;
    position:relative;
  }
  .treeCon{
    position: absolute;
    border:1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    padding:3px;
    left:0;
    top:100%;
    z-index:9;
    min-width: 100px;
  }
  .orgSelect{
    height:100%;
    margin-right:20px;
    >span{
      height:100%;
      line-height: 30px;
    }
    >div{
      height:100%;
      position:relative;
      >p{
        height:100%;
        line-height: 30px;
      }
    }
    .orgName{
      cursor: pointer;
    }
  }
}
.mr-2{
  margin-right:10px;
}
.model{
  position: fixed;
  position: -ms-page;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background:none;
}
</style>
<style>
.orgInfo .el-input--suffix .el-input__inner{
  height:30px;
}
.orgInfo .el-input__icon {
  line-height: 30px;
}
</style>

