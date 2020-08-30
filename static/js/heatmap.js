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

  

  var route = "/api/all-heat"
  d3.selectAll("#selDate").on("change", updateAPI);
  var geojson;
      
  function updateAPI () {
      var dateMenu = d3.select("#selDate");
      var dateset = dateMenu.property("value");
      if (dateset === 'set1') {
          route = "api/all-heat"
      }
      if (dateset === 'set2') {
          route = "api/march-heat"
      }
      if (dateset === 'set3') {
          route = "api/april-heat"
      }
      if (dateset === 'set4') {
          route = "api/may-heat"
      }
      if (dateset === 'set5') {
          route = "api/june-heat"
      }
      if (dateset === 'set6') {
          route = "api/july-heat"
      }
      console.log(dateset)
      choroMap(route)
  };

  choroMap(route)

function choroMap(route) {
  // Grab data with d3
  d3.json(route).then(function(data) {
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
    if(legend instanceof L.Control){map.removeControl(legend);}
    legend.addTo(myMap);
    // myMap.scrollZoom.disable();

  });
}