var makeshadow = false;
var delayx = 0;
var delayy = 0;
var delayvelocity = 0;
var mousex = -1;
var mousey = -1;

function makeShadow(x, y){
    var logoitemtext = document.getElementsByClassName("logoitemtext");
    for(i=0;i<logoitemtext.length;i++){
        logoitemtext[i].style.textShadow = String(x) + "px " + String(y) + "px 0px gray";
    }
}

window.setInterval(function(){
    if(makeshadow){
        makeShadowWithMouse();
    }
}, 60);

window.setTimeout(function(){
    makeShadow(0, -10);
    delayx = window.innerWidth / 2;
    delayy = window.innerHeight / 2 + 40;
    makeshadow = true;
}, 3400);

window.setTimeout(function(){
    if(window.scrollY <= 10){
        $('html').animate({ scrollTop: 300 }, 1000, 'swing');
    }
}, 5000);

function makeShadowWithMouse() {
    if(mousex >= 0 && mousey >= 0){
        var width = window.innerWidth;
        var height = window.innerHeight;
        delayvelocity = Math.sqrt((mousex-delayx)*(mousex-delayx)+(mousey-delayy)*(mousey-delayy)) / 10000;
        delayx = (delayx + mousex * delayvelocity) / (1 + delayvelocity);
        delayy = (delayy + mousey * delayvelocity) / (1 + delayvelocity);
        makeShadow((width / 2 - delayx) / 4, (height / 2 - delayy) / 4);
    }
}

function changeMouseXY(event) {
    if(makeshadow){
        event = event || window.event; 
        mousex = event.clientX;
        mousey = event.clientY;
    }
}

function resizeLogoContainerSize(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    var logocontainer = document.getElementById("logocontainer");
    logocontainer.style.width = width + "px";
    logocontainer.style.height = height + "px";
}

function init(){
    window.onmousemove = changeMouseXY;

    window.addEventListener('resize', resizeLogoContainerSize);

}

window.onload = function() {
    init();
};