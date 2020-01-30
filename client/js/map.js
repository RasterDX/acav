const data = [{
    type: 'scattergeo',
    mode: 'markers',
    locations: ['FRA', 'DEU', 'RUS', 'ESP'],
    marker: {
        size: [20, 30, 15, 10],
        color: [10, 20, 40, 50],
        cmin: 0,
        cmax: 50,
        colorscale: 'Greens',
        colorbar: {
            title: 'Some rate',
            ticksuffix: '%',
            showticksuffix: 'last'
        },
        line: {
            color: 'black'
        }
    },
    name: 'europe data'
}];

const layout = {
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

Plotly.plot("myDiv", data, layout, {showLink: false});