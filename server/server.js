const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DBMS',
    database: 'healthcare'
});
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

//Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const select_user_sql = 'SELECT * FROM users where email=? and password=?';
    connection.query(select_user_sql, [email, password], (error, results) => {
        console.log(results)
        if (error) {
            console.error(error.stack)
            res.status(500).json({ message: 'Login Error' });
            return;
        } else if (results.length === 0) {
            console.log(results)
            res.json({ message: 'Invalid Email or password' });
            return;
        } else {
            res.json({ message: 'success', user_id: results[0].user_id, user_name: results[0].firstname + " " + results[0].lastname });
        }
    });
});
app.post('/doctorlogin', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const select_doctor_sql = 'SELECT * FROM doctors WHERE email = ? AND Password = ?';
    connection.query(select_doctor_sql, [email, password], (error, results) => {
        if (error) {
            console.error('Error logging in:', error.stack);
            res.status(500).json({ message: 'Error logging in' });
            return;
        } else if (results.length === 0) {
            console.log(results)
            res.json({ message: 'Invalid email or password' });

        } else {
            console.log('Doctor logged in successfully');
            return res.json({ message: 'success', doctor_id: results[0].doctor_id, doctor_name: results[0].name });
        }

    });
});
app.post('/adminlogin', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const select_admin_sql = 'SELECT * FROM admins where email=? and password=?';
    connection.query(select_admin_sql, [email, password], (error, results) => {
        console.log(results)
        if (error) {
            console.error(error)
            res.status(500).send('Login Error');
            return;
        } else if (results.length === 0) {
            console.log(results)
            res.json({ message: 'Invalid Email or password' });
        } else {
            res.json({ message: 'success', admin_id: results[0].hospital_id, admin_name: results[0].name });
        }
    });
});

//Registation
app.post('/register', (req, res) => {
    console.log(req.body)
    const { firstname, lastname, email, password, mobile, address } = req.body;
    const insert_user_sql = 'INSERT INTO users (firstname, lastname, email, password, mobile, address) VALUES (?,?,?,?,?,?)';
    connection.query(insert_user_sql, [firstname, lastname, email, password, mobile, address], (error, result) => {
        console.log(result);
        if (error) {
            res.status(500).json({ message: 'Unable to register' });
            return;
        }
        res.status(200).json({ message: "success" });
    })
})
app.post('/doctorregister', (req, res) => {
    const doctor = req.body;
    const insert_doctor_sql = 'INSERT INTO doctors SET ?'
    connection.query(insert_doctor_sql, doctor, (error, results) => {
        if (error) {
            console.error('Error registering doctor: ' + error.stack);
            res.status(500).json({ message: 'Error registering doctor' });
            return;
        } else {
            console.log('Doctor registered successfully', results);
            res.status(200).json({ message: 'success' });
            return;
        }

    });
});
app.post('/adminregister', (req, res) => {
    console.log(req.body)
    const { name, email, password, hospital, address } = req.body;
    const insert_admin_sql = 'INSERT INTO admins (name, email, password,hospital, address) VALUES (?,?,?,?,?)';
    connection.query(insert_admin_sql, [name, email, password, hospital, address], (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Unable to register' });
            return;
        } else {
            console.log(result);
            res.status(200).json({ message: "success" });
        }

    });
});

//profile
app.get('/userprofile/:id', (req, res) => {
    const id = req.params.id;
    const select_user_sql = 'SELECT * FROM users where user_id=?';
    connection.query(select_user_sql, [id], (error, result) => {
        if (error) {
            console.error(error);
            res.json({ Message: "Internal server error" });
            return;
        } else
            return res.status(200).json(result);
    })

})
app.get('/adminprofile/:id', (req, res) => {
    const id = req.params.id;
    const select_admin_sql = 'select * from admins where hospital_id=?';
    connection.query(select_admin_sql, [id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ Message: "Internal server error" });
            return;
        } else
            return res.status(200).json(result);
    })
})
app.get('/doctorprofile/:id', (req, res) => {
    const id = req.params.id;
    const select_doctor_sql = 'select * from doctors where doctor_id=?';
    connection.query(select_doctor_sql, [id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ Message: "Internal server error" });
            return;
        } else
            return res.status(200).json(result);
    })
})
//Update profile
app.put(`/updateprofile/:id`, (req, res) => {
    console.log(req.body);
    const { firstname, lastname, email, password, mobile, address } = req.body;
    const update_user_sql = 'UPDATE users SET `firstname`=?,`lastname`=?,`email`=?,`password`=?,`mobile`=?,`address`=? WHERE `user_id`=?';
    const id = req.params.id;
    connection.query(update_user_sql, [firstname, lastname, email, password, mobile, address, id], (error, result) => {
        console.log(result);
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to update' });
            return;
        } else
            res.status(200).json({ message: 'updated' })
    })
})
app.put('/updateadmin/:hospital_id', (req, res) => {
    const hospitalId = req.params.hospital_id;
    const { name, Email, Password, hospital, address } = req.body;

    const updateAdminQuery = `UPDATE admins SET 
                              name = ?,
                              Email = ?,
                              Password = ?,
                              hospital = ?,
                              address = ?
                              WHERE hospital_id = ?`;

    connection.query(updateAdminQuery, [name, Email, Password, hospital, address, hospitalId], (err, result) => {
        if (err) {
            res.status(500).send({ Error: 'Error updating admin' });
        } else {
            res.status(200).send({ message: 'updated' });
        }
    });
});

//doctors
app.get('/doctors', (req, res) => {
    const doctor_hospital_sql = 'SELECT d.doctor_id, d.name, d.email, d.mobile, d.hospital_id, a.hospital AS hospital_name, d.speciality, d.experience, d.qualification, d.fee FROM doctors d INNER JOIN admins a ON d.hospital_id = a.hospital_id';
    connection.query(doctor_hospital_sql, (error, result) => {
        if (error) {
            // console.error(error);
            res.status(500).json({ Message: "Error fetching data from database" });
            return;
        } else {
            return res.status(200).json(result);
        }
    })
})
app.get('/doctors/:hospitalId', (req, res) => {
    const hospitalId = req.params.hospitalId;
    const sql = `SELECT doctor_id, name, email, mobile, speciality, experience, qualification, fee 
                 FROM doctors 
                 WHERE hospital_id = ?`;

    connection.query(sql, [hospitalId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});
app.get('/appointmentdoctor/:id', (req, res) => {
    const doctorId = req.params.id;
    const query = `
      SELECT d.doctor_id, d.name AS doctor_name, d.email AS doctor_email, d.mobile AS doctor_mobile,
             d.speciality, d.experience, d.qualification, d.fee,
             a.name AS hospital_name, a.address AS hospital_address
      FROM doctors d
      JOIN admins a ON d.hospital_id = a.hospital_id
      WHERE d.doctor_id = ?;
    `;
  
    connection.query(query, [doctorId], (error, results) => {
      if (error) {
        console.error('Error fetching doctor details: ', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ message: 'Doctor not found' });
        return;
      }
  
      res.json(results[0]);
    });
});
  
app.put('/updatedoctor/:id', (req, res) => {
    const doctorId = req.params.id;
    const updatedDoctor = req.body;
  
    connection.query('UPDATE doctors SET ? WHERE doctor_id = ?', [updatedDoctor, doctorId], (error, results) => {
      if (error){
        // console.Error(Error)
        return res.status(500).json({message:"unable to update"});
      } 
      res.status(200).json({ message: 'updated' });
    });
});
  
//hospital
app.get('/hospitals', (req, res) => {
    connection.query('SELECT hospital_id,hospital FROM admins', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ Message: "Internal server error" });
            return;
        } else {
            res.status(200).json(result);
        }
    })
})


//appointment
app.post('/bookappointment/:id', (req, res) => {
    const { user_id, age, weight, bloodpressure, height, disease, symptoms, appointment_date, appointment_time } = req.body;
    const doctor_id = req.params.id;
    const appointment_sql = `INSERT INTO appointments (doctor_id, user_id, age, weight, bloodpressure, height, disease, symptoms,appointment_date, appointment_time,confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [doctor_id, user_id, age, weight, bloodpressure, height, disease, symptoms, appointment_date, appointment_time, false];

    connection.query(appointment_sql, values, (error, result) => {
        if (error) {
            // console.error(error);
            res.status(500).json({ message: 'Error inserting appointment' });
            return;
        }
        console.log('Appointment inserted successfully');
        res.status(200).json({ message: 'success' });
    });
});
app.get('/userappointment/:id', (req, res) => {
    const userId = req.params.id;
    const sql = `SELECT appointments.*, doctors.name FROM appointments INNER JOIN doctors ON appointments.doctor_id = doctors.doctor_id WHERE appointments.user_id = ?`;

    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).json({ message: 'Error retrieving appointments' });
        } else {
            res.json(results);
        }
    });
});
app.get('/doctorappointment/:id', (req, res) => {
    const doctorId = req.params.id;
    const sql = `SELECT appointments.*, users.firstname , users.lastname
    FROM appointments
    INNER JOIN users ON appointments.user_id = users.user_id
    WHERE appointments.doctor_id = ?`;

    connection.query(sql, [doctorId], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).json({ message: 'Error retrieving appointments' });
        } else {
            res.json(results);
        }
    });
});

app.put('/confirmappointment/:id', (req, res) => {
    const id = req.params.id;
    connection.query('UPDATE appointments SET confirmed=true where appointmentid=?', [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            return res.json({ message: 'Appointment Confirmed' });
        }
    });
});

app.delete('/deleteappointment/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM appointments WHERE appointmentid = ?', [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            return res.json({ message: 'Appointment deleted' });
        }
    });
});
// for admin
app.get('/counthospitaldoctors/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT COUNT(*) AS num_doctors FROM doctors WHERE hospital_id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Error fetching Doctors' });
            return;
        }
        res.json({ count: results[0].num_doctors });
    });
});
app.get('/countAppointments/:hospitalId', (req, res) => {
    const hospitalId = req.params.hospitalId;
    const query = `
      SELECT COUNT(*) AS num_appointments
      FROM appointments
      JOIN doctors ON appointments.doctor_id = doctors.doctor_id
      WHERE doctors.hospital_id = ?
    `;
    connection.query(query, [hospitalId], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ message: 'Error fetching Appointment' });
            return;
        }
        const appointmentsCount = results[0].num_appointments;
        res.json({ appointmentsCount });
    });
});
app.get('/countusers_with_appointments/:id', (req, res) => {
    const id = req.params.id;
    const query = `
      SELECT COUNT(DISTINCT u.user_id) AS num_users_with_appointments
      FROM users u
      JOIN appointments a ON u.user_id = a.user_id
      JOIN doctors d ON a.doctor_id = d.doctor_id
      WHERE d.hospital_id = ?
    `;
    connection.query(query,[id], (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ message: 'Error fetching Users' });
        return;
      }
      const numUsersWithAppointments = results[0].num_users_with_appointments;
      res.json({ numUsersWithAppointments });
    });
});
app.get('/hospitalappointments/:hospitalId', (req, res) => {
    const hospitalId = req.params.hospitalId;

    const query = `
        SELECT u.user_id, u.firstname AS user_firstname, u.lastname AS user_lastname, u.email AS user_email, u.mobile AS user_mobile, u.address AS user_address,
        a.appointmentid, a.age, a.weight, a.bloodpressure, a.height, a.disease, a.symptoms, a.appointment_date, a.appointment_time, a.confirmed,
        d.doctor_id, d.name AS doctor_name, d.email AS doctor_email, d.mobile AS doctor_mobile, d.speciality, d.experience, d.qualification, d.fee
        FROM users u
        JOIN appointments a ON u.user_id = a.user_id
        JOIN doctors d ON a.doctor_id = d.doctor_id
        WHERE d.hospital_id = ?;
    `;
    connection.query(query, [hospitalId], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({message:'Internal Server Error'});
            return;
        }
        res.json(results);
    });
});
app.get('/hospitalappointmentreport/:hospitalId/:appointmentId', (req, res) => {
    const hospitalId = req.params.hospitalId;
    const appointmentId = req.params.appointmentId;
    
    const query = `
      SELECT u.user_id, u.firstname AS user_firstname, u.lastname AS user_lastname, u.email AS user_email, u.mobile AS user_mobile, u.address AS user_address,
        a.appointmentid, a.age, a.weight, a.bloodpressure, a.height, a.disease, a.symptoms, a.appointment_date, a.appointment_time, a.confirmed,
        d.doctor_id, d.name AS doctor_name, d.email AS doctor_email, d.mobile AS doctor_mobile, d.speciality, d.experience, d.qualification, d.fee
      FROM users u
      JOIN appointments a ON u.user_id = a.user_id
      JOIN doctors d ON a.doctor_id = d.doctor_id
      WHERE d.hospital_id = ? and a.appointmentid = ?`;
    
    connection.query(query, [hospitalId, appointmentId], (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.stack);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }
      res.json(results);
    });
  });
  


app.listen(8080, () => {
    console.log('server running')
})