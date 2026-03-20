document.addEventListener("DOMContentLoaded", () => {

const svg = document.getElementById("map-network");

const width = svg.clientWidth;
const height = svg.clientHeight;

svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

/* random world point */

function randomPoint(){

return {

x: Math.random()*width,
y: Math.random()*height

};

}

/* create connection */

function createConnection(){

const start = randomPoint();
const end = randomPoint();

/* control point for curved route */

const controlX = (start.x + end.x)/2 + (Math.random()*200 -100);
const controlY = (start.y + end.y)/2 - 120;

/* curved path */

const path = document.createElementNS("http://www.w3.org/2000/svg","path");

const d = `
M ${start.x} ${start.y}
Q ${controlX} ${controlY}
${end.x} ${end.y}
`;

path.setAttribute("d",d);

path.setAttribute("stroke","#00eaff");
path.setAttribute("stroke-width","1.3");
path.setAttribute("fill","none");

path.setAttribute("opacity","0.3");

svg.appendChild(path);

/* start dot */

const dot = document.createElementNS("http://www.w3.org/2000/svg","circle");

dot.setAttribute("cx",start.x);
dot.setAttribute("cy",start.y);

dot.setAttribute("r","3");

dot.setAttribute("fill","#00eaff");

svg.appendChild(dot);

/* ARROW SHAPE */

const arrow = document.createElementNS("http://www.w3.org/2000/svg","polygon");

arrow.setAttribute("points","0,-4 8,0 0,4");

arrow.setAttribute("class","signal-arrow");

svg.appendChild(arrow);

/* animation */

const length = path.getTotalLength();

let progress = Math.random()*length;

function animate(){

progress += 2;

if(progress > length){

progress = 0;

}

const point = path.getPointAtLength(progress);

const point2 = path.getPointAtLength(progress+1);

/* position arrow */

arrow.setAttribute(
"transform",
`translate(${point.x},${point.y}) rotate(${Math.atan2(point2.y-point.y, point2.x-point.x)*(180/Math.PI)})`
);

requestAnimationFrame(animate);

}

animate();

}

/* create many connections */

for(let i=0;i<30;i++){

createConnection();

}

});