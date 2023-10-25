One of our responsibilities is to write sql based reports to BU. 
Sometimes these reports can run for hours so to avoid issues with sql developer we had this tool to extract everying on the server.

The app was pretty minimalistic. Basicly a script on the server with a one page - two frontend element (upload, select databse) solution.
My task was to bring it closer to a web app.

This included all the Javascript and CSS parts. Vanilla javascript was choosen because the script might needs to be modified in the future, which is more complicated with ReactJs.
Reworking the Php part. Since the php-html was already given I was asked to not to separte them to save developemt time.
More checkes, error page, different logging, upload system and housekeeping was added. 