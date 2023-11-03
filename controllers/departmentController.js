const DepartmentModel = require("../models/departmentModel");

class DepartmentController {
  async deleteDepartment(req, res) {
    try {
      const deparmentData = req.body;
      if (!("departmentId" in deparmentData)) {
        return res.status(400).json({
          message: "departmentId is missing in the request body",
        });
      }

      let result = await DepartmentModel.deleteDepartment(
        deparmentData.departmentId
      );

      return res.status(200).json({
        status: true,
        message: "Department deleted successfully",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Error while deleting department",
        error: error.message,
      });
    }
  }

  async updateDepartment(req, res) {
    try {
      let departmentId = req.params;
      let departmentData = req.body;

      let result = await DepartmentModel.updateDepartment(
        departmentId,
        departmentData
      );

      return res.status(201).json({
        success: true,
        message: "Department data updated successfully",
        user: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Could not update department data",
        error: error.message,
      });
    }
  }

  async createDepartment(req, res) {
    try {
      const userId = req.user.userID;

      // Check if userId is valid and continue with department creation
      if (userId) {
        // Your code to create a department
        const deparmentData = req.body;
        deparmentData.isActive = 1;
        const result = await DepartmentModel.insertDepartment(deparmentData);

        return res.status(201).json({
          success: true,
          message: "Department created successfully",
          department: result,
        });
      } else {
        return res
          .status(401)
          .json({ message: "Access denied. User not authenticated." });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Could not create department",
        error: error.message,
      });
    }
  }

  async getAllDepartments(req, res) {
    try {
      const departments = await DepartmentModel.getAllDepartments();
      return res.status(201).json(departments);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching departments" });
    }
  }

  async getDepartmentById(req, res) {
    // Here given variable departmentId should be same as the given in URL
    const { departmentId } = req.params;
    try {
      const department = await DepartmentModel.getDepartmentById(departmentId);
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }
      return res.status(201).json(department);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching departments" });
    }
  }
}

module.exports = new DepartmentController();
