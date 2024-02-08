import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import institutionsRoutes from "./routes/Institutions.js";
import institutionReportRoutes from "./routes/InstitutionReports.js";
import communicationsRoutes from "./routes/Communications.js";
import communicationReportRoutes from "./routes/CommunicationReports.js";
import documentTypesRoutes from "./routes/DocumentTypes.js";
import clientTypesRoutes from "./routes/ClientTypes.js";
import listofpersonnelsRoutes from "./routes/ListOfPersonnels.js";
import addaccountsRoutes from "./routes/AddAccounts.js";
import activitylogRoutes from "./routes/ActivityLog.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://https://ched-records-app.vercel.app/"],
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
        req.User_ID = decoded.user.User_ID;
        req.Email = decoded.user.Email;
        req.Password = decoded.user.Password;
        req.Username = decoded.user.Username;
        req.Contact_Number = decoded.user.Contact_Number;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({
    Status: "Logged in",
    First_Name: req.First_Name,
    Last_Name: req.Last_Name,
    User_type_ID: req.User_type_ID,
    User_ID: req.User_ID,
    Email: req.Email,
    Password: req.Password,
    Username: req.Username,
    Contact_Number: req.Contact_Number,
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE Username = ? ";
  db.query(sql, [req.body.Username], (err, data) => {
    if (err) return res.json({ Error: "Server Side Error" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.Password.toString(),
        data[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            const user = data[0];
            //  console.log("this is the user:"+ user); // Check the structure of 'user' here
            const token = jwt.sign({ user }, "secretkey", { expiresIn: "1d" });
            res
              .cookie("token", token, {
                httpOnly: true,
                // secure: true,
                sameSite: false,
                credentials: "include",
              })
              .json({
                Status: "Success",
                userType: user.User_type_ID,
                First_Name: user.First_Name,
                Last_Name: user.Last_Name,
                Username: user.Username,
              });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Message: "No Username existed" });
    }
  });
});

// UPDATE USER
app.put("/updateProfile", verifyUser, async (req, res) => {
  const {
    User_ID,
    First_Name,
    Last_Name,
    Email,
    NewPassword,
    User_type_ID,
    Username,
    Contact_Number,
  } = req.body;

  if (req.User_ID !== User_ID) {
    return res.status(403).json({
      Message: "Forbidden: You can only update your own user details.",
    });
  }

  try {
    let hashedPassword = null;

    if (NewPassword) {
      // Hash the new password if provided
      hashedPassword = await bcrypt.hash(NewPassword, 10); // Adjust the salt rounds as necessary
    }

    const sql = `
      UPDATE user 
      SET First_Name = ?, Last_Name = ?, Email = ?, Password = ?, User_type_ID = ?, Username = ?, Contact_Number = ? 
      WHERE User_ID = ?
    `;

    const values = [
      First_Name,
      Last_Name,
      Email,
      hashedPassword || req.Password,
      User_type_ID,
      Username,
      Contact_Number,
      User_ID,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return res
          .status(500)
          .json({ Status: "Error", Message: "Failed to update user details" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          Status: "Error",
          Message: "User not found or no changes applied",
        });
      }

      return res.status(200).json({
        Status: "Success",
        Message: "User details updated successfully",
        UpdatedUser: {
          User_ID,
          User_type_ID,
          First_Name,
          Last_Name,
          Email,
          Username,
          Contact_Number,
        },
      });
    });
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).json({
      Status: "Error",
      Message: "Server error while updating user details",
    });
  }
});

////
app.use("/", institutionsRoutes);
////
app.use("/", institutionReportRoutes);
////
app.use("/", communicationsRoutes);
////
app.use("/", communicationReportRoutes);
////
app.use("/", documentTypesRoutes);
////
app.use("/", clientTypesRoutes);
////
app.use("/", listofpersonnelsRoutes);
////
app.use("/", addaccountsRoutes);
////
app.use("/", activitylogRoutes);

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.listen(8081, () => {
  console.log("Server running!");
});