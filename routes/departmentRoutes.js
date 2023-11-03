const express = require("express");
const DepartmentController = require("../controllers/departmentController");

const router = express.Router();

router.get("/", DepartmentController.getAllDepartments);
router.get("/:departmentId", DepartmentController.getDepartmentById);
router.post("/createDepartment", DepartmentController.createDepartment);
router.put("/updateDepartment", DepartmentController.updateDepartment);
router.delete("/deleteDepartment", DepartmentController.deleteDepartment);

module.exports = router;
