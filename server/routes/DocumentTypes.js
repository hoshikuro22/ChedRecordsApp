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
router.post("/addDocumentType", (req, res) => {
    const { documentTypeID, documentType } = req.body;
  
    const sql =
      "INSERT INTO document_type (doc_type_ID, type) VALUES (?, ?)";
  
    db.query(sql, [documentTypeID, documentType], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({
          Status: "Error",
          Message: "Error adding document type to the database",
        });
      }
  
      console.log("Document type added to the database");
      return res.json({
        Status: "Success",
        Message: "Document type added to the database",
      });
    });
  });
  

  //READ
  router.get("/getDocumentTypes", (req, res) => {
    const sql = `
      SELECT
      CAST(d.Doc_type_ID AS SIGNED) as Doc_type_ID,
      d.Doc_type_ID,
      d.Type
    FROM document_type d
   
    ORDER BY Doc_type_ID ASC; `;
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error("Error fetching document type", err);
        return res
          .status(500)
          .json({ Status: "Error", Message: "Failed to fetch document type" });
      }
  
      return res.status(200).json(data);
    });
  });
  
  //UPDATE

  router.put("/editPersonnel/:id", (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, position } = req.body;
  
    const sql = "UPDATE list_personnel SET Last_Name = ?, First_Name = ?, Position = ? WHERE Personnel_ID = ?";
  
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
  
  
  //DELETE
  router.delete("/deleteDocumentType/:id", (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res
        .status(400)
        .json({ Status: "Error", Message: "Invalid document type ID provided" });
    }
  
    const sql = "DELETE FROM document_type WHERE doc_type_ID = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          Status: "Error",
          Message: "Error deleting document type from the database",
        });
      }
  
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ Status: "Error", Message: "Document type not found" });
      }
  
      console.log("Document type deleted from the database");
      return res
        .status(200)
        .json({ Status: "Success", Message: "Document Type deleted from the database" });
    });
  });
  
  //last line sa admin:list of personnels(assignatories)
  


  export default router