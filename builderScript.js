let cartProductList = JSON.parse(localStorage.getItem("cartProductList")); //從localStorage讀取購物車列表
//如未有購物車列表則初始化
if (cartProductList == null) {
  cartProductList = [];
}
//如localStorage存有購物車數量
if(localStorage.getItem("cartQuantity")){
document.querySelector(".cart-count").textContent = localStorage.getItem("cartQuantity"); //更新購物車數量顯示
document.querySelector(".cart-count-col").textContent = localStorage.getItem("cartQuantity"); //更新手機版購物車數量顯示
}
let categorySelect = document.querySelectorAll("#pc-builder select"); //獲得砌機分類元素
let totalPriceSpan = document.getElementById("totalPrice"); //獲得總價錢元素
let productDataList;//產品資料庫列表
fetch("database.json") //請求讀取該檔案
  .then((response) => response.json()) //獲取的檔案轉為json物件
  .then((data) => {
    productDataList = data; //獲得產品資料庫參數
    updateSelectCategory(); //更新砌機類元素
  });
//更新砌機類元素
function updateSelectCategory() {
  //遍歷每個分類元素
  categorySelect.forEach((element) => {
    //遍歷每個產品
    productDataList.forEach((data) => {
      if (data.category == element.id) {//如產品分類與分類元素id相同
        let newOption = document.createElement("option"); //創建newOption元素
        newOption.textContent = `${data.name} ($${data.price})`;
        newOption.value = data.price;
        newOption.dataset.product = JSON.stringify(data);
        element.appendChild(newOption);
      }
      element.addEventListener("change", () => optionChange(element)); //該元素添加監聽分類選項改變
    });
  });
}
//當填入的元素分類選項改變時觸發
function optionChange(element) {
  //計算總價錢
  let totalPrice = 0;
  categorySelect.forEach((select) => {
    totalPrice += Number(select.value);
  });
  totalPriceSpan.textContent = `$${totalPrice}`;
}
//加入購物車按鈕添加事件
document.getElementById("sendCart").addEventListener("click", () => {
  let totalPrice = document.getElementById("totalPrice").textContent;
  let message = "您選擇嘅砌機配件報價如下：\n";
  //遍歷所有分類
  categorySelect.forEach((element) => {
    if (element.selectedIndex != 0) {
      //如所選項目並非未選擇
      let product = JSON.parse(
        element.options[element.selectedIndex].dataset.product
      );
      let indexInCartProductList = cartProductList.findIndex(
        (value) => value.name === product.name
      );
      //如購物車內沒有該產品名字則index為-1並添加該產品進購物車列表
      if (indexInCartProductList < 0) {
        //購物車列表加入該產品名字和數量為1
        cartProductList.push({
          name: product.name,
          imgUrl: product.imgUrl,
          price: product.price,
          quantity: 1,
        });
      } else {
        cartProductList[indexInCartProductList].quantity++; //購物車列表內已有產品名字的數量增加
      }
      message += `${element.id}:${product.name}\n`;
    }
    message += `總價: ${totalPrice}\n`;
  });
  alert(message);
  let cartQuantity = 0; //重置購物車數量計數器
  //遍歷每個購物車產品
  cartProductList.forEach((data) => {
    cartQuantity += data.quantity; //累加總數量
  });
  document.querySelector(".cart-count").textContent = cartQuantity; //更新購物車數量顯示
  document.querySelector(".cart-count-col").textContent = cartQuantity; //更新手機版購物車數量顯示
  localStorage.setItem("cartProductList", JSON.stringify(cartProductList)); //將購物車列表存入localStorage
  localStorage.setItem("cartQuantity", cartQuantity); //將購物車數量存入localStorage
});
