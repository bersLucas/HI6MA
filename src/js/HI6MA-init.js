var domain = document.domain;
if (domain.substr(0, 3) === "www") {
    domain = domain.substr(4, domain.length);
}

var HI6MA = new Vue({
    el: '#menu',

    data: {

        //Array of all books
        booklist: books,

        //Display states
        openChapter: false,
        readingBook: false,
        showSeries: true,

        //Show iFrame
        hideiFrame: true,

        //Text variables
        series_full: "",
        series: "",
        chapter: "",
        chapter_full: "",
        domain: domain,
        currentPage: 1,

        //Chapter list
        loadedChapters: new Array(),

        //Current book object
        book: "",

    },
    methods: {
        //Fetch covers
        bookCover: function(book) {
            var cover = book.folder;
            cover += "/cover.jpg";
            return cover;
        },

        //click on a book
        openBook: function(id, book){
            window.scrollTo(0,0);
            this.book = book;
            this.openChapter = true;
            this.showSeries = false;
            this.loadedChapters = this.booklist[id].chapters;
            this.series = this.booklist[id].folder;
            this.series_full = this.booklist[id].name;
        },

        //back button
        closeBook: function(){
            this.openChapter = false;
            this.showSeries = true;
            this.loadedChapters = [""];
        },

        //Load a chapter
        loadChapter: function(id){
            this.chapter_full = this.loadedChapters[id];
            var chapterID = this.loadedChapters[id];
            this.chapter = chapterID.replace(/\W/g, '');

            this.readingBook = true;
            this.openChapter = false;

            loadBook();
            readingEvents();
            window.scrollTo(0,0);
        },

        //Return to menu
        returnToSeriesList: function(){
            this.readingBook = false;
            this.showSeries = true;
            location.hash = "";
            eBook.innerHTML = "";
            eBook.setAttribute("style","transform: translateX(0px)");
            this.currentPage = 1;
            document.title = domain;
        },

        //remove non alpha-numberic characters
        truncateChapter: function(id){
            var chapterID = this.loadedChapters[id];
            return chapterID.replace(/\W/g, '');
        },

        checkEmpty: function(variable){
            if(variable == undefined || variable == ""){
                return false;
            }else{
                return true;
            }
        },

        previousPage: function(){
            prevPage();
            return;
        }
    }
});