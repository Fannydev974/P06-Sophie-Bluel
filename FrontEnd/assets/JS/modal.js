const modal1 = document.querySelector(".modal-container")
const modal2 = document.querySelector(".modal-container1")
let modalGallery = document.querySelector(".modal_gallery")
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
            createGalleryModal();
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
    const modalGallery = document.querySelector(".modal_gallery");
    listGalleryModal.forEach(project => {
        const figure = document.createElement("figure");


        const image = document.createElement("img");
        image.setAttribute("src", project.imageUrl);
        image.setAttribute("alt", project.title);


        figure.appendChild(image);
        modalGallery.appendChild(figure);


        // Création du boutton delete
        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("btn__delete");
        // Intégration du l'icone delete
        const iconDelete = document.createElement('i');
        iconDelete.classList.add("fa-solid");
        iconDelete.classList.add("fa-trash-can");
        iconDelete.setAttribute("data-projectId", project.id);//définis l'attribut 
        deleteBtn.appendChild(iconDelete)
        figure.appendChild(deleteBtn)
    });
}

///---------------SUPPRIMER----------------///

const deletePicture = () => {
    const iconTrashDelete = document.querySelectorAll(".fa-solid.fa-trash-can");

    //
    iconTrashDelete.forEach((icon) => {
        icon.addEventListener("click", (e) => {
            e.preventDefault();

            const projectId = e.target.getAttribute("data-projectId")//obtenir la valeur de l'attribut
            console.log(projectId);
            const userToken = localStorage.getItem("token");
            console.log(userToken);


            fetch('http://localhost:5678/api/works/${projectId}', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Suppression du Projet");
                        fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
                            getWorksModal(data, modalGallery);
                        });
                        fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
                            getWorks(data);
                        });
                    } else {
                        alert("Erreur dans la suppression du projet");
                    }
                })
                .catch((error) => {
                    console.log(`Erreur :` + error);
                });
        })
    });
}


/////////////////////////////


/*   fetch(`http://localhost:5678/api/works/${projectId}`, {
       method: 'DELETE',
       headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userToken}`,
       }
   })

       .then(response => {

           if (response.ok) {
               errorDelete.innerText = "Supprimé !";
               errorDelete.style.color = "green";
           }
           else {
               errorDelete.innerText = "Une erreur s'est produite";
               errorDelete.style.color = "red";
           }
       })
})
})*/


///-------------Ajout de projet------------------//////////

/*addImg.addEventListener("click", (event) => {
    modalAddImg.style.display = "block";
    modal1.style.display = "none";
})
*/

/*const sizePicture = document.querySelector("#size__picture")
const addPictureBtn = document.getElementById("#add__picture__btn")
const titleLabel = document.querySelector(".label__form")
const categorieLabel = document.querySelector("#categorie")
const validateModal2 = document.querySelector("#validate__modal2")
const validateModal2Green = document.querySelector(".green")
const errorDelete = document.querySelector(".delete-message")
const errorAdd = document.querySelector(".error")

addPictureBtn.addEventListener("click", () => {
    addPictureBtn.click()
})
categorieLabel.addEventListener("change", () => {
    if (titleLabel.value && categorieLabel.value && addFileInputImg.files[0]) {
        validateModal2Green.classList.add("green")
    }
})

validateModal2.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', titleLabel.value);
    formData.append('category', categorieLabel.value);
    formData.append('image', addFileInputImg.files[0]);

    if (titleLabel.value && categorieLabel.value && addPictureBtn.files[0]) {
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(() => {
                modalAddImg.style.display = "none";
                getWorks();
            })
    } else {
        errorAdd.innerText = "Tous les champs doivent être remplis";
        errorAdd.style.color = "red";
    }
});

const imageLabel = document.getElementById("image");
const previewImg = document.getElementById("preview");

fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            previewImg.innerHTML = `<img src="${this.result}" alt="preview image">`;
        });

        reader.readAsDataURL(file);

        const iconesImg = document.querySelector(".fa-image");
        iconesImg.style.display = "none";
        addModalImg.style.display = "none";
    }
});

getWorks()
listCategories()*/



























