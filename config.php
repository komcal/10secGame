<?php
$servername = "localhost";
$username = "10secgame";
$password = "password";
$dbname = "10secgame";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
