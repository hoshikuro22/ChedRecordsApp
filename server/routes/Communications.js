import express from "express";
import mysql from "mysql";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsPath = join(__dirname, '..', 'communications-uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chedrmis",
});

router.use('/communicationfiles', express.static(join(__dirname, 'communications-uploads')));

router.get("/communicationfiles/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(join(uploadsPath, filename));
});
  //first line sa admin:communication(documents)



// CREATE

// Function to get the maximum Trans_ID from the "transaction" table
const getMaxTransID = async () => {
  return new Promise((resolve, reject) => {
    const getMaxTransIDQuery =
      "SELECT MAX(Trans_ID) AS maxTransID FROM transaction";
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

// Function to find the next available primary key for the activity_log table
const getNextActivityLogId = async () => {
  return new Promise((resolve, reject) => {
    const getMaxActivityLogIdQuery =
      "SELECT MAX(activity_ID) AS maxActivityLogId FROM activity_log";
    db.query(getMaxActivityLogIdQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxActivityLogIdQuery:", err);
        reject(err);
      } else {
        const maxActivityLogId = result[0].maxActivityLogId || 0;
        const nextActivityLogId = maxActivityLogId + 1;
        console.log("nextActivityLogId:", nextActivityLogId);
        resolve(nextActivityLogId);
      }
    });
  });
};

// Function to get the user account from the user table based on User_ID
const getUserAccount = async (userID) => {
  return new Promise((resolve, reject) => {
    const getUserAccountQuery =
      "SELECT First_Name, Last_Name FROM user WHERE user_ID = ?";
    db.query(getUserAccountQuery, [userID], (err, userResult) => {
      if (err) {
        console.error("Error in getUserAccountQuery:", err);
        reject(err);
      } else {
        const { First_Name, Last_Name } = userResult[0];
        const userAccount = `${First_Name} ${Last_Name}`;
        resolve(userAccount);
      }
    });
  });
};

router.post('/addDocument', upload.single('file'), async (req, res) => {
  console.log("Received request:", req.body);
  const {
    docID,
    assignatories,
    documentType,
    dateIssued,
    remarks,
    status,
    department,
    userID,
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

    // Get the next available primary key for the activity_log table
    const nextActivityLogId = await getNextActivityLogId();

    // Fetch user account to get first_name and last_name
    const userAccount = await getUserAccount(userID);

    // Use a transaction to ensure consistency across "document" and "transaction" tables
    const result = await new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          console.error("Error in beginTransaction:", err);
          reject(err);
        }

        const documentInsertQuery =
          "INSERT INTO document (doc_ID, personnel_id, doc_type_id, Date_Issued, remarks, status_id, department_id, file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const documentInsertValues = [
          docID,
          assignatories,
          documentType,
          dateIssued,
          remarks,
          status,
          department,
          file.filename,
        ];

        // Log the documentInsertQuery and values
        console.log("documentInsertQuery:", documentInsertQuery);
        console.log("documentInsertValues:", documentInsertValues);

        db.query(
          documentInsertQuery,
          documentInsertValues,
          (err, result) => {
            if (err) {
              console.error("Error in documentInsertQuery:", err);
              db.rollback(() => reject(err));
            } else {
              // Increment the maxTransID for the next transaction
              const nextTransID = maxTransID + 1;

              // Insert into the "transaction" table with the obtained "Trans_ID"
              const transactionInsertQuery =
                "INSERT INTO transaction (Trans_ID, User_ID, Doc_ID, Inst_ID) VALUES (?, ?, ?, ?)";
              const transactionInsertValues = [
                nextTransID,
                userID,
                docID,
                null,
              ];

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
                async (err, result) => {
                  if (err) {
                    console.error(
                      "Error in transactionInsertQuery:",
                      err
                    );
                    db.rollback(() => reject(err));
                  } else {
                    // Insert into the "activity_log" table
                    const activityLogInsertQuery =
                      "INSERT INTO activity_log (activity_ID, trans_ID, dateandtime, activity, user_account) VALUES (?, ?, ?, ?, ?)";
                    const activityLogInsertValues = [
                      nextActivityLogId,
                      nextTransID,
                      new Date().toISOString(),
                      `Added doc_ID: ${docID}`,
                      userAccount,
                    ];

                    // Log the activityLogInsertQuery and values
                    console.log(
                      "activityLogInsertQuery:",
                      activityLogInsertQuery
                    );
                    console.log(
                      "activityLogInsertValues:",
                      activityLogInsertValues
                    );

                    db.query(
                      activityLogInsertQuery,
                      activityLogInsertValues,
                      (err, result) => {
                        if (err) {
                          console.error(
                            "Error in activityLogInsertQuery:",
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
            }
          }
        );
      });
    });

    console.log("Document, Transaction, Transaction Log, and Activity Log added to the database");
    return res.json({
      Status: "Success",
      Message: "Document, Transaction, Transaction Log, and Activity Log added to the database",
    });
  } catch (error) {
    console.error("Error in try-catch block:", error);
    return res.status(500).json({
      Status: "Error",
      Message:
        "Error adding document, transaction, transaction log, and activity log to the database",
    });
  }
});







  // READ
  router.get("/getDocuments", (req, res) => {
    const sql = `
    SELECT
      CAST(d.Doc_ID AS SIGNED) AS doc_ID,
      dt.Type AS document_type,
      lp.first_name as contact_firstName,
      lp.last_name as contact_lastName,
      lp.position as contact_position,
      d.doc_type_id,
      d.personnel_id,
      d.department_id,
      d.status_id,
      d.file,
      d.date_issued,
      d.remarks,
      s.type AS status,
      dep.type AS department  
    FROM document d
    JOIN document_type dt ON d.Doc_Type_ID = dt.Doc_Type_ID
    JOIN list_personnel lp ON d.Personnel_ID = lp.Personnel_ID
    JOIN status s ON d.status_id = s.status_ID
    JOIN department dep ON d.department_id = dep.department_ID  
    ORDER BY doc_ID ASC;
    `;
  
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


// UPDATE
router.put('/updateDocument/:id', upload.single('file'), (req, res) => {
    const { id } = req.params;
    const { doc_type_id, department_id, dateIssued, status_id, remarks, personnel_id } = req.body;
  
    // Check if a file was uploaded
    const newFile = req.file ? req.file.filename : null;
  
    if (!id) {
      return res.status(400).json({ Status: 'Error', Message: 'Invalid Document ID provided' });
    }
  
    // Get the current file name from the database
    const getCurrentFileSQL = 'SELECT file FROM document WHERE doc_ID = ?';
    db.query(getCurrentFileSQL, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          Status: 'Error',
          Message: 'Error retrieving current file from the database',
        });
      }
  
      const currentFile = result[0] ? result[0].file : null;
  
      const updateDocumentSQL = `
        UPDATE document
        SET
          doc_type_id = ?,
          department_id = ?,
          Date_Issued = ?,
          status_id = ?,
          remarks = ?,
          personnel_id = ?,
          file = ?
        WHERE doc_ID = ?`;
  
      db.query(
        updateDocumentSQL,
        [doc_type_id, department_id, dateIssued, status_id, remarks, personnel_id, newFile, id],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              Status: 'Error',
              Message: 'Error updating document in the database',
            });
          }
  
          if (result.affectedRows === 0) {
            return res.status(404).json({ Status: 'Error', Message: 'Document not found' });
          }
  
          // Delete the old file if it exists and is different from the new file
          if (currentFile && currentFile !== newFile) {
            const filePath = join(uploadsPath, currentFile);
            fs.unlinkSync(filePath);
          }
  
          console.log('Document updated in the database');
          return res.status(200).json({
            Status: 'Success',
            Message: 'Document updated in the database',
          });
        }
      );
    });
  });

// UPDATE




// DELETE

// Helper function to get the next activity ID
function getNextActivityID(callback) {
  db.query("SELECT MAX(activity_ID) AS maxActivityID FROM Activity_log", (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }

    const maxActivityID = result[0].maxActivityID || 0;
    const nextActivityID = maxActivityID + 1;
    callback(null, nextActivityID);
  });
}


router.delete("/deleteDocument/:id", (req, res) => {
  const { id } = req.params;

// mao ni gikan sa "user" entity table na gifetch gikan sa pag click sa delete button
const userFirstName = req.headers.first_name;
const userLastName = req.headers.last_name;

// console.log("Request Headers:", req.headers); pa tan-aw sa headers gikan sa frontend

console.log("First Name:", userFirstName);
console.log("Last Name:", userLastName);

  

  if (!id) {
    return res.status(400).json({
      Status: "Error",
      Message: "Invalid Document ID provided",
    });
  }

  const getFilePathQuery = "SELECT file FROM document WHERE doc_id = ?";
  const deleteDocumentQuery = "DELETE FROM document WHERE doc_id = ?";
  const deleteTransactionQuery = "DELETE FROM transaction WHERE Doc_ID = ?";
  const insertActivityLogQuery = "INSERT INTO Activity_log (activity_ID, trans_ID, dateandtime, activity, user_account) VALUES (?, ?, ?, ?, ?)";

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

      // Check if the document record exists
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
          db.query(deleteDocumentQuery, [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
              console.error(deleteErr);
              db.rollback(() => {
                return res.status(500).json({
                  Status: "Error",
                  Message: "Error deleting document from the database",
                });
              });
            }

            // Insert activity log for document deletion
            getNextActivityID((activityIDErr, nextActivityID) => {
              if (activityIDErr) {
                console.error(activityIDErr);
                db.rollback(() => {
                  return res.status(500).json({
                    Status: "Error",
                    Message: "Error getting next activity ID",
                  });
                });
              }

              const dateAndTime = new Date().toISOString();
              const activityMessage = `Deleted doc_id: ${id}`;

              db.query(
                insertActivityLogQuery,
                [nextActivityID, null, dateAndTime, activityMessage, `${userFirstName} ${userLastName}`],
                (insertActivityLogErr, insertActivityLogResult) => {
                  if (insertActivityLogErr) {
                    console.error(insertActivityLogErr);
                    db.rollback(() => {
                      return res.status(500).json({
                        Status: "Error",
                        Message: "Error inserting activity log",
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

                    console.log("Document and associated file deleted");
                    return res.status(200).json({
                      Status: "Success",
                      Message: "Document and associated file deleted",
                    });
                  });
                }
              );
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
            db.query(deleteDocumentQuery, [id], (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.error(deleteErr);
                db.rollback(() => {
                  return res.status(500).json({
                    Status: "Error",
                    Message: "Error deleting document from the database",
                  });
                });
              }

              // Insert activity log for document deletion
              getNextActivityID((activityIDErr, nextActivityID) => {
                if (activityIDErr) {
                  console.error(activityIDErr);
                  db.rollback(() => {
                    return res.status(500).json({
                      Status: "Error",
                      Message: "Error getting next activity ID",
                    });
                  });
                }

                const dateAndTime = new Date().toISOString();
                const activityMessage = `Deleted doc_ID: ${id}`;

                db.query(
                  insertActivityLogQuery,
                  [nextActivityID, null, dateAndTime, activityMessage, `${userFirstName} ${userLastName}`],
                  (insertActivityLogErr, insertActivityLogResult) => {
                    if (insertActivityLogErr) {
                      console.error(insertActivityLogErr);
                      db.rollback(() => {
                        return res.status(500).json({
                          Status: "Error",
                          Message: "Error inserting activity log",
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

                      console.log("Document and associated file deleted");
                      return res.status(200).json({
                        Status: "Success",
                        Message: "Document and associated file deleted",
                      });
                    });
                  }
                );
              });
            });
          });
        }
      });
    });
  });
});



  
  

  
  //last line sa admin:communication(documents)

export default router