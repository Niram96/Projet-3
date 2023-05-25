// ********** Recovery of work ********** //

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

async function getWorks(works) {
    for (let i=0; i < works.length; i++) {
        const work = works[i];
        const gallery = document.querySelector(".gallery");
        const article = document.createElement("figure");
        const id = work.id;
        const image = document.createElement("img");
        image.src = work.imageUrl;
        const titre = document.createElement("p");
        titre.innerText = work.title;

        gallery.appendChild(article);
        article.appendChild(image);
        article.appendChild(titre);
        }
}

getWorks(works);

// ********** Buttons Management ********** //

const allButton = document.querySelector(".all-btn");
const ojectsButton = document.querySelector(".objects-btn");
const apartmentsButton = document.querySelector(".apartments-btn");
const hotelsAndRestaurants = document.querySelector(".hotels-and-restaurants-btn");

const objectsArray = [];
const apartmentsArray = [];
const hotelsAndRestaurantsArray = [];

// Sort function
async function sortWorks() {

    for (let i=0; i < works.length; i++) {
        const work = works[i];

        if (works[i].category.name === "Objets") {
            objectsArray.push(work);
        } 
        else if (works[i].category.name === "Appartements") {
            apartmentsArray.push(work);
        }
        else if (works[i].category.name === "Hotels & restaurants") {
            hotelsAndRestaurantsArray.push(work);
        }
    }
    return [objectsArray, apartmentsArray, hotelsAndRestaurantsArray];
}

sortWorks ();

// Button functions

allButton.addEventListener("click", function () {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML="";
    getWorks(works);
});


ojectsButton.addEventListener("click", function () {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML="";
    getWorks(objectsArray);
});


apartmentsButton.addEventListener("click", function () {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML="";
    getWorks(apartmentsArray);
});


hotelsAndRestaurants.addEventListener("click", function () {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML="";
    getWorks(hotelsAndRestaurantsArray);
});

// ********** Homepage edit ********** //

function homepageEdit () {
    if (window.sessionStorage.getItem("token") !== null) {

        let head  = document.getElementsByTagName('head')[0];
        let link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = "./assets/homepage_edit.css";
        link.media = 'all';
        head.appendChild(link);

        let header = document.querySelector("header");
        let editMode = document.createElement("div");
        editMode.classList.add("edit-mode");

        let editModeBtn = document.createElement("button");
        editModeBtn.innerText = "Mode édition";

        let editModeImg = document.createElement("i");
        editModeImg.classList.add("fa-sharp", "fa-light", "fa-pen-to-square");

        let publishTheChangesBtn = document.createElement("button");
        publishTheChangesBtn.innerText = "publier les changements";

        let projectsDiv = document.createElement("div");
        projectsDiv.classList.add("projects-div");

        let myProjects = document.querySelector(".my-projects");
        let modify = document.createElement("button");
        modify.classList.add("modify-btn");
        modify.innerText = "modifier";
        let portfolio = document.querySelector("#portfolio");
        let gallery = document.querySelector(".gallery");

        let modifyIcon = document.createElement("i");
        modifyIcon.classList.add("fa-light", "fa-pen-to-square");

        portfolio.appendChild(projectsDiv);
        projectsDiv.appendChild(myProjects);
        projectsDiv.appendChild(modify);
        portfolio.insertBefore(projectsDiv, gallery);

        modify.appendChild(modifyIcon)

        header.appendChild(editMode);
        editMode.appendChild(editModeBtn);
        editModeBtn.appendChild(editModeImg);
        editMode.appendChild(publishTheChangesBtn);

        let loginBtn = document.querySelector(".login-btn");
        loginBtn.innerText = "logout";

        modify = document.querySelector("button");

        let modify2 = document.querySelector(".modify-btn").cloneNode(true);
        document.querySelector(".intro-img").appendChild(modify2);
   
        let modify3 = document.querySelector(".modify-btn").cloneNode(true);
        document.querySelector(".intro-txt").appendChild(modify3);
        document.querySelector(".intro-txt").insertBefore(modify3, document.querySelector(".intro-txt-title"));

        modify.addEventListener("click", function () {

            let overlay = document.createElement("div");
            overlay.setAttribute("id","overlay");
            let body = document.querySelector("body");
            body.appendChild(overlay);

            let dialog = document.createElement("dialog");
            dialog.classList.add("dialog");
            body.appendChild(dialog);
            let gallery2 = document.querySelector(".gallery").cloneNode(true);
            dialog.appendChild(gallery2);


    });
    }
}

homepageEdit ();