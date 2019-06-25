<template>
    <div class="auditAdd">
        <div class="title">
            <span @click.stop="liucheng('1')" :class="{active:selected==1}">流程信息</span>
            <span @click.stop="liucheng('2')" :class="{active:selected==2}">岗位顺序</span>
            <span @click.stop="liucheng('3')" :class="{active:selected==3}">启用条件</span>
        </div>
        <ul  v-show="selected=='1'">
            <li class="auditInfo clear">
                <div>审批类型</div>
                <div :class="{fontRed:checkContent.type}">
                    <el-select  v-model="info.SPLXPhid" placeholder="请选择审批类型(必填)">
                        <el-option
                            v-for="item in options"
                            :key="item.PhId"
                            :label="item.TypeName"
                            :value="item.PhId">
                        </el-option>
                    </el-select>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>流程代码</div>
                <div :class="{fontRed:checkContent.code}">
                    <el-input  v-model="info.FCode" placeholder="请输入流程代码(必填)"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>流程名称</div>
                <div :class="{fontRed:checkContent.name}">
                    <el-input maxlength="15"    v-model="info.FName" placeholder="请输入流程名称,最多15个字(必填)"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>启用组织</div>
                <div style="position:relative" @click.stop="orgtreeShow"  :class="{fontRed:checkContent.org}">
                    <orgtree :visible.sync="orgVisible"  @confirm="getOrg" :data="orglist" :checked-org="orgSelected"></orgtree>
                    <el-input   readonly   placeholder="请选择组织(必填)"></el-input>
                    <div class="orgInfoCon">
                        <input style="border:0;cursor:pointer" v-if="info.org.length==0" type="text" disabled placeholder="请选择组织(必填)">
                        <span  v-for="org of info.org">{{org.OrgName?org.OrgName:org.OName}}&nbsp;&nbsp;</span>
                    </div>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>备注</div>
                <div>
                    <el-input v-model="info.FDescribe" placeholder="请输入内容"></el-input>
                </div>
            </li>
            <li class="auditInfo clear">
                <div>启用/停用</div>
                <div>
                     <el-radio v-model="info.FEnable" :label="0">启用</el-radio>
                    <el-radio v-model="info.FEnable" :label="1">停用</el-radio>
                </div>
            </li>
        </ul>
        <div class="post" v-show="selected=='2'">
            <p>审批岗位顺序设置</p>
            <ul class="listHead">
                <li>顺序</li>
                <li>审批岗位编码</li>
                <li>审批岗位名称</li>
                <li>是否会签</li>
            </ul>
            <div class="listCon">
                <ul v-for="(postinfo,n) of postList" :key="n" class="listContent">
                    <li>{{n+1}}</li>
                    <li>
                         <el-select @change="selectName($event,n)" v-model="postinfo.PhId" placeholder="请选择岗位代码">
                            <el-option
                            v-for="item in codeList"
                            :key="item.PhId"
                            :label="item.FCode+'  '+item.FName"
                            :value="item.PhId">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <div >{{postinfo.FName}}</div>
                    </li>
                    <li class="deleteIconCon">
                        <el-radio v-model="postinfo.FMode" :label="1">是</el-radio>
                        <el-radio v-model="postinfo.FMode" :label="0">否</el-radio>
                        <div class="icon active">
                            <div @click.stop="addPost(n)"><img src="@/assets/images/jia.png" alt=""></div>    
                            <div @click.stop="deletePost(n,info)"><img src="@/assets/images/jian.png" alt=""></div>  
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="post condition" v-show="selected=='3'">
            <p>
                <el-checkbox v-model="money.enable">单据金额</el-checkbox>
            </p>
            <div>
                <span>上限</span>
                <el-input :disabled="!money.enable" v-model="money.max" placeholder="请输入上限金额(选填)"></el-input>
                <span>元</span>
                <span style="margin-left:30px">下限</span>
                <el-input :disabled="!money.enable" v-model="money.min" placeholder="请输入下限金额(选填)"></el-input>
                <span>元</span>
            </div>
        </div>
        <p class="statusBtn">
            <span @click.stop="liucheng((parseInt(selected)-1))" :class="{grey:selected=='1',green:selected=='2',yellow:selected=='3'}">上一步</span>
            <span @click.stop="liucheng((parseInt(selected)+1))" :class="{grey:selected=='3',yellow:selected!='3'}">下一步</span>
            <span @click.stop="submit(type)" :class="{grey:selected!='3'}">保存</span>
            <span @click.stop="$emit('add-cancle')">取消</span>
        </p>
        
    </div>
</template>

<script>
import fDialog from "@/components/attechment/dialog"
import Orgtree from "@/components/orgtree/index";

import {PostAddProc,GetProcDetail,PostUpdateProc} from '@/api/systemSetting/audit'
import {mapState} from 'vuex'
export default {
    name:'auditAdd',
    props:{
        auditinfo:{  //修改传入的流程信息
            type:Object,
            default(){
                return {}
            }
        },
        type:{  //新增还是修改
            type:String,
            default:'add'
        },
        splx:{  //新增时传入的审批类型id
            type:String,
            default:''
        },
        options:{ //审批类型列表
            type:Array,
            default:[]
        },
        codeList:{  //岗位列表
            type:Array,
            default(){
                return [{PhId:'003',FCode:'1111',FName:'财务资产部'},{PhId:'001',FCode:'2222',FName:'资源部'}]
            }
        },
        orglist:{  //组织部门列表
            type:Array,
            default(){
                return []
            }
        }
    },
  
    data(){
        return{
            orders:{
                '001':'资金拨付单',
                '002':'支付单',
                '003':'项目用款单',
                '004':'预算审核单',
                '005':'项目申报单'
            },
            
            info:{  //流程信息列表
                FEnable:0,org:[]
            },
            postinfoName:[],
            postList:[  //岗位列表
                {FMode:0,post:''}
            ],
            orgVisible:false,//组织选择显示
            orgSelected:[],//选择的组织
            selected:1, //当前页
            money:{ //金额上下限
                enable:false,
            },
            checkContent:{  //流程是否为空
                name:false,
                org:false,
                code:false,
                type:false
            },
            message:{}
        }    
    },
    computed:{
        ...mapState({
         
        })
    },

    watch:{

    },
    created(){
        this.updateInfo();
    },
    methods:{
        updateInfo(){
            this.$set(this.info,'SPLXPhid',this.splx);  //设置审批类型
            if(this.auditinfo){ //修改时获取详细数据
                 let orgs=[];
                 this.auditinfo.Organizes.map(org => {
                     orgs.push(org.OrgId);
                 })
                 let data={
                    ApprovalTypeId:this.auditinfo.SPLXPhid,
                    BillType:this.auditinfo.FBilltype,
                    OrgIds:orgs,
                    ProcCode:this.auditinfo.FCode
                 }
                GetProcDetail(data).then(res => {
                    if(res.Status=='error'){
                        this.$msgBox.show(res.Msg)
                    }else{
                        this.info=res.Data;
                        this.info.org=res.Data.Organizes;
                        this.postList=res.Data.PostModels;
                    }
                }).catch(err=>{
                    this.$msgBox.show('获取流程信息失败!')
                })
            }
        },
        //流程切换
        liucheng(str){
            if(str<1||str>3){
                return;
            }
            if(this.selected==1){
                if((!this.info.FName)||(!this.info.FCode)||(this.info.org.length==0)||(!this.info.SPLXPhid)){//必填信息为空
                     this.$msgBox.show('请完善必填信息!')
                    return;
                }
            }else if(str==3&&this.selected==2&&this.info.FEnable==0){
                let p=this.postList.every((el)=>{

                   return el.PhId;
                })
                if(!p){
                    this.$msgBox.show('编码与名称不能为空!')
                    return;
                }
            }
            this.selected=str;
        },
        // checkInfo(){
            
        //     if(!this.info[str]){
        //         this.checkContent[str]=true;//流程名称为空
        //     }
        // },
        //自动带出岗位名称
        selectName(id,n){
            console.log(this.postList,id,n)
            let count=0;
            this.postList.map(pos => {
                if(pos.PhId==id){
                    count++;
                }
            })
            if(count>1){
                this.postList.splice(n,1,{FMode:0});
                this.$msgBox.error('当前审批流程中已有一个相同岗位,不能重复设置!');
                return;
            }
            let name='';
            this.codeList.map(po => {
                if(po.PhId==id){
                    name=po.FName;
                }
            })
            
            this.$set(this.postList[n],'FName',name);
        },
        submit(type){
            if(this.selected==3){
                let arr=[],info;
                let posts=[],maxMin=[],splx;
                this.postList.map((pos,i )=> {
                    //岗位列表
                    posts.push({
                        PostPhid:pos.PhId,
                        FSeq:i+1,
                        FMode:pos.FMode
                    })
                })
                if(this.money.enable&&this.money.max&&this.money.min){
                   maxMin=[
                        {
                            F_SEQ:1,
                            F_OPERAND1:'F_AMOUNT_TOTAL',
                            F_OPERAND1_TP:'number',
                            F_OPERATOR:'>=',
                            F_OPERAND2:this.money.min,
                            F_CONNECTOR:'and',
                        },
                        {
                            F_SEQ:1,
                            F_OPERAND1:'F_AMOUNT_TOTAL',
                            F_OPERAND1_TP:'number',
                            F_OPERATOR:'<=',
                            F_OPERAND2:this.money.max,
                            F_CONNECTOR:'',
                        }
                    ]
                }else if(this.money.enable&&this.money.max&&!this.money.min){
                    maxMin=[{
                            F_SEQ:1,
                            F_OPERAND1:'F_AMOUNT_TOTAL',
                            F_OPERAND1_TP:'number',
                            F_OPERATOR:'<=',
                            F_OPERAND2:this.money.max,
                            F_CONNECTOR:'and',
                        }]
                }else if(this.money.enable&&!this.money.max&&this.money.min){
                    maxMin=[{
                            F_SEQ:1,
                            F_OPERAND1:'F_AMOUNT_TOTAL',
                            F_OPERAND1_TP:'number',
                            F_OPERATOR:'>=',
                            F_OPERAND2:this.money.min,
                            F_CONNECTOR:'',
                        }]
                }
                this.options.map(opt => {
                    if(opt.PhId==this.info.SPLXPhid){
                        splx=opt;
                    }
                })
                info={
                    OrgPhid:this.$store.state.user.orgid,
                    OrgCode:this.$store.state.user.orgcode,
                    FCode:this.info.FCode,
                    FName:this.info.FName,
                    FBilltype:splx.Value,
                    FEnable:this.info.FEnable,
                    FDescribe:this.info.FDescribe,
                    SPLXPhid:splx.PhId,
                    SPLXCode:splx.TypeCode,
                    Proc4PostModels:posts,
                    CondsModels:maxMin
                }
                for(let org of this.info.org){
                    let inf = JSON.parse(JSON.stringify(info));
                    inf.OrgPhid=org.PhId?org.PhId:org.OrgId;
                    inf.OrgCode=org.OCode?org.OCode:org.OrgCode;
                    arr.push(inf);
                }
                
                if(type=='add'){
                    let data={
                        infoData:arr
                    }
                    this.add(data);
                }else{
                    let orgids=[],data={};
                    for(let org of this.auditinfo.Organizes){
                        orgids.push(org.OrgId?org.OrgId:org.PhId);
                    }

                    data.ApprovalTypeId=splx.PhId;
                    data.BillType=splx.Value;
                    data.ProcCode=this.info.FCode;
                    data.OrgIds=orgids;
                    data.ProcModels=arr;
                    this.update(data);
                }
            }
            
        },
        //新增保存
        add(data){
            
                if(this.money.enable){
                    if(((this.money.max||this.money.min)&&(this.money.max!=this.money.min))){
                        //执行保存
                        PostAddProc(data).then(res => {
                            this.$msgBox.show(res.Msg);
                            if(res.Status=='success'){
                                this.$emit('add-cancle',true);
                                this.reset();
                            }
                        }).catch(err => {
                            this.$msgBox.show('保存失败!');
                        })
                        
                        
                    }else{
                        this.$msgBox.show('请至少填写一个金额,且上限金额与下限金额不能相同!')
                    }
                }else{
                    //执行保存
                    PostAddProc(data).then(res => {
                        this.$msgBox.show(res.Msg);
                        if(res.Status=='success'){
                            this.$emit('add-cancle',true);
                            this.reset();
                        }
                    }).catch(err => {
                        this.$msgBox.show('保存失败!');
                    })
                    
                }
            
        },
        //修改保存
        update(data){
             if(this.money.enable){
                if(((this.money.max||this.money.min)&&(this.money.max!=this.money.min))){
                    //执行保存
                    PostUpdateProc(data).then(res => {
                        this.$msgBox.show(res.Msg);
                        if(res.Status=='success'){
                            this.$emit('add-cancle',true);
                            this.reset();
                        }
                    }).catch(err => {
                        this.$msgBox.show('修改失败!');
                    })
                    
                    
                }else{
                    this.$msgBox.show('请至少填写一个金额,且上限金额与下限金额不能相同!')
                }
            }else{
                //执行保存
                PostUpdateProc(data).then(res => {
                    this.$msgBox.show(res.Msg);
                    if(res.Status=='success'){
                        this.$emit('add-cancle',true);
                        this.reset();
                    }
                }).catch(err => {
                    this.$msgBox.show('修改失败!');
                })
                
            }
        },
        //组织树显示
        orgtreeShow(){
            this.orgSelected=[];
            this.info.org.map(org => {
                this.orgSelected.push(org.OCode?org.OCode:org.OrgCode);
            })
            this.orgVisible=true;
        },
        //组织选择
        getOrg(val){
            console.log(val)
            this.info.org=val;
        },
        //岗位顺序新增
        addPost(index){
            this.postList.splice(index+1,0,{FMode:0})
        },
        //岗位顺序删除
        deletePost(index,item){
            if(this.postList.length>1){
                if(item.Phid){
                    this.deleteList.push(item);
                }
                this.postList.splice(index,1);
            }
        },
        reset(){
            this.selected=1;
            this.postList=[ {FMode:0,post:''}]
            this.info={  
                FEnable:0,
                org:[],
                SPLXPhid:this.splx
            }
        }
    },
    components:{
        fDialog,
        Orgtree
    }
}
</script>

<style lang="scss" scoped>
.auditAdd{
    padding:10px;
    width:750px;
    .title{
        width:90%;
        margin:0 auto;
        height:30px;
        position: relative;
        text-align: left;
        >span{
            display: inline-block;
            border-radius: 5px;
            width:16%;
            height:100%;
            line-height:30px;
            margin-left:13%;
            cursor: pointer;
            text-align: center;
            background: #ccc;
            position: relative;
            z-index: 9;
            &.active{
                background:#78B753;
                color:#fff;
                cursor:default;
            }
        }
        &:after{
            content:"";
            position: absolute;
            width:100%;
            top:50%;
            left:0;
            height:1px;
            background: #ccc;
            
        }
    }
    .auditInfo{
        margin-top:10px;
        line-height: 40px;
        text-align: left;
        position: relative;
        >div{
            float:left;
            &:first-of-type{
                width:15%;
                font-size:0.16rem;
                text-align: right;
            }
            &:last-of-type{
                width:82%;
                margin-left:3%;
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
          
            &:nth-of-type(3){
                background:$btnColor; 
                color:#fff;
            }
            &:nth-of-type(4){
                background:#fff; 
                border:1px solid #1F6CFC;
                color:#1F6CFC;
            }
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
            top:68px;
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
.orgInfoCon{
    position:absolute;
    top:0;
    left:15px;
    right:15px;
    bottom:2px;
    z-index:9;
    background: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.condition{

}
</style>
<style>
    .listContent input{
        border:none;
        height:100%;
    }
    .condition .el-input{
        width:30%;
    }
    .auditInfo .el-input input,
    .condition .el-input input{
        border:none;
        border-bottom:1px solid #DCDFE6;
        border-radius: 0;
    }
    .fontRed .el-input input{
        
        border-bottom:1px solid red;
    }
    .fontRed .el-input input::placeholder{
        color:red;
    }
	.auditAdd .el-select .el-input__inner{
		height: 30px;
		line-height: 30px;
	}
</style>

