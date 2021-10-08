function generate_table(){

    // Grabs the body tag from the html page to add a table to it
    var body = document.getElementsByTagName("body")[0];

    // Make the table
    var tbl = document.createElement("table");
    // Make the table body
    var tblBody = document.createElement("tbody");

    // make the cells of the table
    for (let i = 0; i < 3; i++){
        // make a table row
        var row = document.createElement("tr");
        
        for (let j = 0; j < 3; j++){
            // make a table data and its text content and add it to the table row.
            var cell = document.createElement("td");
            var cellText = document.createTextNode("Cell in row "+ i +", column" +j);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        // Add the row to the end of the table body
        tblBody.appendChild(row);

    }
    // Put the table body into the table
    tbl.appendChild(tblBody);
    body.appendChild(tbl);


}