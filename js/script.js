document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os elementos necessários do DOM
    const projectCards = document.querySelectorAll(".project-card");
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.querySelector(".close-btn");

    // Se o modal não existir na página, interrompe o script para evitar erros.
    if (!modal) {
        return;
    }

    // Elementos do Modal que serão preenchidos
    const modalLogoContainer = document.getElementById("modal-logo-container");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalLink = document.getElementById("modal-link");

    // Detalhes da tabela do modal
    const modalProjectName = document.getElementById("modal-project-name");
    const modalCompany = document.getElementById("modal-company");
    const modalYear = document.getElementById("modal-year");
    const modalTools = document.getElementById("modal-tools");

    // Conteúdo da descrição do modal
    const modalDescription = document.getElementById("modal-description");
    const modalShowcaseImages = document.getElementById(
        "modal-showcase-images"
    );

    // Adiciona um evento de clique para cada card de projeto
    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            // Pega os dados do projeto a partir dos data-attributes do card clicado
            const data = card.dataset;

            // Preenche as informações na tabela do modal
            modalProjectName.textContent = data.title;
            modalCompany.textContent = data.company;
            modalYear.textContent = data.year;
            modalTools.textContent = data.tools;

            // Preenche a imagem e o título principal do modal
            modalImage.src = data.imgSrc;
            modalImage.alt = data.title;
            modalTitle.textContent = data.title;

            // Define o fundo do logo do modal dinamicamente
            modalLogoContainer.className = "modal-logo"; // Reseta as classes
            if (data.modalBgId) {
                // Reutiliza os IDs de background definidos no CSS (#linktree, #youtube, #api)
                modalLogoContainer.classList.add(data.modalBgId);
            }

            // Preenche a descrição e o link do GitHub
            modalDescription.textContent = data.description;
            modalLink.href = data.githubLink;

            // Limpa e adiciona as imagens de vitrine
            modalShowcaseImages.innerHTML = "";
            if (data.showcaseImg1) {
                const img1 = document.createElement("img");
                img1.src = data.showcaseImg1;
                img1.alt = `${data.title} showcase 1`;
                modalShowcaseImages.appendChild(img1);
            }
            if (data.showcaseImg2) {
                const img2 = document.createElement("img");
                img2.src = data.showcaseImg2;
                img2.alt = `${data.title} showcase 2`;
                modalShowcaseImages.appendChild(img2);
            }

            // Exibe o modal
            modal.style.display = "flex";
        });
    });

    // Função para fechar o modal com animação
    const closeModal = () => {
        const modalContent = modal.querySelector(".modal-content");
        modal.classList.add("fade-out");
        modalContent.classList.add("zoomOut");

        // Remove o modal do display após a animação terminar
        setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove("fade-out");
            modalContent.classList.remove("zoomOut");
        }, 300); // Duração da animação é 0.3s
    };

    // Adiciona evento para o botão de fechar
    closeModalBtn.addEventListener("click", closeModal);

    // Adiciona evento para fechar o modal ao clicar fora dele
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

function copyEmail() {
    // O email que será copiado
    const email = "guilhermeaborges967@gmail.com";

    // Acessa a API de área de transferência do navegador
    navigator.clipboard
        .writeText(email)
        .then(() => {
            // Seleciona o botão e o parágrafo dentro dele
            const emailButton = document.getElementById("email");
            const buttonText = emailButton.querySelector("p");

            // Altera o texto para "Copied!"
            buttonText.textContent = "Copied!";

            // Opcional: Volta ao texto original após 2 segundos
            setTimeout(() => {
                buttonText.textContent = "Copy Email";
            }, 2000); // 2000 milissegundos = 2 segundos
        })
        .catch((err) => {
            // Log de erro caso a cópia falhe
            console.error("Failed to copy email: ", err);
        });
}
