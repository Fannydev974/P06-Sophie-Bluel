let listGalleryModal = [];

let modal = null
let modal2 = null;

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null //Retirer le display:none du html
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', true)
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
    if (target2.startsWith("#")) {
        modal2 = document.querySelector(target2)
    } else {
        modal2 = await loadModal(target2)
    }
    modal2.style.display = null;
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
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

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
const btnDelete = document.createElement("button");
btnDelete.classList.add("btn-delete");
btnDelete.setAttribute("id", elements.id);






