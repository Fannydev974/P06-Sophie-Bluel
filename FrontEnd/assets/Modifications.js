// Fonction pour créer les catégories et rendre fonctionnels les filtres
const createCategory = () => {
    const portfolio = document.getElementById("portfolio");
    if (portfolio === null) {
        console.error("L'élément avec l'ID 'portfolio' n'a pas été trouvé.");
        return;
    }

    const filter = document.createElement("div");
    filter.classList.add("filter");
    portfolio.appendChild(filter);

    filter.innerHTML = '<div class="button selected" id="0">Tous</div>' +
        ListCategories
            .map(category => `<div class="button" id="${category.name}">${category.name}</div>`)
            .join("");

    let btnFilter = document.querySelectorAll(".button");
    for (let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].addEventListener("click", () => {
            if (i !== 0) {
                const ListGalleryFilter = ListGallery.filter(el => el.categoryId == i);
                createGallery(ListGalleryFilter);
            } else {
                createGallery(ListGallery);
            }
            btnFilter.forEach(btn => btn.classList.remove("selected"));
            btnFilter[i].classList.add("selected");
        });
    }
};

const createGallery = gallery => {
    // Code pour créer la galerie
};

getWorks();









//-------------------------Modifs a faire!!!!!!-------------------------------------

//Remplacer innerHTML par createElement
filter.innerHTML = '<div class="button selected" data-idCategorie="0">Tous</div>' +
    ListCategories
        .map(category => {
            //On utilise createElement
            console.log(category)
                `<div class="button" id="${category.name}">${category.name}</div>`
        })
        //Plus dbesoin d'utiliser join −>
        .join(""); //Creer et renvoi une nouvelle CDC en Concatenant tous les éléments 



// Remplacer la boucle par un .map ou un for ... of
for (let i = 0; i < (document.createElement("button")).length; i++) {
    (document.createElement("button"))[i].addEventListener("click", (event) => {
        let btnFilter = document.querySelectorAll(".button");
        //Event correspond à l'évènement 
        console.log('event :', event)

        //Récupérer l'element html sur lequel a eu lieu l'action
        console.log('target : ', event.target);

        //Récupération de l'id categorie pour l'appliquer sur le filtre
        if (i !== 0) {
            const ListGalleryFilter = ListGallery.filter(el => el.categoryId == i) //id de la catégorie recupérée);
            createGallery(ListGalleryFilter);
        }
        btnFilter.forEach(btn => btn.classList.remove("selected"));

        //Utiliser la taget pour mettre la classe
        btnFilter[i].classList.add("selected");
    });
};




