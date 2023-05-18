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





async function getIp() {
    const ipConfig = { params: { q: "auto:ip" } };
    const ipRes = await axios.get(
        `https://api.weatherapi.com/v1/ip.json?key=30832b5a2a13422485f64334231003`,
        ipConfig
    );
    console.log(ipRes.data);
    getCurrentDate()
    getCurrentWeather(ipRes.data.ip)
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

async function getCurrentWeather(location) {
    const config = { params: { q: 'Dubai', aqi: 'yes' } }
    const response = await axios.get('https://api.weatherapi.com/v1/current.json?key=30832b5a2a13422485f64334231003', config)
    getTwoWeekData(response.data.location.lat, response.data.location.lon)
    const { current } = response.data
    currentTemp.innerText = `${Math.floor(current.temp_c)}° +/- 2`
    feelsLike.innerText = `FeelsLike: ${current.feelslike_c}°`
    currentWind.innerText = `Wind: ${current.wind_dir} ${current.wind_kph}kmh`
    airQuality = Object.values(current.air_quality)[Object.keys(current.air_quality).length - 2]
    airQualityInfo.innerText = `Air Quality: ${airQuality}`
    currentCondition.innerText = `${current.condition.text}`

}

async function getForecastWeather(location) {
    const config = { params: { q: 'Dubai', aqi: 'yes', alerts: 'yes' } }
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json?key=30832b5a2a13422485f64334231003', config)
    console.log(response.data)
    setAlerts(response.data.alerts)
    hourlyForecast = response.data.forecast.forecastday[0].hour
    let currentChartData = []
    for (let hour of hourlyForecast) {
        currentChartData.push(hour.temp_c)
    }

    getCurrentChart(currentChartData)
}

async function getTwoWeekData(lat, long) {
    console.log(lat)
    console.log(long)
    const config = { params: { latitude: lat, longitude: long, timezone: 'auto', daily: 'temperature_2m_max,temperature_2m_min', forecast_days: 14 } }
    const twoWeekData = await axios.get(`https://api.open-meteo.com/v1/forecast`, config)
    weekOneMax = twoWeekData.data.daily.temperature_2m_max.slice(0, 7)
    weekTwoMax = twoWeekData.data.daily.temperature_2m_max.slice(7, 14)
    weekOneMin = twoWeekData.data.daily.temperature_2m_min.slice(0, 7)
    weekTwoMin = twoWeekData.data.daily.temperature_2m_min.slice(7, 14)
    getWeekOneChart(weekOneMax, weekOneMin)
    getWeekTwoChart(weekTwoMax, weekTwoMin)

}

function setAlerts(data) {
    const headline = document.querySelector('.headline')
    const note = document.querySelector('.note')
    const severity = document.querySelector('.severity')
    if (data.alert.length > 0) {
        let alert = data.alert[0]
        headline.innerText = `${alert.category}.`
        if (alert.note === '') {
            note.innerText = ''
        } else {
            note.innerText = `${alert.note}.`
        }
        if (alert.severity === '') {
            severity.innerText = `Severity: Unknown`
        } else {
            severity.innerText = `Severity: ${alert.severity}`
        }
    } else {
        headline.innerText = 'No current alerts found for your location!'
        note.innerText = ''
        severity.innerText = ''
    }
}

function getCurrentChart(currentChartData) {
    //console.log(currentChartData)
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
            data: currentChartData,
        }],
        colors: ['#f7bc4d'],
        xaxis: {
            categories: ['00', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            labels: {
                style: { colors: '#fff5e3' }
            },
            tickAmount: 10
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

function getWeekOneChart(max, min) {
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
            data: min,
        },
        {
            name: 'High',
            data: max,
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
            },
            opacity: 0.5
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

function getWeekTwoChart(max, min) {
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
            data: min,
        },
        {
            name: 'High',
            data: max,
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

addEventListener('DOMContentLoaded', getIp)
