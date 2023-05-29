// client

// Import the Socket.IO client library
import { io } from 'socket.io-client';

// Connect to the Socket.IO server
// const socket = io('http://localhost:3001'); // Replace with your server's URL

// // Listen for the "commentChange" event
// socket.on('commentChange', (comment) => {
//   // Handle the updated comment data
//   console.log('Comment changed:', comment);
//   // Update the UI or perform any other necessary actions
// });
var socket;
export const initiateSocket = (room) => {
  console.log(`Connecting socket...`);
  // socket = io(`ws://localhost:3001`, { transports : ['websocket'] });
  //socket = io(`wss://feedme.company:443`,{transports: ['websocket']});
  //socket = io(`wss://feedme.company:443`);
  
  socket = io("https://feedme.company:8000", {
  // socket = io("http://localhost:8000", {
    extraHeaders: {
      "my-header": "1234"
    }
  });
  console.log(`Socket Connected`);
  if (socket && room) socket.emit('join', room);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
  if (!socket) return(true);
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
}

export const socketAddLikecnt = (room) => {
  if (socket) socket.emit('addlikecnt', { room });
}

export const subscribeToAddLikeCnt = (cb) => {
  if (!socket) return(true);
  socket.on('addlikecnt', () => {
    console.log('Websocket event received!');
    return cb(null);
  });
}

export const socketMinusLikecnt = (room) => {
  if (socket) socket.emit('minuslikecnt', { room });
}

export const subscribeToMinusLikeCnt = (cb) => {
  if (!socket) return(true);
  socket.on('minuslikecnt', () => {
    console.log('Websocket event received!');
    return cb(null);
  });
}
