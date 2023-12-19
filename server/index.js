const sql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = sql.createConnection({
  host: "localhost",
  user: "Omar",
  port: 3306,
  password: "12345678",
  database: "BloodDonationSystem",
});

db.connect(function (err) {
  if (err) {
    console.log("ERROR connecting");
    throw err;
  }
  console.log("Connected!");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send({ role: "admin", user: result[0].Admin_ID });
      } else {
        db.query(
          "SELECT * FROM donor WHERE email = ? AND password = ?",
          [email, password],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result.length > 0) {
              res.send({
                role: "donor",
                user: result[0].Donor_ID,
                blood_type: result[0].blood_type,
                Drive_ID: result[0].Drive_ID,
                can_edit: result[0].can_edit,
              });
            } else {
              db.query(
                "SELECT * FROM recipient WHERE email = ? AND password = ?",
                [email, password],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                  if (result.length > 0) {
                    res.send({
                      role: "recipient",
                      recipient_id: result[0].Recipient_ID,
                      blood_type: result[0].blood_type,
                      amount_of_blood: result[0].amount_of_blood,
                      price: result[0].price,
                      can_edit: result[0].can_edit,
                    });
                  } else {
                    res.send({ role: "unknown", user: null });
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

app.use("/add_recipient", (req, res) => {
  const {
    fname,
    lname,
    address,
    mass,
    bdate,
    email,
    password,
    blood_type,
    amount,
    MedicalHistory,
  } = req.body;

  db.query(
    "INSERT INTO recipient (fname, lname, address, mass, bdate, email, password, blood_type, amount_of_blood, price) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      fname,
      lname,
      address,
      mass,
      bdate,
      email,
      password,
      blood_type,
      amount,
      amount * 0.1,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.send("Error");
      } else {
        const recipientId = result.insertId; 

            db.query(
              "INSERT INTO recipient_medical_history (Recipient_ID, MedicalHistory) VALUES (?,?)",
              [recipientId, MedicalHistory],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        });
      }
  );

app.use("/add_donor", (req, res) => {
  const {
    fname,
    lname,
    address,
    mass,
    driveID,
    bdate,
    email,
    password,
    blood_type,
    MedicalHistory,
  } = req.body;


  db.query(
    "INSERT INTO donor (fname, Drive_ID, lname, address, mass, bdate, email, password, blood_type, donation_count, donation_date, incident) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      fname,
      driveID,
      lname,
      address,
      mass,
      bdate,
      email,
      password,
      blood_type,
      0,
      null,
      MedicalHistory,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.send("Error");
      } else {
        // Get the last inserted donor id
        const donorId = result.insertId; 
            db.query(
              "INSERT INTO donor_medical_history (Donor_ID, MedicalHistory) VALUES (?,?)",
              [donorId, MedicalHistory],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        });
      }
  );

  app.use("/delete_donor", (req, res) => {
    const { id } = req.body;
  
    // 1. Delete donor's medical history
    db.query("DELETE FROM donor_medical_history WHERE Donor_ID = ?", [id], (err, result) => {
      if (err) {
        send(err);
      } else {
        // 2. Delete donor based on medical history deletion success
        db.query("DELETE FROM donor WHERE Donor_ID = ?", [id], (err, result) => {
          if (err) {
            send(err);
          } else {
            res.send(200);
          }
        });
      }
    });
  });
  

app.use("/delete_recipient", (req, res) => {
  const { id } = req.body;

  // 1. Delete recipient's medical history
  db.query("DELETE FROM recipient_medical_history WHERE Recipient_ID = ?", [id], (err, result) => {
    if (err) {
      send(err);
    } else {
      // 2. Delete recipient based on medical history deletion success
      db.query("DELETE FROM recipient WHERE Recipient_ID = ?", [id], (err, result) => {
        if (err) {
          send(err);
        } else {
          res.send(200);
        }
      });
    }
  });
});


app.use("/edit_donor", (req, res) => {
  const {
    id,
    fname,
    lname,
    address,
    mass,
    bdate,
    email,
    password,
    blood_type,
  } = req.body;
  const values = [];
  const fields = [];
  if (fname) {
    values.push(fname);
    fields.push("fname = ?");
  }
  if (lname) {
    values.push(lname);
    fields.push("lname = ?");
  }
  if (address) {
    values.push(address);
    fields.push("address = ?");
  }
  if (mass) {
    values.push(mass);
    fields.push("mass = ?");
  }
  if (bdate) {
    values.push(bdate);
    fields.push("bdate = ?");
  }
  if (email) {
    values.push(email);
    fields.push("email = ?");
  }
  if (password) {
    values.push(password);
    fields.push("password = ?");
  }
  if (blood_type) {
    values.push(blood_type);
    fields.push("blood_type = ?");
  }
  values.push(id);
  db.query(
    `UPDATE donor SET ${fields.join(", ")} WHERE Donor_ID = ?`,
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send(200);
      }
    }
  );
});

app.use("/edit_recipient", (req, res) => {
 
  const {
    id,
    fname,
    lname,
    address,
    mass,
    bdate,
    email,
    password,
    blood_type,
  } = req.body;
  console.log(req.body);
  const values = [];
  const fields = [];
  if (fname) {
    values.push(fname);
    fields.push("fname = ?");
  }
  if (lname) {
    values.push(lname);
    fields.push("lname = ?");
  }
  if (address) {
    values.push(address);
    fields.push("address = ?");
  }
  if (mass) {
    values.push(mass);
    fields.push("mass = ?");
  }
  if (bdate) {
    values.push(bdate);
    fields.push("bdate = ?");
  }
  if (email) {
    values.push(email);
    fields.push("email = ?");
  }
  if (password) {
    values.push(password);
    fields.push("password = ?");
  }
  if (blood_type) {
    values.push(blood_type);
    fields.push("blood_type = ?");
  }
  values.push(id);
  //console.log(values);
  db.query(
    `UPDATE recipient SET ${fields.join(", ")} WHERE Recipient_ID = ?`,
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send(200);
      }
    }
  );
});

app.use("/search_donor", (req, res) => {
  const { id } = req.body;

  db.query(
    "SELECT * FROM donor d LEFT JOIN donor_medical_history dmh ON d.Donor_ID = dmh.Donor_ID WHERE d.Donor_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        if (result.length === 0) {
          res.send({ message: "Donor not found" });
        } else {
          res.send(result);
        }
      }
    }
  );
});


app.use("/search_recipient", (req, res) => {
  const { id } = req.body;

  db.query(
    "SELECT * FROM recipient r LEFT JOIN recipient_medical_history rmh ON r.Recipient_ID = rmh.Recipient_ID WHERE r.Recipient_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        if (result.length === 0) {
          res.send({ message: "Recipient not found" });
        } else {
          res.send(result);
        }
      }
    }
  );
});


app.use("/start_blood_drive", (req, res) => {
  const { date } = req.body;
  let id = 0;
  db.query(
    "SELECT Drive_ID, Drive_date FROM blood_collection_drive ORDER BY Drive_ID DESC LIMIT 1",
    (err, result) => {
      //console.log(result);
      if (err) {
        console.log(err);
      } else {
        if (result.length === 0) {
          id = 1;
        } else {
          id = result[0].Drive_ID + 1;

          const lastDriveDate = new Date(result[0].Drive_date);
          const newDriveDate = new Date(date);
          const diffInMilliseconds = Math.abs(newDriveDate - lastDriveDate);
          const diffInMonths = diffInMilliseconds / (1000 * 60 * 60 * 24 * 30);

          if (diffInMonths < 3) {
            res.send("Not possible");
            return;
        }
        db.query(
          "INSERT INTO blood_collection_drive (Drive_ID, Drive_date) VALUES (?,?)",
          [id, date],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send("Error");
            } else {
              res.send(200);
            }
          }
        );
      }
    }
  }
  );
});

app.use("/start_blood_drive_location", (req, res) => {
  const { date,
    location, 
   } = req.body;
  let id = 2;
  db.query(
    "SELECT Drive_ID FROM blood_collection_drive ORDER BY Drive_ID DESC LIMIT 1",
    (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
      } else {
        if (result.length === 0) {
          id = 3;
        } else {
          id = result[0].Drive_ID+1;
        }
        db.query(
          "INSERT INTO blood_collection_drive (Drive_ID, Drive_date) VALUES (?,?)",
          [id, date],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send("Error");
            } else {
          
        db.query(
          "INSERT INTO location_collection_drive (Drive_ID, location_drive) VALUES (?,?)",
          [id, location],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send("Error");
            } else {
              res.send(200);
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

app.use("/donor_donation", (req, res) => {
  const { id, amount, incident, blood_type, drive_id } = req.body;
  let donation_date = new Date().toISOString().slice(0, 10);
  let expiry_date = new Date();
  expiry_date.setDate(expiry_date.getDate() + 60);
  expiry_date = expiry_date.toISOString().slice(0, 10);
  let donation_id=0;
  let donation_count=0;

  db.query(
    "SELECT MedicalHistory FROM donor_medical_history WHERE Donor_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (
          result[0].MedicalHistory.includes("HIV") ||
          result[0].MedicalHistory.includes("Hepatitis B") ||
          result[0].MedicalHistory.includes("Hepatitis C") ||
          result[0].MedicalHistory.includes("HTLV") ||
          result[0].MedicalHistory.includes("Syphilis") ||
          result[0].MedicalHistory.includes("Chagas") ||
          result[0].MedicalHistory.includes("Cancer")
        ) {
          res.send("history");
          return;
        }
      }
    }
  );

  if (amount === 0) {
    res.send("NO");
    return;
  } else {
    db.query(
      "SELECT Donation_ID FROM blood ORDER BY Donation_ID DESC LIMIT 1",
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else {
          if (result[0] === 1) {
            console.log("HERE");
            donation_id = 2;
          } else {
            console.log("HERE2");
            if (result.length===0){
              donation_id=1;
            }
            else{
              donation_id = result[0].Donation_ID + 1;
            }
            
          }

          console.log(donation_id);

          db.query(
            "SELECT donation_count FROM donor WHERE Donor_ID = ?",
            [id],
            (err, result) => {
              console.log("HERE3");
              if (err) {
                console.log(err);
              } else {
                console.log(result)
                donation_count = result.length === 0 ? 1 : result[0].donation_count + 1;
                db.query(
                  "UPDATE donor SET donation_count = ?, donation_date = ?, incident = ? WHERE Donor_ID = ?",
                  [donation_count, donation_date, incident, id],
                  (err, result) => {
                    console.log("HERE4");
                    if (err) {
                      console.log("HERE9");
                      console.log(err);
                      res.send("Error");
                    }
                  }
                ); console.log("HERE999");

                if (incident === "") {
                  db.query(
                    "INSERT INTO blood (Donation_ID, blood_type, expiry_date, quantity, Drive_ID) VALUES (?,?,?,?,?)",
                    [donation_id, blood_type, expiry_date, amount, drive_id],
                    (err, result) => {
                      console.log("HERE5");
                      if (err) {
                        console.log(err);
                        res.send("Error");
                      } else {
                        res.send(200);
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    );
  }
});

app.use("/recipient_payed", (req, res) => {
  const { recipient_id } = req.body;
  console.log(recipient_id);
  db.query(
    "UPDATE recipients SET price = 0 WHERE Recipient_ID = ?",
    [recipient_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send(200);
      }
    }
  );
});

app.use("/get_blood_requests", (req, res) => {
  db.query(
    "SELECT Recipient_ID, blood_type, amount_of_blood FROM recipients WHERE amount_of_blood > 0 AND order_status = 'pending' AND price = 0",
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send(result);
      }
    }
  );
});

app.use("/confirm_blood_transfer", (req, res) => {
  const { recipient_id, blood_type, amount_of_blood } = req.body;

  if (blood_type === "AB+") {
    db.query(
      "SELECT * FROM blood WHERE blood_type = 'O-' OR blood_type = 'O+' OR blood_type = 'A-' OR blood_type = 'A+' OR blood_type = 'B-' OR blood_type = 'B+' OR blood_type = 'AB-' OR blood_type = 'AB+'",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          let amount = amount_of_blood;
          for (let i = 0; i < result.length; i++) {
            if (amount > 0) {
              if (result[i].quantity > amount) {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [result[i].quantity - amount, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = 0;
              } else {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [0, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = amount - result[i].quantity;
              }
            }
          }

          if (amount > 0) {
            // Not enough blood was available to fulfill the request
            db.query(
              "UPDATE recipient SET order_status = 'pending', amount_of_blood = ? WHERE Recipient_ID = ?",
              [amount, recipient_id]
            );
            res.send("Not enough blood available");
          } else {
            db.query(
              "UPDATE recipient SET order_status = 'completed', amount_of_blood = 0 WHERE Recipient_ID = ?",
              [recipient_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        }
      }
    );
  } else if (blood_type === "AB-") {
    db.query(
      "SELECT * FROM blood WHERE blood_type = 'O-' OR blood_type = 'A-' OR blood_type = 'B-' OR blood_type = 'AB-'",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          let amount = amount_of_blood;
          for (let i = 0; i < result.length; i++) {
            if (amount > 0) {
              if (result[i].quantity > amount) {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [result[i].quantity - amount, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = 0;
              } else {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [0, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = amount - result[i].quantity;
              }
            }
          }

          if (amount > 0) {
            // Not enough blood was available to fulfill the request
            db.query(
              "UPDATE recipient SET order_status = 'pending', amount_of_blood = ? WHERE Recipient_ID = ?",
              [amount, recipient_id]
            );
            res.send("Not enough blood available");
          } else {
            db.query(
              "UPDATE recipient SET order_status = 'completed', amount_of_blood = 0 WHERE Recipient_ID = ?",
              [recipient_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        }
      }
    );
  } else if (blood_type === "A+") {
    db.query(
      "SELECT * FROM blood WHERE blood_type = 'O-' OR blood_type = 'O+' OR blood_type = 'A-' OR blood_type = 'A+'",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          let amount = amount_of_blood;
          for (let i = 0; i < result.length; i++) {
            if (amount > 0) {
              if (result[i].quantity > amount) {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [result[i].quantity - amount, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = 0;
              } else {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [0, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = amount - result[i].quantity;
              }
            }
          }

          if (amount > 0) {
            // Not enough blood was available to fulfill the request
            db.query(
              "UPDATE recipient SET order_status = 'pending', amount_of_blood = ? WHERE Recipient_ID = ?",
              [amount, recipient_id]
            );
            res.send("Not enough blood available");
          } else {
            db.query(
              "UPDATE recipient SET order_status = 'completed', amount_of_blood = 0 WHERE Recipient_ID = ?",
              [recipient_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        }
      }
    );
  } else if (blood_type === "A-") {
    db.query(
      "SELECT * FROM blood WHERE blood_type = 'O-' OR blood_type = 'A-'",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          let amount = amount_of_blood;
          for (let i = 0; i < result.length; i++) {
            if (amount > 0) {
              if (result[i].quantity > amount) {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [result[i].quantity - amount, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = 0;
              } else {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [0, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = amount - result[i].quantity;
              }
            }
          }

          if (amount > 0) {
            // Not enough blood was available to fulfill the request
            db.query(
              "UPDATE recipient SET order_status = 'pending', amount_of_blood = ? WHERE Recipient_ID = ?",
              [amount, recipient_id]
            );
            res.send("Not enough blood available");
          } else {
            db.query(
              "UPDATE recipient SET order_status = 'completed', amount_of_blood = 0 WHERE Recipient_ID = ?",
              [recipient_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        }
      }
    );
  } else if (blood_type === "B+") {
    db.query(
      "SELECT * FROM blood WHERE blood_type = 'O-' OR blood_type = 'O+' OR blood_type = 'B-' OR blood_type = 'B+'",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          let amount = amount_of_blood;
          for (let i = 0; i < result.length; i++) {
            if (amount > 0) {
              if (result[i].quantity > amount) {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [result[i].quantity - amount, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = 0;
              } else {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [0, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = amount - result[i].quantity;
              }
            }
          }

          if (amount > 0) {
            // Not enough blood was available to fulfill the request
            db.query(
              "UPDATE recipient SET order_status = 'pending', amount_of_blood = ? WHERE Recipient_ID = ?",
              [amount, recipient_id]
            );
            res.send("Not enough blood available");
          } else {
            db.query(
              "UPDATE recipient SET order_status = 'completed', amount_of_blood = 0 WHERE Recipient_ID = ?",
              [recipient_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        }
      }
    );
  } else if (blood_type === "B-") {
    db.query(
      "SELECT * FROM blood WHERE blood_type = 'O-' OR blood_type = 'B-'",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          let amount = amount_of_blood;
          for (let i = 0; i < result.length; i++) {
            if (amount > 0) {
              if (result[i].quantity > amount) {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [result[i].quantity - amount, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = 0;
              } else {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [0, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = amount - result[i].quantity;
              }
            }
          }

          if (amount > 0) {
            // Not enough blood was available to fulfill the request
            db.query(
              "UPDATE recipient SET order_status = 'pending', amount_of_blood = ? WHERE Recipient_ID = ?",
              [amount, recipient_id]
            );
            res.send("Not enough blood available");
          } else {
            db.query(
              "UPDATE recipient SET order_status = 'completed', amount_of_blood = 0 WHERE Recipient_ID = ?",
              [recipient_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        }
      }
    );
  } else if (blood_type === "O+") {
    db.query(
      "SELECT * FROM blood WHERE blood_type = 'O-' OR blood_type = 'O+'",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          let amount = amount_of_blood;
          for (let i = 0; i < result.length; i++) {
            if (amount > 0) {
              if (result[i].quantity > amount) {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [result[i].quantity - amount, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = 0;
              } else {
                db.query(
                  "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                  [0, result[i].Donation_ID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send("Error");
                    }
                  }
                );
                amount = amount - result[i].quantity;
              }
            }
          }

          if (amount > 0) {
            // Not enough blood was available to fulfill the request
            db.query(
              "UPDATE recipient SET order_status = 'pending', amount_of_blood = ? WHERE Recipient_ID = ?",
              [amount, recipient_id]
            );
            res.send("Not enough blood available");
          } else {
            db.query(
              "UPDATE recipient SET order_status = 'completed', amount_of_blood = 0 WHERE Recipient_ID = ?",
              [recipient_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send("Error");
                } else {
                  res.send(200);
                }
              }
            );
          }
        }
      }
    );
  } else {
    db.query("SELECT * FROM blood WHERE blood_type = 'O-'", (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        let amount = amount_of_blood;
        for (let i = 0; i < result.length; i++) {
          if (amount > 0) {
            if (result[i].quantity > amount) {
              db.query(
                "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                [result[i].quantity - amount, result[i].Donation_ID],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.send("Error");
                  }
                }
              );
              amount = 0;
            } else {
              db.query(
                "UPDATE blood SET quantity = ? WHERE Donation_ID = ?",
                [0, result[i].Donation_ID],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.send("Error");
                  }
                }
              );
              amount = amount - result[i].quantity;
            }
          }
        }

        if (amount > 0) {
          // Not enough blood was available to fulfill the request
          db.query(
            "UPDATE recipient SET order_status = 'pending', amount_of_blood = ? WHERE Recipient_ID = ?",
            [amount, recipient_id]
          );
          res.send("Not enough blood available");
        } else {
          db.query(
            "UPDATE recipient SET order_status = 'completed', amount_of_blood = 0 WHERE Recipient_ID = ?",
            [recipient_id],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send("Error");
              } else {
                res.send(200);
              }
            }
          );
        }
      }
    });
  }
});
