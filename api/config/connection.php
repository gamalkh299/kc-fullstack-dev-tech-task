<?php

class Database {
    private $host = 'db';  // MySQL service name in Docker Compose
    private $db_name = 'course_catalog';
    private $username = 'test_user';
    private $password = 'test_password';
    private $conn;

    // Method to get the database connection
    public function getConnection() {
        if ($this->conn === null) {
            try {
                // Create a PDO instance to connect to the MySQL database
                $dsn = "mysql:host={$this->host};dbname={$this->db_name}";
                $this->conn = new PDO($dsn, $this->username, $this->password);
                // Set the PDO error mode to exception for better debugging
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
                exit;
            }
        }
        return $this->conn;
    }
}

