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
            target:'',
            dw:'元'
          }
      },
      props: {
        chart:{
          type:Array,
          default(){
            return {}
          }
        },
        title:{
          type:Array,
          default(){
            return {}
          }
        },
      },
      watch:{
        chart(val){
          if(val){
            console.log(val)
            let maxNum=0;
            for(var i in val){
              if(val[i].value>maxNum){
                maxNum=val[i].value
              }
            }
            if(maxNum>=10000&&maxNum<100000000){
              this.dw='万元';
              for(var j in val){
                val[j].value=(val[j].value/10000).toFixed(2)
              }
            }else if(maxNum>=100000000){
              this.dw='亿元';
              for(var k in val){
                val[k].value=(val[k].value/100000000).toFixed(2)
              }
            }else{
              this.dw='元';
            }
            this.draw();
          }
        },
      },
      mounted() {
          this.chartsInit();
      },
      methods:{
        // 初始化图表
        chartsInit(){
          // 创建图表对象
          if(!this.chart.target){
            this.target = echarts.init(document.getElementById('piechart'), 'westeros')
          }
          // 绘制默认图表
          this.draw()
        },
          draw(){
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
                formatter:"{b}"
              },
              legend:{
                data:this.title,
                bottom:20
              },

              series:[
                {
                  type:'pie',
                  radius:'55%',
                  selectedMode:'single',
                  selectedOffset:10,
                  center:['50%','50%'],
                  clockwise:'true',
                  label:{
                    formatter: ['{c|{c}}','{d}%'].join('\n'),
                    position:'outside',
                    rich: {
                      c: {
                        color:'red',
                        lineHeight:20,
                        fontSize:20
                      },
                    }

                  },
                  labelLine:{
                    normal:{
                      length:10,
                      length2:5,
                      smooth:false,
                    }
                  },
                  data:this.chart
                }
              ]
            };
            if(!this.chart.target){
              this.target = echarts.init(document.getElementById('piechart'), 'westeros')
            }
            this.target.setOption(option)
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
