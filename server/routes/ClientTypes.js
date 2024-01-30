import express from "express";
import mysql from "mysql"
 const router = express.Router()
 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chedrmis",
  });


//first line sa admin:client type

// //CREATE
router.post("/addClientType", (req, res) => {
    const { clientTypeID, clientType, remarks } = req.body;
  
    const sql =
      "INSERT INTO client_type (client_type_ID, type, remarks) VALUES (?, ?, ?)";
  
    db.query(sql, [clientTypeID, clientType, remarks], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({
          Status: "Error",
          Message: "Error adding client type to the database",
        });
      }
  
      console.log("Client type added to the database");
      return res.json({
        Status: "Success",
        Message: "Client type added to the database",
      });
    });
  });
  

  //READ
  router.get("/getClientTypes", (req, res) => {
    const sql = `
      SELECT
      CAST(c.Client_type_ID AS SIGNED) as Client_type_ID,
      c.client_type_id,
      c.type,
      c.remarks
    FROM client_type c
   
    ORDER BY Type ASC; `;
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error("Error fetching client type", err);
        return res
          .status(500)
          .json({ Status: "Error", Message: "Failed to fetch client type" });
      }
  
      return res.status(200).json(data);
    });
  });
  
 //EDIT
 router.put("/updateClientType/:id", (req, res) => {
  const { id } = req.params;
  const { 
    type,
    remarks,
 } = req.body;

  const sql = "UPDATE client_type SET type = ?, remarks = ? WHERE client_type_id = ?";

  db.query(sql, [
    type,
    remarks,
    id
    ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        Status: "Error",
        Message: "Error updating client types data in the database",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Status: "Error",
        Message: "cclient types not found",
      });
    }

    console.log("Client types data updated in the database");
    return res.status(200).json({
      Status: "Success",
      Message: "Client types data updated in the database",
    });
  });
});

  
  
  //DELETE
  router.delete("/deleteClientType/:id", (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res
        .status(400)
        .json({ Status: "Error", Message: "Invalid client type ID provided" });
    }
  
    const sql = "DELETE FROM client_type WHERE client_type_ID = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          Status: "Error",
          Message: "Error deleting client type from the database",
        });
      }
  
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ Status: "Error", Message: "Client type not found" });
      }
  
      console.log("Client type deleted from the database");
      return res
        .status(200)
        .json({ Status: "Success", Message: "Client Type deleted from the database" });
    });
  });
  
  //last line sa admin:list of personnels(assignatories)
  


  export default router