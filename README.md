<- Instrucciones para lanzar el programa ->

1. Ubíquese en la raíz del proyecto 'Meteologica/'

2. Ejecute el comando npm install para instalar todas las dependencias de node

// Cada vez que se ejecute npm run start se actualiza la carpeta dist y se ejecuta el servidor de express nuevamente
3. Ejecute el comando npm run start
//Los cambios en el Back-end se refrescan automáticamente, pero para ver los cambios de Front-end hay que volver a ejecutar npm run start


<- Otros datos a tener en cuenta ->

El Back-end está realizado con el framework de express y el Front-end utiliza tanto Vue 3 como Webpack y Sass. También se utiliza el motor de plantillas ejs y nodemon para refrescar el servidor automáticamente si detecta cambios (solo funciona para server.js y los archivos.ejs). Por último se implementa chart.js para mostrar las diferentes estadísticas de la predicción del tiempo.

La API utilizada es: https://www.visualcrossing.com/weather-api
