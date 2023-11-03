const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = require('../config/authConfig'); // Store your JWT secret key in the config file

class UserController {
  async userLogin(req, res){
    try {
      const { email, password } = req.body;

      // Find the user by email in the database
      const user = await UserModel.findUserByEmail(email);
      const passwordFromDb = user.PasswordEncrypted

      // Check if the user exists and compare passwords
      let result  = await bcrypt.compare(password, passwordFromDb);
      if (user && result) {
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user.UserID }, jwtSecret);

        res.json({ message: "Login successful", token, user });
      } else {
        res.status(401).json({ error: "Authentication failed" });
      }

    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  }

  async createUser(req, res) {
    try {
      let userData = req.body; // Assuming user data is in the request body
      // Hash the user's password before storing it
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword
      userData.isActive = 1;

      // Create a new user in the database
      const user = await UserModel.insertUser(userData);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: user,
      });
    } catch (error) {
      console.error("Error inserting user data: " + error);
      res.status(500).json({
        success: false,
        message: "Could not insert user data",
        error: error.message,
      });
    }
  }

  // Note: We can update user data 2 types
  //   1. Pass user id in URL after the end point for e.g. /api/users/updateUser/4
  //   2. Add user id param in body
  async updateUser(req, res) {
    try {
      let requestBody = req.body;

      // Check if 'userId' is present in the request body
      if (!("userId" in requestBody)) {
        return res.status(400).json({
          message: "userId is missing in the request body",
        });
      }
      let userData = requestBody;

      const result = await UserModel.updateUser(userData.userId, userData);
      res.status(201).json({
        success: true,
        message: "User data updated successfully",
        user: result,
      });
    } catch (error) {
      console.error("Error inserting user data: " + error);
      res.status(500).json({
        success: false,
        message: "Could not update user data",
        error: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const requestBody = req.body;
      // Check if 'userId' is present in the request body
      if (!("userId" in requestBody)) {
        return res.status(400).json({
          message: "userId is missing in the request body",
        });
      }

      const userId = requestBody.userId;
      const result = await UserModel.deleteUser(userId);

      res.status(201).json({
        success: true,
        message: "User deleted successfully",
        user: result,
      });
    } catch (error) {
      return res.status(500).json({ error: "Error while deleting user" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching users" });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  }
}

module.exports = new UserController();
