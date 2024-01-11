import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chedrmis', 
});

router.get('/getInstitutionReports', (req, res) => {
  const sql = `
  SELECT
    t.Trans_ID AS TransactionID,
    CONCAT(u.Last_Name, ', ', u.First_Name) AS SentBy,
    i.Client_ID AS ClientID,
    i.Client_Name AS ClientName,
    i.Address,
    i.Seq_no,
    ct.Type AS ClientType,
    i.Contact_Person AS ContactPerson,
    i.Contact_Number AS ContactNumber
FROM
    transaction t
    JOIN user u ON t.User_ID = u.User_ID
    JOIN client i ON t.client_ID = i.Client_ID
    JOIN client_type ct ON i.Client_type_ID = ct.Client_type_ID
ORDER BY t.Trans_ID;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching client reports:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch client reports' });
    }

    return res.status(200).json(data);
  });
});

export default router;
