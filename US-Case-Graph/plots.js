
// // set the dimensions and margins of the graph
// var margin = {top: 10, right: 30, bottom: 30, left: 40},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
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
d3.json("localhost:5000/api").then( function (data) {
    console.log(data)
    var USdata = data.filter(function (d) { return d.Country === "US" });
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

  //   // X axis: scale and draw:

  //   var x = d3.scaleLinear()
  //       .domain([-4,9])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
  //       .range([0, width]);
  //   svg.append("g")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(d3.axisBottom(x));

  //   // set the parameters for the histogram
  //   var histogram = d3.histogram()
  //       .value(function(d) { return +d.value; })   // I need to give the vector of value
  //       .domain(x.domain())  // then the domain of the graphic
  //       .thresholds(x.ticks(40)); // then the numbers of bins

  //   // And apply twice this function to data to get the bins.
  //   var bins1 = histogram(UScases);
  //   var bins2 = histogram(data.filter( function(d){return d.type === "variable 2"} ));

  //   // Y axis: scale and draw:
  //   var y = d3.scaleLinear()
  //       .range([height, 0]);
  //       y.domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  //   svg.append("g")
  //       .call(d3.axisLeft(y));

  //   // append the bars for series 1
  //   svg.selectAll("rect")
  //       .data(bins1)
  //       .enter()
  //       .append("rect")
  //         .attr("x", 1)
  //         .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
  //         .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
  //         .attr("height", function(d) { return height - y(d.length); })
  //         .style("fill", "#69b3a2")
  //         .style("opacity", 0.6)

  //   // append the bars for series 2
  //   svg.selectAll("rect2")
  //       .data(bins2)
  //       .enter()
  //       .append("rect")
  //         .attr("x", 1)
  //         .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
  //         .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
  //         .attr("height", function(d) { return height - y(d.length); })
  //         .style("fill", "#404080")
  //         .style("opacity", 0.6)

  //   // Handmade legend
  //   svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
  //   svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#404080")
  //   svg.append("text").attr("x", 320).attr("y", 30).text("Cases").style("font-size", "15px").attr("alignment-baseline","middle")
  //   svg.append("text").attr("x", 320).attr("y", 60).text("Deaths").style("font-size", "15px").attr("alignment-baseline","middle")

  // });

