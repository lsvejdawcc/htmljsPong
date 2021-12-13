let cnv,ctx;

let hrac1nahoru = false;
let hrac1dolu = false;
let hrac2nahoru = false;
let hrac2dolu = false;

function stiskKlavesy(udalost) {
    //hrac1
    if (udalost.key == "w") {
        hrac1nahoru = true;
    }
    if (udalost.key == "s") {
        hrac1dolu = true;
    }
    //hrac2
    if (udalost.key == "ArrowUp") {
        hrac2nahoru = true;
    }
    if (udalost.key == "ArrowDown") {
        hrac2dolu = true;
    }
}

function uvolneniKlavesy(udalost) {
    //hrac1
    if (udalost.key == "w") {
        hrac1nahoru = false;
    }
    if (udalost.key == "s") {
        hrac1dolu = false;
    }
    //hrac2
    if (udalost.key == "ArrowUp") {
        hrac2nahoru = false;
    }
    if (udalost.key == "ArrowDown") {
        hrac2dolu = false;
    }
}

function poNacteni() {
    cnv = document.getElementById("platno");
    ctx = cnv.getContext("2d");

    document.addEventListener("keydown", stiskKlavesy);
    document.addEventListener("keyup", uvolneniKlavesy);

    xHrac1 = 10;
    yHrac1 = cnv.height / 2;
    xHrac2 = cnv.width -10 - SIRKA_HRACE;
    yHrac2 = yHrac1;

    novyMic();  //pouziji se defaultni hodnoty parametru 0,0
    setInterval(animace, 30);
}

const SIRKA_HRACE = 10;
const VYSKA_HRACE = 60;
let xHrac1;
let yHrac1;
let hrac1body = 0;
let xHrac2;
let yHrac2;
let hrac2body = 0;

const rKruh = 20;
let xKruh;
let yKruh;
let dxKruh;
let dyKruh;

function novyMic(bodHrac1 = 0, bodHrac2 = 0) {
  hrac1body = hrac1body + bodHrac1;  
  hrac2body = hrac2body + bodHrac2;
  document.getElementById("skore").innerHTML =
    hrac1body + ":" + hrac2body;
  
  xKruh = cnv.width / 2;
  yKruh = cnv.height / 2;
  dxKruh = -4;
  dyKruh = -1;
}

function animace() {
    ctx.clearRect(0,0, cnv.width, cnv.height);

    //pulici cara
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.setLineDash([15]); //délka čáry i mezery
    ctx.moveTo(cnv.width / 2, 0);
    ctx.lineTo(cnv.width / 2, cnv.height);
    ctx.stroke();
    ctx.setLineDash([]); //plna cara

    //hrac1
    if (hrac1nahoru) {
        yHrac1 = yHrac1 -3;
    }
    if (hrac1dolu) {
        yHrac1 = yHrac1 +3;
    }
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(xHrac1,yHrac1, SIRKA_HRACE,VYSKA_HRACE);
    ctx.fill();

    //hrac2
    if (hrac2nahoru) {
        yHrac2 = yHrac2 -3;
    }
    if (hrac2dolu) {
        yHrac2 = yHrac2 +3;
    }
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(xHrac2,yHrac2, SIRKA_HRACE,VYSKA_HRACE);
    ctx.fill();

    //kruh
    xKruh = xKruh + dxKruh;
    yKruh = yKruh + dyKruh;
    if (xKruh - rKruh <= 0) {
        novyMic(0,1);
    }
    if (xKruh + rKruh >= cnv.width) {
        novyMic(1,0);
    }
    //odrazeni od hrace 1
    if (xKruh - rKruh <= xHrac1 + SIRKA_HRACE && yKruh >= yHrac1 && yKruh <= yHrac1 + VYSKA_HRACE) {
        dxKruh = -1 * dxKruh;
    }
    //odrazeni od hrace 2
    if (xKruh + rKruh >= xHrac2 && yKruh >= yHrac2 && yKruh <= yHrac2 + VYSKA_HRACE) {
        dxKruh = -1 * dxKruh;
    }
    //vodorovne okraje
    if (yKruh - rKruh <= 0 || yKruh + rKruh >= cnv.height) {
        dyKruh = -1 * dyKruh;
    }
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(xKruh,yKruh,rKruh,0,2*Math.PI);
    ctx.fill();

    //skore
    // ctx.font = "30px Verdana";
    // ctx.fillStyle = "white";
    // ctx.fillText(hrac1body, cnv.width / 4, 35);
    // ctx.fillText(hrac2body, cnv.width * 3 / 4, 35);
}