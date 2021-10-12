//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}




// The origin that will be used to make the calculation of the distance. 
const osu = {
	"osu":"Corvallis",
	"lat":"44.5646",
	"lng":"-123.2620"
}


fetch("cities.json")
    .then(response => response.json())
    .then(data => generateTableMi(data, osu))
    .then(data => generateTableKm(data, osu))

function calculateDistance(data, osu, unit){
    // Calculates the distance in Miles
    // Returns an array of distances
    var arrayDistances = [];
    const osuLat = osu['lat'];
    const osuLng = osu['lng'];
    for (let i = 0; i < data.length; i++){
        const dist = distance(osuLat, osuLng, data[i]['lat'], data[i]['lng'], unit);
        arrayDistances.push(dist);
    }
    return arrayDistances;
}


/**
 * The parameters are: lat1, lon1, lat2, lon2, unit (M:miles, K:km, N:nautical miles)
 * I will assume point 1 is Corvallis and point 2 is the other city that I will be using to calculate the distance from.
 * Example calculations between osu and cities:
 * Will use parseFloat() function to change the strings from the json objects to floats.
 */
function generateTableMi(data, osu){
    // Makes the table using DOM
    var arrDistances = calculateDistance(data, osu, "M");
    
    // Grabs the body tag from the html page to add a table to it
    var body = document.getElementsByTagName("body")[0];

    // Make the table
    var tbl = document.createElement("table");
    tbl.setAttribute('class', 'tblMi');
    // Make the table body
    var tblBody = document.createElement("tbody");
    // Make sure the table has the descriptions.
    const titles = ["Names:", "Latitude:", "Longitude", "Distance (Mil)"];
    var row = document.createElement("tr");
    for (let k = 0; k < 4; k++){
        var th = document.createElement("th");
        var thText =document.createTextNode(titles[k]);
        th.appendChild(thText);
        row.appendChild(th);
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
    }
    for (let i = 0; i < data.length; i++){
        // make a table row
        var row = document.createElement("tr");
        for (let j = 0; j < titles.length; j++){
            // make a table data and its text content and add it to the table row.
            var cell = document.createElement("td");
            if (j === 0){
                var cellText = document.createTextNode(data[i]['city']);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (j == 1){
                var cellText = document.createTextNode(data[i]['lat']);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (j === 2){
                var cellText = document.createTextNode(data[i]['lng']);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (j === 3){
                var cellText = document.createTextNode(`${arrDistances[i]}`);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }     
        // Add the row to the end of the table body
        tblBody.appendChild(row);
    }
    // Put the table body into the table
    tbl.appendChild(tblBody);
    tbl.appendChild(document.createElement('br'));
    body.appendChild(tbl);
    return data;
}


function generateTableKm(data, osu){
    // Makes the table using DOM
    var arrDistances = calculateDistance(data, osu, "K");
    // Grabs the body tag from the html page to add a table to it
    var body = document.getElementsByTagName("body")[0];
    // Make the table with class
    var tbl = document.createElement("table");
    tbl.setAttribute('class', 'tblKm');
    // Make the table body
    var tblBody = document.createElement("tbody");
    // Make sure the table has the descriptions.
    const titles = ["Names:", "Latitude:", "Longitude", "Distance (Km)"];
    var row = document.createElement("tr");
    for (let k = 0; k < 4; k++){
        var th = document.createElement("th");
        var thText =document.createTextNode(titles[k]);
        th.appendChild(thText);
        row.appendChild(th);
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
    }
    for (let i = 0; i < data.length; i++){
        // make a table row
        var row = document.createElement("tr");
        for (let j = 0; j < titles.length; j++){
            // make a table data and its text content and add it to the table row.
            var cell = document.createElement("td");
            if (j === 0){
                var cellText = document.createTextNode(data[i]['city']);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (j == 1){
                var cellText = document.createTextNode(data[i]['lat']);
                cell.appendChild(cellText);
                row.appendChild(cell);

            } else if (j === 2){
                var cellText = document.createTextNode(data[i]['lng']);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (j === 3){
                var cellText = document.createTextNode(`${arrDistances[i]}`);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }     
        // Add the row to the end of the table body
        tblBody.appendChild(row);

    }
    // Put the table body into the table
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

function sortMilesTable(){
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.getElementsByTagName('table')[0];
    const r = tbl.rows;
    for (let i = 1; i < r.length - 1; i++){
        console.log(r[i]);
    }
}