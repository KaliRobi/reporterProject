<?php
session_start();

?>

<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./style.css">
    <title>Document</title>
  </head>
  <script>
   
    var scriptName = '<?php echo $_SESSION["script"]; ?>';
    var sm_error = '<?php echo $_SESSION["app_message"];  ?>';
    sessionStorage.setItem("app_message", sm_error.toString() )
    sessionStorage.setItem("scriptName",scriptName.toString() )
</script>
  <body>
      <div  class="outerCube"  >
        <div class="innerCube" id="innerCube">
            
        </div>   
      </div>
    <script src="index.js" type="module" ></script>
  </body>
  </html>