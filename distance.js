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


/**
 * The parameters are: lat1, lon1, lat2, lon2, unit (M:miles, K:km, N:nautical miles)
 * I will assume point 1 is Corvallis and point 2 is the other city that I will be using to calculate the distance from.
 * Example calculations between osu and cities:
 * Will use parseFloat() function to change the strings from the json objects to floats.
 */

function generate_table1(){
    // 1
    // const latOsu = origin['lat'];
    // const lngOsu = origin['lng'];
    // // 2
    // const latSeattle = cities[0]['lat'];
    // const lngSeattle = cities[0]['lng'];
    // const distance_to_seattle = distance(latOsu, lngOsu, latSeattle, lngSeattle, "M");
    // console.log(distance_to_seattle);



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



function generate_table2(){
    // 1
    // const latOsu = origin['lat'];
    // const lngOsu = origin['lng'];
    // // 2
    // const latSeattle = cities[0]['lat'];
    // const lngSeattle = cities[0]['lng'];
    // const distance_to_seattle = distance(latOsu, lngOsu, latSeattle, lngSeattle, "M");
    // console.log(distance_to_seattle);



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

