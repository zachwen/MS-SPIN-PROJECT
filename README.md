Molecules Visualizer----(2016 Summer Spin Project)
This is my summer project in the National Center for Supercomputing Applications as a SPIN program intern.
This molecules rendering page is based on the source code provided by Nicole Adelstein (nadelstein@gmail.com) and Andre Schleife (schleife@illinois.edu).

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
