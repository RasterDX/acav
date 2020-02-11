function plot(json) {
    var data = [{
        type: 'scattergeo',
        mode: 'markers',
        locations: json.searchQuery.region.slice(),
        marker: {
            size: json.searchQuery.region.slice(),
            color: json.searchQuery.region.slice(),
            cmin: 0,
            cmax: 100,
            colorscale: 'Reds',
            colorbar: {
                title: 'Popularity'
            },
            line: {
                color: 'black'
            }
        },
        name: 'world data',
        text: []
    }];

    const data_arr = json.data;
    var label_dict = []
    for (var i = 0; i < data_arr.length; i++) {
        data[0].marker.size[i] = data_arr[i].popularity + 10;
        data[0].marker.color[i] = data_arr[i].popularity;
        label_dict[i] = String(data[0].marker.size[i] - 10)
    }
    data[0].text = label_dict;

    var layout = {
        title: 'Test',
        showlegend: false,
        width: 1500,
        height: 600,
        geo: {
            scope: 'world',
            projection: {
                type: 'equirectangular'
            },
            resolution: 110,
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };

    Plotly.plot("myDiv", data, layout, { showLink: false });
}
