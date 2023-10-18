
import '../scss/styles.scss';

import 'bootstrap-js';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // O importa otros íconos que necesites

// Agrega los íconos importados a la biblioteca de Font Awesome
library.add(fas);

// Activa el modo de reemplazo automático para que los íconos se representen como elementos <i> en tu HTML
dom.watch();