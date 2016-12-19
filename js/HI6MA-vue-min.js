var domain=document.domain
"www"===domain.substr(0,3)&&(domain=domain.substr(4,domain.length))
var HI6MA=new Vue({el:"#menu",data:{booklist:books,openChapter:!1,readingBook:!1,showSeries:!0,hideiFrame:!1,series_full:"",series:"",chapter:"",chapter_full:"",domain:domain,currentPage:1,loadedChapters:[]},methods:{bookCover:function(e){var o="i/"+this.booklist[e].folder
return o+="/cover.jpg"},openBook:function(e){window.scrollTo(0,0),this.openChapter=!0,this.showSeries=!1,this.loadedChapters=this.booklist[e].chapters,this.series=this.booklist[e].folder,this.series_full=this.booklist[e].name},closeBook:function(){this.openChapter=!1,this.showSeries=!0,this.loadedChapters=[""]},loadChapter:function(e){this.chapter_full=this.loadedChapters[e]
var o=this.loadedChapters[e]
this.chapter=o.replace(/\W/g,""),this.readingBook=!0,this.openChapter=!1,loadBook(),readingEvents(),window.scrollTo(0,0)},returnToSeriesList:function(){this.readingBook=!1,this.showSeries=!0,location.hash="",eBook.innerHTML="",eBook.setAttribute("style","transform: translateX(0px)"),this.currentPage=1,document.title=domain},truncateChapter:function(e){var o=this.loadedChapters[e]
return o.replace(/\W/g,"")},checkEmpty:function(e){return void 0==e||""==e?!1:!0},previousPage:function(){prevPage()}}})
