import express from "express";
import mysql from "mysql"
import bcrypt from "bcrypt"

const salt = 10;

 const router = express.Router()
 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chedrmis",
  });


//first line sa admin:addaccount(users)

//CREATE
router.post("/addUser", (req, res) => {
    const {
      userID,
      userType,
      email,
      password,
      lastName,
      firstName,
      contactNumber,
      userName,
    } = req.body;
  
    // Check if the email already exists in the database
    const checkEmailSql = "SELECT COUNT(*) AS emailCount FROM user WHERE email = ?";
  
    db.query(checkEmailSql, [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Status: "Error" });
      }
  
      // Check if an entry with the same email already exists
      if (result[0].emailCount > 0) {
        return res.json({ Status: "Email already exists" });
      } else {
        
        // Hash the password
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.error(err);
            return res.json({ Status: "Error", Message: "Error hashing password" });
          }
  
          // Convert the hashed password to a string
          const hashedPasswordString = hash.toString();
  
  
          // Insert the new user if the email is unique
          const insertSql =
            "INSERT INTO user (user_id, user_type_ID, email, password, last_name, first_name, contact_number, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
          db.query(
            insertSql,
            [userID, userType, email, hashedPasswordString, lastName, firstName, contactNumber, userName],
            (err, result) => {
              if (err) {
                console.error(err);
                return res.json({ Status: "Error", Message: "Error adding account to the database" });
              }
  
              return res.json({ Status: "Success", Message: "Account added to the database" });
            }
          );
        });
      }
    });
  });
  
// READ
  router.get("/getUsers", (req, res) => {
    const sql = `
      SELECT
      CAST(u.user_ID AS SIGNED) as user_ID,
      ut.type as user_type,
      u.user_type_ID,
      u.email,
      u.password,
      u.last_name,
      u.first_name,
      u.contact_number,
      u.username
    FROM user u
    JOIN user_type ut ON u.user_type_ID = ut.user_type_ID
    ORDER BY user_type ASC; `;
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res
          .status(500)
          .json({ Status: "Error", Message: "Failed to fetch users" });
      }
  
      return res.status(200).json(data);
    });
  });
  


  // DELETE
  router.delete("/deleteUser/:id", (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res
        .status(400)
        .json({ Status: "Error", Message: "Invalid user ID provided" });
    }
  
    const sql = "DELETE FROM user WHERE user_ID = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          Status: "Error",
          Message: "Error deleting user from the database",
        });
      }
  
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ Status: "Error", Message: "User not found" });
      }
  
      console.log("User deleted from the database");
      return res
        .status(200)
        .json({ Status: "Success", Message: "User deleted from the database" });
    });
  });



  router.put('/updateUser/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ Status: "Error", Message: "Invalid user ID provided" });
    }
  
    const {
      user_type_ID,
      email,
      NewPassword,
      last_name,
      first_name,
      contact_number,
      username,
    } = req.body;
  
    try {
      let hashedPassword = null;
  
      if (NewPassword) {
        // Hash the new password if provided
        hashedPassword = await bcrypt.hash(NewPassword, 10);
        console.log('NewPassword:', NewPassword);
        console.log('hashedPassword:', hashedPassword);
      }
  
      // Update the user with the provided ID
      const updateSql = `
        UPDATE user 
        SET user_type_ID = ?, email = ?, ${NewPassword ? 'password = ?,' : ''} last_name = ?, first_name = ?, contact_number = ?, username = ? 
        WHERE user_ID = ?
      `;
  
      const updateParams = [user_type_ID, email];
      
      if (NewPassword) {
        // Include the hashed password in the parameters
        updateParams.push(hashedPassword);
      }
  
      updateParams.push(last_name, first_name, contact_number, username, id);
  
      db.query(updateSql, updateParams, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ Status: "Error", Message: "Error updating user in the database" });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ Status: "Error", Message: "User not found" });
        }
  
        console.log("User updated in the database");
        return res.status(200).json({ Status: "Success", Message: "User updated in the database" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Status: "Error", Message: "Server error while hashing password" });
    }
  });
  
  
  //last line sa admin:addaccount(users)

  export default router