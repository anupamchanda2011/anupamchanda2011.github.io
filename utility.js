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
			table = table + "<tr><td style='width: 55%'>";
		}
		else{
			table = table + "<tr style='background-color:#e6ffe6;'><td style='width: 55%'>";
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
	var mFunds = readConfigFromLocalStorage(mutualFunds);
	var i;
	var table = "";
	for(i = 0; i < mFunds.length; i++){
		table = table + "<table id='funds'> <tr><th>";
		table = table + mFunds[i].name + "</th><th>NAV Value</th><th>NAV Threshold</th><th>Difference</th><th>Details</th></tr>"
		drawTableForFund(table, mFunds[i].data, mFunds[i].type);
		table = "";
	}
}

function drawTable(mutualFunds){
	var mFunds = readConfigFromLocalStorage(mutualFunds);
	var i;
	var table = "";
		for(i = 0; i < mFunds.length; i++){
		table = table + "<div id='" + mFunds[i].type + "'></div></br>";
	}
	document.getElementById("mutualFunds").innerHTML = table;
}

function loadMutualFundList() {
  var fundList = document.getElementById("fundType");
    var i;
    for (i = 0; i < fundTypes.length; i++) {
      var fund = new Option(fundTypes[i].name, i);
      fundList.options.add(fund);
    }
} 
function addFundsToLocalStorage(event){
	// event.preventDefault();
	var form = document.forms["addFund"];
	var mFunds = readConfigFromLocalStorage(mutualFunds);
	var mFType = fundTypes[form["fundType"].value].type;
	var index = getIndexfromMFArray(mFunds, mFType);
	var mFObject = createMFObject();
	mFunds[index].data.push(mFObject);
	localStorage.setItem("mutualFunds", JSON.stringify(mFunds));
	return false;
}

function cancelForm(){
	window.location.href = '/index.html';
}

function readConfigFromLocalStorage(mutualFunds){
	var mFunds = localStorage.getItem("mutualFunds");
	if(mFunds == null){
		mFunds = mutualFunds;
	}
	else{
		mFunds = JSON.parse(mFunds);
	}
	return (mFunds);
}

function writeConfigToLocalStorage(mutualFunds){
	localStorage.setItem("mutualFunds", JSON.stringify(mutualFunds));
}

function getIndexfromMFArray(mutualFunds, mFType){
	var index = mutualFunds.length;
	for (var i=0; i < mutualFunds.length; i++) {
        if (mutualFunds[i].type === mFType) {
            index = i;
			break;
        }
    }
	return index;
}

function createMFObject(){
	var form = document.forms["addFund"];

	var mFJSONData = {};
	mFJSONData["name"] = form["fundName"].value;
	mFJSONData["moneycontrolLink"] = form["link"].value;
	mFJSONData["amfiLink"] = form["amfiLink"].value;
	mFJSONData["threshold"] = form["thresholdValue"].value;
	return mFJSONData;
}