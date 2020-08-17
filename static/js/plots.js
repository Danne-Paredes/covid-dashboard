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
        route = "api/May"
    }
    if (dateset === 'dataset5') {
        route = "api/june"
    }
    if (dateset === 'dataset6') {
        route = "api/july"
    }
    program(route)
};

program(route)

function program(route) {
    // get the data
    d3.json(route).then(function (data) {

        USdata = data
        // var USdata = data.filter(function (d) { return d.Country === "US" });
        console.log(USdata)
        var UScases = USdata.cases.map(USdata => USdata.Confirmed);
        var USrecovered = USdata.cases.map(USdata => USdata.Recovered);
        var USdeaths = USdata.cases.map(USdata => USdata.Deaths);
        var USdates = USdata.cases.map(USdata => USdata.Date);
        init(USdates, UScases);


        // Initializes the page with a default plot 
        function init(xaxis, yaxis) {
            data = [{
                x: xaxis,
                y: yaxis,
                type: "histogram"
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

            // Initialize x and y arrays
            var x = [];
            var y = [];

            if (dataset === 'dataset1') {
                x = USdates;
                y = UScases;
            }

            if (dataset === 'dataset2') {
                x = USdates;
                y = USdeaths;
            }

            if (dataset === 'dataset3') {
                x = USdates;
                y = USrecovered;
            }

            // Note the extra brackets around 'x' and 'y'
            Plotly.restyle("plot", "x", [x]);
            Plotly.restyle("plot", "y", [y]);
        }

    });
}
