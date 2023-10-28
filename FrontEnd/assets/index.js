//----Récupérer la gallerie et les catégories depuis l'api

let listGallery = [];
let listCategories = [];

//Fonction getWorks pour récuperer les travaux
const getWorks = async () => {
    await fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => { listGallery = data; });

    await fetch("http://localhost:5678/api/categories")
        .then((response) => response.json())
        .then((data) => { listCategories = data })

        .then(() => {
            createGallery(listGallery);
            createCategory();
        });
}
getWorks();

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

/*listCategories
    .map(
        (categories) =>
            `
                  <div class="buttonName selected" id="0">Tous</div>
                  <div class="buttonName" id="${categories.name}">${categories.name}</div>`
    )
    .join("");*/


const createCategory = () => {
    const filter = document.querySelector(".btnFilter");
    //innerhtml pour insérer le bouton par défault puis mapper le reste des éléments 
    filter.innerHTML =
        `<div class="buttonName selected" id="0">Tous</div>
   ` +
        listCategories
            .map(
                (categories) =>

                    `<div class="buttonName" id="${categories.name}">${categories.name}</div>`
            )
            .join("");


    let spanFilter = document.querySelectorAll(".buttonName");
    console.log(spanFilter)
    spanFilter.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.id === 0) {
                createGallery(listGallery);
            }
            else {
                const filteredImages = listGallery.filter((image) => image.category.name === button.id);
                createGallery(filteredImages);
            }
        })
    })
}