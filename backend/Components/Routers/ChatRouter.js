import express, { Router } from 'express';
import Users from '../Schema/Users.js';
import passport from 'passport';
// import requireAuthentication from './RequireAuth.js';
import ensureAuthenticated from './ensureAuthentication.js'
import cons from 'consolidate';
import chatSchema from '../Schema/chatSchema.js';
import Message from '../Schema/Message.js'
import mongoose from 'mongoose';
import ensurelogin from 'connect-ensure-login';

const chatRouter=express.Router()

// const ensureAuthenticate = passport.authenticate('local', { session: false });

// Route handler for createOrRetrieveChat
chatRouter.post('/createOrRetrieveChat', ensureAuthenticated, async (req, res) => {
  try {
    // Check if req.user exists and contains the necessary properties
    if (!req.user || !req.user._id) {
      console.log("User details not found in request or user not authenticated");
      return res.status(400).json({ error: 'User details not found in request or user not authenticated' });
    }

    const userId = req.user._id; // Extract userId from authenticated user object

    // Find the chat based on participants
    const isChat = await chatSchema.findOne({
      group: false,
      participants: { $all: [req.user._id, userId] },
    })
    .populate('participants', '-password')
    .populate('messages', '-password');

    if (isChat) {
      // If the chat exists, return it
      return res.status(200).json(isChat);
    }

    // If the chat doesn't exist, create a new one
    const chatData = {
      participants: [req.user._id, userId],
      group: false,
    };

    const newChat = await chatSchema.create(chatData);
    const fullChat = await chatSchema.findById(newChat._id).populate('participants', '-password');

    res.status(201).json(fullChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default chatRouter;
