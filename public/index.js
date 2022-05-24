var makeshadow = false;
var delayx = 0;
var delayy = 0;
var delayvelocity = 0;
var mousex = -1;
var mousey = -1;
var mute = true;
var displaydialog = true;
var playvideo = true;
var clicked = false;

function makeShadow(x, y) {
  var logoitemtext = document.getElementsByClassName("logoitemtext");
  for (i = 0; i < logoitemtext.length; i++) {
    logoitemtext[i].style.textShadow =
      String(x) + "px " + String(y) + "px 0px gray";
  }
}

window.setInterval(function () {
  localStorage.setItem("nowscroll", String(window.scrollY));
  if (makeshadow) {
    makeShadowWithMouse();
  }
}, 60);

window.setTimeout(function () {
  makeShadow(0, -10);
  delayx = $(window).width() / 2;
  delayy = window.innerHeight / 2 + 40;
  makeshadow = true;
}, 3400);

window.setTimeout(function () {
  if (window.scrollY <= 10) {
    $("html,body").animate({ scrollTop: window.innerHeight }, 1000, "swing");
  }
}, 5000);

function makeShadowWithMouse() {
  if (mousex >= 0 && mousey >= 0) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    delayvelocity =
      Math.sqrt(
        (mousex - delayx) * (mousex - delayx) +
          (mousey - delayy) * (mousey - delayy)
      ) / 10000;
    delayx = (delayx + mousex * delayvelocity) / (1 + delayvelocity);
    delayy = (delayy + mousey * delayvelocity) / (1 + delayvelocity);
    makeShadow((width / 2 - delayx) / 4, (height / 2 - delayy) / 4);
  }
}

function changeMouseXY(event) {
  if (makeshadow) {
    event = event || window.event;
    mousex = event.clientX;
    mousey = event.clientY;
  }
}

function resizeFont() {
  var aspectratio = 7;
  var width = $(window).width();
  var logoitemtextwhole = document.getElementById("logoitemtextwhole");
  var logoitemtext = document.getElementsByClassName("logoitemtext");
  logoitemtextwhole.style.fontSize = (width * 0.7) / aspectratio + "px";
  for (i = 0; i < logoitemtext.length; i++) {
    logoitemtext[i].style.fontSize = (width * 0.7) / aspectratio + "px";
  }
}

function resizeiflame() {
  var width = $(window).width();
  var videowrap = document.getElementById("video-wrap");
  videowrap.style.width = width * 0.7 + "px";
  videowrap.style.height = width * 0.7 * 0.5625 + "px";
}

function initDOM() {
  resizeFont();
  document.body.scrollTop = Number(localStorage.getItem("nowscroll"));
  window.onmousemove = changeMouseXY;

  window.onresize = resizeFont;

  resizeiflame();
  window.onresize = resizeiflame;
}

window.onload = function () {
  console.log("10")
  fadein();
  test();
  console.log ("5")
};

$(document).ready(() => {
  initDOM();
});

/* fadein */
function fadein () {
  var scroll = document.querySelectorAll(".up");

  var Animation = function () {
    for (var i = 0; i < scroll.length; i++) {
      var triggerMargin = 80;
      if (
        window.innerHeight >
        scroll[i].getBoundingClientRect().top + triggerMargin
      ) {
        scroll[i].classList.add("show");
      }
    }
  };
  window.addEventListener("scroll", Animation);
  Animation();
};
$(window).on("orientationchange", function () {
  location.reload();
});

function deleteiframe() {
  var videowrap = document.getElementById("video-wrap");
  videowrap.style.visibility = "hidden";
  var whole = document.getElementById("whole");
  whole.style.filter = "";
  var videoplayerbox = document.getElementById("videoplayer");
  videoplayerbox.remove();
}



function displayiframe(url, time) {
	let dontask = document.getElementById("dontask");
	if(displaydialog){
		var dialog = document.getElementById("dialog");
		dialog.style.visibility = "visible";

    dialog.mute.addEventListener("click", () => {
      mute = true;
			displaydialog = !(dontask.checked);
			clicked = true;
    });
    dialog.unmute.addEventListener("click", () => {
      mute = false;
			displaydialog = !(dontask.checked);
			clicked = true;
    });
    dialog.cancel.addEventListener("click", () => {
      playvideo = false;
			dontask.checked = false;
			clicked = true;
    });
	}

	const intervalId = setInterval(()=>{
		if(!clicked && displaydialog){
			return;
		}
		clearInterval(intervalId);

		var dialog = document.getElementById("dialog");
		dialog.style.visibility = "hidden";
		if(playvideo){
			var whole = document.getElementById("whole");
			whole.style.filter = "blur(10px) grayscale(100%)";
			var videowrap = document.getElementById("video-wrap");
			videowrap.style.visibility = "visible";
			var videoplayerbox = document.getElementById("videoplayerbox");
			if(mute){
				videoplayerbox.innerHTML =  "<iframe id=\"videoplayer\" src=\"https://www.youtube.com/embed/" + url + "?start=" + time + "&autoplay=1&enablejsapi=1&mute=1\" title=\"YouTube video player\" frameborder=\"0\"allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"allowfullscreen></iframe>";
			}else{
				videoplayerbox.innerHTML =  "<iframe id=\"videoplayer\" src=\"https://www.youtube.com/embed/" + url + "?start=" + time + "&autoplay=1&enablejsapi=1\" title=\"YouTube video player\" frameborder=\"0\"allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"allowfullscreen></iframe>";
			}
		}

		if(displaydialog){
			mute = true;
			clicked = false;
			playvideo = true;
		}
	}, 200)
}

jQuery(function($){
  $(window).on('scroll', function(){
    var obj = document.getElementsByClassName("menu-btn")[0];
    if ($(window).scrollTop() > 300) {
      obj.style.visibility = "visible";
    } else {
      obj.style.visibility = "hidden";
    }
  });
});
jQuery(function($){
  $(window).on('scroll', function(){
    var obj = document.getElementsByClassName("page_top_btn")[0];
    if ($(window).scrollTop() > 300) {
      obj.style.visibility = "visible";
    } else {
      obj.style.visibility = "hidden";
    }
  });
});

function test(){
document.getElementById("menu_btn").addEventListener("touchstart",function(){
  document.getElementById("menu_btn").style.backgroundColor = "red";
  console.log("1")
})
document.getElementsByClassName("page_top_btn")[0].addEventListener("touchstart", function(){
  document.getElementsByClassName("page_top_btn")[0].style.backgroundColor = "red";
})
document.getElementById("menu_btn").addEventListener("touchend", function(){
  document.getElementById("menu_btn").style.backgroundColor = "black";
  console.log("2")
})
document.getElementsByClassName("page_top_btn")[0].addEventListener("touchend",function(){
  document.getElementsByClassName("page_top_btn")[0].style.backgroundColor = "black";
})
}