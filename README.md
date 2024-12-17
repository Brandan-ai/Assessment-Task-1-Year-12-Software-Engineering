# Assessment-Task-1-Year-12-Software-Engineering-Brandan-Farley

### Project Overview
This is a simple WPA Study Planner that is designed to store your study sessions for you so you don't have to.

### Setup Instructions
* To begin with, install Visual Studio Code. https://code.visualstudio.com/
* After that install 'sqlite3'. https://www.sqlite.org/download.html
* After that install 'Node.js'. https://nodejs.org/en
* After that, open Visual Studio Code and click on file in the top left hand corner, select open folder and find 'Assessment-Task-1-Year-12-Software-Engineering', click on it, then click select folder.
* After that click the triple dots in the top left hand side.
* After that hover over 'Terminal' and click 'New Terminal', a powershell tab should open up at the bottom of the page, click on it.
* After that type 'node -v' and press enter.
* After that type 'npm -v' and press enter.
* This ensures that Node.js and npm are installed.
* After that type 'npm install sqlite3' and press enter.
* After that type 'npm install express' and press enter.
* This downloads and installs sqlite3 and express.
* After this you will need to edit the directories of the databases.
* Navigate to 'Server.js', you will need to replace the directories on lines 12 and 70.
* Open file explorer and find where 'study-planner.db' and users.db are.
* Left then right click on 'study-planner' and select 'Copy as path'.
* Go back to Server.js and paste this in line 12 where the existing path is.
* You will have to change the '\\'s to '/'.
* After that navigate back to file explorer.
* Left then right click on 'users' and select 'Copy as path'.
* Go back to Server.js and paste this in line 70 where the existing path is.
* You will have to change the '\\'s to '/'.
* After all this is done you can type 'node server.js' in the powershell.
* This starts up your PWA locally.
* After that you can open either a 'New Incognito Window' or 'New InPrivate Window' and type 'localhost:3000' in the search bar.
* The Study Planner should be ready to go!
* **The Login details are 'Test' and '1234'.**

### Usage Guidelines
I honestly don't know what to put here.

### Features
* The Study Planner features a light/dark mode toggle for people that either enjoy light mode or dark mode.
* The Study Planner also features a secure login page that keeps you study sessions and content hidden until the correct username and password is entered.
* The Study Planner also features a study content page where existing study content is.

### Directory Structure
* 'public', this directory contains all the front-end files.
* 'Icons', this directory contains all the icons being used in the website.
* 'darkmode.js' this file adds interactivity to the light/dark mode button.
* 'Manifest.js' this file defines how the PWA should behave on a device.
* 'Script.js' this file adds interactivity to the study planner buttons.
* 'serviceworker.js' this file enables offline functionality and caches resources.
* 'Sign In.html' this file is the structure for the Sign In page of the website.
* 'Study Content.html' this file is the structure for the Study Content page of the website.
* 'Study Planner.html' this file is the structure for the Study Planner page of the website.
* 'Styles.css' this file is the styles used in each page of the website.
* 'Server.js' this file sets up the Node.js server and connects to the SQLite database.
* 'study-planner.db' this file is the database that stores the study sessions.
* 'users.db' this file is the database that stores the username and password for the Sign In page.