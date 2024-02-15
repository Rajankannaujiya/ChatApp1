import express, { Router } from 'express';
import Users from '../Schema/Users.js';
import passport from 'passport';
// import requireAuthentication from './RequireAuth.js';
import ensureAuthenticated from './ensureAuthentication.js'
import cons from 'consolidate';
import chatSchema from '../Schema/chatSchema.js';
import Message from '../Schema/Message.js'
import mongoose from 'mongoose';
import group from '../Schema/group.js';
import { ObjectId } from 'mongoose';
const chatRouter=express.Router()


chatRouter.get("/userwithChat", async (req, res) => {
  try {
    // Assuming userId is passed as a query parameter
    const userId = req.body.userId;

    const senders = await chatSchema.distinct('participants');

    // Convert sender objects to user IDs
    const senderUserIds = senders.map(sender => sender._id);

    // Find users who have sent at least one message
    const usersWithMessages = await Users.find({ _id:{ $in: senderUserIds } });

    // Return users with messages as JSON response
    return res.json(usersWithMessages);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

chatRouter.get("/allUser", async (req, res) => {
  try {
    const users = await Users.find();

    // Check if users exist
    if (users && users.length > 0) {
      return res.json(users);
    } else {
      return res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});


chatRouter.get("/allTheGroups",async(req,res)=>{
  try {
    const groups = await group.find();

    // Check if users exist
    if (groups && groups.length > 0) {
      return res.json(groups);
    } else {
      return res.status(404).json({ message: 'No group found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
})

chatRouter.get('/messages/:chatId', ensureAuthenticated, async (req, res) => {
  try {
      const { chatId ,userId} = req.params;
      // it may be change with the lower commented line
      // const userId = req.user._id; // Access user ID from middleware
      console.log(chatId);


      // Find the chat based on the provided chatId and user ID
      if (!mongoose.isValidObjectId(chatId)) {
        return res.status(400).json({ error: 'Invalid chatId' });
    }


      const chat = await chatSchema.findOne({ _id: chatId, participants: userId }).populate('messages');
      console.log(chat);

      if (!chat) {
          return res.status(404).json({ error: 'Chat not found' });
      }

      res.status(200).json({ messages: chat.messages });
  } catch (error) {
      console.error(error);
  }
})

chatRouter.post('/messages', ensureAuthenticated, async (req, res) => {
  try {
      // Extract necessary data from request body
      const { reciever,content, chatId ,isgroup} = req.body;
      const userId = req.user._id;

      // Create a new message
      const message = new Message({
          content,
          reciever,
          sender: userId,
          isgroup
      });

      // Save the message to the database
      await message.save();

      // Update the chat schema to include the message
      const chat = await chatSchema.findById(chatId);
      if (!chat) {
          return res.status(404).json({ error: 'Chat not found' });
      }

      chat.messages.push(message._id);
      await chat.save();

      // Send the created message as response
      res.status(201).json({ message });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Route handler for createOrRetrieveChat
chatRouter.post('/createOrRetrieveChat',ensureAuthenticated,  async (req, res) => {
  try {
    // Check if req.user exists and contains the necessary properties
    if (!req.user || !req.user._id) {
      console.log("User details not found in request or user not authenticated");
      return res.status(400).json({ error: 'User details not found in request or user not authenticated' });
    }

    const userId = req.user._id;

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

// fetching all the chats
chatRouter.get("/fetchChats",  async (req, res) => {
  try {
    const userId = "65ae329bd348dd99252a8654";

    const chats = await chatSchema.find({
      participants: userId
    })
    .populate({
      path: 'participants',
      model: 'Users', // Model name should match the imported model name
      select: '-password'
    })
    .populate({
      path: 'isgroupAdmin',
      model: 'Users', // Model name should match the imported model name
      select: '-password'
    })
    .populate('messages')
    .sort({ updatedAt: -1 });

    // Populate message sender details
    for (let chat of chats) {
      await chat.populate({
        path: 'messages.sender',
        model: 'Users', // Model name should match the imported model name
        select: 'name email'
      });
    }

    res.status(200).json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

chatRouter.get("/getGroups", ensureAuthenticated, async (req, res) => {
  const { name,userId } = req.query; // Assuming name is sent as a query parameter
  console.log(req.body);
  try {
    const existingGroup = await group.findOne({ name }); // Corrected to use findOne() with a query object
    if (existingGroup) {
      console.log("Group already exists");
      return res.send(existingGroup);
    } else {
      console.log("Group not found");
      return res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

chatRouter.post('/createGroup', ensureAuthenticated, async (req, res) => {
  const { name, users } = req.body;
  const userId = req.user._id;

  try {
    if (!name || !userId || !users || (Array.isArray(users) && users.length < 2)) {
      return res.status(400).json({ message: "Please provide group name, content, and at least two users" });
    }

    // Check if a group with the same name already exists
    const existingGroup = await group.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({ message: 'Group with this name already exists' });
    }

    // Convert users to an array if it's not already
    const userIds = JSON.parse(users) 


    // Create a new group
    const newgroup = new group({
      name,
      admin: userId,
      members: [userId,...userIds]
    });

    const savedGroup = await newgroup.save();

    // Create a new chat schema for the group
    const chat = await chatSchema.create({
      participants: userIds,
      group: true,
      isgroupAdmin: userId // Assuming isgroupAdmin should be the ObjectId of the group admin
    });

    // Populate participants and isgroupAdmin fields
    const fullChat = await chatSchema.findById({_id:chat._id})
      .populate('participants', '-password')
      .populate("isgroupAdmin", "-password");

    res.status(201).json({ savedGroup, fullChat }); // Return an object with both savedGroup and fullChat
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




chatRouter.post("/createGroupChat", ensureAuthenticated, async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    // You need to await the findOne method as it returns a promise
    const existingGroup = await group.findOne({ _id: groupId });
    
    if (existingGroup) {
      // Since existingGroup is an object, you need to access its members property directly
      const chat = await chatSchema.create({
        participants: existingGroup.members,
        group: true
      });
      const fullChat = await chatSchema.findById({_id:chat._id})
      .populate('participants', '-password')
      .populate("isgroupAdmin", "-password");

      return res.status(201).json({ fullChat }); 
 // Return the created chat
    } else {
      return res.status(404).json({ message: "Group not found" }); // Handle case where group doesn't exist
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ message: "Internal server error" }); // Return an error response
  }
});



chatRouter.patch("/changeGroupName",ensureAuthenticated,async(req,res)=>{
  const { groupId, userId, name } = req.body; // Destructure groupId, userId, and name from the request body

  try {
    // Find the existing group by groupId
    const existingGroup = await group.findById(groupId);

    if (!existingGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if the userId matches the admin of the group
    if (userId.toString() === existingGroup.admin.toString()) {
      // Update the name of the group
      existingGroup.name = name;
      
      // Save the updated group
      const updatedGroup = await existingGroup.save();
      
      // Send the updated group as response
      return res.status(200).json(updatedGroup);
    } else {
      return res.status(403).json({ message: 'You are not authorized to change the group name' });
    }
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


chatRouter.patch("/addMember", async (req, res) => {
  const { groupId, userId, user } = req.body;

  try {
    if (!groupId || !userId || !user) {
      return res.status(400).send("All fields are required");
    }

    // Find the existing group by groupId
    const existingGroup = await group.findById(groupId);

    if (!existingGroup) {
      return res.status(404).send("Group not found");
    }

    // Check if the user making the request is authorized to add a member
    if (existingGroup.admin.toString() !== userId) {
      return res.status(403).send("You are not authorized to add a member to this group");
    }

    // Add the user to the group's members array
    existingGroup.members.push(user);

    // Save the updated group
    await existingGroup.save();

    return res.status(200).send("User has been added to the group");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});


chatRouter.patch("/removeMember", async (req, res) => {
  const { groupId, userId, user } = req.body;

  try {
    if (!groupId || !userId || !user) {
      return res.status(400).send("All fields are required");
    }

    // Find the existing group by groupId
    const existingGroup = await group.findById(groupId);

    if (!existingGroup) {
      return res.status(404).send("Group not found");
    }

    // Check if the user making the request is authorized to add a member
    if (existingGroup.admin.toString() !== userId) {
      return res.status(403).send("You are not authorized to remove a member to this group");
    }

    // Add the user to the group's members array
    existingGroup.members.pull(user)

    // Save the updated group
    await existingGroup.save();

    return res.status(200).send("User has been removed from the group");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

export default chatRouter;
