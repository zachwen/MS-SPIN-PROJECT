
"This software was developed with support from NCSA through the Students
Pushing Innovation (SPIN) program and this material is based upon work
supported by the National Science Foundation under Grant No. DMR-1555153."

For a fully functioning experience, you mobile browser version must match at least one of the following criteria.    
Feature	 		Android	Firefox IE Phone	Opera 	Safari  Chrome
Basic support	3.0		3.6		No support	12		4.2		50

Molecules Visualizer----(2016 Summer Spin Project)

This is my summer project in the National Center for Supercomputing Applications as a SPIN program intern.
This molecules rendering page is based on the source code(named as originalRenderPage in the root directory)provided by Nicole Adelstein (nadelstein@gmail.com) and Andre Schleife (schleife@illinois.edu).

This project is intended to be a fully working website that has a fully functional backend to store various vesta data files. The front end should be intuitive and allows the user to see different visualized atomic structures in a stereoscopic view via google cardboard.

Current feature:

Support dynamic parsing of vesta and xyz files to generate a stereoscopic view of molecules.
Support the conventional CPK chemistry coloring of atoms.
Support realistic atom proportions by using covalent radius of atoms.
Support background audio explanation.
Support Ball and Stick style atomic sturecture view. 

Will incorporate(by May 31):
A fully functional front end and backend skeleton code by using MEAN stack web development tools.
Functionalities to generate different atomic structure views such as Space-filling, Polyhedral, WireFrame and Stick views.

--------------------------------------Updated in June 15------------------------------------------------------------

Have a fully functional website supported by MEAN stack web development tools now. 
The website is currently running on a free server on digital ocean provided by amazon student package. 

Upload page and rendering page significantly changed.

Added feature:

Support both ball-stick and Polyhedron mode of molecules structure viewing
Support User signup and login.
Support vesta and xyz files uploading to backend (Only logged in user are allowed to upload)

--------------------------------------Updated in June 27------------------------------------------------------------

Molecules grid are now dynamically generated according to the files in the backend, meaning when a new molecule is uploaded(should include both vesta and xyz files), a new grid will show up in the visualization page.

Added a Homepage button to rendering page.
Added a wireframe to the polyhedron mode in order to further distinguish the different faces of polyhedron
Make the polyhedron faces have the same color with central atom.

Rendering option for a single molecules now include 1. auto-spinning or head-tracking, 2. audio explanation on or off, 3. polyhedron mode on or off. 

--------------------------------------Updated in July 05------------------------------------------------------------

Device orientation control is considered deprecated on insecure origins....probably need to switch this web app to https protocol. 
https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins

--------------------------------------Updated in July 17------------------------------------------------------------

Added routes.js and controllers.js to enable audio playing when rendering molecules
Support audio upload now, should be able to filter uploaded files according to files uploaded.

--------------------------------------Updated in August 03------------------------------------------------------------

Support Head Tracking mode, again, head tracking is considered deprecated on insecure origins.
Support switching bewtweeen different molecules by rotating the mobile phone.
Upgrade the total logic and structure of handling the molecule files reading and rendering. 

--------------------------------------Updated in August 12------------------------------------------------------------

Support Group selection in molecule rendering page. Now molecules switching will only happen among those selected. 


--------------------------------------Updated in August 18------------------------------------------------------------

Structures break down(For future maintenance and update): 
I am using Mean stack to build this website, Mongo db, express.js, and node.js is required to run this project.
The easiest way to guarantee the same environment, run sh install.sh in the server machine. 

1.Clone the repository - git clone git@github.com:Randolph-zeng/MS-SPIN-PROJECT.git

2.Install all the required tools. - sh install.sh

3.Install local packages - type 'npm install' under the MS-SPIN-Project folder(where the package.json is)  

4.Detach a screen to run the server. - type 'screen'

5.Run the server - type 'node server.js' under the MS-SPIN-Project folder(where the server.js is) and then type ctrl a and then ctrl d. The terminal should display screen detached. 

Side notice: When used in outreach event, take out the signup link in frontend/public/index.html around line 76.

Most backend configurations are under the MS-SPIN-Project folder:

In app folder, I defined the User schema, which is combined with "passport"(3rd party lib) to support user login and authentication. The authentication code is written in config/passport.js. Routes.js in app folder is where I defined all the routes. Some of them require the user to be loggedin in order to use it. Multer is used there to facilitate uploadind and filtering.   

Frontend folder includes everything regarding to front end:
source_js and source_sass folder are used to store all the js files and sass files. If you run grunt under the frontend folder, sass files will be compiled and written into the public/css/styles.css, js files in source_js folder will be uglified and written into public/js. Therefore, DO NOT do any modification directly in js and css folder in public folder, they will be OVERWRITTEN once you run grunt!

Controllers.js defines the controlling logic for home page and render page. Script.js includes all rendering code using three.js.
Note since I need to use a backend library to support polyhedron mode drawing, script.js is actually a combination of rendering code and a backend library(I used browserify to generate this file). The webgl part of code starts from 2rd line to line 597. I will recommend read through this file before adding new features. 
