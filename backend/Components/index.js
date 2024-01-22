
import 'dotenv/config';
import express from "express";
import cors from "cors";
import multer from "multer";
import Users from './Schema/Users.js';
// import dirname from "path";
import mongoose from 'mongoose';
import chat from './Schema/chatSchema.js'
import bodyParser from "body-parser";
import Router from "./Routers/Authentication.js";
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { Strategy as LocalStrategy } from 'passport-local';
import cons from "consolidate";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import env from 'dotenv';

var upload=multer();
env.config()
 

const fileName=fileURLToPath(import.meta.url);

const __dirname=path.dirname(fileName);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Use dotenv to load environment variables
env.config();

// Connect to MongoDB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/IndividualChat');
}

// Middleware
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
})
);

app.use(passport.initialize());
app.use(passport.session());

var User = mongoose.model('Users');
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


// Routes
app.use("/users", Router);

app.use("",Router)
const port = process.env.PORT || 5000;
app.listen(port, 'localhost', () => {
  console.log(`Server is running on port http://localhost:${port}`);
});