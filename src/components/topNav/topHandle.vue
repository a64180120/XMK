<template>
  <div class="handleBtnCon msFixed" style="z-index: 9;">
    <div style="z-index:9" v-show="orgTreeShow" class="model" @click.stop="orgTreeShow=false">

    </div>
    <div class="handleBtn">
      <p>{{title}}</p>
      <div class="btnContainer">
        <ul class="rightBtn">
          <li @click.stop="auditPage">
            <div><img src="@/assets/images/zj6.png" alt=""></div>
            <span >审批中心</span>
          </li>
          <li @click.stop="refresh">
            <div><img src="@/assets/images/sx.png" alt=""></div>
            <span>刷新</span>
          </li>
          <li>
            <div><img src="@/assets/images/g-1.png" alt=""></div>
            <span>主目录</span>
          </li>
        </ul>
        <slot></slot>
      </div>
    </div>
    <div class="orgInfo">
      <div class="count">
        <img src="" alt="">
        <span>当前在线人数:</span> 
        <span>23</span>
      </div>
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
          <div v-show="orgTreeShow" class="treeCon" style="z-index:9;">
            <el-tree
              ref="orgtree"
              :props="props"
              :load="loadNode1"
              node-key="Phid"
              lazy
              show-checkbox
              :check-strictly="true"
              :check-on-click-node="false"
              
              @check="orgChange"
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
        name: "topHandle",
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
              isLeaf: 'isLast'
            },
          }
        },
        mounted(){

        },
        methods:{
          orgTreeInit(){
            this.orgTreeShow=true;
            this.$refs.orgtree.setCheckedKeys([]);//清空选择
            
          },
          orgChange(val){ //组织改变
            console.log(val);//选中的组织

          },
           yearChange(){  //年度改变
            this.$emit("year-click",this.year);
          },
          //设置选中的组织
          setCheckedNodes() {
            this.setCheckedNodes([{
              Phid: '0000',
              OrgName: '选中'
            }]);
          },
          setCheckedKeys() {
            this.$refs.orgtree.setCheckedKeys([3]);
          },
         
          auditPage(){  //审批中心
            
          },
          refresh(){ //刷新
            this.$emit('refresh');
          },
          //组织树懒加载方法
          loadNode1(node, resolve) {
            
            if (node.level === 0) {
              return resolve([{ Phid:'0000',OrgName:'选中' }]);
            }
            if (node.level > 1) return resolve([]);

            setTimeout(() => {
              const data = [{
                OrgName: '浙江省总',
                isLast: true,
                Phid:'0001',
                OrgId:'10013'
              }, {
                OrgName: '湖南省总',
                
                Phid:2,
                OrgId:'10222'
              }];

              resolve(data);
            }, 500);
          }
        }
    }
</script>

<style lang="scss" scoped>
.handleBtnCon{
    position: fixed;
    top: 0;
    height: 150px;
    left: 0;
    right: 0;
    color:#676767;
}
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
    height:60px;
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
        width:65px;
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
  padding:10px 23px;
  font-size:0.16rem;
  .count{
    float:left;
  }
  >div{
    float:right;
    position:relative;
  }
  .treeCon{
    position: absolute;
    border:1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
    padding:3px;
    left:0;
    top:100%;

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

