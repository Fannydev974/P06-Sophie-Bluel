let listGalleryModal = [];
let modal1 = null;
let modal2 = null;

const openModal1 = async function (e) {
    e.preventDefault();

    const target = e.target.getAttribute("href");
    if (target) {//.firstModal("#")
        modal1 = document.querySelector(target);
    } else {
        modal1 = await (target)
    }
    //modal1.style.display = null //Retirer le display:none du html
    modal1.removeAttribute('aria-hidden');
    modal1.setAttribute('aria-modal', true);
    modal1 = target
    modal1.addEventListener('click', openModal1);
    modal1.querySelector('.modify__projets').addEventListener('click', openModal1);
    modal1.querySelector('.js__modal__stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
    if (modal1 === null) return
    e.preventDefault()
    modal1.style.display = "none";
    modal1.setAttribute('aria-hidden', 'true');
    modal1.removeAttribute('aria-modal');
    modal1.querySelector('.js__close__modal').removeEventListener('click', closeModal);
    modal1.querySelector('.js__modal__stop').removeEventListener('click', stopPropagation);
    modal1 = null
}

const openModal2 = async function (event) {
    event.preventDefault();
    const target2 = event.target.getAttribute("formaction");
    if (target2) {//.firstModal("#")
        modal2 = document.querySelector(target2);
    } else {
        modal2 = await (target2);
    }
    modal2.style.display = null;
    modal2.removeAttribute("aria-hidden");
    modal2.setAttribute("aria-modal", "true");
    modal2.addEventListener("click", openModal2);
    modal2.querySelector(".redone__btn").addEventListener("click", openModal2);
    modal2.querySelector(".return__btn").addEventListener("click", openModal2);
    modal2.querySelector(".js__modal__stop").addEventListener("click", stopPropagation);
};

const closeModal2 = function () {
    if (modal2 === null) return;
    modal2.style.display = "none";
    modal2.setAttribute("aria-hidden", "true");
    modal2.removeAttribute("aria-modal");
    modal2.removeEventListener("click", closeModal2);
    modal2.querySelector(".js__close__modal2").removeEventListener("click", closeModal2);
    modal2.querySelector(".return__btn").removeEventListener("click", closeModal2);
    modal2.querySelector(".js__modal__stop").removeEventListener("click", stopPropagation);
    modal2 = null;
};


// Evite que le code se duplique à chaque clic
const stopPropagation = function (event) {
    event.stopPropagation();
};

//  Ouverture de la modale 1
document.querySelectorAll(".redone__btn").forEach((a) => {
    a.addEventListener("click", openModal1);
});
// Fermeture Modale 1
function btnCloseModal() {
    const modalBtn1 = document.querySelector(".js__close__modal");
    modalBtn1.addEventListener('click', () => {
        closeModal();
    });
}
// Fermeture Modale 2
function btnCloseModal2() {
    const buttonModal2 = document.querySelector(".js__close__modal2");
    buttonModal2.addEventListener('click', () => {
        closeModal2();
    });
}

// Retour Modale 2 à Modale 1
function returnArrowModal() {
    const returnArrow = document.getElementById("return__modal2");
    returnArrow.addEventListener('click', (event) => {
        event.preventDefault();
        closeModal2();
    })
}





//Fonction getWorksModal pour récuperer les travaux

const getWorksModal = async () => {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works");
        listGalleryModal = await responseWorks.json();
        console.log(listGalleryModal);

        createGalleryModal(listGalleryModal);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des travaux:", error);
    }
}
getWorksModal();

const createGalleryModal = (arrayGallery) => {
    console.log(createGalleryModal);
    const modal_gallery = document.querySelector(".modal_gallery");
    for (project of arrayGallery) {//Project = mon image
        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.setAttribute("src", project.imageUrl);
        image.setAttribute("alt", project.title);

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = project.title

        figure.appendChild(image);
        figure.appendChild(figcaption);
        modal_gallery.appendChild(figure);
    }
};

// Création du container des miniatures
const formSmall = document.createElement("div");
formSmall.classList.add("form__display__small");

const smallIcone = document.createElement("div");
smallIcone.classList.add("icon_form_display_small");

// Intégration des images
const imgSmall = document.createElement("img");
//imgSmall.src = project.imageUrl;
//imgSmall.alt = project.title;
imgSmall.classList.add("display__small");

// Création du boutton delete
const deleteBtn = document.createElement("button");
deleteBtn.classList.add("btn_delete");
console.log(deleteBtn)
deleteBtn.setAttribute("id", deleteBtn.id);

// Intégration du l'icone delete
const iconDelete = document.createElement('i');
iconDelete.classList = ("fa-solid fa-trash-can");


// Intégration du label éditer
const modifyEdit = document.createElement("a");
modifyEdit.textContent = "Mode édition";
modifyEdit.classList.add("edition")

// Rattachement des balises
formSmall.appendChild(smallIcone);
smallIcone.appendChild(deleteBtn);
deleteBtn.appendChild(iconDelete);
formSmall.appendChild(imgSmall);
formSmall.appendChild(modifyEdit);
