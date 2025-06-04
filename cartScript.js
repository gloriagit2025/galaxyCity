fetch("/database.json")
  .then(response => response.json()) // 正確解析 JSON 數據
  .then(userData => {
    let newDiv = document.createElement("div");
    newDiv.textContent = JSON.stringify(userData); // 確保顯示為字串
    document.body.appendChild(newDiv);
  })

  