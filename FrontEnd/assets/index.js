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

    const buttonSelected = document.createElement("button"); // Pour chaque catégorie on crée un bouton //
    buttonSelected.classList.add("buttonselected"); // on attribue un style à chaque bouton //

    // Création du bouton Tous
    const buttonAll = document.createElement("button");
    buttonAll.textContent = "Tous";
    buttonAll.classList.add("btnFilter");
    filter.appendChild(buttonAll);


    ListCategories
        .map(category => `<div class="button" id="${category.name}">${category.name}</div>`)

    /*filter.innerHTML = '<div class="button selected" id="0">Tous</div>' +
        ListCategories
            .map(category => `<div class="button" id="${category.name}">${category.name}</div>`)
            .join("");*/

    /*let btnFilter = document.querySelectorAll(".button");
    for (let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].addEventListener("click", () => {
            if (i !== 0) {
                const ListGalleryFilter = ListGallery.filter(el => el.categoryId == i);
                createGallery(ListGalleryFilter);
            } else {
                createGallery(ListGallery);
            }
            btnFilter.forEach(btn => btn.classList.remove("selected"));
            btnFilter[i].classList.add("selected");*/
};

/*const createGallery = gallery => {
    // Code pour créer la galerie
}*/
getWorks();

// Fonction pour creer la galerie
/*let gallery = document.createElement("div");
gallery.classList.add("gallery");

const createGallery = (lstGallery) => {
    gallery.innerHTML = lstGallery
        .map(
            (img) =>
                `<figure>
    <img src=${img.imageUrl} alt=${img.title}>
    <figcaption>${img.title}</figcaption>
  </figure>
  `)
        .join("");
    portfolio.appendChild(gallery);
};*/

/*getWorks();*/