<template>
    <div class="navbar">
        <ul>
            <li class="navitem active" v-for="(item,index) of navlist" :key="index">
                <span :title="item.name">{{item.name}}</span>
                <div class="subitemCon">
                     <ul v-if="item.children" class="subitem">
                        <li :title="nav.name" v-for="nav of item.children">{{nav.name}}</li>
                    </ul>
                </div> 
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'navbar',
    data(){
        return{
            navlist:    [{name:'审批流管理',path:'/setting/audit/liucheng',children:[{name:'审批流程设置',path:'/setting/audit/liucheng'}]},
                    {name:'数据与安全维护',path:'/setting/audit/renyuan'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar{
    position:absolute;
    left:0;
    top:100px;
    bottom:0px;
    width:150px;
    padding:10px 0px;
    font-size:0.16rem;
    border-right:1px solid #ccc;
    li{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding:0 10px;
        cursor: pointer;
    }
    >ul{
        .navitem{
            height:30px;
            line-height: 30px;
            position:relative;
            .subitemCon{
                position:absolute;
                left:101%;
                top:0;
                padding:10px;
                .subitem{
                   
                    >li{
                        width:150px;
                        height:30px;
                        line-height: 30px; 
                    }
                }
            }
            
        }
        .active{
            overflow: inherit;
        }
    }
}
</style>

