#### Catering business

* Tried to use the generated GitHub Classroom repo that was generated from the exam text ( https://classroom.github.com/a/qa5zyqOy ).
* But it did not work. After trying multiple times to connect to it either by creating from GitHub repos or adding it from a new project, it did not work.
* It kept telling me that the repo does not exist. So i made my own repo for this exam.
* I have also chosen to run React 17 for this project.

* Link: https://github.com/TobiasLiu1990/pg6301-fall2022-Exam-TobiasLiu1990



To start:
From root: npm install. Should install node_modules for everything: root, client, server folders.

* From root: npm run dev - to start client and server.
    - At the moment - login (ID: admin, PW: admin), is hardcoded in server.js. This is used to login to the page.
    - You need to login to be able to see the menu
    - Otherwise you need to register (have not managed to get mongoDB to return users to login with)
    - After logging in you can see the menu or add a dish (this is sadly open for everyone currently, and not only admin)
  
* I have managed to get the POST to work correctly for adding a dish and a user to the database.
* But for users, i havent successfully gotten the information from database to use in the app.


Frontend files are located in /client.
Backend files are located in /server

