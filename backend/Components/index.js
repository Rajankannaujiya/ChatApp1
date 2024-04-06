
import 'dotenv/config';
import express from "express";
import cors from "cors";
import multer from "multer";
import Users from './Schema/Users.js';
// import dirname from "path";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import Router from "./Routers/Authentication.js";
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// import cons from "consolidate";
import { fileURLToPath, pathToFileURL } from "url";
import path, { dirname } from "path";
import env from 'dotenv';
import chatRouter from './Routers/ChatRouter.js';
import http from 'http'
import { Server as SocketIOServer } from 'socket.io';
import createMemoryStore from "memorystore";

var upload = multer();
env.config()

const fileName = fileURLToPath(import.meta.url);

const __dirname = path.dirname(fileName);

const app = express();
const server = http.createServer(app); // Create an HTTP server
const MemoryStore = createMemoryStore(session);
const store = new MemoryStore({
  checkPeriod: 60000
});


app.use(bodyParser.urlencoded({ extended: true }));


// Connect to MongoDB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/IndividualChat');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

app.use(session({
  cookie: {
    maxAge: 60000,
  },
  store: store,
  secret: process.env.SESSION_SECRET || 'your_secret_here',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

var User = mongoose.model('Users');
passport.use(new LocalStrategy(Users.authenticate()));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error('Error in deserializeUser:', err);
    done(err, null);
  }
});




app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use("/users", Router);
app.use("/", chatRouter)

app.use("", Router)

// ----------------DEPLOYMENT-------------------

const __dirname1 = path.resolve();
console.log("this is dir1",__dirname1)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, "../../frontend/my-app/build")))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1,"..","..","frontend","my-app", "build", "index.html"))
  })
}
else {
  app.get("/", (req, res) => {
    res.send("Api running successfully");
  })
}

// ----------------DEPLOYMENT-------------------

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

const io = new SocketIOServer(server, {
  pingTimeout: 6000,
  cors: {
    origin: "*"
  },
});


io.on("connect", (socket) => {

  socket.on("setup", (userData) => {
    socket.join(userData.user._id);
    socket.emit("connected");
  })

  socket.on("join chat", (room) => {
    socket.join(room);
  })

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });


  socket.on("connect_error", (err) => {
    console.log("error", err);
  });
  // Handle socket events here

  socket.off("setup", (userData) => {
   console.log("user is disconnected")
   socket.leave(userData.user._id);
  });
});