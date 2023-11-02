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
    //Ajout "try-catch"regroupe des instructions à exécuter et définit une réponse si une erreure lors de la récupération des travaux depuis l'API
}
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
    //setAttribute fix la valeur de l'attribut "button" sur l'élément spécifié "buttonAll"
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
                //console.log(category.name);
                //Ajouter un attribut idCategorie comme ci-dessus
                buttonName.classList.add("buttonName");
                filter.appendChild(buttonName);
                //console.log(buttonName);
            }

        )


    //Tableau arrayFilter
    const arrayFilters = document.querySelectorAll(".buttonName");


    //spanFilter qui contient tous mes boutons
    for (const spanFilter of arrayFilters) {

        spanFilter.addEventListener("click", (event) => {
            console.log(event.target); //Récupération de l'élèment html via event.target (buttonName)
            const spanFilter = event.target;
            console.log(event.target);
            // const idCategorie = Récupérer idcategorie de l'event.target
            const buttonSelected = spanFilter.getAttribute("buttonSelected")//getAttribut pour obtenir la valeur de buttonSelected
            //console.log(buttonNameSelected);
            if (buttonSelected !== 0) {// !== sinon la gallery du html revient
                galleryFilters = listGallery.filter(el => el.category.name === buttonSelected); //Ne plus utiliser i mais la const idCatgeorie
                createGallery(galleryFilters);
                //console.log(galleryFilters);
            } else {
                createGallery(listGallery);
            }
            arrayFilters.forEach(btn => btn.classList.remove("selected"));
            spanFilter.classList.add("selected");

            //Tous ce qui se passe dans la fonction dépend de arrayGallery
            // Filtrer les données par catégorie
            function galleryFilters(category) {
                const galleryFilters = arrayGallery.filter(btn => btn.category.name === category);
                renderData(galleryFilters);
            }
        })

    }
}