<?php
session_start();

?>
<?php
$app_message = "";
$target_dir = "./uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$_SESSION["script"]=basename( $_FILES["fileToUpload"]["name"]);
$script_name=$_SESSION["script"];
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
$query_size = filesize($_FILES["fileToUpload"]["tmp_name"]);



// Allow certain file formats
if($script_name =="" ) {
    $app_message .= "Nothing was uploaded.";
    $uploadOk = 0;
    
}

else if ($query_size < 1){
    $app_message .= "This file is empty.";
    $uploadOk = 0;
    
}
// Check if there was even something uploaded
else if ($imageFileType != "sql" && $imageFileType != "SQL") {
    $app_message .= "Invalid file extension.";
    $uploadOk = 0;
    
}  

$_SESSION["app_message"] = $app_message;

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    
    header('Location: ./1errorPage.php');
    

// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {

        $app_message =  "The file ". $_SESSION["script"]. " has been uploaded.";
		//Do naming change and prepare the SQL for Workbench
		#cut filename, drop SQL
		$re = '/(.+).sql/';
		preg_match_all($re, $script_name, $cut_script_name);
		#echo "<br>".$cut_script_name[1][0];
		$file_data="WbExport -file=/data/reporting/reports/single_time/".$cut_script_name[1][0].".xlsx -type=xlsx -continueOnError=true -header=true;\n";
		$file_data .= file_get_contents("./uploads/".$_SESSION["script"]);
		file_put_contents("./uploads/".$_SESSION["script"], $file_data);		
		$connection_select = 1;
    } else {
        $app_message = "Sorry, there was an error uploading your file.";
    }
}

?> 

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
	<title>Run SQL report v1.0/ Select Connection</title>
	<link rel="stylesheet" type="text/css" href="./style.css">
</head>
<script type="text/javascript">
var ray={
ajax:function(st)
	{
		this.show('load');
	},
show:function(el)
	{
		this.getID(el).style.display='';
	},
getID:function(el)
	{
		return document.getElementById(el);
	}
}
var scriptName = '<?php echo $script_name; ?>';
sessionStorage.setItem("scriptName",scriptName.toString() )
    // console.log("button kilkked")
    var sm_error = '<?php echo $app_message;  ?>';
    sessionStorage.setItem("app_message", sm_error.toString() )
    // console.log(sessionStorage.getItem("app_message"))


</script>
<body>
    <div class="outerFlex">
        <div >
            <Nav class="navbarContainer">
                    <div class="navbarLinks"  >
                    <div class="navBarOptions">
                    <p><a href="http://gsd.int.kn/tools/reporting/reporter/exec.log">Script logs</a>
                    </div>
                    <div class="navBarOptions">
                    <p><a href="http://gsd.int.kn/tools/reporting/reporter/reports/">Reports page</a><br>
                    </div>
                    </div>
                    <div class="siteName">
                        <p>GSD1 Reporting Tool</p>
                    </div>
                </Nav>
                </div>
    </div>
        <div class="flexContainerInner">
    <div id="rightpanel" class="flexContainerleft">
            <div id="controls" class="controlPanel">
                <div id="buttons" class="uploadPanel">  
                    <form action="1upload.php" method="post" enctype="multipart/form-data" class="uploadForm">
                    <div><input type="file" accept=".sql, .SQL"  name="fileToUpload" id="fileToUpload" class="custom-file-inputFile"  ></div>
                    <div><input type="submit" value="File Upload" name="submit"  class="custom-file-inputSubmit" ></div>
                    </form>
                </div>           
                <div id="databaseoptions"></div>     
            </div>            
            <div id="reportPanel" class="reportPanel"></div>
    </div>
    <div id="leftpanel" class="flexContainerRight">
        <div class="executedScripts">
    <iframe class="executedScriptsIframe" src="https://gsd.int.kn/tools/reporting/reporter/reports/" title="Executed Report List"></iframe>
        </div>
    </div>
</div>
    
    <script src="runReport.js" type="module"></script>
    <script>




</script>
</body>


</html>



