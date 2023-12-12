import express from "express";
import mysql from "mysql"
import multer from "multer"; 
import fs from "fs";


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsPath = join(__dirname, '..', 'institutions-uploads');
// first sa multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// last sa multer

const upload = multer({ storage });

 const router = express.Router()
 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chedrmis",
  });
  
  router.use('/institutionfiles', express.static(join(__dirname, 'institutions-uploads')));

  router.get("/institutionfiles/:filename", (req, res) => {
    const { filename } = req.params;
    res.sendFile(join(uploadsPath, filename));
  });
//first line sa admin:instituion(chedclients)



// CREATE

// Function to get the maximum Trans_ID from the "transaction" table
const getMaxTransID = async () => {
  return new Promise((resolve, reject) => {
    const getMaxTransIDQuery = "SELECT MAX(Trans_ID) AS maxTransID FROM transaction";
    db.query(getMaxTransIDQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxTransIDQuery:", err);
        reject(err);
      } else {
        const maxTransID = result[0].maxTransID || 0;
        console.log("maxTransID:", maxTransID);
        resolve(maxTransID);
      }
    });
  });
};


router.post("/addClient", upload.single("file"), async (req, res) => {
  const {
    seq_no,
    institutionID,
    institutionName,
    institutionType,
    address,
    clientType,
    filingCat,
    contactPerson,
    contactNumber,
    userID
  } = req.body;

  const file = req.file;

  // Ensure the file exists before using it in the database query
  if (!file) {
    console.log("File not provided or invalid");
    return res.json({
      Status: "Error",
      Message: "File not provided or invalid",
    });
  }

  try {
    // Get the maximum Trans_ID from the "transaction" table
    const maxTransID = await getMaxTransID();

    // Use a transaction to ensure consistency across "institution" and "transaction" tables
    const result = await new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          console.error("Error in beginTransaction:", err);
          reject(err);
        }

        const institutionInsertQuery =
          "INSERT INTO institution (seq_no, inst_id, inst_name, inst_type_id, address, client_type_id, fil_cat_ID, contact_person, contact_number, file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const institutionInsertValues = [
          seq_no,
          institutionID,
          institutionName,
          institutionType,
          address,
          clientType,
          filingCat,
          contactPerson,
          contactNumber,
          file.filename,
        ];

        // Log the institutionInsertQuery and values
        console.log("institutionInsertQuery:", institutionInsertQuery);
        console.log("institutionInsertValues:", institutionInsertValues);

        db.query(
          institutionInsertQuery,
          institutionInsertValues,
          (err, result) => {
            if (err) {
              console.error("Error in institutionInsertQuery:", err);
              db.rollback(() => reject(err));
            } else {
              // Increment the maxTransID for the next transaction
              const nextTransID = maxTransID + 1;

              // Insert into the "transaction" table with the obtained "Trans_ID"
              const transactionInsertQuery = "INSERT INTO transaction (Trans_ID, User_ID, Doc_ID, Inst_ID) VALUES (?, ?, ?, ?)";
              const transactionInsertValues = [  nextTransID, userID, null,  institutionID ];

              // Log the transactionInsertQuery and values
              console.log(
                "transactionInsertQuery:",
                transactionInsertQuery
              );
              console.log(
                "transactionInsertValues:",
                transactionInsertValues
              );

              db.query(
                transactionInsertQuery,
                transactionInsertValues,
                (err, result) => {
                  if (err) {
                    console.error(
                      "Error in transactionInsertQuery:",
                      err
                    );
                    db.rollback(() => reject(err));
                  } else {
                    // Both queries were successful, commit the transaction
                    db.commit((err) => {
                      if (err) {
                        console.error("Error in commit:", err);
                        db.rollback(() => reject(err));
                      } else {
                        resolve(result);
                      }
                    });
                  }
                }
              );
            }
          }
        );
      });
    });

    console.log("Institution and Transaction added to the database");
    return res.json({
      Status: "Success",
      Message: "Institution and Transaction added to the database",
    });
  } catch (error) {
    console.error("Error in try-catch block:", error);
    return res.status(500).json({
      Status: "Error",
      Message: "Error adding institution and transaction to the database",
    });
  }
});

  
  // READ
  router.get("/getClients", (req, res) => {
    const sql = `
      SELECT
        CAST(i.seq_no AS SIGNED) as seq_no,
        i.inst_id,
        i.inst_name,
        i.client_type_id,
        i.inst_type_id,
        i.fil_cat_id,
        ct.type as client_type,
        it.type as inst_type,
        fc.type as filing_category,
        i.address,
        i.contact_person,
        i.contact_number,
        i.file  
      FROM institution i
      JOIN client_type ct ON i.client_type_id = ct.client_type_id
      JOIN institution_type it ON i.inst_type_id = it.inst_type_id
      JOIN filing_category fc ON i.fil_cat_id = fc.fil_cat_id
      ORDER BY seq_no ASC; `;
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error("Error fetching clients:", err);
        return res
          .status(500)
          .json({ Status: "Error", Message: "Failed to fetch clients" });
      }
  
      return res.status(200).json(data);
    });
  });
  
  // DELETE
router.delete("/deleteClient/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ Status: "Error", Message: "Invalid client ID provided" });
  }

  const getFilePathQuery = "SELECT file FROM institution WHERE inst_id = ?";
  const deleteClientQuery = "DELETE FROM institution WHERE inst_id = ?";
  const deleteTransactionQuery = "DELETE FROM transaction WHERE Inst_ID = ?";

  db.beginTransaction((err) => {
    if (err) {
      console.error("Error in beginTransaction:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Error starting transaction",
      });
    }

    // Delete the corresponding transaction record
    db.query(deleteTransactionQuery, [id], (deleteTransErr, deleteTransResult) => {
      if (deleteTransErr) {
        console.error(deleteTransErr);
        db.rollback(() => {
          return res.status(500).json({
            Status: "Error",
            Message: "Error deleting transaction from the database",
          });
        });
      }

      // Check if the institution record exists
      db.query(getFilePathQuery, [id], (err, result) => {
        if (err) {
          console.error(err);
          db.rollback(() => {
            return res.status(500).json({
              Status: "Error",
              Message: "Error getting file path from the database",
            });
          });
        }

        if (result.length === 0 || !result[0].file) {
          // No file associated with the record
          db.query(deleteClientQuery, [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
              console.error(deleteErr);
              db.rollback(() => {
                return res.status(500).json({
                  Status: "Error",
                  Message: "Error deleting client from the database",
                });
              });
            }

            // Commit the transaction
            db.commit((commitErr) => {
              if (commitErr) {
                console.error("Error in commit:", commitErr);
                return res.status(500).json({
                  Status: "Error",
                  Message: "Error committing transaction",
                });
              }

              console.log("Client deleted from the database");
              return res.status(200).json({
                Status: "Success",
                Message: "Client deleted from the database",
              });
            });
          });
        } else {
          // There is a file associated with the record
          const filePath = join(uploadsPath, result[0].file);

          // Delete the file from the "uploads" folder
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(unlinkErr);
              db.rollback(() => {
                return res.status(500).json({
                  Status: "Error",
                  Message: "Error deleting file from the server",
                });
              });
            }

            // File deleted successfully, now delete the record from the database
            db.query(deleteClientQuery, [id], (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.error(deleteErr);
                db.rollback(() => {
                  return res.status(500).json({
                    Status: "Error",
                    Message: "Error deleting client from the database",
                  });
                });
              }

              // Commit the transaction
              db.commit((commitErr) => {
                if (commitErr) {
                  console.error("Error in commit:", commitErr);
                  return res.status(500).json({
                    Status: "Error",
                    Message: "Error committing transaction",
                  });
                }

                console.log("Client and associated file deleted");
                return res.status(200).json({
                  Status: "Success",
                  Message: "Client and associated file deleted",
                });
              });
            });
          });
        }
      });
    });
  });
});

  // UPDATE
router.put('/updateClient/:id', upload.single('file'), (req, res) => {
  const { id } = req.params;
  const {
    inst_name,
    inst_type_id,
    address,
    client_type_id,
    fil_cat_id,
    contact_person,
    contact_number,
  } = req.body;

  // Check if a file was uploaded
  const newFile = req.file ? req.file.filename : null;

  if (!id) {
    return res.status(400).json({ Status: 'Error', Message: 'Invalid client ID provided' });
  }

  // Get the current file name from the database
  const getCurrentFileSQL = 'SELECT file FROM institution WHERE inst_id = ?';
  db.query(getCurrentFileSQL, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        Status: 'Error',
        Message: 'Error retrieving current file from the database',
      });
    }

    const currentFile = result[0] ? result[0].file : null;

    const updateInstitutionSQL = `
      UPDATE institution 
      SET inst_name=?, inst_type_id=?, address=?, client_type_id=?, fil_cat_id=?, contact_person=?, contact_number=?, file=? 
      WHERE inst_id=?`;

    db.query(
      updateInstitutionSQL,
      [
        inst_name,
        inst_type_id,
        address,
        client_type_id,
        fil_cat_id,
        contact_person,
        contact_number,
        newFile,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            Status: 'Error',
            Message: 'Error updating client in the database',
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ Status: 'Error', Message: 'Client not found' });
        }

        // Delete the old file if it exists and is different from the new file
        if (currentFile && currentFile !== newFile) {
          const filePath = join(uploadsPath, currentFile);
          fs.unlinkSync(filePath);
        }

        console.log('Client updated in the database');
        return res.status(200).json({
          Status: 'Success',
          Message: 'Client updated in the database',
        });
      }
    );
  });
});


  // last line sa admin:instituion(chedclients)
 
 
  export default router;