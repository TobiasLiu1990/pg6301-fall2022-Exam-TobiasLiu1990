[![.github/workflows/verify.yaml](https://github.com/TobiasLiu1990/pg6301-fall2022-Exam-TobiasLiu1990/actions/workflows/verify.yaml/badge.svg)](https://github.com/TobiasLiu1990/pg6301-fall2022-Exam-TobiasLiu1990/actions/workflows/verify.yaml)
#### Catering business
  - Odd pizzas you won't find anywhere else!

Link: https://github.com/TobiasLiu1990/pg6301-fall2022-Exam-TobiasLiu1990



I could not get the GitHub classroom repo to work when I tried to connect to it. It kept asking for authentication but even after successfully doing so, it gave me an error
saying that the repo did not exist.
So I created my own repo and used it for the exam.
I also chose to run React 17, as it felt easier for me regarding jest. Also, to ignore the React 18 messages.


* To start:
  - Package.json in root should have most scripts that is needed to avoid navigating to /client or /server.
  - The postinstall script works for GitHub Actions.
    But it is needed for GitHub actions to run properly.
  - Prettier is also installed to format code. I decided not to include Husky as I had turned on to auto-format with prettier in Webstorm settings.
  
  
* Structure:
* Root
  * client
    * lib (diverse functions that are used) 
    * __tests__
  * server
    * __tests__


* Catering app, odd pizzas.
  * On startup, you have to login or register a new account. Then you can view the menu.
    * After logging in, your name and username will show at the top of the screen.
    * You can also log out from here.
    * Admin users can also add a dish.
    * Regular users cant access add dish page. They will see it being restricted. Going to /menu/new will also show nothing.
    
  * I did not manage to get information from database when it comes to the users (for logging in)
    * But it is possible to create a new user and post to MongoDB successfully.
      * Currently, one downside is that anyone can do this, which means anyone can assign the role of "admin" or "regular"
    * So unfortunately I had to hardcode an admin user and a regular user in server.js.
    
  * Posting new dishes from admin user (account with role: "admin") to MongoDB works. It will appear on the menu.
  
  * Every page has a back button.

  * Unfortunately for the tests, I did not get them all of them to work as I wanted. To prevent some error messages I couldn't
    figure out, I had to make an exact copy of the component (which i renamed to ...ForTest) to pass and work a mock function on.

  * GitHub Actions runs and shows a coverage report. ( https://github.com/ArtiomTr/jest-coverage-report-action )
    * After successful run they'll appear under Commits.
  * For the server tests. I couldn't figure out how to configure it so GitHub Actions would use environment variables to login.
    So I had to put the url+password in the actual MongoClient (Bad security but at least it's only a test cluster with no important data).
  * I also white-listed all IPs for the cluster in case it would block for checking that everything works later.


  * Tried to deploy to Azure but sadly i cant fix the ":( Application Error". Im not sure if it is because of MongoDB
    * I tried to:
      * Add the Azure IP addresses under Settings - Outbound, to MongoDB.
      * Add environment variables to Azure for connections to the MongoDB URL/PW/Database    