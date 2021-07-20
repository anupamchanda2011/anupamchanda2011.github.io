function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function drawTable(table, mfNames, mfUrl, links, navLimits, mfIds, divId){
	var i;
	for(i = 0; i < mfNames.length; i++){
		var mfDetails = httpGet(mfUrl + mfIds[i]);
		var currentNAV = parseInt(mfDetails.data[0].nav);
		if(currentNAV >= navLimits[i]){
			table = table + "<tr><td>";
		}
		else{
			table = table + "<tr style='background-color:#e6ffe6;'><td>";
		}
		table = table + mfNames[i] + "</td><td>";
		table = table + mfDetails.data[0].nav + "</td><td>";
		table = table + navLimits[i] + "</td>";
		var diff = (mfDetails.data[0].nav - mfDetails.data[1].nav).toFixed(2);
		if(diff < 0){
			table = table + "<td style='color:green'>";
		}
		else{
			table = table + "<td style='color:red'>";
		}
		table = table + diff + "</td><td><a href='";
		table = table + links[i] + "'>Links</a></td></tr>";
	}
	table = table + "</table>";
	document.getElementById(divId).innerHTML = table;
}