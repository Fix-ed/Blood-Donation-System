<?php
// Get data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Connect to the MySQL database (replace these details with your actual database credentials)
$servername = 'localhost';
$username = 'your_username';
$password = 'your_password';
$dbname = 'BloodDonationSystem';

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Insert data into the Donors table
$sql = "INSERT INTO Donors (FirstName, LastName, Address) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $data['firstName'], $data['lastName'], $data['address']);

if ($stmt->execute()) {
    $response = ['status' => 'success', 'message' => 'Data inserted successfully'];
} else {
    $response = ['status' => 'error', 'message' => 'Error inserting data: ' . $stmt->error];
}

$stmt->close();
$conn->close();

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
