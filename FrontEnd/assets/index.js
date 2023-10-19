//----Récupérer la gallerie et les catégories depuis l'api

let ListGallery = [];
let ListCategories = [];

//Fonction getWorks pour récuperer des travaux
const getWorks = async () => {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works");
        const responseCategories = await fetch("http://localhost:5678/api/categories");

        // Remplissage des tableau crée en ligne 3 et 4


        ListGallery = await responseWorks.json();
        ListCategories = await responseCategories.json();

        createCategory();
        createGallery(ListGallery);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des travaux et des catégories :", error);
    }
} //Ajout "try-catch"regroupe des instructions à exécuter et définit une réponse si une erreure lors de la récupération des travaux depuis l'API


// Fonction pour créer les catégories et rendre fonctionnels les filtres
const createCategory = () => {
    const portfolio = document.getElementById("portfolio");
    if (portfolio === null) {
        console.error("L'élément avec l'ID 'portfolio' n'a pas été trouvé.");
        return;
    }

    const filter = document.createElement("div");
    filter.classList.add("filter");
    portfolio.appendChild(filter);

    filter.innerHTML = '<div class="button selected" id="0">Tous</div>' +
        ListCategories
            .map(category => `<div class="button" id="${category.name}">${category.name}</div>`)
            .join("");

    let btnFilter = document.querySelectorAll(".button");
    for (let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].addEventListener("click", () => {
            if (i !== 0) {
                const ListGalleryFilter = ListGallery.filter(el => el.categoryId == i);
                createGallery(ListGalleryFilter);
            } else {
                createGallery(ListGallery);
            }
            btnFilter.forEach(btn => btn.classList.remove("selected"));
            btnFilter[i].classList.add("selected");
        });
    }
};

const createGallery = gallery => {
    // Code pour créer la galerie
};

getWorks();












/*//--------------------Catégorie------------------------


const btnFilter = document.querySelector('.btnFilter');

//Utilise map pour générer la structure html pour chaque catégorie
const buttonsHtml = ListCategories.map(category => {
    return /*html*/
/*'<button class="filter">${category.name} </button>'
}).join("");


//Ajoute le bouton "Tous" en tant que premier bouton
const buttonAll = /*html*/
/* <button class="filter filter-selected">Tous</button>;

//Creer la structure complète en combinant le bouton "Tous" avec les boutons de catégorie
const btnFilterhtml = buttonAll + buttonsHtml;

//Utilise innerHtml pour mettre à jour le contenu de la div filter-button
filterButtons.innerHtml = filterButtonsHtml;

//Récupère tous les boutons de filtre
const button = document.querySelectorAll('.filter-buttons button');

//Ajoute un event listener a chaque bouton de filtre
button.forEach(button => {
 button.addEventListener('click', () => {
     //Si le bouton "Tous" est cliqué (avec la classe "filter-selected"), on appelle "filterProjects"avec catégorie a null.
     //Sinon, on recherche l'Id de la catégorie associée et on appelle "filterProjects" avec cet Id pour filtrer les projets par catégories.
     const categoryId = button.classList.contains('filter-selected') ? null : ListCategories.find(category =>
         category.name === button.textContent)?.id;
 });
});
;

function filterProjects(categoryId, selectedbutton) {
 const filteredProjects = !categoryId ? allProjects : allProjects.filter(projects => projects.categoryId === categoryId);
 displayProjects(filteredProjects);
 setSelectedFilter(selectedbutton);
}

function setSelectedFilter(selectedbutton) {
 const buttons = document.querySelectorAll('.filter-buttons button');
 buttons.forEach(button => {
     button.classList.remove('filter-selected');
 });
 selectedbutton.classList.add('filter-selected');
}


//---------------------Galerie--------------------------
function displayProjects(projects) {
 const createGallery = () => {
     const ListGallery = document.getElementById('gallery');
     ListGallery.map((project) => /*html*/
/*   `<figure>
<img src=${project.imageUrl} alt=${project.title}>
<figcaption>${project.title}</figcaption>
</figure>
`)
   .join('')
}
;



//Cherche la section avec l'id "portfolio"
const portfolioSection = document.getElementById('portfolio');

//Verifie s'il y a deja une galerie, si oui, la remplace
const existingGallery = document.querySelector(".gallery");
if (existingGallery) {
existingGallery.outerHTML = gallery;
} else {
//Sinon, ajoute la nouvelle galerie à l'interieur de la section "portfolio"
portfolioSection.insertAdjacentHTML('beforeend', gallery);
}
};

createGallery(); // Appel de la fonction createGallery pour creer la gallerie d'images
*/

