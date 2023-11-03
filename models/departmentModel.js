const db = require("../config/database");

class DepartmentModel {
  insertDepartment(departmentData) {
    return new Promise((resolve, reject) => {
      // Insert user data into the User table
      const query =
        "INSERT INTO Department (Name, Description, IsActive) " +
        "VALUES (?, ?, ?)";

      const values = [
        departmentData.name,
        departmentData.description,
        departmentData.isActive,
      ];

      db.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  getAllDepartments() {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM Department";

      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  getDepartmentById(departmentId) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM department WHERE departmentId = ?";
      db.query(query, [departmentId], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  updateDepartment(departmentId, departmentData) {
    return new Promise((resolve, reject) => {
      const setStatements = [];
      const values = [];

      // Loop through the properties in the updatedUser object
      for (const key in departmentData) {
        // Map the JSON properties to their corresponding database fields
        switch (key) {
          case "name":
            setStatements.push("Name = ?");
            break;
          case "description":
            setStatements.push("Description = ?");
            break;
          case "isActive":
            setStatements.push("IsActive = ?");
            break;
          default:
            // Handle any other properties you might have
            break;
        }

        // Add the property value to the values array
        values.push(departmentData[key]);
      }

      // Construct the SQL query
      const query =
        "UPDATE Department SET " +
        setStatements.join(", ") +
        " WHERE DepartmentID = " +
        departmentId;

      db.query(query, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      });
    });
  }

  deleteDepartment(departmentId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Department WHERE DepartmentID = ?";
      db.query(query, [departmentId], (err, results) => {
        if (err) {
          return reject(err);
        }

        if (results.affectedRows === 0) {
          reject({ error: "Department not found" });
        }

        return resolve(results);
      });
    });
  }
}

module.exports = new DepartmentModel();
