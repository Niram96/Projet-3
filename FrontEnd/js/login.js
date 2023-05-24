let token = "";

export async function login() {
	const formLogin = document.querySelector(".login");
	formLogin.addEventListener("submit", function (event) {
		event.preventDefault();
		// Création de l’objet du nouvel avis.
		const login = {
			email: event.target.querySelector("[name=e-mail]").value,
			password: event.target.querySelector("[name=password]").value
		};
		// Création de la charge utile au format JSON
		const data = JSON.stringify(login);
		// Appel de la fonction fetch avec toutes les informations nécessaires
		fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: data
		})  
        .then (function (response) {
            if (!response.ok) {
                alert("Erreur : e-mail ou mot de passe incorrect");
            }	
			return response.text(); 
        })

        .then (function (result) {
			token = JSON.parse(result).token;
			window.sessionStorage.setItem("token", token);
			return console.log(result);
		})

		.then (function redirect() {
			if (window.sessionStorage.getItem("token", token) === token) {
				window.location.href = "index.html";
			}
		});

	});
}

login();