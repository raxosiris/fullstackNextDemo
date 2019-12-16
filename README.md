## INTRO

This is a demo full-stack server running on [nextJS]("https://nextjs.org")

The backend is written using [nextJS's api routes]("https://nextjs.org/docs#api-routes"). You will find the api routes under /pages/api/users/

The basic routes are:
getUsers - fetches the list of users
updateUsers - updates the user data
createUser - creates a user
deleteUsers - deletes a user

To persist the data, the backend interacts with MongoDB, the host for which can be specified in the env file (see below)


## SETUP

*Requirements*
* NodeJS >9
* MongoDB instance
* NPM
  
*Configuration*
* Configure your mongodb instance in the .env file
* To quickly run a mongo instance run the following command in your shell (you'll need docker)
 `docker run --name some-mongo -d -p 27017:27017 mongo`
* Install the dependencies with `yarn install`
* Run the dev server with `yarn dev`

You should now have a running instance on localhost:3000

Huzzah.


## License
This is a project for demo purpose only. It is fully open-source and ships with an MIT license.

For feedback and enquiries, please write to developer@aviscous.com

