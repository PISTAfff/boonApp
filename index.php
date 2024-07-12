<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($path) {
    case '/Login':
        require 'Login.php';
        break;
    case '/SignUp':
        require 'SignUp.php';
        break;
    case '/ForgetPassword':
        require 'ForgetPassword.php';
        break;
    case '/Edit':
        require 'Edit.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "404 Not Found"]);
        break;
}
?>
