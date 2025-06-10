let cartProductList = JSON.parse(localStorage.getItem("cartProductList"));//從localStorage讀取購物車列表
updateCartPanel();
function updateCartPanel() {
    let cartPanel = document.getElementById("cartPanel"); //獲得產品介面元素
    localStorage.setItem("cartProductList", JSON.stringify(cartProductList)); //將購物車列表存入localStorage
    cartPanel.innerHTML = ""; //重置產品介面元素為空
    //遍歷每個購物車產品
    cartProductList.forEach((data) => {
        let newDiv = document.createElement("div"); //創建div元素
        newDiv.classList.add("row"); //屬性添加bootstrap row
        newDiv.innerHTML =
            `<img class="col-3" src="${data.imgUrl}" alt="${data.name}">
       <div class="col-3">
        <div>${data.name}</div>
        <div>HK$${data.price}</div>
        <button onclick='minusProductQuantity(${JSON.stringify(data)})'>-</button>
        <span>${data.quantity}</span>
        <button onclick='plusProductQuantity(${JSON.stringify(data)})'>+</button>
        <img onclick='clearProductQuantity(${JSON.stringify(data)})' src="./img/trash.svg" style="width: 20px line-height: 1; cursor: pointer;">
       </div>`;
        cartPanel.appendChild(newDiv);
    });
}
function minusProductQuantity(product) {
    let indexInCartProductList = cartProductList.findIndex((value) => value.name === product.name);//查找在陣列中的操作目標產品物件的序號
    if (cartProductList[indexInCartProductList].quantity > 1) //如果物件數量大於1
    {
        cartProductList[indexInCartProductList].quantity--; //物件數量減1
    }
    else {
        cartProductList.splice(indexInCartProductList, 1); //如果物件數量等於1則從陣列中刪除該物件
    }
    updateCartPanel();//更新購物車數量
}
function plusProductQuantity(product) {
    let indexInCartProductList = cartProductList.findIndex((value) => value.name === product.name);//查找在陣列中的操作目標產品物件的序號
    cartProductList[indexInCartProductList].quantity++; //物件數量加1
    updateCartPanel();//更新購物車數量
}
function clearProductQuantity(product){
    console.log("dd");
    let indexInCartProductList = cartProductList.findIndex((value) => value.name === product.name);
    cartProductList.splice(indexInCartProductList, 1);//從陣列中刪除該物件
    updateCartPanel();//更新購物車數量
}