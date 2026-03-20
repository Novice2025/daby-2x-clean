document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById("globe-canvas");
if (!canvas) return;

/* SCENE */

const scene = new THREE.Scene();

/* CAMERA */

const camera = new THREE.PerspectiveCamera(
45,
canvas.clientWidth / canvas.clientHeight,
0.1,
1000
);

camera.position.z = 3.2;

/* RENDERER */

const renderer = new THREE.WebGLRenderer({
canvas: canvas,
alpha: true,
antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

/* LIGHT */

const ambient = new THREE.AmbientLight(0xffffff,0.9);
scene.add(ambient);

/* GLOBE */

const geometry = new THREE.SphereGeometry(1,64,64);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("assets/images/earth.jpg");

const material = new THREE.MeshStandardMaterial({ map:texture });

const globe = new THREE.Mesh(geometry,material);

/* BRAZIL FACING FRONT */

globe.rotation.y = -0.45;

scene.add(globe);

/* ORIGIN CITIES */

const saoPaulo = new THREE.Vector3(-0.22,-0.25,0.94);
const rio = new THREE.Vector3(-0.18,-0.15,0.96);

const origins = [saoPaulo,rio];

/* DESTINATIONS */

const destinations = [

new THREE.Vector3(-0.9,0.45,0.30),   // USA
new THREE.Vector3(0.12,0.85,0.45),   // Europe
new THREE.Vector3(0.85,0.40,0.30),   // Middle East
new THREE.Vector3(0.95,-0.15,0.35),  // Asia
new THREE.Vector3(0.45,-0.80,0.50)   // Australia

];

/* CITY DOTS */

const cityMaterial = new THREE.MeshBasicMaterial({color:0x00eaff});
const cityGeometry = new THREE.SphereGeometry(0.03,16,16);

origins.forEach(origin=>{

const dot = new THREE.Mesh(cityGeometry,cityMaterial);

dot.position.copy(origin);

scene.add(dot);

});

/* ROUTES */

const routes = [];

origins.forEach(origin=>{

destinations.forEach(dest=>{

const curve = new THREE.QuadraticBezierCurve3(

origin,
new THREE.Vector3(0,0,1.6),
dest

);

const points = curve.getPoints(80);

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({
color:0x00eaff,
transparent:true,
opacity:0.35
});

const line = new THREE.Line(geometry,material);

scene.add(line);

/* DATA PARTICLE */

const particle = new THREE.Mesh(

new THREE.SphereGeometry(0.02,10,10),

new THREE.MeshBasicMaterial({color:0xffffff})

);

scene.add(particle);

routes.push({
curve:curve,
particle:particle,
progress:Math.random(),
speed:0.003 + Math.random()*0.004
});

});

});

/* GLOBAL DATA TRAFFIC (20 LINE UPGRADE) */

let signalPulse = 0;

function animate(){

requestAnimationFrame(animate);

signalPulse += 0.02;

routes.forEach(route=>{

route.progress += route.speed;

if(route.progress > 1) route.progress = 0;

const pos = route.curve.getPoint(route.progress);

route.particle.position.copy(pos);

/* SIGNAL PULSE */

route.particle.scale.setScalar(
1 + Math.sin(signalPulse)*0.4
);

});

/* subtle glow pulse */

globe.material.emissiveIntensity =
0.05 + Math.sin(signalPulse)*0.02;

renderer.render(scene,camera);

}

animate();

/* RESPONSIVE */

window.addEventListener("resize",()=>{

const width = canvas.clientWidth;
const height = canvas.clientHeight;

camera.aspect = width/height;
camera.updateProjectionMatrix();

renderer.setSize(width,height);

});

});