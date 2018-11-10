<?php
// Array with names
$a[] = "Anna";
$a[] = "Brittany";
$a[] = "Cinderella";
$a[] = "Diana";
$a[] = "Eva";
$a[] = "Fiona";
$a[] = "Gunda";
$a[] = "Hege";
$a[] = "Inga";
$a[] = "Johanna";
$a[] = "Kitty";
$a[] = "Linda";
$a[] = "Nina";
$a[] = "Ophelia";
$a[] = "Petunia";
$a[] = "Amanda";
$a[] = "Raquel";
$a[] = "Cindy";
$a[] = "Doris";
$a[] = "Eve";
$a[] = "Evita";
$a[] = "Sunniva";
$a[] = "Tove";
$a[] = "Unni";
$a[] = "Violet";
$a[] = "Liza";
$a[] = "Elizabeth";
$a[] = "Ellen";
$a[] = "Wenche";
$a[] = "Vicky";

$conn = new mysqli('localhost', 'root', '', 'mydb');
$sql = "SELECT name FROM products";
$result = $conn->query($sql);
$data = array();

if($conn->connect_error){
    echo 'Could not connect to database: '.$conn->connect_error;
}

// fetching data from MySQL database table to array
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
}

//echo print_r($data);

// get the q parameter from URL
$q = $_REQUEST["q"];

$hint = "";

// lookup all hints from array if $q is different from ""
if ($q !== "") {
    $q = strtolower($q);
    $len=strlen($q);
    foreach($a as $name) {
        if (stristr($q, substr($name, 0, $len))) {
            if ($hint === "") {
                $hint = $name;
            } else {
                $hint .= ", $name";
            }
        }
    }
}

//if ($q !== "") {
//    $q = strtolower($q);
//    $len=strlen($q);
//    for ($i=0; $i>count($data); $i++){
//        foreach($data[$i] as $name) {
//            if (stristr($q, substr($name, 0, $len))) {
//                if ($hint === "") {
//                    $hint = $name;
//                } else {
//                    $hint .= ", $name";
//                }
//            }
//        }
//    }
//}

// Output "no suggestion" if no hint was found or output correct values
echo $hint === "" ? "no suggestion" : $hint;
?>