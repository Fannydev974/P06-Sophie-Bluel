//Récupération des éléments HTML
async function login {
    const emailLogin = document.getElementById("email")
    const passwordLogin = document.getElementById("password")

    const user = {
        email = emailLogin,
        password = passwordLogin,
    };
    await fetch("http://localhost:5678/api/users/login", {
        //Intéragir avec serveurs.Poster les éléments récupérés
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        //convertit une valeur en la notation JSON que représente la valeur
    })


}

















