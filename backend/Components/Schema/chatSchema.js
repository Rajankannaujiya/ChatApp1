import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
  messages: [messageSchema],
  group: { type: Boolean, default: false } // Indicates whether it's a group chat or not
});


// Example group chat

export default mongoose.model('Chat', chatSchema);


