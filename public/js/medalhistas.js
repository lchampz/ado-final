const BASE_URL = "http://localhost:8080/";


async function getMedalhistas() {
  const response = await fetch(BASE_URL + "medalhistas");

  return response.json();
}

async function createCards(data) {
  const wrapper = document.getElementById("wrapper-cards");

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card-atleta");
    const img = document.createElement("div");
    img.classList.add("icon");

    img.style.backgroundImage = `url(${item.imagem})`;
    card.append(img);
    card.innerHTML += `
    <div class="info">
      <span class="atleta-nome">${item.nome}</span>
      <span class="sport">${item.esporte}</span>
      <span class="medalhas"> 
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179249.png" />${item.quantidadeDeMedalhas.ouro}</span>
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179251.png" />${item.quantidadeDeMedalhas.prata}</span>
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179250.png" />${item.quantidadeDeMedalhas.bronze}</span>
      </span>
    </div>
    `

    wrapper.append(card);
  })
}


addEventListener("load", async () => {
  const response = await getMedalhistas();

  createCards(response);
})