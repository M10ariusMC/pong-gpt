/* Fade-in des sections au scroll */
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if(top < window.innerHeight - 50) sec.classList.add('visible');
  });
});

/* Animation de la balle rebondissante */
let ball = document.getElementById('ball');
let bx = 50, by = 50, dx = 2, dy = 2;
function animateBall() {
  bx += dx; by += dy;
  if(bx < 0 || bx + 20 > window.innerWidth) dx = -dx;
  if(by < 0 || by + 20 > window.innerHeight) dy = -dy;
  ball.style.left = bx + 'px';
  ball.style.top = by + 'px';
  requestAnimationFrame(animateBall);
}
animateBall();

/* Background arcade lignes + particules */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
for(let i=0;i<60;i++){
    lines.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, w:2, h:20, speed:1+Math.random()*2});
}

let particles = [];
for(let i=0;i<100;i++){
    particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, radius:1+Math.random()*2, speed:Math.random()*1.5, alpha:Math.random()});
}

function animateBG(){
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Lignes
    ctx.fillStyle = "#0ff";
    lines.forEach(line => {
        ctx.fillRect(line.x, line.y, line.w, line.h);
        line.y += line.speed;
        if(line.y > canvas.height) line.y = -line.h;
    });

    // Particules
    ctx.fillStyle = "#f0f";
    particles.forEach(p=>{
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fill();
        p.y += p.speed;
        if(p.y>canvas.height) p.y = 0;
    });
    ctx.globalAlpha = 1;

    requestAnimationFrame(animateBG);
}
animateBG();

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* Son hover sur les boutons */
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('mouseenter',()=>{ 
    const audio = new Audio('https://freesound.org/data/previews/341/341695_3248244-lq.mp3');
    audio.volume = 0.2;
    audio.play();
  });
});

