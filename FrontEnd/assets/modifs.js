//----Récupérer la gallerie et les catégories depuis l'api

let listGallery = [];
let listCategories = [];

//Fonction getWorks pour récuperer les travaux
const getWorks = async () => {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works");
        const responseCategories = await fetch("http://localhost:5678/api/categories");

        // Remplissage des tableau crée en ligne 3 et 4


        listGallery = await responseWorks.json();
        listCategories = await responseCategories.json();

        createCategory();
        createGallery(listGallery);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des travaux et des catégories :", error);
    }
} //Ajout "try-catch"regroupe des instructions à exécuter et définit une réponse si une erreure lors de la récupération des travaux depuis l'API

getWorks();

//fonction pour créer la gallerie et pouvoir supprimer la gallerie du HTML
const gallery = document.querySelector(".gallery");

const createGallery = (arrayGallery) => {
    gallery.innerHTML = arrayGallery
        .map(
            (img) => `
    <figure>
      <img src=${img.imageUrl} alt=${img.title}>
      <figcaption>${img.title}</figcaption>
    </figure>
  `)
        .join("");
    //crée et renvoie une nouvelle chaîne de caractères en concaténant tous les éléments du tableau
};

// Fonction pour créer les catégories et rendre fonctionnels les filtres
const createCategorys = () => {
    const filter = document.querySelector(".btnFilter");

    // Création du bouton Tous
    const buttonAll = document.createElement("span");
    buttonAll.innerText = "Tous";
    buttonAll.classList.add("buttonName");
    //Modifier le nom de l'attribut //setAttribute fix la valeur de l'attribut "button" sur l'élément spécifié "buttonAll"
    buttonAll.setAttribute("button", 0)
    filter.appendChild(buttonAll);

    //création des autres boutons (objet,appartements,hôtels et restaurants)
    listCategories
        .map(
            (category) => {
                //console.log(category)
                const buttonName = document.createElement("span");
                buttonName.innerText = category.name;
                buttonName.setAttribute("button", category.name)
                //Ajouter un attribut idCategorie comme ci-dessus
                buttonName.classList.add("buttonName");
                filter.appendChild(buttonName);
                //console.log(buttonName)
            }

        )
}


//Tableau arrayFilter
const arrayFilters = document.querySelectorAll(".buttonName");


//spanFilter c'est le noeud qui contient tous mes boutons
for (const spanFilter of arrayFilters) {

    spanFilter.addEventListener("click", (event) => {
        //console.log(event.target) //Récupération de l'élèment html via event.target
        const spanFilter = event.target
        // const idCategorie = Récupérer idcategorie de l'event.target
        const buttonSelected = spanFilter.getAttribute("buttonSelected")//getAttribut pour obtenir la valeur courante d'un attribut
        console.log(buttonSelected)
        //Ne plus utiliser i mais la const idCatgeorie
        if (buttonSelected !== 0) {
            galleryFilters = listGallery.filter(el => el.categoryId === buttonSelected); //Ne plus utiliser i mais la const idCatgeorie
            createGallery(galleryFilters);
        } else {
            createGallery(listGallery);
        }
        arrayFilters.forEach(btn => btn.classList.remove("selected"));
        spanFilter.classList.add("selected");
    });

}

//Tous ce qui se passe dans la fonction dépend de arrayGallery

// On donne les instructions au click sur un bouton filtre / /
function buttonClicked(event) {
    // On retire la sélection actuelle du bouton //
    const buttonSelected = document.querySelector(".button--selected");
    buttonSelected.classList.remove('button--selected');
    // On sélectionne la nouvelle position du bouton qui a été clické //
    const updateButtonSelected = event.target; // on séléctionne l'élément qui vient de recevoir le click//
    updateButtonSelected.classList.add("button--selected");
    // On réaffiche les projets qui correspondent à la catégorie du bouton filtre qui a été cliqué //
    let worksFiltered = works.filter(function (work) { // On filtre les works en se demandant si le nom de la catégorie correspond //
        //au nom du bouton qui a été cliqué //
        if (event.target.innerText === "Tous") { // Dans le cas où on a cliqué sur tous on affiche alors tous les works //
            return true; // Donc on intègre tous les works dans worksfiltered //
        }
        return work.category.name === event.target.innerText; // Dans le cas où on a cliqué sur un bouton catégorie, on affiche les works //
        // dont la catégorie correspond au nom du bouton qui a été cliqué //
    });
    createProjectsCards(worksFiltered); // On appelle alors la fonction createprojectscards avec le paramètre worksfiltered //
    // qui permet d'afficher les projets en fonction du filtre qui a été cliqué avec le paramètre worksFiltered //
}