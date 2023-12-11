import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chedrmis', // Update with your actual database name
});

router.get('/getInstitutionReports', (req, res) => {
  const sql = `
    SELECT
      t.Trans_ID AS TransactionID,
      CONCAT(u.Last_Name, ', ', u.First_Name) AS SentBy,
      i.Inst_ID AS InstitutionID,
      i.Inst_Name AS InstitutionName,
      it.Type AS InstitutionType,
      i.Address,
      i.Seq_no,
      ct.Type AS ClientType,
      fc.Type AS FilingCategory,
      i.Contact_Person AS ContactPerson,
      i.Contact_Number AS ContactNumber,
      i.file AS File
    FROM
      transaction t
      JOIN user u ON t.User_ID = u.User_ID
      JOIN institution i ON t.Inst_ID = i.Inst_ID
      JOIN institution_type it ON i.Inst_type_ID = it.Inst_type_ID
      JOIN client_type ct ON i.Client_type_ID = ct.Client_type_ID
      JOIN filing_category fc ON i.Fil_cat_ID = fc.Fil_cat_ID;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching institution reports:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch institution reports' });
    }

    return res.status(200).json(data);
  });
});

export default router;
