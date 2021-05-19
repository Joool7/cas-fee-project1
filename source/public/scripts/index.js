const selector = document.getElementById('color-style');

selector.onchange = function togglePageStyle() {
    document.body.classList.toggle('dark-mode');
};
