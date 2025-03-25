<?php
// Paramètres de connexion
$host = '192.168.4.60'; 
$username = 'adminDistant';    
$password = '1234';         
$dbname = 'workshop2'; 

// Connexion à MySQL
$conn = new mysqli($host, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué: " . $conn->connect_error);
}

?>
