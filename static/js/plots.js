// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 50},
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
var route = "api"
d3.selectAll("#selDate").on("change", updateRoute);
function updateRoute () {
    var dateMenu = d3.select("#selDate");
    var dateset = dateMenu.property("value");
    if (dateset === 'dataset1') {
        route = "api"
    }
    if (dateset === 'dataset2') {
        route = "api/march"
    }
    if (dateset === 'dataset3') {
        route = "api/april"
    }
    if (dateset === 'dataset4') {
        route = "api/may"
    }
    if (dateset === 'dataset5') {
        route = "api/june"
    }
    if (dateset === 'dataset6') {
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

        console.log(recoveredsum);
        console.log(recoveredmean);
        console.log(deathsum);
        console.log(deathmean);
        console.log(casesum);
        console.log(casemean);

        data = {
            datasets: [{
                data: [recoveredsum, deathsum],
                backgroundColor:["#39ef67", "#f23c6d"],
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['Hospital Recoveries', 'Deaths'],
        };

        var ctx = document.getElementById('myChart');
        
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            // options: {backgroundColor:["green", "red"]}
        });

        // var piedata = [{
        //     values: [recoveredsum, deathsum],
        //     labels: ['Hospital Recoveries', 'Deaths'],
        //     marker: {colors: ["green", "red"]},
        //     type: 'pie'
        //   }];
          
        //   var layout = {
        //     height: 400,
        //     width: 500
        //   };
          
        // Plotly.newPlot('pie', piedata, layout);



        // Initializes the page with a default plot 
        function init(xaxis, yaxis) {
            var data = [{
                x: xaxis,
                y: yaxis,
                fill: 'tozeroy',
                fillcolor: '#f7d333',
                // color: "#fc180c",
                type: 'line',
                mode: 'none',
                // line: {color: "#fc180c"}
            }];
            Plotly.newPlot("plot", data)
        };
        // Call updatePlotly() when a change takes place to the DOM
        d3.selectAll("#selDataset").on("change", updatePlotly);
        // This function is called when a dropdown menu item is selected
        function updatePlotly() {
            // Use D3 to select the dropdown menu
            var dropdownMenu = d3.select("#selDataset");
            // Assign the value of the dropdown menu option to a variable
            var dataset = dropdownMenu.property("value");
            console.log(USdeaths)
            console.log(USrecovered)
            // Initialize x and y arrays
            var x = [];
            var y = [];
            var marker = "";
            if (dataset === 'dataset1') {
                x = USdates;
                y = UScases;
                marker = "#f7d333";
            }
            if (dataset === 'dataset2') {
                x = USdates;
                y = USdeaths;
                marker = "#f23c6d";
            }
            if (dataset === 'dataset3') {
                x = USdates;
                y = USrecovered;
                marker = "#39ef67";
            }
            // Note the extra brackets around 'x' and 'y'
            Plotly.restyle("plot", "x", [x]);
            Plotly.restyle("plot", "y", [y]);
            Plotly.restyle("plot", "fillcolor",marker)

        };
    });
}