<?php
$product = $_POST['productname'];
$brand = $_POST['brandname'];
$quantity = $_POST['quantity'];

$conn = new mysqli('localhost', 'root', '', 'mydb');
if($conn->connect_error){
    echo 'Could not connect to database: '.$conn->connect_error;
}

$stmt = $conn->prepare("INSERT into products (name, brand, quantity) VALUES (?,?,?)");
$stmt->bind_param("ssi", $product, $brand, $quantity);

if($stmt->execute()){
    echo "success";
}else{
    echo "error";
}

?>