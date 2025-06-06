let productPanel = document.getElementById("productPanel");//獲得產品介面元素
fetch("/database.json")//請求讀取該檔案
  .then((response) => response.json())//獲取的檔案轉為json物件
  .then((productData) => {//獲得產品資料庫參數
    productPanel.innerHTML = "";//重置產品介面元素為空
    productData.forEach((data) => {//遍歷每個產品
      let newDiv = document.createElement("div");//創建div元素
      newDiv.className = "row"//屬性設為bootstrap row
      newDiv.innerHTML = `<p class="col-3">${data.name}</p><img class="col-3" src="${data.imgUrl}" alt="${data.name}">`;
      productPanel.appendChild(newDiv);
    });
  });
