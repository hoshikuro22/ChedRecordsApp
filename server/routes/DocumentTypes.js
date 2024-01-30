import express from "express";
import mysql from "mysql"
 const router = express.Router()
 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chedrmis",
  });


//first line sa admin:document types

//CREATE
router.post("/addDocumentType", (req, res) => {
    const { documentTypeID, documentType, remarks } = req.body;
  
    const sql =
      "INSERT INTO document_type (doc_type_ID, type, remarks) VALUES (?, ?, ?)";
  
    db.query(sql, [documentTypeID, documentType, remarks], (err, result) => {
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
      d.doc_type_id,
      d.type,
      d.remarks
    FROM document_type d
   
    ORDER BY Type ASC; `;
  
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
  
 //EDIT
 router.put("/updateDocumentType/:id", (req, res) => {
  const { id } = req.params;
  const { 
    type,
    remarks,
 } = req.body;

  const sql = "UPDATE document_type SET type = ?, remarks = ? WHERE doc_type_id = ?";

  db.query(sql, [
    type,
    remarks,
    id
    ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        Status: "Error",
        Message: "Error updating document types data in the database",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Status: "Error",
        Message: "document types not found",
      });
    }

    console.log("Document types data updated in the database");
    return res.status(200).json({
      Status: "Success",
      Message: "Document types data updated in the database",
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
  
  //last line sa admin:list of document types
  


  export default router