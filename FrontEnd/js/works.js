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

        loginBtn.addEventListener("click", function () {
        window.sessionStorage.removeItem("token");
        loginBtn.setAttribute("href", "index.html");
        });


        // Overlay

        const overlay = document.createElement("div");
        overlay.setAttribute("id","overlay");
        const body = document.querySelector("body");
        body.appendChild(overlay);
        overlay.style.display="none";

        // Dialog, title & close buttons

        let dialog = document.createElement("dialog");
        dialog.classList.add("dialog");
        body.appendChild(dialog);
        const closeBtn = document.createElement("i");
        closeBtn.classList.add("fa-solid", "fa-xmark");
        dialog.appendChild(closeBtn);
        let dialogTitle = document.createElement("h2");
        dialogTitle.innerHTML = "Galerie photo";
        dialog.appendChild(dialogTitle);

        let compteur = 0;
        let compteur2 = 0;

        // Edit mode - Dialog opening

        editModeBtn.addEventListener("click", function editMode () {

            overlay.style.display="block";
            dialog.show();

            closeBtn.addEventListener("click", function () {
                document.querySelector("dialog").close();
                overlay.style.display = "none";
                galleryDialog.style.display = "grid";
                document.querySelector("dialog .add-photo-and-delete-gallery-btns .add-photo-btn").innerText = "Ajouter une photo";
                document.querySelector("dialog .add-photo-and-delete-gallery-btns .delete-gallery-btn").style.display = "block";
                document.querySelector("dialog h2").innerText = "Galerie photo";
                document.querySelector("dialog .form-add-photo").style.display = "none";
                document.querySelector("dialog .fa-arrow-left").style.display = "none";
            });

            const galleryDialog = document.createElement("div");
            galleryDialog.classList.add("gallery-dialog");

            // Get works in the dialog

            function getWorksDialog (works) {
                if (compteur === 0) {
                    for (let i=0; i < works.length; i++) {
                        const work = works[i];
                        const article = document.createElement("figure");
                        const id = work.id;
                        const image = document.createElement("img");
                        image.src = work.imageUrl;

                        article.appendChild(image);
                        galleryDialog.appendChild(article);
                        dialog.appendChild(galleryDialog); 
                    }                   
                }
            }

            getWorksDialog(works);

            // Edit & delete buttons creation

            let figures = document.querySelector("dialog .gallery-dialog").querySelectorAll("figure");

            for (let i=0; i < figures.length; i++) {
                if (compteur === 0) {
                    const figure = figures[i];
                    const figureEditBtn = document.createElement("button");
                    const figureDeleteBtn = document.createElement("button");
                    figureDeleteBtn.classList.add("figure-delete-btn", "photo-" + (i+1));
                    const figureDeleteBtnIcon = document.createElement("i");
                    figureDeleteBtnIcon.classList.add("fa-solid", "fa-trash-can");
                    figureEditBtn.innerText = "éditer";
                    figure.appendChild(figureEditBtn);
                    figureDeleteBtn.appendChild(figureDeleteBtnIcon);
                    figure.appendChild(figureDeleteBtn);
                }
            }

            for (let i=0; i < figures.length; i++) {
                let deleteBtn = document.querySelector("dialog .gallery-dialog figure .photo-" + (i+1));
                let id = works[i].id;
                console.log(id);
                let token = window.sessionStorage.getItem("token");
                deleteBtn.addEventListener("click", function () { 
                    fetch('http://localhost:5678/api/works/'+id, {
                        method: 'DELETE',                        
                        headers: {"Authorization": "Bearer " + token},
                        body: id,
                    })
                    .then (function (response) {
                        if (!response.ok) {
                        alert("Erreur : Suppression non effectuée");
                        }	
                    return response.text(); 
                    })
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                })
            }

            if (compteur === 0) {
                // Grey border creation

                const greyBorder = document.createElement("div");
                greyBorder.classList.add("grey-border");
                dialog.appendChild(greyBorder);

                // "Add a photo" button

                const addPhotoAndDeleteGalleryBtns = document.createElement("div");
                addPhotoAndDeleteGalleryBtns.classList.add("add-photo-and-delete-gallery-btns");
                dialog.appendChild(addPhotoAndDeleteGalleryBtns);
                const addPhotoBtn = document.createElement("button");
                addPhotoBtn.classList.add("add-photo-btn");
                addPhotoBtn.innerText = "Ajouter une photo"
                addPhotoAndDeleteGalleryBtns.appendChild(addPhotoBtn);

                // "Delete the gallery" button

                const deleteGalleryBtn = document.createElement("button");
                deleteGalleryBtn.classList.add("delete-gallery-btn");
                deleteGalleryBtn.innerText = "Supprimer la galerie"
                addPhotoAndDeleteGalleryBtns.appendChild(deleteGalleryBtn);
            }

            const deleteGalleryBtn = document.querySelector("dialog .delete-gallery-btn");
            deleteGalleryBtn.addEventListener("click", function () {
                for (let i=0; i < works.length; i++) {
                    let id = works[i].id
                    let token = window.sessionStorage.getItem("token");
                    deleteGalleryBtn.addEventListener("click", function () { 
                        fetch('http://localhost:5678/api/works/'+id, {
                            method: 'DELETE',                        
                            headers: {"Authorization": "Bearer " + token},
                            body: id,
                        })
                        .then (function (response) {
                            if (!response.ok) {
                            alert("Erreur : Suppression non effectuée");
                            }	
                        return response.text(); 
                        })
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                    })
                }

                for (let i=0; i < figures.length; i++) {
                    if (compteur === 0) {
                        const figure = figures[i];
                        const figureEditBtn = document.createElement("button");
                        const figureDeleteBtn = document.createElement("button");
                        figureDeleteBtn.classList.add("figure-delete-btn", "photo-" + (i+1));
                        const figureDeleteBtnIcon = document.createElement("i");
                        figureDeleteBtnIcon.classList.add("fa-solid", "fa-trash-can");
                        figureEditBtn.innerText = "éditer";
                        figure.appendChild(figureEditBtn);
                        figureDeleteBtn.appendChild(figureDeleteBtnIcon);
                        figure.appendChild(figureDeleteBtn);
                    }
                }
            })

            // "Add a photo" function

            const addPhotoBtn = document.querySelector("dialog .add-photo-and-delete-gallery-btns .add-photo-btn");
            addPhotoBtn.addEventListener("click", function () {
                galleryDialog.style.display = "none";

                if (compteur2 === 0) {

                    const backBtn = document.createElement("i");
                    backBtn.classList.add("fa-solid", "fa-arrow-left");
                    dialog.appendChild(backBtn);
                    dialog.insertBefore(backBtn, document.querySelector("dialog h2"));
                
                    addPhotoBtn.innerText = "Valider";
                    const deleteGalleryBtn = document.querySelector("dialog .add-photo-and-delete-gallery-btns .delete-gallery-btn");
                    deleteGalleryBtn.style.display = "none";
                    document.querySelector("dialog h2").innerText = "Ajout photo";

                    const formAddPhoto = document.createElement("form");
                    formAddPhoto.classList.add("form-add-photo");
                    
                    let formImgDiv = document.createElement("div");
                    formImgDiv.classList.add("form-img-div");
                    let formImgIcon = document.createElement("i");
                    formImgIcon.classList.add("fa-sharp", "fa-regular", "fa-image", "fa-2xl");
                    let formImgInput = document.createElement("input");
                    formImgInput.setAttribute("type", "file");
                    formImgInput.setAttribute("name", "image");
                    let formImgButton = document.createElement("div");
                    formImgButton.classList.add("form-img-button");
                    formImgButton.innerText = "+ Ajouter photo";
                    let formImgTxt = document.createElement("p");
                    formImgTxt.innerText = "jpg, png : 4mo max";

                    let formTitleDiv = document.createElement("div");
                    formTitleDiv.classList.add("form-title-div");
                    let formTitleTitle = document.createElement("h3");
                    formTitleTitle.innerText = "Titre";
                    let formTitleInput = document.createElement("input");
                    formTitleInput.setAttribute("type", "text");
                    formTitleInput.setAttribute("name", "title");

                    let formCategoryDiv = document.createElement("div");
                    formCategoryDiv.classList.add("form-category-div");
                    let formCategoryTitle = document.createElement("h3");
                    formCategoryTitle.innerText = "Catégorie";
                    let formCategoryLabel = document.createElement("label");
                    formCategoryLabel.setAttribute("for", "category-select");
                    let formCategorySelect = document.createElement("select");
                    formCategorySelect.setAttribute("name", "category");
                    formCategorySelect.setAttribute("id", "category-select");
                    let formCategoryOption = document.createElement("option");
                    formCategoryOption.setAttribute("value", "");

                    let categoryIdList = [];
                    let categoryNameList = [];

                    for (let i=0; i < works.length; i++) {
                        const work = works[i];
                        const categoryId = work.category.id;
                        const categoryName = work.category.name;
                        if (!categoryIdList.includes(categoryId)) {
                            categoryIdList.push(categoryId);
                        }
                        if (!categoryNameList.includes(categoryName)) {
                            categoryNameList.push(categoryName);
                        }
                    }

                    formCategorySelect.appendChild(formCategoryOption);

                    for (let i=0; i < categoryNameList.length; i++) {
                        let formCategoryOption = document.createElement("option");
                        let categoryName = categoryNameList[i];
                        formCategoryOption.setAttribute("value", categoryName);
                        formCategoryOption.innerText = categoryName;
                        formCategorySelect.appendChild(formCategoryOption);
                    }

                    formAddPhoto.appendChild(formImgDiv);
                    formImgDiv.appendChild(formImgIcon);
                    formImgDiv.appendChild(formImgButton);
                    formImgDiv.appendChild(formImgInput);
                    formImgDiv.appendChild(formImgTxt);
                    formTitleDiv.appendChild(formTitleTitle);
                    formTitleDiv.appendChild(formTitleInput);
                    formAddPhoto.appendChild(formTitleDiv);
                    formCategoryDiv.appendChild(formCategoryTitle);
                    formCategoryDiv.appendChild(formCategoryLabel);
                    formCategoryDiv.appendChild(formCategorySelect);
                    formAddPhoto.appendChild(formCategoryDiv);
                    dialog.appendChild(formAddPhoto);

                    dialog.insertBefore(formAddPhoto, document.querySelector("dialog .grey-border"));
                }

                const formData = new FormData();
                const imgUrl = document.querySelector("dialog .form-add-photo .form-img-div input").files[0];
                const title = document.querySelector("dialog .form-add-photo .form-title-div input").value;
                const category = document.getElementById("category-select");
                const categoryValue = category.selectedIndex;

                formData.append('image', imgUrl);
                formData.append('title', title);
                formData.append('category', categoryValue);

                const token = window.sessionStorage.getItem("token");

                addPhotoBtn.addEventListener("click", function () {
                    console.log(categoryValue);
                    if (imgUrl === null || title === null || categoryValue === 0) {
                        alert ("Veuillez remplir tous les champs.");
                    }
                    fetch('http://localhost:5678/api/works/', {
                        method: 'POST',                        
                        headers: {"Authorization": "Bearer " + token},
                        body: formData,
                    })
                    .then (response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                })

                compteur2++

                if (compteur2 > 0) { 
                    document.querySelector("dialog .form-add-photo").style.display = "flex";
                    document.querySelector("dialog .add-photo-and-delete-gallery-btns .delete-gallery-btn").style.display = "none";
                    document.querySelector("dialog .add-photo-and-delete-gallery-btns .add-photo-btn").innerText = "Valider";
                    document.querySelector("dialog .fa-arrow-left").style.display = "block";
                    document.querySelector("dialog h2").innerText = "Ajout photo";
                }

                const backBtn = document.querySelector("dialog .fa-arrow-left").addEventListener("click", function () {
                    document.querySelector("dialog .form-add-photo").style.display = "none";
                    document.querySelector("dialog .fa-arrow-left").style.display = "none";
                    document.querySelector("dialog .gallery-dialog").style.display = "grid";
                    document.querySelector("dialog h2").innerText = "Galerie photo";
                    document.querySelector("dialog .add-photo-and-delete-gallery-btns .add-photo-btn").innerText = "Ajouter une photo";
                    document.querySelector("dialog .add-photo-and-delete-gallery-btns .delete-gallery-btn").style.display = "block";
                })

            });       
            compteur++;
        });
    }
}

homepageEdit ();