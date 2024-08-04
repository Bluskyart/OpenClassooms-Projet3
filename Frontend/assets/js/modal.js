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