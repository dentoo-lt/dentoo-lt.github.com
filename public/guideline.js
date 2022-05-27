window.onload = function () {
    fadein();
};

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
};

// ボタン表示
jQuery(function($){
    $(window).on('scroll', function(){
      var obj = document.getElementsByClassName("menu-btn")[0];
      if ($(window).scrollTop() > -1) {
        obj.style.visibility = "visible";
      } else {
        obj.style.visibility = "hidden";
      }
    });
  });
  jQuery(function($){
    $(window).on('scroll', function(){
      var obj = document.getElementsByClassName("pagetop")[0];
      if ($(window).scrollTop() > 300) {
        obj.style.visibility = "visible";
      } else {
        obj.style.visibility = "hidden";
      }
    });
  });
  
  // ボタン色
  function touchMenubtn(){
  document.getElementById("menu_btn").addEventListener("touchstart",function(){
    document.getElementById("menu_btn").style.backgroundColor = "red";
  })
  document.getElementsByClassName("page_top_btn")[0].addEventListener("touchstart", function(){
    document.getElementsByClassName("page_top_btn")[0].style.backgroundColor = "red";
  })
  document.getElementById("menu_btn").addEventListener("touchend", function(){
    document.getElementById("menu_btn").style.backgroundColor = "black";
  })
  document.getElementsByClassName("page_top_btn")[0].addEventListener("touchend",function(){
    document.getElementsByClassName("page_top_btn")[0].style.backgroundColor = "black";
  })
  }
  
  // メニューで指定位置に飛ぶ
  function scrollJump (position){
    document.getElementById(position).scrollIntoView(true)
  }
  
  //メニューの外側をクリックしてメニューを閉じる
  function deletemenu(){
    document.getElementById("menu-btn-check").checked = false;
  }
  