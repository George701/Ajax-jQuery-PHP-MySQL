function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send();
}

function loadTable(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            myFunction(this);
        }
    };
    xhttp.open("GET", "albums.xml", true);
    xhttp.send();
}

function myFunction(xml){
    let i;
    let xmlDoc = xml.responseXML;
    let table = "<tr><th>Artist</th><th>Year</th></th>";
    let x = xmlDoc.getElementsByTagName("CD");
    for(i=0; i<x.length; i++){
        table += "<tr><td>"+x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue+"</td><td>"+x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue+"</tr></td>";
    }
    document.getElementById("demoOne").innerHTML = table;
}

function showHint(str){
    let xhttp;
    if(str.length === 0){
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("txtHint").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "gethint.php?q="+str, true);
    xhttp.send();
}

//jQuery (not refreshing page)
$("form").submit(function(e){
    e.preventDefault();

   $.post(
       'insert.php',
       // $("form").attr('action'),
       // $("form:input").serializeArray(),
       {
           productname:$("#name").val(),
           brandname:$("#brand").val(),
           quantity:$("#quantity").val()
       }
    ,

       function(result){
           if(result === "success"){
               $("#result").html("Values inserted successfully");
           }else{
               $("#result").html("Error");
           }
       }
   );
});
/*
==================================================
                Real time table
==================================================
*/
let ajax = new XMLHttpRequest();
let method = "GET";
let url = "dataTable.php";
let i = 1;
let test = 0;
let data = [];

setInterval(checkData, 1000);

function checkData(){

    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText);
        }
        return data;
    };

    ajax.open(method, url, true);
    ajax.send();

    if(test<data.length){
        console.log("I am called " + i + " time");
        buildTable(data, "dataTable");
        i++;
        test = data.length;
        console.log(test);
    };
};


function buildTable(arr, id){
    let html = "";

    for (let i = 0; i < arr.length; i++) {
        let column_One = arr[i].name;
        let column_Two = arr[i].brand;
        let column_Three = arr[i].quantity;

        html += "<tr>";
        // html += "<th scope=\"row\">" + i + "</th>";
        html += "<td>" + column_One + "</td>";
        html += "<td>" + column_Two + "</td>";
        html += "<td>" + column_Three + "</td>";
        html += "</tr>";
    }

    document.getElementById(id).innerHTML = html;
}





