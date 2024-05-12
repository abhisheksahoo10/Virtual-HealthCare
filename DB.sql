use healthcare;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(30) UNIQUE,
    password VARCHAR(30),
    mobile varchar(10),
    address varchar(50)
);
desc users;
select * from users; 

CREATE TABLE admins (
    hospital_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) ,
    Email VARCHAR(30) UNIQUE,
    Password VARCHAR(30),
    hospital VARCHAR(50),
    address VARCHAR(50)
);
desc admins;
select * from admins;


CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
	email VARCHAR(30) UNIQUE,
    Password VARCHAR(30),
    mobile varchar(10),
    hospital_id INT,
    speciality VARCHAR(50),
    experience INT,
    qualification VARCHAR(30),
    fee DECIMAL(10, 2)
);

desc doctors;
select * from doctors ;

ALTER TABLE doctors ADD CONSTRAINT fk_hospital_id FOREIGN KEY (hospital_id) REFERENCES admins(hospital_id);

SELECT doctors.name AS doctor_name, admins.name AS hospital_name
FROM doctors
JOIN admins ON doctors.hospital_id = admins.hospital_id;

SELECT d.doctor_id, d.name, d.email, d.mobile, d.hospital_id, a.hospital AS hospital_name, d.speciality, d.experience, d.qualification, d.fee
FROM doctors d
INNER JOIN admins a ON d.hospital_id = a.hospital_id;

CREATE TABLE appointments (
    appointmentid INT PRIMARY KEY AUTO_INCREMENT,
    doctor_id INT,
    user_id INT,
    age INT,
    weight DECIMAL(5,2),
    bloodpressure VARCHAR(20),
    height DECIMAL(5,2),
    disease VARCHAR(100),
    symptoms TEXT,
    appointment_date DATE,
    appointment_time TIME,
    confirmed BOOLEAN,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

ALTER TABLE appointments MODIFY COLUMN height VARCHAR(10);

select * from appointments;

SELECT COUNT(*) AS num_doctors;

SELECT COUNT(DISTINCT u.user_id) AS num_users_with_appointments
FROM users u
JOIN appointments a ON u.user_id = a.user_id
JOIN doctors d ON a.doctor_id = d.doctor_id
WHERE d.hospital_id = 1;


