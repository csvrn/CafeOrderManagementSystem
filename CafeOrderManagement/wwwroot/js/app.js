
function toggleMenuItem(selectedItem) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    selectedItem.classList.add('active');
}
