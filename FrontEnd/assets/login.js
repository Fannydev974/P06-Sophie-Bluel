
// a faire : vérifier les champs vides
//Revoir envoi Api surement une erreure du formulaire et des infos*/
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//


//Création de la fonction de connexion "identifiant d'envoi"

async function sendId() {
    const formId = document.querySelector(".login__form");
    const errorMessage = document.querySelector(".error-message");

    //Vérification de la présence du formulaire
    if (formId) {
        //Lorsque l'utilisateur entre "mail et MDP" puis click sur "se connecter" un évenement "submit" est capturé par la fonction sendId// 
        formId.addEventListener("submit", async function (event) {//submit car formulaire soumis au serveur//
            event.preventDefault();//indique que si l'évènement n'est pas explicitement géré alors l'action par défaut ne devrait pas être exécutée comme elle l'est normalement//


            //Récupération des valeurs du formulaire d'identification
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            const user = {
                email: email,
                password: password
            };
            try {
                //valeur"mail et MDP" récupéré et sont envoyés en tant qu'objet JSON à l'API via une requête POST 
                const response = await fetch("http://localhost:5678/api/users/login", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(user)
                });
                //Vérification de la réponse par l'API Si réponse ok un token d'authentification est généré et renvoyé dans la réponse sinon un message d'erreur est affiché suivant le staut de la réponse
                if (response.status === 401) {
                    errorMessage.textContent = "Erreur, mot de passe incorrect.";
                } else if (response.status === 404) {
                    errorMessage.textContent = "Erreur, utilisateur inconnu.";
                } else if (response.ok) {
                    //Si la réponse est ok extraction des données JSON
                    const result = await response.json();

                    //Vérification du token && si c'est vrai
                    if (result && result.token) {
                        //Ce token est stocké localement dans le navigateur de l'utilisateur a l'aide de localStorage
                        localStorage.setItem("token", result.token);//setItem ajoute les clé-valeurs a l'emplacement storage/sinon les mets a jours la valeur si la clé existe déja
                        //Redirection vers la page d'accueil ( la fonction vérifie si le token est bien stocké dans le localStorage, si oui, l'utilisateur est redirigé vers la page d'acceuil)
                        document.location.href = "index.html";
                        //Changement du texte du lien une fois connecté
                        deconnect();
                    }
                }
            } catch (error) {
                //Message en cas d'erreur de requête où de connexion
                console.error("erreur lors de la requête d'authentification:", error);
            };
        });
    }
}

//Création de la fonction de déconnexion "deconnect" qui gère la déconnection de l'utilisateur
function deconnect() {//loginLink "lien de connexion"
    const loginLink = document.querySelector(".login-logout");

    if (loginLink) {
        //Si le token est présent dans le localStorage elle modifie le texte du lien en "logout" et ajoute un gestionnaire de click pour le déconnexion//
        if (localStorage.getItem("token")) {//getItem renvoi la valeur associée a la clé"token"passé en paramètre//
            //Changement du texte du lien "login" en "logout"
            loginLink.addEventListener("click", function (event) {
                event.preventDefault();
                //Lorsque l'utilisateur clic sur "logout" elle supprime le token du localStorage, déconnectant ainsi l'utilisateur et le redirige vers la page de connexion// 
                localStorage.removeItem("token");

                //Redirection vers la page d'identification
                document.location.href = "login.html";
            });

        }
    }
}
