// Toggles the visibility of the menu details
function toggleDetails() {
    const details = document.getElementById("details");
    details.classList.toggle("hidden");
}

// Smoothly scrolls to the menu section
function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

// Displays a message instead of submitting the form
function showFormMessage() {
    document.getElementById("formMessage").classList.remove("hidden");
    return false;
}
