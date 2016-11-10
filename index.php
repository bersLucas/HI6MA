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
  <sidebar id="menu">
    <!--Header-->
    <header>
      <button v-if="openChapter" v-on:click="closeBook" id="back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 1000 1000"><path d="M794.6 120.8L684 10 196 498l485.4 492 122.8-116.4L413.5 496l381-375.2z"/></svg>
      </button>
      <div id="headTitle">
        <span v-if="openChapter">{{series_name}}</span>
        <span v-else>{{domain}}</span>
      </div>
    </header>
    
    <!--Chapter list-->
    <div id="chapters" v-bind:class="{openChapter: openChapter, slideOut: readingBook}">
      <ul>
        <li v-for="(chapter, index) in loadedChapters" v-bind:id="truncate(index)" v-on:click="loadChapter(index)">
          {{chapter}}
        </li>
      </ul>
    </div>
    
    <!--Book list-->
    <div id="series">
      <div class="book" v-for="(book, index) in booklist" v-bind:id="book.folder" v-on:click="openBook(index)">
        <h2>{{book.name}}</h2>
        <h3>{{book.author}}</h3>
        <img v-bind:src="bookCover(index)"/>
        <h4>{{book.kanji}}</h4>
        <h5>{{book.TL}}</h5>
      </div>
    </div>
    
    <!--Reading button-->
    <div id="prevPage"><svg xmlns="http://www.w3.org/2000/svg" fill="#333" viewBox="0 0 1000 1000"><path d="M794.6 120.8L684 10 196 498l485.4 492 122.8-116.4L413.5 496l381-375.2z"/></svg></div>
    
    <!--Title button-->
    <span v-if="readingBook" id="title">
      {{series_name}}
    </span>
  </sidebar>
  
  <!--Pages-->
  <div id="book"></div>
  
  <footer>
      <!--Front page-->
      <?php include"front.php"; ?>

  </footer>
</body>

<script src="js/HI6MA.js"></script>
<script src="js/vue.min.js"></script>
<script src="js/hammer.js"></script>

<script>
var domain = document.domain;
if (domain.substr(0, 3) === "www") {
  domain = domain.substr(4, domain.length);
}
  
var bookList = new Vue({
  el: '#menu',
  data: {
    //Array of all books
    booklist: books,
    
    //Display states
    openChapter: false,
    readingBook: false,
    
    //Text variables
    series_name: "",
    domain: domain,
    
    //Chapter list
    loadedChapters: new Array()
  },
  methods: {
    //Fetch covers
    bookCover: function(id) {
      var cover = "i/" + this.booklist[id].folder;
      cover += "/cover.jpg";
      return cover;
    },
    
    //click on a book
    openBook: function(id){
      this.openChapter = true;
      this.loadedChapters = this.booklist[id].chapters;
      series = this.booklist[id].folder;
      eBook.setAttribute("cur-series", series);
      
      this.series_name = this.booklist[id].name;
    },
    
    //back button
    closeBook: function(){
      this.openChapter = false;
      this.loadedChapters = [""];
    },
    
    //Load a chapter
    loadChapter: function(id){
      chapter_r = this.loadedChapters[id];
      var chapterID = this.loadedChapters[id];
      chapter = chapterID.replace(/\W/g, '');
      
      eBook.setAttribute("cur-chapter", chapter);
      eBook.setAttribute("cur-chapter_r", chapter_r);
      
      this.readingBook = true;
      
      loadBook();
      readingEvents();
      window.scrollTo(0, 0);
    },
    
    //remove non alpha-numberic characters
    truncate: function(id){
      var chapterID = this.loadedChapters[id];
      return chapterID.replace(/\W/g, '');
    }
  }
});
</script>
