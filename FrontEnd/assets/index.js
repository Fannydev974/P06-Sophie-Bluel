//----Récupérer la gallerie et les catégories depuis l'api

let listGallery = [];
let listCategories = [];

//Fonction getWorks pour récuperer des travaux
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
    //Modifier le nom de l'attribut //setAttribute fix la valeur d'un attribut sur l'élément spécifié 
    buttonAll.setAttribute("nameCategorie", 0)
    filter.appendChild(buttonAll);


    listCategories
        .map(
            (category) => {
                console.log(category)
                const buttonName = document.createElement("span");
                buttonName.innerText = category.name;
                buttonName.setAttribute("nameCategorie", category.name)
                //Ajouter un attribut idCategorie comme ci-dessus
                buttonName.classList.add("buttonName");
                filter.appendChild(buttonName);
                console.log(buttonName)
            }

        )

    //Tableau arrayFilter
    const arrayFilters = document.querySelectorAll(".buttonName");


    for (const spanFilter of arrayFilters) {

        spanFilter.addEventListener("click", (event) => {
            console.log(event.target) //Récupération de l'élèment html via event.target
            const spanFilter = event.target
            // const idCategorie = Récupérer idCtageorie de l'event.target
            const nameCategorie = spanFilter.getAttribute("nameCategorie")//getAttribut pour obtenir la valeur courante d'un attribut
            console.log(nameCategorie)
            //Ne plus utiliser i mais la const idCatgeorie
            if (i !== 0) {
                const listGalleryFilter = listGallery.filter(el => el.categoryId == i); //Ne plus utiliser i mais la const idCatgeorie
                createGallery(listGalleryFilter);
            } else {
                createGallery(listGallery);
            }
            arrayFilters.forEach(btn => btn.classList.remove("selected"));
            spanFilter.classList.add("selected");
        });
    }

}


//Tout ce qui se passe dans la fonction ne dépend que de la variable arrayGallery et des autres élèments crée à l'intérieur
function createGallery(arrayGallery) {
    console.log(arrayGallery)
}






/*
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
*/
