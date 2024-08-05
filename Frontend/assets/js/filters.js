import { displayProjects } from './script.js';

export function filterProjects(category, projects) {
    if (category === "Tous") {
        displayProjects(projects);
    } else {
        const filteredProjects = projects.filter(
        (project) => project.category.name === category
        );
        displayProjects(filteredProjects);
    }
}

export function generateCategoriesMenu(projects) {
    const categoriesMenu = document.getElementById("categories-menu");
    if (!categoriesMenu) return;
    categoriesMenu.innerHTML = "";

    const categories = ["Tous","Objets","Appartements","Hotels & restaurants"];

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", () => {
        filterProjects(category, projects);
        });
        categoriesMenu.appendChild(button);
    });
}

export function setActiveCategory(activeButton) {
	const buttons = document.querySelectorAll("#categories-menu button");
	buttons.forEach((button) => {
		button.classList.remove("active");
	});
	activeButton.classList.add("active");
}
