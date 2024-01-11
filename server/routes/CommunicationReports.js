import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chedrmis', // Update with your actual database name
});

router.get('/getCommunicationReports', (req, res) => {
  const sql = `
  SELECT
    t.Trans_ID AS TransactionID,
    CONCAT(u.Last_Name, ', ', u.First_Name) AS SentBy,
    d.Doc_ID AS DocID,
    d.File,
    CONCAT(lp.Last_Name, ', ', lp.First_Name) AS Assignatories,
    dt.Type AS DocumentType,
    d.Date_Received AS DateReceived,
    d.Date_Released AS DateReleased,
    d.Remarks,
    dep.Type AS Department,
    s.Type AS Status,
    i.client_name as client_name
FROM
    transaction t
    JOIN user u ON t.User_ID = u.User_ID
    JOIN document d ON t.Doc_ID = d.Doc_ID
    JOIN list_personnel lp ON d.Personnel_ID = lp.Personnel_ID
    JOIN document_type dt ON d.Doc_Type_ID = dt.Doc_Type_ID
    JOIN department dep ON d.dept_ID = dep.dept_ID
    JOIN status s ON d.Status_ID = s.Status_ID
    JOIN client i ON d.client_ID = i.client_ID
ORDER BY t.Trans_ID;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching communication reports:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch communication reports' });
    }

    return res.status(200).json(data);
  });
});

export default router;
