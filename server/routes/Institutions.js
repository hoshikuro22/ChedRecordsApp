import express from "express";
import mysql from "mysql"
import multer from "multer"; 
// import fs from "fs";


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
  
  
//first line sa admin:instituion(chedclients)



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

// Function to find the next available primary key for the Activity_Log table
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

router.post("/addClient", async (req, res) => {
  const {
    
    seq_no,
    clientID,
    clientName,
    address,
    clientType,
    email,
    contactPerson,
    contactNumber,
    userID,
  } = req.body;


  try {
    console.log("Received request with clientID:", clientID);
    // Get the maximum Trans_ID from the "transaction" table
    const maxTransID = await getMaxTransID();

    // Get the next available primary key for the Activity_Log table
    const nextActivityLogId = await getNextActivityLogId();

    // Use a transaction to ensure consistency across tables
    const result = await new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          console.error("Error in beginTransaction:", err);
          reject(err);
        }

        const institutionInsertQuery =
          "INSERT INTO client (seq_no, client_id, client_name, address, client_type_id, email, contact_person, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const institutionInsertValues = [
          seq_no,
          clientID,
          clientName,
          address,
          clientType,
          email,
          contactPerson,
          contactNumber,
          // file.filename,
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
              const transactionInsertQuery =
                "INSERT INTO transaction (Trans_ID, User_ID, Doc_ID, client_ID) VALUES (?, ?, ?, ?)";
              const transactionInsertValues = [
                nextTransID,
                userID,
                null,
                clientID,
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
                    // Fetch user details to get first_name and last_name
                    const getUserQuery =
                      "SELECT First_Name, Last_Name FROM user WHERE user_ID = ?";
                    db.query(getUserQuery, [userID], (err, userResult) => {
                      if (err) {
                        console.error("Error in getUserQuery:", err);
                        db.rollback(() => reject(err));
                      } else {
                        const { First_Name, Last_Name } = userResult[0];
                        const userAccount = `${First_Name} ${Last_Name}`;
                        const myDate = new Date();
                        myDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' });

                        // Add a record to the "Activity_Log" table
                        const activityLogInsertQuery =
                          "INSERT INTO Activity_Log (activity_ID, trans_ID, dateandtime, activity, user_account) VALUES (?, ?, ?, ?, ?)";
                        const activityLogInsertValues = [
                          nextActivityLogId,
                          nextTransID,
                          myDate,
                          `Added client_id: ${clientID} `,
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
                    });
                  }
                }
              );
            }
          }
        );
      });
    });

    console.log(
      "Institution, Transaction, and Activity_Log added to the database"
    );
    return res.json({
      Status: "Success",
      Message:
        "Institution, Transaction, and Activity_Log added to the database",
    });
  } catch (error) {
    console.error("Error in try-catch block:", error);
    return res.status(500).json({
      Status: "Error",
      Message:
        "Error adding institution, transaction, and activity log to the database",
    });
  }
});




  
 // READ
router.get("/getClients", (req, res) => {
  const sql = `
    SELECT
      CAST(i.seq_no AS SIGNED) as seq_no,
      i.client_id,
      i.client_name,
      i.client_type_id,
      ct.type as client_type,
      i.email,
      i.address,
      i.contact_person,
      i.contact_number
    FROM client i
    JOIN client_type ct ON i.client_type_id = ct.client_type_id
    ORDER BY i.client_name; `;  // Updated ORDER BY clause
  
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

  // endpoint to get the count of client
router.get("/getClientCount", (req, res) => {
  const sql = `
    SELECT COUNT(*) AS clientCount FROM client;
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching client count:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Failed to fetch client count",
      });
    }

    const clientCount = result[0].clientCount;
    return res.status(200).json({ clientCount });
  });
});

 // endpoint to get the count of Client Types of clients
router.get("/getClientTypeCounts", (req, res) => {
  const sql = `
    SELECT client_type.type, COUNT(*) as count
    FROM client
    JOIN client_type ON client.client_type_id = client_type.client_type_id
    GROUP BY client_type.type;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching client type counts:", err);
      return res.status(500).json({ status: "Error", message: "Failed to fetch client type counts" });
    }

    return res.status(200).json(results);
  });
});

 // endpoint to get the count of Client Types of clients
 router.get("/getClientNameCounts", (req, res) => {
  const sql = `
    SELECT client_name, COUNT(*) as count
    FROM client
    GROUP BY client.client_name;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching client type counts:", err);
      return res.status(500).json({ status: "Error", message: "Failed to fetch client type counts" });
    }

    return res.status(200).json(results);
  });
});
  

  

// DELETE
router.delete("/deleteClient/:id", (req, res) => {
  const { id } = req.params;

  // Extract user information from headers
  const userFirstName = req.headers.first_name;
  const userLastName = req.headers.last_name;

  console.log("First Name:", userFirstName);
  console.log("Last Name:", userLastName);

  if (!id) {
    return res.status(400).json({
      Status: "Error",
      Message: "Invalid client ID provided",
    });
  }

  const deleteClientQuery = "DELETE FROM client WHERE client_id = ?";
  const deleteTransactionQuery = "DELETE FROM transaction WHERE client_ID = ?";
  const insertActivityLogQuery = "INSERT INTO Activity_log (activity_ID, trans_ID, dateandtime, activity, user_account) VALUES (?, ?, ?, ?, ?)";

  db.beginTransaction((err) => {
    if (err) {
      console.error("Error in beginTransaction:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Error starting transaction",
      });
    }

    // Delete the corresponding transaction records
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

      // Get the current activity_ID
      db.query("SELECT MAX(activity_ID) AS maxActivityID FROM Activity_log", (maxActivityIDErr, maxActivityIDResult) => {
        if (maxActivityIDErr) {
          console.error(maxActivityIDErr);
          db.rollback(() => {
            return res.status(500).json({
              Status: "Error",
              Message: "Error getting max activity_ID from Activity_log",
            });
          });
        }

        const newActivityID = maxActivityIDResult[0].maxActivityID + 1;

        // Insert activity log
        const activityMessage = `Deleted client ID: ${id}`;
        const myDate = new Date();
        myDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' });

        db.query(
          insertActivityLogQuery,
          [newActivityID, null, myDate, activityMessage, `${userFirstName} ${userLastName}`],
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

            // Delete the client record
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
          }
        );
      });
    });
  });
});



  // UPDATE
router.put('/updateClient/:id', (req, res) => {
  const { id } = req.params;
  const {
    client_name,
    address,
    client_type_id,
    email,
    contact_person,
    contact_number,
  } = req.body;

  if (!id) {
    return res.status(400).json({ Status: 'Error', Message: 'Invalid client ID provided' });
  }

  const updateInstitutionSQL = `
    UPDATE client 
    SET client_name=?, address=?, client_type_id=?, email=?, contact_person=?, contact_number=? 
    WHERE client_id=?`;

  db.query(
    updateInstitutionSQL,
    [
      client_name,
      address,
      client_type_id,
      email,
      contact_person,
      contact_number,
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

      console.log('Client updated in the database');
      return res.status(200).json({
        Status: 'Success',
        Message: 'Client updated in the database',
      });
    }
  );
});




  // last line sa admin:instituion(chedclients)
 
 
  export default router;