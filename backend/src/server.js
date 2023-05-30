import dotenv from "dotenv-defaults";
dotenv.config();
import db from './Model';
import oauthRoutes from './Routes/oauthRoutes';
import userRoutes from './Routes/userRoutes';
import dataRoutes from './Routes/dataRoutes';
import generalRoutes from './Routes/generalRoutes';
import recipeRoutes from './Routes/recipeRoutes';
import envRoutes from './Routes/envRoutes';
import path from 'path'
// import commentSocket from "./Controllers/commentSocket";

console.log("dotenv = ", process.env.PORT)
const PORT = process.env.PORT || 8000

import express, { json, urlencoded } from "express";
import cors from 'cors';

const app = express();

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(json({limit: '50mb'}))
app.use(urlencoded());

app.use('/api/oauth', oauthRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/user', userRoutes);
app.use('/api/general', generalRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/env', envRoutes);

// db.sequelize.sync({ force: true }).then(() => {    //drop table if exists
//     console.log("db has been sync")
// })

db.sequelize.sync().then(() => {    //drop table if exists
  console.log("db has been sync")
})

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
  console.log(33)
}


// app.use(express.static(path.join(__dirname, "..", "..", "frontend", "build")));
// app.get("/*", (_, res) => {
//   res.sendFile(path.join(__dirname,"..","..", "frontend", "build", "index.html"));
// });

app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
})

// import http from "http";
// import https from "https";
// import { Server } from "socket.io";
// const httpServer = http.createServer(app);
// const httpServer = https.createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     allowedHeaders: ["my-header"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log(`Connected: ${socket.id}`);

//   socket.on('disconnect', () =>
//     console.log(`Disconnected: ${socket.id}`));

//   socket.on('join', (room) => {
//     console.log(`Socket ${socket.id} joining ${room}`);
//     socket.join(room);
//   });

//   socket.on('chat', (data) => {
//     const { message, room } = data;
//     console.log(`msg: ${message}, room: ${room}`);
//     io.to(room).emit('chat', message);
//   });

//   socket.on('addlikecnt', (data) => {
//     const { room } = data;
//     // console.log(`room: ${room}`);
//     io.to(room).emit('addlikecnt');
//   });

//   socket.on('minuslikecnt', (data) => {
//     const { room } = data;
//     // console.log(`room: ${room}`);
//     io.to(room).emit('minuslikecnt');
//   });
// });

// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server Ready at ${PORT}! 🚀`)
// });

// commentSocket();