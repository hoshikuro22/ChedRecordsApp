import express from 'express';
import mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chedrmis', 
});

router.get('/getActivityLog', (req, res) => {
  const sql = `
  SELECT
  al.activity_ID AS ActivityID,
  t.Trans_ID AS TransactionID,
  al.dateandtime AS DateAndTime,
  al.user_account AS UserAccount,
  al.activity AS Activity
FROM
  activity_log al
  LEFT JOIN transaction t ON al.trans_ID = t.Trans_ID;

  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching activity log:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch activity log' });
    }

    return res.status(200).json(data);
  });
});

export default router;
