<?php
session_start();
?>
<?php

$connection = $_GET["connection"];


$cfile=fopen(__DIR__."/connection.txt", "w") or die("Unable to open file connection.txt!");
$sfile=fopen(__DIR__."/script.txt", "w") or die("Unable to open file script.txt!");
fwrite($cfile, $connection);
fwrite($sfile, $_SESSION["script"]);
fclose($cfile);
fclose($sfile);
?>


<?php
echo "Profile used for report: " . $connection . ", script run: ".$_SESSION["script"];
echo "<br> Finilizing report .......";


 
// Report execution is done this way to have all the logs in one place while the load on the browser and server is much lighter because the fetch api calls the smaller file what will be replaced every time it reaches 100kb and it is sunday morning (not done yet)
shell_exec('sudo -u reporter bash /var/www/html/tools/reporting/report.sh  | tee -a cexec.log /var/www/html/tools/reporting/exec.log > /dev/null 2>&1 &');

?>

<?php
// remove all session variables
session_unset();

// destroy the session
session_destroy();
?>

<meta http-equiv="refresh" content="3; url=./index.php" />
