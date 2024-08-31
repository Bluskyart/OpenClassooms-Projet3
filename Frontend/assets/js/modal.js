const galleryPhotoDisplaySection = document.querySelector(".gallery-photo-section");
let token = sessionStorage.getItem("authToken")

// fonction pour afficher la bannière de modification
function toggleModalBanner() {
    const modalBanner = document.getElementById('modal-banner');
    const token = window.localStorage.getItem("token");
    if (token) {
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

        const blackEditIcon = document.createElement("img");
        openModalBtn.classList.add("black-edit-icon");
        blackEditIcon.src = "./assets/icons/pen-to-square-regular (1).svg";
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

//Début modale gallerie photo
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
        
            // Ouvrir la fenêtre modale
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                open(dialog);
            });
        
            // Fermer la modal en cliquant sur la croix
            dismissTriggers.forEach((dismissTrigger) => {
                dismissTrigger.addEventListener('click', (event) => {
                    event.preventDefault();
                    const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);
                    close(dismissDialog);
                });
            });
            // Fermer la modal en cliquant en dehors
            window.addEventListener('click', (event) => {
                if (event.target === dialog) {
                    close(dialog);
                }
            });
        });
//Fin modale gallerie photo
//Début modale ajout photo
        const addPhotoBtn = document.getElementById('open-add-photo-modal');
        addPhotoBtn.addEventListener('click', () => {
            const galleryPhotoModal = document.getElementById('dialog');
            const addPhotoModal = document.getElementById('dialog-add-photo');
            close(galleryPhotoModal);
            open(addPhotoModal);
        });

        const addPhotoModal = document.getElementById('dialog-add-photo');
        const closeBtn = addPhotoModal.querySelector('[data-dismiss="dialog-add-photo"]');

        // Fermer la modal en cliquant sur la croix
        closeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            close(addPhotoModal);
        });

        // Fermer la modal en cliquant en dehors
        window.addEventListener('click', (event) => {
            if (event.target === addPhotoModal) {
                close(addPhotoModal);
            }
        });
        // Revenir sur la modale galerie photo
        const backToGalleryBtn = document.querySelector('[data-dismiss="dialog-return"]');
        backToGalleryBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const galleryPhotoModal = document.getElementById('dialog');
            close(addPhotoModal);
            open(galleryPhotoModal);
        });
    });
    async function fetchCategoriesAndPopulateDropdown() {
    try {
        // Faites une requête pour obtenir les catégories depuis l'API
        let response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);
        
        // Convertissez la réponse en JSON
        let categories = await response.json();

        // Sélectionnez le menu déroulant où les catégories doivent être insérées
        const categorySelect = document.getElementById('categorie-select');
        
        // Créez et insérez un choix vide par défaut
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Sélectionner une catégorie';
        categorySelect.appendChild(defaultOption);

        // Insérez chaque catégorie dans le menu déroulant
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
    }
}

// Appelez la fonction pour remplir le menu déroulant lors du chargement de la page ou de l'ouverture de la modale
document.addEventListener('DOMContentLoaded', fetchCategoriesAndPopulateDropdown);
}
OpenModal()

// Fonction pour configurer le bouton d'ajout de photo
function setupFileUploadButton() {
    const addPhotoBtn = document.querySelector('.file-upload-btn'); // Le bouton "+ Ajouter photo"
    const fileInput = document.getElementById('avatar'); // Le champ de fichier

    if (addPhotoBtn && fileInput) {
        addPhotoBtn.addEventListener('click', () => {
            fileInput.click(); // Simuler un clic sur le champ de fichier
        });
    }
}

// Fonction pour gérer la prévisualisation de l'image
function setupImagePreview() {
    const fileInput = document.getElementById('avatar');
    const preview = document.getElementById('preview');
    const uploadIcon = document.getElementById('upload-icon');
    const uploadBtn = document.querySelector('.file-upload-btn');
    const uploadText = document.querySelector('.file-upload-text');

    if (fileInput && preview && uploadIcon && uploadBtn && uploadText) {
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Masquer les éléments de téléchargement
                    uploadIcon.style.display = 'none';
                    uploadBtn.style.display = 'none';
                    uploadText.style.display = 'none';

                    // Afficher l'aperçu de l'image
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                // Réafficher les éléments de téléchargement si aucun fichier n'est sélectionné
                uploadIcon.style.display = 'block';
                uploadBtn.style.display = 'block';
                uploadText.style.display = 'block';
                preview.style.display = 'none';
                preview.src = '';
            }
        });
    }
}

function initialize() {
    toggleModalBanner();
    OpenModal();
    setupFileUploadButton();
    setupImagePreview();
}

document.addEventListener('DOMContentLoaded', initialize);

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
fetchWorks()

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

        deleteImagesBtn.addEventListener("click", async () => {
            try {
                await deleteWorkData(work.id);
                divImage.remove();
            } catch (error) {
                console.log("Erreur lors de la suppression de l'image :", error);
            }
        });
    });
}
    galleryPhotoDisplay()

function deleteWorkData(id) {
    const token = sessionStorage.getItem("authToken") || localStorage.getItem("token");
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

deleteImagesBtn.addEventListener("click", async () => {
    try {
        await deleteWorkData(work.id);
        divImage.remove();
    } catch (error) {
        console.log("Erreur lors de la suppression de l'image :", error);
    }
});

function switchToAddPhotoModal() {
    const addPhotoBtn = document.getElementById('open-add-photo-modal');
    if (addPhotoBtn) {
        addPhotoBtn.addEventListener('click', () => {
            const galleryPhotoModal = document.getElementById('dialog');
            const addPhotoModal = document.getElementById('dialog-add-photo');
            close(galleryPhotoModal);
            open(addPhotoModal);
        });
    }
}