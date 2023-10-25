    //calculate the time to value from the local time
    sessionStorage.setItem("isRecheckRequired", 1)
export function renderDatabaseOptions(){
    const localTime = new Date()
    const replicationStartsDump1 =  new Date()
    replicationStartsDump1.setUTCHours(18)
    replicationStartsDump1.setUTCMinutes(0)
    const replicationStartsDump2 =  new Date()
    replicationStartsDump2.setUTCHours(23)
    replicationStartsDump2.setUTCMinutes(0)
    const replicationStartsDump3 =  new Date()
    replicationStartsDump3.setUTCHours(7)
    replicationStartsDump3.setUTCMinutes(0)
    const timeDiffDump1 = new Date(replicationStartsDump1.getTime()  -  localTime.getTime()  +  (localTime.getTimezoneOffset() * 1000 * 60))
    const timeDiffDump2= new Date(replicationStartsDump2.getTime()  -  localTime.getTime()  +  (localTime.getTimezoneOffset() * 1000 * 60))
    const timeDiffDump3 = new Date(replicationStartsDump3.getTime()  -  localTime.getTime()  +  (localTime.getTimezoneOffset() * 1000 * 60))
    
         
     // lets put all of these to a array
     const timeToGo = [timeDiffDump1.getHours(), timeDiffDump1.getMinutes(), timeDiffDump2.getHours(), timeDiffDump2.getMinutes(), timeDiffDump3.getHours(), timeDiffDump3.getMinutes() ]

     const databaseOptionsPanel =  `  
                                <div id="databaseoptions">
                                <div>
                                    <p class="optionsHeader" ><b>Dump DB replication times (UTC+0)</b></p>
                                </div>
                                <div id="dump1container" class="dbContainer" >
                                    <p class="optionsPar" >Dump 1 - 18:00</p> 
                                    <p class="optionsPar" id="Dump1RemainingTime" >Time until replication: </p>
                                    <p class="optionsParclock" >${timeToGo[0]}h:${timeToGo[1]}min</p>     
                                </div>
                                <div id="dump2container" class="dbContainer" >
                                    <p class="optionsPar" >Dump 2 - 23:00</p> 
                                    <p class="optionsPar" id="Dump2">Time until replication: </p> <div id="CounterHours">
                                    <p  class="optionsParclock">${timeToGo[2]}h:${timeToGo[3]}min</p>
                                </div>     
                                </div>
                                <div id="dump3container" class="dbContainer" >
                                    <p class="optionsPar" >Dump 3 - 07:00</p> 
                                    <p class="optionsPar" id="Dump3">Time until replication: </p> <div id="CounterHours">
                                    <p class="optionsParclock" >${timeToGo[4]}h:${timeToGo[5]}min</p>
                                </div>     
                                </div>
                            </div>              
                            `

        if(document.getElementById("databaseoptions")){
            document.getElementById("databaseoptions").innerHTML = databaseOptionsPanel 

        }                    

}


// the function prepares the raw text for the determinateLogSequence , the  the value will be render as html
async function displayRelevantInformation (){
    //index page cache otherwise the new values will be never fetched
    if(document.getElementById("logPanel")){
		// do not cache so the new log entries will be visible.
        var scriptName =  sessionStorage.getItem("scriptName")

        if(sessionStorage.getItem("isRecheckRequired") == 1 && scriptName != null){
        
	        var requestHeaders = new Headers();
            requestHeaders.append('pragma', 'no-cache');
            requestHeaders.append('cache-control', 'no-cache');
	
            var requestInit = {
            method: 'GET',
            headers: requestHeaders,
            };

    
    const logFile = await fetch('https://server/tools/reporting/reporter1/reporter1/cexec.log', requestInit).then(response => response.text()).then(
        /// to refress this part 
  
        logText => { 
        // find the last location of the script  name . As the last log entry of the script is the most relevant one 
            const centralIndex =  logText.lastIndexOf(scriptName)
        // continue only if the script name is present in the log // this is where it failes. For some reasond displays completely irrelevant logs when the app was used so 
        if( centralIndex > 0) {
        //  calculate the left and right utmost character. Test shows 600 can be set as is max expected distance, based on the log types we use.
            var startIndex = centralIndex  - (600 - logText.substring(centralIndex,   centralIndex - 600 ).lastIndexOf('Scriptpath') + 20)
            var endIndex = centralIndex + logText.substring(startIndex, logText.length).indexOf('Execution time')
            var relevantLog1 = logText.substring( startIndex , endIndex  )
        
            //destory the fetced xMB of data. 
            logText = ''
            const rawLogArray = relevantLog1.split('\n').filter(e=>e !== '')
            document.getElementById("logPanel").innerHTML = renderApplicationInfo(determinateLogSequence(rawLogArray))
        }}
           )}
             }
        if(document.getElementById("reportPanel")){
            document.getElementById("reportPanel").innerHTML = renderApplicationInfo([ sessionStorage.getItem("app_message"), "File upload state: " ])
    }
}

function determinateLogSequence(logText){
    
    // find which case do we have so the rest of the code wont run
    var returnValue = []
    const exportStartedFirstIndex = logText.indexOf(logText.filter(e=>  e.match('\\d\\d\\-\\d\\d\\-\\d\\d.*'))[0])
    
    const exportCompletedFirstIndex = logText.indexOf(logText.filter(e=>  e.match('Exporting.*'))[0])
    
    const runIntoErrorFirstIndex = logText.indexOf(logText.filter(e=>  e.match('ORA-.*'))[0])
    

    // there are 4 possible outcomes of the script, it will be found by the starting word of the log entry
    // repeat the check. Since the log the latest entry added here. The started must be larger than the other two.
    if(exportStartedFirstIndex > exportCompletedFirstIndex && exportStartedFirstIndex > runIntoErrorFirstIndex  ) {
            
        const exportStartedSequence = ['\\d\\d\\-\\d\\d\\-\\d\\d.*', 'Scriptpath.*', 'Scriptname.*',  'Conn.*', 'Connection.*',  'XLSX.*', 'Result.*']
        const exportStartedIndexedText = logText.filter( e=> logText.indexOf(e)>= exportStartedFirstIndex )
        exportStartedIndexedText.forEach(e=>{
            var re = new RegExp(exportStartedSequence[exportStartedIndexedText.indexOf(e)])
            e.match(exportStartedSequence[exportStartedIndexedText.indexOf(e)]) && exportStartedSequence.length > exportStartedIndexedText.indexOf(e)
            ? returnValue.push(e.match(re)[0]) : null
        })

        returnValue.push("Report sucessfully started")
        sessionStorage.setItem("isRecheckRequired", 1)
        
    }

    // 2 when the sql script was executed and it is executed
    // if the completed index is larger than the started = completed
    else if(exportCompletedFirstIndex > exportStartedFirstIndex) { 
        
        const exportCompletedSequence = ['Exporting.*', 'Data.*', 'SELECT.*', 'Execution.*', '\/var.*', 'Execution.*' ]
        const exportCompletedIndexedText = logText.filter( e=> logText.indexOf(e)>= exportCompletedFirstIndex )
        
        exportCompletedIndexedText.forEach(e=>{
            var re = new RegExp(exportCompletedSequence[exportCompletedIndexedText.indexOf(e)])
            e.match(exportCompletedSequence[exportCompletedIndexedText.indexOf(e)]) && exportCompletedSequence.length > exportCompletedIndexedText.indexOf(e)
            ? returnValue.push(e.match(re)[0]) : null
        })
        returnValue.push("Report sucessfully Executed")
        sessionStorage.setItem("isRecheckRequired", 0)
        sessionStorage.setItem("scriptName", null)
}

    // 3 when there is an ORA error
    // if the error index is larger than the starting index it is caught here
    else if(runIntoErrorFirstIndex > exportStartedFirstIndex) {
        
        const runIntoErrorSequence = ['ORA-.*']
        const runIntoErrorIndexedText = logText.filter( e=> logText.indexOf(e)>= runIntoErrorFirstIndex ) 
        
        runIntoErrorIndexedText.forEach(e=>{
            var re = new RegExp(runIntoErrorSequence[runIntoErrorIndexedText.indexOf(e)])
            e.match(runIntoErrorSequence[runIntoErrorIndexedText.indexOf(e)]) && runIntoErrorSequence.length > runIntoErrorIndexedText.indexOf(e)
            ? returnValue.push(e.match(re)[0]) : null
        })
        returnValue.push("Report run into Error:")
        sessionStorage.setItem("isRecheckRequired", 0)
        sessionStorage.setItem("scriptName", null)
}

    // 4 something unexpected (no sequence match)
    //  to catch everything else 
    else  {
        returnValue.push("Unexpected state, please check the logfile manually ")
        returnValue.push("To see app log hit F12 -> console ")
        console.log(scriptName)
        console.log(logText)
        console.log("exportStartedFirstIndex: " + exportStartedFirstIndex) 
        console.log("exportCompletedFirstIndex: " + exportCompletedFirstIndex)
        console.log("runIntoErrorFirstIndex: " + runIntoErrorFirstIndex)
        returnValue.push("Unexpected state, please check the logfile manually")
        sessionStorage.setItem("isRecheckRequired", 0)
    }
    
    return returnValue
    

}

// generates the div with the information the other functions will provide
function renderApplicationInfo(logArray) {
    
    var mainInfoDiv = document.createElement("div")
    mainInfoDiv.setAttribute("class", "logPanelInner" )
    var logHeader = document.createElement("p")
    logHeader.setAttribute("class", "logRowHeader")
    logHeader.innerText = logArray[logArray.length -1]

    logArray.pop()
    mainInfoDiv.appendChild(logHeader)
   
    
    var logRowDiv = document.createElement("div")
    logArray.forEach( el=> {
        var logRow = document.createElement("p")
        logRow.setAttribute("class", "logRow")
        logRow.innerText = `${el}`
        logRowDiv.appendChild(logRow)

    })
    mainInfoDiv.appendChild(logRowDiv)    
    return mainInfoDiv.innerHTML


}

function displayError(){
    if(document.getElementById("innerCube"))
    document.getElementById("innerCube").innerHTML = `
                                                        <div class="errorDiv">
                                                        <div class="errorMessage">
                                                        <p class="error" >You have tried to upload a file ${sessionStorage.getItem("scriptName")}. </p>
                                                      <p class="error" > This operation, however, seems to be failed with the following error: </p>
                                                      <p class="errorMain" >${sessionStorage.getItem("app_message")}</p>
                                                      <p class="error" > Shame! Dont worry though, click here: <a href=\"index.php\">link to a new chance</a>  and try again.  </p>
                                                      </div>
                                                      <div class="errorImageDiv">
                                                      <img class="errorImage" src="power.png" alt="error">                                         
                                                      </div>
                                                      </div>`

    
                                                     

}


function setIntervalFunctions(){
    displayRelevantInformation()
    renderDatabaseOptions() 
}

displayError()
displayRelevantInformation()
renderDatabaseOptions() 

setInterval( e=> {setIntervalFunctions()}
, 50000)