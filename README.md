#### Catering business

* I tried to use the generated GitHub Classroom repo that was generated from the exam text ( https://classroom.github.com/a/qa5zyqOy ).
* But it did not work. After trying multiple times to connect to it either by creating from GitHub repos or adding it from a new project, it did not work.
* It kept telling me that the repo does not exist. So i made my own repo for this exam.
* I have also chosen to run React 17 for this project.

* Link: https://github.com/TobiasLiu1990/pg6301-fall2022-Exam-TobiasLiu1990


To start:
* From root: npm install. Should install node_modules for everything: root, client, server folders.
* From root: npm run dev - to start client and server.

* Catering app, odd pizzas.
  * On startup, you have to login or register a new account. Then you can view the menu.
    * After logging in, your name and username will show at the top of the screen.
    * You can also log out from here.
    * Admin users can also add a dish.
    * Regular users cant access add dish page. They will see it being restricted. Going to /menu/new will also show nothing.
    
  * I did not manage to get information from database when it comes to the users (for logging in)
    * But it is possible to post to MongoDB successfully.
    * So unfortunately I had to hardcode an admin user and a regular user in server.js.
    
  * Posting new dishes from admin user (account with role: "admin") to MongoDB works. It will appear on the menu.
  
  * Every page has a back button.

  * Unfortunately for the tests, I did not get them all of them to work as I wanted. To prevent some error messages I couldn't
    figure out, I had to make an exact copy of the component (which i renamed to ...ForTest) to pass and fun a mock function on.

  * GitHub Actions runs and shows a coverage report.


* I have managed to get the POST to work correctly for adding a dish and a user to the database.
* But for users, i havent successfully gotten the information from database to use in the app.


Frontend files are located in /client.
Backend files are located in /server

