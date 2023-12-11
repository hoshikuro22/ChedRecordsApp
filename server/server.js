import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import institutionsRoutes from './routes/Institutions.js';
import institutionReportRoutes from './routes/InstitutionReports.js';
import communicationsRoutes from './routes/Communications.js';
import communicationReportRoutes from './routes/CommunicationReports.js';
import listofpersonnelsRoutes from './routes/ListOfPersonnels.js';
import addaccountsRoutes from './routes/AddAccounts.js';


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chedrmis",
});




/////////////////////
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "You need to log in to access" });
  } else {
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error" });
      } else {
        // console.log(decoded); // Check the structure of 'decoded' here
        req.First_Name = decoded.user.First_Name;
        req.Last_Name = decoded.user.Last_Name;
        req.User_type_ID = decoded.user.User_type_ID;
        req.User_ID = decoded.user.User_ID
        next();
      }
    });
    
  }
};


app.get('/', verifyUser, (req, res) => {
  return res.json({ Status: "Logged in", First_Name: req.First_Name, Last_Name : req.Last_Name, User_type_ID: req.User_type_ID, User_ID: req.User_ID});
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE Email = ? ";
  db.query(sql, [req.body.Email], (err, data) => {
    if (err) return res.json({Error: "Server Side Error" });
    if (data.length > 0 ) {
        bcrypt.compare(req.body.Password.toString(), data[0].Password, (err, response) => {
          if(err) return res.json({Error: "Password compare error" });
          if (response) {
            const user = data[0];
          //  console.log("this is the user:"+ user); // Check the structure of 'user' here
            const token = jwt.sign({user}, "secretkey", {expiresIn: '1d'});
            res.cookie('token', token, { httpOnly: true, secure: true})
            return res.json({Status: "Success", userType: user.User_type_ID, First_Name: user.First_Name, Last_Name: user.Last_Name });
          } else {
            return res.json({Error: "Password not matched" });
          }
        })
    } else {
      return res.json({ Message: "No email existed" });
    }
  })
}) 
 

 
////
app.use("/", institutionsRoutes);
////
app.use("/", institutionReportRoutes); 
////
app.use("/", communicationsRoutes);
////
app.use("/", communicationReportRoutes);
////
app.use("/", listofpersonnelsRoutes);
////
app.use('/', addaccountsRoutes);
////


app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});



app.listen(8081, () => {
  console.log("Running");
});
