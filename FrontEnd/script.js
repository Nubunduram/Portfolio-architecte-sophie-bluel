document.addEventListener("DOMContentLoaded", function () {
    // API endpoint for fetching works data
    const apiWorksURL = "http://localhost:5678/api/works";
    // Container for displaying works
    const gallery = document.getElementById("gallery");
    // Container for filter buttons
    const filtersContainer = document.querySelector('.filters-container');

    // Function to fetch all works data from the API
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

    // Function to create HTML elements for a work
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

    // Function to display works based on the selected category
    function displayWorks(works, categoryName) {
        gallery.innerHTML = '';

        works.forEach(work => {
            if (categoryName === 'Tous' || work.category.name === categoryName) {
                const workElement = createWorkElement(work);
                gallery.appendChild(workElement);
            }
        });
    }

    // Function to create filter buttons dynamically based on categories
    function createFilterButtons(categories) {
        filtersContainer.innerHTML = '';

        // Create "Tous" button
        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.dataset.categoryName = 'Tous';
        allButton.classList.add('filter-active'); // Default style for "Tous" button
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

        // Create buttons for each category
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

    // Function to set the active state for the clicked button and remove it from others
    function setActiveButton(clickedButton) {
        const allButtons = filtersContainer.querySelectorAll('button');
        allButtons.forEach(button => {
            button.classList.remove('filter-active');
        });
        clickedButton.classList.add('filter-active');
    }

    // Function to fetch categories, create filter buttons, and display works
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

    // Initial function call to fetch categories and display buttons on page load
    fetchCategoriesAndDisplayButtons();
});
