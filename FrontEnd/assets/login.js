//Récupération des éléments HTML
async function login() {
    const emailLogin = document.getElementById("email").value;
    const passwordLogin = document.getElementById("password").value;

    const user = {
        email: emailLogin,
        password: passwordLogin,
    };
    /* await fetch("http://localhost:5678/api/users/login", {
         //Intéragir avec serveurs.Poster les éléments récupérés
         method: "POST",
         headers: {
             "Accept": "application/json",
             "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
     })
      const btnForm = document.querySelector(".connexion");
        btnForm.addEventListener("submit", (event) => {
            event.preventDefault();
            login();
        });*/


    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(AuthentificationData),
        });
        switch (response)

        //Vérification de la réponse
        /*if (Response.status === 401) {
            errorMessage.textContent = "Erreur, mot de passe incorrect.";
            errorMessage.style.Display = "block";
        } else if (Response.status === 404) {
            errorMessage.textContent = "Erreur, utilisateur inconnu.";
            errorMessage.style.Display = "block";
        } else if (Response.ok) {
            //Si la réponse est ok extraction des données JSON
            const result = Response.json();
            //Vérification du token
            if (result && result.token) {
                //Stockage du token dans le local storage
                localStorage.setItem("token", result.token);
                //Redirection vers la page d'accueil
                window.location.href = "index.html";
                //Changement du texte une fois connecté
                deconnect();
            }
        }*/
    } catch (error) {
            //Message en cas d'erreur de requête où de connexion
            console.error("erreur lors de la requête d'authentification:", error);
        };
    }
