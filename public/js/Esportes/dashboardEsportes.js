const BASE_URL = "http://localhost:8080/";

let esportes = [];

// Prompt para identificar o usuário
// let userName = window.prompt('Qual é seu nome?');
// if (userName) {
//     window.alert(`Bem-vindo, ${userName}!`);
//     // Inicia os confetes ao dar as boas-vindas
//     confetti.start(1000);  // 1000 ms para começar
//     setTimeout(() => {
//         confetti.stop();
//     }, 5000);  // 5000 ms para parar
// }

// Função para redirecionar com atraso
function redirectWithDelay(url, delay) {
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

async function getEsportes() {
    const response = await fetch(BASE_URL + "esportes");

    return response.json();
}

async function createCards() {
    const wrapper = document.getElementById("wrapper-esports");
    function clearAll() {
        esportes.forEach((item) => {
            const defaultTab = document.getElementById("default-" + item.id);
            defaultTab.role = "active";
            item?.subcategories?.forEach((subcat, i) => {
                const sub = document.getElementById(`${item.id + "-" + i}`);
                sub.role = "inactive";
            })
        })
    }

    wrapper.innerHTML = "";

    esportes.forEach((item) => {
        const card = document.createElement("div");

        card.innerHTML += `
      <div class="card-esports" id="card-esport-${item.id}">
      <div class="tabs">
      <span id="default-${item.id}" class="tab" role="active">${item.name
            }</span>
          ${item.subcategories && item.subcategories.length > 0
                ? item.subcategories?.map(
                    (sub, i) =>
                        `<span id="${item.id + "-" + i
                        }" class="tab" role="inactive">${sub.name}</span>`
                )
                : "<p></p>"
            }
      </div>
      <img src="${item.image}" id="img-esport-${item.id}"/>
      <div class="card-desc-esport">
          <p>Descrição</p>
          <span id="desc-esport-${item.id}">${item?.description}</span>
      </div>
  </div>
      `;
        wrapper.append(card);

        const defaultTab = document.getElementById("default-" + item.id);
        defaultTab.addEventListener("click", () => {
            const img = document.getElementById("img-esport-" + item.id);
            const desc = document.getElementById("desc-esport-" + item.id);
            desc.innerText = item.description;
            img.src = item.image;
            clearAll();
            defaultTab.role = "active";
        })
        item?.subcategories?.forEach((subcat, i) => {
            const defaultTab = document.getElementById("default-" + item.id);
            const sub = document.getElementById(`${item.id + "-" + i}`);

            sub.addEventListener("click", () => {
                const img = document.getElementById("img-esport-" + item.id);
                const desc = document.getElementById("desc-esport-" + item.id);
                desc.innerText = subcat.description;
                img.src = subcat.image;
                clearAll();
                sub.role = "active";
                defaultTab.role = "inactive";
            })
        })
    });


}

addEventListener("load", async () => {
    const response = await getEsportes();
    esportes = response;

    createCards();
});
