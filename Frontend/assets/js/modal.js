const galleryPhotoDisplaySection = document.querySelector(".gallery-photo-section");
let projects = [];
const gallery = document.querySelector('.gallery');

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

    // fonction pour afficher le bouton de modification de la modale
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
        openModalBtn.addEventListener("click", (event) => {
            event.preventDefault();
            OpenModal();
        });
        workTitle.appendChild(openModalBtn);

        const blackEditIcon = document.createElement("img");
        openModalBtn.classList.add("black-edit-icon");
        blackEditIcon.src = "./assets/icons/pen-to-square-regular(1).svg";
        openModalBtn.prepend(blackEditIcon);

        const openModalBtnText = document.createElement("p");
        openModalBtnText.innerHTML = "modifier";
        openModalBtn.appendChild(openModalBtnText);

        const filterElement = document.querySelector("#categories-menu");
        filterElement.style.display = "none";
    }
}
EditMode();

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
        addPhotoBtn.addEventListener('click', (event) => {
            event.preventDefault();
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
        // Remplir le menu déroulant avec les catégories de l'API
    async function fetchCategoriesAndPopulateDropdown() {
    try {
        let response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);
        
        let categories = await response.json();

        const categorySelect = document.getElementById('categorie-select');
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '';
        categorySelect.appendChild(defaultOption);

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

// Appel de la fonction pour remplir le menu déroulant lors du chargement de la page ou de l'ouverture de la modale
document.addEventListener('DOMContentLoaded', fetchCategoriesAndPopulateDropdown);
}
OpenModal();

// Fonction pour configurer le bouton d'ajout de photo
function setupFileUploadButton() {
    const addPhotoBtn = document.querySelector('.file-upload-btn');
    const fileInput = document.getElementById('photo_upload');

    if (addPhotoBtn && fileInput) {
        addPhotoBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }
}

// Fonction pour gérer la prévisualisation de l'image
function setupImagePreview() {
    const fileInput = document.getElementById('photo_upload');
    const preview = document.getElementById('preview');
    const uploadIcon = document.getElementById('upload-icon');
    const uploadBtn = document.querySelector('.file-upload-btn');
    const uploadText = document.querySelector('.file-upload-text');

    if (fileInput && preview && uploadIcon && uploadBtn && uploadText) {
        fileInput.addEventListener('change', (event) => {
            event.preventDefault();
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {

                    uploadIcon.style.display = 'none';
                    uploadBtn.style.display = 'none';
                    uploadText.style.display = 'none';

                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                uploadIcon.style.display = 'block';
                uploadBtn.style.display = 'block';
                uploadText.style.display = 'block';
                preview.style.display = 'none';
                preview.src = '';
            }
        });
    }
}

    const postPhotoForm = document.getElementById('submit-project-btn');

    postPhotoForm.addEventListener('click', async function (event) {
        event.preventDefault();
    
        const imageInput = document.getElementById('photo_upload');
        const title = document.getElementById('photoTitle').value.trim();
        const category = document.getElementById('categorie-select').value;
        const token = localStorage.getItem("token");
        const file = imageInput.files[0];
    
        if (!file) {
            alert("Veuillez sélectionner une image.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", category);
    
        try {
            let response = await fetch('http://localhost:5678/api/works', {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
                redirect: 'manual'
            });
    
            if (response.ok) {
                const works = await fetchWorks();  // Récupérer les projets à jour
                galleryPhotoDisplay(works);        // Mettre à jour la galerie modale
                updateMainGallery(works);          // Mettre à jour la galerie principale
                resetModal();                      // Réinitialiser le formulaire après succès
            } else {
                const errorData = await response.json();
                throw new Error(`Erreur: ${errorData.message}`);
            }
        } catch (error) {
            alert("Une erreur est survenue lors de l'envoi de la photo.");
        }
    });

function resetModal() {
    const imageInput = document.getElementById('photo_upload');
    const preview = document.getElementById('preview');
    const titleInput = document.getElementById('photoTitle');
    const categorySelect = document.getElementById('categorie-select');

    imageInput.value = "";
    titleInput.value = "";
    categorySelect.selectedIndex = 0;

    preview.src = "";
    preview.style.display = 'none';

    const uploadIcon = document.getElementById('upload-icon');
    const uploadBtn = document.querySelector('.file-upload-btn');
    const uploadText = document.querySelector('.file-upload-text');

    uploadIcon.style.display = 'block';
    uploadBtn.style.display = 'block';
    uploadText.style.display = 'block';

    const submitBtn = document.querySelector('.submit-gallery-photo-btn');
    submitBtn.style.backgroundColor = "#A7A7A7";
}

// Fonction pour modifier la couleur du bouton valider dépendamment de si les champs sont remplis
function checkFormCompletion() {
    const fileInput = document.getElementById('photo_upload');
    const photoTitle = document.getElementById('photoTitle');
    const categorySelect = document.getElementById('categorie-select');
    const submitBtn = document.getElementById('submit-project-btn');

    // Vérifie si tous les champs requis sont remplis
    if (fileInput.files.length > 0 && photoTitle.value.trim() !== '' && categorySelect.value !== '') {
        // Bouton activé
        submitBtn.style.backgroundColor = "#1d6154";
    } else {
        // Bouton désactivé
        submitBtn.style.backgroundColor = "#A7A7A7";
    }
}

// Fonction d'initialisation pour ajouter les écouteurs d'événements
function initializeFormListeners() {
    const fileInput = document.getElementById('photo_upload');
    const photoTitle = document.getElementById("photoTitle");
    const categorySelect = document.getElementById('categorie-select');

    // écouteurs d'événements sur les champs du formulaire
    fileInput.addEventListener('change', checkFormCompletion);
    photoTitle.addEventListener('input', checkFormCompletion);
    categorySelect.addEventListener('change', checkFormCompletion);
}

document.addEventListener('DOMContentLoaded', () => {
    checkFormCompletion();
    initializeFormListeners();
});

function initialize() {
    toggleModalBanner();
    setupFileUploadButton();
    setupImagePreview();
    checkFormCompletion()
}

document.addEventListener('DOMContentLoaded', initialize);

async function fetchWorks() {
    try {
        let response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);
        let works = await response.json();
        return works;
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}
fetchWorks()

    // Fonction pour afficher les projets dans la modale et de pouvoir les supprimer
    function galleryPhotoDisplay(works) {
        const galleryPhotoDisplaySection = document.querySelector(".gallery-photo-section");

        galleryPhotoDisplaySection.innerHTML = '';

        if (typeof works !== 'undefined') {
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

            deleteImagesBtn.addEventListener("click", (event) => {
                event.preventDefault();
                deleteWorkData(work.id, divImage);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const works = await fetchWorks();
    galleryPhotoDisplay(works);
});

function createPhotoElement(project) {
    const photoContainer = document.createElement('div');
    photoContainer.className = 'photo-container';
    photoContainer.setAttribute('id', `photo-${project.id}`);

    const img = document.createElement('img');
    img.src = project.imageUrl;
    img.alt = project.title;
    img.className = 'photoArchitecture';
    photoContainer.appendChild(img);

    const deleteImagesBtn = document.createElement('button');
    deleteImagesBtn.type = 'button';
    deleteImagesBtn.className = 'btn-delete';
    deleteImagesBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteImagesBtn.addEventListener('click', () => deletePhoto(project.id, photoContainer));
    photoContainer.appendChild(deleteImagesBtn);

    return photoContainer;
}

// Fonction pour supprimer les projets dans l'API
async function deleteWorkData(id, divImage) {
    divImage.remove();
    const token = sessionStorage.getItem("authToken") || localStorage.getItem("token");
    try {
        let response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
                authorization: `Bearer ${token}`,
            }
        });

        if (response.ok) {
            console.log("Fichier supprimé");
            const works = await fetchWorks();
            galleryPhotoDisplay(works);
            updateMainGallery(works);
        } else {
            console.log(response);
            alert(`Erreur ${response.status} lors de la tentative de suppression du travail.`);
        }
        } catch (error) {
            alert("Une erreur s'est produite lors de la tentative de suppression du travail.");
    }
}


    // Fonction pour passer de la modale de suppression à celle d'ajout de projet
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

function updateMainGallery(works) {
    const mainGallery = document.querySelector('.gallery');
    
    // Vider la galerie principale
    mainGallery.innerHTML = '';

    // Ajouter les projets à la galerie principale
    works.forEach(work => {
        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo-container');
        
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        img.classList.add('photo-architecture');

        const title = document.createElement('p');
        title.textContent = work.title;

        photoContainer.appendChild(img);
        photoContainer.appendChild(title);
        mainGallery.appendChild(photoContainer);
    });
}