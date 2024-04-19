document.addEventListener("DOMContentLoaded", function () {
    // Login Form
    const loginForm = document.getElementById("loginForm");

    // When login form submit ->
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get email & password value
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Check if correct
        try {
            const response = await fetch(`https://architect-portfolio-d7d63552eceb.herokuapp.com/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            // if problem
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // if it works get the result
            const result = await response.json();

            // get the connection token from the result 
            const token = result.token;

            // set the token in session storage
            sessionStorage.setItem("token", token);

            // redirect to main page
            window.location.href = "index.html";
        } catch (error) {
            console.error('Error:', error);

            alert("Erreur dans l'identifiant ou le mot de passe");
        }
    });
});
