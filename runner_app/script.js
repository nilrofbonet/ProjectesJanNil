// script.js

function showPaceCalculator() {
  document.getElementById('main-menu').classList.add('hidden');
  document.getElementById('calculator').classList.remove('hidden');
  document.getElementById('calc-title').innerText = 'Calcular Ritmo (min/km o min/milla)';

  // Formulario con opciones de distancia y tiempo
  document.getElementById('input-fields').innerHTML = `
   <label>Distancia:</label>
    <input type="number" id="distance" placeholder="Distancia" />
    <select id="distance-unit">
      <option value="km">Kilómetros</option>
      <option value="miles">Millas</option>
    </select>

    <label>Tiempo Total:</label>
    <input type="number" id="hours" placeholder="Horas" min="0" style="width: 60px;" /> :
    <input type="number" id="minutes" placeholder="Minutos" min="0" max="59" style="width: 60px;" />

    <label>Unidad de Ritmo:</label>
    <select id="pace-unit">
      <option value="min/km">min/km</option>
      <option value="min/mile">min/milla</option>
    </select>
  `;
}

function showTotalTimeCalculator() {
  document.getElementById('main-menu').classList.add('hidden');
  document.getElementById('calculator').classList.remove('hidden');
  document.getElementById('calc-title').innerText = 'Calcular Tiempo Total';

  // Formulario con opciones para distancia y ritmo
  document.getElementById('input-fields').innerHTML = `
    <label>Distancia:</label>
    <input type="number" id="distance" placeholder="Distancia" />
    <select id="distance-unit">
      <option value="km">Kilómetros</option>
      <option value="miles">Millas</option>
    </select>
    
    <label>Ritmo:</label>
    <input type="number" id="pace" placeholder="Ritmo" />
    <select id="pace-unit">
      <option value="min/km">min/km</option>
      <option value="min/mile">min/milla</option>
    </select>
  `;
}

function calculate() {
  const distance = parseFloat(document.getElementById('distance').value);
  const distanceUnit = document.getElementById('distance-unit').value;
  const hours = parseFloat(document.getElementById('hours').value) || 0;
  const minutes = parseFloat(document.getElementById('minutes').value) || 0;
  const paceUnit = document.getElementById('pace-unit') ? document.getElementById('pace-unit').value : null;
  const resultElement = document.getElementById('result');

  resultElement.innerHTML = '';

  if (distance && (hours || minutes)) {
    // Convertir la distancia a kilómetros si está en millas
    let distanceInKm = distance;
    if (distanceUnit === 'miles') {
      distanceInKm = distance * 1.60934; // 1 milla = 1.60934 km
    }

    // Convertir el tiempo total a minutos
    const totalMinutes = hours * 60 + minutes;

    // Calcular el ritmo en min/km
    let paceInMinPerKm = totalMinutes / distanceInKm;

    // Convertir el ritmo a min/milla si se seleccionó min/mile
    let pace = paceInMinPerKm;
    if (paceUnit === 'min/mile') {
      pace = paceInMinPerKm * 1.60934; // Convertir min/km a min/milla
    }

    // Mostrar el resultado
    resultElement.innerText = `Ritmo: ${pace.toFixed(2)} ${paceUnit}`;
  } else if (distance && (paceUnit)) {
    resultElement.innerText = 'Por favor, introduce todos los valores';
  } else {
    resultElement.innerText = 'Por favor, introduce todos los valores';
  }
}

function backToMenu() {
  document.getElementById('main-menu').classList.remove('hidden');
  document.getElementById('calculator').classList.add('hidden');
  document.getElementById('result').innerHTML = '';
}
