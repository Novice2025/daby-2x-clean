/* ============================= */
/* CONVERSION LAYER */
/* ============================= */

/* 🔥 Sticky CTA after scroll */
window.addEventListener("scroll", function(){

if(window.scrollY > 500 && !document.body.classList.contains("cta-visible")){
document.body.classList.add("cta-visible");

let cta = document.createElement("div");
cta.id = "sticky-cta";

cta.innerHTML = `
<a href="https://wa.me/5511986108003"
onclick="trackWhatsAppClick()"
target="_blank">
Receber apresentação das aulas
</a>
`;

document.body.appendChild(cta);
}

});
