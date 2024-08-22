const galleryPhotoDisplaySection = document.querySelector(".gallery-photo-section");
let token = sessionStorage.getItem("authToken")

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
        openModalBtn.setAttribute("type", "button");
        openModalBtn.setAttribute("aria-haspopup", "dialog");
        openModalBtn.setAttribute("aria-controls", "dialog");
        openModalBtn.addEventListener("click", OpenModal);
        workTitle.appendChild(openModalBtn);

        const blackEditIcon = document.createElement("i");
        blackEditIcon.className = "fas fa-pen-to-square";
        openModalBtn.prepend(blackEditIcon);

        const openModalBtnText = document.createElement("p");
        openModalBtnText.innerHTML = "modifier";
        openModalBtn.appendChild(openModalBtnText);

        const filterElement = document.querySelector("#categories-menu");
        filterElement.style.display = "none";
    }
}
EditMode()

function OpenModal() {
    document.addEventListener('DOMContentLoaded', () => {
        const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
        const doc = document.querySelector('.js-document');
        
        const open = function (dialog) {
            dialog.setAttribute('aria-hidden', false);
            doc.setAttribute('aria-hidden', true);
        };
        
        const close = function (dialog) {
            dialog.setAttribute('aria-hidden', true);
            doc.setAttribute('aria-hidden', false);
        };
        
        triggers.forEach((trigger) => {
            const dialog = document.getElementById(trigger.getAttribute('aria-controls'));
            const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');
        
            // open dialog
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
            
                open(dialog);
            });
        
            // close dialog
            dismissTriggers.forEach((dismissTrigger) => {
                const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);
        
                dismissTrigger.addEventListener('click', (event) => {
                    event.preventDefault();
            
                    close(dismissDialog);
                });
            });
        
            window.addEventListener('click', (event) => {
                if (event.target === dialog) {
                    close(dialog);
                }
            });
        });
    });
}
OpenModal()

async function fetchWorks() {
    try {
        let response = await fetch(`http://localhost:5678/api/works`);
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);
        let works = await response.json();
        galleryPhotoDisplay(works);
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}
//fetchWorks()

function galleryPhotoDisplay(works) {
    const galleryPhotoDisplaySection = document.querySelector(".gallery-photo-section");
    try {
        let response = fetch(`http://localhost:5678/api/works`);
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);
        let works = response.json();
        galleryPhotoDisplay(works);
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
    works.forEach(work => {
        let divImage = document.createElement("div");
        divImage.classList.add("modal-gallery-div");
        divImage.id = work.id;

        const imagesToDelete = document.createElement("img");
        imagesToDelete.src = work.imageUrl;
        imagesToDelete.alt = work.title;
        imagesToDelete.classList.add("image-to-delete");

        const deleteImagesBtn = document.createElement("button");
        deleteImagesBtn.classList.add("delete-image-btn");
        deleteImagesBtn.setAttribute("data-id", work.id)

        const deleteImagesIcon = document.createElement("img");
        deleteImagesIcon.src = "assets/icons/trash-can-solid.svg";
        deleteImagesIcon.alt = `delete id="${work.id}" photo`;
        deleteImagesIcon.classList.add("btn-delete");

        deleteImagesBtn.appendChild(deleteImagesIcon);
        divImage.appendChild(imagesToDelete);
        divImage.appendChild(deleteImagesBtn);
        galleryPhotoDisplaySection.appendChild(divImage);

        /*deleteImagesBtn.addEventListener("click", async () => {
            try {
                await deleteWorkData(work.id);
                divImage.remove();
            } catch (error) {
                console.log("Erreur lors de la suppression de l'image :", error);
            }
        });*/
    });
}
    galleryPhotoDisplay()

function deleteWorkData(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
        accept: "*/*",
        authorization: `Bearer ${token}`,
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("fichier supprimé")
        } else {
            console.log(response)
            alert(`Erreur ${response.status} lors de la tentative de suppression du travail.<br />`)
        }
    })
        .catch(error => {
        alert("Une erreur s'est produite lors de la tentative de suppression du travail.")
        })
}

let btnsDelete = document.getElementsByClassName("btn-delete")
for(let btn of btnsDelete) {
    btn.addEventListener("click", () => {
        let workId = btn.dataset.id;
        deleteWorkData(work.id)
    })
}