let cartProductList = JSON.parse(localStorage.getItem("cartProductList")); //從localStorage讀取購物車列表
//如未有購物車列表則初始化
if (cartProductList == null) {
  cartProductList = [];
}
let categorySelect = document.querySelectorAll("#pc-builder select"); //獲得砌機分類元素
let totalPriceSpan = document.getElementById("totalPrice"); //獲得總價錢元素
categorySelect.forEach((element) => {
  updateSelectOption(element);
});
//更新所選砌機類元素下的項目
function updateSelectOption(element) {
  element.addEventListener("change", () => optionChange(element)); //該元素添加監聽分類選項改變
  fetch("database.json") //請求讀取該檔案
    .then((response) => response.json()) //獲取的檔案轉為json物件
    .then((productData) => {
      productData.forEach((data) => {
        if (data.category == element.id) {
          let newOption = document.createElement("option"); //創建newOption元素
          newOption.textContent = `${data.name} ($${data.price})`;
          newOption.value = data.price;
          newOption.dataset.product = JSON.stringify(data);
          element.appendChild(newOption);
        }
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
  const totalPrice = document.getElementById("totalPrice").textContent;
  let message = "您選擇嘅砌機配件報價如下：\n";
  //遍歷所有分類並
  categorySelect.forEach((element) => {
    if (element.selectedIndex != 0) {
      //如所選項目並非未選擇
      let addProduct = JSON.parse(
        element.options[element.selectedIndex].dataset.product
      );
      message += `${element.id}:${addProduct.name}\n`;
    }
  });
  // message += `CPU: ${cpu.options[cpu.selectedIndex].text}\n`;
  // message += `主機板: ${mb.options[mb.selectedIndex].text}\n`;
  // message += `顯示卡: ${gpu.options[gpu.selectedIndex].text}\n`;
  // message += `記憶體: ${ram.options[ram.selectedIndex].text}\n`;
  // message += `儲存裝置: ${storage.options[storage.selectedIndex].text}\n`;
  // message += `電源供應器: ${psu.options[psu.selectedIndex].text}\n`;
  // message += `機箱: ${pcCase.options[pcCase.selectedIndex].text}\n`;
  // message += `總價: ${totalPrice}`;
  alert(message);
});
