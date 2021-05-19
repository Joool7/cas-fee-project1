const selector = document.getElementById("color-style");

selector.onchange = function(){
    document.body.classList.toggle("dark-mode");
}