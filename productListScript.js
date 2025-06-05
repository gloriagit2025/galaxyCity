fetch("/database.json")
  .then((response) => response.json()) // 正確解析 JSON 數據
  .then((productData) => {
    productData.forEach((data) => {
      let newDiv = document.createElement("div");
      newDiv.innerHTML="";

      document.getElementById("productPanel").appendChild(newDiv);
    });
  });
