// server/controllers/userController.js
exports.getDashboard = async (req, res) => {
    res.json({ message: `Welcome ${req.user.name} to your dashboard` });
  };
  
  // Other user-related controllers
  