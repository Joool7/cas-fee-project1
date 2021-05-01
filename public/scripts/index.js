const selector = document.getElementById("color-style");

selector.onchange = function(){
    console.log("Bli");
    document.body.classList.toggle("dark-mode");
}