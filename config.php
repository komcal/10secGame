<?php
$servername = "localhost";
$username = "zp9019_10secgame";
$password = "C3a1l12z24";
$dbname = "zp9019_10secgame";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>