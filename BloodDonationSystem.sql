-- @block 
create database BloodDonationSystem;
USE BloodDonationSystem;
-- @block
CREATE TABLE admin (
    Admin_ID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);
CREATE TABLE donors (
    Donor_ID INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(255),
    lname VARCHAR(255),
    address TEXT,
    mass DECIMAL(5, 2),
    bdate DATE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    blood_type VARCHAR(5),
    Drive_ID INT,
    donation_count INT,
    donation_date DATE,
    incident TEXT
);
CREATE TABLE recipients (
    Recipient_ID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Address TEXT,
    mass DECIMAL(5, 2),
    bdate DATE,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    blood_type VARCHAR(5),
    amount_of_blood INT,
    price DECIMAL(10, 2),
    order_status VARCHAR(50) DEFAULT 'pending'
);
CREATE TABLE donor_medical_history (
    Donor_ID INT,
    MedicalHistory TEXT,
    FOREIGN KEY (Donor_ID) REFERENCES donors(Donor_ID)
);
CREATE TABLE blood_collection_drive (
    Drive_ID INT PRIMARY KEY AUTO_INCREMENT,
    Drive_date DATE
);
CREATE TABLE location_collection_drive (
    Drive_ID INT,
    location_drive TEXT,
    FOREIGN KEY (Drive_ID) REFERENCES blood_collection_drive(Drive_ID)
);
CREATE TABLE blood (
    Donation_ID INT PRIMARY KEY AUTO_INCREMENT,
    blood_type VARCHAR(5),
    expiry_date DATE,
    quantity INT,
    Drive_ID INT,
    FOREIGN KEY (Drive_ID) REFERENCES blood_collection_drive(Drive_ID)
);
CREATE VIEW donor_info AS
SELECT d.*,
    dmh.MedicalHistory
FROM donors d
    LEFT JOIN donor_medical_history dmh ON d.Donor_ID = dmh.Donor_ID;
-- @block
CREATE TABLE recipient_medical_history (
    Recipient_ID INT,
    MedicalHistory TEXT,
    FOREIGN KEY (Recipient_ID) REFERENCES recipients(Recipient_ID)
);
CREATE VIEW recipient_info AS
SELECT r.*,
    rmh.MedicalHistory
FROM recipients r
    LEFT JOIN recipient_medical_history rmh ON r.Recipient_ID = rmh.Recipient_ID;
-- @block
-- Inserting admins
INSERT INTO admin (FirstName, LastName, Email, Password)
VALUES ('John', 'Doe', 'john.doe@email.com', 'pass123'),
    (
        'Jane',
        'Smith',
        'jane.smith@email.com',
        'pass456'
    );
-- Inserting donors
INSERT INTO donors (
        fname,
        lname,
        address,
        mass,
        bdate,
        email,
        password,
        blood_type,
        Drive_ID,
        donation_count,
        donation_date,
        incident
    )
VALUES (
        'Alice',
        'Johnson',
        '123 Main St',
        65.5,
        '1990-01-01',
        'alice.johnson@email.com',
        'pass789',
        'A+',
        1,
        0,
        '2023-01-01',
        'None'
    ),
    (
        'Bob',
        'Brown',
        '456 Elm St',
        70.0,
        '1992-02-02',
        'bob.brown@email.com',
        'pass012',
        'O-',
        2,
        0,
        '2023-01-02',
        'None'
    );
-- Inserting recipients
INSERT INTO recipients (
        FirstName,
        LastName,
        Address,
        mass,
        bdate,
        Email,
        Password,
        blood_type,
        amount_of_blood,
        price,
        order_status
    )
VALUES (
        'Charlie',
        'Davis',
        '789 Oak St',
        75.0,
        '1988-03-03',
        'charlie.davis@email.com',
        'pass345',
        'B+',
        2,
        200.00,
        'pending'
    ),
    (
        'Diana',
        'Evans',
        '101 Pine St',
        68.0,
        '1991-04-04',
        'diana.evans@email.com',
        'pass678',
        'AB-',
        3,
        300.00,
        'pending'
    );