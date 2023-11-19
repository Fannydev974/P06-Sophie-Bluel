const modal1 = document.querySelector(".modal-container")
const modal2 = document.querySelector(".modal-container1")

const openModal1 = () => {
    modal1.style.display = null
    document.querySelectorAll(".modal-trigger").forEach((trigger) => {
        trigger.addEventListener("click", closeModal);
    });
}

const openModal2 = function () {
    modal1.style.display = 'none'
    modal2.style.display = null
    document.querySelectorAll(".modal-trigger1").forEach((trigger) => {
        trigger.addEventListener("click", closeModal2);
    });
};


const closeModal = function () { modal1.style.display = 'none' };
const closeModal2 = function () { modal2.style.display = 'none' };



//  Ouverture de la modale 1
document.querySelectorAll(".openModal1").forEach((a) => {
    a.addEventListener("click", openModal1);
});

const btnValidate = document.querySelector(".validate-btn").addEventListener('click', openModal2)
const modalReturn = document.querySelector(".modal-return").addEventListener('click', () => {
    openModal1()
    closeModal2()
})

const getWorksModal = async () => {
    await fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => { listGalleryModal = data })
        .then(() => {
            createGalleryModal()
            // APPEL FONCTION DE SUPPRESSION DES PROJET 
            // APPEL FONCTION D'AJOUT DE PROJET
        })
        .catch((error) => {
            console.error("Une erreur s'est produite lors de la récupération des travaux:", error);
        })
}
getWorksModal();


const createGalleryModal = () => {
    const modal_gallery = document.querySelector(".modal_gallery");
    listGalleryModal.forEach(project => {
        const figure = document.createElement("figure");


        const image = document.createElement("img");
        image.setAttribute("src", project.imageUrl);
        image.setAttribute("alt", project.title);


        figure.appendChild(image);
        modal_gallery.appendChild(figure);


        // Création du boutton delete
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("btn__delete");
        // Intégration du l'icone delete
        const iconDelete = document.createElement('i');
        iconDelete.classList = ("fa-solid fa-trash-can");
        deleteBtn.appendChild(iconDelete)
        figure.appendChild(deleteBtn)
    });
}

///---------------SUPPRIMER----------------///
//creer fonction pour supprimer les projets
function deletProjet(deleteId) {
    fetch('http://localhost:5678/api/works/§{deleteId}', {
        method: "DELETE",
        headers: {
            "Autoriation": "Bearer" + localStorage.getItem(token),
            "Accept": "application/Json",
            "content-type": "application/Json",
        },
    }).then((response) => {
        if (response.status == 204) {
            console.log("suppression du preojet");
            //Recharger la gallerie dans la modale
            fetch('http://localhost:5678/api/works').then(response.json()).then(data => {
                getWorksModal(data, listGalleryModal);
            });
        } else {
            alert("Erreur lors de la suppression du projet");
        }
    }).catch((error) => {
        alert(error);
    });

    //Gestionnaire d'evenement pour gallerie modale//
    listGalleryModal.addEventListener("click", function (event) {
        const trashCan = event.target.closest('.trash-can');
        if (trashCan) {
            const figure = trashCan.parentNode;
            const deleteId = figure.dataset.id;
            const confirmDelete = confirm("Voulez-vous vraiment supprimer ce projet?");
            if (confirmDelete) {
                deletePicture(deleteId);
            }
        }
    });
}




