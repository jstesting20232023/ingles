document.addEventListener('DOMContentLoaded', function() {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Obtener el día de la semana actual
    var today = new Date();
    var dayOfWeek = today.getDay();
    var currentDay = daysOfWeek[dayOfWeek];

    // URL base para los verbos individuales
    var verbosBaseUrl = 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/verbs/';

    // Elementos HTML a los que queremos actualizar
    var dayOfWeekElem = document.getElementById('dayOfWeek');
    var infinitiveElem = document.getElementById('infinitive');
    var tenseTitleElem = document.getElementById('tense-title');
    var conjugationsElem = document.getElementById('conjugations');

    // Función para realizar una solicitud XMLHttpRequest
    function makeRequest(method, url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(null, xhr.responseText);
                } else {
                    callback('Error: ' + xhr.statusText);
                }
            }
        };
        xhr.send();
    }

    // Función para cargar y mostrar un verbo aleatorio del JSON
    function loadVerbOfTheDay() {
        // Fetch del plan semanal usando XMLHttpRequest
        makeRequest('GET', 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/weekly-plan.json', function(error, response) {
            if (error) {
                console.error('Error al cargar el archivo JSON del plan semanal:', error);
                infinitiveElem.textContent = 'Error al cargar el plan semanal';
                tenseTitleElem.textContent = '';
                conjugationsElem.textContent = '';
                return;
            }

            var weeklyPlan = JSON.parse(response);
            // Obtener el verbo correspondiente al día de la semana actual
            var selectedVerb = weeklyPlan[currentDay];
            // Construir la URL del archivo JSON del verbo seleccionado
            var url = verbosBaseUrl + selectedVerb + '.json';

            // Fetch del JSON del verbo seleccionado usando XMLHttpRequest
            makeRequest('GET', url, function(error, response) {
                if (error) {
                    console.error('Error al cargar el archivo JSON del verbo:', error);
                    infinitiveElem.textContent = 'Error al cargar los datos';
                    tenseTitleElem.textContent = '';
                    conjugationsElem.textContent = '';
                    return;
                }

                var verbo = JSON.parse(response);
                var infinitiveText = verbo.infinitive;
                infinitiveElem.textContent = infinitiveText;

                // Mostrar pronombres
                conjugationsElem.innerHTML = `
                    <p>I: </p>
                    <p>You: </p>
                    <p>He/She/It: </p>
                    <p>We: </p>
                    <p>They: </p>
                `;

                // Array de tiempos verbales a mostrar
                var tenses = [
                    { title: 'Present Simple', conjugations: verbo.conjugations.present },
                    { title: 'Past', conjugations: verbo.conjugations.past },
                    { title: 'Present Perfect', conjugations: verbo.conjugations.presentPerfect }
                ];

                var currentIndex = 0;

                // Función para cambiar entre tiempos verbales
                function changeTense() {
                    var tense = tenses[currentIndex];
                    tenseTitleElem.textContent = tense.title;

                    // Mostrar solo los pronombres durante 5 segundos
                    conjugationsElem.innerHTML = `
                        <p>I: </p>
                        <p>You: </p>
                        <p>He/She/It: </p>
                        <p>We: </p>
                        <p>They: </p>
                    `;

                    // Después de 5 segundos, mostrar los verbos conjugados
                    setTimeout(function() {
                        conjugationsElem.innerHTML = `
                            <p>I: ${tense.conjugations.I}</p>
                            <p>You: ${tense.conjugations.You}</p>
                            <p>He/She/It: ${tense.conjugations['He/She/It']}</p>
                            <p>We: ${tense.conjugations.We}</p>
                            <p>They: ${tense.conjugations.They}</p>
                        `;
                    }, 5000);

                    currentIndex = (currentIndex + 1) % tenses.length;
                }

                // Mostrar el primer tiempo verbal
                changeTense();

                // Cambiar cada 10 segundos
                setInterval(function() {
                    changeTense();
                }, 10000);

                dayOfWeekElem.textContent = 'Day: ' + currentDay;
            });
        });
    }

    // Llamar a la función para cargar el verbo del día
    loadVerbOfTheDay();

    // Mostrar "Loading..." mientras se cargan los datos
    dayOfWeekElem.textContent = 'Loading...';
    infinitiveElem.textContent = 'Loading...';
    tenseTitleElem.textContent = 'Loading...';
    conjugationsElem.textContent = 'Loading...';
});
