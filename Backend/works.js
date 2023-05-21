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

const allButton = document.querySelector(".btn-all");
const ojectsButton = document.querySelector(".btn-objects");
const apartmentsButton = document.querySelector(".btn-apartments");
const hotelsAndRestaurants = document.querySelector(".btn-hotels-and-restaurants");

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