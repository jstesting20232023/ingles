
document.addEventListener('DOMContentLoaded', () => {
   const url ='https://raw.githubusercontent.com/jstesting20232023/ingles/main/verbos2.json'; // Reemplaza con tu URL


    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(verbos => {
            const today = new Date();
            const index = today.getDate() % verbos.length;
            const verbo = verbos[index];
            
            const texto = `${verbo.infinitive}: present simple - ${verbo.present}, past - ${verbo.past}, present perfect - ${verbo.presentPerfect}`;
            document.getElementById('verbo').innerText = texto;
        })
        .catch(error => {
            console.error(error);
            document.getElementById('verbo').innerText = 'Error al cargar los datos';
        });
});
