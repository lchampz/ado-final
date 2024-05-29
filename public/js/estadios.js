document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/estadios')
      .then(response => response.json())
      .then(data => {
        const estadiosList = document.getElementById('estadio-list');
        const estadioNomes = [];
        const estadioCapacidades = [];
  
        data.forEach((estadio, index) => {
          estadioNomes.push(estadio.nome);
          estadioCapacidades.push(estadio.capacidade);
  
          const estadioDiv = document.createElement('div');
          const directionClass = index % 2 === 0 ? 'flex-row' : 'flex-row-reverse';
          estadioDiv.innerHTML = `
          <div class="card">
              <h2>${estadio.nome}</h2>
              <div class="orientacao ${directionClass}">
                  <div class="imagem">
                      <img src="${estadio.urlImagem}" alt="${estadio.nome}">
                  </div>
                  <div class="texto">
                      <p><strong>Capacidade:</strong> ${estadio.capacidade}</p>
                      <p><strong>Modalidades Praticadas:</strong> ${estadio.modalidadesPraticadas}</p>
                      <p><strong>Pais:</strong> ${estadio.pais}</p>
                      <p><strong>Descrição:</strong> ${estadio.descricao}</p>
                      <p><strong>Calendário das olimpíadas:</strong></p>
                      <ul>
                          ${estadio.calendario.map(evento => `
                              <li>
                                  <strong>Modalidade:</strong> ${evento.modalidade}<br>
                                  <strong>Data e Hora:</strong> ${formatarData(evento.dataEhora)}
                              </li>
                              <p></p>
                          `).join('')}
                      </ul>
                  </div>
              </div>
          </div>
          `;
          estadiosList.appendChild(estadioDiv);
        });
  
        createCapacityChart(estadioNomes, estadioCapacidades);
      })
      .catch(error => console.error('Erro ao carregar os estádios:', error));
  
    function formatarData(dataEhora) {
      const data = new Date(dataEhora);
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const ano = data.getFullYear();
      const hora = data.getHours().toString().padStart(2, '0');
      const minuto = data.getMinutes().toString().padStart(2, '0');
      return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    }
  
    function createCapacityChart(labels, data) {
        const ctx = document.getElementById('capacityChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Capacidade dos Estádios',
                    data: data,
                    backgroundColor: [
                        'rgba(165, 42, 42, 0.2)',   // Marrom
                        'rgba(0, 0, 255, 0.2)',     // Azul
                        'rgba(255, 165, 0, 0.2)',   // Laranja
                        'rgba(255, 0, 0, 0.2)',     // Vermelho
                        'rgba(0, 100, 0, 0.2)',     // Verde escuro
                        'rgba(128, 0, 128, 0.2)',   // Roxo
                        'rgba(128, 128, 128, 0.2)'  // Cinza
                    ],
                    borderColor: [
                        'rgba(165, 42, 42, 1)',   // Marrom
                        'rgba(0, 0, 255, 1)',     // Azul
                        'rgba(255, 165, 0, 1)',   // Laranja
                        'rgba(255, 0, 0, 1)',     // Vermelho
                        'rgba(0, 100, 0, 1)',     // Verde escuro
                        'rgba(128, 0, 128, 1)',   // Roxo
                        'rgba(128, 128, 128, 1)'  // Cinza
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    
  });
  document.addEventListener("DOMContentLoaded", function() {
    const backButton = document.getElementById("backButton");
  
    backButton.addEventListener("click", function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link (neste caso, seguir o href)
        window.history.back(); // Volta para a página anterior
    });
  });
  