<template>
  <div ref="number" class="wrap-container"></div>
</template>

<script>
    export default {
        name: "num",
      props:{
          vv:{
            type:String,
            default:'000.00'
        }
      },
      data(){
          return{
            oldValue:'1,000,000,00',
            newValue:0,
            html:''
          }
      },
      mounted(){
        this.newValue=this.vv;
        this.changeMove(this.oldValue,this.newValue);
        this.$refs.number.innerHTML=this.html;
      },

      methods:{
          move(t){
            t.toString().split('').forEach(v=>{
              this.html += '<div class="wrap"><ul class="list pos' + v +' scroll0-'+ v +'">';
              for(let i=0 ; i<=9 ; i++){
                this.html+='<li>'+i+'</li>';
              }
              this.html+='</ul></div>'
            })
            this.$refs.number.innerHTML = this.html;
          },
        comDigitsScroll(startArr,endArr){
            startArr.forEach((v,k)=>{
              if(v==','||v=='.'){
                this.html += '<div class="wrap">'+v+'</div>';
              }else{
                this.html += '<div class="wrap"><ul class="list pos' + endArr[parseInt(k)] +' scroll'+ v +'-'+endArr[parseInt(k)]+'">';
                for(let i=0 ; i<=9 ; i++){
                  this.html+='<li>'+i+'</li>';
                }
                this.html+='</ul></div>'
              }

            })
        },
        changeMove (t,tt){
            let startArr=t.toString().split(''),
              endArr=tt.toString().split('');
            if(startArr.length === endArr.length){
              this.comDigitsScroll(startArr,endArr)
            }else if(startArr.length<endArr.length){
              let tmpArr = [];
              for(let i=0 ; i<(endArr.length-startArr.length) ; i++){
                tmpArr.push('0');
              }
              startArr = tmpArr.concat(startArr);
              let temp=startArr.reverse();
              console.log(temp);
              temp.forEach((v,k)=>{
                console.log(k);
                if(k==2){
                  temp[k]='.'
                }
                if(k>3&&(k-2)%4==0){
                  if(v=='.'||v==','){}else{temp[k]=','}
                }
              })
              console.log(temp)
              startArr=temp.reverse();
              this.comDigitsScroll(startArr,endArr)
            }else{
              startArr = startArr.slice((startArr.length-endArr.length),startArr.length);
              this.comDigitsScroll(startArr,endArr);
            }
        }
      },
      watch:{
          vv(cur,old) {
            this.newValue = cur || 0;
            this.oldValue = old || 0;
            this.html = '';
            this.changeMove(this.oldValue,this.newValue);
            this.$refs.number.innerHTML=this.html;
          }
      }

    }
</script>

<style lang="scss">
@for $i from 0 through 9 {
  @for $j from 0 through 9 {
    @keyframes move#{$i}-#{$j} {
      0%{
        top: -100% * $i;
      }
      100%{
        top: -100% * $j;
      }
    }
  }
}
@for $i from 0 through 9 {
  @for $j from 0 through 9 {
    .scroll#{$i}-#{$j} {
      animation: 0.5s move#{$i}-#{$j} linear;
    }
  }
}
  .wrap-container {
    white-space: nowrap;
    .wrap{
      width: .23rem;
      height: .4rem;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      font-size: .4rem;
      line-height: .3rem;
      display: inline-block;
      .list{
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        height: 100%;
        box-sizing: border-box;
        li{
          width: .25rem;
          height: .4rem;
          line-height: .4rem;
          text-align: center;
          float: left;
        }
      }
      @for $i from 0 through 19{
        .pos#{$i}{
          top: -100% * $i;
        }
      };
    }
  }
</style>
