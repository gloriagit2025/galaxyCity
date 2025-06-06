let cartProductList = [];//重置購物車列表
let productPanel = document.getElementById("productPanel"); //獲得產品介面元素
fetch("database.json") //請求讀取該檔案
  .then((response) => response.json()) //獲取的檔案轉為json物件
  .then((productData) => {
    //獲得產品資料庫參數
    productPanel.innerHTML = ""; //重置產品介面元素為空
    productData.forEach((data) => {
      //遍歷每個產品
      let newDiv = document.createElement("div"); //創建div元素
      newDiv.classList.add("row"); //屬性添加bootstrap row
      newDiv.innerHTML = `<img class="col-3" src="${data.imgUrl}" alt="${data.name}">
       <div class="col-3">
        <div>${data.name}</div>
        <div>HK$${data.price}</div>
        <button onclick="addToCart('${data.name}')">加入購物車</button>
       </div>`;
      productPanel.appendChild(newDiv);
    });
  });
function addToCart(productName) {//加入購物車
  //查找產品名字在購物車的序列
  let indexInCartProductList = cartProductList.findIndex(
    (value) => value.name === productName
  );
  console.log(indexInCartProductList);
  //如購物車內沒有該產品名字則index為-1並添加該產品進購物車列表
  if (indexInCartProductList < 0) {
    //購物車列表加入該產品名字和數量為1
  cartProductList.push({
    name: productName,
    quantity: 1,
  });
  }
  else{
    cartProductList[indexInCartProductList].quantity++;//購物車列表內已有產品名字的數量增加
  }
}
