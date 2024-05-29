const BASE_URL = "http://localhost:3080/";

let players = [];
let podium = [];
let isChartVisible = false;
let chart = null;

async function getMedalhistas() {
  const response = await fetch(BASE_URL + "medalhistas");

  return response.json();
}

async function createCards() {
  const wrapper = document.getElementById("wrapper-cards");

  podium.forEach((item) => {
    const card = document.getElementById("podium-card-" + item.podium);
    card.classList.add("card-atleta");

    card.innerHTML += `
    <div class="icon">
      <img class="podium-img" style="width: 100%; height: 200px" src="${item.imagem}" />
    </div>
    <div class="info">
      <span class="atleta-nome">${item.nome}</span>
      <span class="sport">${item.esporte}</span>
      <span class="medalhas"> 
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179249.png" />${item.quantidadeDeMedalhas.ouro}</span>
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179251.png" />${item.quantidadeDeMedalhas.prata}</span>
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179250.png" />${item.quantidadeDeMedalhas.bronze}</span>
      </span>
    </div>
    `;
    card.addEventListener("click", () => {
      createChart(item);
    });
  });

  players.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card-atleta");

    card.innerHTML += `
    <div class="icon" style="padding-bottom: 20px">
      <img class="podium-img" style="width: 100%; height: 200px" src="${item.imagem}" />
    </div>
    <div class="info">
      <span class="atleta-nome">${item.nome}</span>
      <span class="sport">${item.esporte}</span>
      <span class="medalhas">
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179249.png" />${item.quantidadeDeMedalhas.ouro}</span>
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179251.png" />${item.quantidadeDeMedalhas.prata}</span>
        <span><img class="medalha" src="https://cdn-icons-png.flaticon.com/512/179/179250.png" />${item.quantidadeDeMedalhas.bronze}</span>
      </span>
    </div>
    `;
    card.addEventListener("click", () => {
      createChart(item);
    });
    wrapper.append(card);
  });
}

function createChart(arrPlayer) {
  const name = document.getElementById("player-chart-name");
  const wrapper = document.getElementById("wrapper-chart");
  const ctx = document.getElementById("chart");
  const totalMedalhas = arrPlayer.quantidadeDeMedalhas.ouro +
    arrPlayer.quantidadeDeMedalhas.prata +
    arrPlayer.quantidadeDeMedalhas.bronze;

  wrapper.style.display = "flex";


  ctx.innerHTML = "";
  name.innerHTML = `${arrPlayer.nome} - ${totalMedalhas} medalhas`;
  name.style.color = "black";

  function build() {
    const data = {
      labels: ["Ouro", "Prata", "Bronze"],
      datasets: [
        {
          label: "% de Medalhas",
          data: [
            (arrPlayer.quantidadeDeMedalhas.ouro / totalMedalhas * 100).toFixed(1),
            (arrPlayer.quantidadeDeMedalhas.prata / totalMedalhas * 100).toFixed(1),
            (arrPlayer.quantidadeDeMedalhas.bronze / totalMedalhas * 100).toFixed(1),
          ],
          hoverOffset: 4,
          borderWidth: 1,
          backgroundColor: ["gold", "rgb(119, 119, 119)", "rgb(253, 177, 78)"],
        },
      ],
    };
    if (!chart) {
      chart = new Chart(ctx, {
        type: "doughnut",
        data: data,
      });
    } else {
      chart.data = data;
      chart.update();
    }
  }

  build();
}

addEventListener("load", async () => {
  const response = await getMedalhistas();
  response.forEach((item) => {
    if (item.podium) podium.push(item);
    else players.push(item);
  });
  createCards();
});
