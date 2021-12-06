/* 
Link shortener, Taylor Lee
From the Hack Club Workshop
*/

//Importing modules
const express = require('express');
const database = require("@replit/database")
const path = require('path');

//Accessing module database -> db will initalize database
const db = new database()
const app = express();
app.use(express.urlencoded({ extended: true })); 

app.listen(3000, () => {
  // console.log('server started');
});

//Create new link function

app.post('/link', (req, res) => {

  let key = '' + req.body.key;
  let value = '' + req.body.value;
  
  //set will add/replace a key value, get will get the key value
  db.set(key, value).then(() => {
    //app.get() force a GET request on the end user network
    //the user will POST data to the function
    db.get(key).then(link => {
      res.send(path.join(__dirname + '/' + key))
    });
  });

});

//after POST  data, the app gets the data sent from the new.html 
app.get('/new', (req, res) => {
  res.sendFile(path.join(__dirname + '/new.html'));
});

//app redirects to the link shortener or else it sends it to 404 status
app.get('/*', (req, res) => {

  let key = "" + req.originalUrl
  key = key.substring(1);

  db.get(key).then(link => {
    if (link != null){
      res.redirect(link)
    }
    else {
      res.sendStatus(404)
    }
  });

});