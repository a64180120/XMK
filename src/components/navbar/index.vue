<template>
    <div class="navbar">
        <ul>
            <li class="navitem active" v-for="(item,index) of navlist" :key="index">
                <img src="../../assets/images/1_03.png" alt="">
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
            navlist:    [{url:'../../assets/images/1_03.png',name:'审批流管理',path:'/setting/audit/liucheng',children:[{name:'审批流程设置',path:'/setting/audit/liucheng'}]},
                    {url:'../../assets/images/1_14.png',name:'数据与安全维护',path:'/setting/audit/renyuan'}
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar{
    position:absolute;
    left:10px;
    top:150px;
    bottom:30px;
    width:170px;
    padding:10px 0px;
    font-size:0.16rem;
    border-radius: 10px;
    border-right:1px solid #ccc;
    box-shadow: 0 1px 5px #959595;
    background: url(../../assets/images/bj.gif) no-repeat;
    background-size:cover;
    li{
        padding: 0 5px 0 20px;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding:0 10px;
        cursor: pointer;
    }
    >ul{
        .navitem{
            height:40px;
            line-height: 40px;
            position:relative;
            cursor: pointer;
            color:$btnColor;
            img{
                vertical-align: middle;
                position: relative;
                top: -2px;
            }
            &:hover{
                background: $btnColor;
                color:#fff;
            }
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

