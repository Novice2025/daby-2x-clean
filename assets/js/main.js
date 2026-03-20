document.addEventListener("DOMContentLoaded", () => {

console.log("main.js loaded.");

/* SCROLL TO QUIZ */
const startBtn = document.getElementById("startQuizBtn");

if(startBtn){
  startBtn.addEventListener("click", () => {
    document.getElementById("quiz").scrollIntoView({
      behavior: "smooth"
    });
  });
}

function qualifyLead(isQualified){

if(!isQualified){

alert("This program is designed for professionals operating in strategic environments.");

return;

}

const result = getResult(totalScore);

sendToWhatsApp(result.message);

}

/* ============================= */
/* PAGE LOADER */
/* ============================= */

const pageLoader = document.getElementById('page-loader');

function hidePageLoader(){
if(pageLoader){
pageLoader.style.opacity="0";
pageLoader.addEventListener("transitionend",()=>{
pageLoader.style.display="none";
if(typeof initHeroAnimations==="function") initHeroAnimations();
},{once:true});
}
}

/* ============================= */
/* SECTION LOADER */
/* ============================= */

async function loadSection(sectionId,filePath){

const container=document.getElementById(sectionId+"-section");
if(!container) return;

try{

const response=await fetch(filePath);
const content=await response.text();

container.innerHTML=content;

if(typeof initScrollReveal==="function") initScrollReveal();
if(typeof initMagneticElements==="function") initMagneticElements();

if(sectionId==="testimonials" && typeof initCarousel==="function"){
initCarousel();
}

}catch(error){
console.error("Error loading "+sectionId,error);
}

}

/* ============================= */
/* SECTIONS MAP */
/* ============================= */

const sectionsToLoad={
'professional-reality':'sections/problem.html',
'identity-shift':'sections/posicionamento.html',
'metodo':'sections/metodo.html',
'program':'sections/programas.html',
'framework':'sections/framework.html',
'testimonials':'sections/depoimentos.html',
'cta':'sections/cta.html',
'footer':'sections/footer.html'
};

/* ============================= */
/* LOAD ALL SECTIONS */
/* ============================= */

Promise.all(
Object.entries(sectionsToLoad)
.map(([id,path])=>loadSection(id,path))
).then(()=>{
if(typeof initParticles==="function") initParticles();
});

/* ============================= */
/* GLOBAL INIT */
/* ============================= */

if(typeof initMagneticElements==="function") initMagneticElements();
if(typeof initScrollReveal==="function") initScrollReveal();
if(typeof initNavbarScrollEffect==="function") initNavbarScrollEffect();

/* ============================= */
/* MAGNETIC EFFECT */
/* ============================= */

function applyMagneticEffect(selector, intensity = 0.1, scale = 1.05){

document.querySelectorAll(selector).forEach(button=>{

button.addEventListener('mousemove',e=>{

const rect=button.getBoundingClientRect();

const moveX=(e.clientX-rect.left-rect.width/2)*intensity;
const moveY=(e.clientY-rect.top-rect.height/2)*intensity;

button.style.transform=`translate(${moveX}px,${moveY}px) scale(${scale})`;

});

button.addEventListener('mouseleave',()=>{
button.style.transform='translate(0,0) scale(1)';
});

});

}

applyMagneticEffect('a.btn-primary.magnetic',0.12,1.05);
applyMagneticEffect('a.btn-secondary.magnetic',0.06,1.02);

/* ============================= */
/* COUNTERS */
/* ============================= */

const counters = document.querySelectorAll(".metric-number");

function startCounters(){

counters.forEach(counter=>{

const target = +counter.getAttribute("data-target") || 0;
let count = 0;
const increment = target / 100;

function update(){
count += increment;
if(count < target){
counter.innerText = Math.floor(count);
requestAnimationFrame(update);
}else{
counter.innerText = target;
}
}

update();

});

}

const metricsSection = document.querySelector(".authority-metrics");

if(metricsSection){

const observer = new IntersectionObserver(entries=>{
if(entries[0].isIntersecting){
startCounters();
observer.disconnect();
}
});

observer.observe(metricsSection);

}

/* ============================= */
/* LEAD FORM */
/* ============================= */

window.sendLead = function(){

const name = document.getElementById("name").value.trim();
const phone = document.getElementById("phone").value.trim();
const challenge = document.getElementById("challenge").value;

if(!name){
alert("Por favor, insira seu nome.");
return;
}

if(phone.length < 10){
alert("Digite um WhatsApp válido.");
return;
}

if(!challenge){
alert("Selecione seu principal desafio.");
return;
}

/* UI FEEDBACK */

const confirmation = document.createElement("div");

confirmation.innerText = "Conectando você a um diagnóstico executivo...";

Object.assign(confirmation.style,{
position:"fixed",
bottom:"40px",
left:"50%",
transform:"translateX(-50%)",
background:"#0f172a",
color:"#fff",
padding:"14px 22px",
borderRadius:"8px",
fontSize:"14px",
zIndex:"9999",
boxShadow:"0 10px 25px rgba(0,0,0,.35)"
});

document.body.appendChild(confirmation);

/* WHATSAPP MESSAGE */

const message = encodeURIComponent(
`Olá, meu nome é ${name}.

Meu WhatsApp: ${phone}

Meu principal desafio em inglês é: ${challenge}.

Gostaria de receber uma apresentação das aulas e entender como posso evoluir minha comunicação profissional em inglês.`
);

/* TRACK */
trackWhatsAppClick();

/* OPEN */
setTimeout(()=>{
window.open(`https://wa.me/5511986108003?text=${message}`, "_blank");
},1200);

};

/* ============================= */
/* CTA TRACKING */
/* ============================= */

document.querySelectorAll('a[href*="wa.me"]').forEach(link=>{
link.addEventListener("click",trackWhatsAppClick);
});

/* ============================= */
/* BUTTON ACTIVATION */
/* ============================= */

const phoneInput = document.getElementById("phone");
const leadButton = document.querySelector(".diagnostic-btn");

if(phoneInput && leadButton){

leadButton.disabled = true;

phoneInput.addEventListener("input",()=>{

if(phoneInput.value.length >= 10){
leadButton.disabled = false;
leadButton.style.opacity="1";
}else{
leadButton.disabled = true;
leadButton.style.opacity="0.6";
}

});

}


/* ============================= */
/* SCROLL POPUP (MID PAGE ONLY) */
/* ============================= */

const popupBox = document.getElementById("presentation-box");
const closePopupBtn = document.getElementById("close-popup");

if(popupBox){

let popupShown = false;

function showPopup(){
if(popupShown) return;

popupShown = true;

popupBox.style.display = "block";

setTimeout(()=>{
popupBox.classList.add("show");
},10);
}

function hidePopup(){
popupBox.classList.remove("show");

setTimeout(()=>{
popupBox.style.display = "none";
},300);
}

if(closePopupBtn){
closePopupBtn.addEventListener("click", hidePopup);
}

/* 🔥 SCROLL TRIGGER ONLY */
window.addEventListener("scroll", function(){

let scrollPosition = window.scrollY;
let pageHeight = document.body.scrollHeight - window.innerHeight;

/* 👉 50% of page */
if(scrollPosition > pageHeight * 0.5){
showPopup();
}

});

}

/* ============================= */
/* LINKEDIN TRACK */
/* ============================= */

window.trackLinkedInClick = function(){
if(typeof gtag === "function"){
gtag('event','linkedin_click',{
event_category:'engagement',
event_label:'linkedin_profile'
});
}
};

});

/* ============================= */
/* PAGE LOAD CLEANUP */
/* ============================= */

window.addEventListener("load",()=>{
setTimeout(()=>{
const loader=document.getElementById("page-loader");
if(loader){
loader.style.opacity="0";
loader.style.visibility="hidden";
}
},1500);
});

/* ============================= */
/* TRACKING */
/* ============================= */

function trackWhatsAppClick(){
if(typeof gtag === "function"){
gtag('event','whatsapp_click',{
event_category:'conversion',
event_label:'lead_whatsapp'
});
}
}

/* WHATSAPP */
function sendToWhatsApp(message){
  const phone="5511986108003";
  const url=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url,"_blank");
}

/* START */
document.addEventListener("DOMContentLoaded", initQuiz);