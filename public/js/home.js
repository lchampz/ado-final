let userName = window.prompt('Qual é seu nome?');

if (userName) {
    window.alert(`Bem-vindo, ${userName}!`);
    // Inicia os confetes ao dar as boas-vindas
    confetti.start(1000);  // 1000 ms para começar
    setTimeout(() => {
        confetti.stop();
    }, 5000);  // 5000 ms para parar
}

fetch("http://localhost:8080/home")
  .then((response) => response.json())
  .then((data) => {
    const wrapper = document.getElementById("wrapper-cards");
    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card-home");

      const img = document.createElement("div");
      img.classList.add("icon");

      img.style.backgroundImage = `url(${item.imagem})`;
      card.append(img);
      card.innerHTML += `
         
          <div class="info">
            <span style="color: black" class="nome">${item.nome}</span>
          </div>
          
          `;
      card.addEventListener("click", () => {
        window.location.assign(`Pages/${item.caminho}`);
      });
      wrapper.append(card);
    });
  })
  .catch((error) => console.error("Erro ao carregar", error));

