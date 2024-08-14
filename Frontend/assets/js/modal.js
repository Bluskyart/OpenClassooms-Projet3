// fonction pour afficher la bannière de modification
function toggleModalBanner() {
    const modalBanner = document.getElementById('modal-banner');
    const token = window.localStorage.getItem("token");
    if (token != null) {
        modalBanner.style.display = 'flex';
    } else {
        modalBanner.style.display = 'none';
    }
}
toggleModalBanner();

function EditMode() {
    const token = window.localStorage.getItem("token");
    const body = document.querySelector("body");
    if (token != null) {
        const portfolioSection = document.getElementById("portfolio");

        const workTitle = document.createElement("div");
        workTitle.classList.add("mes-projets-title");
        portfolioSection.prepend(workTitle);

        const mesProjetsh2 = document.querySelector("#portfolio h2");
        workTitle.appendChild(mesProjetsh2);

        const openModalBtn = document.createElement("a");
        openModalBtn.href = "#modal";
        openModalBtn.classList.add("js-modal");
        openModalBtn.addEventListener("click", openModalBtn);
        workTitle.appendChild(openModalBtn);

        const blackEditIcon = document.createElement("img");
        blackEditIcon.className = "fa-pen-to-square";
        blackEditIcon.alt = "icone du bouton d'édition";
        openModalBtn.prepend(blackEditIcon);

        const openModalBtnText = document.createElement("p");
        openModalBtnText.innerHTML = "modifier";
        openModalBtn.appendChild(openModalBtnText);

        const filterElement = document.querySelector(".filter");
        filterElement.style.display = "none";
    }
}
EditMode()