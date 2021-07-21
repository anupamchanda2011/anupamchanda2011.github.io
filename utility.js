function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function drawTableForFund(table, data, divId){
	var i;
	for(i = 0; i < data.length; i++){
		var mfDetails = httpGet(data[i].amfiLink);
		var currentNAV = parseInt(mfDetails.data[0].nav);
		if(currentNAV >= data[i].threshold){
			table = table + "<tr><td>";
		}
		else{
			table = table + "<tr style='background-color:#e6ffe6;'><td>";
		}
		table = table + data[i].name + "</td><td>";
		table = table + mfDetails.data[0].nav + "</td><td>";
		table = table + data[i].threshold + "</td>";
		var diff = (mfDetails.data[0].nav - mfDetails.data[1].nav).toFixed(2);
		if(diff < 0){
			table = table + "<td style='color:red'>";
		}
		else{
			table = table + "<td style='color:green'>";
		}
		table = table + diff + "</td><td><a href='";
		table = table + data[i].moneycontrolLink + "'>Links</a></td></tr>";
	}
	table = table + "</table>";
	document.getElementById(divId).innerHTML = table;
}

function drawPage(mutualFunds){
	var i;
	var table = "";
	for(i = 0; i < mutualFunds.length; i++){
		table = table + "<table id='funds'> <tr><th>";
		table = table + mutualFunds[i].name + "</th><th>NAV Value</th><th>NAV Threshold</th><th>Difference</th><th>Details</th></tr>"
		drawTableForFund(table, mutualFunds[i].data, mutualFunds[i].type);
		table = "";
	}
}

function drawTable(mutualFunds){
	var i;
	var table = "";
		for(i = 0; i < mutualFunds.length; i++){
		table = table + "<div id='" + mutualFunds[i].type + "'></div></br>";
	}
	document.getElementById("mutualFunds").innerHTML = table;
}