<!doctype>
<head>
<link href="css/reset.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">
<meta name="viewport" content="minimal-ui, width=device-width, user-scalable=no"/>
<meta charset="utf-8">
<title>(ﾉ^ヮ^)ﾉ*</title>
</head>

<body>
  <sidebar>
    <header>
      <div class="hide" id="back"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 1000 1000"><path d="M794.6 120.8L684 10 196 498l485.4 492 122.8-116.4L413.5 496l381-375.2z"/></svg></div>
      <div id="headTitle"></div>
      
    </header>
    <div id="series">
<?PHP

class manga{
  public $folder = 'value 1';
  public $name = 'value 2';
  public $kanji= 'value 3';
  public $author= 'value 3';
  public $chapters=array();
}
  
$od = @opendir("i");
$counter = 0;
      
while ($f = @readdir($od)) {
  if (is_dir("i/" . $f) && $f != "." && $f != "..") {
    $data_file = file_get_contents("i/".$f."/data.txt",FILE_USE_INCLUDE_PATH);
    $data = explode(PHP_EOL, $data_file);

    $mangas[$counter] = new manga();
    $mangas[$counter]->folder = $f;
    $mangas[$counter]->name = $data[0];
    $mangas[$counter]->kanji = $data[1];
    $mangas[$counter]->author = $data[2];
    $mangas[$counter]->TL = $data[3];
    
    $od2 = @opendir("i/".$f);
    while ($g= @readdir($od2)) {
      if (is_dir("i/" . $f . "/" . $g) && $g != "." && $g != "..") {
        $mangas[$counter]->chapters[] = $g;
      }
    }
    sort($mangas[$counter]->chapters);
    $counter++;
  }
}

sort($mangas);

foreach ($mangas as $key => $value) {
  echo "<div class='book' id='".$value->folder."'>";
  echo "<h2>".$value->name."</h2>";
  echo "<h3>".$value->author."</h3>";
  echo "<img src='i/".$value->folder."/cover.jpg'/>"; 
  
  if ($value->kanji == ""){
    echo "<h4 class='hide'>_</h4>";
  } else{
    echo "<h4>".$value->kanji."</h4>";
  }
  
  if ($value->TL == ""){
    echo "<h5 class='hide'></h5>";
  } else{
    echo "<h5>".$value->TL."</h5>";
  }
  
  echo "<div class='chapList'><ul>";
  foreach ($value->chapters as $value2){
    $value3 = preg_replace("/[^A-Za-z0-9 ]/", '', $value2);
    $value3 = str_replace(" ","",$value3);
    echo "<li id='".$value3."'>".$value2."</li></a>";
  }
  echo "</ul></div>";
  echo "</div>";
}
?>
    </div>
    <div id="chapters">

    </div>
    <div id="prevPage"><svg xmlns="http://www.w3.org/2000/svg" fill="#333" viewBox="0 0 1000 1000"><path d="M794.6 120.8L684 10 196 498l485.4 492 122.8-116.4L413.5 496l381-375.2z"/></svg></div>
    <span id="title"></span>
  </sidebar>
  <div id="book">
  </div>
  
  <footer>
      <!--Front page-->
      <?php include"front.php"; ?>
  </footer>
</body>

<style>

</style>
<script src="js/hammer.js"></script>
<script src="js/HI6MA.js"></script>
