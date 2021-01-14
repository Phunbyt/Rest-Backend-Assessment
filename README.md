Contact/Address Book (Rest Backend) Concept - Assessment
===

You will be tasked with creating a nodejs based REST application which will serve as a data source for an existing Contact/Address book web and mobile application.
The application will expose two rest resources

* Auth Resource – This will handle endpoints for authentication which will include, login, signup etc
* Contact Resource – This will handle CRUD endpoints for managing a user’s contact list. All endpoints in this resource should only be accessed by an authenticated and authorized user.

The project will persist data to a mongodb database. A local database can be used but do provide instructions for reproducing the database.

What we are testing
--

* Express Project Structure Comprehension
* Rest API Authentication
* Rest API Endpoint Nomenclature
* JavaScript ECMA standards 
* Data Persistence (MongoDB)
* Unit Testing

What you will be given
--

You will be provided with an initial project which will need to be completed. The project contains annotations which will serve as hints which should point you in the right direction when implementing missing endpoints and logic.
The project structure is shown below.

Go through the code to understand the structure before you start.
Note:
The assessment project uses babel to transpile ES6/ES7 to ES5

Get Ready to Run
---

* Pull the assessment repo
    - > `git clone https://gitea.udux.com/backend-assessments/contact.git`
* Pull up your favorite console and change to this directory
* Install the projects dependencies 
    - > `npm install`

Start Development 
---

* To build the project
    - > `npm run build`
* To continuously watch for changes 
    - > `npm run watch`
* To run your app server 
    - > `npm run start`

Submitting
--
Push the repo to your favourite repo platform and share the url.
