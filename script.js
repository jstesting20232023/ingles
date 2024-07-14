document.addEventListener('DOMContentLoaded', () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Obtener el día de la semana actual
    const today = new Date();
    const dayOfWeek = today.getDay();
    const currentDay = daysOfWeek[dayOfWeek];

    // Mostrar el día de la semana actual en el HTML
    document.getElementById('dayOfWeek').innerText = `Day: ${currentDay}`;

    // URL base para los verbos individuales
    const verbosBaseUrl = 'https://raw.githubusercontent.com/jstesting20232023/ingles/main/verbs/';

    // Fetch del plan semanal
    fetch('https://raw.githubusercontent.com/jstesting20232023/ingles/main/weekly-plan.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON del plan semanal');
            }
            return response.json();
        })
        .then(weeklyPlan => {
            // Obtener el verbo correspondiente al día de la semana actual
            const selectedVerb = weeklyPlan[currentDay];
            
            // Construir la URL del archivo JSON del verbo seleccionado
            const url = `${verbosBaseUrl}${selectedVerb}.json`;
            
            // Fetch del JSON del verbo seleccionado
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cargar el archivo JSON del verbo');
                    }
                    return response.json();
                })
                .then(verbo => {
                    const infinitiveText = `${verbo.infinitive}`;
                    document.getElementById('infinitive').innerText = infinitiveText;

                    const presentConjugations = `
                        I ${verbo.conjugations.present.I}<br>
                        You ${verbo.conjugations.present.You}<br>
                        He/She/It ${verbo.conjugations.present['He/She/It']}<br>
                        We ${verbo.conjugations.present.We}<br>
                        They ${verbo.conjugations.present.They}
                    `;
                    
                    const pastConjugations = `
                        I ${verbo.conjugations.past.I}<br>
                        You ${verbo.conjugations.past.You}<br>
                        He/She/It ${verbo.conjugations.past['He/She/It']}<br>
                        We ${verbo.conjugations.past.We}<br>
                        They ${verbo.conjugations.past.They}
                    `;
                    
                    const presentPerfectConjugations = `
                        I ${verbo.conjugations.presentPerfect.I}<br>
                        You ${verbo.conjugations.presentPerfect.You}<br>
                        He/She/It ${verbo.conjugations.presentPerfect['He/She/It']}<br>
                        We ${verbo.conjugations.presentPerfect.We}<br>
                        They ${verbo.conjugations.presentPerfect.They}
                    `;
                    
                    const tenses = [
                        { title: 'Present Simple', conjugations: presentConjugations },
                        { title: 'Past', conjugations: pastConjugations },
                        { title: 'Present Perfect', conjugations: presentPerfectConjugations }
                    ];
                    
                    let currentIndex = 0;
                    const displayTense = () => {
                        const tense = tenses[currentIndex];
                        document.getElementById('tense-title').innerText = tense.title;
                        document.getElementById('conjugations').innerHTML = tense.conjugations;
                        currentIndex = (currentIndex + 1) % tenses.length;
                    };
        
                    displayTense();
                    setInterval(displayTense, 10000); // Cambia cada 10 segundos
                })
                .catch(error => {
                    console.error('Error al cargar el archivo JSON del verbo:', error);
                    document.getElementById('infinitive').innerText = 'Error al cargar los datos';
                    document.getElementById('tense-title').innerText = '';
                    document.getElementById('conjugations').innerText = '';
                });
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON del plan semanal:', error);
            document.getElementById('infinitive').innerText = 'Error al cargar el plan semanal';
            document.getElementById('tense-title').innerText = '';
            document.getElementById('conjugations').innerText = '';
        });
});
