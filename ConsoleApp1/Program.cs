using System;
using MySql.Data.MySqlClient;

class Program
{
    static void Main()
    {
        // Replace these values with your actual database credentials
        string connectionString = "Server=localhost;Database=BloodDonationSystem;User=root;Password=12345678;";

        Console.WriteLine("Enter donor information:");

        Console.Write("Donor ID: ");
        int donorId = int.Parse(Console.ReadLine());

        Console.Write("First Name: ");
        string firstName = Console.ReadLine();

        Console.Write("Last Name: ");
        string lastName = Console.ReadLine();

        Console.Write("Address: ");
        string address = Console.ReadLine();

        // Create a data object
        var data = new
        {
            DonorID = donorId,
            FirstName = firstName,
            LastName = lastName,
            Address = address,
        };

        // Example query to insert data
        string query = "INSERT INTO Donors (DonorID, FirstName, LastName, Address) VALUES (@DonorID, @FirstName, @LastName, @Address)";

        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    // Add parameters to prevent SQL injection
                    command.Parameters.AddWithValue("@DonorID", data.DonorID);
                    command.Parameters.AddWithValue("@FirstName", data.FirstName);
                    command.Parameters.AddWithValue("@LastName", data.LastName);
                    command.Parameters.AddWithValue("@Address", data.Address);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        Console.WriteLine("Donor added successfully!");
                    }
                    else
                    {
                        Console.WriteLine("Error adding donor.");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }

        Console.ReadLine(); // Keep console window open
    }
}
