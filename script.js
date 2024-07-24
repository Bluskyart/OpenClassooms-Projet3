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

    function displayProjects(projects) {
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

    function generateCategoriesMenu(projects) {
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

    function filterProjects(category, projects) {
        if (category === "Tous") {
            displayProjects(projects);
        } else {
            const filteredProjects = projects.filter(
            (project) => project.category.name === category
            );
            displayProjects(filteredProjects);
        }
    }

        fetchProjects();
})