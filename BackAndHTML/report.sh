#!/bin/sh

echo ""
echo "[=============================================================================]"
$echo date +%y-%m-%d/%H:%M:%S

scriptpath=/var/www/html/tools/reporting/
scriptname=$(cat $scriptpath/script.txt)
script=/var/www/html/tools/reporting/uploads/$scriptname
reportname=/var/www/html/tools/reporting/script.txt
outxlsx=/var/www/html/tools/reporting/reports/$reportname.xlsx
profile=$(cat /var/www/html/tools/reporting/connection.txt)

echo "Scriptpath - " $script
echo "Scriptname - " $scriptname
echo "Conn - "$profile

if [ $profile = "PRODRead" ]; then
	executesqlwbqueryPRODRead.sh $script
elif [ $profile = "Dump1" ]; then
	executesqlwbqueryDump1.sh $script
elif [ $profile = "Dump2" ]; then
	executesqlwbqueryDump2.sh $script
elif [ $profile = "Dump3" ]; then
	executesqlwbqueryDump3.sh $script
elif [ $profile = "OTHERSYSTEMPRODRead" ]; then
	executesqlwbqueryOTHERSYSTEMPRODRead.sh $script
elif [ $profile = "OTHERSYSTEMPRODDump" ]; then
	executesqlwbqueryOTHERSYSTEMPRODDump.sh $script
fi

mv $script $scriptpath/uploads/run/

# separator for better log readability
echo "[=============================================================================]"
echo ""
