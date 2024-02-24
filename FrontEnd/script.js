document.addEventListener("DOMContentLoaded", async function () {
    const token = sessionStorage.getItem("token");
    const loginLogoutLink = document.getElementById("login-logout-link");


    // Check if user is connected & display the right content
    if (token) {
        // User is connected

        // Create editorHeader div
        const editorHeader = document.createElement("div");
        editorHeader.className = "editor-header";

        // Create SVG element
        const svgContainer = document.createElement("span");
        svgContainer.innerHTML = `
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M14.0229 2.18576L14.3939 2.55679C14.6821 2.84503 14.6821 3.31113 14.3939 3.5963L13.5016 4.49169L12.0879 3.07808L12.9803 2.18576C13.2685 1.89751 13.7346 1.89751 14.0198 2.18576H14.0229ZM6.93332 8.23578L11.0484 4.11759L12.4621 5.53121L8.34387 9.64633C8.25494 9.73525 8.14455 9.79964 8.02496 9.83337L6.23111 10.3455L6.7432 8.55162C6.77693 8.43203 6.84133 8.32164 6.93025 8.23271L6.93332 8.23578ZM11.9408 1.14625L5.89074 7.1932C5.62397 7.45998 5.43078 7.78808 5.32959 8.14685L4.4526 11.2133C4.379 11.4708 4.44953 11.7468 4.63965 11.9369C4.82977 12.127 5.10574 12.1976 5.36332 12.124L8.42973 11.247C8.79156 11.1427 9.11967 10.9495 9.38338 10.6858L15.4334 4.63888C16.2951 3.77722 16.2951 2.37894 15.4334 1.51728L15.0624 1.14625C14.2007 0.284585 12.8024 0.284585 11.9408 1.14625ZM3.19844 2.34214C1.70816 2.34214 0.5 3.55031 0.5 5.04058V13.3812C0.5 14.8715 1.70816 16.0796 3.19844 16.0796H11.5391C13.0293 16.0796 14.2375 14.8715 14.2375 13.3812V9.94683C14.2375 9.539 13.9094 9.21089 13.5016 9.21089C13.0937 9.21089 12.7656 9.539 12.7656 9.94683V13.3812C12.7656 14.0589 12.2167 14.6078 11.5391 14.6078H3.19844C2.52076 14.6078 1.97188 14.0589 1.97188 13.3812V5.04058C1.97188 4.36291 2.52076 3.81402 3.19844 3.81402H6.63281C7.04065 3.81402 7.36875 3.48591 7.36875 3.07808C7.36875 2.67025 7.04065 2.34214 6.63281 2.34214H3.19844Z" fill="white"/>
            </svg>
        `;

        // Create text node for "Mode édition"
        const textNode = document.createTextNode("Mode édition");

        // Append SVG and text to the span
        svgContainer.appendChild(textNode);

        // Append the span to the editorHeader
        editorHeader.appendChild(svgContainer);

        // Insert the editorHeader at the top of the body
        document.body.insertBefore(editorHeader, document.body.firstChild);

        // Modify the project-modify-container content
        const projectModifyContainer = document.querySelector(".project-modify-container");
        if (projectModifyContainer) {
            // Create new paragraph element with the SVG content
            const svgParagraph = document.createElement("button");
            svgParagraph.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M14.0229 2.18576L14.3939 2.55679C14.6821 2.84503 14.6821 3.31113 14.3939 3.5963L13.5016 4.49169L12.0879 3.07808L12.9803 2.18576C13.2685 1.89751 13.7346 1.89751 14.0198 2.18576H14.0229ZM6.93332 8.23578L11.0484 4.11759L12.4621 5.53121L8.34387 9.64633C8.25494 9.73525 8.14455 9.79964 8.02496 9.83337L6.23111 10.3455L6.7432 8.55162C6.77693 8.43203 6.84133 8.32164 6.93025 8.23271L6.93332 8.23578ZM11.9408 1.14625L5.89074 7.1932C5.62397 7.45998 5.43078 7.78808 5.32959 8.14685L4.4526 11.2133C4.379 11.4708 4.44953 11.7468 4.63965 11.9369C4.82977 12.127 5.10574 12.1976 5.36332 12.124L8.42973 11.247C8.79156 11.1427 9.11967 10.9495 9.38338 10.6858L15.4334 4.63888C16.2951 3.77722 16.2951 2.37894 15.4334 1.51728L15.0624 1.14625C14.2007 0.284585 12.8024 0.284585 11.9408 1.14625ZM3.19844 2.34214C1.70816 2.34214 0.5 3.55031 0.5 5.04058V13.3812C0.5 14.8715 1.70816 16.0796 3.19844 16.0796H11.5391C13.0293 16.0796 14.2375 14.8715 14.2375 13.3812V9.94683C14.2375 9.539 13.9094 9.21089 13.5016 9.21089C13.0937 9.21089 12.7656 9.539 12.7656 9.94683V13.3812C12.7656 14.0589 12.2167 14.6078 11.5391 14.6078H3.19844C2.52076 14.6078 1.97188 14.0589 1.97188 13.3812V5.04058C1.97188 4.36291 2.52076 3.81402 3.19844 3.81402H6.63281C7.04065 3.81402 7.36875 3.48591 7.36875 3.07808C7.36875 2.67025 7.04065 2.34214 6.63281 2.34214H3.19844Z" fill="black"/></svg> modifier';

            // Append the new paragraph to the project-modify-container
            projectModifyContainer.appendChild(svgParagraph);
        }

        // Change login link to logout
        loginLogoutLink.textContent = "logout";
        loginLogoutLink.addEventListener("click", function () {
            // Clear the token
            sessionStorage.removeItem("token");

            // Reload the page to reflect changes
            window.location.reload();
        });
    } else {
        // User is not connected
        loginLogoutLink.textContent = "login";
        loginLogoutLink.href = "login.html";
    }


    // Gallery & Filters

    const apiWorksURL = "http://localhost:5678/api/works";
    const gallery = document.getElementById("gallery");
    const filtersContainer = document.querySelector('.filters-container');

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

    function displayWorks(works, categoryName) {
        gallery.innerHTML = '';

        works.forEach(work => {
            if (categoryName === 'Tous' || work.category.name === categoryName) {
                const workElement = createWorkElement(work);
                gallery.appendChild(workElement);
            }
        });
    }

    function createFilterButtons(categories) {
        filtersContainer.innerHTML = '';

        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.dataset.categoryName = 'Tous';
        allButton.classList.add('filter-active');
        allButton.addEventListener('click', async function () {
            try {
                const worksData = await getAllWorks();
                displayWorks(worksData, 'Tous');
                setActiveButton(allButton);
            } catch (error) {
                console.error('Error:', error);
            }
        });
        filtersContainer.appendChild(allButton);

        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.dataset.categoryName = category;
            button.addEventListener('click', async function () {
                try {
                    const worksData = await getAllWorks();
                    const categoryName = category;
                    displayWorks(worksData, categoryName);
                    setActiveButton(button);
                } catch (error) {
                    console.error('Error:', error);
                }
            });
            filtersContainer.appendChild(button);
        });
    }

    function setActiveButton(clickedButton) {
        const allButtons = filtersContainer.querySelectorAll('button');
        allButtons.forEach(button => {
            button.classList.remove('filter-active');
        });
        clickedButton.classList.add('filter-active');
    }

    async function fetchCategoriesAndDisplayButtons() {
        try {
            const worksData = await getAllWorks();
            const categories = new Set(worksData.map(work => work.category.name));
            createFilterButtons(categories);
            displayWorks(worksData, 'Tous');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    fetchCategoriesAndDisplayButtons();
});
