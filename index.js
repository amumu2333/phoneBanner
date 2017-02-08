


var cw = document.documentElement.clientWidth,
    ch = document.documentElement.clientHeight;
//获取页面的宽和高

(function () {
  //获取按钮
  var btns = document.querySelector('.btns'),
      btn = btns.querySelectorAll('.btn');
  //获取banner图片
  var container = document.querySelector('div.container'),
      box = container.querySelector('.box'),
      item = box.querySelectorAll('.item'),
      len = item.length;
  //索引
  var index = 0,
      translateX = 0;

  //确定某些不确定的尺寸
  container.style.height = ch - btns.offsetHeight + "px";
  box.style.width = cw * len + "px";
  for (var i = 0; i < len; i++) {
    btn[i].index = i;
    item[i].style.width = cw + "px";
    btn[i].style.width = (100 / len) + "%";
  };
  //按钮的点击事件
  for (var i = 0; i < len; i++) {
    btn[i].addEventListener("touchstart",function () {
      deal_btn(this.index);
      translateX = -cw * this.index;
      box.style.transform = "translate3d("+translateX+"px,0,0)";
      index = this.index;
    },false);
  };

  //图片的触摸事件
  var x0,x1,xx,t0,t1,tt;//touch相关的参数
  var t;//时间函数,自动轮播
  box.addEventListener("touchstart",function start(e) {
      clearInterval(t);
      x0 = e.targetTouches[0].clientX;
      t0 = e.timeStamp;
      this.style.transitionDuration = "0s";
      window.addEventListener("touchmove",move,false);//move
      box.addEventListener("touchend",end,false);//end
    },false);//start
  //图片自动轮播
  t = setInterval(automove,3000);
  function automove() {
    index++;
    if (index==len) {
      index = 0;
    };
    translateX = -cw * index;
    box.style.transform = "translate3d("+translateX+"px,0,0)";
    deal_btn(index);
  };//自动轮播函数
  function move(e) {
      x1 = e.targetTouches[0].clientX;
      xx = x1 - x0;
      box.style.transform = "translate3d("+(xx+translateX)+"px,0,0)";
    };//touchmove 函数
  function end(e) {
      t1 = e.timeStamp;
      tt = t1 - t0;
      var xx2 = e.changedTouches[0].clientX - x0;
      box.style.transitionDuration = ".4s";
      console.log(xx);
      if (Math.abs(xx)>cw/2 || (tt<500&&xx2>50)) {
        if (xx<0) {
          index++;
          if (index==len) {
            index = len-1;
          }
          box.style.transform = "translate3d("+(-cw*index)+"px,0,0)";
        }else if (xx>0) {
          index--;
          if (index<0) {
            index = 0;
          }
          box.style.transform = "translate3d("+(-cw*index)+"px,0,0)";
        }
        deal_btn(index);
        translateX = -cw*index;
      }else {
        box.style.transform = "translate3d("+(-cw*index)+"px,0,0)";
        translateX = -cw*index;
      };
      window.removeEventListener("touchmove",move);
      box.removeEventListener("touchend",end);
      t = setInterval(automove,3000);
    };//touchend函数
  function deal_btn(index) {
      for(var i = 0;i < len;i++){
        btn[i].className = "btn";
      };
      btn[index].className += " active";
    };//传入index,处理btn


})();//banner图的作用域
