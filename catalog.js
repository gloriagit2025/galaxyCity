// catalog.js — 處理左側分類點擊，顯示對應主區內容
document.querySelectorAll('.sidebar li').forEach(item => {
  item.addEventListener('click', function() {
    // 移除所有active
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    this.classList.add('active');

    // 隱藏所有分類區
    document.querySelectorAll('.category-panel').forEach(panel => panel.style.display = 'none');
    // 顯示對應分類
    const category = this.getAttribute('data-category');
    document.getElementById(category).style.display = 'block';
  });
});
