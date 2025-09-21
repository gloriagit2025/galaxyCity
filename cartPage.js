let cartProductList = JSON.parse(localStorage.getItem("cartProductList")); //從localStorage讀取購物車列表
let cartPanel = document.getElementById("cartPanel"); //獲得產品介面元素
let travelFee = 0;
updateCartPanel();
function updateCartPanel() {
  cartPanel.innerHTML = ""; //重置產品介面元素為空
  let cartQuantity = 0; //重置購物車數量計數器
  let cartTotalPrice = 0; //重置購物車總價格計數器
  //遍歷每個購物車產品
  cartProductList.forEach((data) => {
    cartQuantity += data.quantity; //累加總數量
    cartTotalPrice += data.price * data.quantity; //累加總價格
    let newDiv = document.createElement("div"); //創建div元素
    newDiv.classList.add("row"); //屬性添加bootstrap row
    newDiv.innerHTML = `<img class="col-3" src="${data.imgUrl}" alt="${
      data.name
    }">
       <div class="col-3">
        <div>${data.name}</div>
        <div>HK$${data.price}</div>
        <button onclick='minusProductQuantity(${JSON.stringify(
          data
        )})'>-</button>
        <span>${data.quantity}</span>
        <button onclick='plusProductQuantity(${JSON.stringify(
          data
        )})'>+</button>
        <img onclick='clearProductQuantity(${JSON.stringify(
          data
        )})' src="./img/trash.svg" style="width: 20px line-height: 1; cursor: pointer;">
       </div>`;
    cartPanel.appendChild(newDiv);
  });
  localStorage.setItem("cartProductList", JSON.stringify(cartProductList)); //將購物車列表存入localStorage
  localStorage.setItem("cartQuantity", cartQuantity); //將購物車數量存入localStorage
  document.querySelector(".cartPaymentPrice").textContent = cartTotalPrice; //更新購物車價格
  document.querySelector(".beforeFeePrice").textContent = cartTotalPrice; //更新附加費前價格
  document.querySelector(".additionFee").textContent = travelFee; //更新費用
  document.querySelector(".totalPaymentPrice").textContent = cartTotalPrice+travelFee; //更新總費用價格
  document.querySelector(".cart-count").textContent =
    localStorage.getItem("cartQuantity"); //更新購物車數量顯示
  document.querySelector(".cart-count-col").textContent =
    localStorage.getItem("cartQuantity"); //更新手機版購物車數量顯示
  if (cartProductList.length === 0) {
    //如果購物車內沒有產品
    document.querySelector(".cartTips").style.display = "flex"; //顯示購物車尚未有產品提示
    document.querySelector(".cartPaymentPanel").style.display = "none"; //隱藏購物車結帳介面
  } else {
    document.querySelector(".cartTips").style.display = "none"; //隱藏購物車尚未有產品提示
    document.querySelector(".cartPaymentPanel").style.display = "block"; //顯示購物車結帳介面
  }
}


function minusProductQuantity(product) {
  let indexInCartProductList = cartProductList.findIndex(
    (value) => value.name === product.name
  ); //查找在陣列中的操作目標產品物件的序號
  if (cartProductList[indexInCartProductList].quantity > 1) {
    //如果物件數量大於1
    cartProductList[indexInCartProductList].quantity--; //物件數量減1
  } else {
    cartProductList.splice(indexInCartProductList, 1); //如果物件數量等於1則從陣列中刪除該物件
  }
  updateCartPanel(); //更新購物車數量
}
function plusProductQuantity(product) {
  let indexInCartProductList = cartProductList.findIndex(
    (value) => value.name === product.name
  ); //查找在陣列中的操作目標產品物件的序號
  cartProductList[indexInCartProductList].quantity++; //物件數量加1
  updateCartPanel(); //更新購物車數量
}
function clearProductQuantity(product) {
  let indexInCartProductList = cartProductList.findIndex(
    (value) => value.name === product.name
  );
  cartProductList.splice(indexInCartProductList, 1); //從陣列中刪除該物件
  updateCartPanel(); //更新購物車數量
}
function clearCart() {
  cartProductList = []; //清空購物車列表
  updateCartPanel(); //更新購物車介面
}
function chooseTravelMethod(fee) {
  travelFee = fee;
  updateCartPanel();
}
const boxs = document.querySelectorAll(".delbox");
boxs.forEach((box) => {
  box.addEventListener("click", () => {
    boxs.forEach((b) => {
      b.classList.remove("selected");
    });
    box.classList.add("selected");
  });
});

function collapseDel() {
  const container = document.getElementById("del-container");
  if (container.style.display == "none") {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
}
function collapseInfo() {
  const container = document.getElementById("info-container");
  if (container.style.display == "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
}

function collapsePay() {
  const container = document.getElementById("pay-container");
  if (container.style.display == "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
}
function handlePayment() {
  let valid = true;

  const selectedDel = document.querySelector(".selected");
  if (!selectedDel) {
    alert("請選擇運送方式");
    valid = false;
  }
  if (valid) {
    const infoForm = document.getElementById("info-container");
    if (!infoForm.checkValidity()) {
      valid = false;
      const inputs = infoForm.querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
          alert(`請輸入正確的送貨資料:${inputs[i].name}`);
          break;
        }
      }
    }
  }

  if (valid) {
    const paymentForm = document.getElementById("payment-form");
    if (!paymentForm.checkValidity()) {
      valid = false;
      const inputs = paymentForm.querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
          alert(`請輸入正確的付款資料:${inputs[i].name}`);
          break;
        }
      }
    }
  }

  if (valid) {
    if(localStorage.getItem('user')){
      alert("交易成功");
    localStorage.removeItem("cartProductList");
    }else{
      localStorage.setItem("prePage",'/cartPage.html')
      window.location.href='/login.html'
    }
    
  }
}
