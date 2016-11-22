/*
/*
    Init
*/
//page constraints
var sheet = document.styleSheets[(document.styleSheets.length - 1)];
sheet.insertRule("#book img{max-width:" + (window.innerWidth - 30) + "px;}", 1);
sheet.insertRule("@media (orientation: portrait), (max-width: 750px){#book img{max-width:" + window.innerWidth + "px !important;}}", 1);
var leftM = 0; //distance #book moves to the right

/*
    Elements
*/
var eHeader = document.getElementsByTagName("header")[0];
var eSidebar = document.getElementsByTagName("sidebar")[0];
var eBack = document.getElementById("back");
var eSeries = document.getElementById("series");
var eBook = document.getElementById("book");
var eTitle = document.getElementById("title");
var eHeadTitle = document.getElementById("headTitle");
var eHTML = document.querySelector("html");
var eFooter = document.getElementsByTagName("footer")[0];

/*
    Domain
*/
var domain = document.domain;
if (domain.substr(0, 3) === "www") {
  domain = domain.substr(4, domain.length);
}

//eHeadTitle.innerHTML = domain;
series = "";
chapter = "";
series_r = "";
chapter_r = "";

//Array of all books
var seriesList = document.querySelectorAll("#series .book");

/*
    Load from URL
*/
//If it's a non-default URL, go to that series/ch/page
var URL = document.URL;
URL = URL.split("#");
if (URL[1] != undefined && URL[1].length > 2) {
  
  //remove the "/"
  if (URL[1].substr(0, 1) == "/") {
    URL[1] = URL[1].substr(1);
  }
  
  //Take everything after the "#";
  URL[1] = URL[1].split("#");
  URL[1] = URL[1][URL[1].length - 1];
  var urlX = URL[1].split("_");
  HI6MA.series = urlX[0];
  HI6MA.chapter = urlX[1];
  
  //activate the sidebar
  HI6MA.readingBook = true;
  HI6MA.openChapter = false;
  HI6MA.showSeries = false;
  
  //move to the first page
  eBook.setAttribute("style", "transform: translateX(0px)");
 
  //TRY to get the current series' name, series, and chapter
  for (var i=0; i<HI6MA.booklist.length; i++){
    if (HI6MA.booklist[i].folder == HI6MA.series){
      HI6MA.series_full = HI6MA.booklist[i].name;
      HI6MA.loadedChapters = HI6MA.booklist[i].chapters;
      
      for (var j=0; j<HI6MA.booklist[i].chapters.length; j++){
        if (truncate(HI6MA.booklist[i].chapters[j]) == HI6MA.chapter){
          HI6MA.chapter_full = HI6MA.booklist[i].chapters[j];
        }
      }
    }
  }
  
  //reset counters
  leftM = 0;
  HI6MA.currentPage = 1;
  loadBook();
}

/*
    Click and swipe events
*/
function readingEvents() {
  //click
  eBook.addEventListener("click", nextPage);
  
  //swipe
  var hammertime = new Hammer(eBook);
  swipeTime = true; //Ability to swipe
  swipeInt = 2000; //Interval between swipes
  /*! Hammer.JS - v2.0.8 - 2016-04-23
   * http://hammerjs.github.io/
   *
   * Copyright (c) 2016 Jorik Tangelder;
   * Licensed under the MIT license */
  hammertime.on('swipe', function (ev) {
    if (swipeTime) {
      //Swipe LtR
      if (ev.direction == 4) {
        nextPage();
        swipeTime = false;
        clearInterval(setSwipeTimeInterval);
        var setSwipeTimeInterval = setInterval(setSwipeTime, swipeInt);
      }
      //Swipe RtL
      if (ev.direction == 2) {
        prevPage();
        swipeTime = false;
        clearInterval(setSwipeTimeInterval);
        var setSwipeTimeInterval = setInterval(setSwipeTime, swipeInt);
      }
    }
  });
  
  //Timer Functions
  var setSwipeTimeInterval = setInterval(setSwipeTime, swipeInt);
  function setSwipeTime() {
    swipeTime = true;
  }
}

/*
    Page click function
*/
var nextPage = function (e) {
  window.scrollTo(0, 0);
  //e.preventDefault();
  try {
    //remove the click function.
    eBook.removeEventListener("click", nextPage);

    //calculate the amount to move #book
    leftM += document.querySelector(".currentPage").offsetWidth;

    //try for a .png file
    try {
      document.querySelector("#pagePNG" + HI6MA.currentPage).classList.toggle("currentPage");
    }catch (e) {}

    //try for a .jpg file
    try {
      document.querySelector("#pageJPG" + HI6MA.currentPage).classList.toggle("currentPage");
    }catch (e) {}

    HI6MA.currentPage++;

    //try for .png file
    try {
      document.querySelector("#pagePNG" + HI6MA.currentPage).classList.toggle("currentPage");
    }catch (e) {}

    //try for .jpg file
    try {
      document.querySelector("#pageJPG" + HI6MA.currentPage).classList.toggle("currentPage");
    }catch (e) {}

    //add an event listener to the next page
    eBook.addEventListener("click", nextPage);

    //move #book as intended
    eBook.setAttribute("style", "transform: translateX(" + leftM + "px)");
  }
  catch (e) {
    //No more pages to move forward to
    endOfChapter();
  }

  //Update the title
  title(HI6MA.currentPage, totalPages);
}

/*
    Return to chapter list when done with a chapter
*/
function endOfChapter(){
  HI6MA.readingBook = false;
  HI6MA.openChapter = true;
  
  eBook.setAttribute("style","transform: translateX(-30px)");
}

/*
    Page back function
*/
var prevPage = function () {
  if (HI6MA.currentPage > 1) {
    try {
      //remove the click function.
      eBook.removeEventListener("click", nextPage);

      //calculate the amount to move #book
      leftM -= document.querySelector(".currentPage").previousElementSibling.offsetWidth;

      //try for a .png file
      try {
        document.querySelector("#pagePNG" + HI6MA.currentPage).classList.toggle("currentPage");
      }
      catch (e) {}

      //try for a .jpg file
      try {
        document.querySelector("#pageJPG" + HI6MA.currentPage).classList.toggle("currentPage");
      }
      catch (e) {}

      HI6MA.currentPage--;

      //try for .png file
      try {
        document.querySelector("#pagePNG" + HI6MA.currentPage).classList.toggle("currentPage");
      }
      catch (e) {}

      //try for .jpg file
      try {
        document.querySelector("#pageJPG" + HI6MA.currentPage).classList.toggle("currentPage");
      }
      catch (e) {}

      //add an event listener to the next page
      eBook.addEventListener("click", nextPage);

      //move #book as intended
      eBook.setAttribute("style", "transform: translateX(" + leftM + "px)");
    }
    catch (e) {}

    //Update the title
    title(HI6MA.currentPage, totalPages);
  }
}

/*
    Putting pages onto a #book
*/
function loadBook() {
  //add the current chapter to the hash
  location.hash = HI6MA.series + "_" + HI6MA.chapter;
 
  //reset variables and #book
  totalPages = 1;
  page = 1;
  eBook.innerHTML = "";
  leftM = 0;
  
  //add a .png image
  imgSrc = "i/" + HI6MA.series + "/" + HI6MA.chapter_full + "/" + pformat(page) + ".png";
  var add = document.createElement("img");
  add.setAttribute("src", imgSrc);
  add.setAttribute("id", "pagePNG" + page);
  add.setAttribute("onerror", "removeBroken(this)");
  eBook.appendChild(add);
  
  //add a .jpg image
  imgSrc = "i/" + HI6MA.series + "/" + HI6MA.chapter_full + "/" + pformat(page) + ".jpg";
  "/" + pformat(HI6MA.currentPage) + ".jpg";
  var add = document.createElement("img");
  add.setAttribute("src", imgSrc);
  add.setAttribute("id", "pageJPG" + page);
  add.setAttribute("onerror", "removeBroken(this)");
  eBook.appendChild(add);
 
  //make the first image the current page
  document.querySelector("#pagePNG1").classList.add("currentPage");
  document.querySelector("#pageJPG1").classList.add("currentPage");
  
  //load the next page
  loadImg(page);
}

/*
    Load an image
*/
function loadImg(page) {
  //when a .png is loaded, load the next page
  document.querySelector("#pagePNG" + page).onload = function () {
      appendImg(page);
    };
  
  //when a .jpg is loaded, load the next page
  document.querySelector("#pageJPG" + page).onload = function () {
    appendImg(page);
  }
}

/*
    Append the next page
*/
function appendImg(page) {
  page++;
  
  //add a .png file
  imgSrc = "i/" + HI6MA.series + "/" + HI6MA.chapter_full + "/" + pformat(page) + ".png";
  var add = document.createElement("img");
  add.setAttribute("src", imgSrc);
  add.setAttribute("id", "pagePNG" + page);
  add.setAttribute("onerror", "removeBroken(this)");
  eBook.appendChild(add);
  
  //add a .jpg file
  imgSrc = "i/" + HI6MA.series + "/" + HI6MA.chapter_full + "/" + pformat(page) + ".jpg";
  var add = document.createElement("img");
  add.setAttribute("src", imgSrc);
  add.setAttribute("id", "pageJPG" + page);
  add.setAttribute("onerror", "removeBroken(this)");
  eBook.appendChild(add);
  
  //Don't load the next page if you click the title to remove the sidebar
  if (HI6MA.readingBook) {
    
    //load the next page
    loadImg(page);
  }
  totalPages++;
  title(HI6MA.currentPage, totalPages);
  
  //make the pages clickable
  readingEvents();
}

/*
    Remove broken images
*/
function removeBroken(x) {
  try {
    x.parentNode.removeChild(x);
  }
  catch (e) {}
}

/*
    Format an integer into a 3-digit string
*/
function pformat(x) {
  if (x < 10) {
    return "00" + x;
  }
  else if (x < 100) {
    return "0" + x;
  }
  else {
    return x;
  }
}

/*
    Keypress navigation
*/
document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  
  //Only apply when viewing pages
  if (eHTML.classList.contains("viewing")){
    //left arrow key
    if (e.keyCode == '37') {
      nextPage();
    }
    
    //right arrow key
    else if (e.keyCode == '39') {
      prevPage();
    }
  }
}

/*
    Title
*/
function title(page, totalPages) {
  document.title = "[" + page + "/" + totalPages + "] " + HI6MA.series_full + " | " + document.domain;
}

/*
    Truncate
*/
function truncate(str){
  return str.replace(/\W/g, '');
}