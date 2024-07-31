import { filterProjects, generateCategoriesMenu } from './filters.js';

export function displayProjects(projects) {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;
    gallery.innerHTML = "";

    projects.forEach((project) => {
        const figure = document.createElement("figure");
        figure.setAttribute("id", project.id);
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = project.imageUrl;
        img.alt = project.title;
        figcaption.textContent = project.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    function fetchProjects() {
        fetch("http://localhost:5678/api/works")

            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })

            .then((data) => {
                displayProjects(data);
                generateCategoriesMenu(data);
            })

            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
        });
    }

        fetchProjects();
})