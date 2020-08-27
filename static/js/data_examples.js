var route = "apidata";
var myPieChart=null;
d3.selectAll("#selDate").on("change", updateRoute);
function updateRoute () {
    var dateMenu = d3.select("#selDate");
    var dateset = dateMenu.property("value");
    if (dateset === 'set1') {
        route = "apidata"
    }
    if (dateset === 'set2') {
        route = "api/marchdata"
    }
    if (dateset === 'set3') {
        route = "api/aprildata"
    }
    if (dateset === 'set4') {
        route = "api/maydata"
    }
    if (dateset === 'set5') {
        route = "api/junedata"
    }
    if (dateset === 'set6') {
        route = "api/julydata"
    }
    program(route)
    console.log(route)
};
program(route)
function program(route) {
    // get the data
    d3.json(route).then(function (data) {
        console.log(data)
        USdata = data.cases

        // var USdata = data.filter(function (d) { return d.Country === "US" });
        // var UScases = USdata.cases.map(USdata => USdata.Confirmed);
        // var USrecovered = USdata.cases.map(USdata => USdata.Recovered);
        // var USdeaths = USdata.cases.map(USdata => USdata.Deaths);
        // var USdates = USdata.cases.map(USdata => USdata.Date);
        // init(USdates, UScases);

        console.log(USdata);

        $('#datatable').DataTable( {
            data: USdata,
            columns: [
                { data: 'Province/State' },
                { data: 'Latitude' },
                { data: 'Longitude' },
                { data: 'Confirmed' },
                { data: 'Recovered' },
                { data: 'Deaths' },
                { data: 'Date' }
            ]
        } );

        // d3.select("#datatable")
        // .selectAll("tr")
        // .data(USdata)
        // .enter()
        // .append("tr")
        // .html(function(d) {
        //     return `<td>${d.Confirmed}</td><td>${d.Date}</td><td>${d.Deaths}</td>`;
        // });

        // ConvertJsonToTable(USdata);

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
