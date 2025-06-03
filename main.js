// 功能：實時監控所有選單，當用戶選擇或更改任何配件，會即時計算總價
// 用法：將 main.js 連結到 HTML，會自動作用

// 先取得所有 select（下拉選單）同總價顯示區域
const selects = document.querySelectorAll('#pc-builder select');
const totalPriceSpan = document.getElementById('totalPrice');

// 每當有選項改變，都會重新計算總價
selects.forEach(select => {
  select.addEventListener('change', calculateTotal);
});

// 計算總價的函數
function calculateTotal() {
  let total = 0;
  selects.forEach(select => {
    // 取出 value，轉為數字加總
    total += parseInt(select.value, 10);
  });
  // 顯示總價，未選的就當$0
  totalPriceSpan.textContent = `$${total}`;
}

// 預設顯示為 $0
calculateTotal();
