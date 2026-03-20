const lenis = new Lenis({
duration: 1.1,
smooth: true,
smoothTouch: false,
});

function raf(time) {
lenis.raf(time);
requestAnimationFrame(raf);
}

requestAnimationFrame(raf);