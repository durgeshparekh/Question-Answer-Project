const db = require("../config/database");

class UserModel {
  getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user", (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user WHERE userId = ?", [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      });
    });
  }

  // Add more methods to interact with the database
  // Insert a new user into the database
  async insertUser(userData) {
    return new Promise((resolve, reject) => {
      // Insert user data into the User table

      const query =
        "INSERT INTO User (FirstName, LastName, Email, PhoneNumber, PasswordEncrypted, isEmployee, isActive) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?)";

      const values = [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.phone,
        userData.password,
        userData.isEmployee,
        userData.isActive,
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

  updateUser(userId, userData) {
    return new Promise((resolve, reject) => {
      const setStatements = [];
      const values = [];

      // Loop through the properties in the updatedUser object
      for (const key in userData) {
        // Map the JSON properties to their corresponding database fields
        switch (key) {
          case "firstName":
            setStatements.push("FirstName = ?");
            break;
          case "lastName":
            setStatements.push("LastName = ?");
            break;
          case "email":
            setStatements.push("Email = ?");
            break;
          case "phone":
            setStatements.push("PhoneNumber = ?");
            break;
          case "password":
            setStatements.push("PasswordEncrypted = ?");
            break;
          case "isEmployee":
            setStatements.push("isEmployee = ?");
            break;
          default:
            // Handle any other properties you might have
            break;
        }

        // Add the property value to the values array
        values.push(userData[key]);
      }

      // Construct the SQL query
      const query =
        "UPDATE User SET " +
        setStatements.join(", ") +
        " WHERE UserID = " +
        userId;

      db.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM User WHERE UserID = ?";

      db.query(sql, [userId], (err, result) => {
        if (err) {
          console.error("Error deleting user:", err);
          reject(err);
        }

        if (result.affectedRows === 0) {
          reject({ error: "User not found" });
        }

        resolve(result);
      });
    });
  }

  findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results[0]);
        }
      );
    });
  }
}

module.exports = new UserModel();
