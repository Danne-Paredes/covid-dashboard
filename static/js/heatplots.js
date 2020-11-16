var plotroute = "api";
// Updates route when new date is selected
d3.selectAll("#selDate").on("change", updateRoute);
function updateRoute () {
    var dateMenu = d3.select("#selDate");
    var dateset = dateMenu.property("value");
    if (dateset === 'set1') {
        plotroute = "api"
        console.log("heatplots1")
    }
    if (dateset === 'set2') {
        plotroute = "api/march"
        console.log("heatplots2")
    }
    if (dateset === 'set3') {
        plotroute = "api/april"
        console.log("heatplots3")
    }
    if (dateset === 'set4') {
        plotroute = "api/may"
        console.log("heatplots4")
    }
    if (dateset === 'set5') {
        plotroute = "api/june"
        console.log("heatplots5")
    }
    if (dateset === 'set6') {
        plotroute = "api/july"
        console.log("heatplots6")
    }
    program(plotroute)
    console.log(plotroute)
};

program(plotroute)
function program(route) {
    // get the data
    d3.json(route).then(function (data) {
        USdata = data
        var UScases = USdata.cases.map(USdata => USdata.Confirmed);
        var USrecovered = USdata.cases.map(USdata => USdata.Recovered);
        var USdeaths = USdata.cases.map(USdata => USdata.Deaths);
        var USdates = USdata.cases.map(USdata => USdata.Date);

        console.log(USdata);
        console.log(USdates);

        // Generate summary data
        var casesum = math.sum(UScases);
        var casemean = math.mean(UScases);
        var deathsum = math.sum(USdeaths);
        var deathmean = math.mean(USdeaths);
        var recoveredsum = math.sum(USrecovered);
        var recoveredmean = math.mean(USrecovered);
        var totalrecovered = casesum - deathsum

        casemean = Math.round(casemean * 100) / 100
        
        summary = [[casesum, casemean, deathsum, recoveredsum, totalrecovered]]
        
        // Fill table in with data
        d3.select("tbody").html("")
        d3.select("tbody")
        .selectAll("tr")
        .data(summary)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td><td>${d[4]}</td>`;
         });
    });
}