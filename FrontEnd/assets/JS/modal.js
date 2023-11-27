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
    // let projectId = event.target.id

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















//***********Ajout Projets*****************//
/*const buttonValidate = document.getElementById("validate__modal")
buttonValidate.addEventListener("click", openModal2);

// Affichage des catégories dans la modale 2
function pictureCategory() {
    fetch("http://localhost:5678/api/categories")
        .then((response) => response.json())
        .then((categories) => {
            const sectionChooseCategory = document.getElementById("list-category");
            for (let index = 0; index < categories.length; index++) {
                const categoryIndex = categories[index];

                // Création d'une balise dédiée à un bouton filtre de la gallerie
                const chooseCategory = document.createElement('option');
                chooseCategory.classList.add("list-category");
                chooseCategory.innerHTML = categoryIndex.name;
                chooseCategory.value = categoryIndex.id;

                // Lien entre la balise input et la section filtre
                sectionChooseCategory.appendChild(chooseCategory);
            }
        })
        .catch((error) => {
            alert(`Erreur :` + error);
        });
}

// Prévisualisation de l'image selectionné
function addPictureBtn() {
    const addPictureBtn = document.getElementById("add__picture__btn");
    addPictureBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.files.length >= 0) {
            const src = URL.createObjectURL(event.target.files[0]);
            const preview = document.querySelector("#file-ip-1-preview");
            const iconImg = document.getElementById("icon-img");
            preview.src = src;
            preview.style.display = "block";
            iconImg.style.display = "none";
        }
    })
}
function colorBtnValidate() {
    const validateLabelCategorie = document.querySelectorAll(".labelcategorie");
    const buttonValidatePhoto = document.getElementById("validate__modal2");
    const title = document.getElementById("title");
    const category = document.getElementById("list-category");
    validateLabelCategorie.forEach((control) =>
        control.addEventListener("change", function () {
            if (title.value !== "" && category.value !== "") {
                buttonValidatePhoto.disabled = false;//désactiver l'attribut
            }
            if (title.value == "") {
                buttonValidatePhoto.disabled = false;
            }
        })
    );
}

// Evenement de validation du formulaire
function validateButton() {
    const validateBtn = document.getElementById("validate__modal2");
    validateBtn.addEventListener("click", (event) => {
        event.preventDefault();
        stopPropagation(event);
        selectElementsworks();
    });
}

function selectElementsworks() {
    //Capture de l'élément seléctionné
    const fileInput = document.getElementById("image");
    // Valeur du champs titre
    const title = document.querySelector("input[name='title']");
    // valeur du champs catégorie
    const category = document.querySelector("select[name='category']");

    // Condition de validation gestion des erreurs
    if (fileInput.files[0] == undefined) {
        alert("Veuillez choisir une image");
        return;
    }
    if (title.value == "") {
        alert("Veuillez définir un titre");
        return;
    }
    if (category.value == "") {
        alert("Veuillez selectionner une catégorie");
        return;
    }

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("category", category.value);
    formData.append("image", fileInput.files[0]);

    const userToken = localStorage.getItem("userToken");
    const preview = document.querySelector("#file-ip-1-preview");
    const iconImg = document.getElementById("icon-img");

    fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
        },
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                document.getElementById("add__form").reset();
                closeModal2();
                preview.remove();
                iconImg.style.display = "block";
                getWorks();
                return response.json();
            } else {
                alert("erreur lors du transfert");
            }
        })
};*/