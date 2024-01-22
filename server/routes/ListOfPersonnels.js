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
      const { personnelID, Unit, lastName, firstName, position, birthDate, email, contactNumber } = req.body;
    
      const sql =
        "INSERT INTO list_personnel (Personnel_ID, Unit_ID, Last_Name, First_Name, Position, Birth_date, Email, Contact_Number ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )";
    
      db.query(sql, [personnelID, Unit, lastName, firstName, position, birthDate, email, contactNumber], (err, result) => {
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
        p.last_name,
        p.first_name,
        p.position,
        p.birth_date,
        p.email,
        p.contact_number,
        u.Type as unit_type
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
      router.put("/updatePersonnel/:id", (req, res) => {
      const { id } = req.params;
      const { 
        unit_id,
        last_name,
        first_name, 
        position, 
        birth_date, 
        email, 
        contact_number } = req.body;
    
      const sql = "UPDATE list_personnel SET unit_id = ?, last_name = ?, first_name = ?, position = ?, birth_date = ?, email = ?, contact_number = ? WHERE personnel_id = ?";
    
      db.query(sql, [
        unit_id,
        last_name,
        first_name,
        position,
        birth_date, 
        email, 
        contact_number,
        id
        ], (err, result) => {
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
    
    

    // DELETE
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