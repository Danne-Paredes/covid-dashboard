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
  
// get the data
d3.json("localhost:5000/api").then(function (data) {
    console.log(data)
    var USdata = data.filter(function (d) { return d.Country === "US" });
    console.log(USdata)
    var UScases = USdata.map(USdata => USdata.Confirmed);
    var USrecovered = USdata.map(USdata => USdata.Recovered);
    var USdeaths = USdata.map(USdata => USdata.Deaths);
    var USdates = USdata.map(USdata => USdata.Date);
    console.log(USdata)
    init(USdates, UScases);
});
// Initializes the page with a default plot 
function init(xaxis, yaxis) {
    data = [{
        x: xaxis,
        y: yaxis
    }];

    Plotly.newPlot("dropdown", data)
};
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

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


