// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 30, left: 50 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Define base variables
var route = "api";
var myPieChart = null;

// Updates route when new date is selected
d3.selectAll("#selDate").on("change", updateRoute);
function updateRoute() {
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
// Run function to generate plots
program(route)
function program(route) {

    // get the data
    d3.json(route).then(function (data) {
        USdata = data
        var UScases = USdata.cases.map(USdata => USdata.Confirmed);
        var USrecovered = USdata.cases.map(USdata => USdata.Recovered);
        var USdeaths = USdata.cases.map(USdata => USdata.Deaths);
        var USdates = USdata.cases.map(USdata => USdata.Date);
        init(USdates, UScases);

        console.log(USdata);
        console.log(USdates);

        var casesum = math.sum(UScases);
        var casemean = math.mean(UScases);
        var deathsum = math.sum(USdeaths);
        var deathmean = math.mean(USdeaths);
        var recoveredsum = math.sum(USrecovered);
        var recoveredmean = math.mean(USrecovered);
        var totalrecovered = casesum - deathsum

        console.log(recoveredsum);
        console.log(recoveredmean);
        console.log(deathsum);
        console.log(deathmean);
        console.log(casesum);
        console.log(casemean);

        casemean = Math.round(casemean * 100) / 100

        summary = [[casesum, casemean, deathsum, recoveredsum, totalrecovered]]

        d3.select("tbody").html("")
        d3.select("tbody")
            .selectAll("tr")
            .data(summary)
            .enter()
            .append("tr")
            .html(function (d) {
                return `<td>${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td><td>${d[4]}</td>`;
            });


        // Initializes the page with a default plot 
        function init(xaxis, yaxis) {
            var data = [{
                x: xaxis,
                y: yaxis,
                fill: 'tozeroy',
                fillcolor: '#f7d333',
                type: 'line',
                mode: 'none',
            }];
            var layout = {
                yaxis: {range:[0,4000000]}
            };
            Plotly.newPlot("plot", data, layout)
        };

        console.log(USdeaths)
        console.log(USrecovered)
        
        // Initialize x and y arrays
        var x = [];
        var y = [];
        var marker = "";

        d3.select("#dataset1").on("click", updatedata1);
        function updatedata1() {
            x = USdates;
            y = UScases;
            marker = "#f7d333";
            console.log("yo")
            // Note the extra brackets around 'x' and 'y'
            Plotly.restyle("plot", "x", [x]);
            Plotly.restyle("plot", "y", [y]);
            Plotly.restyle("plot", "fillcolor", marker)
        }

        d3.select("#dataset2").on("click", updatedata2);
        function updatedata2() {
            x = USdates;
            y = USdeaths;
            marker = "#39ef67";
            console.log("yo")
            // Note the extra brackets around 'x' and 'y'
            Plotly.restyle("plot", "x", [x]);
            Plotly.restyle("plot", "y", [y]);
            Plotly.restyle("plot", "fillcolor", marker)
        }

        d3.select("#dataset3").on("click", updatedata3);
        function updatedata3() {
            x = USdates;
            y = USrecovered;
            marker = "#f23c6d";
            console.log("yo")
            // Note the extra brackets around 'x' and 'y'
            Plotly.restyle("plot", "x", [x]);
            Plotly.restyle("plot", "y", [y]);
            Plotly.restyle("plot", "fillcolor", marker)
        }

    });
}