require('dotenv').config();
const db = require('./Model')
const oauthRoutes = require('./Routes/oauthRoutes')
const userRoutes = require('./Routes/userRoutes')



console.log("dotenv = ", process.env.PORT)
const PORT = process.env.PORT ||8000

const express = require("express");
const app = express();
const cors = require('cors');
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


app.use(express.json())
app.use(express.urlencoded())

app.use('/api/oauth', oauthRoutes)
app.use('api/user', userRoutes)

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
