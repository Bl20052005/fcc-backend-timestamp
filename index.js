// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  if(!date) {
    res.json({unix: Date.now().getTime(), utc: Date.now().toUTCString()})
  }
  let converted_date;
  if(date.match(/^[0-9]+$/g)) converted_date = new Date(parseInt(date))
  else converted_date = new Date(date);
  const converted_unix = converted_date.getTime();
  const converted_utc = converted_date.toUTCString();
  if(isNaN(converted_unix)) res.json({ error : "Invalid Date" })
  else res.json({unix: converted_unix, utc: converted_utc})
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
