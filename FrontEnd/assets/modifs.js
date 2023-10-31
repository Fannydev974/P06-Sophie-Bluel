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
    for (project of arrayGallery) {//Project = mon image
        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.setAttribute("src", project.imageUrl);
        image.setAttribute("alt", project.title);

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = project.title

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
};

// Fonction pour créer les catégories et rendre fonctionnels les filtres
const createCategory = () => {
    const filter = document.querySelector(".btnFilter");

    // Création du bouton Tous
    const buttonAll = document.createElement("span");
    buttonAll.innerText = "Tous";
    buttonAll.classList.add("buttonName");
    //Modifier le nom de l'attribut //setAttribute fix la valeur de l'attribut "button" sur l'élément spécifié "buttonAll"
    buttonAll.setAttribute("buttonSelected", 0)
    filter.appendChild(buttonAll);

    //création des autres boutons (objet,appartements,hôtels et restaurants)
    listCategories
        .map(
            (category) => {
                //console.log(category)
                const buttonName = document.createElement("span");
                buttonName.innerText = category.name;
                buttonName.setAttribute("buttonSelected", category.name)//définir l'attribut
                //Ajouter un attribut idCategorie comme ci-dessus
                buttonName.classList.add("buttonName");
                filter.appendChild(buttonName);
                //console.log(buttonName);
            }

        )


    //Tableau arrayFilter
    const arrayFilters = document.querySelectorAll(".buttonName");


    //spanFilter c'est le noeud qui contient tous mes boutons
    for (const spanFilter of arrayFilters) {

        spanFilter.addEventListener("click", (event) => {
            console.log(event.target); //Récupération de l'élèment html via event.target (buttonName selected)
            const spanFilter = event.target;
            // const idCategorie = Récupérer idcategorie de l'event.target
            const buttonNameSelected = spanFilter.getAttribute("buttonSelected")//getAttribut pour obtenir la valeur de buttonSelected
            //console.log(buttonSelected)
            //Ne plus utiliser i mais la const idCatgeorie
            if (buttonNameSelected !== 0) {// !== sinon la gallery du html revient
                galleryFilters = listGallery.filter(el => el.categoryId === buttonNameSelected); //Ne plus utiliser i mais la const idCatgeorie
                createGallery(galleryFilters);
                //console.log(galleryFilters);
            } else {
                createGallery(listGallery);
            }
            arrayFilters.forEach(btn => btn.classList.remove("selected"));
            spanFilter.classList.add("selected");

        });

    }
    // changement de buttonSelected en buttonNameSelected ligne87 a 91
    //Tous ce qui se passe dans la fonction dépend de arrayGallery

}
