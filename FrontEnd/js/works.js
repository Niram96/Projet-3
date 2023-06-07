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

// ********** Filters ********** //

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

        // Edit mode - black rectangle

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

        // ********** Modale - Gallery ********** //

        let dialog = document.createElement("dialog");
        dialog.classList.add("dialog");
        body.appendChild(dialog);

        // Close dialog button

        const closeBtn = document.createElement("i");
        closeBtn.classList.add("fa-solid", "fa-xmark");
        dialog.appendChild(closeBtn);

        // *** Photo Gallery *** //

        const photoGalleryDivDialog = document.createElement("div");
        photoGalleryDivDialog.classList.add("photo-gallery-div-dialog");
        dialog.appendChild(photoGalleryDivDialog)

        const photoGalleryTitle = document.createElement("h2");
        photoGalleryTitle.innerHTML = "Galerie photo";
        photoGalleryDivDialog.appendChild(photoGalleryTitle);

        const photoGalleryDiv = document.createElement("div");
        photoGalleryDiv.classList.add("photo-gallery-div")
        photoGalleryDivDialog.appendChild(photoGalleryDiv)

        // Recovery of work in the dialog

        function getWorksDialog (works) {
            for (let i=0; i < works.length; i++) {
                const work = works[i];
                const article = document.createElement("figure");
                const image = document.createElement("img");
                image.src = work.imageUrl;

                article.appendChild(image);
                photoGalleryDiv.appendChild(article);
                photoGalleryDivDialog.appendChild(photoGalleryDiv); 

                // Edit and Delete buttons
                let figures = document.querySelector("dialog .photo-gallery-div").querySelectorAll("figure");
                const figure = figures[i];
                let id = works[i].id;
                const figureEditBtn = document.createElement("button");
                const figureDeleteBtn = document.createElement("button");
                figureDeleteBtn.classList.add("figure-delete-btn", "photo-" + id);
                const figureDeleteBtnIcon = document.createElement("i");
                figureDeleteBtnIcon.classList.add("fa-solid", "fa-trash-can");
                figureEditBtn.innerText = "éditer";
                figure.appendChild(figureEditBtn);
                figureDeleteBtn.appendChild(figureDeleteBtnIcon);
                figure.appendChild(figureDeleteBtn);
            }                   
        }

        getWorksDialog(works);

        // Delete work

        async function deleteWork () {
            let figures = document.querySelector("dialog .photo-gallery-div").querySelectorAll("figure");

            const response = await fetch("http://localhost:5678/api/works");
            const works = await response.json();

            for (let i=0; i < figures.length; i++) {
                let id = works[i].id;
                let deleteBtn = document.querySelector("dialog .photo-gallery-div figure .photo-" + id);
                let token = window.sessionStorage.getItem("token");
                deleteBtn.addEventListener("click", function (event) { 
                    event.preventDefault();
                    fetch('http://localhost:5678/api/works/'+id, {
                        method: 'DELETE',                        
                        headers: {"Authorization": "Bearer " + token},
                        body: id,
                    })
                    .then (function (response) {
                        if (!response.ok) {
                            alert("Erreur : Suppression non effectuée");
                        }
                        else {
                            reloadWorks();
                        }
                    return response.text(); 
                    })
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                
                });
            }
        }   

        deleteWork ();

        // Grey border

        const greyBorder = document.createElement("div");
        greyBorder.classList.add("grey-border");
        photoGalleryDivDialog.appendChild(greyBorder);

        // "Add a photo" button

        const addPhotoAndDeleteGalleryBtns = document.createElement("div");
        addPhotoAndDeleteGalleryBtns.classList.add("add-photo-and-delete-gallery-btns");
        photoGalleryDivDialog.appendChild(addPhotoAndDeleteGalleryBtns);
        const addPhotoBtn = document.createElement("button");
        addPhotoBtn.classList.add("add-photo-btn");
        addPhotoBtn.innerText = "Ajouter une photo"
        addPhotoAndDeleteGalleryBtns.appendChild(addPhotoBtn);

        // "Delete the gallery" button

        const deleteGalleryBtn = document.createElement("button");
        deleteGalleryBtn.classList.add("delete-gallery-btn");
        deleteGalleryBtn.innerText = "Supprimer la galerie"
        addPhotoAndDeleteGalleryBtns.appendChild(deleteGalleryBtn);

        deleteGalleryBtn.addEventListener("click", function (event) {
            event.preventDefault();
            for (let i=0; i < works.length; i++) {
                let id = works[i].id;
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
                        else {
                            reloadWorks();
                        }
                    return response.text(); 
                    })
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                })
            }
        })

        // ********** Modale - Add a Photo ********** //

        const addPhotoDivDialog = document.createElement("div");
        addPhotoDivDialog.classList.add("add-photo-div-dialog")
        dialog.appendChild(addPhotoDivDialog);

        // Back button
        const backBtn = document.createElement("i");
        backBtn.classList.add("fa-solid", "fa-arrow-left");
        dialog.appendChild(backBtn);
        dialog.insertBefore(backBtn, addPhotoDivDialog);
   
        const addPhotoTitle = document.createElement("h2");
        addPhotoTitle.innerText = "Ajout photo";
        addPhotoDivDialog.appendChild(addPhotoTitle);

        // Form
        const formAddPhoto = document.createElement("form");
        formAddPhoto.classList.add("form-add-photo");
        
        let formImgDiv = document.createElement("div");
        formImgDiv.classList.add("form-img-div");
        let formImgIcon = document.createElement("i");
        formImgIcon.classList.add("fa-sharp", "fa-regular", "fa-image", "fa-2xl");
        let formImgInput = document.createElement("input");
        formImgInput.classList.add("img-input");
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
        formTitleInput.classList.add("title-input");
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

        // Recovery of categories name and ID

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
        addPhotoDivDialog.appendChild(formAddPhoto);      

        // Grey border n°2

        const greyBorder2 = document.createElement("div");
        greyBorder2.classList.add("grey-border-2");
        addPhotoDivDialog.appendChild(greyBorder2);

        // Validate button

        const validateBtn = document.createElement("button");
        validateBtn.classList.add("validate-btn-disabled");
        validateBtn.setAttribute("disabled", "disabled");
        validateBtn.innerText = "Valider"
        addPhotoDivDialog.appendChild(validateBtn);

        // Image check and preview

        formImgInput.addEventListener("change", function () {
            let imgUrl = formImgInput.files[0];
            const imgUrlType = imgUrl.type;
            const imgUrlSize = imgUrl.size;
            const imageTypesAccepted = new RegExp ("image/jpeg|image/jpeg|image.png");
            let imgTypeTest = imageTypesAccepted.test(imgUrlType);

            if (!imgTypeTest) {
                alert("Erreur : Image non valide");
                formImgInput.value = "";
                formImgPreview.style.display = "none";
            }   

            if (imgTypeTest && imgUrlSize > 4000000) {
                alert("Erreur : Image trop volumineuse. L'image ne doit pas dépasser 4 Mo.");
                formImgInput.value = "";
            }

            else {
                formImgButton.style.display = "none";
                formImgInput.style.display = "none";
                formImgTxt.style.display = "none";
                formImgIcon.style.display = "none";
                const formImgPreview = document.createElement("img");
                formImgPreview.style.display = "block";

                const fileReader = new FileReader();
                fileReader.readAsDataURL(imgUrl);
                fileReader.addEventListener("load", function () {
                  formImgPreview.src = this.result;
                });
                formImgDiv.appendChild(formImgPreview);
            }
        });

        // "Validate button" enabling

        formAddPhoto.addEventListener("change", function () {
            if (formImgInput.files[0] !== undefined && formTitleInput.value !== "" && formCategorySelect.selectedIndex !== 0) {
                validateBtn.removeAttribute("disabled", "disabled");
                validateBtn.setAttribute("enabled", "enabled");
                validateBtn.classList.remove("validate-btn-disabled");
                validateBtn.classList.add("validate-btn");
            }
        })

        // *** Add a photo *** //

        // Token recovery

        const token = window.sessionStorage.getItem("token");

        validateBtn.addEventListener("click", function (event) {
            event.preventDefault();

            const formData = new FormData();
            const imgUrl = document.querySelector("dialog .add-photo-div-dialog .form-add-photo .form-img-div input").files[0];
            const title = document.querySelector("dialog .add-photo-div-dialog .form-add-photo .form-title-div input").value;
            const category = document.querySelector("dialog .add-photo-div-dialog .form-add-photo .form-category-div select").selectedIndex;
    
            formData.append("image", imgUrl);
            formData.append("title", title);
            formData.append("category", category);

           if (imgUrl === undefined || title === "" || category === (0 || undefined)) {
                alert("Erreur : Veuillez remplir correctement les champs.");            
            }

            fetch('http://localhost:5678/api/works/', {
                method: 'POST',                        
                headers: {"Authorization": "Bearer " + token},
                body: formData,
            })
            .then (function (response) {
                if (!response.ok) {
                    alert("Erreur : Ajout non effectué");
                }
                else {
                    reloadWorks();
                    cleanForm ();
                }
            return response.text(); 
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        });

        // ********** Edit mode ********** //

        modifyBtn.addEventListener("click", function editMode () {

            overlay.style.display = "block";
            dialog.style.display = "block";
            photoGalleryDivDialog.style.display = "block";
            addPhotoDivDialog.style.display = "none";
            backBtn.style.visibility = "hidden";

            overlay.addEventListener("click", function (event) {
              if (event.target !== dialog) {
                overlay.style.display = "none";
                dialog.style.display = "none";
                backBtn.style.visibility = "hidden";
                cleanForm();
              }
            })

            closeBtn.addEventListener("click", function () {
                overlay.style.display = "none";
                dialog.style.display = "none";
                backBtn.style.visibility = "hidden";
                cleanForm();
            });

            backBtn.addEventListener("click", function () {
                addPhotoDivDialog.style.display = "none";
                backBtn.style.visibility = "hidden";
                photoGalleryDivDialog.style.display = "block";
                cleanForm();
            });

            addPhotoBtn.addEventListener("click", function () {
                photoGalleryDivDialog.style.display = "none";
                addPhotoDivDialog.style.display = "flex";
                backBtn.style.visibility = "visible";
            });
        });

        // Reload the works

        async function reloadWorks () {
            const response = await fetch("http://localhost:5678/api/works");
            const works = await response.json();
        
            overlay.style.display = "none";
            dialog.style.display = "none";
            document.querySelector("body main #portfolio .gallery").innerHTML = "";
            document.querySelector("body dialog .photo-gallery-div-dialog .photo-gallery-div").innerHTML = "";
            getWorks (works);
            getWorksDialog (works);
            /*editAndDeleteButtons ();*/
            photoGalleryDivDialog.insertBefore(photoGalleryDiv, greyBorder);
            deleteWork ();
        }

        // Clean the form after adding or closing

        function cleanForm () {
            formImgInput.value = "";
            formTitleInput.value = "";
            formCategorySelect.selectedIndex = 0;
            formImgButton.style.display = "flex";
            formImgInput.style.display = "flex";
            formImgTxt.style.display = "flex";
            formImgIcon.style.display = "flex";
            document.querySelector("dialog .add-photo-div-dialog .form-add-photo .form-img-div img").remove();
        }
        
    }
}

homepageEdit ();