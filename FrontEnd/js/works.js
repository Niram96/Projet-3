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

        // New CSS for the homepage edit

        let head  = document.getElementsByTagName('head')[0];
        let link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = "./assets/homepage_edit.css";
        link.media = 'all';
        head.appendChild(link);

        // Edit mode rectangle

        const header = document.querySelector("header");
        const editMode = document.createElement("div");
        editMode.classList.add("edit-mode");

        const editModeBtn = document.createElement("button");
        editModeBtn.innerText = "Mode édition";

        const editModeBtnIcon = document.createElement("i");
        editModeBtnIcon.classList.add("fa-sharp", "fa-solid", "fa-pen-to-square");

        const publishTheChangesBtn = document.createElement("button");
        publishTheChangesBtn.innerText = "publier les changements";

        header.appendChild(editMode);
        editMode.appendChild(editModeBtn);
        editModeBtn.appendChild(editModeBtnIcon);
        editMode.appendChild(publishTheChangesBtn);

        // Modify buttons

        const projectsTitleAndModifyDiv = document.createElement("div");
        projectsTitleAndModifyDiv.classList.add("projects-title-and-modify-div");

        const myProjects = document.querySelector(".my-projects");
        const modifyBtn = document.createElement("button");
        modifyBtn.classList.add("modify-btn");
        modifyBtn.innerText = "modifier";
        const portfolio = document.querySelector("#portfolio");
        const gallery = document.querySelector(".gallery");

        const modifyBtnIcon = document.createElement("i");
        modifyBtnIcon.classList.add("fa-solid", "fa-pen-to-square");

        portfolio.appendChild(projectsTitleAndModifyDiv);
        projectsTitleAndModifyDiv.appendChild(myProjects);
        projectsTitleAndModifyDiv.appendChild(modifyBtn);
        portfolio.insertBefore(projectsTitleAndModifyDiv, gallery);
        modifyBtn.appendChild(modifyBtnIcon)

        const modifyBtn2 = document.querySelector(".modify-btn").cloneNode(true);
        document.querySelector(".intro-img").appendChild(modifyBtn2);
   
        const modifyBtn3 = document.querySelector(".modify-btn").cloneNode(true);
        document.querySelector(".intro-txt").appendChild(modifyBtn3);
        document.querySelector(".intro-txt").insertBefore(modifyBtn3, document.querySelector(".intro-txt-title"));

        // Login -> Logout

        const loginBtn = document.querySelector(".login-btn");
        loginBtn.innerText = "logout";

        // Overlay creation

        const overlay = document.createElement("div");
        overlay.setAttribute("id","overlay");
        const body = document.querySelector("body");
        body.appendChild(overlay);
        overlay.style.display="none";

        // Dialog, title & close button creation

        let dialog = document.createElement("dialog");
        dialog.classList.add("dialog");
        body.appendChild(dialog);

        const closeBtn = document.createElement("i");
        closeBtn.classList.add("fa-solid", "fa-xmark");
        dialog.appendChild(closeBtn);

        let dialogTitle = document.createElement("h2");
        dialogTitle.innerHTML = "Galerie photo";
        dialog.appendChild(dialogTitle);

        // Edit mode - Dialog opening

        editModeBtn.addEventListener("click", function () {

            overlay.style.display="block";
            dialog.show();

            closeBtn.addEventListener("click", function () {
                document.querySelector("dialog").close();
                overlay.style.display = "none";
            })

            let galleryDialog = document.querySelector(".gallery").cloneNode(true);
            dialog.appendChild(galleryDialog);

            let figures = document.querySelector("dialog .gallery").querySelectorAll("figure");

            for (let i=0; i < figures.length; i++) {
                let figure = figures[i];
                let figureBtn = document.createElement("button");
                figureBtn.innerText = "éditer";
                figure.appendChild(figureBtn);
            }

    });
    }
}

homepageEdit ();