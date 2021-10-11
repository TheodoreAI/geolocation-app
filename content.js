/**
 * Making use of the distance function.js and the cities.json data as well as the osu.json one.
 */

import { distance } from "./distance.js";
import cities from "./cities.json";
import origin from "./osu.json";

/**
 * The parameters are: lat1, lon1, lat2, lon2, unit (M:miles, K:km, N:nautical miles)
 * I will assume point 1 is Corvallis and point 2 is the other city that I will be using to calculate the distance from.
 * Example calculations between osu and cities:
 * Will use parseFloat() function to change the strings from the json objects to floats.
 */




function generate_table(){
    // 1
    const latOsu = origin['lat'];
    const lngOsu = origin['lng'];
    // 2
    const latSeattle = cities[0]['lat'];
    const lngSeattle = cities[0]['lng'];
    const distance_to_seattle = distance(latOsu, lngOsu, latSeattle, lngSeattle, "M");
    console.log(distance_to_seattle);



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
            var cellText = document.createTextNode("Cell in row "+ distance_to_seattle +", column" +j);
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