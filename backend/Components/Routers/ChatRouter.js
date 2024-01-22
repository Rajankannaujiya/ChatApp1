import express from 'express';
import Users from '../Schema/Users';
import requireAuthentication from './RequireAuth';

const chatRouter = express.Router();

chatRouter.get('/chats/:userId', requireAuthentication (async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await Users.findById(userId).populate('participants');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ chats: user.chats });
    } catch (error) {
      console.error('Error fetching user chats:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }));

  export default chatRouter;
  