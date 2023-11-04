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
const createGallery = (arrayGallery) => {
    const gallery = document.querySelector(".gallery");

    //Fonction d'éffacement de la gallerie et affichage de celle qui sera filtré
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

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

    // Création du bouton Tous avec l'ID "0" pour permettre le filtrage des projets 
    const buttonAll = document.createElement("span");
    buttonAll.innerText = "Tous";
    buttonAll.classList.add("buttonName");
    buttonAll.classList.add("selected");
    buttonAll.setAttribute("id", 0)
    //setAttribute fix la valeur de l'attribut "button" sur l'élément spécifié "buttonAll"
    buttonAll.setAttribute("buttonSelected", 0)
    filter.appendChild(buttonAll);

    //création des autres boutons (objet,appartements,hôtels et restaurants)
    listCategories
        .map(
            (category) => {
                const buttonName = document.createElement("span");
                buttonName.innerText = category.name;
                buttonName.setAttribute("id", category.name)//définir l'attribut
                buttonName.classList.add("buttonName");
                filter.appendChild(buttonName);
            }

        )
    // Rajout de la class active au bouton cliqué
    let active = document.querySelector(".selected");
    document.querySelectorAll(".buttonName")
        .forEach((spanButton) => {
            spanButton.addEventListener('click', () => {
                active.classList.remove("selected");
                spanButton.classList.add("selected");
                active = spanButton;

                // Filtrage de ma galerie au clic sur le bouton
                if (spanButton.id == 0) {
                    createGallery(listGallery);
                }
                else {
                    const filteredImages = listGallery.filter((image) => image.category.name === spanButton.id);
                    createGallery(filteredImages);
                }
            }
            )
        }
        )
}

//******************** GESTION DECONNECT********************//
const token = sessionStorage.getItem("token")//getItem renvoi la valeur associée a la clé"token"passé en paramètre//
console.log(token)

// Fonction de déconnexion et suppresion du Token 
const deconnect = () => {
    const loginLink = document.getElementById("loginLink");

    // Gestion du lien login dans le header 
    if (token) {
        loginLink.textContent = "logOut"//textContent obtient le contenu de tous les éléments + retourne chaque élément dans le noeud(dom)
        loginLink.addEventListener("click", () => {
            loginLink.textContent = "login"

            // Suppresion de token & Redirection
            sessionStorage.removeItem("token");
            window.location.href = "index.html";
        });

    }
}
deconnect()

/**********************************Page Modifier ******************************************/
function createGallery = (arrayGallery)







/********************* Apparition de la modal sur le lien modifier ************************/
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");//triggers déclencheurs

