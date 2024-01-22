import express, { response } from "express";
import mongoose from 'mongoose'
// import expresHandler from "express-async-handler"
import session from 'express-session';
import Users from "../Schema/Users.js";
import passport from 'passport'
import passportLocalMongoose from 'passport-local-mongoose';
import cons from "consolidate";
import { Strategy as LocalStrategy } from 'passport-local';


const Router = express.Router();

passport.serializeUser((user,done)=>{
    done(null,user.id);
  });
  passport.deserializeUser((user, done)=> {
    const fetchUser=(id)=>Users.findById(id);
    fetchUser(id).then((user)=>{
        return done(null,user);
    })
  });


Router.get("/", async (req, res) => {
    res.send("hii its connected");
})

Router.get("/user", async (req, res) => {

    Users.find().then(users => res.json(users))
        .catch(err => res.json(err))


    // res.send("hii")
})

Router.get("/fetchAllUsers", async (req, res) => {
    const keyword = req.query.search ? {
        // console.log(keyword)
        $or: [{ userName: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } }],
    } : {};


    const users = await Users.find(keyword)
        .find({
            _id: { $ne: req.user_id },
        })
    res.send(users)
})


Router.get("/signUp", async (req, res) => {
    res.send("its the signUp")
})

Router.get("/chat", async (req, res) => {

})


Router.post("/register",function(req, res) {
    const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
        return res.status(401).send('Passwords do not match');
    }
    var user = {
        username: username,
        email:email,
    };
    Users.register(new Users(user), req.body.password, function(err, user) {
        if (err) {
            return res.status(401).send("register", {info: "Sorry. That username already exists. Try again."});
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.status(200).send("successful registration")
            })
        }
      
    });
});


Router.post("/login", (req, res) => {
    const {username, email, password } = req.body;

    if (!username||!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    const user = new Users({
        username:username,
        email: email,
        password: password
    });
    console.log(user)

    req.login(user, function (err,next) {
        if (err) {
            console.error(err);
            next(err);
            return res.status(500).send({ message: "Internal server error" });
        }

        passport.authenticate("local")(req, res, function () {
            res.status(200).send({ message: "Successful login" });
        });
    });
});




export default Router;