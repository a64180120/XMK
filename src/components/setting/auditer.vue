<template>
    <div class="auditer">
        <p>
            <span @click="$emit('auditer-cancle',false)" class="whiteBtn">取消</span>
            <span @click="userConfirm" class="btn">确定</span>
        </p>
        <div class="searchCon">
            <div class="leftBtn">
                <!-- <span>角色</span>
               <el-select v-model="search.roler" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                <span>组织/部门:&nbsp; </span>
                <div @click.stop="orgTreeShow" class="fl" style=" border-bottom: 1px solid #ccc;
    height: 90%;
    cursor: pointer;" >
                    <el-popover width="300" placement="right" :popper-class="'maxH'" trigger="click">
                        <el-tree
                        ref="orgtree"
                        node-key="OCode"
                        :highlight-current="true"
                        :props="defaultProps"
                        
                        :default-expanded-keys="[org.OCode]"
                        :data="orgList"
                        :expand-on-click-node="false"
                        @node-click="orgChange"
                        ></el-tree>
                        <span slot="reference" class="orgName">{{org.OName}}</span>
                    </el-popover>
                    
                </div>
            </div>
            <div class="rightBtn">
                <search :placeholder="'操作员编码/姓名'" @btnClick="getData"  v-model="searchInfo"/>
            </div>
        </div>
        <div class="listCon">
            <div class="list">
                <ul class="listHead">
                    <li><el-checkbox @change="allChecked" :indeterminate="indeterminate" v-model="checked"> 序号</el-checkbox></li>
                    <li>操作员编码</li>
                    <li>操作员姓名</li>
                    <li>部门</li>
                    <li>组织</li>
                </ul>
            </div>
            <div class="list2">
                <ul v-for="(user,n) of userList" class="listContent">
                    <li><el-checkbox @change="choose(user)" v-model="user.checked"> {{n+1+((pageIndex-1)*pageSize)}}</el-checkbox></li>
                    <li>{{user.Dwdm}}</li>
                    <li>{{user.DefStr1}}</li>
                    <li>{{user.DefStr5}}</li>
                    <li>{{user.DefStr4}}</li>
                </ul>
            </div>
        </div>
        <!-- <div class="pageArea">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[30,50,100,150,200]"
                :page-size="pageSize"
                layout="total,sizes,prev,pager,next,jumper"
                :total="total"
            >
            </el-pagination>
        </div> -->
        
    </div>
</template>

<script>
import {mapState} from 'vuex'
import search from '@/components/searchInput/searchInput'
import {getUserByOrg} from '@/api/systemSetting/post'
export default {
    name:'auditer',
    props:{
        info:{
            type:Array,
            default(){
                return []
            }
        },
        getuser:{
            type:String,
            default:''
        },
    },
    data(){
        return {
            org:{OCode:101},
            options:[],
            search:'',
            checked:false,
            choosedItem:[],
            userList:[],
            pageSize:30,
            pageIndex:1,
            total:0,
            indeterminate:false,
            searchInfo:'',
            defaultProps: {
              children: 'children',
              label: 'OName'
            }
        }
    },
     computed:{
            ...mapState({
                  orgList: state=>state.user.orglist,
                  orgcode: state=>state.user.orgcode,
                  orgname: state=>state.user.orgname,
            })
        },
    mounted(){
        this.org.OCode=this.orgcode;
        this.org.OName=this.orgname;
        this.getData();
    },
    watch:{
        getuser(val){
            if(val){
                this.allChecked(false);
                this.checked=false;
                this.choosedItem=[];
                this.userList.map(user => {
                    for(let u of this.info){
                        if(u.OperatorPhid==user.DefStr6){
                            this.$set(user,'checked',true);
                            this.choosedItem.push(user);
                        }
                    }
                })
                let allCheck=this.userList.every((acc)=>{
                    return acc.checked==true;
                })
                if(allCheck){
                    this.checked=true;
                    this.indeterminate=false;
                }else{
                    this.checked=false;
                    this.indeterminate=false;
                    if(this.choosedItem.length>0){
                        this.indeterminate=true;
                    }
                }
            }
        }
    },
    methods:{
        orgChange(val){
            this.org=val;
            this.getData();
            let p = document.querySelector('.auditer .orgName');
            p.click();
        },
        orgTreeShow(){//组织树显示
            this.$refs.orgtree.setCurrentNode({OCode:this.org.OCode});
          },
        handleCurrentChange(val){
            this.pageIndex=val;
            this.getData();
        },
        handleSizeChange(val){
            this.pageSize=val;
            this.getData();
        },
        userConfirm(){
            this.$emit('auditer-cancle',JSON.parse(JSON.stringify(this.choosedItem)));
        },
        getData(){
            let data={
                OrgCode:this.org.OCode,
//                 PageIndex:this.pageIndex-1,
//                 PageSize:this.pageSize,
                queryStr:this.searchInfo
            }
            getUserByOrg(data).then(res => {
                if(res.Status=='error'){
                    this.$msgBox.show(res.Msg)
                }else{
                    this.choosedItem=[];
                    this.allChecked(false);
                    this.checked=false;
                    this.userList=res.Record;
                    // this.total=res.totalRows;
                    this.userList.map(user => {
                        for(let u of this.info){
                            if(u.OperatorPhid==user.DefStr6){
                                this.choosedItem.push(user);
                                this.$set(user,'checked',true);
                            }
                        }
                    })
                    
                    let allCheck=this.userList.every((acc)=>{
                        return acc.checked==true;
                    })
                    if(allCheck){
                        this.checked=true;
                        this.indeterminate=false;
                    }else{
                        this.checked=false;
                        this.indeterminate=false;
                        if(this.choosedItem.length>0){
                            this.indeterminate=true;
                        }
                    }
                }
            }).catch(err => {
                console.log(err)
                this.$msgBox.show('获取操作员失败!')
            })
        },
         //操作员选择
        choose(val,index){
            if(val.checked){
                this.choosedItem.push(val);
            }else{
                this.choosedItem.map((ch,i,arr)=>{
                    if(ch.PhId==val.PhId){
                        this.choosedItem.splice(i,1);
                    }
                });
                
            }
            let allCheck=this.userList.every((acc)=>{
                return acc.checked==true;
            })
            if(allCheck){
                this.checked=true;
                this.indeterminate=false;
            }else{
                this.checked=false;
                this.indeterminate=false;
                if(this.choosedItem.length>0){
                    this.indeterminate=true;
                }
            }
        
        },
        //操作员全选
        allChecked(val){
            this.indeterminate=false;
            if(val){
                this.userList.map(arr=>{
                    this.$set(arr,'checked',true); 
                    this.choosedItem=JSON.parse(JSON.stringify(this.userList));
                })
            }else{
                this.userList.map(arr=>{
                     this.$set(arr,'checked',false);
                     this.choosedItem=[];
                })
            }
        },
    },
    components:{
        search
    }
}
</script>

<style lang="scss" scoped>
.auditer{
    padding:10px;
    position:relative;
    color:#333;
    height:500px;
    >p{
        text-align: right;
        >span{
            width:70px;
            margin-left:10px;
        }
    }
    .searchCon{
        position:absolute;
        left:1%;
        right:1%;
        top:40px;
        height:50px;
        
        .rightBtn{
            float:right;
            padding-top:10px;
            
        }
        .leftBtn{
            padding-top:5px;
            float:left;
            height:100%;
            line-height: 50px;
            >span{
                float:left;
                &:nth-of-type(2){
                    border-bottom:1px solid #ccc;
                    min-width:100px;
                    margin-left:10px;
                    height:100%;
                    cursor:pointer;
                }
            }
        }
    } 
    .listCon{
        position:relative;
        &:after{
            content:"";
            position: absolute;
            right:0;
            top:0;
            bottom:0;
            width:17px;
            background:#fff;
        }
    }
    .list{
        overflow-y:scroll;
        position:relative;
        height:40px;
        margin-top:60px;
    }
    .list2{
        height:350px;
         overflow-y:scroll;
        position:relative;
    }
    .listContent,.listHead{
        overflow: hidden;
      
        
        
        
        >li{
            float:left;
            text-align: center;
            border:1px solid #ccc;
            border-width:0 1px 1px 0;
            height:40px;
            line-height:40px;
            &:first-of-type{
                width:10%;
                border-left-width:1px;
                text-align: left;
                padding-left:5px;
            }
            &:nth-of-type(2){
                width:25%;
            }
            &:nth-of-type(3){
                width:18%;
            }
            &:nth-of-type(4){
                width:22%;
            }
            &:nth-of-type(5){
                width:25%;
            }
        }
    } 
    .listHead{
        color:#fff;
        background:$btnColor;
        >li{
            border-top:1px solid #ccc;

        }
    }
    .pageArea{
        text-align: right;
        margin-top: 5px;
    }
}
</style>
<style>
.auditer   .listHead .el-checkbox__label{
    color:#fff;
}
</style>


