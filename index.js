const array = [1, 2, 3, 4, 4, 5, 6, 6];
const uniqueArray = array.filter((value, index, self) => {
   let aa =  self.indexOf(value) === index
   console.log("aaA  "+ aa)
//    console.log('index   '+index)
//    console.log('value  '+value) 
return aa

});

console.log(uniqueArray);