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
    document.getElementById("add__form").reset();
    previewPictrure();
    validateForm();
    previewTwo()
    document.querySelectorAll(".modal-trigger1").forEach((trigger) => {
        trigger.addEventListener("click", closeModal2);

    }); if (modalReturn) {
        modalReturn.reset();
    }
};
const closeModal2 = function () {
    modal2.style.display = 'none'
};

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


/*******************************AJOUT DE PROJET********************************************/

///VERIFICATION DES CHAMPS//
function validateForm() {

    //Je selectionne tous les éléments du DOM qui ont la classe "fields-form"
    const validateContentForm = document.querySelectorAll(".fields-form");
    //J'ajoute un eventListener de type "change" a chacun d'eux, l'orsque l'un de ses éléments change la function "validateForm" est appelée.
    validateContentForm.forEach((control) => control.addEventListener('change', validateForm));

    // Récupérer les références des éléments du formulaire
    const title = document.getElementById("title");
    const category = document.getElementById("photoCategory");
    const validateBtn2 = document.getElementById("validateBtn2");

    // Valider les champs du formulaire
    const isTitleValid = title.value//.trim() !== ""; // Vérifier si le champ titre n'est pas vide,isTitleValid sera vrai si la valeur du champ "title"n'est pas une chaîne de caractères vide.
    const isCategoryValid = category.value//.trim() !== ""; // trim() pour retirer les blancs en début et fin de chaîne de caractère.
    const isImageValid = image.value//.trim() !== "";
    // Si tous les champs sont valides, changer la couleur du bouton
    if (isTitleValid.value !== "" && isCategoryValid.value !== "") {
        validateBtn2.style.background = "#1D6154";
        validateBtn2.style.cursor = "pointer";
        validateBtn2.disabled = false;


    } if (isTitleValid.value == "") {
        validateBtn2.style.background = "#a7a7a7";
        validateBtn2.disabled = false;
    }
}

// else {
// Si au moins un champ n'est pas valide, réinitialiser la couleur du bouton
//validateBtn2.style.background = "#A7A7A7";
//validateBtn2.style.cursor = "not-allowed";//non autorisé.
//validateBtn2.disabled = true;

//}

//********************************PARTIE D'AFFICHAGE****************************************//
// Prévisualisation de l'image selectionné

function previewPictrure() {
    const inputPreview = document.getElementById("image");

    inputPreview.addEventListener('change', (event) => {
        event.preventDefault();
        if (event.target.files.length >= 0) {
            const src = URL.createObjectURL(event.target.files[0]);
            const preview = document.querySelector("#file-ip-1-preview");
            const iconImg = document.getElementById("icons__img");
            const addPictureBtn = document.getElementById("addPictureBtn");
            const sizePicture = document.getElementById("size__picture");
            preview.src = src;
            preview.style.display = "block";
            iconImg.style.display = "none";
            addPictureBtn.style.display = "none";
            sizePicture.style.display = "none";
        }
    })
}

function previewTwo() {
    const preview = document.querySelector("#file-ip-1-preview");
    const iconImg = document.getElementById("icons__img");
    const addPictureBtn = document.getElementById("addPictureBtn");
    const sizePicture = document.getElementById("size__picture");
    document.getElementById("add__form").reset();
    preview.src = "";
    preview.style.display = "none";
    iconImg.style.display = "block";
    addPictureBtn.style.display = "block";
    sizePicture.style.display = "block";
}

//*******************************PARTIE D'AJOUT***************************************//
function addPicture(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Récupérer les références des éléments du formulaire
    const title = document.getElementById("title");
    const category = document.getElementById("photoCategory");
    const imageInput = document.getElementById("image");
    const buttonValidatePhoto = document.getElementById("validateBtn2");


    // Valider les champs du formulaire
    const isTitleValid = title.value.trim() !== "";
    const isCategoryValid = category.value.trim() !== "";
    const isImageValid = imageInput.files.length > 0;
    //console.log(imageInput.files);
    //console.log(isImageSelected);
    //alert('test');
    //return;

    // Vérifier si tous les champs sont valides
    if (isTitleValid && isCategoryValid && isImageValid) {
        // Construire le formulaire FormData pour l'envoi
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("category", category.value);
        formData.append("image", imageInput.files[0]);



        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userToken}`,
            },
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    // Réinitialiser le formulaire 
                    document.getElementById("add__form").reset();
                    previewTwo();
                    closeModal2();
                    getWorks();
                    getWorksModal();
                } else {
                    // Gérer les erreurs de réponse du serveur
                    console.error("Erreur lors de la soumission du formulaire");
                }
            })
            .catch(error => {
                // Gérer les erreurs lors de la requête
                console.error("Erreur de réseau:", error);
            });
    } else {
        // Si au moins un champ n'est pas valide, gérer par message d'erreur
        console.error("Veuillez remplir tous les champs du formulaire");
    }
}


// Ajouter un écouteur d'événements 'submit' pour le formulaire
const addPictureForm = document.getElementById("add__form");
addPictureForm.addEventListener("submit", addPicture);//envoyer
