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
            <span class="nome">${item.nome}</span>
          </div>
          
          `;
      card.addEventListener("click", () => {
        window.location.assign(`Pages/${item.caminho}`);
      });
      wrapper.append(card);
    });
  })
  .catch((error) => console.error("Erro ao carregar", error));
