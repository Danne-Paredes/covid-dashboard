var route = "api";
var myPieChart=null;
d3.selectAll("#selDate").on("change", updateRoute);
function updateRoute () {
    var dateMenu = d3.select("#selDate");
    var dateset = dateMenu.property("value");
    if (dateset === 'set1') {
        route = "api"
    }
    if (dateset === 'set2') {
        route = "api/march"
    }
    if (dateset === 'set3') {
        route = "api/april"
    }
    if (dateset === 'set4') {
        route = "api/may"
    }
    if (dateset === 'set5') {
        route = "api/june"
    }
    if (dateset === 'set6') {
        route = "api/july"
    }
    program(route)
    console.log(route)
};
program(route)
function program(route) {
    // get the data
    d3.json(route).then(function (data) {
        USdata = data

        // var USdata = data.filter(function (d) { return d.Country === "US" });
        // var UScases = USdata.cases.map(USdata => USdata.Confirmed);
        // var USrecovered = USdata.cases.map(USdata => USdata.Recovered);
        // var USdeaths = USdata.cases.map(USdata => USdata.Deaths);
        // var USdates = USdata.cases.map(USdata => USdata.Date);
        // init(USdates, UScases);

        console.log(USdata);

        ConvertJsonToTable(USdata);

        // function generateTable(table, data) {
        //     for (let element of data) {
        //       let row = table.insertRow();
        //       for (key in element) {
        //         let cell = row.insertCell();
        //         let text = document.createTextNode(element[key]);
        //         cell.appendChild(text);
        //       }
        //     }
        //   }
        
        //   generateTable(table, USdata);
        // console.log(USdates);

        // var casesum = math.sum(UScases);
        // var casemean = math.mean(UScases);
        // var deathsum = math.sum(USdeaths);
        // var deathmean = math.mean(USdeaths);
        // var recoveredsum = math.sum(USrecovered);
        // var recoveredmean = math.mean(USrecovered);
        // var totalrecovered = casesum - deathsum

        // console.log(recoveredsum);
        // console.log(recoveredmean);
        // console.log(deathsum);
        // console.log(deathmean);
        // console.log(casesum);
        // console.log(casemean);
    });
}        
