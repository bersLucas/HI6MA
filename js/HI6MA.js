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

/*
    Domain
*/
var domain = document.domain;
if (domain.substr(0, 3) === "www") {
  domain = domain.substr(4, domain.length);
}
eHeadTitle.innerHTML = domain;
cur_Series = "";
cur_Chaper = "";
series_r = "";

//Array of all books
var seriesList = document.querySelectorAll("#series .book");

/*
    Burger Menu
*/
document.getElementById("burger").onclick = function () {
  this.classList.toggle("openMenu");
  document.getElementById("front").classList.toggle("hide");
  document.getElementById("front").classList.toggle("frontAni");
};

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
  cur_Series = urlX[0];
  cur_Chapter = urlX[1];
  
  //current series
  eBook.setAttribute("cur_series", cur_Series);
  
  //current chapter ID
  eBook.setAttribute("cur_chapter", cur_Chapter);
  
  //current chapter title
  eBook.setAttribute("chapter_r", document.getElementById(cur_Chapter).innerHTML);
 
  //activate the sidebar
  eSidebar.classList.add("activeSidebar");
  eSidebar.setAttribute("style", "margin-right:0%");
  
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
  
  //TRY to get cur_chapter_R
  for (var i=0; i<seriesList.length; i++){
    if (seriesList[i].getAttribute("ID") == urlX[0]){
      series_r = seriesList[i].children[0].innerHTML
    }}
}

/*
    Movement
*/
for (var i = 0; i < seriesList.length; i++) {
  /*
      Clicking on a book
  */
  seriesList[i].onclick = function () {
    //move to the chapters
    eSidebar.setAttribute("style", "margin-right:100%");
    eHeader.setAttribute("style", "left:100%");
    
    //show the back button
    eBack.classList.toggle("hide");
  
    //hide #series (this prevents a vertical scroll)
    eSeries.classList.toggle("hideSeries");
  
    //put the series' info in #book
    eBook.setAttribute("cur_series", this.getAttribute("id"));
   
    //populate #series
    var chapterList = this.querySelector(".chapList").innerHTML;
    document.getElementById("chapters").innerHTML = chapterList;
    
    //put the series title in the header
    series_r = this.querySelector("h2").innerHTML;
    window.scrollTo(0, 0);
    eHeadTitle.innerHTML = series_r; 
   
    /*
        Clicking on a chapter
    */
    var chapList = document.querySelectorAll("#chapters li");
    for (var i = 0; i < chapList.length; i++) {
      chapList[i].onclick = function () {
        //activate the sidebar
        eSidebar.classList.add("activeSidebar");
        eSidebar.setAttribute("style", "margin-right:0%");
        //hide the back button
        eBack.classList.add("hide");
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
        //get the chapter info and put it in #book
        eBook.setAttribute("cur_chapter", this.getAttribute("id"));
        eBook.setAttribute("chapter_r", this.innerHTML);
        eTitle.innerHTML = eHeadTitle.innerHTML;
        //run book functions
        loadBook();
        readingEvents();
        window.scrollTo(0, 0);
      }
    }
  }
}

/*
    Clicking on the title (return button)
*/
eTitle.onclick = function () {
    //reset the sidebar to normal
    eSidebar.classList.remove("activeSidebar");
    eHeader.setAttribute("style", "left:0%");
  
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
  console.log("A");
  //reset the sidebar to normal
  eSidebar.classList.remove("activeSidebar");
  eSidebar.setAttribute("style","margin-right:100%");
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
        leftM += document.querySelector(".currentPage").offsetWidth;
       
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
  series = eBook.getAttribute("cur_series");
 
  //current chapter
  chapter = eBook.getAttribute("cur_chapter");
 
  //current chapter (unformatted string)
  chapter_r = eBook.getAttribute("chapter_r");
 
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