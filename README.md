[![Build Status]]

# Mongoose Express Nodejs Developer Challenge

This application uses node.js, express and Mongoose to connect to a MongoDB database that contains movie titles. The application allows a user to search for titles by name. If a partial name is supplied, it will return a list of all matching movie titles. 

If user does not provide a title and clicks "Search", then all titles will be returned. 

If user selects an item from the list, its movie details shall be displayed.

## Install

**NOTE:** You need to have node.js and mongodb installed and running.

```sh
  $ git clone git://github.com/frafi/mongoose-express-node.git
  $ npm install
  $ npm start
```

Then visit [http://localhost:3000/](http://localhost:3000/)

## Directory structure
```
-app/
  |__controllers/
  |__models/
  |__mailer/
  |__views/
-config/
  |__routes.js
  |__config.js
  |__express.js (express.js configs)
-public/
```

## Tests

```sh
$ npm test
```


