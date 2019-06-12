<template>
    <div class="postAdd">
        <div class="title">
            <span @click.stop="$emit('add-cancle')" class="whiteBtn">取消</span>
            <span @click="update" class="btn">保存</span>
        </div>
        <ul v-show="selected=='1'">
            <li class="auditInfo clear">
                <div>岗位代码</div>
                <div>
                   <el-input v-model="info.FCode" placeholder="请输入岗位代码(必填)"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>岗位名称</div>
                <div>
                    <el-input maxlength="20" v-model="info.FName" placeholder="请输入岗位名称,20个字以内(必填)"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>备注</div>
                <div>
                    <el-input v-model="info.FDescribe" placeholder="请输入备注"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>启用/停用</div>
                <div>
                     <el-radio v-model="info.FEnable" :label="0">启用</el-radio>
                    <el-radio v-model="info.FEnable" :label="1">停用</el-radio>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>审批人员</div>
                <div class="textR auditerColor">
                   <div @click.stop="showAuditer" >
                        添加审批人
                   </div>
                   
                </div>
            </li>
        </ul>
        <div v-if="userList.length>0" class="listCon">
            <div class="list">
                <ul class="listHead">
                    <li> 序号</li>
                    <li>操作员编码</li>
                    <li>操作员姓名</li>
                    <li>部门</li>
                    <li>组织</li>
                </ul>
            </div>
            <div class="list2">
                <ul v-for="(user,n) of userList" class="listContent">
                    <li>{{n+1}}</li>
                    <li>{{user.Dwdm}}</li>
                    <li>{{user.DefStr1}}</li>
                    <li>{{user.DefStr5}}</li>
                    <li>{{user.DefStr4}}</li>
                </ul>
            </div>
        </div>
        <el-dialog class="postAddModel" append-to-body title="选择操作员" :visible.sync="showAddAuditer">
            <auditer v-if="showAddAuditer" :info="userList" :getuser="users" @auditer-cancle="auditerCancle"/>
        </el-dialog>
    </div>
</template>

<script>
import auditer from '@/components/setting/auditer'
import {PostAdd,GetAppvalPostOpers,PostUpdate} from '@/api/systemSetting/post'
export default {
    name:'postAdd',
    props:{
        type:{
            type:String,
            default:'add'
        },
        postinfo:{
            type:Number,
            default:0
        }
    },
    watch:{
        postinfo(val){
            if(val){
                this.getData();
            }else{
                this.info={
                    FEnable:0
                }
                this.userList=[];
            }
        }
    },
    data(){
        return{
            showAddAuditer:false,//选择操作员
            options:[{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }],
            info:{
                FEnable:0
            },
            post:{

            },
            orglist:[],
            selected:1,
            season:'',
            checked:false,
            userList:[],
            users:''
        }    
    },
    mounted(){
        if(this.postinfo){
            this.getData();    
        }
    },
    methods:{
        liucheng(str){
            this.selected=str;
        },
        auditerCancle(data){
            if(data){
                this.userList=data;
            }
             this.users='';
            this.showAddAuditer=false;
        },
        getData(){ //获取修改的数据
        
            let data={
                PhId:this.postinfo
            }
            GetAppvalPostOpers(data).then(res => {
                if(res.Status=='success'){
                    this.$msgBox.show(res.Msg)
                }else{
                    this.info=res.GAppvalPost;
                    this.userList=res.GAppvalPost4Opers;
                    this.userList.map(user => {  //统一岗位和操作人员字段
                        this.turnPro(user);
                    })
                }
            }).catch(err => {
                this.$msgBox.show('获取岗位信息失败!')
            })
        },
        //
        turnPro(data){
            data.Dwdm=data.OperatorCode;
            data.DefStr1=data.OperatorName;
            data.DefStr5=data.DepName;
            data.DefStr3=data.DepCode;
            data.Dydm=data.OrgCode;
            data.DefStr4=data.OrgName;
            data.DefStr6=data.OperatorPhid;
        },
        update(){  //保存
            this.info.OrgPhid=this.$store.state.user.orgid;
            this.info.OrgCode=this.$store.state.user.orgcode;
            let info2=[];
            this.userList.map((list,n)=> {
                info2.push({
                    OperatorPhid: list.DefStr6,  //（操作员主键）
                    OperatorCode: list.Dwdm,  //（操作员编码）
                    FSeq:n+1  
                })
            })
            let data={
                GAppvalPost:this.info,
                GAppvalPost4Opers:info2
            }
            if(this.type=='add'){
                PostAdd(data).then(res => {
                 this.$msgBox.show(res.Msg)
                 if(res.Status=='success'){
                     this.$emit('add-cancle',true);
                 }
                }).catch(err=> {
                    this.$msgBox.show('保存失败!')
                })
            }else{
                PostUpdate(data).then(res => {
                 this.$msgBox.show(res.Msg)
                 if(res.Status=='success'){
                     this.$emit('add-cancle',true);
                 }
                }).catch(err=> {
                    this.$msgBox.show('保存失败!')
                })
            }
            
           
        },
        showAuditer(){
            if(this.type=='add'){
                this.users=''
            }else{
                this.users='get';
            }
            console.log(this.type,this.users)
            this.showAddAuditer=true;
        }
    },
    components:{
        auditer
    }

}
</script>

<style lang="scss" scoped>
.postAdd{
    padding:10px;

    .title{
        text-align: right;
        >span{
            width:70px;
            margin-left:10px;
        }
    }
    .auditInfo{
        margin-top:10px;
        line-height: 40px;
        text-align: left;
        >div{
            float:left;
            &:first-of-type{
                width:12%;
                font-size:0.16rem;
                text-align: left;
            }
            &:last-of-type{
                width:85%;
 
                >div{
                    width:100%;
                }
            }
        }
    }
    .statusBtn{
        >span{
            display: inline-block;
            border-radius: 3px;
            width:70px;
            height:30px;
            line-height: 30px;
            margin-left:10px;
            cursor: pointer;
            &.grey{
                background:#ccc;
                color:#333;
                cursor: default;
            }
            &.green{
                background:#44A8BD; 
                color:#fff;  
            }
            &.yellow{
                background:#ff9900; 
                color:#fff;
            }
            &:nth-of-type(3){
                background:#1F6CFC; 
                color:#fff;
            }
            &:nth-of-type(4){
                background:#fff; 
                border:1px solid #1F6CFC;
                color:#1F6CFC;
            }
        }
    }
    .post{
        position:relative;
        height:290px;
        font-size:0.16rem;
        text-align: left;
        margin:10px 0px 0 20px;
        .listContent >li,.listHead >li{
        
            float:left;
            text-align: center;
            border:1px solid #ccc;
            border-width:0  1px 1px 0;
            height:40px;
            line-height: 40px;
            &:first-of-type{
                width:9%;
                border-left-width:1px ;
            }
            &:nth-of-type(2){
                width:35%;
            }
            &:nth-of-type(3){
                width:30%;
            }
            &:nth-of-type(4){
                width:25%;
                position: relative;
            }
        }
        .listHead{
            position:absolute;
            top:30px;
            left:0;
            right:-30px;
            height:40px;
            overflow-y: scroll;
            padding-right:20px;
         
            >li{
                border-top:1px solid #ccc;
                height:38px;

            }
            
        }
        .listCon{
            position:absolute;
            top:70px;
            left:0;
            right:-30px;
            bottom:0;
            height:200px;
            padding-right:20px;
            overflow-y: scroll;
        }
        .listContent{
            height:40px;
            &:hover{
                .deleteIconCon .active{
                    display: block;
                }
            }
            .deleteIconCon{
                position:relative;
                .icon{
                    display: none;
                    position:absolute;
                    top:0;
                    bottom:0;
                    right:-22px;
                    width:20px;
                    >div{
                        height:50%;
                        width:17px;
                        text-align: center;
                        >img{
                            width:100%;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
.auditerColor{
    color:red;
    font-size:0.16rem;
    >div{
        cursor: pointer;
        text-align: left;
        width: 120px !important;
        float: right;
        padding-left: 35px;
        position: relative;
         &::before{
            content: "";
            position: absolute;
            width: 2px;
            height: 24px;
            background: red;
            left: 15px;
            top: 7px;

        }
        &::after{
            content: "";
            position: absolute;
            width: 25px;
            height: 2px;
            background: red;
            left: 3px;
            top: 18px;
        }
    }
    
}
.condition{

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
        
    }
    .list2{
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
                // text-align: left;
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
</style>
<style>
    .listContent input{
        border:none;
    }
    .condition .el-input{
        width:30%;
    }
    .condition .el-input input{
        border:none;
        border-bottom:1px solid #ccc;
        border-radius: 0;
    }
    .postAddModel  .el-dialog__header {
        text-align: left;
    }

    .postAddModel .el-dialog__body{
        padding-top:0;
        
    }
    .postAddModel .el-dialog__body>div{
        border-top:1px solid #ccc;
    }
    
</style>
