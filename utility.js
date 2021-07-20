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
			table = table + "<tr style='background-color:#14f514;'><td>";
		}
		table = table + mfNames[i] + "</td><td>";
		table = table + mfDetails.data[0].nav + "</td><td>";
		table = table + navLimits[i] + "</td><td><a href='";
		table = table + links[i] + "'>Links</a></td></tr>";
	}
	table = table + "</table>";
	document.getElementById(divId).innerHTML = table;
}