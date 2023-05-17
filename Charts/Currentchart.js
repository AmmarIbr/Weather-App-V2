function getCurrentChart() {
    let options = {
        chart: {
            type: 'line',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false | '<img src="/static/icons/reset.png" width="20">',
                }
            },
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 0,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.35
            },
        },
        series: [{
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        }],
        colors: ['#f7bc4d'],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
            labels: {
                style: { colors: '#fff5e3' }
            }
        },
        yaxis: {
            labels: {
                style: { colors: '#fff5e3' }
            }
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 0,
        },
        tooltip: {
            intersect: true,
            shared: false,
        },
        grid: {
            show: false,
        }
    }
    let chart = new ApexCharts(document.querySelector("#currentChart"), options);

    chart.render();
}

getCurrentChart()