let currentProduct = JSON.parse(localStorage.getItem("currentProduct"));
let cartProductList; //購物車列表
let productImg = document.getElementById("productImg");
let productName = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let confirmTips = document.querySelector(".confirmTips"); //獲得購物車確認提示框
productImg.src = currentProduct.imgUrl;
productName.textContent = currentProduct.name;
productDescription.innerHTML = currentProduct.description.replace(
  /\n/g,
  "<br>"
); //使文字描述的\n換行符生效
let demandQunatity = 1;
updateProductDetail(); //更新產品詳細
//為購物車關閉按鈕添加點擊隱藏提示框事件
document.getElementById("closeConfirmBtn").addEventListener("click", () => {
  confirmTips.style.display = "none"; //隱藏購物車確認提示框
});
function minusDemandtQuantity() {
  if (demandQunatity > 1) {
    //如果物件數量大於1
    demandQunatity--; //物件數量減1
  }
  updateProductDetail(); //更新產品詳細
}
function plusProductQuantity() {
  demandQunatity++;
  updateProductDetail(); //更新產品詳細
}
function addToCart() {
  cartProductList = JSON.parse(localStorage.getItem("cartProductList")); //從localStorage讀取購物車列表
  if (cartProductList == null) {
    cartProductList = [];
  }
  //查找產品名字在購物車的序列
  let indexInCartProductList = cartProductList.findIndex(
    (value) => value.name === currentProduct.name
  );
  //如購物車內沒有該產品名字則index為-1並添加該產品進購物車列表
  if (indexInCartProductList < 0) {
    //購物車列表加入該產品名字和數量為1
    cartProductList.push({
      name: currentProduct.name,
      imgUrl: currentProduct.imgUrl,
      price: currentProduct.price,
      quantity: demandQunatity,
    });
  } else {
    cartProductList[indexInCartProductList].quantity += demandQunatity; //購物車列表內已有產品名字的數量增加
  }
  localStorage.setItem("cartProductList", JSON.stringify(cartProductList)); //將購物車列表存入localStorage
  updateProductDetail();
  confirmTips.style.display = "block"; //顯示購物車確認提示框
}
function updateProductDetail() {
  cartProductList = JSON.parse(localStorage.getItem("cartProductList")); //從localStorage讀取購物車列表
  //如未有購物車列表則初始化
  if (cartProductList == null) {
    cartProductList = [];
  }
  document.getElementById(
    "productPrice"
  ).textContent = `HK$${currentProduct.price}`;
  document.getElementById("demandElement").textContent = demandQunatity; //更新需求數量顯示
  let cartQuantity = 0; //重置購物車數量計數器
  //遍歷每個購物車產品
  cartProductList.forEach((data) => {
    cartQuantity += data.quantity; //累加總數量
  });
  document.querySelector(".cart-count").textContent = cartQuantity; //更新標準購物車數量顯示
  document.querySelector(".cart-count-col").textContent = cartQuantity; //更新手機版購物車數量顯示
}
