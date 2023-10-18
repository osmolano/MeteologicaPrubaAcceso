<template>
    <div class="container">

        <div class="row justify-content-center my-4">

            <div class="col text-center">
                <span id="typedText" class="fs-1 fw-bold text-custom-color text-custom-shadow"></span>
            </div>
        </div>

        <div v-if="errorMessage != ''" class="row justify-content-center my-4">
            <div class="col-md-5">
                <div class="alert alert-danger alert-dismissible text-custom-color shadow fw-bold fs-5 bg-white border border-custom-color border-3 fade show"
                    role="alert">
                    <i class="fa-solid fa-circle-xmark fs-4"></i>
                    {{ errorMessage }}
                    <button type="button" @click="restartMessageAlert()" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>

        <div class="row justify-content-center my-4">

            <div class="col-md-5">

                <div class="search-weather-input-container">
                    <input type="text" @keyup="checkEnterKey($event)" class="search-weather-input" v-model="city"
                        placeholder="Write a city...">
                    <button @click="consultWeather()" class="search-weather-input-button"><i
                            class="fa-solid fa-search"></i></button>
                </div>

            </div>



        </div>


        <div class="row justify-content-center mt-2">


            <div class="col-md-4 text-center mb-2">
                <span class="fs-5 fw-bold text-dark-emphasis">What type of forecast do you prefer?</span>
            </div>

            <div class="col-md-4 text-center">
                <div class="form-check form-check-inline">
                    <input class="form-check-input fs-5" @click="selectForecastType('next24hours')" type="radio"
                        name="inlineRadioOptions" id="inlineRadio1" value="option1">
                    <label class="form-check-label fw-semibold fs-5 text-secondary" for="inlineRadio1">Next 24 hours</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input fs-5" @click="selectForecastType('next7days')" type="radio"
                        name="inlineRadioOptions" id="inlineRadio2" value="option2">
                    <label class="form-check-label fw-semibold fs-5 text-secondary" for="inlineRadio2">Next 7 days</label>
                </div>
            </div>


        </div>

        <div class="row justify-content-around my-3">

            <div v-if="weatherData != ''" class="col-md-4 text-center">

                <div class="row justify-content-center">
                    <div class="col-12">
                        <span class="fs-4 fw-bold text-custom-color border-bottom border-3 border-custom-color">Weather
                            statistics</span>
                    </div>
                    <div class="col-12">
                        <button @click="createChart(['temp', 'feelslike'], ['rgba(255, 91, 91', 'rgba(252, 131, 53'])"
                            class="btn btn-outline-custom-color p-3 m-3" data-bs-container="body" data-bs-toggle="popover"
                            data-bs-placement="top" data-bs-trigger="hover" data-bs-content="Temperature">
                            <i class="fa-solid fs-3 fa-temperature-full"></i>
                        </button>
                        <button @click="createChart(['precip', 'snow'], ['rgba(25, 116, 255', 'rgba(168, 202, 255'])"
                            class="btn btn-outline-custom-color p-3 m-3" data-bs-container="body" data-bs-toggle="popover"
                            data-bs-placement="top" data-bs-trigger="hover" data-bs-content="Precipitation">
                            <i class="fa-solid fs-3 fa-cloud-rain"></i>
                        </button>
                        <button @click="createChart(['windspeed', 'windgust'], ['rgba(255, 227, 29', 'rgba(254, 251, 99'])"
                            class="btn btn-outline-custom-color p-3 m-3" data-bs-container="body" data-bs-toggle="popover"
                            data-bs-placement="top" data-bs-trigger="hover" data-bs-content="Wind">
                            <i class="fa-solid fs-3 fa-wind"></i>
                        </button>
                    </div>
                </div>

            </div>

            <div v-if="weatherData != ''" class="col-md-4 text-center">

                <div class="row justify-content-center">
                    <div class="col-12">
                        <span class="fs-4 fw-bold text-custom-color border-bottom border-3 border-custom-color">Chart
                            types</span>
                    </div>
                    <div class="col-12">
                        <button @click="changeChartType('bar', {
                            maxBarThickness: 50,
                            maintainAspectRatio: false,
                            responsive: true,
                        })" class="btn btn-outline-custom-color p-3 m-3" data-bs-container="body"
                            data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover"
                            data-bs-content="Bar chart">
                            <i class="fa-solid fs-3 fa-chart-column"></i>
                        </button>
                        <button @click="changeChartType('line', {
                            maintainAspectRatio: false,
                            responsive: true,
                        })" class="btn btn-outline-custom-color p-3 m-3" data-bs-container="body"
                            data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover"
                            data-bs-content="Line chart">
                            <i class="fa-solid fs-3 fa-chart-line"></i>
                        </button>
                        <button @click="changeChartType('radar', {
                            maintainAspectRatio: false,
                            responsive: true,
                        })" class="btn btn-outline-custom-color p-3 m-3" data-bs-container="body"
                            data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover"
                            data-bs-content="Radar chart">
                            <i class="fa-solid fs-3 fa-chart-area"></i>
                        </button>
                    </div>
                </div>


            </div>

        </div>

        <div class="row justify-content-center">
            <div class="col" style="min-height: 400px;">
                <canvas id="myChart"></canvas>
            </div>
        </div>


        <div class="modal fade" id="maxForecastsModal" tabindex="-1" aria-labelledby="maxForecastsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div data-bs-theme="dark" class="modal-header bg-custom-color py-2">
                        <i class="fa-solid fa-triangle-exclamation text-white fs-4"></i>
                        <h1 class="modal-title fs-4 text-white" id="maxForecastsModalLabel">&nbsp;&nbsp;Information</h1>
                        <button type="button" class="btn-close fs-5" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body bg-light rounded-2 rounded-top-0">

                        <div class="row justify-content-center">
                            <div class="col fs-4 fw-bold text-center text-custom-dark-color">
                                {{ maxForecastsReachedMessages[0] }}
                            </div>

                        </div>

                        <div class="row justify-content-center mt-2 border-top border-2 border-custom-color">

                            <div class="col-12 fs-5 mt-2 fw-semibold text-center text-custom-color">
                                {{ maxForecastsReachedMessages[1] }}
                            </div>

                            <div class="col-12 mt-1 text-center">
                                <a href="/" class="fs-6 fst-italic fw-semibold text-custom-light-color">
                                    <i class="fa-solid fa-arrow-right fs-6 text-custom-light-color"></i>
                                    &nbsp;{{ maxForecastsReachedMessages[2] }}&nbsp;
                                    <i class="fa-solid fa-arrow-left fs-6 text-custom-light-color"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

import { Modal, Popover } from 'bootstrap';

import Typed from 'typed.js';

import { Chart } from 'chart.js/auto';

export default {
    name: 'WeatherForecastsApp',
    data() {
        return {
            city: '',
            weatherData: '',
            errorMessage: '',
            maxForecastsReachedMessages: [],
            forecastType: '',
            popoverList: []
        }
    },
    watch: {
        weatherData(newValue, oldValue) {

            this.createChart(['temp', 'feelslike'], ['rgba(255, 91, 91', 'rgba(252, 131, 53']);

            this.$nextTick(() => {
                if (this.popoverList.length === 0) {

                    const THIZ = this;

                    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')

                    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl))

                    THIZ.popoverList = popoverList;

                }
            })

        }
    },
    mounted() {

        const options = {
            strings: ["Weather Forecasts"],
            typeSpeed: 75,
            startDelay: 500,
            backSpeed: 25,
            backDelay: 1000
        };

        const typed = new Typed('#typedText', options);

    },
    methods: {
        restartMessageAlert(){
            const THIZ = this;

            THIZ.errorMessage = '';
        },

        checkEnterKey(event) {

            let keyCode = event.keyCode;

            if (keyCode === 13) {
                this.consultWeather();
            }

        },

        selectForecastType(forecastType) {
            const THIZ = this;

            THIZ.forecastType = forecastType;
        },
        consultWeather() {

            const THIZ = this;

            THIZ.errorMessage = '';
            THIZ.maxForecastsReachedMessages = [];

            fetch(window.location.origin + "/weatherForecast?city=" + this.city + "&forecastType=" + this.forecastType, {
                method: "GET"
            })
                .then(async response => {

                    if (!response.ok) {

                        const responseData = await response.json();

                        throw responseData;
                    }
                    else {
                        return response.json();
                    }
                })
                .then(weatherData => {

                    const THIZ = this;

                    THIZ.weatherData = weatherData;

                    console.log(weatherData);

                })
                .catch(jsonErrorData => {

                    const THIZ = this;

                    if (jsonErrorData.type === 0) {
                        THIZ.errorMessage = jsonErrorData.message;
                    }

                    if (jsonErrorData.type === 1) {
                        THIZ.maxForecastsReachedMessages = jsonErrorData.messages;

                        const errorModal = new Modal(document.getElementById('maxForecastsModal'));

                        errorModal.show();
                    }

                });

        },
        createChart(datasetsData, datasetsColors) {
            const ctx = document.getElementById('myChart').getContext('2d');

            let chartType = 'bar';


            if (window.chart) {
                chartType = window.chart.config._config.type;
                window.chart.clear();
                window.chart.destroy();
            }

            window.chart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: this.calculateWeatherDataInformation("datetime"),
                    datasets: [
                        {
                            label: datasetsData[0].charAt(0).toUpperCase() + datasetsData[0].slice(1),
                            data: this.calculateWeatherDataInformation(datasetsData[0]),
                            backgroundColor: datasetsColors[0] + ", 0.4)",
                            borderColor: datasetsColors[0] + ", 1)",
                            borderWidth: 1,

                        },
                        {
                            label: datasetsData[1].charAt(0).toUpperCase() + datasetsData[1].slice(1),
                            data: this.calculateWeatherDataInformation(datasetsData[1]),
                            backgroundColor: datasetsColors[1] + ", 0.4)",
                            borderColor: datasetsColors[1] + ", 1)",
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    maxBarThickness: 50,
                    maintainAspectRatio: false, // Agrega esta línea para deshabilitar el mantenimiento del aspecto
                    responsive: true,
                }
            });

        },
        calculateWeatherDataInformation(statName) {

            if (this.weatherData.days.length > 2) {
                return this.weatherData.days.flatMap(day => {
                    return day[statName];
                })
            }
            else {

                let allHours = this.weatherData.days.flatMap(day => {

                    if (statName === 'datetime') {
                        return day.hours.map(hour => { return day.datetime + "T" + hour[statName] });
                    }
                    else {
                        return day.hours.map(hour => hour[statName]);
                    }

                })

                const next24HoursIndex = new Date(this.weatherData.days[0].datetime + "T" +
                    this.weatherData.currentConditions.datetime).getHours() + 1;

                let retArray = allHours.slice(next24HoursIndex, next24HoursIndex + 24);

                return retArray;
            }
        },
        changeChartType(chartType, options) {

            const ctx = document.getElementById('myChart').getContext('2d');

            const chartData = window.chart.data;

            window.chart.clear();

            window.chart.destroy();

            window.chart = new Chart(ctx, {
                type: chartType,
                data: chartData,
                options: options
            });

        }
    }
}

</script>