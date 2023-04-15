require('dotenv').config();
const db = require('./Model')



console.log("dotenv = ", process.env.PORT)
const PORT = process.env.PORT ||8000

const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.json())
app.use(express.urlencoded())

db.sequelize.sync().then(() => {    //drop table if exists
    console.log("db has been sync")
})


app.listen(PORT, function(err){ 
  if (err) console.log("Error in server setup") 
  console.log("Server listening on Port", PORT); 
})

// const httpServer = http.createServer(app);
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server Ready at ${PORT}! 🚀`)
// });
