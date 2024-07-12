<?php
$dsn = "mysql:host="+getenv('DB_HOST')+";port="+getenv('DB_PORT')+";dbname="+getenv('DB_DATABASE')+";";
$dbusername = getenv("DB_USERNAME");
$dbpassword = getenv("DB_PASSWORD");
try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection Failed: " . $e->getMessage()]);
    exit;
} ?>