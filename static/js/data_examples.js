var route = "apidata";

program(route)
function program(route) {
    // get the data
    d3.json(route).then(function (data) {
        
        USdata = data.cases



        console.log(USdata);
        // create dynamic table for data with column headings
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
        });
    });
}        
