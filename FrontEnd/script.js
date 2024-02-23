document.addEventListener("DOMContentLoaded", function() {

const apiWorksURL = "http://localhost:5678/api/works";
const container = document.getElementById("gallery");

async function getAllWorks() {
    try {
        const response = await fetch(apiWorksURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}


function createWorkElement(work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    
    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    return figure;
}

function displayWorks(works) {
    works.forEach(work => {
        const workElement = createWorkElement(work);
        container.appendChild(workElement);
    });
}

async function fetchDataAndDisplayWorks() {
    try {
        const worksData = await getAllWorks();
        displayWorks(worksData);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndDisplayWorks();
});