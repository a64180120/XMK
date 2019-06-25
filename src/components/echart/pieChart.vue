<template>
  <div id="piechart" class="chartArea"></div>
</template>

<script>
  import echarts from 'echarts'
  import '@/utils/echarts.theme.default'
    export default {
        name: "pieChart",
      data(){
          return {
            delay:false,//定时器延迟
            currentIndex:-1,//开始循环参数
            chart:'',//定时器
            chart2: {
              target: null,
              option: {
                title: {
                  text:'单位: 元',
                  textStyle:{
                    fontSize:13,
                    color:'red'
                  }
                },
                tooltip:{
                  trigger:'item',
                  formatter:"{b}"
                },
                legend:{
                  data:this.opinion,
                  bottom:20
                },

                series:[
                  {
                    type:'pie',
                    radius:['60%','76%'],
                    selectedMode:'single',
                    selectedOffset:10,
                    center:['50%','50%'],
                    clockwise:'true',
                    avoidLabelOverlap:false,
                    label:{
                      formatter: ['{b| {b}}','{c|{c}元}','{d| {d}%}'].join('\n'),
                      show:false,
                      position:'center',
                      rich: {
                        b:{
                          color:'#5f5b61',
                          lineHeight:20,
                          fontSize:18
                        },
                        c: {
                          color:'red',
                          lineHeight:20,
                          fontSize:20
                        },
                        d: {
                          color:'#3d99f6',
                          lineHeight:20,
                          fontSize:14
                        }
                      },
                      emphasis: {
                        show: true,
                      }
                    },
                    labelLine:{
                      normal:{
                        show:false,
                        length:10,
                        length2:5,
                        smooth:false,
                      }
                    },
                    data:this.opinionData
                  }
                ]
              }
            }
          }
      },
      props: {
        // 扇形区域名称
        opinion: {
          type: Array,
          default(){
            return []
          }
        },
        // 扇形区域数据
        opinionData: {
          type: Array,
          default(){
            return []
          }
        },
        //d单位
        dw: {
          type: String,
          default() {
            return '元'
          },
        }
      },
      watch:{
        opinionData(val){
          if(val){
            this.draw()
            var vm=this;
            if(vm.chart){
              vm.stopInfinite();
            }
            vm.chart=setInterval(vm.infinite,1300);
          }
        }
      },
      mounted() {
        this.$nextTick(() => {
          this.draw()
        })
      },
      methods:{
        chartsInit(){
          //debugger
          var vm=this;

          // window.addEventListener("resize", () => { vm.chart2.target.resize();});
          this.chart2.target.on('mouseover',function(params){
            //隐藏tooltip
            vm.chart2.target.dispatchAction({
              type: 'hideTip',
              seriesIndex: 0,
              dataIndex: vm.currentIndex
            });
            // 取消之前高亮的图形
            vm.chart2.target.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: vm.currentIndex
            });
            clearInterval(vm.chart);
            vm.delay=true;
            vm.chart=null;
            //显示tooltip
            vm.chart2.target.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: vm.currentIndex
            });
            // 高亮当前图形
            vm.chart2.target.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: params.dataIndex
            });

          })
          this.chart2.target.on('mouseout',function(params){
            vm.delay=false;
            vm.currentIndex=params.dataIndex;
            setTimeout(vm.delayInfinite,1500)
          })

        },
        //停止循环
        stopInfinite(){
          var vm=this;
          clearInterval(vm.chart);
          vm.delay=true;
          vm.chart=null;
          // 取消之前高亮的图形
          vm.chart2.target.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: vm.currentIndex
          });
          // 控制悬浮的tooltip显示
          vm.chart2.target.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0,
            dataIndex: vm.currentIndex
          });
        },
        //延时触发循环
        delayInfinite(){
          var vm = this;
          if(!vm.delay&&!vm.chart){
            vm.chart=setInterval(vm.infinite,1300);
          }
        },
        //高亮状态循环
        infinite() {
          var vm = this;
          var dataLen = vm.chart2.option.series[0].data.length;
          // 取消之前高亮的图形
          vm.chart2.target.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: vm.currentIndex
          });
          vm.currentIndex = (vm.currentIndex + 1) % dataLen;
          // 高亮当前图形
          vm.chart2.target.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: vm.currentIndex
          });
          // 显示 tooltip
          vm.chart2.target.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: vm.currentIndex
          });
        },

        draw(){
          var vm=this;
          // 创建图表对象
          if(!this.chart2.target){
            this.chart2.target = echarts.init(document.getElementById('piechart'), 'westeros')
          }
            let option={
              title: {
                text:'单位: '+this.dw,
                textStyle:{
                  fontSize:13,
                  color:'red'
                }
              },
              tooltip:{
                trigger:'item',
                formatter:"{b}",
                show:false
              },
              legend:{
                data:this.opinion,
                bottom:20
              },

              series:[
                {
                  type:'pie',
                  radius:['60%','76%'],
                  selectedMode:'single',
                  selectedOffset:10,
                  center:['50%','50%'],
                  clockwise:'true',
                  avoidLabelOverlap:false,
                  label:{
                    formatter: ['{b| {b}}','{c|{c}'+this.dw+'}','{d| {d}%}'].join('\n'),
                    show:false,
                    position:'center',
                    rich: {
                      b:{
                        color:'#5f5b61',
                        lineHeight:20,
                        fontSize:18
                      },
                      c: {
                        color:'red',
                        lineHeight:20,
                        fontSize:20
                      },
                      d: {
                        color:'#3d99f6',
                        lineHeight:20,
                        fontSize:14
                      }
                    },
                    emphasis: {
                      show: true,
                    }
                  },
                  labelLine:{
                    normal:{
                      show:false,
                      length:10,
                      length2:5,
                      smooth:false,
                    }
                  },
                  data:this.opinionData
                }
              ]
            };
          // 绘制默认图表
          console.log(this.chart2.option);
          console.log(option);
          //this.chart2.option=option;
          this.chart2.target.setOption(option);
          this.chartsInit();
          }
      }
    }
</script>

<style scoped>
  .chartArea{
    width: 100%;
    height:300px;
  }
</style>
