-- @block 
DROP DATABASE BloodDonationSystem;
-- @block
create database BloodDonationSystem;
USE BloodDonationSystem;
-- Create admin table
CREATE TABLE IF NOT EXISTS admin (
    Admin_ID INT PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    bdate DATE
);
-- Create donor table
CREATE TABLE IF NOT EXISTS donor (
    Donor_ID INT PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    address VARCHAR(255),
    mass DECIMAL(10, 2),
    bdate DATE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    blood_type VARCHAR(10),
    donation_count INT,
    donation_date DATE,
    incident VARCHAR(255),
    Drive_ID INT,
    can_edit BOOLEAN DEFAULT FALSE
);
-- Create recipient table
CREATE TABLE IF NOT EXISTS recipient (
    Recipient_ID INT PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    address VARCHAR(255),
    mass DECIMAL(10, 2),
    bdate DATE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    blood_type VARCHAR(10),
    amount_of_blood DECIMAL(10, 2),
    price DECIMAL(10, 2),
    order_status VARCHAR(50) DEFAULT 'pending',
    can_edit BOOLEAN DEFAULT FALSE
);
-- Create donor medical history table
CREATE TABLE IF NOT EXISTS donor_medical_history (
    Donor_ID INT,
    MedicalHistory TEXT,
    FOREIGN KEY (Donor_ID) REFERENCES donor(Donor_ID)
);
-- Create recipient medical history table
CREATE TABLE IF NOT EXISTS recipient_medical_history (
    Recipient_ID INT,
    MEDICAL_History TEXT,
    FOREIGN KEY (Recipient_ID) REFERENCES recipient(Recipient_ID)
);
-- Create blood table
CREATE TABLE IF NOT EXISTS blood (
    Donation_ID INT PRIMARY KEY,
    blood_type VARCHAR(10),
    expiry_date DATE,
    quantity DECIMAL(10, 2),
    Drive_ID INT
);
-- Create blood collection drive table
CREATE TABLE IF NOT EXISTS blood_collection_drive (
    Drive_ID INT PRIMARY KEY,
    Drive_date DATE
);
-- Create location collection drive table
CREATE TABLE IF NOT EXISTS location_collection_drive (
    Drive_ID INT,
    location_drive VARCHAR(255),
    FOREIGN KEY (Drive_ID) REFERENCES blood_collection_drive(Drive_ID)
);
-- Create receives table (relationship between recipient and blood donation)
CREATE TABLE IF NOT EXISTS receives (
    recipient_id INT,
    donation_id INT,
    FOREIGN KEY (recipient_id) REFERENCES recipient(Recipient_ID),
    FOREIGN KEY (donation_id) REFERENCES blood(Donation_ID)
);
CREATE VIEW donor_info AS
SELECT d.*,
    dmh.MedicalHistory
FROM donor d
    LEFT JOIN donor_medical_history dmh ON d.Donor_ID = dmh.Donor_ID;
-- @block
CREATE TABLE recipient_medical_history (
    Recipient_ID INT,
    MedicalHistory TEXT,
    FOREIGN KEY (Recipient_ID) REFERENCES recipient(Recipient_ID)
);
CREATE VIEW recipient_info AS
SELECT r.*,
    rmh.MedicalHistory
FROM recipient r
    LEFT JOIN recipient_medical_history rmh ON r.Recipient_ID = rmh.Recipient_ID;
-- @block
-- Inserting admins
INSERT INTO admin (Admin_ID, fname, lname, email, password)
VALUES (1, 'John', 'Doe', '1@email.com', '1234'),
    (
        2,
        'Jane',
        'Smith',
        'jane.smith@email.com',
        'pass456'
    );
-- @block
-- Inserting donors
INSERT INTO donor (
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
INSERT INTO recipient (
        fname,
        lname,
        address,
        mass,
        bdate,
        email,
        password,
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
-- @block
INSERT INTO blood_collection_drive (Drive_ID, Drive_date)
VALUES ('2', '2023-12-11');