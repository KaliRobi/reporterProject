<?php
session_start();
?>
<!-- TODO
Add link back to the tools page or 
or just remove the executed reportson and add the back the the tools page
-->


<!DOCTYPE html>
<html>
<head>
	<title>Run SQL report v1.0</title>
	<link rel="stylesheet" type="text/css" href="./style.css">
<meta   http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
	</head>
<body>
    <div class="outerFlex">
        <div >
            <Nav class="navbarContainer">
                <div class="navbarLinks"  >
                <div class="navBarOptions">
                <p><a href="http://server/tools/reporting/reporter/exec.log">Script logs</a>
                </div>
                <div class="navBarOptions">
                <p><a href="http://server/tools/reporting/reporter/reports/">Reports page</a>
                </div>
                </div>
                <div class="siteName">
                    <p  >GSD Reporting Tool</p>
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
            <div><input type="submit" value="File Upload" name="submit" class="custom-file-inputSubmit" ></div>
            </form>
        </div>           
        <div id="databaseoptions">
            </div>     
        </div>            
        <div id="logPanel" class="logPanel">
        </div>
    </div>
    <div id="leftpanel" class="flexContainerRight">
        <div class="executedScripts">
    <iframe class="executedScriptsIframe" src="http://server/tools/reporting/reporter/reports/" title="Executed Report List"></iframe>
        </div>
    </div>
    </div> 
          
        
    
    <script src="index.js" type="module" ></script>
   
</body>
</html> 

