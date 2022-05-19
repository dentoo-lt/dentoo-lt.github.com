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
        $('html').animate({ scrollTop: 700 }, 1000, 'swing');
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

function resizeFontSize(){
    var aspectratio = 7;
    var width = window.innerWidth;
    var logoitemtextwhole = document.getElementById("logoitemtextwhole");
    var logoitemtext = document.getElementsByClassName("logoitemtext");
    logoitemtextwhole.style.fontSize = width * 0.7 / aspectratio + "px"
    for(i=0;i<logoitemtext.length;i++){
        logoitemtext[i].style.fontSize = width * 0.7 / aspectratio + "px"
    }
}

function initHTML(){
    window.onmousemove = changeMouseXY;

    window.onresize = resizeFontSize;
}

function initDOM(){
    resizeFontSize();
}

window.onload = function() {
    initHTML();
};

$(document).ready(() => {
    initDOM();
})

/* fadein */
<script>
(window.onload = function() {

  // フェードイン処理
jQuery(window).scroll(function (){
    jQuery(".fade").each(function(){
    var winheight = jQuery(window).height();
    var posi = jQuery(this).offset().top;
    var scroll = jQuery(window).scrollTop();
    if (scroll + winheight > posi){
        jQuery(this).addClass("fadein");
    } else {
        //　スクロールで画面上部に戻った際に要素を非表示にしたい場合は、下記の行のコメントを外し有効にしてください。
        //jQuery(this).removeClass("fadein");
    }
    });
});

})();
</script>