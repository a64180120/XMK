<template>
  <section>
    <div ref="number" class="wrap-container"></div>
    <div>支出预算总额({{dw}})</div>
  </section>

</template>

<script>
    export default {
        name: "num",
      props:{
          vv:{
            type:Number,
            default:0
        }
      },
      data(){
          return{
            oldValue:'1,000,000,00',
            newValue:0,
            html:'',
            dw:'元'
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
          this.html += '<div class="wrap" style="width: 0.43rem;"><span class="dw">'+this.dw+'</span></div>';
        },
        changeMove (t,tt){
            t=this.numFormate(t);
            tt=this.numFormate(tt);
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
              temp.forEach((v,k)=>{
                if(k==2){
                  temp[k]='.'
                }
                if(k>3&&(k-2)%4==0){
                  if(v=='.'||v==','){}else{temp[k]=','}
                }
              })
              startArr=temp.reverse();
              this.comDigitsScroll(startArr,endArr)
            }else{
              startArr = startArr.slice((startArr.length-endArr.length),startArr.length);
              this.comDigitsScroll(startArr,endArr);
            }
        },
        numFormate:function(value, decimals = 2, decPoint = '.', thousandsSep = ','){
          if (!value) return '0.00';
          value = (value + '').replace(/[^0-9+-Ee.]/g, '');
          let n = !isFinite(+value) ? 0 : +value;
          let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
          let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
          let dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
          let s = '';

          let toFixedFix = function (n, prec) {
            return '' + n.toFixed(2)
          }
          s = (prec ? toFixedFix(n, prec) : '' + n).split('.');
          let re = /(-?\d+)(\d{3})/
          while (re.test(s[0])) {
            s[0] = s[0].replace(re, '$1' + sep + '$2')
          }
          if ((s[1] || '').length < prec) {
            s[1] = s[1] || ''
            s[1] += new Array(prec - s[1].length + 1).join('0')
          }
          return s.join(dec)

        }
      },
      watch:{
          vv(cur,old) {
            if(cur>=10000&&cur<100000000){
              this.dw='万元';
              cur=(cur/10000).toFixed(2)
            }else if(cur>=100000000){
              this.dw='亿元';
              cur=(cur/100000000).toFixed(2)
            }else{
              this.dw='元';
              cur=Math.floor(cur).toFixed(2)
            }


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
    color:#f52c1d;
    font-size: .4rem;
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
      .dw{
        font-size: .2rem;
        color: #3294ec;
        vertical-align: center;
      }
      @for $i from 0 through 19{
        .pos#{$i}{
          top: -100% * $i;
        }
      };
    }
  }
</style>
