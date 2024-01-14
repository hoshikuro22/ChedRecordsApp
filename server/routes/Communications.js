import express from "express";
import mysql from "mysql";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// diri masulod na folder ang file
const uploadsPath = join(__dirname, '..', 'communications-uploads');
//sa history 
const uploadsHistoryPath = path.join(__dirname, '..', 'communications-uploads-history');
// sa backup
const backupUploadsPath = join(__dirname, '..', 'communications-uploads-backup');



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

//  sa communication table to see the file
router.use('/communicationfiles', express.static(join(__dirname, 'communications-uploads')));

router.get("/communicationfiles/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(join(uploadsPath, filename));
});


//  sa communication table to see the file
router.use('/communicationhistoryfiles', express.static(join(__dirname, 'communications-uploads-history')));

router.get("/communicationhistoryfiles/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(join(uploadsHistoryPath, filename));
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

// Function to get the maximum Doc_Backup_ID from the "doc_backup" table
const getNextDocBackupID = async () => {
  return new Promise((resolve, reject) => {
    const getMaxDocBackupIDQuery =
      "SELECT MAX(Doc_Backup_ID) AS maxDocBackupID FROM doc_backup";
    db.query(getMaxDocBackupIDQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxDocBackupIDQuery:", err);
        reject(err);
      } else {
        const maxDocBackupID = result[0].maxDocBackupID || 0;
        const nextDocBackupID = maxDocBackupID + 1;
        console.log("maxDocBackupID:", maxDocBackupID);
        resolve(nextDocBackupID);
      }
    });
  });
};

// Function to find the next available primary key for the activity_log table
const getNextActivityLogId = async () => {
  return new Promise((resolve, reject) => {
    const getMaxActivityLogIdQuery =
      "SELECT MAX(activity_ID) AS maxActivityLogId FROM Activity_Log";
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

// Function to find the next available primary key for the document_history    table
const getNextDocumentHistoryId = async () => {
  return new Promise((resolve, reject) => {
    const getMaxDocumentHistoryIdQuery =
      "SELECT MAX(doc_history_ID) AS maxDocumentHistoryId FROM document_history";
    db.query(getMaxDocumentHistoryIdQuery, (err, result) => {
      if (err) {
        console.error("Error in getMaxDocumentHistoryIdQuery:", err);
        reject(err);
      } else {
        const maxDocumentHistoryId = result[0].maxDocumentHistoryId || 0;
        const nextDocumentHistoryId = maxDocumentHistoryId + 1;
        console.log("nextDocumentHistoryId:", nextDocumentHistoryId);
        resolve(nextDocumentHistoryId);
      }
    });
  });
};


router.post('/addDocument', upload.single('file'), async (req, res) => {
  const {
    docID,
    assignatories,
    documentType,
    dateReceived,
    dateReleased,
    remarks,
    status,
    department,
    client,
    userID,
  } = req.body;
  const file = req.file;

  if (!file) {
    return res.json({
      Status: "Error",
      Message: "File not provided or invalid",
    });
  }

  try {
    const backupFilePath = join(backupUploadsPath, file.filename);
    fs.copyFileSync(join(uploadsPath, file.filename), backupFilePath);

    const maxTransID = await getMaxTransID();
    const nextDocBackupID = await getNextDocBackupID();
    const nextActivityLogId = await getNextActivityLogId();
    const nextDocumentHistoryId = await getNextDocumentHistoryId();
    const userAccount = await getUserAccount(userID);

    const result = await new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          console.error("Error in beginTransaction:", err);
          reject(err);
        }

        const documentInsertQuery =
          "INSERT INTO document (doc_ID, personnel_id, doc_type_id, Date_Received, Date_Released, remarks, status_id, dept_id, client_id, file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const documentInsertValues = [
          docID,
          assignatories,
          documentType,
          dateReceived,
          dateReleased,
          remarks,
          status,
          department,
          client,
          file.filename,
        ];

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
              const nextTransID = maxTransID + 1;
              const transactionInsertQuery =
                "INSERT INTO transaction (Trans_ID, User_ID, Doc_ID, Client_ID) VALUES (?, ?, ?, ?)";
              const transactionInsertValues = [
                nextTransID,
                userID,
                docID,
                null,
              ];

              console.log("transactionInsertQuery:", transactionInsertQuery);
              console.log("transactionInsertValues:", transactionInsertValues);

              db.query(
                transactionInsertQuery,
                transactionInsertValues,
                async (err, result) => {
                  if (err) {
                    console.error("Error in transactionInsertQuery:", err);
                    db.rollback(() => reject(err));
                  } else {
                    const docBackupInsertQuery =
                      "INSERT INTO doc_backup (Doc_backup_ID, Doc_ID, Doc_type_ID, personnel_id, Client_ID, Dept_ID, Status_ID, File, Date_Received, Date_Released, Backup_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    const docBackupInsertValues = [
                      nextDocBackupID,
                      null,
                      documentType,
                      assignatories,
                      client,
                      department,
                      status,
                      file.filename,
                      dateReceived,
                      dateReleased,
                      docID,
                    ];

                    console.log("docBackupInsertQuery:", docBackupInsertQuery);
                    console.log("docBackupInsertValues:", docBackupInsertValues);

                    db.query(docBackupInsertQuery, docBackupInsertValues, (err, result) => {
                      if (err) {
                        console.error("Error in docBackupInsertQuery:", err);
                        db.rollback(() => reject(err));
                      } else {
                        const myDate = new Date();
                        myDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' });
                        console.log(myDate);
                        const activityLogInsertQuery =
                          "INSERT INTO activity_log (activity_ID, trans_ID, dateandtime, activity, user_account) VALUES (?, ?, ?, ?, ?)";
                        const activityLogInsertValues = [
                          nextActivityLogId,
                          nextTransID,
                          myDate,
                          `Added doc_ID: ${docID} | File Name: ${file.filename}`,
                          userAccount,
                        ];

                        console.log("activityLogInsertQuery:", activityLogInsertQuery);
                        console.log("activityLogInsertValues:", activityLogInsertValues);

                        db.query(activityLogInsertQuery, activityLogInsertValues, (err, result) => {
                          if (err) {
                            console.error("Error in activityLogInsertQuery:", err);
                            db.rollback(() => reject(err));
                          } else {
                            const documentHistoryInsertQuery =
                              "INSERT INTO document_history (doc_history_ID, doc_ID, doc_type_ID, personnel_ID, client_ID, dept_ID, status_ID, file, date_received, date_released, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                            const documentHistoryInsertValues = [
                              nextDocumentHistoryId,
                              docID,
                              documentType,
                              assignatories,
                              client,
                              department,
                              status,
                              file.filename,
                              dateReceived,
                              dateReleased,
                              remarks,
                            ];

                            console.log("documentHistoryInsertQuery:", documentHistoryInsertQuery);
                            console.log("documentHistoryInsertValues:", documentHistoryInsertValues);
                             // Move the file to communication-uploads_history folder
                             const historyFilePath = join(uploadsHistoryPath, file.filename);
                             fs.copyFileSync(join(uploadsPath, file.filename), historyFilePath);

                            db.query(documentHistoryInsertQuery, documentHistoryInsertValues, (err, result) => {
                              if (err) {
                                console.error("Error in documentHistoryInsertQuery:", err);
                                db.rollback(() => reject(err));
                              } else {
                                db.commit((err) => {
                                  if (err) {
                                    console.error("Error in commit:", err);
                                    db.rollback(() => reject(err));
                                  } else {
                                    resolve(result);
                                  }
                                });
                              }
                            });
                          }
                        });
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

    console.log("Document, Transaction, Transaction Log, and Activity Log added to the database");
    return res.json({
      Status: "Success",
      Message: "Document, Transaction, Transaction Log, and Activity Log added to the database",
    });
  } catch (error) {
    console.error("Error in try-catch block:", error);
    return res.status(500).json({
      Status: "Error",
      Message: "Error adding document, transaction, transaction log, and activity log to the database",
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
  d.dept_id,
  d.status_id,
  d.client_id,
  d.file,
  d.date_received,
  d.date_released,
  d.remarks,
  s.type AS status,
  dep.type AS department,
  i.client_name AS client_name
FROM document d 
JOIN document_type dt ON d.Doc_Type_ID = dt.Doc_Type_ID
JOIN list_personnel lp ON d.Personnel_ID = lp.Personnel_ID
JOIN status s ON d.status_id = s.status_ID
JOIN department dep ON d.dept_id = dep.dept_id
JOIN client i ON d.client_id = i.client_id 
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

// sa document history fetch
router.get("/getDocumentHistory/:doc_ID", (req, res) => {
  const doc_ID = req.params.doc_ID;
  const sql = `
  SELECT
  CAST(dh.Doc_History_ID AS SIGNED) AS doc_history_ID,
  dt.Type AS document_type,
  lp.first_name as contact_firstName,
  lp.last_name as contact_lastName,
  lp.position as contact_position,
  dh.doc_history_id,
  dh.doc_id,
  dh.doc_type_id,
  dh.personnel_id,
  dh.dept_id,
  dh.status_id,
  dh.client_id,
  dh.file,
  dh.date_received,
  dh.date_released,
  dh.remarks,
  s.type AS status,
  dep.type AS department,
  i.client_name AS client_name
FROM document_history dh 
JOIN document_type dt ON dh.Doc_Type_ID = dt.Doc_Type_ID
JOIN list_personnel lp ON dh.Personnel_ID = lp.Personnel_ID
JOIN status s ON dh.status_id = s.status_ID
JOIN department dep ON dh.dept_id = dep.dept_id
JOIN client i ON dh.client_id = i.client_id 
WHERE dh.doc_ID = ?
ORDER BY doc_history_ID ASC;
`;

db.query(sql, [doc_ID], (err, data) => {
if (err) {s
console.error("Error fetching document history:", err);
return res.status(500).json({ status: "Error", message: "Failed to fetch document history" });
} return res.status(200).json(data);
});
});







// UPDATE


// Function to move the file to the "communications-uploads-history" folder
const moveFileToHistoryFolder = (filename, callback) => {
  const sourcePath = join(uploadsPath, filename);
  const destinationPath = join(uploadsHistoryPath, filename);

  fs.rename(sourcePath, destinationPath, (err) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    console.log('File moved to communications-uploads-history folder');
    callback(null);
  });
};


// Function to insert a record into the "document_history" table
const insertDocumentHistory = (docID, callback) => {
  const insertDocumentHistorySQL = `
    INSERT INTO document_history (doc_history_ID, doc_ID, doc_type_ID, personnel_ID, client_ID, dept_ID, status_ID, file, date_received, date_released, remarks)
    SELECT ?, doc_ID, doc_type_ID, personnel_ID, client_ID, dept_ID, status_ID, file, date_received, date_released, remarks
    FROM document
    WHERE doc_ID = ?`;

  const getDocHistoryIDSQL = `
    SELECT MAX(doc_history_ID) AS maxDocHistoryID
    FROM document_history`;

  db.query(getDocHistoryIDSQL, (err, result) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    const maxDocHistoryID = result[0].maxDocHistoryID;

    // Check if doc_history_ID is 0, set it to 1. Otherwise, increment by 1
    const nextDocHistoryID = maxDocHistoryID === 0 ? 1 : maxDocHistoryID + 1;

    // Update the document_history table with the correct doc_history_ID
    db.query(insertDocumentHistorySQL, [nextDocHistoryID, docID], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }

      console.log('Record added to document_history table');
      callback(null, result);
    });
  });
};

router.put('/updateDocument/:id', upload.single('file'), (req, res) => {
  const { id } = req.params;
  const { doc_type_id, dept_id, date_received, date_released, status_id, remarks, personnel_id, client_id } = req.body;

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

    if (currentFile) {
      // If a new file is uploaded, move the old file to the history folder
      moveFileToHistoryFolder(currentFile, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            Status: 'Error',
            Message: 'Error moving file to history folder',
          });
        }

        // Continue with the document update process
        updateDocument();
      });
    } else {
      // If no new file is uploaded, or if it's the same as the old file, continue with the update process
      updateDocument();
    }

    function updateDocument() {
      const updateDocumentSQL = `
        UPDATE document
        SET
          doc_type_id = ?,
          dept_id = ?,
          date_received = ?,
          date_released = ?,
          status_id = ?,
          remarks = ?,
          personnel_id = ?,
          client_id = ?,
          file = ?
        WHERE doc_ID = ?`;
        const fileToUpdate = newFile ? newFile : currentFile;

      db.query(
        updateDocumentSQL,
        [doc_type_id, dept_id, date_received, date_released, status_id, remarks, personnel_id, client_id, fileToUpdate, id],
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

          // Insert a record into the "document_history" table
          insertDocumentHistory(id, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                Status: 'Error',
                Message: 'Error adding record to document_history table',
              });
            }

            console.log('Document updated in the database');
            return res.status(200).json({
              Status: 'Success',
              Message: 'Document updated in the database',
            });
          });
        }
      );
    }
  });
});


// UPDATE FOR STAFF
router.put('/updateDocumentNormal/:id', (req, res) => {
  const { id } = req.params;
  const { doc_type_id, dept_id, date_received, date_released, status_id, remarks, personnel_id, client_id } = req.body;

  if (!id) {
    return res.status(400).json({ Status: 'Error', Message: 'Invalid Document ID provided' });
  }

  const updateDocumentSQL = `
    UPDATE document
    SET
      doc_type_id = ?,
      dept_id = ?,
      date_received = ?,
      date_released = ?,
      status_id = ?,
      remarks = ?,
      personnel_id = ?,
      client_id = ?
    WHERE doc_ID = ?`;

  db.query(
    updateDocumentSQL,
    [doc_type_id, dept_id, date_received, date_released, status_id, remarks, personnel_id, client_id, id],
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

      console.log('Document updated in the database');
      return res.status(200).json({
        Status: 'Success',
        Message: 'Document updated in the database',
      });
    }
  );
});




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

  const userFirstName = req.headers.first_name;
  const userLastName = req.headers.last_name;

  if (!id) {
    return res.status(400).json({
      Status: "Error",
      Message: "Invalid Document ID provided",
    });
  }

  const getFilePathQuery = "SELECT file FROM document WHERE doc_id = ?";
  const deleteDocumentQuery = "DELETE FROM document WHERE doc_id = ?";
  const deleteTransactionQuery = "DELETE FROM transaction WHERE doc_id = ?";
  const insertActivityLogQuery = "INSERT INTO Activity_log (activity_ID, trans_ID, dateandtime, activity, user_account) VALUES (?, ?, ?, ?, ?)";
  const getHistoryFilePathQuery = "SELECT doc_history_ID, file FROM document_history WHERE doc_ID = ?";

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

        // Retrieve file paths from document_history table
        db.query(getHistoryFilePathQuery, [id], (historyErr, historyResult) => {
          if (historyErr) {
            console.error(historyErr);
            db.rollback(() => {
              return res.status(500).json({
                Status: "Error",
                Message: "Error getting file paths from document_history table",
              });
            });
          }

          // Delete files from communications-uploads-history for each entry in document_history
          historyResult.forEach((historyEntry) => {
            if (historyEntry.file) {
              const historyFilePath = join(uploadsHistoryPath, historyEntry.file);
              fs.unlink(historyFilePath, (unlinkErr) => {
                if (unlinkErr) {
                  console.error(unlinkErr);
                }
              });
            }
          });

          // Continue with document deletion
          const deleteDocumentAndLogActivity = () => {
            // Delete the document record
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

                const myDate = new Date();
                myDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' });
                const activityMessage = `Deleted doc_id: ${id} | File Name: ${result[0].file || "No file"}`;

                db.query(
                  insertActivityLogQuery,
                  [nextActivityID, null, myDate, activityMessage, `${userFirstName} ${userLastName}`],
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

                      console.log("Document deleted");
                      return res.status(200).json({
                        Status: "Success",
                        Message: "Document deleted",
                      });
                    });
                  }
                );
              });
            });
          };

          // Delete files from communications-uploads for the main document
          if (result.length > 0 && result[0].file) {
            const filePath = join(uploadsPath, result[0].file);

            fs.unlink(filePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error(unlinkErr);
              }
              // Continue to delete the document record whether file deletion was successful or not
              deleteDocumentAndLogActivity();
            });
          } else {
            // No file associated, directly delete the document record
            deleteDocumentAndLogActivity();
          }
        });
      });
    });
  });
});
     



  
  

  
  //last line sa admin:communication(documents)

export default router