let token = "";

export async function login() {
	const loginBtn = document.querySelector("header nav ul li .login-btn");
	loginBtn.style.fontWeight = "600";

	const formLogin = document.querySelector(".login");

	formLogin.addEventListener("submit", function (event) {
		event.preventDefault();

		const login = {
			email: event.target.querySelector("[name=e-mail]").value,
			password: event.target.querySelector("[name=password]").value
		};

		// Verification if the e-amil is valid and if the inputs are no empty
		const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if (login.email === "" && login.password === "") {
			alert ("Champs e-mail et mot de passe vides");
			return 0;
		}
		if (login.email === "") {
			alert ("Champ e-mail vide");
			return 0;
		}
		if (login.password === "") {
			alert ("Champ mot de passe vide");
			return 0;
		}
		else if (!pattern.test(login.email)) {
			alert ("Veuillez entrer une adresse e-mail valide");
			return 0;
		}

		const data = JSON.stringify(login);

		// Send data to the server
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