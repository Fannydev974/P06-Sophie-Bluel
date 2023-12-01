import { getWorks } from "./index.js"

// ******************* GESTION DE L'APPARITION DE LA MODALE ******************* //

const modal1 = document.querySelector(".modal-container")
const modal2 = document.querySelector(".modal-container1")
const modalGallery = document.querySelector(".modal_gallery")


// ***** OUVERTURE DE LA MODALE DE SUPPRESION *****//
const openModal1 = () => {
    modal1.style.display = null
    document.querySelectorAll(".modal-trigger").forEach((trigger) => {
        trigger.addEventListener("click", closeModal);
    });
}
const closeModal = function () { modal1.style.display = 'none' };

// ***** OUVERTURE DE LA MODALE D'AJOUT *****//
const openModal2 = function () {
    modal1.style.display = 'none'
    modal2.style.display = null
    document.querySelectorAll(".modal-trigger1").forEach((trigger) => {
        trigger.addEventListener("click", closeModal2);
    });
};
const closeModal2 = function () { modal2.style.display = 'none' };

//  GESTION AU CLICK DES MODALES DE GESTIONS
document.querySelectorAll(".openModal1").forEach((a) => {
    a.addEventListener("click", openModal1);
});

const btnValidate = document.querySelector(".validate-btn").addEventListener('click', openModal2)
const modalReturn = document.querySelector(".modal-return").addEventListener('click', () => {
    openModal1()
    closeModal2()
})

// ******************* GESTION DES WORKS ******************* //
let listGalleryModal
const getWorksModal = async () => {
    await fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => { listGalleryModal = data })
        .then(() => {
            createGalleryModal();
            // APPEL FONCTION DE SUPPRESSION DES PROJET 

            // APPEL FONCTION D'AJOUT DE PROJET
        })
        .catch((error) => {
            console.error("Une erreur s'est produite lors de la récupération des travaux:", error);
        })
}
getWorksModal();


const createGalleryModal = () => {
    // On efface la gallerie, puis on affiche les projets
    while (modalGallery.firstChild) {
        modalGallery.removeChild(modalGallery.firstChild);
    }

    listGalleryModal.forEach(project => {
        // Création des projets
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.setAttribute("src", project.imageUrl);
        image.setAttribute("alt", project.title);
        // Insertion des projets 
        figure.appendChild(image);
        modalGallery.appendChild(figure);

        // Création du boutton delete
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("btn__delete");
        // Intégration du l'icone delete
        const iconDelete = document.createElement('i');
        iconDelete.classList.add("fa-solid");
        iconDelete.classList.add("fa-trash-can");
        iconDelete.setAttribute("data-projectId", project.id);
        deleteBtn.appendChild(iconDelete)
        figure.appendChild(deleteBtn)
    });
    // Gestion au click de la suppression des projets pour chaque icones
    const iconTrashDelete = document.querySelectorAll(".fa-solid.fa-trash-can").forEach((icon) => {
        icon.addEventListener("click", (event) => deletePicture(event))
    })

};
// ***** Suppression des works *****//
const userToken = sessionStorage.getItem("token");

const deletePicture = async (event) => {
    // On récupère l'ID du projet à supprimer
    const projectId = event.target.getAttribute("data-projectId")//obtenir la valeur de l'attribut
    console.log(projectId);
    const userToken = sessionStorage.getItem("token");
    console.log(userToken);
    //let projectId = event.target.id

    await fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` }
    })
        .then(async (response) => {
            if (response.ok) {
                alert("Suppression du Projet");
                await getWorksModal()
                // Appel de la fonction getWorks pour afficher la nouvelle gallerie après la suppression
                getWorks()
            }
            else { alert("Erreur dans la suppression du projet"); }
        })
}


//***********AJOUT DE PROJET*****************//
let addPicture = document.getElementById("add__picture");
const inputFile = document.createElement("input");
//L'orsque l'on click sur Ajout photo, ouvrir le file input
addPicture.addEventListener("click", function () {
    inputFile.click();
});

//L'orsqu'un fichié est choisi
inputFile.addEventListener("change", function () {
    const file = this.files[0];

    //Vérifier le type de fichier
    if (file.type !== "image/png" && file.type !== "image/jpg") {
        errorMessage.style.display = "block";
        return;
    } else {
        errorMessage.style.display = "none";
    }
    //Créer une URL pour le fichier
    const URL = URL.createObjetUrl(file);
    //Cacher l'élément <i>
    icons__img.style.display = "none";
    //Créer un nouvel élément <image> et l'inserer après le file input 
    const img = document.createElement("img");
    img.src = URL;
    img.classList.add("miniature-Photo");
    previewFile.parentNode.insertBefore(img, inputFile.nextSibling);
    //Cacher le bouton et le texte des conditions
    addPicture.style.display = "none";
    sizePicture.style.display = "none";
});

//Fonction uploadPhoto appelé lorsque l'on click sur Valider
function uploadPhoto() {
    const file = document.getElementById("inputPhoto").files[0];
    const title = document.getElementById("titlePhoto").value;
    const category = document.getElementById("photoCategory").value;
    const categoryId = getCategoryId(category);
    if (!categoryId) {
        alert("categorie invalide");
        return;
    }
    let formData = new formData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", categoryId);
    fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            Authorization: "Bearer" + sessionStorage.getItem("userToken"),
        },
        Body: formData
    }).then(response => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error("Requête incorrect");
        } else if (response.status === 401) {
            throw new Error("Non autorisé");
        }
    }).then(data => {
        console.log(data);
        switchToGalleryModale();
        fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
            getWorksModal(data, modalGallery);
        });
        fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
            getWorks(data);
        });
        alert("Projet ajouté avec succès");
    }).catch(error => {
        alert("Une erreure c'est produite lors de l'ajout de la photo : " + error.message);
        console.error(error);
    });
}