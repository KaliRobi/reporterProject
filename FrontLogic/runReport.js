import { renderDatabaseOptions } from './index.js'

function runReprotPanel () {

    const buttonPanelRun =  `
            <br>
            <p>Select connection type: </p>
            <form action ="1report.php" onsubmit="return ray.ajax()">
            <select name="connection">
            <option value="Dump1">Dump1</option>;
            <option value="Dump2">Dump2</option>;
            <option value="Dump3">Dump3</option>;
            <option value="ProdRead">ProdRead (please consider DUMP)</option>
            <option value="OTHERSYSTEMPRODDump">OTHERSYSTEMPRODPDump</option>
            <option value="OTHERSYSTEMPRODProd">OTHERSYSTEMPRODProd</option>";
            </select>
            <br></br>
            <input type="submit" value="Run the report"></input>
            </form>`

    document.getElementById("buttons").innerHTML =  buttonPanelRun
}

// <!-- this needs to be replaced by Inner html functions -->
//             <button type="submit" id="submitButton">Run Report</button>
//             <p>NB!  files only with the correct extensions</p>
//             </div>




runReprotPanel ()
setInterval( e => {renderDatabaseOptions(), 6000})