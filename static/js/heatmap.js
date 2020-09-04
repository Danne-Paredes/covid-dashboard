// Creating map object
var myMap = L.map("map", {
    center: [38.7128, -97.0059],
    zoom: 5,
    scrollWheelZoom: false

  })

    
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  

  var plotroute = "/api/all-heat"
  var route = "api";
  d3.selectAll("#selDate").on("change", updateAPI)
  var geojson;
      
  function updateAPI () {
      var dateMenu = d3.select("#selDate");
      var dateset = dateMenu.property("value");
      if (dateset === 'set1') {
          plotroute = "api/all-heat";
          route = "api"
      }
      if (dateset === 'set2') {
          plotroute = "api/march-heat";
          route = "api/march"
      }
      if (dateset === 'set3') {
          plotroute = "api/april-heat";
          route = "api/april"
      }
      if (dateset === 'set4') {
          plotroute = "api/may-heat";
          route = "api/may"
      }
      if (dateset === 'set5') {
          plotroute = "api/june-heat";
          route = "api/june"
      }
      if (dateset === 'set6') {
          plotroute = "api/july-heat";
          route = "api/july"
      }
      console.log(dateset)
      console.log(route)
      choroMap(plotroute, route)
  };

  choroMap(plotroute, route)

function choroMap(plotroute, route) {
  // Grab data with d3
  d3.json(plotroute).then(function(data) {
    console.log(data)

    // Create a new choropleth layer
    geojson = L.choropleth(data.cases[0], {
      // Define what  property in the features to use
      valueProperty: "confirmed",

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      


      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`<h2 style="text-align:center;">${feature.properties.name}</h3><br><b>Confirmed Cases:</b> ${feature.properties.confirmed}<br><b>Recovered:</b> ${feature.properties.recovered}<br><b>Deaths:</b> ${feature.properties.deaths}`);
      }
    }).addTo(myMap);
    console.log(geojson)
    

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo = "<h1>Confirmed Cases by State</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

    // Adding legend to the map
    if(legend instanceof L.Control){myMap.removeControl(legend);}
    legend.addTo(myMap);


  });

  d3.json(route).then(function (tabledata) {
    USdata = tabledata
    // var USdata = data.filter(function (d) { return d.Country === "US" });
    var UScases = USdata.cases.map(USdata => USdata.Confirmed);
    var USrecovered = USdata.cases.map(USdata => USdata.Recovered);
    var USdeaths = USdata.cases.map(USdata => USdata.Deaths);
    var USdates = USdata.cases.map(USdata => USdata.Date);
    // init(USdates, UScases);

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
    .html(function(d) {
        return `<td>${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td><td>${d[4]}</td>`;
     });

});
}