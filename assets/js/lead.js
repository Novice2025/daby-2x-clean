function sendLead(){

const phone = document.getElementById("phone").value;
const challenge = document.getElementById("challenge").value;

if(phone.length < 10){
alert("Digite um número válido");
return;
}

const message = encodeURIComponent(
"Olá, gostaria de receber o diagnóstico executivo. Meu desafio principal é: " + challenge
);

window.location.href =
"https://wa.me/5511986108003?text=" + message;

}