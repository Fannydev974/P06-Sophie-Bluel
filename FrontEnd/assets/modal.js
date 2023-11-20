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
            deletePicture();
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
        iconDelete.classList.add("fa-solid");
        iconDelete.classList.add("fa-trash-can");
        iconDelete.setAttribute("data-projectId", project.id);
        deleteBtn.appendChild(iconDelete)
        figure.appendChild(deleteBtn)
    });
}
///---------------SUPPRIMER----------------///

const deletePicture = () => {
    const iconTrashDelete = document.querySelectorAll(".fa-solid.fa-trash-can");

    iconTrashDelete.forEach((icon) => {
        icon.addEventListener("click", (e) => {
            e.preventDefault();
            const projectId = e.target.getAttribute("data-projectId")//identifie la cible courante pour l'évènement lorsque celui-ci traverse le DOM. Elle fait toujours référence à l'élément sur lequel le gestionnaire d'évènement a été attaché 
            const userToken = localStorage.getItem("token");
            console.log(userToken);

            fetch('http://localhost:5678/api/works/§{projectId}', {
                method: "DELETE",
                headers: {
                    Accept: "*/*",
                    Autorization: 'Bearer §{userToken}',
                },
            })
                .then((response) => {
                    if (response.status == 401) {
                        return null;
                    }
                    return response.json();
                })
                .then((dataRes) => {//voir pour changer dataRes ou supprimer
                    if (dataRes === null) {
                        console.log("Projet supprimé avec succès");
                    }
                })
        })
    })
}


///Ajout de projet//////////
//l'orsque l'on click sur le btn d'ajout de photo
// addPictureBtn.addEventListener("click", function () {

// });






















