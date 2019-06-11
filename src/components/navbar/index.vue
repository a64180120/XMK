<template>
    <div class="navbar">
        <ul>
            <li @mouseenter="liActive(item,true)" @mouseleave="liActive(item,false)" :class="{choose:choosed==index}" class="navitem active" v-for="(item,index) of navlist" :key="index">
                <div @click.stop="routerto(item.path)">
                    <img v-show="!item.active&&choosed!=index" src="../../assets/images/1_03.png" alt="">
                    <img v-show="choosed==index||item.active" src="../../assets/images/2_03.png" alt="">
                    <span :title="item.name">{{item.name}}</span>    
                </div>
                <div class="subitemCon">
                     <ul v-if="item.children" class="subitem">
                        <li @click.stop="routerto(nav.path,index)" :title="nav.name" v-for="nav of item.children">{{nav.name}}</li>
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
            navlist:    [{url:'../../assets/images/1_03.png',name:'审批流管理',children:[{name:'审批流程设置',path:'/setting/audit'},{name:'岗位人员设置',path:'/setting/post'}]},
                    {url:'../../assets/images/1_14.png',name:'数据与安全维护',children:[{name:'数据字典',path:'/setting/dictionary'},{name:'支付口令设置',path:'/setting/paypassword'}]}
            ],
            active:false,
            choosed:0
        }
    },
    methods:{
        routerto(url,index){
            if(url){
                this.$router.push(url);
                this.choosed=index;
            }
            
        },
        liActive(item,bool){
            this.$set(item,'active',bool);
        }
    }
}
</script>

<style lang="scss" scoped>
$activeColor:#59abf1;
.navbar{
    position:absolute;
    left:10px;
    top:160px;
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
                background: $activeColor;
                color:#fff;
                .subitemCon{
                    display: block;
                    z-index: 9;
                }
            }
            .subitemCon{
                position:absolute;
                left:100%;
                top:0;
                padding:0 10px;
                background: $btnColor;
                display: none;
                border-radius: 0 5px 5px 0;
                box-shadow: 2px 2px 5px #9f9c9c;
                .subitem{
                   
                    >li{
                        width:150px;
                        height:40px;
                        line-height: 40px;
                        text-align: center; 
                        &:active{
                            background: $activeColor;
                        }
                    }
                }
            }
            
        }
        .active{
            overflow: inherit;
        }
        .choose{
            background: $activeColor;
            color:#fff;
        }
    }
}
</style>

