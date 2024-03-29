var makeshadow = false;
var delayx = 0;
var delayy = 0;
var delayvelocity = 0;
var mousex = -1;
var mousey = -1;
var playvideo = true;
var clicked = false;
if (!sessionStorage.getItem("mute")) sessionStorage.setItem("mute", "true");
if (!sessionStorage.getItem("displaydialog"))
	sessionStorage.setItem("displaydialog", "true");

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
		$("html,body").animate(
			{ scrollTop: window.innerHeight },
			1000,
			"swing"
		);
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
	document.body.scrollTop = Number(localStorage.getItem("nowscroll"));
	window.onmousemove = changeMouseXY;

	resizeFont();
	window.onresize = resizeFont;

	resizeiflame();
	window.onresize = resizeiflame;
}

window.onload = function () {
	fadein();
	touchMenubtn();
	document.getElementById("whole").addEventListener("mousedown", deletemenu);
	document
		.getElementById("whole")
		.addEventListener("mousedown", deletedialog);
};

$(document).ready(() => {
	initDOM();
});

/* fadein */
function fadein() {
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
}
$(window).on("orientationchange", function () {
	window.setTimeout(function () {
		resizeFont();
	}, 100);
});

function deleteiframe() {
	var videowrap = document.getElementById("video-wrap");
	videowrap.style.visibility = "hidden";
	var whole = document.getElementById("whole");
	whole.style.filter = "";
	var videoplayerbox = document.getElementById("videoplayer");
	videoplayerbox.remove();
}

// 再生しますボタン出現
function displayiframe(url, time) {
	let dontask = document.getElementById("dontask");
	if (sessionStorage.getItem("displaydialog") == "true") {
		var dialog = document.getElementById("dialog");
		dialog.style.visibility = "visible";

		dialog.mute.addEventListener("click", () => {
			sessionStorage.setItem("mute", "true");
			sessionStorage.setItem(
				"displaydialog",
				!dontask.checked ? "true" : "false"
			);
			clicked = true;
		});
		dialog.unmute.addEventListener("click", () => {
			sessionStorage.setItem("mute", "false");
			sessionStorage.setItem(
				"displaydialog",
				!dontask.checked ? "true" : "false"
			);
			clicked = true;
		});
		dialog.cancel.addEventListener("click", () => {
			playvideo = false;
			dontask.checked = false;
			clicked = true;
		});
	}

	const intervalId = setInterval(() => {
		if (!clicked && sessionStorage.getItem("displaydialog") == "true") {
			return;
		}
		clearInterval(intervalId);

		var dialog = document.getElementById("dialog");
		dialog.style.visibility = "hidden";
		if (playvideo) {
			var whole = document.getElementById("whole");
			whole.style.filter = "blur(10px) grayscale(100%)";
			var videowrap = document.getElementById("video-wrap");
			videowrap.style.visibility = "visible";
			var videoplayerbox = document.getElementById("videoplayerbox");
			if (sessionStorage.getItem("mute") == "true") {
				videoplayerbox.innerHTML =
					'<iframe id="videoplayer" src="https://www.youtube.com/embed/' +
					url +
					"?start=" +
					time +
					'&autoplay=1&enablejsapi=1&mute=1" title="YouTube video player" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"allowfullscreen></iframe>';
			} else {
				videoplayerbox.innerHTML =
					'<iframe id="videoplayer" src="https://www.youtube.com/embed/' +
					url +
					"?start=" +
					time +
					'&autoplay=1&enablejsapi=1" title="YouTube video player" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"allowfullscreen></iframe>';
			}
		}

		if (sessionStorage.getItem("displaydialog") == "true") {
			sessionStorage.setItem("mute", "true");
			mute = true;
			clicked = false;
			playvideo = true;
		}
	}, 200);
}

// ボタン表示
jQuery(function ($) {
	$(window).on("scroll", function () {
		var obj = document.getElementsByClassName("menu-btn")[0];
		if ($(window).scrollTop() > 300) {
			obj.style.visibility = "visible";
		} else {
			obj.style.visibility = "hidden";
		}
	});
});
jQuery(function ($) {
	$(window).on("scroll", function () {
		var obj = document.getElementsByClassName("pagetop")[0];
		if ($(window).scrollTop() > 300) {
			obj.style.visibility = "visible";
		} else {
			obj.style.visibility = "hidden";
		}
	});
});

// ボタン色
function touchMenubtn() {
	document
		.getElementById("menu_btn")
		.addEventListener("touchstart", function () {
			document.getElementById("menu_btn").style.backgroundColor =
				"#555555";
		});
	document
		.getElementsByClassName("pagetop")[0]
		.addEventListener("touchstart", function () {
			document.getElementsByClassName(
				"pagetop"
			)[0].style.backgroundColor = "#555555";
		});
	document
		.getElementById("menu_btn")
		.addEventListener("touchend", function () {
			document.getElementById("menu_btn").style.backgroundColor = "black";
		});
	document
		.getElementsByClassName("pagetop")[0]
		.addEventListener("touchend", function () {
			document.getElementsByClassName(
				"pagetop"
			)[0].style.backgroundColor = "black";
		});
}

// メニューで指定位置に飛ぶ
function page_top() {
	document.getElementById("page_top").scrollIntoView(true);
}
function next() {
	document.getElementById("next").scrollIntoView(true);
}
function past() {
	document.getElementById("past").scrollIntoView(true);
}

//メニューの外側をクリックしてメニューを閉じる
function deletemenu() {
	document.getElementById("menu-btn-check").checked = false;
}
function deletedialog() {
	document.getElementById("dialog").style.visibility = "hidden";
}
