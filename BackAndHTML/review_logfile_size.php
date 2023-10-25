<?php
$logfile_location = "./cexec.log"; 
$size_limit = 204800/1024;

if(file_exists($logfile_location)){
    if(filesize($logfile_location) /1024 > $size_limit){
           $file = fopen($logfile_location, 'w');
           ftruncate($file, 0 );
           fclose($file);
    } 
} else {
    $newFile = fopen("./cexec.log", 'w');
    fclose($newFile) ;
}

?>