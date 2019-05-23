<template>
    <div class="auditer">
        <p>
            <span @click="$emit('auditer-cancle')" class="whiteBtn">取消</span>
            <span class="btn">确定</span>
        </p>
        <div class="searchCon">
            <div class="leftBtn">
                <span>角色</span>
               <el-select v-model="search.roler" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span>组织/部门</span>
            </div>
            <div class="rightBtn">
                <search/>
            </div>
        </div>
        <div class="listCon">
            <div class="list">
                <ul class="listHead">
                    <li><el-checkbox v-model="checked"> 序号</el-checkbox></li>
                    <li>操作员编码</li>
                    <li>操作员姓名</li>
                    <li>部门</li>
                    <li>组织</li>
                </ul>
            </div>
            <div class="list2">
                <ul v-for="n of 35" class="listContent">
                    <li><el-checkbox v-model="checked"> {{n}}</el-checkbox></li>
                    <li>是是是</li>
                    <li>dasds</li>
                    <li>部safd门</li>
                    <li>组fsdf织</li>
                </ul>
            </div>
        </div>
        <div class="pageArea">
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
        </div>
        
    </div>
</template>

<script>
import search from '@/components/searchInput/searchInput'
export default {
    name:'auditer',
    data(){
        return {
            options:[],
            search:'',
            checked:false,
            pageSize:30,
            pageIndex:1,
            total:0
        }
    },
    methods:{
        handleCurrentChange(){

        },
        handleSizeChange(){

        }
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

