<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_GET["email"];
    $password = $_GET["password"];
    try {
        require_once "dbh.inc.php";
        $query = "SELECT Username,FirstName,LastName,Email,Password FROM Users WHERE Email=:emailSearch";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":emailSearch", $email);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($res["Password"] == $password) {
            echo json_encode(["res"=>1,"Username"=>$res["Username"],"FirstName"=>$res["FirstName"],"LastName"=>$res["LastName"]]);
        } else {
            echo json_encode(["res"=>0]);
        }
    } catch (PDOException $e) {
        echo json_encode(["res"=>-1]);
    } finally {
        $pdo = null;
        $stmt = null;
    }
}
?>