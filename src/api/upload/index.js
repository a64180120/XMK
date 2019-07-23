
import Vue from 'vue'

export function testUpload(param){
    return Vue.prototype.formAxios('GBK/PaymentMstApi/PostAddfj',param)
}
// 支付单送审附件
export function PostUploadFile(param){
    return Vue.prototype.formAxios('GBK/PaymentMstApi/PostUploadFile',param)
}


/*打印*/
export function printTable(vm){
  const loading=vm.$loading({lock:true,text:'请等待', spinner:'el-icon-loading',background:'rgba(0,0,0,0.7)'})
  //获取打印内容，渲染于弹窗
  let print = document.createElement("div");
  print.setAttribute('class','print');
  print.style.padding='10px 20px 10px 20px';
  //获取页面显示的打印表格的表头
  let dm = vm.$refs.printArea.parentElement.parentElement.firstElementChild.nextElementSibling.childNodes[0].childNodes[2].cloneNode(true);
  //获取页面的表格内容
  let cop = vm.$refs.printArea.cloneNode(true);
  //表格内容拼接表头
  cop.insertBefore(dm,cop.childNodes[2]);
  print.appendChild(cop);
  vm.$print(print);
  loading.close();
}
/**/
//表格滚动事件
export function tableScroll(el,vm) {

  let scObj = document.getElementById(el);
  let topHeight=scObj.scrollTop;
  console.log(topHeight)
  let childList=scObj.firstElementChild.firstElementChild.childNodes;
  if(topHeight>0){
    for(var i in childList){
      if(childList[i].nodeType==1){
        childList[i].style.top=topHeight + 'px';
      }
    }
  }else{
    for(var i in childList){
      if(childList[i].nodeType==1){
        childList[i].style.top='0px';
      }
    }
  }
  console.log(scObj);
}
