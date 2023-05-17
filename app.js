const toggleWeek = document.querySelector('.toggleWeek')
/* const toggleWeekTwo = document.querySelector('.toggleWeekTwo') */
const openDialog = document.querySelector('.openDialog')
const closeDialog = document.querySelector('.closeDialog')
const airQualityDialog = document.querySelector('#airQualityDialog')
const currentTime = document.querySelector('.currentTime')
const currentTemp = document.querySelector('.currentTemp')
const feelsLike = document.querySelector('.feelsLike')
const currentWind = document.querySelector('.currentWind')
const airQualityInfo = document.querySelector('.airQualityInfo')
const currentCondition = document.querySelector('.currentCondition')

function getCurrentDate() {
    let date = new Date();
    /* console.log(date.getMonth()) */
    let hour = date.getHours();
    let min = date.getMinutes();
    let month = moment()._locale._months
    let amOrpm = "";
    if (hour % 12 === 0) {
        hour = 12;
        amOrpm = "AM";
    } else if (hour >= 12) {
        hour = hour % 12;
        amOrpm = "PM";
    } else {
        amOrpm = "AM";
    }
    if (min < 10) {
        min = `0${min}`;
    }
    currentTime.textContent = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hour}:${min} ${amOrpm}`;
}
getCurrentDate()


async function getIp() {
    const ipConfig = { params: { q: "auto:ip" } };
    const ipRes = await axios.get(
        `https://api.weatherapi.com/v1/ip.json?key=30832b5a2a13422485f64334231003`,
        ipConfig
    );
    console.log(ipRes.data.ip);
    //getCurrentWeather(ipRes.data.ip)
    getForecastWeather(ipRes.data.ip)

    /*     const config = { params: { q: ipRes.data.ip } };
        const res = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=30832b5a2a13422485f64334231003`,
          config
        );
        setCurrentWeather(res.data.current);
        h1.textContent = `${ipRes.data.city}, ${ipRes.data.country_name}`;
        setIcon(res.data.current);
        setOtherDetails(res.data.current);
        displayTemp.innerText = `${res.data.current.temp_c}°`;
        celsius.textContent = "C";
        celsius.classList.add("celsius");
        displayTemp.appendChild(celsius);
        // celsius.textContent = "C";
        feel.textContent = `Feels Like ${res.data.current.feelslike_c}°`;
        condition.textContent = res.data.current.condition.text; */
}

async function getCurrentWeather(location) {
    const config = { params: { q: location, aqi: 'yes' } }
    const response = await axios.get('https://api.weatherapi.com/v1/current.json?key=30832b5a2a13422485f64334231003', config)
    const { current } = response.data
    currentTemp.innerText = `${Math.floor(current.temp_c)}° +/- 1`
    feelsLike.innerText = `FeelsLike: ${current.feelslike_c}°`
    currentWind.innerText = `Wind: ${current.wind_dir} ${current.wind_kph}kmh`
    airQuality = Object.values(current.air_quality)[Object.keys(current.air_quality).length - 2]
    airQualityInfo.innerText = `Air Quality: ${airQuality}`
    currentCondition.innerText = `${current.condition.text}`

}

async function getForecastWeather(location) {
    const config = { params: { q: 'Springfield, Missouri', aqi: 'yes', alerts: 'yes' } }
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json?key=30832b5a2a13422485f64334231003', config)
    console.log(response.data.alerts.alert[0].headline)
}


getIp()

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

function getWeekOneChart() {
    let options = {
        chart: {
            height: 500,
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
            name: 'Low',
            data: [-15, 20, -17, 25, 26, -30, 30],
        },
        {
            name: 'High',
            data: [30, 40, 35, 50, 49, 60, 70],
        }
        ],
        colors: ['#4890FF', '#f7bc4d'],
        xaxis: {
            categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            labels: {
                style: { colors: '#fff5e3' }
            },
            axisTicks: {
                show: false
            },
        },
        yaxis: {
            labels: {
                style: { colors: '#fff5e3' }
            },
            tickAmount: 10,
            forceNiceScale: true
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
            show: true,
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        legend: {
            show: true,
            position: 'top',
            onItemHover: {
                highlightDataSeries: true
            },
            labels: {
                useSeriesColors: true
            },
        }
    }
    let chart = new ApexCharts(document.querySelector("#weekOneChart"), options);

    chart.render();

}
getWeekOneChart()

function getWeekTwoChart() {
    let options = {
        chart: {
            height: 500,
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
            name: 'Low',
            data: [25, 35, 30, 40, 45, 58, 70],
        },
        {
            name: 'High',
            data: [30, 40, 35, 50, 49, 60, 70],
        }
        ],
        colors: ['#4890FF', '#f7bc4d'],
        xaxis: {
            categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            labels: {
                style: { colors: '#fff5e3' }
            },
            axisTicks: {
                show: false
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
            show: true,
        },
        legend: {
            show: true,
            position: 'top',
            onItemHover: {
                highlightDataSeries: true
            },
            labels: {
                useSeriesColors: true
            },
        }
    }
    let chart = new ApexCharts(document.querySelector("#weekTwoChart"), options);

    chart.render();

}
getWeekTwoChart()

toggleWeek.addEventListener('click', () => {
    const weekOne = document.querySelector('.weekOne')
    const weekTwo = document.querySelector('.weekTwo')
    weekOne.classList.toggle('active')
    weekTwo.classList.toggle('active')
    if (weekOne.classList.contains('active')) {
        toggleWeek.innerText = 'NEXT 7 DAYS'
    } else {
        toggleWeek.innerText = 'PREVIOUS 7 DAYS'
    }
})

openDialog.addEventListener('click', () => {
    airQualityDialog.show();
});

closeDialog.addEventListener('click', () => {
    airQualityDialog.close();
});