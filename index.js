const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("https://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

$(function () {
    $.mousedirection();
    $("body").bind("mousedirection", function (e) {
    });
  });
  
  
  
  
  (function ($) {
    var options = {};
    var oldx = 0;
    var oldy = 0;
    var direction="";
    $.mousedirection = function (opts) {
      var defaults = {
      };
      options = $.extend(defaults, opts);
      $(document).bind("mousemove", function (e) {
        var activeElement = e.target || e.srcElement;
        if (e.pageX > oldx && e.pageY > oldy) {
          $('.RightEye').attr("class", "RightEyeRight");
          $('.LeftEyeLeft').attr("class", "LeftEye");
          direction="bottom-right";
  
        }
        else if (e.pageX > oldx && e.pageY < oldy) {
          $('.RightEye').attr("class", "RightEyeRight");
          $('.LeftEyeLeft').attr("class", "LeftEye");
  
          direction="top-right";
        }
  
        else if (e.pageX < oldx && e.pageY < oldy) {
          $('.RightEyeRight').attr("class", "RightEye");
          $('.LeftEye').attr("class", "LeftEyeLeft");
  
          direction="top-left";
        }
        else if (e.pageX < oldx && e.pageY > oldy) {
          $('.RightEyeRight').attr("class", "RightEye");
          $('.LeftEye').attr("class", "LeftEyeLeft");
  
          direction="bottom-left";
        }
        else if (e.pageX > oldx && e.pageY == oldy) {
          $('.RightEye').attr("class", "RightEyeRight");
          $('.LeftEyeLeft').attr("class", "LeftEye");
  
          direction="right";
        }
        else if (e.pageX == oldx && e.pageY > oldy) {
          direction="down";
        }
        else if (e.pageX == oldx && e.pageY < oldy) {
          direction="up";
        }
        else if (e.pageX < oldx && e.pageY == oldy) {
          $('.RightEyeRight').attr("class", "RightEye");
          $('.LeftEye').attr("class", "LeftEyeLeft");
  
          direction="left";
        }
        $(activeElement).trigger(direction);
        $(activeElement).trigger({type:"mousedirection",direction:direction});
        oldx=e.pageX;
        oldy=e.pageY;
      });
    }
  })(jQuery);