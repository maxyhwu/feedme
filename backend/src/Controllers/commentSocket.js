// import { pool } from "../Clients/pool";
// import dotenv from "dotenv-defaults";
// import http from "http";
// import socketIO from "socket.io";
// dotenv.config();

// // Connect to the PostgreSQL database
// pool.connect();

// // Create an HTTP server
// const server = http.createServer();

// // Create a Socket.IO instance
// const io = socketIO(server);

// // Handle client connections
// io.on('connection', (socket) => {
//   console.log('A client connected');

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// // Listen for PostgreSQL notifications on comment changes for each recipe
// const fetchRecipesFromDatabase = async() => {
//     const query = `SELECT * FROM "public"."Recipes"`;
//     const result = await pool.query(query);
// };

// (async () => {
//   const recipes = await fetchRecipesFromDatabase(); // Fetch all recipes from the database

//   for (const recipe of recipes) {
//     const channel = `comment_change_recipe_${recipe.id}`;

//     await pool.query(`LISTEN ${channel}`);

//     pool.on('notification', (notification) => {
//       const payload = JSON.parse(notification.payload);

//       // Emit the comment change event to connected clients interested in the recipe
//       io.to(channel).emit('commentChange', payload);
//     });
//   }
// })();

// // Start the server
// const port = 3001;
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
