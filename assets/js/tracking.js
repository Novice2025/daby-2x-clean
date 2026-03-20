/* ============================= */
/* GOOGLE ANALYTICS TRACKING */
/* ============================= */

/* 🔹 WhatsApp CTA Click */
function trackWhatsAppClick(){
if(typeof gtag === "function"){
gtag('event', 'click_whatsapp', {
event_category: 'CTA',
event_label: 'WhatsApp Button',
value: 1
});
}
}

/* 🔹 Diagnosis Form Submit */
function trackDiagnosisSubmit(){
if(typeof gtag === "function"){
gtag('event', 'diagnosis_submit', {
event_category: 'Lead',
event_label: 'Executive Diagnosis',
value: 1
});
}
}

/* 🔹 LinkedIn Click */
function trackLinkedInClick(){
if(typeof gtag === "function"){
gtag('event', 'click_linkedin', {
event_category: 'Social',
event_label: 'LinkedIn Profile',
value: 1
});
}
}

/* 🔹 Scroll Depth Tracking */
window.addEventListener("scroll", function(){
let scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight;

if(scrollPercent > 0.5 && !window.scroll50Tracked){
window.scroll50Tracked = true;

if(typeof gtag === "function"){
gtag('event', 'scroll_50', {
event_category: 'Engagement'
});
}
}

if(scrollPercent > 0.9 && !window.scroll90Tracked){
window.scroll90Tracked = true;

if(typeof gtag === "function"){
gtag('event', 'scroll_90', {
event_category: 'Engagement'
});
}
}
});