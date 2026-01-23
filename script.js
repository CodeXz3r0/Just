// Scroll to menu
function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// Toggle More Info
function toggleDetails() {
    document.getElementById("details").classList.toggle("hidden");
}

// Open order box
function openOrder() {
    document.getElementById("orderBox").classList.toggle("hidden");
}

// Proceed to payment
function proceedToPayment() {
    // Get selected options
    const coffee = document.querySelector('input[name="coffee"]:checked');
    const sugar = document.querySelector('input[name="sugar"]:checked');
    const ice = document.querySelector('input[name="ice"]:checked');

    if (!coffee || !sugar || !ice) {
        alert("Please select your coffee, sugar level, and ice option.");
        return;
    }

    // Base prices
    const basePrice = coffee.value === "Classic Black" ? 20 :
                      coffee.value === "Milk" ? 30 :
                      coffee.value === "Chocolate" ? 45 : 20;
    const icePrice = ice.value === "Yes" ? 5 : 0;
    const subtotal = basePrice + icePrice;
    const vat = subtotal * 0.12;
    const total = subtotal + vat;

    // Save order in localStorage
    const orderData = {
        coffee: coffee.value,
        sugar: sugar.value,
        ice: ice.value === "Yes" ? "Add Ice (+₱5)" : "No Ice",
        basePrice: basePrice,
        icePrice: icePrice,
        subtotal: subtotal,
        vat: vat,
        total: total
    };

    localStorage.setItem("coffeeOrder", JSON.stringify(orderData));

    // Redirect to payment page
    window.location.href = "pay.html";
}

// Contact form
function submitContactForm(event) {
    event.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    alert(`CONTACT RECEIPT\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n\nThank you for contacting Treat a Cup.`);
}
