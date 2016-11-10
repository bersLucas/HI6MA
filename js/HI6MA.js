/*
    Init
*/
//page constraints
var sheet = document.styleSheets[(document.styleSheets.length - 1)];
sheet.insertRule("#book img{max-width:" + (window.innerWidth - 30) + "px;}", 0);
sheet.insertRule("@media (orientation: portrait), (max-width: 750px){#book img{max-width:" + window.innerWidth + "px !important;}}", 0);
var leftM = 30; //distance #book moves to the right
var currentPage = 1; //current page a reader is at

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
chaper = "";
series_r = "";
chaper_r = "";

//Array of all books
var seriesList = document.querySelectorAll("#series .book");

/*
    Load from URL
*/
//If it's a non-default URL, go to that series/ch/page
var URL = document.URL;
URL = URL.split("#");
if (URL[1] != undefined) {
  
  //remove the "/"
  if (URL[1].substr(0, 1) == "/") {
    URL[1] = URL[1].substr(1);
  }
  
  //Take everything after the "#";
  URL[1] = URL[1].split("#");
  URL[1] = URL[1][URL[1].length - 1];
  var urlX = URL[1].split("_");
  series = urlX[0];
  chapter = urlX[1];
  
  //current series
  eBook.setAttribute("cur-series", series);
  
  //current chapter ID
  eBook.setAttribute("cur-chapter", chapter);
  
  //current chapter title
  eBook.setAttribute("cur-chapter_r", document.getElementById(chapter).innerHTML);
 
  //activate the sidebar
  eSidebar.classList.add("activeSidebar");
  //eSidebar.setAttribute("style", "margin-right:0%");
  
  //set the background to white
  eHTML.setAttribute("style", "background-color: #fff;");
  document.getElementsByTagName("body")[0].setAttribute("style", "background-color: #fff;");
  
  //move to the first page
  eBook.setAttribute("style", "margin-right:30px");
 
  //hide the vertical scroll (and mobile css)
  eHTML.classList.toggle("viewing");
  
  //reset counters
  leftM = 30;
  currentPage = 1;
  document.getElementById("title").innerHTML = document.domain;
  loadBook();
  
  //TRY to get the current series' name
  for (var i=0; i<seriesList.length; i++){
    if (seriesList[i].getAttribute("ID") == urlX[0]){
      series_r = seriesList[i].children[0].innerHTML;
    }
  }
  
  if (series_r != undefined){
    eTitle.innerHTML = series_r;
  }
  
  //Populate #chapters with the information available.  
  var chapterList = document.querySelector("#"+series+" .chapList").innerHTML;
  document.getElementById("chapters").innerHTML = chapterList;
}

/*
    Clicking on the title (return button)
*/
eTitle.onclick = function () {
    //reset the sidebar to normal
    eSidebar.classList.remove("activeSidebar");
    eHeader.setAttribute("style", "left:0%; margin-bottom:"+eFooter.offsetHeight + "px");
  
    //show #series
    eSeries.classList.toggle("hideSeries");
  
    //remove white background
    eHTML.setAttribute("style", "");
    document.getElementsByTagName("body")[0].setAttribute("style", "");
  
    //remove all loaded pages
    eBook.innerHTML = "";
  
    //put the domain in the header
    eHeadTitle.innerHTML = domain;
  
    //Allow vertical scroll on body
    eHTML.classList.toggle("viewing");
    window.scrollTo(0, 0);
}

/*
    Clicking on the back button
*/
eBack.onclick = function () {
  //hide the back button
  this.classList.add("hide");
  
  //return to #series
  eSeries.classList.toggle("hideSeries");
  eSidebar.setAttribute("style", "margin-right:0%");
  eHeader.setAttribute("style", "left:0%");
  
  //put the domain in the header
  eHeadTitle.innerHTML = domain;
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
    leftM -= document.querySelector(".currentPage").offsetWidth;

    //try for a .png file
    try {
      document.querySelector("#pagePNG" + currentPage).classList.toggle("currentPage");
    }catch (e) {}

    //try for a .jpg file
    try {
      document.querySelector("#pageJPG" + currentPage).classList.toggle("currentPage");
    }catch (e) {}

    currentPage++;

    //try for .png file
    try {
      document.querySelector("#pagePNG" + currentPage).classList.toggle("currentPage");
    }catch (e) {}

    //try for .jpg file
    try {
      document.querySelector("#pageJPG" + currentPage).classList.toggle("currentPage");
    }catch (e) {}

    //add an event listener to the next page
    eBook.addEventListener("click", nextPage);

    //move #book as intended
    eBook.setAttribute("style", "margin-right:" + leftM + "px");
  }
  catch (e) {
    //No more pages to move forward to
    endOfChapter();
  }

  //Update the title
  title(currentPage, totalPages);
}

/*
    Return to chapter list when done with a chapter
*/
function endOfChapter(){
  //reset the sidebar to normal
  eSidebar.classList.remove("activeSidebar");
  eSidebar.setAttribute("style","margin-right:100%;margin-bottom:"+eFooter.offsetHeight + "px");
  eHeader.setAttribute("style", "left:100%");

  //remove white background
  eHTML.setAttribute("style", "");
  document.getElementsByTagName("body")[0].setAttribute("style", "");

  //remove all loaded pages
  eBook.innerHTML = "";

  //Put the series name in the header
  eHeadTitle.innerHTML = series_r;
  
  /*
  !!!   How to put chapter list when it wasn't loaded (hash url)??
  */
  
  //Allow vertical scroll on body
  eHTML.classList.toggle("viewing");
  window.scrollTo(0, 0);
}

/*
    Page back function
*/
var prevPage = function () {
    if (currentPage > 1) {
      try {
        //remove the click function.
        eBook.removeEventListener("click", nextPage);
        
        //calculate the amount to move #book
        leftM += document.querySelector(".currentPage").previousElementSibling.offsetWidth;
       
        //try for a .png file
        try {
          document.querySelector("#pagePNG" + currentPage).classList.toggle("currentPage");
        }
        catch (e) {}
        
        //try for a .jpg file
        try {
          document.querySelector("#pageJPG" + currentPage).classList.toggle("currentPage");
        }
        catch (e) {}
        
        currentPage--;
        
        //try for .png file
        try {
          document.querySelector("#pagePNG" + currentPage).classList.toggle("currentPage");
        }
        catch (e) {}
        
        //try for .jpg file
        try {
          document.querySelector("#pageJPG" + currentPage).classList.toggle("currentPage");
        }
        catch (e) {}
       
        //add an event listener to the next page
        eBook.addEventListener("click", nextPage);
       
        //move #book as intended
        eBook.setAttribute("style", "margin-right:" + leftM + "px");
      }
      catch (e) {}
      
      //Update the title
      title(currentPage, totalPages);
    }
  }

/*
    Putting pages onto a #book
*/
function loadBook() {
  //current series
  series = eBook.getAttribute("cur-series");
 
  //current chapter
  chapter = eBook.getAttribute("cur-chapter");
 
  //current chapter (unformatted string)
  chapter_r = eBook.getAttribute("cur-chapter_r");
 
  //add the current chapter to the hash
  location.hash = series + "_" + chapter;
 
  //reset variables and #book
  totalPages = 1;
  page = 1;
  eBook.innerHTML = "";
 
  //add a .png image
  imgSrc = "i/" + series + "/" + chapter_r + "/" + pformat(page) + ".png";
  var add = document.createElement("img");
  add.setAttribute("src", imgSrc);
  add.setAttribute("id", "pagePNG" + page);
  add.setAttribute("onerror", "removeBroken(this)");
  eBook.appendChild(add);
  
  //add a .jpg image
  imgSrc = "i/" + series + "/" + chapter_r + "/" + pformat(page) + ".jpg";
  "/" + pformat(page) + ".jpg";
  var add = document.createElement("img");
  add.setAttribute("src", imgSrc);
  add.setAttribute("id", "pageJPG" + page);
  add.setAttribute("onerror", "removeBroken(this)");
  eBook.appendChild(add);
 
  //make the first image the current page
  document.querySelector("#pagePNG1").classList.add("currentPage");
  document.querySelector("#pageJPG1").classList.add("currentPage");
  
  //back button
  document.getElementById("prevPage").onclick=function(){
    prevPage();
  }
  
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
  imgSrc = "i/" + series + "/" + chapter_r + "/" + pformat(page) + ".png";
  var add = document.createElement("img");
  add.setAttribute("src", imgSrc);
  add.setAttribute("id", "pagePNG" + page);
  add.setAttribute("onerror", "removeBroken(this)");
  eBook.appendChild(add);
  
  //add a .jpg file
  imgSrc = "i/" + series + "/" + chapter_r + "/" + pformat(page) + ".jpg";
  var add = document.createElement("img");
  add.setAttribute("src", imgSrc);
  add.setAttribute("id", "pageJPG" + page);
  add.setAttribute("onerror", "removeBroken(this)");
  eBook.appendChild(add);
  
  //Don't load the next page if you click the title to remove the sidebar
  if (document.querySelector(".activeSidebar") != null) {
    
    //load the next page
    loadImg(page);
  }
  totalPages++;
  title(currentPage, totalPages);
  
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
  document.title = "[" + page + "/" + totalPages + "] " + eHeadTitle.innerHTML + " | " + document.domain;
}

