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

/////////////////////////////////VERIFICATION DES CHAMPS////////////////////////////
function validateForm() {

    const validateContentForm = document.querySelectorAll(".fields-form");
    validateContentForm.forEach((control) => control.addEventListener('change', validateForm));
    // Récupérer les références des éléments du formulaire
    const title = document.getElementById("title");
    const category = document.getElementById("photoCategory");
    const buttonValidatePhoto = document.getElementById("validate__btn2");

    // Valider les champs du formulaire
    const isTitleValid = title.value.trim() !== ""; // Vérifier si le champ titre n'est pas vide
    const isCategoryValid = category.value.trim() !== ""; // Vérifier si le champ catégorie n'est pas vide

    // Si tous les champs sont valides, changer la couleur du bouton
    if (isTitleValid && isCategoryValid) {
        buttonValidatePhoto.style.background = "#1D6154";
        buttonValidatePhoto.style.cursor = "pointer";
        buttonValidatePhoto.disabled = false;
    } else {
        // Si au moins un champ n'est pas valide, réinitialiser la couleur du bouton
        buttonValidatePhoto.style.background = "#a7a7a7";
        buttonValidatePhoto.style.cursor = "not-allowed";
        buttonValidatePhoto.disabled = true;
    }
}

// Ajouter un écouteur d'événement 'change' pour le formulaire
//const form = document.getElementById("form__add");
//form.addEventListener("change", validateForm);

//////////////////////////PARTIE D'AFFICHAGE//////////////////////////////
// Prévisualisation de l'image selectionné
/*function previewFile() {
    const inputPreview = document.getElementById("image");
    inputPreview.addEventListener('change', (event) => {
        event.preventDefault();
        if (event.target.files.length >= 0) {
            const src = URL.createObjectURL(event.target.files[0]);
            const preview = document.querySelector("#file-ip-1-preview");
            const iconImg = document.getElementById("icons__img");
            preview.src = src;
            // previewFile.style.display = "block";
            iconImg.style.display = "none";
        }
        // displayPreview(selectedFile);
        previewFile();
    })
}*/
///////////////////////////////////
function previewFile() {
    //Récupérer l’élément input de type file
    const inputPreview = document.getElementById("image");
    const iconImg = document.getElementById("icons__img");

    //Vérifier si des fichiers ont été sélectionnés
    if (inputPreview.files.length > 0) {
        //Récupérer le premier fichier(files[0])
        const selectedFile = inputPreview.files[0];

        //Appeler la fonction de prévisualisation avec le fichier sélectionné
        displayPreview(selectedFile);
        //previewFile();
    }
}

function displayPreview(files) {
    //Créer un objet URL pour le fichier sélectionné
    const src = URL.createObjectURL(files);

    //Sélectionner l’élément où afficher la prévisualisation
    const preview = document.querySelector(".file-ip-1-preview");

    //Mettre à jour la source et afficher la prévisualisation
    preview.src = src;
    //preview.style.display = "block";
    iconImg.style.display = "none";
}

//Ajouter un écouteur d’événements 'change' pour l’input de type file
const inputPreview = document.getElementById("image");
inputPreview.addEventListener('change', previewFile);

//////////////////////////////////////PARTIE D'AJOUT////////////////////////////////////
function addPicture(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Récupérer les références des éléments du formulaire
    const title = document.getElementById("title");
    const category = document.getElementById("photoCategory");
    const imageInput = document.getElementById("image");
    const buttonValidatePhoto = document.getElementById("validate__btn2");

    // Valider les champs du formulaire
    const isTitleValid = title.value.trim() !== "";
    const isCategoryValid = category.value.trim() !== "";
    const isImageSelected = imageInput.files.length > 0;

    // Vérifier si tous les champs sont valides
    if (isTitleValid && isCategoryValid && isImageSelected) {
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
                    // Réinitialiser le formulaire et effectuer d'autres actions nécessaires
                    document.getElementById("add__form").reset();
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
        // Si au moins un champ n'est pas valide, gérer en conséquence (par exemple, afficher un message d'erreur)
        console.error("Veuillez remplir tous les champs du formulaire");
    }
}

// Ajouter un écouteur d'événements 'submit' pour le formulaire
const addPictureForm = document.getElementById("add__form");
addPictureForm.addEventListener("submit", addPicture);
