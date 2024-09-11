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

        if (category === "Tous") {
            button.classList.add("active");
            filterProjects(category, projects);
        }

        button.addEventListener("click", () => {
            filterProjects(category, projects);
            setActiveCategory(button);
        });
        categoriesMenu.appendChild(button);
    });
}

function setActiveCategory(activeButton) {
	const buttons = document.querySelectorAll("#categories-menu button");
	buttons.forEach((button) => {
		button.classList.remove("active");
	});
	activeButton.classList.add("active");
}
