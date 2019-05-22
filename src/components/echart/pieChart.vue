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
            chart:[]
          }
      },
      props: {
        chartData: Array
      },
      watch:{
        chartData(){
          if(this.chartData){
            this.chart=this.chartData;
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
              tooltip:{},
              legend:{
                data:['视频广告','联盟广告','邮件营销','直接访问'],
                bottom:20
              },

              series:[
                {
                  type:'pie',
                  radius:'50%',
                  center:'center',
                  label:{
                    normal:{
                       formatter:'{c}',
                      position:'inside'
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
