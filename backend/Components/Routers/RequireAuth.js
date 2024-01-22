// needed to work on

const requireAuthentication = (req, res, next) => {
    if (req.session.userId) {
      // User is logged in, allow them to proceed to the route
      next();
    } else {
      // User is not logged in, redirect to login page or send an error response
      res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
  };
  
  module.exports = requireAuthentication;
  