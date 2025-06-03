// main.js 功能：即時計算砌機總價
const selects = document.querySelectorAll('#pc-builder select');
const totalPriceSpan = document.getElementById('totalPrice');

selects.forEach(select => {
  select.addEventListener('change', calculateTotal);
});

function calculateTotal() {
  let total = 0;
  selects.forEach(select => {
    total += parseInt(select.value, 10);
  });
  totalPriceSpan.textContent = `$${total}`;
}

calculateTotal();
