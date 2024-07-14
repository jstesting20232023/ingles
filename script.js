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

    // Función para cargar y mostrar un verbo aleatorio del JSON
    function loadVerbOfTheDay() {
        // Fetch del plan semanal usando XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var weeklyPlan = JSON.parse(xhr.responseText);
                    // Obtener el verbo correspondiente al día de la semana actual
                    var selectedVerb = weeklyPlan[currentDay];
                    // Construir la URL del archivo JSON del verbo seleccionado
                    var url = verbosBaseUrl + selectedVerb + '.json';

                    // Fetch del JSON del verbo seleccionado usando XMLHttpRequest
                    var xhrVerb = new XMLHttpRequest();
                    xhrVerb.onreadystatechange = function() {
                        if (xhrVerb.readyState === 4) {
                            if (xhrVerb.status === 200) {
                                var verbo = JSON.parse(xhrVerb.responseText);
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
                            } else {
                                console.error('Error al cargar el archivo JSON del verbo:', xhrVerb.statusText);
                                infinitiveElem.textContent = 'Error al cargar los datos';
                                tenseTitleElem.textContent = '';
                                conjugationsElem.textContent = '';
                            }
                        }
                    };
                    xhrVerb.open('GET', url, true);
                    xhrVerb.send();
                } else {
                    console.error('Error al cargar el archivo JSON del plan semanal:', xhr.statusText);
                    infinitiveElem.textContent = 'Error al cargar el plan semanal';
                    tenseTitleElem.textContent = '';
                    conjugationsElem.textContent = '';
                }
            }
        };
        xhr.open('GET', 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/weekly-plan.json', true);
        xhr.send();
    }

    // Llamar a la función para cargar el verbo del día
    loadVerbOfTheDay();
});
