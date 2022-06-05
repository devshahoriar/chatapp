import Express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/user.js';
import messageRoute from './router/messageRoute.js';
import convarsionRoute from './router/convarsionRoute.js';
import {Server} from 'socket.io'
import http from 'http'



const app = Express();
const server = http.createServer(app);
dotenv.config();
app.use(cors());
app.use(Express.json());

app.all('/', (req, res) => {
  res.send('Shuvo');
});
app.use(userRouter)
app.use(messageRoute)
app.use(convarsionRoute)

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('Db connected');
  server.listen(process.env.PORT, () => {
    console.log('server started on 5000');
  });
});

const io = new Server(server,{
  cors:{
    origin:"*",
    credentials:true
  }
})

global.onlineUser = new Map();

io.on('connection', (socket) => {

  socket.on('add_user', (deta) => {
    
    
    if(!onlineUser.get(deta.usId)){
      onlineUser.set(deta.usId,deta.socId);
    }else{
      if(onlineUser.get(deta.usId) !== deta.socId){
        onlineUser.delete(deta.usId);
        onlineUser.set(deta.usId,deta.socId);
      }
      console.log(onlineUser);
    }
  });

  socket.on('send_message',(deta)=>{
    if(onlineUser.get(deta.to)){
      io.to(onlineUser.get(deta.to)).emit("rechived", deta)
    }
  });

});

