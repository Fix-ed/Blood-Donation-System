

-- @block 
create database BloodDonationSystem;

USE BloodDonationSystem;
-- @block
-- Create the Donors table
CREATE  table Donors (
    DonorID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Address VARCHAR(255),
    ContactNumber VARCHAR(15),
    Email VARCHAR(100),
    Age INT,
    Weight DECIMAL(5, 2),
    DiseaseFree VARCHAR(3) CHECK (DiseaseFree IN ('Yes', 'No')),
    CHECK (Age >= 17 AND Weight >= 114)
);
-- @block
-- Create the Recipients table
CREATE TABLE Recipients (
    RecipientID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Address VARCHAR(255),
    ContactNumber VARCHAR(15),
    Email VARCHAR(100)
);
-- @block
-- Create the BloodTypes table
CREATE TABLE BloodTypes (
    BloodTypeID INT PRIMARY KEY,
    BloodTypeName VARCHAR(50)
);
-- @block
-- Create the MedicalHistory table
CREATE TABLE MedicalHistory (
    HistoryID INT PRIMARY KEY,
    DonorID INT,
    MedicalDescription TEXT,
    Date DATE,
    FOREIGN KEY (DonorID) REFERENCES Donors(DonorID)
);
-- @block
-- Create the BloodDrives table
CREATE TABLE BloodDrives (
    DriveID INT PRIMARY KEY,
    Location VARCHAR(255),
    ScheduledDate DATE
);
-- @block
-- Create the StoredBlood table
CREATE TABLE StoredBlood (
    BloodBagID INT PRIMARY KEY,
    BloodTypeID INT,
    DonorID INT,
    CollectionDate DATE,
    ExpiryDate DATE,
    FOREIGN KEY (BloodTypeID) REFERENCES BloodTypes(BloodTypeID),
    FOREIGN KEY (DonorID) REFERENCES Donors(DonorID)
);
-- @block
-- Create the Incidents table
CREATE TABLE Incidents (
    IncidentID INT PRIMARY KEY,
    Description TEXT,
    Date DATE
);
-- @block
-- Create the Reports table
CREATE TABLE Reports (
    ReportID INT PRIMARY KEY,
    Description TEXT,
    Date DATE
);





-- @block
-- examples data COMMENT


-- Switch to the BloodDonationSystem database
USE BloodDonationSystem;

-- Insert sample data into the Donors table
INSERT INTO Donors (DonorID, FirstName, LastName, Address, ContactNumber, Email, Age, Weight, DiseaseFree)
VALUES
    (1, 'John', 'Doe', '123 Main St', '123-456-7890', 'john.doe@example.com', 25, 150.5, 'Yes'),
    (2, 'Jane', 'Smith', '456 Oak Ave', '987-654-3210', 'jane.smith@example.com', 30, 130.2, 'No'),
    (3, 'Bob', 'Johnson', '789 Pine Rd', '111-222-3333', 'bob.johnson@example.com', 20, 140.0, 'Yes');

-- Insert sample data into the Recipients table
INSERT INTO Recipients (RecipientID, FirstName, LastName, Address, ContactNumber, Email)
VALUES
    (1, 'Alice', 'Williams', '321 Elm Blvd', '555-123-4567', 'alice.williams@example.com'),
    (2, 'Charlie', 'Brown', '654 Cedar Ln', '999-888-7777', 'charlie.brown@example.com');

-- Insert sample data into the BloodTypes table
INSERT INTO BloodTypes (BloodTypeID, BloodTypeName)
VALUES
    (1, 'A+'),
    (2, 'B-'),
    (3, 'O+');

-- Insert sample data into the MedicalHistory table
INSERT INTO MedicalHistory (HistoryID, DonorID, MedicalDescription, Date)
VALUES
    (1, 1, 'No major health issues', '2023-01-15'),
    (2, 2, 'Allergies', '2023-02-20'),
    (3, 3, 'Regular checkup', '2023-03-10');

-- Insert sample data into the BloodDrives table
INSERT INTO BloodDrives (DriveID, Location, ScheduledDate)
VALUES
    (1, 'Community Center', '2023-04-05'),
    (2, 'Hospital Parking Lot', '2023-05-15');

-- Insert sample data into the StoredBlood table
INSERT INTO StoredBlood (BloodBagID, BloodTypeID, DonorID, CollectionDate, ExpiryDate)
VALUES
    (1, 1, 1, '2023-04-01', '2023-05-01'),
    (2, 2, 2, '2023-04-10', '2023-05-10');

-- Insert sample data into the Incidents table
INSERT INTO Incidents (IncidentID, Description, Date)
VALUES
    (1, 'Temperature control failure', '2023-04-02'),
    (2, 'Power outage during collection', '2023-04-12');

-- Insert sample data into the Reports table
INSERT INTO Reports (ReportID, Description, Date)
VALUES
    (1, 'Monthly usage report', '2023-05-01'),
    (2, 'Incident summary', '2023-05-05');

