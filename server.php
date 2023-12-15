<?php
$servername = "localhost";
$username = "Omar";
$password = "12345678";
$dbname = "BloodDonationSystem";

// Get JSON input and decode it
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // Convert JSON to array

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO Donors (FirstName, LastName, Address, ContactNumber, Email, Age, Weight, DiseaseFree) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssiis", $firstName, $lastName, $address, $contactNumber, $email, $age, $weight, $diseaseFree);

// Set parameters and execute
$firstName = $input['firstName'];
$lastName = $input['lastName'];
$address = $input['address'];
$contactNumber = $input['contactNumber'];
$email = $input['email'];
$age = $input['age'];
$weight = $input['weight'];
$diseaseFree = $input['diseaseFree'];

$stmt->execute();

echo "New donor added successfully";

$stmt->close();
$conn->close();
?>
