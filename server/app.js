const express = require("express");
const cors = require("cors")


const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json())





// api/users: GET
//api/users/:id : GET
// api/users/ : POST
// api/users/:id :PATCH
// api/users/:id : DELETE





app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})


// route not found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'route not found'
  })
})

// server error handling 
app.use((err, req, res, next) => {
  res.status(5000).json({
    message: 'Something Broken'
  })
})

module.exports = app;