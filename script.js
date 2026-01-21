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
function openOrder() {
    document.getElementById("orderBox").classList.remove("hidden");
}
function submitOrder() {
    const coffee = document.querySelector('input[name="coffee"]:checked');
    const sugar = document.querySelector('input[name="sugar"]:checked');
    const ice = document.querySelector('input[name="ice"]:checked');

    if (!coffee || !sugar || !ice) {
        alert("Please complete all selections before ordering.");
        return;
    }

    let basePrice = 0;

    if (coffee.value === "Classic Black") {
        basePrice = 20;
    } else if (coffee.value === "Milk") {
        basePrice = 30;
    } else if (coffee.value === "Chocolate") {
        basePrice = 45;
    } else if (coffee.value === "Tea") {
        basePrice = 20;
    }

    let icePrice = ice.value === "Yes" ? 5 : 0;
    let total = basePrice + icePrice;

    alert(
        "ORDER RECEIPT\n\n" +
        "Coffee: " + coffee.value + "\n" +
        "Base Price: ₱" + basePrice + "\n" +
        "Sugar Level: " + sugar.value + "\n" +
        "Ice: " + ice.value + "\n" +
        "Ice Fee: ₱" + icePrice + "\n\n" +
        "TOTAL: ₱" + total + "\n\n" +
        "Thank you for your order!\n"
    );
}



function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    alert(
        "CONTACT RECEIPT\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Message:\n" + message + "\n\n" +
        "Thank you for contacting Treat a Cup.\n"
    );
}