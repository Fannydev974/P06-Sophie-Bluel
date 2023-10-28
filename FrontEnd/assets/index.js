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

// Fonction pour créer les catégories et rendre fonctionnels les filtres
const createCategory = () => {
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


for (const spanFilter of arrayFilters) {

    spanFilter.addEventListener("click", (event) => {
        //console.log(event.target) //Récupération de l'élèment html via event.target
        const spanFilter = event.target
        // const idCategorie = Récupérer idcategorie de l'event.target
        const buttonSelected = spanFilter.getAttribute("buttonSelected")//getAttribut pour obtenir la valeur courante d'un attribut
        //console.log(buttonSelected)
        //Ne plus utiliser i mais la const idCatgeorie
        if (buttonSelected !== 0) {
            galleryFilters = listGallery.filter(el => el.categoryId == buttonSelected); //Ne plus utiliser i mais la const idCatgeorie
            createGallery(galleryFilters);
        } else {
            createGallery(listGallery);
        }
        arrayFilters.forEach(btn => btn.classList.remove("selected"));
        spanFilter.classList.add("selected");
    });
}



//fonction pour créer la gallerie et pouvoir supprimer la gallerie du HTML
let gallery = document.createElement("div");
gallery.classList.add("gallery");

const createGallery = (arrayGallery) => {
    gallery.innerHTML = arrayGallery
        .map(
            (img) =>
                `<figure>
    <img src=${img.imageUrl} alt=${img.title}>
    <figcaption>${img.title}</figcaption>
  </figure>
  `)
        .join("");
    portfolio.appendChild(gallery);
};

//Tout ce qui se passe dans la fonction ne dépend que de la variable arrayGallery et des autres élèments crée à l'intérieur

function filtersGallery() {
    const arrayGallery = document.querySelectorAll(".buttonName");
    arrayGallery.addEventListener("click", () => {
        buttonSelected.forEach((btn) => {
            if (btn === buttonSelected) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    })

}
filtersGallery()
//function createGallery(arrayGallery)




function galleryFilters(categoryId, buttonSelected) {
    const filteredProjects = !categoryId ? buttonSelected : buttonSelected.filter(() => all.categoryId === categoryId);
    arrayGallery(filteredProjects);
    setSelectedFilter(buttonSelected);
}

function setSelectedFilter(buttonSelected) {
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        button.classList.remove('buttonSelected');
    });
    buttonSelected.classList.add('buttonSelected');
}

