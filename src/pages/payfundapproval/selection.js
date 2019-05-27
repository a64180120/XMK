export function selection(cleck,data){
  let arr = []
  for (let i =0;i<cleck.length;i++){
    if (cleck[i]) {
      arr.push(data[i])
    }
  }
  return arr
}
