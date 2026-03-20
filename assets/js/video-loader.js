document.addEventListener("DOMContentLoaded", function () {

const loader = document.getElementById("page-loader");

if(!loader) return;

function hideLoader(){

loader.style.opacity = "0";

setTimeout(()=>{
loader.style.display = "none";
},800);

}

/* Reduced preload time */

setTimeout(()=>{

hideLoader();

},3000);

});