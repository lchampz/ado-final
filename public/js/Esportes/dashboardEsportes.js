// Prompt para identificar o usuário
let userName = window.prompt('Qual é seu nome?');
if (userName) {
    window.alert(`Bem-vindo, ${userName}!`);
    // Inicia os confetes ao dar as boas-vindas
    confetti.start(1000);  // 1000 ms para começar
    setTimeout(() => {
        confetti.stop();
    }, 5000);  // 5000 ms para parar
}

// Função para redirecionar com atraso
function redirectWithDelay(url, delay) {
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

// Adicionando eventos de clique aos cards
document.getElementById('card-esportes').addEventListener('click', function() {
    confetti.start();
    setTimeout(() => {
        redirectWithDelay('Pages/Esportes/esportes.html', 1000); // Redireciona após 1 segundo
        setTimeout(() => {
            confetti.stop();
        }, 2000); // Para os confetes após 2 segundos (1 segundo de exibição mais 1 segundo de atraso)
    }, 0);
});

document.getElementById('card-estatisticas').addEventListener('click', function() {
    confetti.start();
    setTimeout(() => {
        window.location.href = 'Pages/Esportes/estatisticas.html'; // Redireciona imediatamente
        setTimeout(() => {
            confetti.stop();
        }, 1000); // Para os confetes após 1 segundo
    }, 0);
});
