let cnv,ctx;

function stiskKlavesyDolu(udalost) {
    console.log(udalost.key);
    //hrac1
    if (udalost.key == "w") {
        yHrac1 = yHrac1 -4;
    }
    if (udalost.key == "s") {
        yHrac1 = yHrac1 +4;
    }
    //hrac2
    if (udalost.key == "ArrowUp") {
        yHrac2 = yHrac2 -4;
    }
    if (udalost.key == "ArrowDown") {
        yHrac2 = yHrac2 +4;
    }
}

function poNacteni() {
    cnv = document.getElementById("platno");
    ctx = cnv.getContext("2d");

    document.addEventListener("keydown", stiskKlavesyDolu);

    xHrac1 = 10;
    yHrac1 = cnv.height / 2;
    xHrac2 = cnv.width -10 - SIRKA_HRACE;
    yHrac2 = yHrac1;

    setInterval(animace, 30);
}

const SIRKA_HRACE = 10;
const VYSKA_HRACE = 60;
let xHrac1;
let yHrac1;
let xHrac2;
let yHrac2;

let xKruh = 100;
let yKruh = 200;
let rKruh = 20;
let dxKruh = -4;
let dyKruh = -1;

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
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(xHrac1,yHrac1, SIRKA_HRACE,VYSKA_HRACE);
    ctx.fill();

    //hrac2
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(xHrac2,yHrac2, SIRKA_HRACE,VYSKA_HRACE);
    ctx.fill();

    //kruh
    xKruh = xKruh + dxKruh;
    yKruh = yKruh + dyKruh;
    if (xKruh - rKruh <= 0) {
        //bod pro hrace 2
        //novy mic
    }
    if (xKruh + rKruh >= cnv.width) {
        //bod pro hrace 1
        //novy mic
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

    //text
    ctx.font = "30px Verdana";
    ctx.fillStyle = "green";
    ctx.fillText("Kasparek!", 10, 280);
}