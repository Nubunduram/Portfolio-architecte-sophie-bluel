import { API_WORKS_URL, token, deletingModal } from "./script.js";

// DOM

// The "adding project" modal in editor mode
const addingModal = document.getElementById("adding-modal");
// The button to go from the deleting modal to the adding-modal
const addPicture = document.getElementById("add-picture");
// The button to go back from adding modal to deleting modal
const returnButton = document.getElementById("adding-modal-return-button");
// The select category element, to remove event propagation due to a bug on mozzilla
const projectCategorySelect = document.getElementById("project-category");
// The Input button to add a Picture for new project
const fileInput = document.getElementById('photo');
// The container for the preview Picture in add new project form
const previewContainer = document.getElementById('picture-input-container');
// The form of the adding project modal
const modalAddForm = document.getElementById("modal-add-form");
// The button to send the form of adding project
const validatingButton = document.getElementById('validating-button');

// Select All the Elements to hide when the preview-img appears on screen in the adding modal
const addPictureButtons = document.querySelectorAll('.to-hide')
// Select All The cross buttons to close the modals 
const closingModalButtons = document.querySelectorAll(".closing-modal-button");

// Functions

// The Categories in the Backend are Numbers -> map with their category name
function mapCategoryValue(categoryValue) {
    switch (categoryValue) {
        case 'Objets':
            return 1;
        case 'Appartements':
            return 2;
        case 'Hotels & Restaurants':
            return 3;
        default:
            return 0;
    }
}
// Function to close if click outside of a modal
function closeOnOutsideClick(modal, event) {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
}

// Function to block a form sending if an input is filled with blank space
function blockInputBlankFilled(inputToTestElement, buttonToDisableElement) {
    if (inputToTestElement.value.length > 0 && inputToTestElement.value.trim() == "") {
        buttonToDisableElement.disabled = true;
        alert("The input can't be filled with blank space only")
    }
}

// ADD EVENT LISTENERS

// When click on Add picture button, open the Adding project Modal & close the deleting modal
addPicture.addEventListener("click", () => {
    deletingModal.close();
    addingModal.showModal();
})
// Goes back to Adding picture modal, when click on the return button in the Adding Modal
returnButton.addEventListener("click", () => {
    addingModal.close();
    deletingModal.showModal();
})
// Give to the 2 closing modal buttons the listener to close the modal
closingModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        deletingModal.close();
        addingModal.close();
    });
});
//Add the function closeOnOutsideClick to both modals
deletingModal.addEventListener("click", e => {
    closeOnOutsideClick(deletingModal, e);
});
addingModal.addEventListener("click", e => {
    closeOnOutsideClick(addingModal, e);
});
// Add an event listener to the select element to stop event propagation,
// otherwise it closes the modal when click on an option on mozzilla
projectCategorySelect.addEventListener("click", (e) => {
    e.stopPropagation();
});
// Add an event listener to the file input to show the Preview Image or the Add an img input
fileInput.addEventListener('change', function () {
    // Create the preview img element for the input when adding a new project
    const previewImage = document.createElement('img');
    previewImage.id = 'preview-image';
    previewImage.alt = 'Preview Image';
    // Check if any file is selected
    if (fileInput.files.length > 0) {
        addPictureButtons.forEach(elementToHide => {
            elementToHide.classList.add('hide');
        })
        // Append the img element to the preview container
        previewContainer.appendChild(previewImage);
        // Get the selected file
        const selectedFile = fileInput.files[0];
        // Create a FileReader object to read the file
        const reader = new FileReader();
        // Set up the FileReader onload event to update the preview image
        reader.onload = function (e) {
            // Set the source of the preview image to the data URL of the selected file
            previewImage.src = e.target.result;
        };
        // Read the selected file as a data URL
        reader.readAsDataURL(selectedFile);
    }
});
// in adding project modal Form, check if form is correctly filled, and change the button if so
modalAddForm.addEventListener("input", function checkForm() {
    // Get all input and select elements within the form
    const inputs = document.querySelectorAll('#modal-add-form input, #modal-add-form select');
    // Check if all inputs are filled
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

    const titleInput = document.getElementById('title');

    // Avoid Blank Spaces in the Title input
    blockInputBlankFilled(titleInput, validatingButton);

    // Toggle the CSS class based on input status
    if (allFilled) {
        validatingButton.disabled = false;
        validatingButton.classList.add('validated-button');
    } else {
        validatingButton.classList.remove('validated-button');
    }

});
// Handle the Add new Project Form
modalAddForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form values
    const photoInput = document.getElementById('photo');
    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('project-category');
    // Get The Picture Input
    const photoFile = photoInput.files[0];
    // Get The Title Input
    const title = titleInput.value;
    // Get The Number of the selected category
    const category = mapCategoryValue(categoryInput.value);
    // Create FormData object to send the file and other data
    const formData = new FormData();

    formData.append('image', photoFile);
    formData.append('title', title);
    formData.append('category', category);
    // Make a request to the API to post the new project
    fetch(`${API_WORKS_URL}/works/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Reload the page after successful submission
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});