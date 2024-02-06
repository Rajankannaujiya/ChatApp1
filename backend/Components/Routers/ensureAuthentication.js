import cons from "consolidate";
import Users from "../Schema/Users.js";
import passport from "passport";

const ensureAuthenticated = async (req, res, next) => {
  // Extract the user ID from the request
  const userId = req.body.userId; // Assuming userId is passed in the request body
  
  try {
    // Check if userId is present
    if (!userId) {
      return res.status(400).json({ error: 'User ID not provided in the request' });
    }

    // Find the user by ID
    const foundUser = await Users.findById(userId);
    
    if (!foundUser) {
      // If user not found, return unauthorized
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the found user object to the request
    req.user = foundUser;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



export default ensureAuthenticated;

