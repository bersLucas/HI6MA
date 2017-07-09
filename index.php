<!doctype>
<?php include"load.php"; ?>
<script>books = <?php echo getSeries(); ?>;</script>

<head>
  <link href="css/reset.css" rel="stylesheet" type="text/css">
  <link href="css/style.css" rel="stylesheet" type="text/css">
  <meta name="viewport" content="minimal-ui, width=device-width, user-scalable=no"/>
  <meta charset="utf-8">
  <title>୧| ” •̀ ل͜ •́ ” |୨</title>
</head>

<body>
  <sidebar id="menu" v-cloak v-bind:class="{activeSidebar: readingBook}">
    
    <!--Header-->
    <header v-if="openChapter">
      <button v-if="openChapter" v-on:click="closeBook" id="back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 1000 1000"><path d="M794.6 120.8L684 10 196 498l485.4 492 122.8-116.4L413.5 496l381-375.2z"/></svg>
      </button>
      <div id="headTitle">
        <span>{{domain}}</span>
      </div>
    </header>
    
    <!--Chapter list-->
    <div id="chapters" v-bind:class="{openChapter: openChapter, slideOut: readingBook}">
      <img class="cover_image" v-bind:src="'i/' + series + '/cover.jpg'"/>
      <div class='book_information'>
        <h2>{{book.name}}</h2>
        <h3>{{book.kanji}}</h3>
        <h4>Written by: <b>{{book.author}}</b></h4>
        <h5>Translated by: <b>{{book.TL}}</b></h5>	
      </div>
      <ul>
        <li>
					<a v-bind:href="'#' + series + '_'+ truncateChapter(index)" v-for="(chapter, index) in loadedChapters" v-bind:id="truncateChapter(index)" v-on:click="loadChapter(index)">
          	{{chapter}}
        	</a>
				</li>
      </ul> 
    </div>
    
    <!--Book list-->
    <div v-if="showSeries" id="series" v-bind:class="{hideiFrame: hideiFrame}">
      <div class="book" v-for="(book, index) in booklist" v-bind:id="book.folder" v-on:click="openBook(index, book)">
        <div class="book-info">
          <h2 v-if="checkEmpty(book.name)">{{book.name}}</h2>
          <h3 v-if="checkEmpty(book.author)">{{book.author}}</h3>
        </div>
        <img v-bind:src="bookCover(index)"/>
        <div class="book-info-bottom">
          <h4 v-bind:style="{background: book.BG}" v-if="checkEmpty(book.kanji)">{{book.kanji}}</h4>
          <h5 v-bind:style="{background: book.BBG}" v-if="checkEmpty(book.TL)">{{book.TL}}</h5>
        </div>
      </div>
    </div>
    
    
    <iframe v-if="!hideiFrame" v-show="showSeries" src="books"></iframe>
    
    <!--Previous page button-->
    <div id="prevPage" v-on:click="previousPage()" v-if="readingBook"><svg xmlns="http://www.w3.org/2000/svg" fill="#333" viewBox="0 0 1000 1000"><path d="M794.6 120.8L684 10 196 498l485.4 492 122.8-116.4L413.5 496l381-375.2z"/></svg></div>
    
    <!--Title button-->
    <span v-if="readingBook" id="title" v-on:click="returnToSeriesList()">
      {{series_full}}
    </span>
  </sidebar>
  
  <!--Pages-->
  <div id="book" v-bind:class="{readingBook: readingBook}"></div>
    
</body>

<script src="js/src/vue.min.js"></script>
<script src="js/HI6MA-min.js"></script>
