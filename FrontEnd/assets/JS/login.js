//********GESTION DU FORMULAIRE DE CONNEXION**********//

const login = async () => {
    const myError = document.getElementById('Error');
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;


    if (!email || !password) {
        myError.textContent = "Veuillez renseigner l'email et le mot de passe ";
        myError.style.color = "red"
        return
    }
    //Construction de l'objet pour la requête API via une requête POST 
    const user = {
        email: email,
        password: password
    };

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        //Récupération de la response JSON puis traitement de la response//
    })
        .then((response) => response.json())
        .then((result) => {
            if (!result.token) { //traite le (result.token)
                myError.textContent = "L'authentification a échouée, veuillez réessayer";
                myError.style.color = "red"
            }
            else {
                myError.textContent = "Authentification réussie";//Si ok, le resultat donne un ID et un token
                myError.style.color = "green"
                sessionStorage.setItem("token", result.token)//stocker le token dans le sessionStorage
                window.location.href = "./index.html"// Redirection vers page d'acceuil
            }
        })

}
//appelle fonction "sendId/identifiant d'envoi" dans addEventListener pour aller récupérer mes champs et faire ma requête. 
document.querySelector(".login__form").addEventListener('submit', (sendId) => {
    sendId.preventDefault();
    login();
})
// Récupérer des données depuis sessionStorage var data = sessionStorage.getItem("clé");
// Supprimer des données de sessionStorage sessionStorage.removeItem("clé");
//submit pour envoyer des données


