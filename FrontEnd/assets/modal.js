//il faut que a la connection du login les filtres s'effacent et le "boutton" modifier apparraisse avec "edition".



let listGalleryModal = [];

const modalContainer = document.querySelector(".modal-container");//Je prend mon container
const modalTriggers = document.querySelectorAll(".modal-trigger");//Je prend tout mes trigger

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))//j'envoi un e click sur mes trigger
//Dès que je click ça me renvoi au toggle(basculer)

function toggleModal() {
    modalContainer.classList.toggle("active")//Rajoute la classe active si elle n'y est pas
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
//Faire une boucle pour mettre le même id pour l'icone et l'image pour que ça corresponde lors du delete

const btnModal1 = function (e) {
    e.preventDefault();
}
//modal.style.display = null //Retirer le display:none du html
//modal.addEventListener('click',



//creer la suppression des projets 



/*let listGalleryModal = [];

let modal = null
let modal2 = null;

const openModal = async function (e) {
    e.preventDefault();

    const target = e.target.getAttribute("href");
    /* if (target.startsWith("#")) {
         modal = document.querySelector(target)
     } else {
         modal = await loadModal(target)
     }*/
/*modal.style.display = null //Retirer le display:none du html
modal.removeAttribute('aria-hidden')
modal.setAttribute('aria-modal', true)
modal = target
modal.addEventListener('click', closeModal)
modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}
const closeModal = function (e) {
if (modal === null) return
e.preventDefault()
modal.style.display = "none" //Remettre le display:none du html
modal.setAttribute('aria-hidden', 'true')
modal.removeAttribute('aria-modal')
modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
modal = null
}

const openModal2 = async function (event) {
event.preventDefault();
const target2 = event.target.getAttribute("formaction");
/*if (target2.startsWith("#")) {
    modal2 = document.querySelector(target2)
} else {
    modal2 = await loadModal(target2)
}*/
/* modal2.style.display = null;
 modal2.removeAttribute("aria-hidden");
 modal2.setAttribute("aria-modal", "true");
 modal2.addEventListener("click", modalClose2);
 modal2.querySelector(".js-modal-close-2").addEventListener("click", modalClose2);
 modal2.querySelector(".btn-return-arrow").addEventListener("click", modalClose2);
 modal2.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

const modalClose2 = function () {
 if (modal2 === null) return;
 modal2.style.display = "none";
 modal2.setAttribute("aria-hidden", "true");
 modal2.removeAttribute("aria-modal");
 modal2.removeEventListener("click", modalClose2);
 modal2.querySelector(".js-modal-close-2").removeEventListener("click", modalClose2);
 modal2.querySelector(".btn-return-arrow").removeEventListener("click", modalClose2);
 modal2.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
 modal2 = null;
};

//Evite que le code se duplique à chaque clic
const stopPropagation = function (e) {
 e.stopPropagation()
}

//Ouverture de la modale1
document.querySelectorAll('.modal').forEach(a => {
 a.addEventListener('click', openModal)
})
// Fermeture Modale 1
function btnCloseModal() {
 const btnCloseModal = document.querySelector(".js-modal-close");
 btnCloseModal.addEventListener('click', () => {
     btnCloseModal();
 });
}

// Fermeture Modale 2
function btnCloseModal2() {
 const btnCloseModal2 = document.querySelector("btnCloseModal2");
 btnCloseModal2.addEventListener('click', () => {
     btnCloseModal2();
 });
}
// Retour Modale 2 à Modale 1
function returnArrowModal() {
 const returnArrow = document.getElementById("return-modal2");
 returnArrow.addEventListener('click', (event) => {
     event.preventDefault();
     btnCloseModal2();
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

// Création du boutton delete
//const btnDelete = document.createElement("button");
//btnDelete.classList.add("btn-delete");
//btnDelete.setAttribute("id", elements.id);*/







