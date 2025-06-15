let cartProductList = JSON.parse(localStorage.getItem("cartProductList")); //從localStorage讀取購物車列表
//如未有購物車列表則初始化
if (cartProductList == null) {
  cartProductList = [];
}
let categoryList = document.querySelectorAll("#categoryList li"); //獲取所有分類按鈕
let showCategory = "全部商品"; //默認顯示分類為全部商品
let productPanel = document.getElementById("productPanel"); //獲得產品介面元素
let confirmTips = document.querySelector(".confirmTips"); //獲得購物車確認提示框
let productDataList;//產品資料庫列表
fetch("database.json") //請求讀取該檔案
  .then((response) => response.json()) //獲取的檔案轉為json物件
  .then((data) => {
    productDataList = data; //獲得產品資料庫參數
    updateCartPanel(); //更新購物車介面
  });
//更新購物車介面
function updateCartPanel() {
  let cartQuantity = 0; //重置購物車數量計數器
  //遍歷每個購物車產品
  cartProductList.forEach((data) => {
    cartQuantity += data.quantity; //累加總數量
  });
  localStorage.setItem("cartProductList", JSON.stringify(cartProductList)); //將購物車列表存入localStorage
  localStorage.setItem("cartQuantity", cartQuantity); //將購物車數量存入localStorage
  document.querySelector(".cart-count").textContent = cartQuantity; //更新標準購物車數量顯示
  document.querySelector(".cart-count-col").textContent = cartQuantity; //更新手機版購物車數量顯示
  productPanel.innerHTML = ""; //重置產品介面元素為空
  //遍歷每個產品
  productDataList.forEach((data) => {
    //如果現時顯示分類為全部商品或產品分類為現時顯示分類
    if (showCategory === "全部商品" || data.category === showCategory) {
      let newDiv = document.createElement("div"); //創建div元素
      newDiv.classList.add("row"); //屬性添加bootstrap row
      newDiv.innerHTML = `<img class="col-3" src="${data.imgUrl}" alt="${data.name
        }">
       <div class="col-3">
        <div>${data.name}</div>
        <div>HK$${data.price}</div>
        <a class="d-block" href="productDetail.html" onclick='setCurrentProduct(${JSON.stringify(data)})' target="_blank">產品詳情</a>
        <button class="d-block btn btn-success" onclick='addToCart(${JSON.stringify(data)})'>加入購物車</button>
       </div>`;
      productPanel.appendChild(newDiv);
    }
  });
};
//加入購物車
function addToCart(product) {
  //查找產品名字在購物車的序列
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
  updateCartPanel(); //更新購物車介面
  confirmTips.style.display = "block"; //顯示購物車確認提示框
}
//為分類列表每個分類按鈕添加點擊事件
categoryList.forEach((category) => {
  category.addEventListener("click", () => {
    //遍歷每個分類按鈕去移除所有分類按鈕的類別
    categoryList.forEach((category) => {
      category.classList.remove("active"); //移除該按鈕的active類別
    });
    category.classList.add("active"); //使點擊的分類按鈕高亮active類別
    showCategory = category.textContent; //現時分類為該分類按鈕文字內容
    updateCartPanel(); //更新購物車介面
  });
});
//為購物車關閉按鈕添加點擊隱藏提示框事件
document.getElementById("closeConfirmBtn").addEventListener("click", () => {
  confirmTips.style.display = "none"; //隱藏購物車確認提示框
});
//設置現時查詢的產品
function setCurrentProduct(product) {
  localStorage.setItem("currentProduct",JSON.stringify(product));
}