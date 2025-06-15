if (localStorage.getItem("cartQuantity")) {
    document.querySelector(".cart-count").textContent =
      localStorage.getItem("cartQuantity"); //更新購物車數量顯示
    document.querySelector(".cart-count-col").textContent =
      localStorage.getItem("cartQuantity"); //更新手機版購物車數量顯示
  }
  let productDataList; //產品資料庫列表
  fetch("database.json") //請求讀取該檔案
    .then((response) => response.json()) //獲取的檔案轉為json物件
    .then((data) => {
      let cardList = document.querySelectorAll(".card");
      cardList.forEach((card) => {
        let showProduct = data[Math.floor(Math.random() * data.length)];
        card.querySelector(".card-img-top").src = showProduct.imgUrl;
        card.querySelector(".card-title").textContent = showProduct.name;
        //設置現時查詢的產品為點擊產品
        card
          .querySelector(".btn.btn-primary")
          .addEventListener("click", () => {
            localStorage.setItem(
              "currentProduct",
              JSON.stringify(showProduct)
            );
            window.location.href = "productDetail.html";
          });
      });
    });