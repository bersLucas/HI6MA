<!doctype>
<?php include"load.php"; ?>
<script>books = <?php echo getSeries(); ?>;</script>

<head>
  <link href="css/reset.css" rel="stylesheet" type="text/css">
  <link href="css/style.css" rel="stylesheet" type="text/css">
  <meta name="viewport" content="minimal-ui, width=device-width, user-scalable=no"/>
  <meta charset="utf-8">
  <title>(ﾉ^ヮ^)ﾉ*</title>
</head>

<body>
  <sidebar id="menu" v-cloak v-bind:class="{activeSidebar: readingBook}">
    
    <!--Header-->
    <header>
      <button v-if="openChapter" v-on:click="closeBook" id="back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 1000 1000"><path d="M794.6 120.8L684 10 196 498l485.4 492 122.8-116.4L413.5 496l381-375.2z"/></svg>
      </button>
      <div id="headTitle">
        <span v-if="openChapter">{{series_full}}</span>
        <span v-else>{{domain}}</span>
      </div>
    </header>
    
    <!--Chapter list-->
    <div id="chapters" v-bind:class="{openChapter: openChapter, slideOut: readingBook}">
      <ul>
        <li v-for="(chapter, index) in loadedChapters" v-bind:id="truncateChapter(index)" v-on:click="loadChapter(index)">
          {{chapter}}
        </li>
      </ul>
    </div>
    
    <!--Book list-->
    <div v-if="showSeries" id="series" v-bind:class="{hideiFrame: hideiFrame}">
      <div class="book" v-for="(book, index) in booklist" v-bind:id="book.folder" v-on:click="openBook(index)">
        <h2 v-if="checkEmpty(book.name)">{{book.name}}</h2>
        <h3 v-if="checkEmpty(book.author)">{{book.author}}</h3>
        <img v-bind:src="bookCover(index)"/>
        <h4 v-bind:style="{background: book.BG}" v-if="checkEmpty(book.kanji)">{{book.kanji}}</h4>
        <h5 v-bind:style="{background: book.BBG}" v-if="checkEmpty(book.TL)">{{book.TL}}</h5>
      </div>
    </div>
    
    
    <iframe v-show="showSeries" src="books"></iframe>
    
    <!--Previous page button-->
    <div id="prevPage" v-on:click="previousPage()" v-if="readingBook"><svg xmlns="http://www.w3.org/2000/svg" fill="#333" viewBox="0 0 1000 1000"><path d="M794.6 120.8L684 10 196 498l485.4 492 122.8-116.4L413.5 496l381-375.2z"/></svg></div>
    
    <!--Title button-->
    <span v-if="readingBook" id="title" v-on:click="returnToSeriesList()">
      {{series_full}}
    </span>
  </sidebar>
  
  <!--Pages-->
  <div id="book"></div>
</body>

<script src="js/vue.min.js"></script>
<script src="js/HI6MA-vue.js"></script>
<script src="js/HI6MA.js"></script>
<script src="js/hammer.js"></script>