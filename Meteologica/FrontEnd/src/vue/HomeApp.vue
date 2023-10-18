<template>
    <div class="container mb-5">

        <div class="row justify-content-around my-5">

            <div class="col-md-4 text-center">
                <div class="d-flex justify-content-center">
                    <div class="custom-card">
                        <div class="custom-card-header"></div>
                        <div class="custom-card-body">
                            <span class="fs-5 text-custom-color fst-italic fw-bold">¡Make a weather forecast for any city!</span>         
                            <i class="fa-solid fa-cloud-bolt custom-card-body-icon"></i>
                        </div>
                        <div class="custom-card-footer">
                            <button class="custom-btn-unstyled" @click="goToForecastsPage()">
                                <i class="fa-solid fa-arrow-right custom-card-footer-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4 text-center">
                <div class="d-flex justify-content-center">
                    <div class="custom-card">
                        <div class="custom-card-header"></div>
                        <div class="custom-card-body">
                            <canvas id="homeChart" class="custom-card-body-canvas"></canvas>
                            <span class="fs-5 text-custom-color fst-italic fw-bold">¡Consult different weather statistics!</span>
                        </div>
                        <div class="custom-card-footer">
                            <button class="custom-btn-unstyled" @click="goToForecastsPage()">
                                <i class="fa-solid fa-arrow-right custom-card-footer-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

import { Chart } from 'chart.js/auto';

export default {
    name: 'HomeApp',
    data() {
        return {
            message: "message"
        }
    },
    mounted() {

        let ctx = document.getElementById("homeChart").getContext('2d');

        window.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Fact 1', 'Fact 2', 'Fact 3'],
                datasets: [
                    {
                        label: "Data",
                        data: [4, 2, 3],
                        backgroundColor: "rgb(255, 159, 180)"

                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        display: false, // Esto oculta las etiquetas numéricas en el eje Y
                    }
                },
                maxBarThickness: 20,
                maintainAspectRatio: false, // Agrega esta línea para deshabilitar el mantenimiento del aspecto
                responsive: true,
            }
        });
    },
    methods: {
        goToForecastsPage() {

            window.location.href = window.location.origin + "/forecasts";
        }
    }
}

</script>