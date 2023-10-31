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

// // On donne les instructions au click sur un bouton filtre / /
/*function buttonClicked(event) {
    // On retire la sélection actuelle du bouton //
    const buttonSelected = document.querySelector(".buttonSelected");
    buttonSelected.classList.remove('buttonSelected');
    // On sélectionne la nouvelle position du bouton qui a été clické //
    const updateButtonSelected = event.target; // on séléctionne l'élément qui vient de recevoir le click//
    updateButtonSelected.classList.add("buttonSelected");
    // On réaffiche les projets qui correspondent à la catégorie du bouton filtre qui a été cliqué //
    let worksFiltered = works.filter(function (work) {
        // On filtre les works en se demandant si le nom de la catégorie correspond //
        //au nom du bouton qui a été cliqué //
        if (event.target.innerText === "Tous") { // Dans le cas où on a cliqué sur tous on affiche alors tous les works //
            return true; // Donc on intègre tous les works dans worksfiltered //
        }
        return work.category.name === event.target.innerText; // Dans le cas où on a cliqué sur un bouton catégorie, on affiche les works //
        // dont la catégorie correspond au nom du bouton qui a été cliqué //
    });
    createProjectsCards(worksFiltered); // On appelle alors la fonction createprojectscards avec le paramètre worksfiltered //
    // qui permet d'afficher les projets en fonction du filtre qui a été cliqué avec le paramètre worksFiltered //
}*/