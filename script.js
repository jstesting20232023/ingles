document.addEventListener('DOMContentLoaded', function() {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Obtener el día de la semana actual
    var today = new Date();
    var dayOfWeek = today.getDay();
    var currentDay = daysOfWeek[dayOfWeek];

    // Mostrar el día de la semana actual en el HTML
    document.getElementById('dayOfWeek').innerText = 'Day: ' + currentDay;

    // URL base para los verbos individuales
    var verbosBaseUrl = 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/verbs/';

    // Fetch del plan semanal
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var weeklyPlan = JSON.parse(xhr.responseText);
                // Obtener el verbo correspondiente al día de la semana actual
                var selectedVerb = weeklyPlan[currentDay];
                // Construir la URL del archivo JSON del verbo seleccionado
                var url = verbosBaseUrl + selectedVerb + '.json';

                // Fetch del JSON del verbo seleccionado
                var xhrVerb = new XMLHttpRequest();
                xhrVerb.onreadystatechange = function() {
                    if (xhrVerb.readyState === 4) {
                        if (xhrVerb.status === 200) {
                            var verbo = JSON.parse(xhrVerb.responseText);
                            var infinitiveText = verbo.infinitive;
                            document.getElementById('infinitive').innerText = infinitiveText;

                            var presentConjugations = 
                                'I ' + verbo.conjugations.present.I + '<br>' +
                                'You ' + verbo.conjugations.present.You + '<br>' +
                                'He/She/It ' + verbo.conjugations.present['He/She/It'] + '<br>' +
                                'We ' + verbo.conjugations.present.We + '<br>' +
                                'They ' + verbo.conjugations.present.They;

                            var pastConjugations = 
                                'I ' + verbo.conjugations.past.I + '<br>' +
                                'You ' + verbo.conjugations.past.You + '<br>' +
                                'He/She/It ' + verbo.conjugations.past['He/She/It'] + '<br>' +
                                'We ' + verbo.conjugations.past.We + '<br>' +
                                'They ' + verbo.conjugations.past.They;

                            var presentPerfectConjugations = 
                                'I have ' + verbo.conjugations.presentPerfect.I + '<br>' +
                                'You have ' + verbo.conjugations.presentPerfect.You + '<br>' +
                                'He/She/It has ' + verbo.conjugations.presentPerfect['He/She/It'] + '<br>' +
                                'We have ' + verbo.conjugations.presentPerfect.We + '<br>' +
                                'They have ' + verbo.conjugations.presentPerfect.They;

                            var tenses = [
                                { title: 'Present Simple', conjugations: presentConjugations },
                                { title: 'Past', conjugations: pastConjugations },
                                { title: 'Present Perfect', conjugations: presentPerfectConjugations }
                            ];

                            var currentIndex = 0;
                            var displayTense = function() {
                                var tense = tenses[currentIndex];
                                document.getElementById('tense-title').innerText = tense.title;
                                document.getElementById('conjugations').innerHTML = tense.conjugations;
                                currentIndex = (currentIndex + 1) % tenses.length;
                            };

                            displayTense();
                            setInterval(displayTense, 10000); // Cambia cada 10 segundos
                        } else {
                            console.error('Error al cargar el archivo JSON del verbo:', xhrVerb.statusText);
                            document.getElementById('infinitive').innerText = 'Error al cargar los datos';
                            document.getElementById('tense-title').innerText = '';
                            document.getElementById('conjugations').innerText = '';
                        }
                    }
                };
                xhrVerb.open('GET', url, true);
                xhrVerb.send();
            } else {
                console.error('Error al cargar el archivo JSON del plan semanal:', xhr.statusText);
                document.getElementById('infinitive').innerText = 'Error al cargar el plan semanal';
                document.getElementById('tense-title').innerText = '';
                document.getElementById('conjugations').innerText = '';
            }
        }
    };
    xhr.open('GET', 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/weekly-plan.json', true);
    xhr.send();
});
