import express from "express";
import mysql from "mysql"
 const router = express.Router()
 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chedrmis",
  });


//first line sa admin:listofpersonnels(assignatories)

//CREATE
router.post("/addPersonnel", (req, res) => {
    const { personnelID, unit, lastName, firstName, position, birthDate, email, contactNumber } = req.body;
  
    const sql =
      "INSERT INTO list_personnel (Personnel_ID, Unit_ID, Last_Name, First_Name, Position, Birth_date, Email, Contact_Number ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )";
  
    db.query(sql, [personnelID, unit, lastName, firstName, position, birthDate, email, contactNumber], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({
          Status: "Error",
          Message: "Error adding personnel to the database",
        });
      }
  
      console.log("Personnel added to the database");
      return res.json({
        Status: "Success",
        Message: "Personnel added to the database",
      });
    });
  });
  

 // READ
router.get("/getPersonnels", (req, res) => {
  const sql = `
    SELECT
      CAST(p.Personnel_ID AS SIGNED) as Personnel_ID,
      p.personnel_id,
      p.unit_id, 
      p.Last_Name,
      p.First_Name,
      p.Position,
      p.Birth_Date,
      p.Email,
      p.Contact_Number,
      u.Type as Unit_Type
    FROM list_personnel p
    LEFT JOIN Unit u ON p.unit_id = u.Unit_ID
    ORDER BY Personnel_ID ASC;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching personnels", err);
      return res
        .status(500)
        .json({ Status: "Error", Message: "Failed to fetch personnels" });
    }

    return res.status(200).json(data);
  });
});
  
  //EDIT
  router.put("/editPersonnel/:id", (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, position } = req.body;
  
    const sql = "UPDATE list_personnel SET Unit_ID = ? , Last_Name = ?, First_Name = ?, Position = ?, Birth_Date = ?, Email = ?, Contact_Number = ? WHERE Personnel_ID = ?";
  
    db.query(sql, [lastName, firstName, position, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          Status: "Error",
          Message: "Error updating personnel data in the database",
        });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          Status: "Error",
          Message: "Personnel not found",
        });
      }
  
      console.log("Personnel data updated in the database");
      return res.status(200).json({
        Status: "Success",
        Message: "Personnel data updated in the database",
      });
    });
  });
  
  
  router.delete("/deletePersonnel/:id", (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res
        .status(400)
        .json({ Status: "Error", Message: "Invalid user ID provided" });
    }
  
    const sql = "DELETE FROM list_personnel WHERE Personnel_ID = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          Status: "Error",
          Message: "Error deleting personnel from the database",
        });
      }
  
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ Status: "Error", Message: "Personnel not found" });
      }
  
      console.log("Personnel deleted from the database");
      return res
        .status(200)
        .json({ Status: "Success", Message: "Personnel deleted from the database" });
    });
  });
  
  //last line sa admin:list of personnels(assignatories)
  


  export default router