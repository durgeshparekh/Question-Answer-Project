const express = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", authMiddleware, UserController.getUserById);
router.post("/createUser", UserController.createUser);
router.put("/updateUser", UserController.updateUser);
router.delete("/deleteUser", UserController.deleteUser);

module.exports = router;
