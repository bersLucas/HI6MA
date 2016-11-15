<?PHP
function getSeries(){
  class manga{
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

  usort($mangas, "cmp");
  
  return json_encode($mangas);
}

function cmp($a, $b){
    return strcmp($a->name, $b->name);
}
?>